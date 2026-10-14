import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const title = 'Libro de Alto Contraste: Estimulación Visual B/N y Audiation Temprana (0 a 6 meses)';
const category = 'Editorial';

const content = `<h3>1. Visión y Justificación Científica</h3>
<p>Creación del primer proyecto pedagógico que une la <strong>neurociencia visual de la primera infancia</strong> (0 a 6 meses) con la <strong>estimulación auditiva y musical respetuosa (MLT de Edwin Gordon)</strong>. Un recurso diseñado para el momento del suelo (<em>Tummy Time</em>), la calma y la conexión de apego seguro en el hogar.</p>

<div style="background: #f8fafc; border-left: 4px solid #1a202c; padding: 14px 18px; margin-bottom: 18px; border-radius: 0 8px 8px 0;">
  <p style="margin: 0; color: #2d3748; font-weight: 600;">El Principio del Doble Contraste (Ojos y Oídos):</p>
  <p style="margin: 6px 0 0 0; color: #4a5568; font-size: 0.95rem;">
    Al nacer, la retina del bebé solo responde con fuerza al <strong>contraste lumínico extremo (blanco puro contra negro puro)</strong> a una distancia de 20-30 cm. Del mismo modo, el oído interno y el cerebro musical del bebé (<em>audiation</em>) no aprenden por estimulación ruidosa continua, sino por el <strong>contraste de modos (Mayor/Menor/Dórico), compases (ternario/binario) y sonido frente a silencio activo</strong>.
  </p>
</div>

<h3>2. El Dilema del Formato: ¿Código QR o Libro Sonoro Físico?</h3>
<p><strong>El problema del QR lámina por lámina:</strong> Obligar a la madre o al padre a escanear un código en cada página con el móvil mientras acompaña al bebé en el suelo es incómodo, genera fricción y rompe el clima de presencia introduciendo una pantalla de por medio.</p>

<h4>Estrategia en 2 Vías de Desarrollo:</h4>
<ul>
  <li><strong>Vía A (El Producto Ideal y Definitivo): Libro Sonoro Físico con Módulo Integrado</strong>
    <ul>
      <li><em>Mecanismo:</em> Botones de presión ultra-suave integrados en el propio cartón del libro o en una barra lateral. Cero pantallas, cero móviles.</li>
      <li><em>Calidad acústica cuidada:</em> Chip de compresión vocal de alta definición y membrana altavoz con micro-caja de resonancia, calibrado a volumen suave y seguro para el oído del recién nacido (máximo 60-65 dB).</li>
      <li><em>Valor de mercado:</em> Es el regalo por excelencia para recién nacidos (Baby Shower, regalos de nacimiento, canastillas de farmacia/puericultura). Gran atractivo para editoriales especializadas (Kalandraka, Timun Mas, Combel).</li>
    </ul>
  </li>
  <li><strong>Vía B (El Prototipo / MVP Ágil de Validación): Libro Acordeón + "Modo Manos Libres" (1 Solo QR)</strong>
    <ul>
      <li><em>Solución al móvil:</em> En lugar de un QR por lámina, el libro incluye <strong>UN ÚNICO código QR de "Sesión Tummy Time Continua (8 a 10 min)"</strong>.</li>
      <li><em>Experiencia:</em> La madre escanea una sola vez antes de colocar al bebé en la manta, deja el móvil boca abajo a 2 metros de distancia, y la pista de audio corre de forma continua guiando suavemente el paso de una lámina a otra mediante un sonido sutil o campana tibetana.</li>
      <li><em>Coste:</em> Permite imprimir tiradas cortas (500 ejemplares) en imprenta local sin inversión en chips electrónicos para validar la acogida de las familias.</li>
    </ul>
  </li>
</ul>

<h3>3. Estructura del Libro (Formato Acordeón Desplegable)</h3>
<p>Formato de cartón grueso plastificado mate (antirreflejo) en fuelle / acordeón que se mantiene de pie solo en el suelo de la manta de juegos:</p>
<ul>
  <li><strong>Cara 1 (Fase 0 a 3 meses — Alto Contraste Puro B/N):</strong>
    <ul>
      <li><strong>Lámina 1: Espirales y Círculos Concéntricos:</strong> Audio de balanceo ternario suave a tempo cardíaco (60-70 BPM).</li>
      <li><strong>Lámina 2: El Rostro Humano Simplificado:</strong> Patrones tonales en sílaba neutra con pausas de silencio activo de 5 segundos para buscar la mirada y la respuesta del bebé.</li>
      <li><strong>Lámina 3: Olas y Líneas Fluidas:</strong> Melodía modal en modo Dórico (sensación de flotación y sosiego).</li>
      <li><strong>Lámina 4: Tablero Geométrico / Damero:</strong> Recitado rítmico susurrado para acompañar con caricias rítmicas en la espalda o pies.</li>
    </ul>
  </li>
  <li><strong>Cara 2 (Fase 3 a 6 meses — Introducción del Color Rojo y Formas Orgánicas):</strong>
    <ul>
      <li>El ojo del bebé ya madura los conos para el color rojo y amarillo.</li>
      <li>Figuras reconocibles: El oso Balú, la luna, el árbol, el pájaro.</li>
      <li>Canciones con pequeñas palabras y juegos vocales de imitación motriz.</li>
    </ul>
  </li>
</ul>

<h3>4. Viabilidad Comercial y Posicionamiento</h3>
<ul>
  <li><strong>Entrada temprana al ecosistema Musicabalú:</strong> Permite captar a familias en sus primeras semanas de vida (0-2 meses), meses antes de que puedan acudir a las clases presenciales o talleres.</li>
  <li><strong>PVP Estimado:</strong>
    <ul>
      <li>Versión Libro Sonoro Físico con Módulo: <strong>19 € – 24 €</strong>.</li>
      <li>Versión Libro Acordeón + QR Sesión Manos Libres: <strong>14 € – 16 €</strong>.</li>
    </ul>
  </li>
  <li><strong>Público objetivo:</strong> Familias primerizas conscientes, educadoras de aulas de bebés (0-1 año) y catálogo de regalos de nacimiento.</li>
</ul>

<h3>5. Hoja de Ruta y Próximos Pasos</h3>
<ul>
  <li>[ ] Diseñar los 6 patrones geométricos iniciales en blanco y negro (vectores de alta resolución).</li>
  <li>[ ] Grabar la pista piloto de "Sesión Tummy Time Manos Libres" (8 minutos continuos con canciones, recitados y silencios).</li>
  <li>[ ] Contactar con proveedores de imprenta de libros de cartón (España) y fabricantes de módulos sonoros infantiles para comparar presupuestos de tirada mínima.</li>
  <li>[ ] Testear el prototipo con 3 bebés de menos de 3 meses en las familias de la escuela EMPI.</li>
</ul>`;

async function main() {
  const existing = await prisma.adminNote.findFirst({
    where: { title: { contains: 'Alto Contraste' } }
  });

  if (existing) {
    const updated = await prisma.adminNote.update({
      where: { id: existing.id },
      data: { title, category, content }
    });
    console.log(`Proyecto actualizado en la base de datos (ID: ${updated.id})`);
  } else {
    const created = await prisma.adminNote.create({
      data: { title, category, content }
    });
    console.log(`Proyecto creado en la base de datos (ID: ${created.id})`);
  }
}

main().finally(() => prisma.$disconnect());
