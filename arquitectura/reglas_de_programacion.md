# Reglas de Programación (Musicabalú Web 2026)

Este documento reemplaza a la antigua "filosofía de programación". Son los mandamientos estrictos a la hora de picar código para asegurar que la web sea mantenible, limpia y profesional.

## 1. El Marco de Trabajo (Framework)
*   **Next.js (App Router):** Todo el código se basará en la arquitectura más moderna de React.
*   **Archivos Base:** Los archivos principales de ruta serán siempre `page.jsx` o `page.tsx` dentro de sus respectivas carpetas.

## 2. Estilos (CSS)
*   **Vanilla CSS:** Evitaremos la sobrecarga de frameworks como Tailwind o Bootstrap. Escribiremos CSS puro y semántico (Vanilla CSS) para tener un control absoluto sobre el diseño y garantizar que los estilos sigan el manual de marca (colores corporativos, tipografía Quicksand/Montserrat) sin depender de librerías de terceros.
*   **Módulos CSS:** Para evitar conflictos, usaremos *CSS Modules* (`archivo.module.css`), lo que garantiza que los estilos de un componente no rompan el diseño de otra página.

## 3. Nomenclatura (Naming Conventions)
*   **Componentes Visuales:** Siempre en **PascalCase**. Ej: `BotonSuscripcion.jsx`, `TarjetaCurso.jsx`.
*   **Funciones y Variables:** Siempre en **camelCase**. Ej: `procesarPago()`, `usuarioActual`.
*   **Rutas y Carpetas:** Siempre en **kebab-case** (minúsculas con guiones). Ej: `/mis-formaciones`, `/api/crear-usuario`.

## 4. Estructura de Componentes
*   **Separación de responsabilidades:** Un componente debe hacer una sola cosa bien. Si un componente ocupa más de 150 líneas de código, probablemente necesite dividirse en componentes más pequeños.
*   **Reusabilidad:** Antes de crear un botón nuevo, se debe usar el componente global `<Button>`. Todos los márgenes, colores y fuentes deben beber de las variables CSS globales (`var(--color-primario)`).

## 5. Control de Errores (Error Handling)
*   Toda petición a la base de datos o a Stripe debe estar envuelta en bloques `try...catch`. Nunca se debe mostrar un error técnico al usuario final, siempre se mostrará un mensaje amigable (ej: "No hemos podido procesar tu suscripción en este momento. Inténtalo de nuevo.").

## 6. Sencillez y Funcionalidad ante todo
*   Priorizar siempre la funcionalidad sobre *features* complejas.
*   Código simple y directo. Si hay una forma más sencilla, esa es la correcta.

## 7. Código Limpio y Mantenimiento
*   Eliminar código muerto inmediatamente (nada de acumular archivos basura).
*   Comentarios claros y necesarios únicamente.
*   Refactorizar continuamente. Funciones cortas y con propósito único.

## 8. Copias de Seguridad Estratégicas
*   Crear *backup* (commit en Git) cada vez que un bloque de la web funcione correctamente.
*   Punto de retorno garantizado ante fallos graves para no perder tiempo rehaciendo código.

## 9. Sinceridad Radical y Comunicación Crítica (La Regla de Oro)
*   **Prohibida la complacencia:** Si el Jefe de Proyecto sugiere una idea técnica que es inviable, peligrosa o que va en contra de la estrategia general, el Arquitecto **DEBE** decirlo claramente y negarse a implementarla a ciegas.
*   **Prohibido el "falso saber":** Si el Arquitecto no sabe hacer algo con seguridad, debe avisar inmediatamente y buscar alternativas. NUNCA programar "a ver qué pasa".
*   **Prohibidos los halagos vacíos:** No se aplaudirán ideas si no son objetivamente útiles para el código.
*   **STOP y Consultar:** Ante cualquier duda arquitectural o de implementación, detenerse y consultar antes de teclear una sola línea de código incorrecta.

## 10. Flujo de Trabajo en Terminal
*   **Rutas absolutas:** Siempre que se le envíe un comando al usuario para que lo ejecute en su terminal, el comando **DEBE** incluir la navegación absoluta previa para asegurar que está en la carpeta correcta. Ej: `cd /Users/mgt/ProyectosVSCode/musicabalu/web26 && npm run dev`. Esto previene errores de ejecución desde la raíz del sistema.
