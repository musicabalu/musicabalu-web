# Estructura y Organización (Musicabalú Web 2026)

Este documento define la arquitectura de la aplicación, el enrutamiento (URL) y el modelo de datos. La plataforma se construirá utilizando **Next.js (App Router)**.

## 1. Mapa de Rutas (Sitemap)

### 1.1. Rutas Públicas (El Embudo)
*   `/`: **Home / Landing Page principal**. Orientada a la conversión B2C (Captación de familias 0-3).
*   `/formaciones`: Landing Page para el público B2B (Educadores).
*   `/presencial`: Información sobre la escuela física en Murcia (horarios, filosofía).
*   `/login` y `/registro`: Páginas de acceso para los usuarios.
*   `/legal/*`: Políticas de privacidad, cookies y aviso legal.

### 1.2. Rutas Privadas (La Plataforma)
*   `/dashboard`: Panel de control principal del usuario tras hacer login.
*   `/suscripcion`: Área de contenidos mensuales para padres (Piso 2).
*   `/mis-formaciones`: Acceso a los cursos comprados (Piso 4).
*   `/perfil`: Gestión de datos personales y facturación (Stripe Portal).

## 2. Modelo de Base de Datos

Utilizaremos una base de datos relacional (ej. PostgreSQL gestionada) o NoSQL (ej. MongoDB) estructurada en las siguientes colecciones clave:

*   **Users:** ID, email, nombre, rol (familia, educador, admin), estado_suscripcion, stripe_customer_id.
*   **Products/Subscriptions:** Catálogo de lo que se vende (sincronizado con Stripe).
*   **Progress:** Seguimiento de los vídeos o audios consumidos por cada usuario en las formaciones.

## 3. Estructura de Carpetas del Proyecto (Next.js)

```text
web26/
├── arquitectura/       # Documentación y reglas (este directorio)
├── src/
│   ├── app/            # Rutas de Next.js (Páginas y API REST)
│   ├── components/     # Componentes visuales reutilizables (Botones, Tarjetas, Menús)
│   ├── lib/            # Lógica de negocio (Conexión a BD, Stripe, Autenticación)
│   ├── styles/         # Archivos Vanilla CSS organizados
│   └── types/          # Definiciones de tipos (si usamos TypeScript)
└── public/             # Imágenes estáticas, audios libres, favicon
```

## 4. Gestión de Estado y Carga de Datos
*   **Server Components:** Se usarán por defecto en Next.js para cargar los datos desde el servidor, garantizando máxima velocidad y SEO.
*   **Client Components:** Solo se usarán donde haya interactividad (reproductores de audio, formularios dinámicos).
