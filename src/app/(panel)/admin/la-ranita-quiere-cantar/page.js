"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const SPREADS = [
  {
    id: 1,
    numero: 1,
    tipo: "Canción",
    titulo: "La ranita quiere cantar",
    modo: "Mayor",
    metrica: "Triple",
    conLetra: true,
    colorTema: "#10B981",
    bgTema: "#ECFDF5",
    borderTema: "#A7F3D0",
    audio: "/audios/canciones/laranitaquierecantar.mp3",
    letra: [
      "La ranita quiere cantar",
      "y sentirse bien,",
      "¿le ayudarás",
      "hoy a cantar?",
      "Sólo hay que decir “Croac”",
      "",
      "Croac, Croac, Croac… Croac, Croac, Croac…"
    ],
    personajes: ["Ranita Balú"],
    escenaVisual: "Amanecer dorado en la charca. Entre nenúfares gigantes y juncos verdes, la Ranita Balú abre sus grandes ojos, toma aire y sueña con hacer música. Gotitas de rocío brillan al compás del viento matutino.",
    textoNarrativo: "En una charca luminosa, entre hojas de agua y reflejos de sol, despierta la Ranita Balú con un cosquilleo en la garganta. ¡Tiene unas ganas locas de cantar! Pero cantar sola es como un cuento sin orejas que lo escuchen: para que la música empiece a rodar, Ranita necesita emprender un viaje y encontrar amigos que respondan a su croar.",
    pedagogiaGordon: "Modo Mayor en métrica triple (sensación de balanceo fluido y luminoso). Los silencios tras el 'Croac' invitan al bebé o peque a emitir su balbuceo musical (respuesta tonal).",
    juegoSugerido: "Balancear suavemente al peque de lado a lado. En el momento del silencio, invitarle con la mirada a decir 'Croac' o responder con una pequeña pausa atenta."
  },
  {
    id: 2,
    numero: 2,
    tipo: "Recitado",
    titulo: "Chucuva",
    modo: null,
    metrica: "Doble",
    conLetra: false,
    colorTema: "#00B2E3",
    bgTema: "#F0FAFF",
    borderTema: "#BAE6FD",
    audio: "/audios/recitados/chucuva.mp3",
    letra: [
      "Pista rítmica instrumental / sílabas neutras de recitado",
      "(Sin texto verbal cantado)"
    ],
    personajes: ["Ranita Balú", "El Trenecito del Bosque"],
    escenaVisual: "Un simpático trenecito de madera de vapor multicolor que avanza por raíles entre bambúes y helechos. Ranita va subida en la chimenea, saludando con la patita mientras el humo dibuja notas redondas.",
    textoNarrativo: "—¡Chucu-chucu-va! —resuena entre los troncos. El tren del bosque se detiene justo al borde del agua. Ranita da un gran salto y sube a bordo. Las ruedas de madera marcan el paso de dos en dos, firmes y alegres. El viaje hacia lo desconocido acaba de ponerse en marcha.",
    pedagogiaGordon: "Recitado puro en métrica doble sin texto verbal. Al eliminar las palabras, el oído del niño se concentra al 100% en la precisión métrica y la pulsación continua (macro y microtiempos).",
    juegoSugerido: "Sentar al peque en las piernas y hacer el movimiento del tren: 'chucu-va, chucu-va', parando en seco cuando el recitado concluye."
  },
  {
    id: 3,
    numero: 3,
    tipo: "Canción",
    titulo: "Cubana",
    modo: "Dórico",
    metrica: "Doble",
    conLetra: false,
    colorTema: "#F59E0B",
    bgTema: "#FFFBEB",
    borderTema: "#FDE68A",
    audio: "/audios/canciones/cubana.mp3",
    letra: [
      "Canción melódica vocal sin palabras",
      "(Vocalización expresiva MLT: Pam-pam / Bah)"
    ],
    personajes: ["Ranita Balú", "Pájaros de la Selva"],
    escenaVisual: "Un claro tropical donde el trenecito hace su primera parada. Palmeras mecidas por el viento, frutos coloridos que caen como maracas y pajarillos de colores que bailan en las ramas con ritmo cadencioso.",
    textoNarrativo: "El trenecito frena en una selva tibia y perfumada. El aire suena suave y lleno de sabor. Ranita siente cómo sus patitas se mueven solas: este compás tiene sabor a fruta madura y danzas bajo el sol.",
    pedagogiaGordon: "Modo Dórico (segundo grado de la escala diatónica, con su sexta mayor característica). Es una sonoridad menor pero con un toque brillante y esperanzador, alejado del cliché menor-tristeza.",
    juegoSugerido: "Mover las manos como ramas al viento o acariciar los brazos del peque dibujando ondulaciones lentas y fluidas."
  },
  {
    id: 4,
    numero: 4,
    tipo: "Canción",
    titulo: "El oso bailarín",
    modo: "Armónico menor",
    metrica: "Doble",
    conLetra: true,
    colorTema: "#8B5CF6",
    bgTema: "#F5F3FF",
    borderTema: "#DDD6FE",
    audio: "/audios/canciones/elosobailarin.mp3",
    letra: [
      "Soy un oso bailarín",
      "con una enorme voz",
      "cuando piso tiembla el mar",
      "como toda la ciudad.",
      "Y aunque soy enorme y muy feroz",
      "Cuando estoy bailando soy feliz,",
      "Y aunque soy enorme y muy feroz,",
      "cuando estoy cantando soy mejor."
    ],
    personajes: ["Ranita Balú", "El Oso Bailarín"],
    escenaVisual: "Un claro amplio en la montaña. Un oso pardo grandullón y bonachón con un pequeño gorrito o flor silvestre, dando giros con ligereza insospechada mientras la Ranita le admira boquiabierta desde una seta.",
    textoNarrativo: "¡BOOM, BOOM! La hierba se sacude. ¿Un terremoto? ¡No! Entre los arbustos aparece el animal más grandote de toda la comarca: un oso inmenso con voz de tormenta que, para sorpresa de Ranita, empieza a girar como una peonza con la sonrisa más dulce del mundo.",
    pedagogiaGordon: "Modo Menor Armónico (con su sensible elevada, que aporta un dramatismo teatral y misterioso). El contraste entre la letra de un oso enorme y su pasión delicada por la danza enseña modulación emocional.",
    juegoSugerido: "Juego de pesos: dar pasos firmes y pesados con el oso, y luego balancearse de puntillas de manera liviana cuando canta que es feliz bailando."
  },
  {
    id: 5,
    numero: 5,
    tipo: "Canción",
    titulo: "Danza lidia",
    modo: "Lidio",
    metrica: "Triple",
    conLetra: false,
    colorTema: "#06B6D4",
    bgTema: "#ECFEFF",
    borderTema: "#A5F3FC",
    audio: "/audios/canciones/danzalidia.mp3",
    letra: [
      "Melodía sin palabras",
      "(Voz solista y atmósfera acústica)"
    ],
    personajes: ["Ranita Balú", "El Oso Bailarín", "Libélulas del Bosque"],
    escenaVisual: "Atardecer mágico sobre un lago de aguas calmas. Libélulas de alas transparentes danzan suspendidas en el aire en círculos de tres en tres, reflejándose en el agua como espejos encantados.",
    textoNarrativo: "Juntos, Ranita y el Oso llegan a la orilla de una laguna escondida. Una brisa mágica eleva las hojas del suelo. Todo parece flotar. Las notas suben y suben hacia el cielo como si no existiera la gravedad.",
    pedagogiaGordon: "Modo Lidio (cuarta aumentada / tritono modal). Proporciona una cualidad de 'ingravidez', misterio espacial y asombro sensorial imprescindible para nutrir la sintaxis modal infantil.",
    juegoSugerido: "Juego con pañuelos de seda o gasas: lanzarlos suavemente al aire en los tiempos fuertes y ver cómo descienden flotando."
  },
  {
    id: 6,
    numero: 6,
    tipo: "Recitado",
    titulo: "Mirando el reloj",
    modo: null,
    metrica: "Triple",
    conLetra: true,
    colorTema: "#EF4444",
    bgTema: "#FEF2F2",
    borderTema: "#FECACA",
    audio: "/audios/recitados/mirandoelreloj.mp3",
    letra: [
      "Espero y espero",
      "mirando el reloj,",
      "Tic tac, tic tac,",
      "tic tic toc.",
      "Espero y espero",
      "con mi percusión,",
      "chi chiquichiqui chí,",
      "chi chiquichiqui chó."
    ],
    personajes: ["Ranita Balú", "El Gran Reloj de Roble"],
    escenaVisual: "En el tronco de un roble centenario hay tallado un viejo reloj de madera con un péndulo de piña de pino. Ranita y Oso miran sus manecillas esperando con emoción contenida que marque la hora.",
    textoNarrativo: "Tic-tac, tic-tac... En lo alto del roble cuelga el reloj del tiempo. El Oso y Ranita aguardan con impaciencia. ¿Qué pasará cuando las manecillas se junten? Mientras esperan, sus manos y pechos se convierten en un tambor que acompaña los latidos de la tarde.",
    pedagogiaGordon: "Métrica triple hablada. La mayoría de nanas y canciones comerciales usan métrica doble; experimentar la subdivisión ternaria con rimas percusivas estructura la flexibilidad rítmica del lenguaje.",
    juegoSugerido: "Palmear suavemente el cuerpo: 'Tic tac' en las rodillas y 'chi chiquichiqui chí' frotando las palmas con cosquillas."
  },
  {
    id: 7,
    numero: 7,
    tipo: "Canción",
    titulo: "En la terraza",
    modo: "Mixolidio",
    metrica: "Multimétrica",
    conLetra: false,
    colorTema: "#D97706",
    bgTema: "#FFFBEB",
    borderTema: "#FDE68A",
    audio: "/audios/karaokes/K_enlaterraza.mp3",
    letra: [
      "Composición instrumental sin palabras",
      "(Juego rítmico con cambios de acentuación métrica)"
    ],
    personajes: ["Ranita", "Oso", "Animales comensales"],
    escenaVisual: "¡Las puertas del reloj se abren y dan a una terraza sobre la copa de los árboles! Una mesa baja llena de moras, uvas silvestres y agua fresca. Farolillos encendidos entre las hojas.",
    textoNarrativo: "¡Ding-dong! La espera ha merecido la pena: es la fiesta de la merienda en la terraza del árbol. El ritmo es juguetón y travieso; cambia de paso cuando menos te lo esperas, como un gato que salta de rama en rama.",
    pedagogiaGordon: "Modo Mixolidio (séptima menor / escala de blues antigua) en multimétrica. Rompe la rigidez del compás predecible, desarrollando en el niño una audición elástica y adaptativa.",
    juegoSugerido: "Juego de pasos libres: caminar por el salón y cambiar de dirección cada vez que la música propone una inflexión métrica."
  },
  {
    id: 8,
    numero: 8,
    tipo: "Canción",
    titulo: "Cumbia Balú",
    modo: "Eólico",
    metrica: "Doble",
    conLetra: false,
    colorTema: "#F43F5E",
    bgTema: "#FFF1F2",
    borderTema: "#FECDD3",
    audio: "/audios/canciones/cumbiabalu.mp3",
    letra: [
      "Canción bailable sin texto verbal",
      "(Sabor latino, bajo continuo y percusión orgánica)"
    ],
    personajes: ["Todos los amigos del bosque"],
    escenaVisual: "La terraza se convierte en una pista de baile al aire libre. Todos los animales del bosque (ardillas, erizos, ranitas) se unen en una conga festiva bajo un cielo morado.",
    textoNarrativo: "La merienda da paso a la gran fiesta. Nadie puede quedarse sentado. La Cumbia Balú invita a menear las caderas, dar pasitos cortos y sonreír. Hasta el viento parece bailar entre las copas de los árboles.",
    pedagogiaGordon: "Modo Eólico (escala menor natural) con base rítmica de cumbia. Desmitifica que el modo menor solo sirva para la tristeza o el drama; aquí es pura vitalidad, fiesta y conexión motora.",
    juegoSugerido: "Baile en brazos o de la mano: caminar con cadencia de cumbia (paso corto, balanceo de cadera y giros lentos juntos)."
  },
  {
    id: 9,
    numero: 9,
    tipo: "Recitado",
    titulo: "Soy muy grande, soy ligero",
    modo: null,
    metrica: "Irregular par",
    conLetra: true,
    colorTema: "#6366F1",
    bgTema: "#EEF2FF",
    borderTema: "#C7D2FE",
    audio: "/audios/recitados/soymuygrande,soyligero.mp3",
    letra: [
      "Soy muy grande,",
      "soy un oso,",
      "cuando piso",
      "tiembla todo.",
      "Soy pequeño,",
      "soy ligero,",
      "cuando piso",
      "hay silencio."
    ],
    personajes: ["El Oso Bailarín", "Ranita Balú"],
    escenaVisual: "Primer plano de complicidad entre el Oso y la Ranita. El pie enorme y peludo del oso junto a la patita diminuta de la ranita posada sobre una hoja verde. Silencio y expectación.",
    textoNarrativo: "La fiesta se calma poco a poco. Oso y Ranita se sientan uno al lado del otro y juegan a mirarse: uno tan grande como una montaña; la otra tan ligera como una pompa de jabón. Dos mundos distintos que cantan la misma verdad.",
    pedagogiaGordon: "Métrica irregular par (5/8 o 7/8). La alternancia de sílabas cortas y largas en métrica no simétrica expande la audición temporal y afina la discriminación fonológica.",
    juegoSugerido: "Estirarse como gigantes haciendo fuerza con los brazos abiertos ('Soy muy grande...') y luego encogerse en una bolita silenciosa ('Soy pequeño...')."
  },
  {
    id: 10,
    numero: 10,
    tipo: "Canción",
    titulo: "La Peraleja",
    modo: "Frigio",
    metrica: "Triple",
    conLetra: false,
    colorTema: "#B45309",
    bgTema: "#FEF3C7",
    borderTema: "#FDE68A",
    audio: "/audios/karaokes/K_laperaleja.mp3",
    letra: [
      "Melodía sin palabras",
      "(Raíz modal española / mediterránea antigua)"
    ],
    personajes: ["Ranita Balú", "La Fogata bajo las estrellas"],
    escenaVisual: "Cae la noche cerrada. Una fogata tenue ilumina las caras de los animales sentados en círculo. Chispas doradas ascienden hacia un manto infinito de estrellas.",
    textoNarrativo: "El fuego crepita con suavidad. La noche abraza al bosque con un manto oscuro y cálido. Suena una melodía antigua y misteriosa, como las canciones que cantaban los abuelos de los abuelos junto a las brasas.",
    pedagogiaGordon: "Modo Frigio (segunda menor característica). Conecta con el folclore ancestral mediterráneo y flamenco, despertando una resonancia auditiva profunda que rara vez se encuentra en la música comercial infantil.",
    juegoSugerido: "Mirar juntos una luz tenue (o una velita LED), respirar hondo al compás de la melodía y mecerse despacito preparando el descanso."
  },
  {
    id: 11,
    numero: 11,
    tipo: "Canción",
    titulo: "Caballito",
    modo: "Locrio",
    metrica: "Doble",
    conLetra: true,
    colorTema: "#84CC16",
    bgTema: "#F7FEE7",
    borderTema: "#D9F99D",
    audio: "/audios/canciones/caballito.mp3",
    letra: [
      "Arre caballito,",
      "vamos rapidito",
      "que tengo que bailar,",
      "en mi cuerpecito",
      "siento todo el ritmo",
      "¡Ay! Qué risa que me da…"
    ],
    personajes: ["Ranita Balú", "El Caballito de Niebla"],
    escenaVisual: "Un simpático caballito blanco de crines suaves al trote por el sendero iluminado por la luna llena. Ranita va montada con orgullo sobre su cabeza, sonriendo camino de regreso.",
    textoNarrativo: "—¡Es hora de volver a casa antes de que duerman las estrellas! —dice Ranita. Por el sendero aparece al trote un noble caballito blanco. Ranita salta a sus crines y el caballo arranca con un trote alegre y juguetón.",
    pedagogiaGordon: "Modo Locrio (quinta disminuida y segunda menor: el modo más inusual y complejo de la teoría musical). Presentarlo con una letra simpática y trote alegre normaliza la disonancia y expande el mapa cerebral auditivo.",
    juegoSugerido: "Hacer el trote del caballito en el regazo: 'Arre caballito...', aumentando ligeramente el paso y terminando con cosquillas en '¡Ay! Qué risa que me da'."
  },
  {
    id: 12,
    numero: 12,
    tipo: "Recitado",
    titulo: "Chiqui Pan",
    modo: null,
    metrica: "Irregular impar",
    conLetra: false,
    colorTema: "#0284C7",
    bgTema: "#F0F9FF",
    borderTema: "#BAE6FD",
    audio: "/audios/recitados/chiquipan.mp3",
    letra: [
      "Recitado sin palabras en métrica compleja",
      "(Juego percusivo de dedos y respiración)"
    ],
    personajes: ["Ranita Balú en su charca"],
    escenaVisual: "La charca en calma total bajo la luna llena y las estrellas. Ranita está arropada en su nenúfar preferido, con los ojos cerrados plácidamente y una sonrisita satisfecha en su cara.",
    textoNarrativo: "Chi-qui-pan... Chi-qui-pan... El viaje ha terminado. Ranita se acurruca en su nenúfar de siempre. El agua está quieta y fresca. Su corazoncito late ahora lleno de melodías, modos y ritmos de todo el mundo. Cierra los ojos feliz: mañana habrá más canciones que cantar.",
    pedagogiaGordon: "Recitado en métrica irregular impar. Cierra el ciclo de las 4 métricas y los 8 modos, dejando al niño en un estado de quietud rítmica interiorizada y reposo auditivo.",
    juegoSugerido: "Masaje suave con la yema de los dedos en la espalda o las palmas del peque, marcando los toques del recitado hasta que se relaje por completo."
  }
];

