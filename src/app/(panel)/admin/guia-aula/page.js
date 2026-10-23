import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Guía Pedagógica de Rutinas de Aula - Musicabalú Admin',
};

const BLOQUES = [
  {
    numero: '1',
    icono: '☀️',
    titulo: 'Llegada y Asamblea de la Mañana (Conexión y Vínculo)',
    color: '#00b2e3',
    bgLight: '#f0faff',
    borderLight: '#bae6fd',
    momentoCorto: 'Llegada y Asamblea',
    objetivo: 'Acoger a los peques al llegar, crear sentimiento de grupo en el círculo y activar la escucha atenta.',
    pistas: [
      {
        tipo: 'Canción',
        titulo: 'Hello Elan / El sol',
        uso: 'Ideales para abrir la asamblea matinal, saludarse con la mirada y dar los buenos días cantando.'
      },
      {
        tipo: 'Canción',
        titulo: 'El corro especial',
        uso: 'Para formar el círculo, mirarse unos a otros y generar cohesión de grupo antes de empezar las actividades del día.'
      },
      {
        tipo: 'Recitado',
        titulo: 'Chiqui Pan',
        uso: 'Juego rítmico de manos y regazo, perfecto para captar la atención de todos en la alfombra sin necesidad de hablar.'
      },
      {
        tipo: 'Canción',
        titulo: 'La ranita quiere cantar',
        uso: 'Ideal para dejar pequeños espacios de silencio donde los niños puedan emitir sonidos o balbucear su «respuesta» musical.'
      }
    ]
  },
  {
    numero: '2',
    icono: '🧣',
    titulo: 'Psicomotricidad, Exploración y Juego Activo',
    color: '#f4436c',
    bgLight: '#fff5f7',
    borderLight: '#fed7e2',
    momentoCorto: 'Psicomotricidad y Juego Activo',
    objetivo: 'Acompañar las sesiones de movimiento libre, juego con materiales sensoriales (pañuelos, pelotas, cintas) y expresión corporal.',
    subbloques: [
      {
        subtitulo: 'Con materiales del aula (pañuelos, pelotas, cintas)',
        pistas: [
          {
            tipo: 'Canción',
            titulo: 'Pañuelos / Me he escondido',
            uso: 'Para jugar al cucú-tras (permanencia del objeto en bebés), lanzar pañuelos y seguir su caída suave con el cuerpo.'
          },
          {
            tipo: 'Canción',
            titulo: 'Bota la pelota',
            uso: 'Para rodar o botar pelotas sintiendo el pulso y el peso corporal.'
          },
          {
            tipo: 'Canción',
            titulo: 'Gira cinta',
            uso: 'Para trabajar el movimiento continuo y fluido por el espacio con cintas o pañuelos.'
          }
        ]
      },
      {
        subtitulo: 'De movimiento corporal y contraste (sin material)',
        pistas: [
          {
            tipo: 'Canción',
            titulo: 'Cumbia Balú / Me encanta jugar',
            uso: 'Para momentos de movimiento libre, alegría y baile espontáneo por el aula.'
          },
          {
            tipo: 'Canción',
            titulo: 'El oso bailarín / Yo me llamo Paf',
            uso: 'Para trabajar contrastes de movimiento y pequeñas pausas.'
          },
          {
            tipo: 'Mixto',
            titulo: 'Caballito (Canción) y Bote irregular (Recitado)',
            uso: 'Perfectos para aulas de bebés (0-18 meses) en el regazo de la educadora, sintiendo el trote y los cambios de ritmo.'
          },
          {
            tipo: 'Recitado',
            titulo: 'Cuando te diga',
            uso: 'Juego de autorregulación motora: moverse por el aula y congelarse en silencio cuando para el recitado.'
          },
          {
            tipo: 'Recitado',
            titulo: 'Salto como un saltamontes / Soy muy grande, soy ligero',
            uso: 'Para descargar energía y experimentar con el cuerpo grande/pesado frente a pequeño/ligero.'
          }
        ]
      }
    ]
  },
  {
    numero: '3',
    icono: '🧺',
    titulo: 'Rutinas de Orden, Transiciones e Higiene',
    color: '#d97706',
    bgLight: '#fffbeb',
    borderLight: '#fde68a',
    momentoCorto: 'Recogida, Fila y Aseo',
    objetivo: 'Transformar los momentos más caóticos del día (recoger juguetes, hacer fila para salir al patio o lavarse las manos antes del comedor) en rutinas fluidas y lúdicas.',
    pistas: [
      {
        tipo: 'Canción',
        titulo: 'Cuenta atrás',
        uso: 'Para avisar con antelación de que una actividad está terminando y preparar el cambio sin frustración.'
      },
      {
        tipo: 'Canción',
        titulo: 'A recoger',
        uso: 'La señal sonora fija para guardar los materiales y juguetes entre todos.'
      },
      {
        tipo: 'Mixto',
        titulo: 'El tren sale ya (Canción) / El trenecito y Camino (Recitados)',
        uso: 'Para desplazarse juntos por el aula o hacia el patio/comedor manteniendo un pulso tranquilo.'
      },
      {
        tipo: 'Recitado',
        titulo: 'Limpio, muevo, bailo',
        uso: 'Ideal para acompañar el momento de aseo, lavarse las manos o prepararse para comer.'
      }
    ]
  },
  {
    numero: '4',
    icono: '🌿',
    titulo: 'Vuelta a la Calma (Después del Patio o Antes de Comer)',
    color: '#65a30d',
    bgLight: '#f7fee7',
    borderLight: '#d9f99d',
    momentoCorto: 'Vuelta a la Calma y Masaje',
    objetivo: 'Bajar las pulsaciones después de la actividad física del patio, relajar el tono muscular y recuperar la escucha tranquila.',
    pistas: [
      {
        tipo: 'Canción',
        titulo: 'Semillita',
        uso: 'Invita a los peques a hacerse una bolita en el suelo y estirarse muy despacio con la música.'
      },
      {
        tipo: 'Canción',
        titulo: 'Pizza familiar',
        uso: 'Juego táctil de masaje suave en la espalda o las piernas (amasar, poner ingredientes), maravilloso para calmar a los niños de 1 a 3 años en la alfombra.'
      },
      {
        tipo: 'Canción',
        titulo: 'El gatito / Tarde de lluvia',
        uso: 'Melodías suaves y envolventes para respirar despacio, acariciar y bajar el volumen del aula.'
      }
    ]
  },
  {
    numero: '5',
    icono: '🌙',
    titulo: 'Transición al Sueño y Hora de la Siesta',
    color: '#6366f1',
    bgLight: '#eef2ff',
    borderLight: '#c7d2fe',
    momentoCorto: 'Hora de la Siesta',
    objetivo: 'Crear un ritual predecible de descanso que ayude a los bebés y peques a conciliar el sueño con seguridad afectiva.',
    pistas: [
      {
        tipo: 'Recitado',
        titulo: 'Duerme, sueña',
        uso: 'Recitado suave para acompañar el momento de tumbarse en las hamacas o cunas y bajar la luz del aula.'
      },
      {
        tipo: 'Canción',
        titulo: 'Duérmete / Luna del mar',
        uso: 'Nanas y melodías de calma profunda para el inicio de la siesta, ayudando a regular la respiración del grupo.'
      }
    ]
  },
  {
    numero: '6',
    icono: '👋',
    titulo: 'Despedida y Reencuentro con las Familias',
    color: '#ec4899',
    bgLight: '#fdf2f8',
    borderLight: '#fbcfe8',
    momentoCorto: 'Despedida del Día',
    objetivo: 'Cerrar la jornada escolar con alegría y dar seguridad emocional antes de salir por la puerta con mamá o papá.',
    pistas: [
      {
        tipo: 'Canción',
        titulo: 'Ya nos decimos adiós',
        uso: 'Canción de cierre en la última asamblea antes de la recogida de las familias.'
      }
    ]
  }
];

