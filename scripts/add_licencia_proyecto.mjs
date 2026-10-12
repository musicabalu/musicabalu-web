import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const existingNotes = await prisma.adminNote.findMany({
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Existen ${existingNotes.length} notas en el Laboratorio de Proyectos:`);
  existingNotes.forEach(n => console.log(`- [${n.category}] ${n.title} (ID: ${n.id})`));

  const noteTitle = 'Licencias para Centros Educativos y Escuelas Infantiles';
  const noteCategory = 'Estrategia';

  const noteContent = `<h3>1. Concepto y Justificación</h3>
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

<h3>4. Estrategia Especial para EMPI (Sede Histórica)</h3>
<ul>
  <li><strong>No cobrar como cliente frío:</strong> Tras 9 años de relación y con contrato de alquiler en vigor, EMPI recibe la <strong>Licencia de Centro Institucional 100% de cortesía</strong>.</li>
  <li><strong>Efecto Caballo de Troya:</strong> Si las educadoras ponen las canciones en el aula matinal, los bebés las cantan en casa y las familias de la mañana se convierten en suscriptores de la app y en alumnos de tarde.</li>
  <li><strong>Formaciones en EMPI:</strong> Formación bonificada para el equipo docente de EMPI a cambio del uso de las instalaciones para talleres externos.</li>
</ul>

<h3>5. Estado Actual y Próximos Pasos</h3>
<ul>
  <li>[x] Cláusula de uso familiar y aviso para centros añadido a la tienda web (/tienda).</li>
  <li>[ ] Redacción de la Guía Pedagógica de Rutinas de Aula (PDF) para educadoras.</li>
  <li>[ ] Plantilla de 1 página de "Convenio de Centro Colaborador" para prospección de sedes de formación.</li>
</ul>`;

  const existing = existingNotes.find(n => n.title.toLowerCase().includes('licencias para centros'));

  if (existing) {
    const updated = await prisma.adminNote.update({
      where: { id: existing.id },
      data: {
        title: noteTitle,
        category: noteCategory,
        content: noteContent
      }
    });
    console.log(`Nota actualizada con éxito: ${updated.id}`);
  } else {
    const created = await prisma.adminNote.create({
      data: {
        title: noteTitle,
        category: noteCategory,
        content: noteContent
      }
    });
    console.log(`Nota creada con éxito en el Laboratorio: ${created.id}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
