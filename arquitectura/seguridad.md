# Políticas de Seguridad (Musicabalú Web 2026)

Al gestionar usuarios, contraseñas, pagos y contenido digital de pago, la seguridad es el pilar central del desarrollo.

## 1. Autenticación y Autorización
*   **Sistema de Login:** Se implementará **NextAuth.js (Auth.js)** para gestionar sesiones seguras. Las contraseñas NUNCA se guardarán en texto plano (se usarán algoritmos de *hashing* como bcrypt).
*   **Middleware de Protección:** Las rutas bajo `/dashboard`, `/suscripcion` y `/mis-formaciones` estarán protegidas por un middleware a nivel de servidor. Si un usuario no está logueado o no ha pagado, será redirigido instantáneamente al `/login` sin que la página llegue a cargar.

## 2. Pasarela de Pagos (Stripe)
*   **Tokens, no tarjetas:** Nunca almacenaremos números de tarjeta de crédito en nuestra base de datos. Todo el proceso de pago se delegará a **Stripe Checkout**.
*   **Webhooks Seguros:** La comunicación entre Stripe y Musicabalú (ej. cuando se renueva una suscripción) se hará mediante Webhooks verificados criptográficamente para evitar fraudes o activaciones de cuentas falsas.

## 3. Protección de Medios (Audio y Vídeo)
*   **Contenido Exclusivo:** Los audios y vídeos de pago no estarán en la carpeta `/public` (donde cualquiera podría descargarlos con un enlace).
*   **Signed URLs:** Los recursos premium se alojarán en un servicio de almacenamiento (ej. AWS S3, Cloudflare R2) y el servidor generará URLs firmadas temporalmente. Si un usuario copia el enlace de un vídeo y se lo pasa a un amigo, el enlace caducará y no funcionará.

## 4. Protección de Datos (RGPD)
*   Cumplimiento estricto de los textos legales elaborados para el proyecto.
*   Formularios protegidos contra ataques CSRF.
*   Uso obligatorio de certificados SSL (HTTPS), proporcionado automáticamente por la plataforma de despliegue (Vercel).
