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
  },
  {
    title: 'El Eco Mágico: Motor Interactivo de Patrones MLT (100% Pantalla Cero y Audio Activo)',
    category: 'Innovación Pedagógica',
    content: `<h3>1. Visión y Propuesta Disruptiva: Audiation Interactiva Sin Pantallas</h3>
<p><strong>El Eco Mágico</strong> es un sistema interactivo de juego musical diseñado para llevar el diálogo de patrones tonales y rítmicos de la Music Learning Theory (MLT) al salón de las familias, <strong>manteniendo una política estricta de CERO PANTALLAS para los ojos del bebé</strong>.</p>
<p>El teléfono o tablet actúa exclusivamente como un <strong>altavoz y micrófono inteligente en la habitación</strong>: la pantalla puede estar apagada o en reposo sobre un mueble. El niño y el adulto juegan en la alfombra mirándose a los ojos y respirando juntos, mientras la voz de Javier propone la canción, lanza el patrón, escucha la respuesta y proporciona un bucle de refuerzo pedagógico en tiempo real.</p>

<h3>2. La Pedagogía Gordoniana (MLT) del Bucle de Refuerzo</h3>
<ul>
  <li><strong>Contexto musical ineludible:</strong> Los patrones nunca se lanzan aislados ni en el vacío. Van siempre precedidos de una canción en <em>Modo Mayor</em> o <em>Menor Armónico</em>, o de un recitado rítmico en <em>Metro Doble</em> o <em>Triple</em>.</li>
  <li><strong>El principio del espejo empático (Sin evaluación punitiva):</strong>
    <ul>
      <li>Gordon recalca que jamás se le dice al niño que lo ha hecho mal ni se bloquea el juego de forma frustrante.</li>
      <li>Si el niño o el adulto desafina o se desvía del pulso, el sistema NO emite un pitido de error. El motor reproduce suavemente el tono o tempo aproximado del usuario y la voz de Javier interviene con calidez: <em>"¡Ha sonado por aquí! Vamos a ajustarlo un poquito más arriba conmigo... ¡escucha y respira!... Pam, pam, pam"</em>.</li>
      <li>Se da una segunda oportunidad y, tras ella, se celebra el esfuerzo y se avanza para mantener viva la alegría del juego.</li>
    </ul>
  </li>
  <li><strong>El adulto como modelo:</strong> El juego involucra a la madre/padre. Como el bebé en etapa de aculturación (0-3 años) muchas veces absorbe en silencio o balbucea, el adulto es el guía que canta y se mueve con él.</li>
</ul>

<h3>3. Arquitectura Técnica (Web Audio API en el Navegador)</h3>
<ul>
  <li><strong>Cero coste de servidor y privacidad total:</strong> Todo el procesamiento acústico se realiza localmente en el navegador del usuario mediante la <strong>Web Audio API</strong> nativa (Safari iOS / Chrome Android). No se graban ni se envían audios del hogar a la nube, garantizando el cumplimiento estricto del RGPD para menores.</li>
  <li><strong>Detección de Tono en Tiempo Real (Pitch Tracking):</strong> Uso de algoritmos de autocorrelación / YIN (o librería ultra-ligera como <em>Pitchy</em>) para calcular la frecuencia fundamental ($f_0$) cada 20 ms y cotejar los intervalos tonales con los grados del modo activo.</li>
  <li><strong>Detección Rítmica (Onsets):</strong> Medición de umbrales de energía para identificar el espaciado rítmico de las sílabas neutras (<em>"pa-pa-pa"</em>).</li>
  <li><strong>Motor de Síntesis Adaptativa / Audio Resynthesis:</strong> Generación acústica inmediata del tono de referencia desajustado y reproducción del corte afinado con la voz real de Javi.</li>
</ul>

<h3>4. Por qué el enfoque "Pantalla Cero" es superior a las Apps tradicionales</h3>
<ul>
  <li><strong>Protección del neurodesarrollo:</strong> Respeta las directrices de la OMS y las sociedades de pediatría (cero exposición a pantallas antes de los 3 años).</li>
  <li><strong>Mirada compartida y apego seguro:</strong> El foco de atención del bebé no está en unos dibujitos animados iluminados, sino en el rostro, los ojos y la respiración de su madre o padre.</li>
  <li><strong>Autoridad de marca incontestable:</strong> Frente a miles de canales de YouTube que "aparcan" a los niños frente a pantallas, Musicabalú se posiciona como el estándar de oro en estimulación consciente y respetuosa.</li>
</ul>

<h3>5. Estado y Plan de Fases</h3>
<ul>
  <li><strong>Fase 1 (Actual):</strong> Concepto pedagógico y arquitectura técnica blindados en el Laboratorio de Proyectos.</li>
  <li><strong>Fase 2 (Pruebas de I+D interno):</strong> Prototipo privado en el panel de administrador (/admin/laboratorio-patrones) para validar la calibración de micros de iPhone con la voz de Javi.</li>
  <li><strong>Fase 3 (Lanzamiento Comunidad):</strong> Integración como la herramienta estrella ("El Eco Mágico") dentro de la suscripción anual/mensual de la Comunidad Familiar.</li>
</ul>`
  },
  {
    title: 'Candidatura a Premios de Innovación Pedagógica y Emprendimiento (SIMO, INFO Murcia, enlightED)',
    category: 'Reconocimiento y Autoridad',
    content: `<h3>1. Justificación Estratégica y Propósito</h3>
<p>La obtención de un premio, mención o sello de innovación educativa no solo aporta prestigio curricular, sino que constituye una <strong>palanca de autoridad de conversión brutal</strong> para dos objetivos clave:</p>
<ul>
  <li><strong>Venta B2B a Colegios y Escuelas Infantiles:</strong> Elimina las dudas de directores y jefes de estudio al presentar las formaciones de educadores (100–120 €) y talleres bajo un sello avalado.</li>
  <li><strong>Confianza de Familias (B2C):</strong> Refuerza el valor de la suscripción digital y las clases frente a alternativas comerciales de mero entretenimiento.</li>
</ul>

<h3>2. Dossier de Candidatura (Estructura del Pitch Ganador)</h3>
<ul>
  <li><strong>1. El Problema Social:</strong> La epidemia de sobreestimulación digital y pasividad por pantallas en menores de 3 años, y la escasez de propuestas musicales con rigor pedagógico (abuso de canciones infantiles repetitivas en Do Mayor).</li>
  <li><strong>2. La Solución Científica (Musicabalú):</strong> Implementación de la Music Learning Theory (Edwin Gordon) en la primera infancia (0-3 años), combinando riqueza modal/métrica, movimiento libre continuo y el principio innegociable de <strong>«Pantalla Cero»</strong>.</li>
  <li><strong>3. La Innovación Metodológica y Tecnológica:</strong>
    <ul>
      <li>Píldoras pedagógicas de aplicación inmediata para empoderar a la familia como modelo musical.</li>
      <li>Investigación del motor interactivo de audiation «El Eco Mágico» (tecnología Web Audio API para el oído, sin pantalla).</li>
    </ul>
  </li>
  <li><strong>4. Impacto Real:</strong> Más de 80 familias activas en aulas presenciales en Murcia, expansión a talleres familiares en centros asociados y escalabilidad digital en habla hispana.</li>
</ul>

<h3>3. Calendario de Convocatorias Clave</h3>
<table style="width:100%; border-collapse:collapse; font-size:0.9rem; margin-top:10px;">
  <thead>
    <tr style="background:#f1f5f9; text-align:left;">
      <th style="padding:8px 12px;">Certamen / Premio</th>
      <th style="padding:8px 12px;">Entidad Organizadora</th>
      <th style="padding:8px 12px;">Categoría Idónea</th>
      <th style="padding:8px 12px;">Ventana de Presentación</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:8px 12px; font-weight:bold;">Premios SIMO EDUCACIÓN</td>
      <td style="padding:8px 12px;">IFEMA Madrid</td>
      <td style="padding:8px 12px;">Mejor Experiencia en Ed. Infantil / Metodología Innovadora</td>
      <td style="padding:8px 12px;">Mayo – Junio (Fallo en Noviembre)</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:8px 12px; font-weight:bold;">Premios Emprendedor INFO</td>
      <td style="padding:8px 12px;">Instituto de Fomento (Murcia)</td>
      <td style="padding:8px 12px;">Emprendedor del Mes / Impacto Social</td>
      <td style="padding:8px 12px;">Convocatoria continua trimestral</td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:8px 12px; font-weight:bold;">enlightED Awards</td>
      <td style="padding:8px 12px;">Fundación Telefónica / IE / South Summit</td>
      <td style="padding:8px 12px;">Early Childhood Education & Disruptive Solutions</td>
      <td style="padding:8px 12px;">Junio – Julio (Fallo en Octubre)</td>
    </tr>
    <tr>
      <td style="padding:8px 12px; font-weight:bold;">Premios Magisterio</td>
      <td style="padding:8px 12px;">Periódico Magisterio (Grupo Siena)</td>
      <td style="padding:8px 12px;">Protagonistas de la Educación</td>
      <td style="padding:8px 12px;">Septiembre – Octubre</td>
    </tr>
  </tbody>
</table>

<h3>4. Checklist de Preparación</h3>
<ul>
  <li>[x] Estructuración del marco conceptual del proyecto.</li>
  <li>[ ] Redacción de la memoria descriptiva de 2 páginas con datos de impacto y metodología Gordon.</li>
  <li>[ ] Selección de 3 vídeos cortos testimoniales de familias y educadores.</li>
  <li>[ ] Solicitud de información y bases en el portal del INFO Región de Murcia.</li>
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
