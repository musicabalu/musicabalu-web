"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DEFAULT_FRIDAY_TEMPLATE = `¡Hola!

Ya tenéis disponible en la Comunidad Musicabalú el nuevo contenido de esta semana para disfrutar en casa:

🎵 Nueva canción: [Título de la canción]
🎬 Nueva píldora: [Título de la píldora]

Podéis escucharlos directamente desde aquí:
https://musicabalu.com/comunidad

¡Que paséis un feliz fin de semana lleno de música! 🤗❤️

Un abrazo,

Javi.`;

export default function AdminComunicacionesPage() {
  const [lists, setLists] = useState({ comunidad: [], presencial: [], unsubscribed: [] });
  const [loadingLists, setLoadingLists] = useState(true);

  const [audience, setAudience] = useState("comunidad"); // comunidad | presencial
  const [subject, setSubject] = useState("🎵 Novedades de este viernes en Musicabalú 💛");
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

  const activeAudienceList = audience === "presencial" ? lists.presencial : lists.comunidad;

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
        Envía las novedades semanales de los viernes a toda la Comunidad (familias presenciales + suscriptores de 3,90 €/39 €). El sistema añade automáticamente al pie el texto de Protección de Datos y el enlace para darse de baja de los boletines en 1 clic.
      </p>

      {/* Selector de Destinatarios */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "16px",
        marginBottom: "28px"
      }}>
        <div
          onClick={() => setAudience("comunidad")}
          style={{
            padding: "20px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: audience === "comunidad" ? "#f0f9ff" : "white",
            border: audience === "comunidad" ? "2px solid var(--color-cyan)" : "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "var(--color-dark)", marginBottom: "6px" }}>
            🌍 Toda la Comunidad ({loadingLists ? "..." : lists.comunidad.length} emails)
          </div>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569", lineHeight: "1.5" }}>
            Familias de clases semanales + Suscriptores online (3,90 €/39 €). Excluye automáticamente a quienes se hayan dado de baja de los boletines ({lists.unsubscribed.length} bajas).
          </p>
        </div>

        <div
          onClick={() => setAudience("presencial")}
          style={{
            padding: "20px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: audience === "presencial" ? "#fffbeb" : "white",
            border: audience === "presencial" ? "2px solid #f59e0b" : "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "var(--color-dark)", marginBottom: "6px" }}>
            🏫 Aviso Operativo Clases Presenciales ({loadingLists ? "..." : lists.presencial.length} emails)
          </div>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569", lineHeight: "1.5" }}>
            Solo para avisos importantes de las clases en Murcia (festivos, recuperaciones, normas). Llega a todas las familias matriculadas.
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
          <label style={{ display: "block", fontWeight: "800", marginBottom: "8px", color: "var(--color-dark)" }}>
            Mensaje (los enlaces https://... se vuelven clicables automáticamente):
          </label>
          <textarea
            rows={13}
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
    </div>
  );
}
