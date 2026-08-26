# Integración de Pagos y Monetización

El objetivo es centralizar **todos** los ingresos de Musicabalú (presenciales y digitales) a través de una única pasarela profesional, escalable y segura: **Stripe**.

## 1. Suscripciones Digitales (B2C Familias)
*   **Modelo:** Pago recurrente (mensual/anual).
*   **Implementación:** Usaremos *Stripe Checkout* para la suscripción y el *Stripe Customer Portal* para que el usuario pueda cancelar o cambiar su tarjeta sin que nosotros tengamos que hacer nada manualmente.

## 2. Ventas High-Ticket y Digitales (B2B y E-commerce)
*   **Formaciones (Piso 4):** Pagos únicos altos. Stripe permite ofrecer pago a plazos (Klarna/Clearpay) lo cual aumenta radicalmente la conversión en productos caros.
*   **Descargables (Fase 2 de E-commerce):** Venta directa de productos digitales (ej. Audio de 1 hora para dormir bebés) mediante enlace de pago directo.

## 3. Clases Presenciales (Adeudos SEPA)
*   **El gran salto operativo:** Sustituiremos las transferencias manuales de las familias de Murcia por **Adeudos Directos SEPA (Domiciliaciones)** gestionados íntegramente desde Stripe.
*   **Flujo:** Volcaremos los IBANs recogidos en el formulario de inscripción y Stripe se encargará de cobrar automáticamente las mensualidades (y gestionar los recibos devueltos).

## 4. Tienda Física (Merchandising futuro)
*   **Fase 3:** Cuando se vendan cajas regalo, shakers o camisetas, se integrará con el sistema de *Stripe Products* para cobrar los envíos.
