"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DEFAULT_FRIDAY_TEMPLATE = `¡Hola familia!

Ya tenéis disponible en la plataforma el nuevo contenido de este viernes para compartir, jugar y disfrutar con vuestros peques durante el fin de semana:

🎵 NUEVA CANCIÓN: "Soy un elefante" (Modo eólico)
Una melodía con carácter solemne y misterioso, perfecta para explorar el peso corporal y la variedad modal en casa.
💡 Idea para jugar en casa: Convertíos en una manada de elefantes por el salón; dad pisadas pesadas y firmes sintiendo el pulso en el suelo, y balancead los brazos como trompas lentas.
👉 Escúchala aquí: https://musicabalu.com/comunidad/canciones

🗣️ DOS NUEVOS RECITADOS RÍTMICOS:
1️⃣ "La esponja" (Métrica triple)
Un ritmo continuo, fluido y ondulante que invita a la relajación y al movimiento circular.
💡 Idea para jugar en casa: Perfecto para la hora del baño o el masaje. Acompaña el recitado deslizando la esponja o tus manos suavemente por sus brazos y espalda al compás.

2️⃣ "Marcha" (Métrica doble)
Un pulso binario claro, lleno de energía y paso firme para activar el cuerpo.
💡 Idea para jugar en casa: Marchad juntos por el pasillo marcando el paso con los pies, o haced percusión suave sobre vuestras piernas.
👉 Escúchalos aquí: https://musicabalu.com/comunidad/recitados

¡Que paséis un fin de semana lleno de música viva y juego en familia! 🤗❤️

Un abrazo enorme,

