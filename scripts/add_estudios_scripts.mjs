import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newScripts = [
  {
    title: '🎬 Píldora 115: "El experimento Baby Einstein: Música activa vs. Música de fondo"',
    theoryContent: '<p><strong>Base Científica:</strong> Estudio de Gerry, Unrau y Trainor (2012, McMaster University). Comparó durante 6 meses a bebés de 6 a 12 meses en clases de música activa (canto materno/paterno, movimiento y repetición en casa) frente a clases con música grabada de fondo (CDs de Baby Einstein sintetizados mientras jugaban libremente). Solo el grupo activo desarrolló sensibilidad tonal real, además de mejores habilidades sociales y comunicativas.</p>',
    scriptContent: `<p><strong>Concepto:</strong> Poner música "para bebés" de fondo no educa el oído; cantar y moverse juntos sí transforma su cerebro.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>¿Alguna vez has puesto música clásica o vídeos tipo "Baby Einstein" de fondo pensando que así estimulabas el cerebro de tu bebé?</p>
<p>Pues la Universidad de McMaster hizo un experimento fascinante con bebés de 6 meses durante medio año.</p>
<p>A la mitad de las familias les pusieron música de Baby Einstein de fondo mientras los bebés jugaban con bloques y pelotas. <br/>
Y a la otra mitad les propusieron hacer música activa: padres y bebés cantando con su propia voz, balanceándose y repitiendo esas mismas canciones en casa.</p>
<p>Cuando cumplieron un año, midieron sus cerebros. <br/>
¿El resultado? Los bebés que solo escuchaban música de fondo no habían desarrollado sensibilidad a la tonalidad musical. Era como oír llover.</p>
<p>En cambio, los bebés que cantaban y se movían con sus padres habían acelerado el desarrollo de su oído musical de forma brutal.</p>
<p>La conclusión científica es clarísima: tu bebé no aprende música de un altavoz pasivo. Aprende cuando la música pasa a través de tu voz, tu mirada y tu movimiento.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"Soy Javi, y en Musicabalú te enseñamos a compartir esa música viva con tu peque. Sígueme para más ciencia musical en familia."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Por eso en nuestra Comunidad no solo escuchamos audios: te damos las propuestas de juego y movimiento para que tú seas el protagonista en casa."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 116: "Bebés que lloran menos y se comunican antes (Estudio McMaster)"',
    theoryContent: '<p><strong>Base Científica:</strong> Gerry, Unrau y Trainor (2012, Developmental Science). Tras 6 meses de participación musical activa entre padres y bebés (6-12 meses), las escalas estandarizadas IBQ y MacArthur-Bates demostraron menor estrés ante límites y estímulos nuevos, mayor frecuencia de sonrisas, mayor facilidad para calmarse (soothability) y un aumento significativo de gestos comunicativos prelingüísticos.</p>',
    scriptContent: `<p><strong>Concepto:</strong> La música activa en familia mejora la regulación emocional del bebé y acelera sus primeros gestos para comunicarse.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>¿Y si te dijera que cantar y jugar musicalmente con tu bebé hace que se frustre menos y aprenda a comunicarse contigo mucho antes de saber hablar?</p>
<p>En un estudio científico publicado en la revista <em>Developmental Science</em>, siguieron durante 6 meses a bebés de medio año que participaban en sesiones musicales activas con sus padres.</p>
<p>Al cumplir el año, los investigadores descubrieron tres cosas increíbles en estos bebés frente a los demás:</p>
<p>Primero: sonreían mucho más y se calmaban muchísimo más rápido cuando tenían un disgusto.<br/>
Segundo: sentían mucho menos estrés y miedo ante situaciones u objetos nuevos.<br/>
Y tercero: desarrollaron muchos más gestos comunicativos —como señalar, saludar o expresarse— antes incluso de decir su primera palabra.</p>
<p>La música compartida no es solo para "aprender música". Es el entrenamiento emocional y social más potente que existe en el primer año de vida.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"En Musicabalú vivimos esta conexión cada semana. Sígueme si quieres llevar la música a la crianza de tu peque."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Cada vez que juegas en el salón con las canciones de nuestra plataforma, estás construyendo este refugio emocional con tu peque."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 117: "Tu hijo de 2 años tiene más conexiones cerebrales que tú (La poda neuronal)"',
    theoryContent: '<p><strong>Base Científica:</strong> Goldman-Rakic (1987) / Gottlieb (1983) / Prof. Manuel Lafarga (2000, Desarrollo Musical y Neurológico). A los 2 años el cerebro alcanza el 80% del tamaño adulto pero posee más sinapsis que un adulto. A través de la "poda neuronal", las conexiones estimuladas por el entorno se consolidan y las que no reciben estímulo mueren.</p>',
    scriptContent: `<p><strong>Concepto:</strong> A los 2 años el cerebro tiene el máximo de conexiones neuronales; lo que no se estimula en esta etapa se poda y desaparece.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>Aunque parezca increíble, un niño de dos años tiene más conexiones entre sus neuronas que tú y que yo.</p>
<p>La neurociencia ha demostrado que durante los dos primeros años de vida el cerebro del bebé crece a una velocidad vertiginosa, creando una sobreabundancia de conexiones sinápticas.</p>
<p>Pero justo ahí empieza un proceso biológico llamado "poda neuronal". <br/>
El cerebro funciona con una regla implacable: lo que se usa, se queda y se fortalece; lo que no se usa, se corta y desaparece.</p>
<p>Si durante esos primeros años su cerebro recibe ritmos variados, melodías ricas y juego vocal, todas esas autopistas neuronales auditivas se blindan para toda la vida. <br/>
Si no las usa, el cerebro simplemente las elimina.</p>
<p>Por eso la estimulación musical temprana no empieza a los 6 años cuando van a una academia: empieza desde la cuna.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"Aprovecha esta etapa mágica con tu peque. Sígueme en Musicabalú para saber cómo estimular su cerebro jugando."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Con las canciones en distintos modos y métricas que tienes aquí en la plataforma, estás alimentando exactamente esas conexiones cada semana."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 118: "La ventana de los 10 meses: Por qué tu bebé nace siendo ciudadano musical del mundo"',
    theoryContent: '<p><strong>Base Científica:</strong> Trehub (1976), Werker et al. (1981), Mehler & Dupoux (1990), Hannon & Trehub (2005). Los recién nacidos distinguen todos los contrastes fonéticos y estructuras métricas/tonales de cualquier cultura del mundo (incluso mejor que los adultos). Hacia los 10-12 meses se produce una especialización perceptiva donde pierden la sensibilidad a los sonidos y ritmos que no están presentes en su entorno cotidiano.</p>',
    scriptContent: `<p><strong>Concepto:</strong> Al nacer, el bebé percibe todos los modos y ritmos del mundo, pero hacia los 10-12 meses el cerebro "cierra" lo que no escucha en casa.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>Cuando un bebé nace, su oído tiene un superpoder que los adultos ya hemos perdido.</p>
<p>Los estudios de neuropsicología auditiva han demostrado que un bebé de pocos meses es capaz de distinguir todos los sonidos de cualquier idioma del mundo y cualquier ritmo complejo de otras culturas, cosas que a un adulto le resultan imposibles de diferenciar.</p>
<p>Pero atención a este dato: entre los 10 y los 12 meses de edad ocurre un fenómeno fascinante. <br/>
El cerebro empieza a descartar y olvidar los sonidos y estructuras que no escucha en su día a día para especializarse solo en lo familiar.</p>
<p>¿Qué pasa si durante su primer año tu bebé solo escucha las típicas canciones infantiles comerciales en modo mayor y ritmo binario? <br/>
Pues que su cerebro cierra la puerta a todo lo demás.</p>
<p>En cambio, si antes del año escucha música en modo dórico, frigio, lidio y ritmos de 5 o 7 tiempos, su cerebro los guarda como parte de su lengua materna.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"En Musicabalú creamos música en 8 modos y métricas variadas precisamente para que esa ventana no se cierre. ¡Síguenos!"</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Por eso en tu biblioteca de la Comunidad ves etiquetas como Dórico, Mixolidio o Métrica de 5: estamos manteniendo abierta toda su riqueza auditiva."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 119: "¿Qué escucha realmente tu bebé dentro de la barriga?"',
    theoryContent: '<p><strong>Base Científica:</strong> Querleau & Renard (1981), Lecaunet et al. (1987), Mehler et al. (1988), Lafarga (2000). A partir de la semana 30-35 de gestación el aparato auditivo es totalmente operativo. El líquido amniótico filtra las frecuencias agudas (>400 Hz), conservando intacta la entonación (prosodia), el ritmo y las frecuencias graves. Al nacer (con menos de 4 días), el bebé ya prefiere la voz materna natural y procesa la música en el oído izquierdo (hemisferio derecho).</p>',
    scriptContent: `<p><strong>Concepto:</strong> En el tercer trimestre el bebé ya oye, pero el líquido amniótico filtra las palabras y deja pasar la melodía, el ritmo y las frecuencias graves.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>¿Sabías que a las pocas horas de nacer un bebé ya distingue la música del lenguaje y reconoce las melodías que escuchaba en la barriga?</p>
<p>A partir de la semana 30 de embarazo, el oído del bebé ya funciona y envía información a su cerebro. <br/>
Pero no escucha como nosotros: el líquido amniótico actúa como un filtro acústico que amortigua los sonidos agudos y deja pasar sobre todo las frecuencias graves, el ritmo y la curva melódica de tu voz.</p>
<p>Es parecido a cuando escuchas a alguien hablar debajo del agua en una piscina: no entiendes qué palabra dice, pero escuchas perfectamente su melodía y su emoción.</p>
<p>Por eso los estudios demuestran que a los 4 días de nacer los bebés ya giran la cabeza al escuchar la entonación natural de su madre, y además la voz grave de papá o el canto suave resuenan con una fuerza brutal antes incluso de nacer.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"Si estás esperando un bebé o acabas de tenerlo, tu voz cantada es su puente con el mundo. Sígueme en Musicabalú."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Explora nuestras canciones de calma y cántaselas pegadito a tu pecho: esa vibración es el sonido más familiar y seguro que conoce."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 120: "La gran mentira del Efecto Mozart (Solo dura 15 minutos)"',
    theoryContent: '<p><strong>Base Científica:</strong> Talero-Gutiérrez, Zarruk-Serrano y Espinosa-Bode (2004, Revista de Neurología: "Percepción musical y funciones cognitivas. ¿Existe el efecto Mozart?"). Revisión neurológica que demuestra que el famoso experimento de Rauscher (1993) se hizo con universitarios, no con bebés, y el supuesto aumento espacial duraba apenas 10-15 minutos por un simple cambio en el estado de ánimo/alerta. Los cambios cerebrales permanentes solo ocurren con la práctica y vivencia musical activa.</p>',
    scriptContent: `<p><strong>Concepto:</strong> Desmontar el mito comercial del "Efecto Mozart" pasivo frente a la música vivida en interacción real.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>Seguramente has oído hablar mil veces del famoso "Efecto Mozart": esa idea de que si le pones Mozart a tu bebé se volverá más inteligente.</p>
<p>Pues siento decirte que fue uno de los mayores malentendidos comerciales de la historia.</p>
<p>Para empezar, el experimento original de 1993 ni siquiera se hizo con bebés: se hizo con estudiantes universitarios. <br/>
Y lo más fuerte es lo que confirmaron las revisiones neurológicas posteriores: aquella mejora en un test espacial duraba exactamente... ¡entre 10 y 15 minutos! Después, desaparecía por completo.</p>
<p>¿Por qué ocurría? Simplemente porque escuchar una música alegre antes de un examen te anima y te despierta durante un rato. Nada más.</p>
<p>La neurociencia ha dejado claro que poner un disco de Mozart como quien toma una vitamina no cambia el cerebro de un niño. <br/>
Lo que sí transforma la estructura física de su cerebro para siempre es hacer música de forma activa: cantar juntos, moverse con el pulso y jugar en familia.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"Menos mitos comerciales y más cantar con tus hijos. Sígueme en Musicabalú para descubrir cómo aprende música su cerebro de verdad."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Por eso en Musicabalú huimos de las fórmulas mágicas pasivas y te proponemos jugar cuerpo a cuerpo con cada canción."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 121: "La autopista del cerebro: Cómo la música une los dos hemisferios"',
    theoryContent: '<p><strong>Base Científica:</strong> Schlaug et al. (1995, 2005, 2009); Justel y Diaz Abrahan (2012, Suma Psicológica: "Plasticidad cerebral: participación del entrenamiento musical"). Los estudios con resonancia magnética demuestran que la práctica musical en la infancia aumenta significativamente el volumen del cuerpo calloso (el haz de 200 millones de fibras que conecta ambos hemisferios), mejorando la integración entre el hemisferio derecho (melodía, emoción, holístico) y el izquierdo (ritmo, lenguaje, analítico).</p>',
    scriptContent: `<p><strong>Concepto:</strong> La música es la única actividad que activa ambos hemisferios a la vez y engrosa físicamente el puente que los une (el cuerpo calloso).</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>Nuestro cerebro está dividido en dos mitades conectadas por un puente gigante de 200 millones de fibras nerviosas llamado "cuerpo calloso".</p>
<p>Durante mucho tiempo se pensó que la música solo vivía en el lado derecho del cerebro, el lado artístico y emocional. <br/>
Pero hoy, gracias a la resonancia magnética funcional, sabemos que la música hace algo único que casi ninguna otra actividad humana consigue: enciende los dos hemisferios a la vez.</p>
<p>Mientras el hemisferio derecho procesa el dibujo de la melodía, el timbre y la emoción, el hemisferio izquierdo procesa el ritmo, la secuencia temporal y se conecta con las áreas del lenguaje.</p>
<p>Y lo más fascinante: los estudios del doctor Gottfried Schlaug en Harvard demostraron que los niños que viven y practican la música desde pequeños desarrollan un cuerpo calloso físicamente más grande y fuerte.</p>
<p>Hacer música con tu peque es, literalmente, construir una superautopista entre las dos mitades de su cerebro.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"Soy Javi, y en Musicabalú unimos ciencia, música y juego para tu peque. ¡Sígueme para no perderte nada!"</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Por eso en la plataforma combinamos siempre canciones melódicas y recitados rítmicos: para estimular ambos hemisferios en equipo."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 122: "Cómo apagar la amígdala de tu bebé (El interruptor cerebral de la calma)"',
    theoryContent: '<p><strong>Base Científica:</strong> Blood & Zatorre (2001), Zatorre & Salimpoor (2013), Soria-Urios et al. (2011, Revista de Neurología). Las pruebas de neuroimagen demuestran que escuchar música placentera y relajante activa el núcleo accumbens (liberando dopamina en el circuito de recompensa) y simultáneamente disminuye la activación de la amígdala (el centro cerebral del miedo, la alerta y el estrés).</p>',
    scriptContent: `<p><strong>Concepto:</strong> Tu canto suave desactiva físicamente la amígdala (el detector de peligro/estrés del cerebro) y enciende el núcleo del placer y la calma.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>Cuando tu peque está nervioso, cansado o en plena rabieta, hay una estructura pequeñita dentro de su cerebro que está echando humo: se llama la amígdala.</p>
<p>La amígdala es la alarma de incendios del cerebro, el centro del miedo y del estrés. Y cuando está encendida, razonar con palabras no sirve absolutamente de nada.</p>
<p>Pero mira lo que descubrieron los neurocientíficos Robert Zatorre y Anne Blood escaneando el cerebro humano al escuchar música:</p>
<p>Cuando escuchamos una melodía suave, familiar y placentera, ocurren dos cosas al mismo tiempo: <br/>
Se enciende el núcleo accumbens —liberando dopamina, la química del bienestar— y, automáticamente, se apaga la actividad de la amígdala.</p>
<p>Es como un interruptor biológico. <br/>
Por eso, cuando abrazas a tu hijo y le cantas bajito esa canción que ya conoce, no solo le estás consolando: estás desactivando físicamente la alarma de estrés de su cerebro.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"Guárdate este vídeo para la próxima vez que necesitéis volver a la calma en casa. Y sígueme en Musicabalú."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Elige una de nuestras canciones lentas de la Comunidad, hazla vuestra canción refugio y úsala siempre en esos momentos."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 123: "Por qué las pantallas le roban neuronas al oído de tu bebé (Cita de Gordon)"',
    theoryContent: '<p><strong>Base Científica:</strong> Edwin E. Gordon (Introduction to Research and the Psychology of Music / A Music Learning Theory for Newborn and Young Children, citado en Mitchell, 2007). Gordon explica que al nacer existen células corticales destinadas a crear conexiones auditivas; si el niño no recibe un entorno rico de escucha musical en esa etapa crítica, esas células son reclutadas por otro sentido dominante —especialmente el visual—, fortaleciendo la vista a costa de atrofiar el potencial auditivo.</p>',
    scriptContent: `<p><strong>Concepto:</strong> Si sobreestimulamos la vista con pantallas y empobrecemos la escucha, el cerebro entrega las neuronas del oído al sistema visual.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>Escucha esta reflexión de Edwin Gordon porque cambia por completo la forma de ver las pantallas en bebés:</p>
<p>Gordon explicaba que la naturaleza dota al bebé de millones de neuronas listas para conectarse y desarrollar su oído musical. <br/>
Pero si en sus primeros años de vida no le damos un entorno rico de música real para escuchar, el cerebro no deja esas neuronas vacías.</p>
<p>¿Sabes qué hace el cerebro con las neuronas auditivas que no se usan? <br/>
Se las regala a otro sentido que esté exigiendo más atención: casi siempre, el sentido de la vista.</p>
<p>Es decir: cuando le ponemos a un bebé dibujos animados con canciones llenas de luces y colores parpadeantes, la vista secuestra toda la atención del cerebro y le roba terreno al oído.</p>
<p>Si quieres que tu peque desarrolle un oído musical increíble y una atención profunda, apaga la pantalla y deja que la música entre solo por sus oídos y por su cuerpo.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"En Musicabalú defendemos una infancia 100% libre de pantallas para los peques. Sígueme si tú también apuestas por ello."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Recuerda que los vídeos de nuestra plataforma son para ti, para que tú aprendas el juego y luego apagues la pantalla al disfrutarlo con tu peque."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 124: "El ritmo de vals a los 9 meses acelera el habla (Estudio Zhao y Kuhl)"',
    theoryContent: '<p><strong>Base Científica:</strong> Zhao y Kuhl (2016, Proceedings of the National Academy of Sciences - PNAS, Universidad de Washington, citado en Olcina Sempere, 2018). Bebés de 9 meses participaron en 12 sesiones de juego musical interactivo con sus padres usando ritmo ternario (vals). El análisis con magnetoencefalografía (MEG) demostró una mayor activación en la corteza auditiva y prefrontal no solo ante la música, sino también al procesar los sonidos y sílabas del habla.</p>',
    scriptContent: `<p><strong>Concepto:</strong> Jugar con ritmos de 3 tiempos (métrica triple / vals) con bebés de 9 meses mejora directamente la capacidad de su cerebro para aprender a hablar.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>¿Qué tiene que ver bailar un vals con tu bebé en brazos con que aprenda a hablar mejor?</p>
<p>En 2016, las investigadoras Patricia Kuhl y Christina Zhao, de la Universidad de Washington, hicieron un estudio precioso con bebés de 9 meses.</p>
<p>Reunieron a los bebés con sus padres durante 12 sesiones para jugar con el ritmo del vals —ese ritmo de tres tiempos: un, dos, tres, un, dos, tres—, moviéndose y acompañándolo con pequeños instrumentos de percusión.</p>
<p>Al terminar, midieron sus cerebros con magnetoencefalografía. <br/>
Y descubrieron que esos bebés no solo tenían mucha más actividad cerebral al escuchar música, sino que su corteza prefrontal —la zona de la atención— se había vuelto muchísimo más eficaz detectando los sonidos y las sílabas del lenguaje hablado.</p>
<p>Porque para un bebé, entender el ritmo de una canción y entender dónde empieza y termina una palabra cuando le hablas es exactamente el mismo entrenamiento cerebral.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"Mecer a tu bebé a ritmo de tres tiempos es regalarle lenguaje. Sígueme en Musicabalú para más ideas prácticas."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Busca hoy mismo en la Comunidad nuestras canciones y recitados en métrica triple y balancéate con tu peque sintiendo ese un-dos-tres."</p>`,
    status: 'Pendiente'
  },
  {
    title: '🎬 Píldora 125: "Por qué el ritmo musical ayuda a tu hijo a concentrarse en un aula ruidosa"',
    theoryContent: '<p><strong>Base Científica:</strong> Slater, Skoe, Strait, Kraus et al. (2015, 2016, Northwestern University, citado en Olcina Sempere, 2018). Los estudios longitudinales de Nina Kraus demuestran que el entrenamiento musical —y especialmente la discriminación rítmica— mejora la codificación neuronal del habla en entornos ruidosos ("speech-in-noise perception"), permitiendo a los niños filtrar el ruido de fondo y entender mejor la voz del profesor en el aula.</p>',
    scriptContent: `<p><strong>Concepto:</strong> La estimulación rítmica entrena al cerebro para filtrar el ruido de fondo en el colegio y escuchar con claridad la voz de la profe.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>Imagina una clase de infantil o de primaria: veinte niños hablando, sillas arrastrándose, ruido en el pasillo... y la profe intentando explicar algo.</p>
<p>Para el cerebro de un niño pequeño, separar la voz de su profesora de todo ese barullo de fondo es un esfuerzo titánico. Y muchos niños que parecen "distraídos" simplemente tienen el oído saturado por el ruido.</p>
<p>Pues bien, el equipo de la neurocientífica Nina Kraus descubrió algo increíble: <br/>
Los niños que reciben estimulación musical —y muy especialmente juegos de ritmo— desarrollan una capacidad superior para entender el habla en entornos ruidosos.</p>
<p>Al entrenar su oído con patrones rítmicos y canciones, su tronco cerebral aprende a "enfocar" el sonido importante y filtrar el ruido que sobra, como cuando una cámara enfoca una cara y difumina el fondo.</p>
<p>Jugar hoy con canciones y recitados rítmicos en casa es darle a tu hijo el mejor superpoder de atención para cuando entre al cole.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"La música prepara su cerebro para toda la vida. Sígueme en Musicabalú si quieres darle este regalo a tu peque."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Entra en la sección de Recitados de la plataforma y juega hoy mismo dos minutos a imitar ritmos con tu peque."</p>`,
    status: 'Pendiente'
  }
];

async function main() {
  const existing = await prisma.videoScript.findMany({
    orderBy: { order: 'asc' }
  });
  
  let nextOrder = existing.length > 0 ? Math.max(...existing.map(s => s.order)) + 1 : 114;

  for (const item of newScripts) {
    // Check if already exists by title prefix
    const pillNumMatch = item.title.match(/Píldora \d+/);
    const prefix = pillNumMatch ? pillNumMatch[0] : item.title;
    const found = existing.find(e => e.title.includes(prefix));
    
    if (found) {
      await prisma.videoScript.update({
        where: { id: found.id },
        data: {
          title: item.title,
          theoryContent: item.theoryContent,
          scriptContent: item.scriptContent
        }
      });
      console.log(`Updated: ${item.title}`);
    } else {
      await prisma.videoScript.create({
        data: {
          title: item.title,
          theoryContent: item.theoryContent,
          scriptContent: item.scriptContent,
          status: item.status,
          order: nextOrder++
        }
      });
      console.log(`Created: ${item.title}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
