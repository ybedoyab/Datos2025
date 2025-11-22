import time
import os
import logging
from logs_config.logger import app_logger as logger
from scheduler.jobs import register_jobs, reload_jobs_if_changed
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.schedulers.background import BackgroundScheduler

ENV = os.getenv("ENVIRONMENT", "local")
CONFIG_RELOAD_INTERVAL = int(os.getenv("CONFIG_RELOAD_INTERVAL", "120"))  # default 2 minutos


def start_scheduler():
    logging.getLogger('apscheduler').setLevel(logging.WARNING)
    
    scheduler = BackgroundScheduler()
    
    logger.info("scheduler_starting", environment=ENV)
    
    try:
        # Registrar jobs iniciales
        register_jobs(scheduler)
        
        # Refresher
        scheduler.add_job(
            reload_jobs_if_changed,
            trigger=IntervalTrigger(seconds=CONFIG_RELOAD_INTERVAL),
            args=[scheduler],
            id="reload_config_job",
            replace_existing=True
        )
        logger.info("config_reloader_registered", interval_seconds=CONFIG_RELOAD_INTERVAL)
        
        scheduler.start()
        logger.info("scheduler_started", environment=ENV)

    except Exception as e:
        logger.error("scheduler_start_failed", error=str(e), exc_info=True)
        scheduler.shutdown(wait=False)
        return

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("scheduler_shutdown", reason="user_interrupt")
        scheduler.shutdown(wait=False)
        logger.info("scheduler_stopped")


if __name__ == "__main__":
    start_scheduler()