Javi.`;

export default function AdminComunicacionesPage() {
  const [lists, setLists] = useState({ comunidad: [], presencial: [], unsubscribed: [] });
  const [loadingLists, setLoadingLists] = useState(true);

  const [audience, setAudience] = useState("comunidad"); // comunidad | presencial
  const [subject, setSubject] = useState("🎵 Novedades de este viernes: Soy un elefante y dos recitados rítmicos 💛");
  const [bodyText, setBodyText] = useState(DEFAULT_FRIDAY_TEMPLATE);
  const [testEmail, setTestEmail] = useState("hola@musicabalu.com");

  const [sending, setSending] = useState(false);
  const [resultMsg, setResultMsg] = useState(null);

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          setLists(data);
        }
        setLoadingLists(false);
      })
      .catch(() => setLoadingLists(false));
  }, []);

  const handleSend = async (mode) => {
    if (mode !== "test") {
      const targetList = audience === "presencial" ? lists.presencial : lists.comunidad;
      const confirmSend = window.confirm(
        `¿Seguro que quieres enviar este correo a ${targetList.length} familias?`
      );
      if (!confirmSend) return;
    }

    setSending(true);
    setResultMsg(null);

    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          bodyText,
          audience: mode === "test" ? "test" : audience,
          testEmail,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (mode === "test") {
          setResultMsg({
            type: "success",
            text: `✅ Correo de prueba enviado a ${testEmail} (incluye el pie legal y el enlace de baja automático).`,
          });
        } else {
          setResultMsg({
            type: "success",
            text: `🎉 ¡Envío completado! Se han enviado ${data.sentCount} correos correctamente.`,
          });
        }
      } else {
        setResultMsg({
          type: "error",
          text: data.error || "Hubo un problema al enviar los correos.",
        });
      }
    } catch (err) {
      setResultMsg({
        type: "error",
        text: "Error de conexión con el servidor.",
      });
    } finally {
      setSending(false);
    }
  };

  const activeAudienceList =
    audience === "presencial"
      ? lists.presencial
      : audience === "talleres"
      ? lists.talleres || []
      : audience === "todos"
      ? lists.todos || []
      : lists.comunidad;

  return (
    <div style={{ maxWidth: "920px", margin: "0 auto", padding: "30px 20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/admin" style={{ color: "var(--color-cyan)", fontWeight: "700", textDecoration: "none" }}>
          ← Volver al Panel de Control
        </Link>
      </div>

      <h1 style={{ fontSize: "2rem", color: "var(--color-dark)", fontWeight: "900", marginBottom: "8px" }}>
        📧 Correo de los Viernes y Comunicaciones
      </h1>
      <p style={{ color: "#64748b", marginBottom: "28px", lineHeight: "1.6" }}>
        Envía las novedades semanales de los viernes a la Comunidad, avisos especiales a familias de talleres o comunicados generales. El sistema añade automáticamente al pie el texto de Protección de Datos y el enlace para darse de baja en 1 clic.
      </p>

      {/* Selector de Destinatarios */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px",
        marginBottom: "28px"
      }}>
        <div
          onClick={() => setAudience("comunidad")}
          style={{
            padding: "18px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: audience === "comunidad" ? "#f0f9ff" : "white",
            border: audience === "comunidad" ? "2px solid var(--color-cyan)" : "1px solid #e2e8f0",
            boxShadow: audience === "comunidad" ? "0 4px 12px rgba(0, 178, 227, 0.15)" : "none",
          }}
        >
          <div style={{ fontWeight: "800", fontSize: "1rem", color: "var(--color-dark)", marginBottom: "6px" }}>
            🌍 Comunidad ({loadingLists ? "..." : (lists.comunidad || []).length} emails)
          </div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569", lineHeight: "1.4" }}>
            Viernes de novedades: Familias de clases presenciales + Suscriptores online (3,90 € / 39 €).
          </p>
        </div>

        <div
          onClick={() => setAudience("talleres")}
          style={{
            padding: "18px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: audience === "talleres" ? "#fdf2f8" : "white",
            border: audience === "talleres" ? "2px solid #ec4899" : "1px solid #e2e8f0",
            boxShadow: audience === "talleres" ? "0 4px 12px rgba(236, 72, 153, 0.15)" : "none",
          }}
        >
          <div style={{ fontWeight: "800", fontSize: "1rem", color: "var(--color-dark)", marginBottom: "6px" }}>
            🧸 Familias de Talleres ({loadingLists ? "..." : (lists.talleres || []).length} emails)
          </div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569", lineHeight: "1.4" }}>
            Familias inscritas en los talleres de música en familia (La Flota, El Ranero, etc.).
          </p>
        </div>

        <div
          onClick={() => setAudience("todos")}
          style={{
            padding: "18px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: audience === "todos" ? "#faf5ff" : "white",
            border: audience === "todos" ? "2px solid #8b5cf6" : "1px solid #e2e8f0",
            boxShadow: audience === "todos" ? "0 4px 12px rgba(139, 92, 246, 0.15)" : "none",
          }}
        >
          <div style={{ fontWeight: "800", fontSize: "1rem", color: "var(--color-dark)", marginBottom: "6px" }}>
            📣 Todos los Contactos ({loadingLists ? "..." : (lists.todos || []).length} emails)
          </div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569", lineHeight: "1.4" }}>
            Toda tu base de datos: Comunidad, clases y talleres juntos (sin duplicados).
          </p>
        </div>

        <div
          onClick={() => setAudience("presencial")}
          style={{
            padding: "18px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: audience === "presencial" ? "#fffbeb" : "white",
            border: audience === "presencial" ? "2px solid #f59e0b" : "1px solid #e2e8f0",
            boxShadow: audience === "presencial" ? "0 4px 12px rgba(245, 158, 11, 0.15)" : "none",
          }}
        >
          <div style={{ fontWeight: "800", fontSize: "1rem", color: "var(--color-dark)", marginBottom: "6px" }}>
            🏫 Clases Presenciales ({loadingLists ? "..." : (lists.presencial || []).length} emails)
          </div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569", lineHeight: "1.4" }}>
            Avisos operativos urgentes de aula (festivos, recuperaciones, cambios de horario).
          </p>
        </div>
      </div>

      {/* Editor del Correo */}
      <div style={{
        backgroundColor: "white",
        padding: "28px",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        border: "1px solid #f1f5f9"
      }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "800", marginBottom: "8px", color: "var(--color-dark)" }}>
            Asunto del correo:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1.5px solid #cbd5e1",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
            <label style={{ fontWeight: "800", color: "var(--color-dark)", margin: 0 }}>
              Mensaje (los enlaces https://... se vuelven clicables automáticamente):
            </label>
            <button
              type="button"
              onClick={() => {
                setSubject("🎵 Novedades de este viernes: Soy un elefante y dos recitados rítmicos 💛");
                setBodyText(DEFAULT_FRIDAY_TEMPLATE);
              }}
              style={{
                background: "transparent",
                border: "1px solid #cbd5e1",
                padding: "4px 12px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                color: "#475569",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              ↺ Cargar plantilla por defecto (con ideas para jugar)
            </button>
          </div>
          <textarea
            rows={15}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1.5px solid #cbd5e1",
              fontSize: "0.98rem",
              lineHeight: "1.6",
              fontFamily: "inherit",
            }}
          />
        </div>

        {resultMsg && (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              marginBottom: "20px",
              backgroundColor: resultMsg.type === "success" ? "#f0fdf4" : "#fef2f2",
              color: resultMsg.type === "success" ? "#166534" : "#b91c1c",
              border: `1px solid ${resultMsg.type === "success" ? "#86efac" : "#fecaca"}`,
              fontWeight: "600",
            }}
          >
            {resultMsg.text}
          </div>
        )}

        {/* Botones de Prueba y Envío Real */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: "1px solid #f1f5f9"
        }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Tu email de prueba"
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
              }}
            />
            <button
              onClick={() => handleSend("test")}
              disabled={sending}
              className="btn btn-outline"
              style={{ padding: "10px 16px", fontSize: "0.9rem", cursor: "pointer" }}
            >
              {sending ? "Enviando..." : "Enviarme prueba a mí"}
            </button>
          </div>

          <button
            onClick={() => handleSend("real")}
            disabled={sending || activeAudienceList.length === 0}
            className="btn btn-cyan"
            style={{ padding: "12px 24px", fontSize: "1rem", fontWeight: "800", cursor: "pointer" }}
          >
            {sending
              ? "Enviando correos..."
              : `🚀 Enviar ahora (${activeAudienceList.length} destinatarios)`}
          </button>
        </div>
      </div>

      {/* Sección Dedicada: Registro de Bajas de Boletines (RGPD) */}
      <div style={{
        marginTop: "40px",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        padding: "24px 28px",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>
              🚫 Bajas Voluntarias de Boletines Semanales
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>
              Familias que han solicitado la baja mediante el enlace automático al pie del correo. El sistema las excluye de forma automática y permanente de todos los envíos.
            </p>
          </div>
          <span style={{
            backgroundColor: "#fef2f2",
            color: "#b91c1c",
            border: "1px solid #fecaca",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "800"
          }}>
            {(lists.unsubscribedDetails || []).length} bajas
          </span>
        </div>

        {(lists.unsubscribedDetails || []).length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", fontStyle: "italic", margin: "10px 0 0" }}>
            No hay ninguna baja registrada. Todas las familias están suscritas a los comunicados.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9", textAlign: "left", color: "#475569" }}>
                  <th style={{ padding: "10px 12px" }}>Email</th>
                  <th style={{ padding: "10px 12px" }}>Fecha de Baja</th>
                  <th style={{ padding: "10px 12px" }}>Detalle</th>
                  <th style={{ padding: "10px 12px", textAlign: "right" }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {(lists.unsubscribedDetails || []).map((unsub) => (
                  <tr key={unsub.id || unsub.email} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px", fontWeight: "700", color: "#0f172a" }}>
                      {unsub.email}
                    </td>
                    <td style={{ padding: "12px", color: "#64748b" }}>
                      {new Date(unsub.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td style={{ padding: "12px", color: "#64748b", fontSize: "0.85rem" }}>
                      {unsub.content || "Baja automática solicitada"}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      <span style={{
                        padding: "3px 10px",
                        borderRadius: "12px",
                        backgroundColor: "#fef2f2",
                        color: "#b91c1c",
                        fontSize: "0.78rem",
                        fontWeight: "700"
                      }}>
                        Excluido
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
