import os
from apscheduler.triggers.cron import CronTrigger
from apscheduler.schedulers.background import BackgroundScheduler

from data.logging.logger import app_logger as logger
from data.services.config_manager import ConfigManager


ENV = os.getenv("ENVIRONMENT", "local")


def get_sources():
    """
    Usa ConfigManager en prod, cache local en dev.
    """
    if ENV == "prod":
        cfg = ConfigManager().get_config()
        return cfg.get("sources", [])

    # Local: lee archivo cacheado o local sin Supabase
    from pathlib import Path
    import json

    local_path = Path(__file__).resolve().parent.parent / "workflows" / "sources_config.json"

    if not local_path.exists():
        logger.error("No se encontró sources_config.json en local.")
        return []

    logger.info("Usando configuración local desde sources_config.json")
    
    with open(local_path, "r", encoding="utf-8") as f:
        config = json.load(f)
    
    return config.get("sources", [])


def run_check_updates(source):
    from data.workflows.check_updates.run import check_updates_task
    from data.workflows.full_etl.run import full_etl_task
    
    logger.info(f"Ejecutando check_updates para la fuente: {source['id']}")
    
    # check_updates_task espera el config completo, creamos uno con solo esta fuente
    temp_config = {"sources": [source]}
    changed_sources = check_updates_task(temp_config)
    
    if changed_sources:
        logger.info(f"Cambios detectados en: {changed_sources}. Ejecutando full ETL...")
        full_etl_task(changed_sources, temp_config)
    else:
        logger.info(f"No hay cambios en {source['id']}")


def register_jobs(scheduler: BackgroundScheduler):
    sources = get_sources()

    if not sources:
        logger.warning("No se registrará ningún job (config vacía).")
        return

    registered_count = 0
    for src in sources:
        if not src.get("active", False):
            logger.debug(f"Fuente {src.get('id')} desactivada, saltando...")
            continue

        cron_expr = src.get("schedule", {}).get("cron", "0 0 * * 0")
        job_id = f"check_updates_{src['id']}"

        try:
            scheduler.add_job(
                run_check_updates,
                trigger=CronTrigger.from_crontab(cron_expr),
                args=[src],
                id=job_id,
                replace_existing=True
            )
            logger.info(f"Job registrado: {job_id} | cron={cron_expr}")
            registered_count += 1

        except Exception as e:
            logger.error(
                f"Error registrando job para {src['id']} | cron={cron_expr} | error={e}"
            )

    logger.success(f"Total jobs registrados: {registered_count} de {len(sources)} fuentes")