function BadgeTipo({ tipo }) {
  if (tipo === 'Recitado') {
    return (
      <span style={{
        display: 'inline-block',
        backgroundColor: '#fef3c7',
        color: '#b45309',
        fontSize: '0.75rem',
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: '999px',
        marginRight: '8px',
        verticalAlign: 'middle'
      }}>
        🗣️ RECITADO
      </span>
    );
  }
  if (tipo === 'Mixto') {
    return (
      <span style={{
        display: 'inline-block',
        backgroundColor: '#f3e8ff',
        color: '#6b21a8',
        fontSize: '0.75rem',
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: '999px',
        marginRight: '8px',
        verticalAlign: 'middle'
      }}>
        🎵 + 🗣️ CANCIÓN / RECITADO
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-block',
      backgroundColor: '#e0f2fe',
      color: '#0369a1',
      fontSize: '0.75rem',
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: '999px',
      marginRight: '8px',
      verticalAlign: 'middle'
    }}>
      🎵 CANCIÓN
    </span>
  );
}

export default function GuiaAulaAdminPage() {
  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', paddingBottom: '4rem' }}>
      <Link
        href="/admin"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          color: '#64748b',
          textDecoration: 'none',
          marginBottom: '1.25rem',
          fontWeight: 600,
          fontSize: '0.95rem'
        }}
      >
        <span style={{ marginRight: '8px' }}>←</span> Volver al Panel de Control
      </Link>

      {/* Aviso de borrador temporal */}
      <div style={{
        backgroundColor: '#fffbeb',
        border: '1px solid #fde68a',
        borderLeft: '5px solid #f59e0b',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <strong style={{ color: '#92400e', fontSize: '0.95rem' }}>🛠️ Borrador de trabajo en HTML (Vista previa para revisión)</strong>
          <p style={{ margin: '4px 0 0 0', color: '#b45309', fontSize: '0.88rem' }}>
            Aquí puedes leer y ajustar cómodamente la estructura de la guía con las 34 pistas reales de la plataforma. Cuando le demos la forma definitiva, generaremos el PDF final para las escuelas y eliminaremos esta sección temporal del panel.
          </p>
        </div>
      </div>

      {/* Cabecera Principal */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'inline-block',
          backgroundColor: 'rgba(0, 178, 227, 0.25)',
          border: '1px solid rgba(0, 178, 227, 0.5)',
          color: '#7dd3fc',
          padding: '4px 14px',
          borderRadius: '999px',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          marginBottom: '0.9rem'
        }}>
          Licencia Escolar · Centros de Educación Infantil (0 a 3 años)
        </div>
        <h1 style={{
          margin: '0 0 0.6rem 0',
          fontSize: '2.1rem',
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: 700,
          color: '#ffffff'
        }}>
          Guía Pedagógica de Rutinas de Aula
        </h1>
        <p style={{
          margin: 0,
          fontSize: '1.05rem',
          color: '#cbd5e1',
          maxWidth: '780px',
          lineHeight: 1.6
        }}>
          Cómo acompañar los momentos clave de la jornada escolar utilizando el repertorio de <strong>Musicabalú</strong> (basado en la <em>Music Learning Theory</em> de Edwin E. Gordon).
        </p>
      </div>

      {/* 1. Enfoque para las educadoras (Las 3 Claves) */}
      <section style={{
        backgroundColor: 'white',
        borderRadius: '18px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        border: '1px solid #f1f5f9'
      }}>
        <h2 style={{
          margin: '0 0 0.75rem 0',
          fontSize: '1.4rem',
          color: '#1e293b',
          fontFamily: "'Quicksand', sans-serif"
        }}>
          1. Enfoque para las Educadoras: La Música como Aliada en el Aula
        </h2>
        <p style={{ color: '#475569', lineHeight: 1.65, marginBottom: '1.5rem', fontSize: '0.98rem' }}>
          Esta guía no pretende que las educadoras «den una clase de música» técnica, sino ofrecerles <strong>un mapa sencillo y práctico para acompañar los momentos clave del día en la escuela infantil</strong> (bienvenida, juego, recogida, fila, higiene, calma, siesta y despedida) sin forzar la voz ni recurrir a gritos.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '14px',
            padding: '1.25rem',
            borderTop: '4px solid #00b2e3'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔔</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#0f172a' }}>
              1. La música como señal sin gritos
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.55 }}>
              En lugar de pedir silencio o dar órdenes verbales constantes (<em>«vamos a recoger»</em>, <em>«haced la fila»</em>, <em>«a dormir»</em>), la canción actúa como un <strong>ancla sonora</strong> que los peques reconocen al instante y que regula su energía de forma natural.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '14px',
            padding: '1.25rem',
            borderTop: '4px solid #f4436c'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🥁</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#0f172a' }}>
              2. Alternar Canciones y Recitados
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.55 }}>
              Los recitados rítmicos sin melodía (<em>El trenecito</em>, <em>Limpio, muevo, bailo</em>, <em>Chiqui Pan</em>) centran toda la atención del cerebro del bebé en el pulso y el movimiento sin saturarlo.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '14px',
            padding: '1.25rem',
            borderTop: '4px solid #aadb1e'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤫</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#0f172a' }}>
              3. El silencio tras la canción
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.55 }}>
              Dejar <strong>3 o 4 segundos de silencio</strong> al terminar una canción permite que el peque procese internamente lo escuchado (<em>audiation</em>) y, muchas veces, responda con sus propios balbuceos musicales.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Los 6 Bloques de la Jornada Escolar */}
      <h2 style={{
        margin: '2.5rem 0 1.25rem 0',
        fontSize: '1.5rem',
        color: '#1e293b',
        fontFamily: "'Quicksand', sans-serif"
      }}>
        2. Mapa Musical de la Jornada Escolar (6 Momentos Clave)
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {BLOQUES.map((bloque) => (
          <div
            key={bloque.numero}
            style={{
              backgroundColor: 'white',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              border: `1px solid ${bloque.borderLight}`
            }}
          >
            {/* Cabecera del bloque */}
            <div style={{
              backgroundColor: bloque.bgLight,
              padding: '1.25rem 1.75rem',
              borderBottom: `1px solid ${bloque.borderLight}`,
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: bloque.color,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.35rem',
                flexShrink: 0,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
                {bloque.icono}
              </div>
              <div>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: bloque.color
                }}>
                  Bloque {bloque.numero}
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  color: '#0f172a',
                  fontFamily: "'Quicksand', sans-serif"
                }}>
                  {bloque.titulo}
                </h3>
              </div>
            </div>

            {/* Cuerpo del bloque */}
            <div style={{ padding: '1.5rem 1.75rem' }}>
              <p style={{
                margin: '0 0 1.25rem 0',
                padding: '0.75rem 1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                color: '#334155',
                fontSize: '0.94rem',
                borderLeft: `4px solid ${bloque.color}`
              }}>
                <strong>🎯 Objetivo en el aula:</strong> {bloque.objetivo}
              </p>

              {bloque.pistas && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {bloque.pistas.map((pista, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid #f1f5f9',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div style={{ marginBottom: '4px' }}>
                        <BadgeTipo tipo={pista.tipo} />
                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{pista.titulo}</strong>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: 1.5 }}>
                        {pista.uso}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {bloque.subbloques && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {bloque.subbloques.map((sub, sIdx) => (
                    <div key={sIdx}>
                      <h4 style={{
                        margin: '0 0 0.75rem 0',
                        fontSize: '0.95rem',
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px'
                      }}>
                        ▸ {sub.subtitulo}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {sub.pistas.map((pista, pIdx) => (
                          <div
                            key={pIdx}
                            style={{
                              padding: '0.85rem 1rem',
                              borderRadius: '12px',
                              border: '1px solid #f1f5f9',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            <div style={{ marginBottom: '4px' }}>
                              <BadgeTipo tipo={pista.tipo} />
                              <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{pista.titulo}</strong>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: 1.5 }}>
                              {pista.uso}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Chuletario Resumen de 1 Página para el corcho del aula */}
      <section style={{
        backgroundColor: 'white',
        borderRadius: '18px',
        padding: '2rem',
        marginTop: '2.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: '#fce7f3',
            color: '#be185d',
            fontSize: '0.78rem',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '999px',
            marginBottom: '0.5rem',
            textTransform: 'uppercase'
          }}>
            Página final imprimible para el corcho de clase
          </span>
          <h2 style={{
            margin: '0 0 0.4rem 0',
            fontSize: '1.4rem',
            color: '#1e293b',
            fontFamily: "'Quicksand', sans-serif"
          }}>
            3. Chuletario Rápido de Aula (Resumen en 1 Página)
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.94rem' }}>
            Pensado para que cada educadora pueda imprimir esta última hoja del PDF y pegarla en su aula como guía rápida diaria.
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.92rem'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#1e293b', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', borderRadius: '10px 0 0 0' }}>Momento del Día</th>
                <th style={{ padding: '12px 16px' }}>Canciones (🎵 Melodía)</th>
                <th style={{ padding: '12px 16px' }}>Recitados (🗣️ Ritmo)</th>
                <th style={{ padding: '12px 16px', borderRadius: '0 10px 0 0' }}>Efecto en el Aula</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>☀️ 1. Asamblea y Bienvenida</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Hello Elan · El sol · El corro especial · La ranita quiere cantar</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Chiqui Pan</td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>Conexión visual, círculo y escucha</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>🧣 2. Psicomotricidad y Juego</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Pañuelos · Me he escondido · Bota la pelota · Gira cinta · Cumbia Balú · Me encanta jugar · El oso bailarín · Yo me llamo Paf · Caballito</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Cuando te diga · Bote irregular · Salto como un saltamontes · Soy muy grande, soy ligero · Me muevo</td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>Movimiento fluido, materiales y control inhibitorio</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>🧺 3. Orden, Fila y Aseo</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Cuenta atrás · A recoger · El tren sale ya</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>El trenecito · Camino · Limpio, muevo, bailo</td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>Transiciones sin gritos y manos limpias</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>🌿 4. Vuelta a la Calma</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Semillita · Pizza familiar · El gatito · Tarde de lluvia</td>
                <td style={{ padding: '12px 16px', color: '#94a3b8' }}>—</td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>Bajar pulsaciones tras el patio, masaje y relajación</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>🌙 5. Hora de la Siesta</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Duérmete · Luna del mar</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Duerme, sueña</td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>Ritual predecible de sueño y descanso</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>👋 6. Despedida</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>Ya nos decimos adiós</td>
                <td style={{ padding: '12px 16px', color: '#94a3b8' }}>—</td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>Cierre afectivo antes de irse con las familias</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
