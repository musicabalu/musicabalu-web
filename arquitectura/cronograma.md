# Cronograma de Desarrollo (Musicabalú Web 2026)

Para evitar bloqueos y que la web salga a producción de forma estable, el desarrollo se dividirá en fases modulares. No pasaremos a la siguiente fase hasta que la anterior esté testeada.

## FASE 1: Cimientos y Escaparate (El nuevo "Hola Mundo")
*   **Objetivo:** Tener la estructura base de Next.js montada y las páginas públicas listas.
*   **Tareas:**
    1.  Inicializar el proyecto `web26` con Next.js.
    2.  Configurar las variables globales de Vanilla CSS (colores, fuentes).
    3.  Programar la Landing Page principal (Inicio) orientada a familias (0-3).
    4.  Programar las páginas estáticas (Presencial Murcia, Legal, Contacto).
    5.  Configurar el despliegue automático en Vercel.

## FASE 2: Captación (El Embudo Inicial)
*   **Objetivo:** Empezar a captar emails antes de tener el producto de pago listo.
*   **Tareas:**
    1.  Crear la Landing Page del *Lead Magnet* (ej. Audio de relajación gratuito).
    2.  Conectar el formulario a la plataforma de Email Marketing (Mailchimp/MailerLite).

## FASE 3: Autenticación y Área Privada
*   **Objetivo:** Que los usuarios puedan crear cuentas y hacer login de forma segura.
*   **Tareas:**
    1.  Configurar la Base de Datos.
    2.  Implementar NextAuth.js para registro y login.
    3.  Crear el `/dashboard` privado (vacío por ahora, pero protegido).

## FASE 4: Monetización (Stripe y Suscripción)
*   **Objetivo:** Poder cobrar a la gente de forma recurrente.
*   **Tareas:**
    1.  Conectar Stripe y crear los productos (Suscripción Mensual B2C).
    2.  Crear el *Checkout* de pago.
    3.  Proteger el contenido de `/suscripcion` para que solo los usuarios de pago (verificados por Stripe Webhooks) puedan entrar.

## FASE 5: Formaciones High-Ticket (B2B)
*   **Objetivo:** Vender cursos completos a educadores.
*   **Tareas:**
    1.  Crear Landing Page de venta para la Formación.
    2.  Subir los vídeos a un servidor protegido (S3/Cloudflare) y generar URLs seguras.
    3.  Crear el visor de cursos en el área privada.

## FASE 6: Transición Final y Despliegue
*   **Aclaración de Entornos (Local vs. Online):** Durante las Fases 1 a 5, todo el desarrollo se hará y se probará **en tu ordenador (Entorno Local)**. Esto nos permite ver los cambios en tiempo real sin que nadie más lo vea.
*   **Objetivo:** Subir la web a internet de forma segura y hacer el lanzamiento oficial.
*   **Tareas:**
    1.  Desplegar el código en los servidores de Vercel (Entorno Online cerrado al público).
    2.  Testeo masivo de pagos y registro en modo prueba ya en internet.
    3.  Cambiar las DNS en OVH para que `musicabalu.com` deje de apuntar a la carpeta vieja y apunte a los servidores de Vercel (web26). El lanzamiento definitivo.