export default function RanitaLibroAdminPage() {
  const [activeTab, setActiveTab] = useState("borrador"); // "borrador" | "matriz" | "estrategia"
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [formatoSimulado, setFormatoSimulado] = useState("sonoro"); // "sonoro" (chip) | "qr"
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const spread = SPREADS[currentSpreadIndex];

  // Control de audio al cambiar de página
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentSpreadIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => {
        console.error("Audio play error:", err);
      });
    }
  };

  return (
    <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "30px 20px" }}>
      {/* Navegación de vuelta */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/admin"
          style={{
            color: "var(--color-cyan, #00B2E3)",
            fontWeight: "700",
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          ← Volver al Panel de Control
        </Link>
      </div>

      {/* Cabecera Principal */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#dcfce7", color: "#166534", fontWeight: "800", fontSize: "0.85rem", padding: "4px 14px", borderRadius: "999px", marginBottom: "10px" }}>
          <span>🐸 Proyecto Editorial · Musicabalú</span>
          <span style={{ fontSize: "0.75rem", backgroundColor: "#bbf7d0", padding: "2px 8px", borderRadius: "999px" }}>Borrador 1.0</span>
        </div>
        <h1 style={{ fontSize: "2.4rem", fontWeight: "900", color: "#0f172a", margin: "0 0 10px 0" }}>
          La ranita quiere cantar
        </h1>
        <p style={{ color: "#475569", fontSize: "1.1rem", lineHeight: "1.6", margin: 0 }}>
          Libro sonoro ilustrado de estimulación musical temprana: <strong>8 modos</strong> y <strong>4 métricas</strong> de Edwin Gordon en un viaje sensorial de 12 dobles páginas.
        </p>
      </div>

      {/* Selector de Pestañas */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "2px solid #e2e8f0", marginBottom: "28px" }}>
        <button
          onClick={() => setActiveTab("borrador")}
          style={{
            padding: "12px 20px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "borrador" ? "3px solid #10B981" : "3px solid transparent",
            color: activeTab === "borrador" ? "#065f46" : "#64748b",
            fontWeight: "800",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          📖 Simulador de Dobles Páginas
        </button>
        <button
          onClick={() => setActiveTab("matriz")}
          style={{
            padding: "12px 20px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "matriz" ? "3px solid #00B2E3" : "3px solid transparent",
            color: activeTab === "matriz" ? "#0369a1" : "#64748b",
            fontWeight: "800",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          🎼 Matriz Pedagógica MLT (12 Pistas)
        </button>
        <button
          onClick={() => setActiveTab("estrategia")}
          style={{
            padding: "12px 20px",
            border: "none",
            background: "none",
            borderBottom: activeTab === "estrategia" ? "3px solid #805AD5" : "3px solid transparent",
            color: activeTab === "estrategia" ? "#5b21b6" : "#64748b",
            fontWeight: "800",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          💡 Respuestas Estratégicas y Dudas
        </button>
      </div>

      {/* AUDIO ELEMENT OCULTO */}
      <audio
        ref={audioRef}
        src={spread.audio}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />

      {/* ===================== TAB 1: SIMULADOR DE LIBRO ===================== */}
      {activeTab === "borrador" && (
        <div>
          {/* Barra de control del simulador */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            backgroundColor: "#f8fafc",
            padding: "16px 20px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            marginBottom: "24px"
          }}>
            {/* Navegador de páginas */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => setCurrentSpreadIndex(Math.max(0, currentSpreadIndex - 1))}
                disabled={currentSpreadIndex === 0}
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  backgroundColor: currentSpreadIndex === 0 ? "#f1f5f9" : "white",
                  color: currentSpreadIndex === 0 ? "#94a3b8" : "#0f172a",
                  fontWeight: "700",
                  cursor: currentSpreadIndex === 0 ? "not-allowed" : "pointer"
                }}
              >
                ← Anterior
              </button>

              <span style={{ fontWeight: "800", color: "#1e293b", fontSize: "0.95rem" }}>
                Doble Página {spread.numero} de {SPREADS.length}
              </span>

              <button
                onClick={() => setCurrentSpreadIndex(Math.min(SPREADS.length - 1, currentSpreadIndex + 1))}
                disabled={currentSpreadIndex === SPREADS.length - 1}
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  backgroundColor: currentSpreadIndex === SPREADS.length - 1 ? "#f1f5f9" : "white",
                  color: currentSpreadIndex === SPREADS.length - 1 ? "#94a3b8" : "#0f172a",
                  fontWeight: "700",
                  cursor: currentSpreadIndex === SPREADS.length - 1 ? "not-allowed" : "pointer"
                }}
              >
                Siguiente →
              </button>
            </div>

            {/* Selector directo de página */}
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {SPREADS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSpreadIndex(idx)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    border: idx === currentSpreadIndex ? "2px solid #0f172a" : "1px solid #cbd5e1",
                    backgroundColor: idx === currentSpreadIndex ? "#0f172a" : (s.tipo === "Canción" ? "#ecfdf5" : "#f0f9ff"),
                    color: idx === currentSpreadIndex ? "white" : "#334155",
                    fontSize: "0.8rem",
                    fontWeight: "800",
                    cursor: "pointer"
                  }}
                  title={`${s.numero}. ${s.titulo} (${s.tipo})`}
                >
                  {s.numero}
                </button>
              ))}
            </div>

            {/* Alternador de formato visual */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "white", padding: "4px", borderRadius: "10px", border: "1px solid #cbd5e1" }}>
              <button
                onClick={() => setFormatoSimulado("sonoro")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "7px",
                  border: "none",
                  backgroundColor: formatoSimulado === "sonoro" ? "#10B981" : "transparent",
                  color: formatoSimulado === "sonoro" ? "white" : "#64748b",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
              >
                🔘 Botón Chip Sonoro
              </button>
              <button
                onClick={() => setFormatoSimulado("qr")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "7px",
                  border: "none",
                  backgroundColor: formatoSimulado === "qr" ? "#00B2E3" : "transparent",
                  color: formatoSimulado === "qr" ? "white" : "#64748b",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
              >
                📱 Código QR / Web
              </button>
            </div>
          </div>

          {/* SIMULACIÓN DEL LIBRO ABIERTO (Doble Página) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "0",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
            backgroundColor: "white",
            marginBottom: "32px"
          }}>
            {/* PÁGINA IZQUIERDA: ILUSTRACIÓN Y NARRATIVA */}
            <div style={{
              backgroundColor: "#fcfbf7",
              padding: "36px 32px",
              borderRight: "2px dashed #e2e8f0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Página Izquierda · {spread.numero * 2 - 1}
                  </span>
                  <span style={{ fontSize: "0.75rem", backgroundColor: "#e2e8f0", color: "#475569", padding: "2px 8px", borderRadius: "999px", fontWeight: "700" }}>
                    Ilustración y Cuento
                  </span>
                </div>

                {/* Área de Boceto de Ilustración */}
                <div style={{
                  backgroundColor: spread.bgTema,
                  border: `2px dashed ${spread.borderTema}`,
                  borderRadius: "18px",
                  padding: "24px",
                  marginBottom: "24px",
                  position: "relative"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "1.4rem" }}>🎨</span>
                    <span style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.95rem" }}>
                      Boceto Conceptual de Ilustración:
                    </span>
                  </div>
                  <p style={{ color: "#334155", fontSize: "0.95rem", lineHeight: "1.6", margin: 0, fontStyle: "italic" }}>
                    "{spread.escenaVisual}"
                  </p>
                  <div style={{ marginTop: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {spread.personajes.map((p, i) => (
                      <span key={i} style={{ fontSize: "0.75rem", backgroundColor: "white", border: `1px solid ${spread.borderTema}`, padding: "2px 8px", borderRadius: "6px", color: "#475569", fontWeight: "700" }}>
                        👤 {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hilo Narrativo / Texto del Cuento */}
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "14px", border: "1px solid #f1f5f9" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: "800", color: "#10B981", marginBottom: "8px", textTransform: "uppercase" }}>
                    📖 Texto Narrativo de Enlace (Para leer en voz alta):
                  </div>
                  <p style={{ color: "#1e293b", fontSize: "1.05rem", lineHeight: "1.7", margin: 0, fontWeight: "500", fontFamily: "Georgia, serif" }}>
                    {spread.textoNarrativo}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "24px", fontSize: "0.8rem", color: "#94a3b8", textAlign: "left" }}>
                Pág. {spread.numero * 2 - 1} · La ranita quiere cantar
              </div>
            </div>

            {/* PÁGINA DERECHA: CANCIÓN / RECITADO + BOTÓN SONORO */}
            <div style={{
              backgroundColor: "white",
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Página Derecha · {spread.numero * 2}
                  </span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{
                      backgroundColor: spread.tipo === "Canción" ? "#dcfce7" : "#e0f2fe",
                      color: spread.tipo === "Canción" ? "#166534" : "#0369a1",
                      fontSize: "0.75rem",
                      fontWeight: "800",
                      padding: "3px 10px",
                      borderRadius: "999px"
                    }}>
                      {spread.tipo}
                    </span>
                    <span style={{
                      backgroundColor: spread.conLetra ? "#fef3c7" : "#f1f5f9",
                      color: spread.conLetra ? "#92400e" : "#475569",
                      fontSize: "0.75rem",
                      fontWeight: "800",
                      padding: "3px 10px",
                      borderRadius: "999px"
                    }}>
                      {spread.conLetra ? "Con letra" : "Sin letra"}
                    </span>
                  </div>
                </div>

                {/* Título de la pista y Ficha Modal */}
                <h2 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#0f172a", margin: "0 0 12px 0" }}>
                  {spread.titulo}
                </h2>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                  {spread.modo && (
                    <div style={{ backgroundColor: "#faf5ff", border: "1px solid #e9d5ff", padding: "4px 12px", borderRadius: "8px" }}>
                      <span style={{ fontSize: "0.7rem", color: "#7e22ce", fontWeight: "800", display: "block" }}>MODO MLT</span>
                      <strong style={{ color: "#581c87", fontSize: "0.9rem" }}>{spread.modo}</strong>
                    </div>
                  )}
                  <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#15803d", fontWeight: "800", display: "block" }}>MÉTRICA MLT</span>
                    <strong style={{ color: "#14532d", fontSize: "0.9rem" }}>{spread.metrica}</strong>
                  </div>
                </div>

                {/* Letra o Indicación Vocal */}
                <div style={{
                  backgroundColor: spread.conLetra ? "#fffbeb" : "#f8fafc",
                  borderRadius: "16px",
                  padding: "20px",
                  border: spread.conLetra ? "1.5px solid #fef08a" : "1px solid #e2e8f0",
                  marginBottom: "24px"
                }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: "800", color: spread.conLetra ? "#b45309" : "#64748b", marginBottom: "10px", textTransform: "uppercase" }}>
                    {spread.conLetra ? "🎵 Letra para cantar en familia:" : "🎶 Pauta vocal sin palabras (MLT):"}
                  </div>
                  <div style={{
                    fontFamily: spread.conLetra ? "'Quicksand', sans-serif" : "inherit",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    lineHeight: "1.8"
                  }}>
                    {spread.letra.map((line, i) => (
                      <div key={i} style={{ minHeight: line === "" ? "12px" : "auto" }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                {/* INTERACTIVO: SIMULADOR DE CHIP SONORO vs CÓDIGO QR */}
                <div style={{
                  padding: "18px",
                  borderRadius: "16px",
                  backgroundColor: formatoSimulado === "sonoro" ? "#fdf4ff" : "#f0fdfa",
                  border: formatoSimulado === "sonoro" ? "2px solid #f0abfc" : "2px solid #99f6e4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px"
                }}>
                  {formatoSimulado === "sonoro" ? (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {/* Botón físico simulado del libro */}
                        <button
                          onClick={togglePlay}
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "50%",
                            backgroundColor: isPlaying ? "#dc2626" : spread.colorTema,
                            border: "4px solid white",
                            boxShadow: "0 6px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.4)",
                            color: "white",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.1s"
                          }}
                          title="Pulsador sonoro de página"
                        >
                          {isPlaying ? "⏹️" : "🔊"}
                        </button>
                        <div>
                          <div style={{ fontWeight: "900", color: "#0f172a", fontSize: "1rem" }}>
                            {isPlaying ? "Reproduciendo audio..." : "Pulsador Sonoro en la página"}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                            {isPlaying ? "Haz clic para detener" : "Haz clic para escuchar el audio real"}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: "0.75rem", backgroundColor: "white", padding: "4px 8px", borderRadius: "6px", fontWeight: "700", color: "#a21caf" }}>
                        Chip Integrado 20-40s
                      </span>
                    </>
                  ) : (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div
                          onClick={togglePlay}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            border: "2px solid #0f172a",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer"
                          }}
                          title="Escanear o hacer clic para reproducir"
                        >
                          <span style={{ fontSize: "1.5rem" }}>📱</span>
                          <span style={{ fontSize: "0.55rem", fontWeight: "900" }}>QR PLAY</span>
                        </div>
                        <div>
                          <div style={{ fontWeight: "900", color: "#0f172a", fontSize: "1rem" }}>
                            Código QR para escuchar online
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                            musicabalu.com/libro/{spread.numero} · Escucha sin pantallas
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={togglePlay}
                        style={{
                          backgroundColor: spread.colorTema,
                          color: "white",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          fontWeight: "800",
                          fontSize: "0.85rem",
                          cursor: "pointer"
                        }}
                      >
                        {isPlaying ? "Detener" : "Probar Audio"}
                      </button>
                    </>
                  )}
                </div>

                {/* Consejito pedagógico para el adulto */}
                <div style={{ marginTop: "16px", padding: "12px 14px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "4px" }}>
                    💡 GUÍA DE JUEGO PARA EL ADULTO:
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#334155", lineHeight: "1.5" }}>
                    {spread.juegoSugerido}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "24px", fontSize: "0.8rem", color: "#94a3b8", textAlign: "right" }}>
                Pág. {spread.numero * 2} · Musicabalú
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: MATRIZ PEDAGÓGICA MLT ===================== */}
      {activeTab === "matriz" && (
        <div style={{ backgroundColor: "white", padding: "28px", borderRadius: "20px", border: "1.5px solid #e2e8f0" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#0f172a", margin: "0 0 8px 0" }}>
              🎼 Arquitectura Musical: 8 Modos y 4 Métricas de Gordon
            </h2>
            <p style={{ color: "#64748b", margin: 0 }}>
              El libro no es un cancionero aleatorio: es un <strong>itinerario completo de enriquecimiento auditivo infantil</strong>, ofreciendo toda la variedad sintáctica recomendada por Edwin E. Gordon antes de los 6 años.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Pág.</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Tipo</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Título</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Modo Gordon</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Métrica Gordon</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Texto / Voz</th>
                  <th style={{ padding: "12px 14px", color: "#475569" }}>Audio Disponible</th>
                </tr>
              </thead>
              <tbody>
                {SPREADS.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => { setCurrentSpreadIndex(s.id - 1); setActiveTab("borrador"); }}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "pointer",
                      backgroundColor: s.id % 2 === 0 ? "#fafafa" : "white",
                      transition: "background-color 0.15s"
                    }}
                  >
                    <td style={{ padding: "12px 14px", fontWeight: "800", color: "#0f172a" }}>
                      {s.numero * 2 - 1}-{s.numero * 2}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{
                        backgroundColor: s.tipo === "Canción" ? "#dcfce7" : "#e0f2fe",
                        color: s.tipo === "Canción" ? "#166534" : "#0369a1",
                        fontSize: "0.75rem",
                        fontWeight: "800",
                        padding: "2px 8px",
                        borderRadius: "6px"
                      }}>
                        {s.tipo}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: "700", color: "#1e293b" }}>
                      {s.titulo}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      {s.modo ? (
                        <span style={{ fontWeight: "700", color: "#7e22ce" }}>{s.modo}</span>
                      ) : (
                        <span style={{ color: "#94a3b8" }}>— (Recitado)</span>
                      )}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: "700", color: "#0369a1" }}>
                      {s.metrica}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      {s.conLetra ? (
                        <span style={{ color: "#b45309", fontWeight: "700" }}>Con letra</span>
                      ) : (
                        <span style={{ color: "#64748b" }}>Sin palabras (MLT pura)</span>
                      )}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#10B981", fontWeight: "700" }}>
                      ✅ Grabado en Balú
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
            <h4 style={{ margin: "0 0 6px 0", color: "#166534", fontSize: "0.95rem" }}>
              💡 Equilibrio de Vocabulario Musical (Gordon MLT):
            </h4>
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#15803d", fontSize: "0.9rem", lineHeight: "1.6" }}>
              <li><strong>Los 8 modos completos:</strong> Mayor, Dórico, Frigio, Lidio, Mixolidio, Eólico, Locrio y Armónico menor.</li>
              <li><strong>Las 4 métricas completas:</strong> Doble, Triple, Multimétrica / Irregular par, Irregular impar.</li>
              <li><strong>Balance verbal:</strong> 5 pistas con letra (para memorizar, cantar y jugar) y 7 pistas sin palabras (para evitar que la corteza lingüística eclipse la discriminación tonal y tímbrica).</li>
            </ul>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: RESPUESTAS ESTRATÉGICAS Y DUDAS ===================== */}
      {activeTab === "estrategia" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Duda 1: Producción y grabaciones */}
          <div style={{ backgroundColor: "white", padding: "26px", borderRadius: "18px", border: "1.5px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🎙️</span>
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a" }}>
                1. ¿Reutilizar las canciones de la Comunidad o regrabarlas con más instrumentos?
              </h3>
            </div>
            <div style={{ color: "#334155", lineHeight: "1.7", fontSize: "0.95rem" }}>
              <p>
                <strong>Es una fantástica idea reutilizarlas</strong>: tener las canciones ya compuestas y probadas con familias reales es un activo gigante que ahorra meses de trabajo.
              </p>
              <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
                <li>
                  <strong>Arreglos más ricos (Piano, guitarra, bajo y pequeñas percusiones):</strong> Si el formato final es un <strong>libro sonoro con chip</strong>, el altavoz integrado es un piezoeléctrico diminuto con limitaciones físicas de frecuencias graves. Los instrumentos limpios con ataque claro (piano, guitarra acústica, bajo definido y voz nítida) suenan infinitamente mejor que orquestaciones saturadas.
                </li>
                <li>
                  <strong>¿Hacerlo tú o contratar?</strong> Puedes grabarlo perfectamente tú con tu propio equipamiento (voz, guitarra, bajo y piano). Grabar tú mismo refuerza la autenticidad artesanal de Musicabalú y mantiene el coste de producción en <strong>0 €</strong>.
                </li>
                <li>
                  <strong>¿Voz femenina adicional?</strong> Para algunas canciones (o coros peques), contar con una voz femenina amiga invitada puede aportar variedad tímbrica muy agradecida en la primera infancia, pero no es un requisito imprescindible para lanzar la primera edición.
                </li>
                <li>
                  <strong>Duración 30 a 60 segundos:</strong> Es la duración pedagógica ideal para bebés y 0-6 años. Permite reproducirse en bucle sin cansar y encaja perfectamente en los chips de memoria de los libros sonoros estándar (módulos de 20 a 45 segundos por botón).
                </li>
              </ul>
            </div>
          </div>

          {/* Duda 2: El hilo narrativo de la Ranita */}
          <div style={{ backgroundColor: "white", padding: "26px", borderRadius: "18px", border: "1.5px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>📖</span>
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a" }}>
                2. ¿Introducir texto narrativo entre canciones y recitados para crear una historia?
              </h3>
            </div>
            <div style={{ color: "#334155", lineHeight: "1.7", fontSize: "0.95rem" }}>
              <p>
                <strong>Rotundamente SÍ. Es el elemento que transforma una recopilación de audios en una verdadera obra literaria infantil.</strong>
              </p>
              <p>
                Si solo hubiera canciones, el adulto abriría el libro como un reproductor de música. Al incluir <strong>3-4 líneas de narrativa por doble página</strong> (el viaje de la Ranita que busca amigos para cantar y va conociendo al tren, al oso bailarín, al reloj del roble, a la fiesta de la terraza y al caballito):
              </p>
              <ol style={{ paddingLeft: "20px" }}>
                <li>El libro se convierte en un <strong>cuento antes de dormir</strong> o de lectura compartida en el regazo.</li>
                <li>Le da sentido pleno a las piezas <em>sin letra</em>: la música instrumental se convierte en la banda sonora emocional de lo que ocurre en la ilustración.</li>
                <li>Las editoriales infantiles (Kalandraka, Edelvives, etc.) exigen narrativa: no publican cancioneros sueltos, sino álbumes ilustrados con arco argumental.</li>
              </ol>
            </div>
          </div>

          {/* Duda 3 y 4: Formato (Chip vs QR vs Editorial) y Márgenes de beneficio */}
          <div style={{ backgroundColor: "white", padding: "26px", borderRadius: "18px", border: "1.5px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>💶</span>
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a" }}>
                3 y 4. Formatos de publicación, editoriales y márgenes económicos reales
              </h3>
            </div>
            <div style={{ color: "#334155", lineHeight: "1.7", fontSize: "0.95rem" }}>
              <p>Aquí tienes la comparativa financiera y operativa de las 3 opciones posibles:</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "16px" }}>
                {/* Opción A */}
                <div style={{ padding: "18px", borderRadius: "14px", border: "1.5px solid #00B2E3", backgroundColor: "#f0faff" }}>
                  <div style={{ fontWeight: "800", color: "#0369a1", fontSize: "1rem", marginBottom: "6px" }}>
                    Opción A: Autoedición con Código QR
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "10px" }}>
                    Álbum ilustrado cartoné de alta calidad con QR en cada página enlazando a la web de Musicabalú.
                  </div>
                  <ul style={{ fontSize: "0.85rem", paddingLeft: "18px", margin: "0 0 10px 0" }}>
                    <li><strong>Coste de impresión:</strong> ~3,50 € - 5,00 € / ud (tirada 300-500 uds).</li>
                    <li><strong>PVP recomendado:</strong> 15,00 € - 18,00 €.</li>
                    <li><strong>Margen de beneficio:</strong> <strong>~65% - 75%</strong> (te quedan ~10-12 € limpios por libro en venta directa).</li>
                    <li><strong>Ventaja extra:</strong> Dirige tráfico directo a tu web y capta familias para la Comunidad.</li>
                  </ul>
                </div>

                {/* Opción B */}
                <div style={{ padding: "18px", borderRadius: "14px", border: "1.5px solid #10B981", backgroundColor: "#ecfdf5" }}>
                  <div style={{ fontWeight: "800", color: "#065f46", fontSize: "1rem", marginBottom: "6px" }}>
                    Opción B: Libro Sonoro Físico (con Chip y Botones)
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "10px" }}>
                    Libro con módulo electrónico sonoro, pulsadores de membrana y pilas reemplazables (estilo Timotée / Marion Billet).
                  </div>
                  <ul style={{ fontSize: "0.85rem", paddingLeft: "18px", margin: "0 0 10px 0" }}>
                    <li><strong>Coste de producción:</strong> ~6,50 € - 9,00 € / ud (exige tiradas mínimas de 1.000 a 2.000 uds en imprentas especializadas con certificación CE).</li>
                    <li><strong>PVP de mercado:</strong> 19,95 € - 22,95 €.</li>
                    <li><strong>Margen de beneficio:</strong> <strong>~55% - 65%</strong> en venta directa (~12 € por libro). Si entra distribuidora, baja a ~30%.</li>
                    <li><strong>Inversión inicial requerida:</strong> ~6.000 € a 9.000 €.</li>
                  </ul>
                </div>

                {/* Opción C */}
                <div style={{ padding: "18px", borderRadius: "14px", border: "1.5px solid #805AD5", backgroundColor: "#faf5ff" }}>
                  <div style={{ fontWeight: "800", color: "#5b21b6", fontSize: "1rem", marginBottom: "6px" }}>
                    Opción C: Vía Editorial Tradicional
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "10px" }}>
                    Presentar dossier a editoriales de referencia (Kalandraka, Edelvives, Takatuka, Nubeocho, A buen paso).
                  </div>
                  <ul style={{ fontSize: "0.85rem", paddingLeft: "18px", margin: "0 0 10px 0" }}>
                    <li><strong>Inversión tuya:</strong> <strong>0 €</strong> (la editorial paga la ilustración, producción, chip y distribución en librerías).</li>
                    <li><strong>Royalties de autor:</strong> <strong>8% a 10%</strong> del PVP sin IVA (~1,50 € - 2,00 € por libro vendido).</li>
                    <li><strong>Qué presentar:</strong> Dossier de 6-8 páginas con la sinopsis del viaje, 2 dobles páginas maquetadas con ilustración muestra, los 12 audios y el valor pedagógico diferencial Gordon MLT.</li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: "16px", padding: "14px", backgroundColor: "#fffbeb", borderRadius: "12px", border: "1px solid #fde68a" }}>
                <strong>Recomendación estratégica para Musicabalú:</strong>
                <br />
                Presentar primero el dossier a editoriales infantiles seleccionadas (Año 2). Si una editorial grande lo acepta, te da distribución nacional en librerías sin riesgo financiero. Si tardan o prefieres control total, lanzar una <strong>edición especial de testeo con código QR (Opción A)</strong> para las familias de Musicabalú y talleres con un margen bruto del 70%.
              </div>
            </div>
          </div>

          {/* Duda 5: Rango de edad (¿0-3 o 0-6?) y la visión de la web */}
          <div style={{ backgroundColor: "white", padding: "26px", borderRadius: "18px", border: "1.5px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🌱</span>
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a" }}>
                5. ¿Limitar a 0-3 años o abrir a 0-6 años? (El gran salto para la web)
              </h3>
            </div>
            <div style={{ color: "#334155", lineHeight: "1.7", fontSize: "0.95rem" }}>
              <p>
                <strong>Abrir a 0 a 6 años (Primera Infancia) es una decisión 100% acertada, tanto pedagógica como comercialmente:</strong>
              </p>
              <ul style={{ paddingLeft: "20px" }}>
                <li>
                  <strong>Por qué en Gordon MLT el rango es 0 a 6:</strong> Edwin Gordon estableció que la <em>Aculturación Preparatoria</em> abarca desde el nacimiento hasta aproximadamente los 5-6 años, momento en el que el niño pasa a la etapa de imitación y asimilación consciente. Cortar en 3 años interrumpe el proceso justo cuando el peque empieza a cantar con afinación y responder rítmicamente.
                </li>
                <li>
                  <strong>En el sistema educativo español:</strong> La etapa de <strong>Educación Infantil</strong> es formalmente de <strong>0 a 6 años</strong> (Primer Ciclo 0-3 y Segundo Ciclo 3-6). Limitar a 0-3 expulsa a las familias justo cuando sus hijos tienen 3, 4 y 5 años y mayor interés tienen en cantar, bailar y disfrutar de las píldoras y canciones.
                </li>
                <li>
                  <strong>Para el libro "La ranita quiere cantar":</strong> Los niños de 3 a 6 años son los que disfrutan al máximo de los personajes (el oso, el reloj, el caballito), aprenden las letras de memoria y pulsan ellos mismos los botones con autonomía.
                </li>
                <li>
                  <strong>Para la web y la Comunidad:</strong> Mantener EMPI centrado en 0-3 (por la propia naturaleza de la escuela infantil), pero en la web hablar de <strong>«Música para la primera infancia (0 a 6 años)»</strong> o <strong>«Familias con peques de 0 a 6 años»</strong> duplica instantáneamente el público objetivo de la suscripción, las formaciones y la tienda sin cambiar una sola canción.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
