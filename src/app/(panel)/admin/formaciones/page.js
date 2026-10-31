import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Programas Formativos - Musicabalú Admin',
};

export default function ProgramasFormativosAdminPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Botón Volver */}
      <Link
        href="/admin"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--color-cyan)',
          textDecoration: 'none',
          fontWeight: 600,
          marginBottom: '1.5rem',
          fontSize: '0.95rem'
        }}
      >
        ← Volver al Panel de Control
      </Link>

      {/* Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '2.2rem' }}>🎓</span>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--color-dark)', margin: 0, fontWeight: 800 }}>
            Programas Formativos y Cursos
          </h1>
        </div>
        <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', margin: 0, lineHeight: 1.6 }}>
          Planificación pedagógica, catálogo de formaciones diferenciadas por perfil y hoja de ruta para la plataforma multi-curso de Musicabalú.
        </p>
      </header>

      {/* Visión de Arquitectura Multi-Curso */}
      <section style={{
        backgroundColor: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.75rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🧭</span>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--color-dark)', margin: 0, fontWeight: 700 }}>
            Visión Estratégica: Arquitectura Modular de Formaciones
          </h2>
        </div>
        <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
          Hasta ahora la plataforma tenía un único acceso general. A medida que Musicabalú crezca con formaciones presenciales y online para perfiles dispares (escuelas infantiles, familias, conservatorios y músicos profesionales), la plataforma debe funcionar de forma modular:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
          <div style={{ backgroundColor: 'white', padding: '15px 18px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <div style={{ fontWeight: 700, color: 'var(--color-cyan)', marginBottom: '5px' }}>
              🎵 Núcleo Compartido (Transversal)
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
              La biblioteca de <strong>Canciones, Recitados y Karaokes</strong> es el repertorio común a disposición de todos los alumnos de cualquier formación.
            </p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '15px 18px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <div style={{ fontWeight: 700, color: 'var(--color-pink)', marginBottom: '5px' }}>
              📚 Contenidos Específicos por Formación
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
              Cada curso dispone de sus propios <strong>apuntes, diapositivas, índice del programa y nivel técnico</strong> adaptado a la audiencia (no músicos vs. conservatorio).
            </p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '15px 18px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <div style={{ fontWeight: 700, color: '#805ad5', marginBottom: '5px' }}>
              🔐 Acceso Condicional por Matrícula
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
              El alumno solo visualiza el material del curso en el que está matriculado, manteniendo una experiencia limpia, personalizada y profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Catálogo de Programas */}
      <h2 style={{ fontSize: '1.6rem', color: 'var(--color-dark)', marginBottom: '1.5rem', fontWeight: 800 }}>
        Catálogo de Programas Formativos
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

        {/* CURSO 2: CONSERVATORIO SUPERIOR (DESTACADO / NUEVO) */}
        <article style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          border: '2px solid #805ad5',
          boxShadow: '0 10px 25px -5px rgba(128, 90, 213, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Cabecera del Curso */}
          <div style={{
            backgroundColor: '#805ad5',
            color: 'white',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  letterSpacing: '0.5px'
                }}>
                  NUEVO · NIVEL SUPERIOR / PRO
                </span>
                <span style={{
                  backgroundColor: '#fef08a',
                  color: '#854d0e',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '999px'
                }}>
                  PROPUESTA CONSERVATORIO MURCIA
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
                La MLT de Edwin Gordon y Audiation en la Primera Infancia (0 a 6 años)
              </h3>
            </div>
            <div style={{ textAlign: 'right', minWidth: '150px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>8h / 12h lectivas</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Sábado o Fin de semana</div>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            {/* Ficha Resumen */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '15px',
              padding: '1.25rem',
              backgroundColor: '#faf5ff',
              borderRadius: '12px',
              border: '1px solid #e9d8fd',
              marginBottom: '1.75rem'
            }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#6b21a8', textTransform: 'uppercase' }}>Público Objetivo</strong>
                <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: 600 }}>Alumnado de Pedagogía Musical, Música y Músicos</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#6b21a8', textTransform: 'uppercase' }}>Enfoque Pedagógico</strong>
                <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: 600 }}>Neurociencia, Audiation, Modos Gordon y Laban</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#6b21a8', textTransform: 'uppercase' }}>Materiales del Alumno</strong>
                <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: 600 }}>Dossier técnico, guías de composición modal y audios</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#6b21a8', textTransform: 'uppercase' }}>Estado del Proyecto</strong>
                <span style={{ fontSize: '0.95rem', color: '#805ad5', fontWeight: 700 }}>Borrador de programa listo para enviar</span>
              </div>
            </div>

            {/* Temario Modular */}
            <h4 style={{ fontSize: '1.15rem', color: 'var(--color-dark)', marginBottom: '1rem', fontWeight: 700 }}>
              Programa de Contenidos por Módulos
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '2rem' }}>
              {/* Módulo 1 */}
              <div style={{ border: '1px solid #edf2f7', borderRadius: '10px', padding: '16px 20px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#805ad5', fontSize: '1.05rem' }}>
                    Módulo 1: Fundamentos Neurocognitivos y el Concepto de Audiation
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>2 horas</span>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.92rem', color: '#4a5568', lineHeight: 1.6 }}>
                  Definición rigurosa de <em>Audiation</em> (pensamiento musical interno vs. memoria/percepción pasiva). El paralelismo del aprendizaje con la lengua materna (<em>Sound before Sight</em>) y por qué postergar la grafía/partitura. Las 3 etapas de la <em>Audiation Preparatoria</em> (Aculturación, Imitación, Asimilación). Identificación y validación dialógica del balbuceo musical (tonal y rítmico).
                </p>
                <div style={{ fontSize: '0.82rem', color: '#718096' }}>
                  <strong>Conceptos clave:</strong> Edwin Gordon, Preparatory Audiation, Aculturación musical, Diálogo sonoro.
                </div>
              </div>

              {/* Módulo 2 */}
              <div style={{ border: '1px solid #edf2f7', borderRadius: '10px', padding: '16px 20px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#805ad5', fontSize: '1.05rem' }}>
                    Módulo 2: Contenido Tonal, Modalidad y Sintaxis Armónica
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>2,5 horas</span>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.92rem', color: '#4a5568', lineHeight: 1.6 }}>
                  Superación del sesgo bimodal del repertorio infantil tradicional (exceso de Do Mayor). El sistema de <strong>Do Móvil</strong> y las <strong>Notas de Reposo (Resting Tone)</strong>. Composición y análisis en los 7 modos (Jónico, Dórico, Frigio, Lidio, Mixolidio, Eólico, Locrio). Delineación melódica de las funciones armónicas principales. Canciones sin texto con sílabas neutras (<em>pam, bam</em>) para aislar la sintaxis tonal sin interferencia del lenguaje. Secuenciación de patrones tonales.
                </p>
                <div style={{ fontSize: '0.82rem', color: '#718096' }}>
                  <strong>Conceptos clave:</strong> Resting tones, Do móvil, Armonía modal implícita, Neutral syllables, Tonal patterns.
                </div>
              </div>

              {/* Módulo 3 */}
              <div style={{ border: '1px solid #edf2f7', borderRadius: '10px', padding: '16px 20px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#805ad5', fontSize: '1.05rem' }}>
                    Módulo 3: Contenido Rítmico y Movimiento Somático (Laban)
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>2 horas</span>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.92rem', color: '#4a5568', lineHeight: 1.6 }}>
                  Sintaxis rítmica de Gordon vs. métrica euclidiana: Macrobeats, microbeats, divisiones y elongaciones. Métricas usuales y métricas inusuales/asimétricas (amalgamas 5/8, 7/8). Sílabas rítmicas de Gordon. Movimiento somático aplicado: por qué desterrar las palmas rígidas de metrónomo en 0-3 años. Los 4 factores del movimiento de Rudolf Laban aplicados a la música: <em>Flujo libre/continuo</em>, <em>Peso</em>, <em>Espacio</em> y <em>Tiempo</em>.
                </p>
                <div style={{ fontSize: '0.82rem', color: '#718096' }}>
                  <strong>Conceptos clave:</strong> Macrobeats/microbeats, Métricas asimétricas, Rudolf Laban, Flujo continuo, Estimulación vestibular.
                </div>
              </div>

              {/* Módulo 4 */}
              <div style={{ border: '1px solid #edf2f7', borderRadius: '10px', padding: '16px 20px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#805ad5', fontSize: '1.05rem' }}>
                    Módulo 4: Didáctica de Aula, Dinámicas y Laboratorio Práctico (Micro-teaching)
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>1,5h (en 8h) / 3,5h (en 12h)</span>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.92rem', color: '#4a5568', lineHeight: 1.6 }}>
                  Diseño y arquitectura de una sesión (0-3 y 3-6 años): curvas de activación/relajación, contraste y gestión del silencio fértil. El educador como modelo acústico vivo (canto a capela y sin pantallas). Uso pedagógico de materiales mediadores no estructurados (pañuelos de seda, gomas cooperativas, pelotas sensoriales). Simulaciones docentes en directo por parte de los alumnos del conservatorio con retroalimentación técnica. Puente hacia la enseñanza instrumental (metodología <em>Jump Right In</em>).
                </p>
                <div style={{ fontSize: '0.82rem', color: '#718096' }}>
                  <strong>Conceptos clave:</strong> Curvas de tensión/reposo, Silencio fértil, Micro-teaching, Jump Right In, Transferencia instrumental.
                </div>
              </div>
            </div>

            {/* Opciones de Carga Horaria */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: 'var(--color-dark)', fontWeight: 700 }}>
                Opciones de Horario para el Conservatorio
              </h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                <div style={{ backgroundColor: 'white', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong>Opción A: 1 Sábado Intensivo (8 horas)</strong>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', fontSize: '0.85rem', color: '#4a5568' }}>
                    <li>10:00–14:00 (Módulos 1 y 2: Teoría, Audiation y Modos)</li>
                    <li>14:00–16:00 (Almuerzo)</li>
                    <li>16:00–20:00 (Módulos 3 y 4: Ritmo, Laban y Práctica)</li>
                  </ul>
                </div>
                <div style={{ backgroundColor: 'white', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong>Opción B: Fin de Semana Completo (12 horas)</strong>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', fontSize: '0.85rem', color: '#4a5568' }}>
                    <li>Sábado (8 horas): Módulos 1, 2 y 3 en profundidad</li>
                    <li>Domingo mañana (10:00–14:00): Módulo 4 ampliado con taller de composición y simulación individual</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* CURSO 1: EDUCADORES Y FAMILIAS (ACTIVO) */}
        <article style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}>
          {/* Cabecera del Curso */}
          <div style={{
            backgroundColor: 'var(--color-cyan)',
            color: 'white',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  letterSpacing: '0.5px'
                }}>
                  FORMACIÓN 1 · ACTIVA
                </span>
                <span style={{
                  backgroundColor: '#bbf7d0',
                  color: '#14532d',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '999px'
                }}>
                  10 ALUMNOS CON ACCESO
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
                Recursos Musicales para Educadores y Familias (0 a 6 años)
              </h3>
            </div>
            <div style={{ textAlign: 'right', minWidth: '150px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>8h / Intensivo</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Presencial en Escuelas / Sábados</div>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '15px',
              padding: '1.25rem',
              backgroundColor: '#f0fdfa',
              borderRadius: '12px',
              border: '1px solid #ccfbf1',
              marginBottom: '1.75rem'
            }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#0f766e', textTransform: 'uppercase' }}>Público Objetivo</strong>
                <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: 600 }}>Educadores de infantil y familias (sin conocimientos previos)</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#0f766e', textTransform: 'uppercase' }}>Enfoque Pedagógico</strong>
                <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: 600 }}>Práctico, perder el miedo a cantar y rutinas diarias</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#0f766e', textTransform: 'uppercase' }}>Materiales del Alumno</strong>
                <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: 600 }}>Diapositivas Google Slides integradas + biblioteca audios</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#0f766e', textTransform: 'uppercase' }}>Acceso en Plataforma</strong>
                <Link
                  href="/formaciones/plataforma"
                  style={{
                    display: 'inline-block',
                    marginTop: '2px',
                    color: 'var(--color-cyan)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '0.95rem'
                  }}
                >
                  Ver Plataforma Actual →
                </Link>
              </div>
            </div>

            <h4 style={{ fontSize: '1.15rem', color: 'var(--color-dark)', marginBottom: '0.75rem', fontWeight: 700 }}>
              Ejes Centrales de la Formación
            </h4>
            <ul style={{ margin: '0 0 1.5rem 0', paddingLeft: '20px', color: '#4a5568', lineHeight: 1.7 }}>
              <li><strong>El Paso a Paso:</strong> Selección de repertorio variado, análisis de materiales y gestión de la atención en el aula sin sobreestimulación.</li>
              <li><strong>El Movimiento:</strong> Uso corporal fluido y natural, sin coreografías rígidas que bloqueen la espontaneidad del niño.</li>
              <li><strong>Voz y Comunicación:</strong> La música como canal afectivo de vínculo y regulación en el día a día.</li>
            </ul>
          </div>
        </article>

      </div>

      {/* Plan de Acción Técnico para la Separación de Plataformas */}
      <section style={{
        marginTop: '3rem',
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🛠️</span>
          <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--color-dark)', fontWeight: 800 }}>
            Hoja de Ruta Técnica: Implementación en la Web
          </h3>
        </div>
        <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
          Para dar soporte a múltiples formaciones sin interferencias entre públicos, los pasos a seguir en la plataforma son:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          <div style={{ borderLeft: '3px solid var(--color-cyan)', paddingLeft: '15px' }}>
            <h5 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: 'var(--color-dark)' }}>1. Modelo de Datos de Matrículas</h5>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
              Crear una relación en base de datos (o campo en <code>Enrollment</code> / <code>User</code>) para registrar qué cursos tiene asignados cada usuario (ej. <code>curso_educadores_0_6</code> vs. <code>curso_csm_murcia_mlt</code>).
            </p>
          </div>

          <div style={{ borderLeft: '3px solid var(--color-pink)', paddingLeft: '15px' }}>
            <h5 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: 'var(--color-dark)' }}>2. Plataforma Dinámica por Curso</h5>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
              Evolucionar <code>/formaciones/plataforma</code> para cargar dinámicamente la pestaña de <em>Apuntes</em> según el curso seleccionado, mostrando el iframe de Google Slides correspondiente a cada colectivo.
            </p>
          </div>

          <div style={{ borderLeft: '3px solid #805ad5', paddingLeft: '15px' }}>
            <h5 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: 'var(--color-dark)' }}>3. Selector de Cursos en &ldquo;Mis Formaciones&rdquo;</h5>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
              Si un usuario o administrador tiene acceso a varios cursos, podrá alternar entre ellos desde una cabecera con selector desplegable o tarjetas de curso.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
