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
          Centro de mando unificado para implantar Musicabalú en la Escuela Infantil EMPI: acuerdo marco y comunicación para familias y redes, y guía pedagógica de rutinas de aula.
        </p>
      </div>

      {/* Tarjetas de Acceso Rápido (2 bloques) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "20px",
        marginBottom: "36px"
      }}>
        <a href="#estrategia" style={{ textDecoration: "none" }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "22px",
            borderRadius: "18px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            transition: "transform 0.15s ease",
            cursor: "pointer"
          }}>
            <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "8px" }}>🤝</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>1. Acuerdo y Comunicación</h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>Resumen del acuerdo, circular para familias y post para redes</p>
          </div>
        </a>

        <a href="#guia-aula" style={{ textDecoration: "none" }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "22px",
            borderRadius: "18px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            transition: "transform 0.15s ease",
            cursor: "pointer"
          }}>
            <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "8px" }}>🏫</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>2. Guía de Rutinas de Aula</h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>Canciones asignadas a los 5 momentos clave del día (0-3 años)</p>
          </div>
        </a>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 1: PLAN ESTRATÉGICO, ACUERDO Y COMUNICACIÓN */}
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
            1. Acuerdo Marco y Materiales de Comunicación
          </h2>
        </div>

        {/* Resumen del Acuerdo Marco */}
        <div style={{
          backgroundColor: "#f8fafc",
          border: "1.5px solid #e2e8f0",
          borderRadius: "16px",
          padding: "22px",
          marginBottom: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📜</span> Resumen del Acuerdo: «Entorno Musicabalú en el Aula»
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#475569", backgroundColor: "#e2e8f0", padding: "4px 10px", borderRadius: "12px" }}>
              📁 Guardado en local: Centros Entorno MusicaBalu/EMPI
            </span>
          </div>

          <p style={{ color: "#475569", fontSize: "0.93rem", lineHeight: "1.6", margin: "0 0 16px 0" }}>
            EMPI se convierte en el <strong>primer centro en ofrecer un «Entorno Musicabalú en el aula»</strong>. Acuerdo cerrado en noviembre 2026 para el curso 2026/2027 basado en los 4 compromisos estratégicos:
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
            marginBottom: "16px"
          }}>
            <div style={{ backgroundColor: "#f0f9ff", padding: "14px", borderRadius: "12px", border: "1px solid #bae6fd" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "#0284c7", textTransform: "uppercase" }}>Pilar 1 · Desde 17 Nov</span>
              <h4 style={{ margin: "4px 0", color: "#0f172a", fontSize: "0.95rem" }}>Licencia de Centro para el Aula</h4>
              <p style={{ margin: 0, fontSize: "0.83rem", color: "#475569", lineHeight: "1.4" }}>
                Acceso libre e ilimitado para todas las educadoras de EMPI a la plataforma digital Musicabalú.
              </p>
            </div>

            <div style={{ backgroundColor: "#fdf2f4", padding: "14px", borderRadius: "12px", border: "1px solid #fbcfe8" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "#e11d48", textTransform: "uppercase" }}>Pilar 2 · 17 Nov al 31 Dic</span>
              <h4 style={{ margin: "4px 0", color: "#0f172a", fontSize: "0.95rem" }}>Promoción Familias (29 €)</h4>
              <p style={{ margin: 0, fontSize: "0.83rem", color: "#475569", lineHeight: "1.4" }}>
                Suscripción anual a <strong>29 €</strong> (en vez de 39 €) para familias matriculadas con el cupón <code>EMPI2026</code>.
              </p>
            </div>

            <div style={{ backgroundColor: "#fffdf5", padding: "14px", borderRadius: "12px", border: "1px solid #fde68a" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "#d97706", textTransform: "uppercase" }}>Pilar 3 · Próximas semanas</span>
              <h4 style={{ margin: "4px 0", color: "#0f172a", fontSize: "0.95rem" }}>Co-creación de la Guía de Aula</h4>
              <p style={{ margin: 0, fontSize: "0.83rem", color: "#475569", lineHeight: "1.4" }}>
                Desarrollo colaborativo con el feedback directo de las educadoras: dinámicas más usadas, necesidades reales, etc.
              </p>
            </div>

            <div style={{ backgroundColor: "#f7fee7", padding: "14px", borderRadius: "12px", border: "1px solid #d9f99d" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "#65a30d", textTransform: "uppercase" }}>Pilar 4 · Enero / Febrero</span>
              <h4 style={{ margin: "4px 0", color: "#0f172a", fontSize: "0.95rem" }}>Formación de 8 Horas</h4>
              <p style={{ margin: 0, fontSize: "0.83rem", color: "#475569", lineHeight: "1.4" }}>
                Formación presencial de 8 horas con plazas gratuitas para las educadoras de EMPI a cambio de la cesión del espacio.
              </p>
            </div>
          </div>
        </div>

        {/* Circular para Familias de EMPI */}
        <div style={{
          backgroundColor: "#f0fdf4",
          border: "1.5px solid #bbf7d0",
          borderRadius: "16px",
          padding: "22px",
          marginBottom: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#166534", margin: 0 }}>
              ✉️ Circular Oficial para que EMPI envíe a sus Familias
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#15803d" }}>Vía Email, TokApp o WhatsApp del centro</span>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "0.9rem",
            color: "#1e293b",
            lineHeight: "1.65",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            border: "1px solid #dcfce7"
          }}>
{`Asunto: Novedad pedagógica en el aula: Entorno musical Musicabalú y ventaja exclusiva para nuestras familias 🎶

Estimadas familias:

En la Escuela Infantil EMPI siempre buscamos enriquecer el día a día de vuestros peques con experiencias de la máxima calidad pedagógica y afectiva. Por eso, nos alegra enormemente compartir con vosotras una colaboración muy especial: somos el primer centro infantil en incorporar un «Entorno Musicabalú en el aula».

¿En qué consiste este proyecto?
A través de la dirección pedagógica de Javier Muñoz (creador de Musicabalú y especialista en la Teoría del Aprendizaje Musical de Edwin Gordon), nuestro equipo de educadoras contará en el aula con un repertorio musical vivo, acústico y variado (diferentes modos, ritmos y juegos corporales), 100% libre de pantallas. Con ello acompañaremos las asambleas, los momentos de juego motor y las transiciones hacia la calma y el descanso.

Llevar la música de su aula al salón de casa
Sabemos que los niños aprenden por imitación y familiaridad. Para tender un puente entre la escuela y vuestro hogar, queremos que podáis cantar y jugar en casa con las mismas melodías que vuestro peque ya reconoce cada mañana en su clase.

Por ser familia matriculada en EMPI, disponéis de una promoción exclusiva:
• Suscripción anual completa a la plataforma Musicabalú: 29 € / año (precio estándar: 39 €/año; menos de 2,45 € al mes).
• Acceso ilimitado: Todas las canciones, recitados, juegos y píldoras prácticas con ideas para el día a día.
• Periodo de la promoción: Disponible desde el 17 de noviembre hasta el 31 de diciembre.

¿Cómo acceder?
Podéis acceder escaneando el código QR del cartel disponible en la entrada de la escuela o directamente en https://musicabalu.com/tienda aplicando el cupón exclusivo: EMPI2026.

Deseamos que disfrutéis muchísimo de estas melodías compartidas en familia tanto como lo hacemos nosotras en clase.

Con mucho cariño,
El equipo educativo y de dirección de Escuela Infantil EMPI`}
          </div>
        </div>

        {/* Publicación en Redes Sociales */}
        <div style={{
          backgroundColor: "#fdf2f8",
          border: "1.5px solid #fbcfe8",
          borderRadius: "16px",
          padding: "22px",
          marginBottom: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#9d174d", margin: 0 }}>
              📸 Texto para Publicación en Redes Sociales (con foto conjunta)
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#db2777" }}>Instagram (Feed + Story)</span>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "0.9rem",
            color: "#1e293b",
            lineHeight: "1.65",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            border: "1px solid #fce7f3"
          }}>
{`Un paso pionero por la educación musical en la primera infancia: ¡Bienvenida Escuela Infantil EMPI! 🎶👶✨

Nos hace una ilusión inmensa anunciar que EMPI se convierte en el primer centro educativo en integrar un «Entorno Musicabalú en el aula».

¿Qué significa esto?
🏫 A partir de este 17 de noviembre, todas las educadoras de EMPI contarán con acceso libre a nuestra plataforma para llenar sus aulas de música viva: melodías modales, recitados rítmicos, juegos de regazo y momentos de calma basados en la Teoría del Aprendizaje Musical de Edwin Gordon, 100% libres de pantallas.

📋 Además, durante las próximas semanas trabajaremos mano a mano con su equipo docente para co-crear la Guía de Aula de Musicabalú, adaptando cada recurso al día a día real de los más peques.

💛 Y lo más especial para sus familias:
Para que los peques puedan seguir disfrutando en casa de las mismas canciones que ya reconocen cada mañana con su seño, todas las familias matriculadas en EMPI tendrán una promoción exclusiva para acceder a la plataforma con tarifa bonificada hasta el 31 de diciembre.

Gracias a todo el equipo de @escuelainfantilempi por su confianza, su sensibilidad y su compromiso con una infancia respetuosa y musical.

¡Comenzamos a cantar juntos! 🎵

#Musicabalú #EscuelaInfantilEMPI #Murcia #EducacionInfantil #MetodoGordon #MLT #EstimulacionMusical #CrianzaRespetuosa #SinPantallas`}
          </div>
        </div>

        {/* Mensaje de WhatsApp para Coordinación de Dirección */}
        <div style={{
          backgroundColor: "#f0f9ff",
          border: "1.5px solid #bae6fd",
          borderRadius: "16px",
          padding: "22px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0369a1", margin: 0 }}>
              💬 Mensaje breve para Dirección (para coordinar el lunes 16)
            </h3>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0284c7" }}>WhatsApp directo</span>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "0.9rem",
            color: "#1e293b",
            lineHeight: "1.65",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            border: "1px solid #e0f2fe"
          }}>
{`¡Hola! Tras nuestra reunión de ayer, ya tenemos todo perfectamente preparado para arrancar este 17 de noviembre:

1. Os he preparado el documento formal del acuerdo en PDF con los 4 puntos que hablamos (licencia de aula, promoción de familias a 29 €, co-creación de la guía y la formación presencial de 8h).
2. Tenéis lista la circular para enviársela a vuestras familias con el cupón EMPI2026 y el cartel impreso con código QR para vuestro tablón.
3. El lunes activamos el acceso de centro para vuestras educadoras. Si os parece bien, pasamos un momento a hacernos la foto para anunciar en redes esta alianza tan bonita. ¡Muchísimas gracias por la confianza!`}
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
        marginBottom: "20px",
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
    </div>
  );
}
