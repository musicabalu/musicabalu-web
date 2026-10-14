import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const proyectos = [
  {
    title: 'Libros: "Enseña Siendo" y "Emprende Siendo"',
    category: 'Editorial',
    content: `<h3>1. Visión y Resumen del Proyecto Editorial</h3>
<p>Creación de dos obras editoriales complementarias que recogen la filosofía integral de <strong>Musicabalú</strong>: una dirigida a la pedagogía y la presencia en el aula infantil (<em>Enseña Siendo</em>) y otra dirigida a la mentalidad, la educación financiera y la construcción de sistemas para creadores (<em>Emprende Siendo</em>).</p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />

<h3>📖 Libro I: Enseña Siendo</h3>
<div style="background: #fdf2f4; border-left: 4px solid #f4436c; padding: 12px 16px; margin-bottom: 16px; border-radius: 0 8px 8px 0;">
  <p style="margin: 0; font-style: italic; color: #4a5568;">
    <strong>Visión:</strong> "Conecta todo lo que haces con tu visión. La música en la primera infancia no se enseña desde el intelecto, se transmite desde el estado del ser."
  </p>
  <p style="margin: 8px 0 0 0; font-size: 0.95rem; color: #718096;">
    <em>"No puedes enseñar lo que no escuchas internamente (audiation), pero tampoco puedes transmitir paz, atención y presencia si tu mente está en otra parte. El mejor modelo musical para un niño es un adulto siendo, no haciendo."</em>
  </p>
</div>

<p><strong>Idea Central:</strong> La integración de la Teoría del Aprendizaje Musical (MLT) de Edwin Gordon con la educación consciente, la neurociencia y la espiritualidad práctica (Eckhart Tolle, Dr. David Hawkins). Cómo la calidad de nuestra presencia es el verdadero instrumento musical.</p>

<h4>Borrador de Índice:</h4>
<ul>
  <li><strong>I. El Instrumento Eres Tú (La Preparación Interior):</strong>
    <ul>
      <li>1. El mito del profesor "animador": Por qué sobreestimular a los bebés apaga su escucha. Del "hacer por hacer" al "estar presente".</li>
      <li>2. El nivel de conciencia en el aula: La escala de la conciencia (Hawkins) aplicada a la enseñanza. Cómo el estado emocional del educador afina o desafina la sala.</li>
      <li>3. Audiation espiritual: Escuchar la música por dentro antes de que suene y escuchar al niño antes de que hable. El silencio como base del sonido.</li>
    </ul>
  </li>
  <li><strong>II. La Ciencia y el Alma del Aprendizaje Musical:</strong>
    <ul>
      <li>4. El cerebro del bebé: Cómo la neurociencia respalda el aprendizaje natural y por qué la MLT funciona cuando no forzamos cognitivamente.</li>
      <li>5. Modos, métricas y emociones: Por qué salir del Do Mayor no solo enriquece el cerebro, sino que expande el rango emocional del niño (y del adulto).</li>
      <li>6. El movimiento fluido: Emmi Pikler y Rudolf Laban. Liberar la rigidez del cuerpo del adulto para que el niño pueda "sentir" el peso, el flujo y el espacio de la música.</li>
    </ul>
  </li>
  <li><strong>III. Las Dinámicas de la Sesión Consciente:</strong>
    <ul>
      <li>7. El vínculo seguro como única métrica de éxito: Si los padres están estresados, el bebé no absorbe. Cómo educar a las familias para soltar la exigencia.</li>
      <li>8. Los patrones tonales y rítmicos: No son ejercicios, son nuestras primeras "palabras" en un diálogo de almas.</li>
      <li>9. Gestión del "caos" en el aula: Qué hacer cuando los niños lloran, corren o no participan. El desapego al resultado y la aceptación profunda del "lo que es".</li>
    </ul>
  </li>
  <li><strong>IV. El Legado del Educador:</strong>
    <ul>
      <li>10. Enseñar sin ego: Convertirse en un canal. Cuando dejas de querer ser un "gran profesor", la música empieza a fluir a través de ti.</li>
      <li>11. La música en lo cotidiano: Transformando rutinas (sueño, baño, rabietas) en momentos de anclaje musical y espiritual.</li>
    </ul>
  </li>
</ul>
<p><strong>Próximos Pasos para el Autor:</strong> Añadir en cada capítulo una anécdota real de las clases presenciales en Murcia o de la Comunidad Musicabalú que ilustre estos principios. El contraste entre "la teoría" y la mirada de un bebé cuando entiende un patrón en modo Dórico.</p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />

<h3>💼 Libro II: Emprende Siendo</h3>
<div style="background: #e6f7fb; border-left: 4px solid #00b2e3; padding: 12px 16px; margin-bottom: 16px; border-radius: 0 8px 8px 0;">
  <p style="margin: 0; font-style: italic; color: #4a5568;">
    <strong>Visión:</strong> "Tu proyecto es un espejo de tus creencias limitantes. Cómo unir la mentalidad financiera, el marketing ético y la creación artística sin perder el alma (ni el dinero) en el intento."
  </p>
  <p style="margin: 8px 0 0 0; font-size: 0.95rem; color: #718096;">
    <em>"El artista suele huir del dinero por miedo a ensuciar su arte. El empresario suele huir del arte buscando escalabilidad. Musicabalú nació cuando entendí que la educación financiera y el propósito vital son exactamente la misma energía: la creación de valor genuino."</em>
  </p>
</div>

<p><strong>Idea Central:</strong> Un manual para músicos, educadores y creadores que quieren vivir de lo que aman. Combinando lecciones de <em>Padre Rico, Padre Pobre</em>, <em>Hábitos Atómicos</em> y el desapego budista con el mundo real de crear una academia, membresía o marca personal (basado en el caso de estudio real de Musicabalú).</p>

<h4>Borrador de Índice:</h4>
<ul>
  <li><strong>I. La Psicología del Músico Emprendedor (Mindset):</strong>
    <ul>
      <li>1. El "Síndrome del Artista Pobre": Desmontando la creencia de que cobrar por tu pasión te hace menos auténtico.</li>
      <li>2. Emprender desde la abundancia vs. desde el miedo: La diferencia energética entre vender para llegar a fin de mes y ofrecer un servicio que cambia vidas.</li>
      <li>3. Tu negocio es tu espejo: Cómo tus bloqueos emocionales se reflejan en tus embudos de ventas, tus precios y tu trato con los clientes.</li>
    </ul>
  </li>
  <li><strong>II. Educación Financiera para Creadores:</strong>
    <ul>
      <li>4. Activos vs. Pasivos en el arte: Por qué dar clases presenciales es tu trabajo (intercambio tiempo/dinero), pero crear una comunidad digital, un disco o un libro es construir un activo.</li>
      <li>5. El Cuadrante del Flujo del Dinero en la Música: De autoempleado (profesor de extraescolares) a dueño de un sistema (Musicabalú Plataforma).</li>
      <li>6. Poner precio a lo invisible: Cómo calcular el valor de lo que aportas. La trampa de cobrar por horas frente a cobrar por transformación.</li>
    </ul>
  </li>
  <li><strong>III. Marketing Consciente y Sistemas:</strong>
    <ul>
      <li>7. Hábitos Atómicos en la creación de contenido: Construir una audiencia no se hace con un vídeo viral, sino con el 1% de mejora diaria. La constancia como práctica espiritual.</li>
      <li>8. Vender es servir: Cambiar el enfoque del marketing transaccional a la creación de relaciones a largo plazo (el caso de las familias en Murcia).</li>
      <li>9. Automatización con alma: Cómo sistematizar inscripciones, pagos (Stripe, Vercel) y correos para tener tiempo de ser creativo y padre.</li>
    </ul>
  </li>
  <li><strong>IV. El Camino del Emprendedor Espiritual:</strong>
    <ul>
      <li>10. Fracaso, experimentación y desapego: Lo que aprendí cuando un lanzamiento no funciona o un grupo no se llena. Pivotar sin sufrir.</li>
      <li>11. El éxito silencioso: Redefinir qué significa "triunfar". No es tener un imperio multinacional, es la libertad de componer una canción a tu hijo un martes por la mañana.</li>
    </ul>
  </li>
</ul>
<p><strong>Próximos Pasos para el Autor:</strong> Apuntar los grandes "fracasos" de Musicabalú y cómo se solucionaron aplicando conceptos de Kiyosaki, Raimon Samsó ("El Código del Dinero") o Wayne Dyer. Hacer visible los números y la estructura de negocio de Musicabalú para que otros músicos vean que es posible.</p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />

<h3>🚀 Sinergia y Estrategia de Lanzamiento</h3>
<ul>
  <li>[ ] Recopilar anécdotas y lecciones de aula de los 9 cursos en Murcia.</li>
  <li>[ ] Redactar el manuscrito en Notion / Obsidian capítulo a capítulo (1 capítulo al mes).</li>
  <li>[ ] Publicar pequeños extractos en redes sociales y newsletter como artículos de reflexión ("píldoras de pensamiento").</li>
  <li>[ ] Edición independiente en Amazon KDP (tapa blanda + ebook) o presentación a editoriales de pedagogía / crecimiento personal.</li>
</ul>`
  },
  {
    title: 'Libro Sonoro Musicabalú (12 Canciones + Ilustraciones)',
    category: 'Estrategia',
    content: `<h3>1. Concepto y Justificación del Producto</h3>
<p>El <strong>Libro Sonoro Musicabalú</strong> es un libro físico interactivo diseñado específicamente para la primera infancia (0 a 3 años), que combina ilustraciones de gran formato con un módulo sonoro integrado (botones con microchips de sonido) o códigos QR pedagógicos de acceso directo.</p>
<p><strong>Propósito central:</strong> Ofrecer a las familias una alternativa de estimulación musical <strong>100% activa, táctil y libre de pantallas</strong>. El bebé pulsa, escucha y canta mientras interactúa con los dibujos y con sus padres, fomentando la autonomía y la audiation desde los primeros meses.</p>

<h3>2. Repertorio y Formato Pedagógico</h3>
<ul>
  <li><strong>12 pistas seleccionadas:</strong> Repertorio propio de Musicabalú estructurado según la Teoría del Aprendizaje Musical (MLT) de E. Gordon.</li>
  <li><strong>Riqueza modal y métrica:</strong> Incluye canciones en modos no habituales (menor, dórico, mixolidio) y compases ternarios/compuestos, rompiendo el monopolio de las canciones infantiles comerciales en Do Mayor estándar.</li>
  <li><strong>Syllables y patrones:</strong> Canciones con y sin palabras para incentivar la fonación y el balbuceo musical del bebé.</li>
  <li><strong>Páginas de cartón grueso (Board Book):</strong> Esquinas redondeadas, aptas para la manipulación y la exploración oral/motriz de los más pequeños.</li>
</ul>

<h3>3. Análisis Financiero y Modelo de Negocio (Piso 3: E-Commerce)</h3>
<ul>
  <li><strong>PVP estimado al público:</strong> 18 € – 22 € (vía editorial) o 24 € – 28 € (vía web/tienda propia).</li>
  <li><strong>Margen bruto / Royalties:</strong>
    <ul>
      <li><strong>Vía Editorial:</strong> Royalties del 8% al 12% sobre PVP neto, con distribución asegurada en grandes superficies y librerías.</li>
      <li><strong>Vía Autoedición (Directo al consumidor):</strong> Margen bruto del 50% al 60% por unidad vendida a través de musicabalu.com y en la escuela presencial.</li>
    </ul>
  </li>
  <li><strong>Prioridad estratégica:</strong> Clasificado en el Plan Estratégico Maestro como <em>Proyecto a Medio/Largo Plazo</em> tras asentar la suscripción de la Comunidad y los cursos B2B.</li>
</ul>

<h3>4. Estrategia Editorial en 2 Fases</h3>
<ul>
  <li><strong>Fase 1: Vía Editorial Tradicional (Recomendada inicial):</strong>
    <ul>
      <li>Presentar dossier a editoriales de referencia infantil: <strong>Kalandraka, Nubeocho, Takatuka, A buen paso, Edelvives</strong>.</li>
      <li><em>Ventaja:</em> Cero inversión inicial de capital en fabricación asiática y distribución nacional inmediata en librerías especializadas.</li>
    </ul>
  </li>
  <li><strong>Fase 2: Plan de Contingencia / Autoedición con Códigos QR:</strong>
    <ul>
      <li>Si los costes de fabricación de chips de sonido exigen tiradas mínimas inasumibles (>3.000 uds), producir un <em>Álbum Ilustrado con QR Codes de Audio Exclusivo</em> en imprenta nacional (inversión de 1.500 € – 3.000 €).</li>
      <li>Permite testear la tracción del mercado directamente con las familias de la escuela y seguidores de Instagram antes de dar el salto al módulo electrónico.</li>
    </ul>
  </li>
</ul>

<h3>5. Estado Actual y Checklist de Ejecución</h3>
<ul>
  <li>[x] Definición conceptual en el Plan Estratégico 2026.</li>
  <li>[ ] Selección definitiva de las 12 canciones y recitados (másteres de audio en alta definición).</li>
  <li>[ ] Búsqueda y selección de ilustrador/a con estilo afín a la estética cálida y moderna de Musicabalú.</li>
  <li>[ ] Diseño del Pitch Deck editorial (dossier de 4 páginas con muestras de audio y propuesta pedagógica).</li>
  <li>[ ] Solicitud de presupuestos a imprentas especializadas en libros interactivos infantiles.</li>
</ul>`
  },
  {
    title: 'Sesiones en Audio: La Experiencia de Clase en Casa (Sin Pantallas)',
    category: 'Tienda',
    content: `<h3>1. Concepto y Propuesta de Valor</h3>
<p><strong>Sesiones en Audio</strong> es una nueva línea de producto diseñada para llevar la experiencia viva, cercana y pedagógica de las clases presenciales de Musicabalú directamente a las casas de las familias, <strong>sin necesidad de recurrir a pantallas ni vídeos</strong>.</p>
<p>Formato tipo <strong>"radionovela pedagógica" o viaje guiado en audio</strong> de <strong>20 a 30 minutos de duración</strong> por sesión. Javier narra, propone juegos corporales y guía la dinámica con un tono cálido y empático, mientras van sonando las canciones, los recitados rítmicos y los silencios que invitan a cantar, bailar y mecer al bebé.</p>

<h3>2. ¿Por qué este formato soluciona un dolor real?</h3>
<ul>
  <li><strong>Cero sobreestimulación de pantallas:</strong> Las familias que siguen a Musicabalú están profundamente concienciadas sobre el impacto negativo de las pantallas antes de los 3 años. Este producto les da un recurso 100% analógico para jugar en el salón.</li>
  <li><strong>"Manos libres" para los padres:</strong> Los padres no tienen que inventar qué hacer ni mirar un tutorial; simplemente le dan al <em>Play</em> y juegan con su hijo siguiendo la voz del profesor.</li>
  <li><strong>Compañero ideal de rutinas:</strong> Funciona tanto en el juego de tarde en casa como en el coche durante viajes o momentos de cansancio y transición al baño/sueño.</li>
</ul>

<h3>3. Estructura Pedagógica de una Sesión (20–30 min)</h3>
<ul>
  <li><strong>1. Bienvenida y Enraizamiento (0 a 4 min):</strong> Saludo cantado con el nombre, conexión visual adulto-bebé y reducción de la velocidad mental del día.</li>
  <li><strong>2. Movimiento y Flujo Corporal (4 a 9 min):</strong> Canción con movimiento guiado (balanceos, saltitos en rodillas, giros suaves sintiendo el peso y el pulso macrobeat).</li>
  <li><strong>3. Momento del Objeto Sensorial (9 a 15 min):</strong> Introducción narrativa de un elemento de juego (pañuelos que vuelan, saquitos, pompas o cosquillas) con un recitado rítmico en sílaba neutral.</li>
  <li><strong>4. Baño Tonal y Diálogo Musical (15 a 22 min):</strong> Canción sin palabras en modo Dórico o Menor, acompañada de patrones tonales sencillos y pausas de silencio activo para que el bebé balbucee o responda con sonidos.</li>
  <li><strong>5. Relajación y Cierre de Amor (22 a 28 min):</strong> Canción de cuna o nana suave para acunar, masajear y despedir la sesión en un estado de profunda calma.</li>
</ul>

<h3>4. Estrategia de Monetización y Distribución</h3>
<ul>
  <li><strong>Vía A: Como valor exclusivo de la Suscripción (Comunidad Familiar):</strong>
    <ul>
      <li>Integrado en el reproductor de audio de la web (/comunidad/canciones o nueva sección de sesiones).</li>
      <li>Se convierte en el mayor gancho de retención mensual (3,90 €/mes o 39 €/año) al ser una herramienta de uso semanal recurrente.</li>
    </ul>
  </li>
  <li><strong>Vía B: Como producto digital independiente en la Tienda (/tienda):</strong>
    <ul>
      <li><strong>Pack "Temporada 1: 5 Sesiones en Audio de Estimulación Temprana":</strong> PVP recomendado <strong>19 € – 27 €</strong> (pago único con acceso web permanente o descarga de audios MP3).</li>
      <li><strong>Bundle "Sesión en Audio + Pack Sensorial":</strong> Venta conjunta con el paquete físico de 2 pañuelos + 2 saquitos de psicomotricidad a un PVP de <strong>39 € – 45 €</strong>.</li>
    </ul>
  </li>
  <li><strong>Coste marginal de réplica:</strong> Cero euros. Se produce una sola vez con los audios y micros de estudio y se distribuye digitalmente a miles de familias.</li>
</ul>

<h3>5. Próximos Pasos y Plan de Lanzamiento</h3>
<ul>
  <li>[ ] Redacción del guión de la <strong>Sesión Piloto nº 1</strong> (Temática: "El viaje de Balú y los pañuelos mágicos" - 25 min).</li>
  <li>[ ] Grabación de las pistas de voz de locución en el home studio y mezcla con canciones ya producidas.</li>
  <li>[ ] Entrega de la versión beta a 5 familias de confianza de las clases presenciales de Murcia para recibir feedback real de uso en sus casas.</li>
  <li>[ ] Diseño de la portada gráfica del álbum y creación de la ficha de producto en la tienda web y en la zona privada de la Comunidad.</li>
</ul>`
  }
];

async function main() {
  console.log('Iniciando inserción de proyectos en el Laboratorio de Proyectos...');

  for (const proj of proyectos) {
    const existing = await prisma.adminNote.findFirst({
      where: { title: proj.title }
    });

    if (existing) {
      console.log(`Actualizando proyecto existente: "${proj.title}" [ID: ${existing.id}]`);
      await prisma.adminNote.update({
        where: { id: existing.id },
        data: {
          category: proj.category,
          content: proj.content
        }
      });
    } else {
      console.log(`Creando nuevo proyecto: "${proj.title}"`);
      const created = await prisma.adminNote.create({
        data: {
          title: proj.title,
          category: proj.category,
          content: proj.content
        }
      });
      console.log(`Proyecto creado con ID: ${created.id}`);
    }
  }

  console.log('\n✅ Todos los proyectos han sido procesados con éxito.');
}

main()
  .catch((e) => {
    console.error('Error al insertar proyectos:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
