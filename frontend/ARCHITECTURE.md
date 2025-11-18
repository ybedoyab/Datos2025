# Frontend - Angular 20 Project

## 📁 Estructura del Proyecto

```
src/app/
├── core/                       # Funcionalidades core singleton
│   └── services/              # Servicios singleton de infraestructura
│       ├── supabase.service.ts
│       └── error-handler.service.ts
├── features/                   # Módulos de características
│   └── products/              # Feature de productos
│       ├── models/            # Interfaces y tipos
│       │   └── product.model.ts
│       ├── services/          # Servicios del feature
│       │   └── products.service.ts
│       ├── products.component.ts
│       ├── products.component.html
│       └── products.component.css
├── shared/                     # Componentes y utilidades compartidas
├── app.ts                     # Componente raíz
├── app.config.ts              # Configuración de la app
└── app.routes.ts              # Configuración de rutas
```

## 🎯 Arquitectura

### Core
Contiene servicios singleton y funcionalidades de infraestructura que se usan en toda la aplicación:
- `SupabaseService`: Cliente de Supabase
- `ErrorHandlerService`: Manejo centralizado de errores

### Features
Cada feature es autocontenido con sus propios:
- **Models**: Interfaces y tipos TypeScript
- **Services**: Lógica de negocio específica del feature
- **Components**: Componentes del feature

### Shared
Componentes, directivas, pipes y utilidades reutilizables en múltiples features.

## 🚀 Mejoras Implementadas

### Angular 20 Best Practices
- ✅ Componentes standalone
- ✅ Signals para gestión de estado
- ✅ `inject()` en lugar de constructor injection
- ✅ Zoneless change detection
- ✅ OnPush change detection strategy
- ✅ Control flow nativo (`@if`, `@for`)
- ✅ Lazy loading de features

### Arquitectura
- ✅ Separación clara de responsabilidades
- ✅ Feature-based structure
- ✅ Servicios tipados fuertemente
- ✅ Manejo centralizado de errores
- ✅ Modelos en archivos separados
- ✅ CRUD completo en ProductsService

## 📝 Convenciones

- Usar `readonly` para señales que no se modifican fuera del componente
- Preferir `const` para inyección de servicios
- Mantener componentes pequeños y enfocados
- Usar DTOs para operaciones de creación/actualización
