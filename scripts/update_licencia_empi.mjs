import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const noteTitle = 'Licencias para Centros Educativos y Escuelas Infantiles';
  const existing = await prisma.adminNote.findFirst({
    where: { title: { contains: 'Licencias para Centros' } }
  });

  const updatedContent = `<h3>1. Concepto y Justificación</h3>
<p>Diferenciación estricta entre la suscripción doméstica (familiar B2C: 3,90 €/mes o 39 €/año) y la licencia institucional B2B para colegios, escuelas infantiles y centros educativos.</p>
<p><strong>Problema a evitar:</strong> Que un centro educativo con múltiples aulas contrate la suscripción de 39 €/año y la proyecte para 80 alumnos en 5 clases.</p>

<h3>2. Valor y Estructura de la Licencia de Centro</h3>
<ul>
  <li><strong>Licencia multi-aula autorizada:</strong> Permiso de difusión pública y simultánea en las aulas de la escuela.</li>
  <li><strong>Herramienta de aula (En desarrollo):</strong> Guía Pedagógica de Rutinas de Aula (PDF) con sugerencias musicales para asamblea, transiciones de siesta, recogida y patio.</li>
  <li><strong>Facturación oficial B2B:</strong> Emisión de factura con CIF de empresa / cooperativa para desgravar como gasto de material del centro.</li>
  <li><strong>Sello digital:</strong> "Centro con Entorno Musical Musicabalú" para su web y jornadas de puertas abiertas.</li>
  <li><strong>Precio de referencia estimado:</strong> 180 € – 220 € / año (o ~19 €/mes).</li>
</ul>

<h3>3. Moneda de Cambio para Formaciones Presenciales (Sedes a coste cero)</h3>
<p>En negociaciones con escuelas infantiles para conseguir sala de formación presencial (sábados de 9h a 14h):</p>
<ul>
  <li>En lugar de pagar alquiler en metálico (150 € - 250 €), ofrecer un <strong>Convenio de Escuela Colaboradora</strong>:
    <ul>
      <li>2 plazas becadas para sus educadoras en la formación.</li>
      <li>1 año completo de Licencia de Centro Musicabalú para sus aulas.</li>
      <li>Mención del centro como sede colaboradora en la cartelería.</li>
    </ul>
  </li>
  <li><strong>Coste marginal para Musicabalú:</strong> 0 €. <strong>Valor percibido por el centro:</strong> &gt; 350 €.</li>
</ul>

<h3>4. Alianza Estratégica con EMPI: Acuerdo Win-Win y Campaña de Familias</h3>
<p>EMPI es nuestra sede histórica desde 2017. De sus ~100 familias de la mañana, un 15-20% ya asiste a las clases presenciales por la tarde, pero el 80% restante no puede acudir por horarios laborales o conciliación, aunque ya conocen a Javier y la actividad de oídas.</p>

<h4>A. El Paquete de Intercambio (Licencia a cambio de Difusión Oficial)</h4>
<ul>
  <li><strong>Lo que entrega Musicabalú a EMPI:</strong>
    <ul>
      <li>Licencia de Centro Institucional <strong>100% de cortesía</strong> (ahorro de ~200 €/año para EMPI).</li>
      <li>Permiso para usar las canciones en asambleas, siestas y patios, y presumir de proyecto musical MLT en sus matriculaciones.</li>
      <li>Mini-guía de apoyo a las educadoras para sacar el máximo partido a las canciones en el aula matinal.</li>
    </ul>
  </li>
  <li><strong>Lo que aporta EMPI a cambio (Compromiso de Difusión Activa):</strong>
    <ul>
      <li><strong>Comunicado oficial a familias:</strong> Mensaje por su canal de WhatsApp / App escolar presentando la plataforma no como "publicidad externa", sino como un <em>beneficio exclusivo conseguido por la escuela para su comunidad</em>.</li>
      <li><strong>Punto físico en la entrada:</strong> Cartel visible en la zona de carritos / recepción con código QR exclusivo ("¿Qué canciones canta tu peque en EMPI? Juega en casa con Musicabalú").</li>
      <li><strong>Mención en Redes Sociales:</strong> Story o publicación de EMPI mostrando a los peques cantando en clase y etiquetando a @musicabalu.</li>
    </ul>
  </li>
</ul>

<h4>B. Estrategia de Precio y Conversión para Familias EMPI (Código EMPI2026)</h4>
<ul>
  <li><strong>Por qué no rebajar la cuota mensual de 3,90 €:</strong> La cuota mensual ya es extremadamente económica. Un descuento testimonial (ej. bajar a 3 €) resta percepción de valor y apenas motiva a actuar.</li>
  <li><strong>La oferta ganadora: El Plan Anual Protegido con Código <code>EMPI2026</code>:</strong>
    <ul>
      <li><strong>Precio Promocional:</strong> Descuento exclusivo de 10 € en la suscripción anual (<strong>29 €/año</strong> el primer curso en vez de 39 €/año, equivalente a <strong>menos de 2,45 €/mes</strong>).</li>
      <li><strong>Gatillo de Urgencia:</strong> Promoción activa por tiempo limitado <strong>hasta el 31 de diciembre</strong>. Esto evita que los padres lo pospongan y asegura la caja anual por adelantado.</li>
      <li><strong>Alternativa de Entrada Suave:</strong> "1 mes de prueba gratuito" para las familias de EMPI para que experimenten el impacto en casa antes del primer cobro.</li>
    </ul>
  </li>
  <li><strong>El Efecto "Caballo de Troya":</strong> Cuando el bebé reconoce en casa la misma canción que cantó esa mañana con su seño en la asamblea, la emoción del padre y del niño es instantánea. La tasa de retención es máxima.</li>
</ul>

<hr style="margin: 25px 0; border: none; border-top: 1px solid #e2e8f0;" />

<h3>5. Borradores de Mensajes para Familias de EMPI (WhatsApp y App Escolar)</h3>
<p>Textos redactados con enfoque de <em>beneficio pedagógico exclusivo conseguido por el centro</em>, eliminando cualquier sensación de publicidad fría o spam comercial. Listos para que EMPI copie, pegue y envíe a sus familias.</p>

<div style="background: #e6f7fb; border-left: 4px solid #00b2e3; padding: 12px 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
  <strong>💡 Indicaciones para el Equipo Directivo y Educadoras de EMPI:</strong>
  <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 0.95rem; color: #2c3333;">
    <li><strong>Mejor día y hora de envío:</strong> Martes o jueves a las 14:00h (hora de siesta/recogida) o a las 18:30h (cuando las familias planifican la tarde).</li>
    <li><strong>Acompañamiento visual:</strong> Adjuntar una foto bonita de los peques en la asamblea con los pañuelos o la imagen del cartel A4.</li>
    <li><strong>Respuestas a dudas:</strong> Si algún padre pregunta en secretaría, confirmar que el código es <code>EMPI2026</code> y que funciona directamente desde la web <code>musicabalu.com/tienda</code>.</li>
  </ul>
</div>

<h4>Opción A: Formato WhatsApp / Lista de Difusión (Directo, cálido y visual)</h4>
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 18px; margin: 12px 0;">
  <p style="font-size: 0.85rem; color: #64748b; font-weight: bold; margin-top: 0; text-transform: uppercase;">📋 Texto listo para copiar en WhatsApp:</p>
  <pre style="background: #1e293b; color: #f1f5f9; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 0.92rem; white-space: pre-wrap; line-height: 1.55; margin: 0;">🎶 *¡Un regalo musical para disfrutar en casa con tu peque!* 👶✨

Familias de EMPI:

¿Habéis notado cómo vuestros peques reconocen las canciones que cantamos cada mañana en la asamblea o cómo se mecen y sonríen con ciertas melodías? 🥰

Desde la escuela cuidamos con mucho mimo cada detalle de su desarrollo sensorial y emocional. Por eso, en las aulas compartimos a diario las canciones y juegos de *Musicabalú*, el proyecto pedagógico de estimulación musical temprana creado por *Javi Muñoz* (a quien muchas familias ya conocéis por sus clases presenciales de las tardes en EMPI).

Hoy os traemos una noticia muy especial: *hemos conseguido un beneficio exclusivo para las familias de nuestra escuela.* 🎉

Para que podáis continuar en casa esas mismas melodías, juegos corporales y momentos de calma que viven en el aula, Javier nos ha facilitado un acceso preferente a su plataforma digital:

💛 *100% libre de pantallas:* Solo música pura, sesiones guiadas en audio, nanas y juegos de regazo diseñados para su oído en desarrollo (0 a 3 años).
🎶 *Las mismas canciones del aula:* La emoción de reconocer en casa lo que ha cantado por la mañana con su seño.
✨ *Descuento exclusivo para familias EMPI:* Suscripción de todo un curso por solo *29 €/año* (en vez de los 39 € habituales, ¡menos de 2,45 € al mes!).

👉 *¿Cómo acceder con la ventaja de EMPI?*
1. Entrad en: https://musicabalu.com/tienda
2. Seleccionad la suscripción anual e introducid el cupón: *EMPI2026*
3. ¡Y a disfrutar cantando, bailando y conectando en familia!

*(Ventaja exclusiva activa para este inicio de curso hasta el 31 de diciembre)*.

Ojalá lo disfrutéis tanto en el salón de casa como nosotros lo disfrutamos cada mañana con ellos en la escuela. 🧸🌿

*Equipo Pedagógico EMPI & Musicabalú*</pre>
</div>

<h4>Opción B: Comunicado Oficial para App Escolar / Circular Digital (Kinder, TokApp o Email)</h4>
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 18px; margin: 12px 0;">
  <p style="font-size: 0.85rem; color: #64748b; font-weight: bold; margin-top: 0; text-transform: uppercase;">📋 Texto para App Escolar / Comunicado Formal:</p>
  <pre style="background: #1e293b; color: #f1f5f9; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 0.92rem; white-space: pre-wrap; line-height: 1.55; margin: 0;">Asunto: [Convenio Pedagógico] Beneficio exclusivo para familias EMPI: Estimulación musical Musicabalú en casa

Estimadas familias:

En la Escuela Infantil EMPI creemos firmemente en la música como uno de los vehículos más poderosos para el desarrollo cerebral, lingüístico y afectivo durante los tres primeros años de vida.

Como sabéis, en el día a día de nuestras aulas utilizamos activamente los recursos musicales y canciones de Musicabalú, creadas por Javi Muñoz bajo los principios de la Teoría del Aprendizaje Musical (MLT) de Edwin Gordon. La respuesta de los niños en las asambleas, los momentos de transición y las rutinas de descanso es sumamente enriquecedora.

Muchos de vosotros nos habéis preguntado a menudo por las canciones que tararean vuestros hijos al salir del cole y cómo podíais compartirlas en casa sin recurrir a pantallas ni vídeos que sobreestimulan a los bebés.

Fruto de nuestra estrecha colaboración de más de 9 cursos con Javier, hemos formalizado un acuerdo para que todas las familias de EMPI podáis disponer de su plataforma digital en condiciones preferentes:

¿Qué incluye la plataforma Musicabalú?
• Repertorio musical completo: Canciones en modos y métricas variadas que nutren el oído musical y el lenguaje de forma natural.
• Sesiones guiadas en audio: Experiencias de 20-25 minutos donde Javier guía dinámicas con pañuelos, balanceos y juegos sensoriales para disfrutar en familia.
• Recursos para rutinas cotidianas: Canciones para el despertar, el baño, el coche y el momento de conciliar el sueño.
• Formato 100% analógico/auditivo: Diseñado expresamente para proteger a los peques del impacto de las pantallas.

Condiciones exclusivas para familias EMPI:
Gracias a este acuerdo de escuela colaboradora, podéis acceder a la suscripción anual con un descuento especial:
• Cuota especial: 29 € por un año completo de acceso (precio habitual: 39 €/año).
• Código promocional: EMPI2026
• Enlace de registro: https://musicabalu.com/tienda
• Periodo de activación: Disponible hasta el 31 de diciembre.

Asimismo, podéis encontrar el cartel informativo con código QR directo instalado en la entrada de la escuela (junto a la zona de carritos).

Esperamos de corazón que este recurso os acompañe en tardes de juego compartido y momentos de conexión inolvidables.

Afectuosamente,
Dirección y Equipo Docente
Escuela Infantil EMPI</pre>
</div>

<h4>Opción C: Recordatorio Breve de Urgencia (A enviar 72h antes del fin de plazo)</h4>
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 18px; margin: 12px 0;">
  <p style="font-size: 0.85rem; color: #64748b; font-weight: bold; margin-top: 0; text-transform: uppercase;">📋 Mensaje rápido de seguimiento:</p>
  <pre style="background: #1e293b; color: #f1f5f9; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 0.92rem; white-space: pre-wrap; line-height: 1.55; margin: 0;">⏰ *¡Últimos días de la ventaja exclusiva para familias de EMPI!* 🎶

Hola a todas las familias:

Os recordamos que esta semana finaliza la promoción especial que acordamos con *Musicabalú* para que podáis disfrutar en casa de las canciones y sesiones de audio que vuestros peques cantan en el aula.

Con el cupón *EMPI2026* tenéis la suscripción anual a solo *29 €/año* (frente a los 39 € habituales, menos de 2,45 €/mes).

👉 Acceso directo: https://musicabalu.com/tienda
🎟 Cupón: *EMPI2026*

¡Un recurso precioso para cantar, jugar y relajarse juntos sin pantallas estas vacaciones! 💛👶</pre>
</div>

<hr style="margin: 25px 0; border: none; border-top: 1px solid #e2e8f0;" />

<h3>6. Diseño y Maqueta del Cartel A4 con Código QR para la Entrada de EMPI</h3>
<p>Diseño concebido para captar la atención de los padres en los <strong>5 segundos</strong> que tardan en dejar o recoger el carrito en la entrada de EMPI.</p>

<div style="background: #fdf2f4; border-left: 4px solid #f4436c; padding: 12px 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
  <strong>🎯 Claves Estratégicas del Diseño A4:</strong>
  <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 0.95rem; color: #2c3333;">
    <li><strong>Ubicación recomendada:</strong> Zona de aparcamiento de carritos y mostrador de recepción en peana de metacrilato A4 o plastificado a la altura de los ojos.</li>
    <li><strong>Titular gancho:</strong> <em>"¿Qué canciones canta tu peque en la asamblea de EMPI?"</em> (conecta de inmediato con la vivencia matinal del niño).</li>
    <li><strong>Código QR de alta definición:</strong> Generado en formato vectorial SVG y apuntando a <code>https://musicabalu.com/tienda?codigo=EMPI2026</code>.</li>
    <li><strong>Herramienta interactiva de impresión:</strong> Creada la página interna <a href="/admin/cartel-empi" target="_blank" style="color: #f4436c; font-weight: bold; text-decoration: underline;">/admin/cartel-empi</a> para imprimir directamente en A4 o descargar en PDF con proporciones perfectas.</li>
  </ul>
</div>

<div style="text-align: center; margin: 20px 0;">
  <a href="/admin/cartel-empi" target="_blank" style="display: inline-block; padding: 12px 24px; background: #f4436c; color: white; border-radius: 30px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 12px rgba(244, 67, 108, 0.3);">
    🖨️ Abrir Generador y Vista de Impresión A4 (/admin/cartel-empi)
  </a>
</div>

<h4>Vista Previa del Cartel (Proporciones y Maquetación):</h4>
<div style="max-width: 650px; margin: 20px auto; background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 30px 25px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); font-family: sans-serif;">
  <!-- Cabecera -->
  <div style="text-align: center; border-bottom: 2px dashed #e2e8f0; padding-bottom: 12px; margin-bottom: 15px;">
    <div style="display: inline-flex; align-items: center; gap: 8px; background: #f8fafc; border: 1px solid #cbd5e1; padding: 4px 14px; border-radius: 15px;">
      <span style="font-weight: 800; font-size: 0.85rem; color: #0284c7;">ESCUELA INFANTIL EMPI</span>
      <span style="color: #94a3b8; font-size: 0.75rem;">✕</span>
      <span style="font-weight: 800; font-size: 0.85rem; color: #f4436c;">MUSICABALÚ</span>
    </div>
    <p style="font-size: 0.75rem; color: #64748b; margin: 5px 0 0; text-transform: uppercase; letter-spacing: 0.5px;">Alianza pedagógica por el desarrollo musical en la primera infancia</p>
  </div>

  <!-- Hero Titular -->
  <div style="text-align: center; margin-bottom: 15px;">
    <h2 style="font-size: 1.55rem; color: #1e293b; margin: 0 0 6px 0; font-weight: 800; line-height: 1.2;">
      ¿Qué canciones canta tu peque en la asamblea de <span style="color: #f4436c; text-decoration: underline wavy #fed65e;">EMPI</span>?
    </h2>
    <p style="font-size: 0.95rem; color: #475569; margin: 0; line-height: 1.4;">
      Lleva la música viva de su aula al salón de casa. Estimulación de 0 a 3 años <strong>100% libre de pantallas</strong>.
    </p>
  </div>

  <!-- 3 Pilares -->
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 15px;">
    <div style="background: #fdf2f4; border: 1px solid #fbcfe8; padding: 10px; border-radius: 8px; text-align: center;">
      <div style="font-size: 1.3rem;">🎵</div>
      <strong style="font-size: 0.82rem; color: #1e293b; display: block; margin: 3px 0;">Canciones del aula</strong>
      <p style="font-size: 0.72rem; color: #475569; margin: 0; line-height: 1.3;">Melodías ricas en modos y ritmos que ya reconoce con su seño.</p>
    </div>
    <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 10px; border-radius: 8px; text-align: center;">
      <div style="font-size: 1.3rem;">🧸</div>
      <strong style="font-size: 0.82rem; color: #1e293b; display: block; margin: 3px 0;">Juego y calma</strong>
      <p style="font-size: 0.72rem; color: #475569; margin: 0; line-height: 1.3;">Sesiones guiadas para cantar, mecer y acompañar el baño y el sueño.</p>
    </div>
    <div style="background: #f7fee7; border: 1px solid #d9f99d; padding: 10px; border-radius: 8px; text-align: center;">
      <div style="font-size: 1.3rem;">🚫📱</div>
      <strong style="font-size: 0.82rem; color: #1e293b; display: block; margin: 3px 0;">Cero pantallas</strong>
      <p style="font-size: 0.72rem; color: #475569; margin: 0; line-height: 1.3;">Cuidamos su descanso y atención a través de la escucha activa.</p>
    </div>
  </div>

  <!-- Bloque QR + Oferta -->
  <div style="display: flex; gap: 15px; align-items: center; background: white; border: 2px solid #00b2e3; border-radius: 10px; padding: 14px; margin-bottom: 15px;">
    <div style="flex: 0 0 110px; text-align: center;">
      <img src="/qr-empi.svg" alt="QR EMPI" style="width: 100px; height: 100px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 2px;" />
      <span style="display: block; font-size: 0.7rem; color: #0284c7; font-weight: bold; margin-top: 3px;">📷 Apunta con tu móvil</span>
    </div>
    <div style="flex: 1;">
      <span style="background: #f4436c; color: white; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 10px; display: inline-block;">⭐ VENTAJA EXCLUSIVA EMPI ⭐</span>
      <h4 style="margin: 3px 0; font-size: 0.95rem; color: #1e293b;">Acceso completo a la plataforma</h4>
      <div style="display: flex; align-items: baseline; gap: 6px; margin: 2px 0;">
        <span style="text-decoration: line-through; color: #94a3b8; font-size: 0.85rem;">39 €/año</span>
        <span style="font-size: 1.3rem; font-weight: 900; color: #00b2e3;">29 € <small style="font-size: 0.75rem; color: #64748b;">/ año</small></span>
      </div>
      <div style="background: #fef9e7; border: 1px solid #fed65e; padding: 3px 8px; border-radius: 6px; display: inline-flex; gap: 5px; font-size: 0.78rem; align-items: center;">
        <span>Cupón:</span>
        <strong style="background: #fed65e; color: #451a03; padding: 1px 4px; border-radius: 3px; font-family: monospace;">EMPI2026</strong>
      </div>
      <p style="font-size: 0.72rem; color: #64748b; margin: 4px 0 0;">✨ Válido hasta el 31 de diciembre para familias de la escuela.</p>
    </div>
  </div>

  <!-- Pie -->
  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 8px;">
    <img src="/logo_texto_corazon.png" alt="Musicabalú" style="height: 28px; width: auto;" />
    <div style="text-align: right;">
      <span style="font-weight: bold; color: #f4436c; font-size: 0.82rem;">www.musicabalu.com/tienda</span>
      <p style="font-size: 0.68rem; color: #64748b; margin: 1px 0 0;">Por Javi Muñoz · Murcia</p>
    </div>
  </div>
</div>

<hr style="margin: 25px 0; border: none; border-top: 1px solid #e2e8f0;" />

<h3>7. Estado Actual y Próximos Pasos</h3>
<ul>
  <li>[x] Cláusula de uso familiar y aviso para centros añadido a la tienda web (/tienda).</li>
  <li>[x] Definición del marco de colaboración y estrategia con EMPI.</li>
  <li>[x] <strong>Redacción del borrador de mensaje para que EMPI lo envíe por su WhatsApp/App a las familias.</strong> (Ver Sección 5)</li>
  <li>[x] <strong>Diseño del cartel A4 con código QR para colocar en la entrada de EMPI.</strong> (Ver Sección 6 y herramienta imprimible en <code>/admin/cartel-empi</code>)</li>
  <li>[ ] Activación técnica del cupón promocional <code>EMPI2026</code> en Stripe/Web (descuento a 29 € anuales).</li>
  <li>[ ] Redacción de la Guía Pedagógica de Rutinas de Aula (PDF) para educadoras.</li>
</ul>`;

  if (existing) {
    await prisma.adminNote.update({
      where: { id: existing.id },
      data: { content: updatedContent }
    });
    console.log(`Proyecto actualizado en la base de datos (ID: ${existing.id})`);
  } else {
    console.log('No se encontró el proyecto para actualizar.');
  }
}

main().finally(() => prisma.$disconnect());
