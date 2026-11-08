import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Aterrizaje en EMPI · Centro Piloto y Alianza | Admin Musicabalú",
};

export default function AterrizajeEmpiPage() {
  return (
    <div style={{ maxWidth: "1050px", margin: "0 auto", padding: "30px 20px" }}>
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
      <div style={{ marginBottom: "32px" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "#fef3c7",
          color: "#92400e",
          fontWeight: "800",
          fontSize: "0.85rem",
          padding: "5px 14px",
          borderRadius: "999px",
          marginBottom: "10px",
          border: "1.5px solid #fde68a"
        }}>
          <span>🚀</span>
          <span>Centro Piloto Oficial · Alianza Estratégica</span>
        </div>
        <h1 style={{ fontSize: "2.3rem", fontWeight: "900", color: "#0f172a", margin: "0 0 10px 0", fontFamily: "var(--font-heading)" }}>
          Aterrizaje en EMPI
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: "1.6", margin: 0, maxWidth: "800px" }}>
          Centro de mando unificado para implantar Musicabalú en la Escuela Infantil EMPI: estrategia y acuerdo, comunicación para dirección, publicación en redes sociales, guía pedagógica de rutinas de aula y cartel A4 para el centro.
        </p>
      </div>

      {/* Tarjetas de Acceso Rápido */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginBottom: "36px"
      }}>
        <a href="#estrategia" style={{ textDecoration: "none" }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "18px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            transition: "transform 0.15s ease",
            cursor: "pointer"
          }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>🤝</span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>1. Acuerdo y Comunicación</h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>Propuesta para dirección, foto y post para redes</p>
          </div>
        </a>

        <a href="#guia-aula" style={{ textDecoration: "none" }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "18px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            transition: "transform 0.15s ease",
            cursor: "pointer"
          }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>🏫</span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>2. Guía de Rutinas de Aula</h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>Canciones asignadas a los 5 momentos clave del día</p>
          </div>
        </a>

        <a href="#cartel-a4" style={{ textDecoration: "none" }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "18px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            transition: "transform 0.15s ease",
            cursor: "pointer"
          }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>📄</span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>3. Cartel A4 para el Centro</h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>Cartel impreso con QR para el tablón de EMPI</p>
          </div>
        </a>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 1: PLAN ESTRATÉGICO Y COMUNICACIÓN */}
      {/* ========================================================================= */}
      <section id="estrategia" style={{
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "32px",
        border: "1.5px solid #e2e8f0",
        marginBottom: "36px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{ fontSize: "1.6rem" }}>📌</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
            1. Plan Estratégico y de Comunicación
          </h2>
        </div>

        {/* Cronograma en 4 Fases */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px"
        }}>
          <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#00B2E3", textTransform: "uppercase" }}>Fase 1 · Noviembre</span>
            <h4 style={{ margin: "6px 0", color: "#0f172a", fontSize: "1rem" }}>Acuerdo y Foto</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
              Foto cercana en el aula + activación de la cuenta de centro para las educadoras.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#F4436C", textTransform: "uppercase" }}>Fase 2 · Diciembre</span>
            <h4 style={{ margin: "6px 0", color: "#0f172a", fontSize: "1rem" }}>Campaña Familias EMPI</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
              Lanzamiento del descuento especial de Navidad para las familias matriculadas (hasta el 31 Dic).
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#b45309", textTransform: "uppercase" }}>Fase 3 · Enero</span>
            <h4 style={{ margin: "6px 0", color: "#0f172a", fontSize: "1rem" }}>Co-creación Guía</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
              Feedback de las maestras en el aula sobre las rutinas. Cierre de la Guía oficial para imprimir.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#16a34a", textTransform: "uppercase" }}>Fase 4 · Febrero</span>
            <h4 style={{ margin: "6px 0", color: "#0f172a", fontSize: "1rem" }}>Formación Presencial</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
              Taller formativo de sábado en EMPI. Equipo de EMPI gratis + plazas de pago para externos.
            </p>
          </div>
        </div>

        {/* Mensaje para Dirección */}
        <div style={{
          backgroundColor: "#f0f9ff",
          border: "1.5px solid #bae6fd",
          borderRadius: "16px",
          padding: "22px",
          marginBottom: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0369a1", margin: 0 }}>
              💬 Propuesta para Dirección (WhatsApp o conversación informal)
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0284c7" }}>Copia y adapta según prefieras</span>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "0.92rem",
            color: "#1e293b",
            lineHeight: "1.65",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            border: "1px solid #e0f2fe"
          }}>
{`¡Hola! Como ya comentamos el otro día, me hace muchísima ilusión que EMPI sea el primer centro donde la música de Musicabalú esté integrada en el día a día.

He estado pensando en cómo darle a esto una visión completa y bonita para que sea un éxito redondo para vosotras:

1. Os abrimos ya el acceso completo a la plataforma para que todas las educadoras podáis usar las canciones y recitados en las aulas cuando queráis.
2. Activamos para vuestras familias el descuento especial de Navidad hasta el 31 de diciembre.
3. Nos hacemos una foto juntos un día de estos para anunciar en redes que EMPI y Musicabalú unen fuerzas para ser centro de referencia musical.
4. Y lo mejor: de cara a febrero, me encantaría organizar una formación práctica en el centro sobre el uso de la música en las rutinas de 0 a 3 años, con plazas gratuitas para todo vuestro equipo de educadoras. Mi idea es que vosotras me ayudéis a co-crear la guía práctica con vuestra experiencia real en el aula.

Si os parece bien, en 5 minutos un día de estos nos hacemos la foto y os dejo las credenciales para que las maestras empiecen a probarlo. ¿Cómo lo ves?`}
          </div>
        </div>

        {/* Publicación en Redes Sociales */}
        <div style={{
          backgroundColor: "#fdf2f8",
          border: "1.5px solid #fbcfe8",
          borderRadius: "16px",
          padding: "22px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#9d174d", margin: 0 }}>
              📸 Texto para Publicación en Redes Sociales (con la foto conjunta)
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#db2777" }}>Instagram y Facebook</span>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "0.92rem",
            color: "#1e293b",
            lineHeight: "1.65",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            border: "1px solid #fce7f3"
          }}>
{`Hoy es un día muy especial para nosotros en Musicabalú 🎵✨

Damos un paso más en nuestra alianza con @escuelaempi: la Escuela Infantil EMPI se convierte en nuestro primer centro colaborador oficial.

A partir de ahora, nuestras canciones, recitados y dinámicas pedagógicas acompañarán el día a día de los peques en las aulas: desde la acogida matinal y los momentos de psicomotricidad, hasta los ritmos de calma y descanso.

Además, trabajaremos mano a mano con su maravilloso equipo de educadoras para co-crear la primera Guía de Rutinas Musicales de Aula y prepararemos una formación pedagógica muy especial para este curso.

Gracias al equipo de EMPI por confiar en la música viva, respetuosa y de calidad desde los primeros meses de vida. ¡Seguimos creciendo juntos! 💛🏡

#Musicabalú #EMPI #EducacionMusicalTemprana #MusicaBebes #Murcia #GordonMLT`}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 2: GUÍA DE RUTINAS DE AULA */}
      {/* ========================================================================= */}
      <section id="guia-aula" style={{
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "32px",
        border: "1.5px solid #e2e8f0",
        marginBottom: "36px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.6rem" }}>🏫</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              2. Guía Pedagógica de Rutinas de Aula (0-3 años)
            </h2>
          </div>
          <Link
            href="/admin/guia-aula"
            className="btn btn-primary"
            style={{
              padding: "10px 22px",
              fontWeight: "800",
              fontSize: "0.9rem",
              borderRadius: "30px",
              background: "linear-gradient(135deg, #00B2E3 0%, #008eb5 100%)",
              color: "#ffffff",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0, 178, 227, 0.25)"
            }}
          >
            Abrir Guía Completa de Aula →
          </Link>
        </div>

        <p style={{ color: "#64748b", fontSize: "0.98rem", lineHeight: "1.6", marginBottom: "20px" }}>
          Esta guía está diseñada para que las educadoras dispongan de un repertorio predecible según cada momento de la jornada escolar. No requiere que sepan música: solo necesitan pulsar reproducir o cantar la melodía.
        </p>

        {/* Las 5 Rutinas en Resumen */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "14px 18px", backgroundColor: "#f0faff", borderRadius: "14px", border: "1px solid #bae6fd", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong style={{ color: "#0369a1" }}>☀️ 1. Llegada y Asamblea de la Mañana:</strong>
              <span style={{ color: "#475569", fontSize: "0.9rem", marginLeft: "8px" }}>Hello Elan / El sol, El corro especial, Chiqui Pan.</span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#0284c7", fontWeight: "700" }}>Conexión y saludo</span>
          </div>

          <div style={{ padding: "14px 18px", backgroundColor: "#fff5f7", borderRadius: "14px", border: "1px solid #fed7e2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong style={{ color: "#be185d" }}>🧣 2. Psicomotricidad y Juego Activo:</strong>
              <span style={{ color: "#475569", fontSize: "0.9rem", marginLeft: "8px" }}>Pañuelos, Bota la pelota, Cumbia Balú, Cuando te diga.</span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#db2777", fontWeight: "700" }}>Movimiento y espacio</span>
          </div>

          <div style={{ padding: "14px 18px", backgroundColor: "#fffbeb", borderRadius: "14px", border: "1px solid #fde68a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong style={{ color: "#92400e" }}>🧺 3. Rutinas de Orden, Fila e Higiene:</strong>
              <span style={{ color: "#475569", fontSize: "0.9rem", marginLeft: "8px" }}>Cuenta atrás, A recoger, El tren sale ya, Limpio muevo bailo.</span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#d97706", fontWeight: "700" }}>Transiciones suaves</span>
          </div>

          <div style={{ padding: "14px 18px", backgroundColor: "#f7fee7", borderRadius: "14px", border: "1px solid #d9f99d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong style={{ color: "#3f6212" }}>🌿 4. Vuelta a la Calma y Masaje:</strong>
              <span style={{ color: "#475569", fontSize: "0.9rem", marginLeft: "8px" }}>Semillita, Pizza familiar, El gatito, Tarde de lluvia.</span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#65a30d", fontWeight: "700" }}>Bajar pulsaciones</span>
          </div>

          <div style={{ padding: "14px 18px", backgroundColor: "#eef2ff", borderRadius: "14px", border: "1px solid #c7d2fe", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong style={{ color: "#3730a3" }}>🌙 5. Transición al Sueño y Siesta:</strong>
              <span style={{ color: "#475569", fontSize: "0.9rem", marginLeft: "8px" }}>Duerme sueña (recitado), Duérmete, Luna del mar.</span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#6366f1", fontWeight: "700" }}>Ritual de descanso</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 3: CARTEL A4 EMPI */}
      {/* ========================================================================= */}
      <section id="cartel-a4" style={{
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "32px",
        border: "1.5px solid #e2e8f0",
        marginBottom: "20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.6rem" }}>📄</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              3. Cartel A4 Oficial para el Centro (con Código QR)
            </h2>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              href="/admin/cartel-empi"
              className="btn btn-outline"
              style={{
                padding: "8px 18px",
                fontWeight: "700",
                fontSize: "0.88rem",
                borderRadius: "20px",
                textDecoration: "none",
                display: "inline-block"
              }}
            >
              Ver en pantalla →
            </Link>
            <a
              href="/cartel-a4-empi.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{
                padding: "8px 18px",
                fontWeight: "700",
                fontSize: "0.88rem",
                borderRadius: "20px",
                backgroundColor: "#F4436C",
                color: "#ffffff",
                textDecoration: "none",
                display: "inline-block"
              }}
            >
              Descargar PDF para Imprimir 📥
            </a>
          </div>
        </div>

        <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
          Cartel diseñado en formato A4 con los logos conjuntos de Musicabalú y EMPI, código QR directo hacia la inscripción de clases y talleres para colocar en el tablón de anuncios y entrada de la escuela.
        </p>
      </section>
    </div>
  );
}
