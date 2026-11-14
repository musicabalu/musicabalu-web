import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Programas para Conservatorios - Musicabalú Admin',
};

export default function ProgramasConservatoriosAdminPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px 80px' }}>
      {/* Botón Volver */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/admin/formaciones"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-cyan, #00B2E3)',
            fontWeight: '700',
            textDecoration: 'none',
            fontSize: '0.95rem'
          }}
        >
          ← Volver a Formaciones
        </Link>
      </div>

      {/* Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '2.2rem' }}>🏛️</span>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--color-dark)', margin: 0, fontWeight: 800 }}>
            Programas para Conservatorios
          </h1>
        </div>
        <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', margin: 0, lineHeight: 1.6 }}>
          Propuesta formativa de alto nivel académico para Conservatorios Superiores de Música y alumnado de Pedagogía Musical.
        </p>
      </header>

      {/* CURSO DESTACADO: CONSERVATORIO SUPERIOR */}
      <article style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '2px solid #805ad5',
        boxShadow: '0 10px 25px -5px rgba(128, 90, 213, 0.1)',
        overflow: 'hidden',
        marginBottom: '2.5rem'
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
                NIVEL SUPERIOR / PRO
              </span>
              <span style={{
                backgroundColor: '#fef08a',
                color: '#854d0e',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '999px'
              }}>
                PROPUESTA CONSERVATORIO SUPERIOR MURCIA
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
              <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: 600 }}>Alumnado de Pedagogía Musical, Profesorado de Música y Músicos</span>
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
              <span style={{ fontSize: '0.95rem', color: '#805ad5', fontWeight: 700 }}>Programa académico listo para presentación</span>
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
                El cuerpo como primer instrumento: peso, flujo, espacio y tiempo (Análisis del Movimiento de Rudolf Laban). El movimiento continuo y fluido frente al pulso rígido o robótico. Métricas habituales (dobles y triples) vs. Métricas inusuales (amalgamas 5/8, 7/8). Patrones de macrobeats y microbeats. Los recitados rítmicos sin base armónica como herramienta de desarrollo de la percepción temporal.
              </p>
              <div style={{ fontSize: '0.82rem', color: '#718096' }}>
                <strong>Conceptos clave:</strong> Laban Movement Analysis, Macro/Microbeats, Métricas inusuales, Flow & Weight.
              </div>
            </div>

            {/* Módulo 4 */}
            <div style={{ border: '1px solid #edf2f7', borderRadius: '10px', padding: '16px 20px', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, color: '#805ad5', fontSize: '1.05rem' }}>
                  Módulo 4: Diseño Práctico de Sesiones y Rol del Guía Musical
                </div>
                <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600 }}>1,5 horas</span>
              </div>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.92rem', color: '#4a5568', lineHeight: 1.6 }}>
                Arquitectura de una sesión de 0 a 3 años y de 3 a 6 años. Curva de energía (bienvenida, activación, inmersión modal, calma). La eliminación de la instrucción verbal (&ldquo;ahora vamos a cantar...&rdquo;) a favor de la inducción musical directa. El papel de los acompañantes adultos en el aula. Análisis de casos prácticos en vídeo y simulación docente guiada.
              </p>
              <div style={{ fontSize: '0.82rem', color: '#718096' }}>
                <strong>Conceptos clave:</strong> Curva de sesión, Non-verbal cueing, Modelado adulto, Análisis de aula.
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CURSO COMPLEMENTARIO: EDUCADORES Y FAMILIAS */}
      <article style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1.5px solid #e2e8f0',
        padding: '24px 28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>
              NIVEL INICIACIÓN · CENTROS Y FAMILIAS
            </span>
            <h3 style={{ margin: '6px 0 0 0', fontSize: '1.3rem', color: 'var(--color-dark)', fontWeight: 800 }}>
              Música, Vínculo y Movimiento en la Primera Infancia (0 a 3 años)
            </h3>
          </div>
          <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>8 horas lectivas</span>
        </div>
        <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 14px 0' }}>
          La formación pionera impartida en febrero de 2026. Diseñada específicamente para educadoras infantiles, madres y padres que, 
          sin poseer formación musical formal, desean enriquecer el entorno auditivo y emocional de los peques mediante la voz viva, el juego corporal y la escucha activa libre de pantallas.
        </p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <Link
            href="/admin/formaciones/propuestas"
            style={{
              color: 'var(--color-cyan, #00B2E3)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            Ver Propuestas y Modelos para Escuelas Infantiles →
          </Link>
        </div>
      </article>
    </div>
  );
}
