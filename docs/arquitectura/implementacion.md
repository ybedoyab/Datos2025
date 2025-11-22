Plan de Implementación por Hitos
--------------------------------

### Hito 1: Infraestructura Base

*   Configuración de repositorio y GitHub Actions
    
*   Esquema de base de datos en Supabase
    
*   Sistema de logging básico
    

### Hito 2: Detección de Cambios

*   Scrapers livianos para las 3 fuentes
    
*   Lógica de comparación y trigger
    
*   Configuración de alertas básicas
    

### Hito 3: ETL Completo

*   Contenedor Playwright + dependencias
    
*   Pipelines de transformación por fuente
    
*   Mecanismos de carga y UPSERT
    

### Hito 4: Dashboard

*   Aplicación Angular base
    
*   Visualizaciones principales
    
*   Despliegue en Vercel/Netlify
    

### Hito 5: Monitorización Avanzada

*   Dashboards de métricas ETL
    
*   Alertas proactivas
    
*   Documentación operativa
    

Plan de desarrollo
--------------------
### FASE 0 — Prerrequisitos

**Objetivo: dejar listo el entorno.**

Entregables:

- Cuenta Supabase con proyecto.

- Repositorio con estructura base (/proyecto/data/).

- Acceso para subir imágenes Docker (Docker Hub).

- Crear VPS.

Tareas:

- Crear proyecto en Supabase.

- Crear repo y branch de trabajo.

- Raw data en supabase, no persistible.

