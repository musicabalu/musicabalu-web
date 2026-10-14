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

<h3>5. Estado Actual y Próximos Pasos</h3>
<ul>
  <li>[x] Cláusula de uso familiar y aviso para centros añadido a la tienda web (/tienda).</li>
  <li>[x] Definición del marco de colaboración y estrategia con EMPI.</li>
  <li>[ ] Redacción del borrador de mensaje para que EMPI lo envíe por su WhatsApp/App a las familias.</li>
  <li>[ ] Diseño del cartel A4 con código QR para colocar en la entrada de EMPI.</li>
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
