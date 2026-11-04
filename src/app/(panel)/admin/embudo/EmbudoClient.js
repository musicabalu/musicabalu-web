"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../grupos/[id]/grupo.module.css";

export default function EmbudoClient() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  const loadData = async () => {
    try {
      const res = await fetch("/api/admin/funnel");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Error cargando embudo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/funnel")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!ignore && json) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error cargando embudo:", err);
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleSendNow = async () => {
    if (!confirm(`¿Estás seguro de que quieres enviar los correos pendientes a las ${data?.eligibleToSend?.length || 0} familias ahora mismo?`)) {
      return;
    }

    try {
      setSending(true);
      setResultMsg("");
      const res = await fetch("/api/admin/funnel", { method: "POST" });
      const json = await res.json();

      if (res.ok) {
        const sentCount = json.sentResults?.filter((r) => r.status === "sent").length || 0;
        setResultMsg(`🎉 ¡Listo! Se han enviado ${sentCount} correos correctamente.`);
        loadData();
      } else {
        setResultMsg(`❌ Error: ${json.error || "No se pudo procesar"}`);
      }
    } catch (err) {
      console.error("Error enviando embudo:", err);
      setResultMsg("❌ Error de conexión al enviar correos");
    } finally {
      setSending(false);
    }
  };

  const emailPreviews = [
    {
      num: 1,
      name: "Email 1: Entrega del Regalo",
      timing: "Inmediato (0h)",
      subject: "🎵 Tu acceso a las canciones y recitados de Musicabalú está listo",
      desc: "Se entrega el botón de 1 clic al reproductor web con las 2 canciones y 2 recitados. Se explica la base de la MLT de Gordon (por qué no tienen letra ni sobrecarga digital) y se les invita a probarlas hoy.",
    },
    {
      num: 2,
      name: "Email 2: El mito de Mozart",
      timing: "A las 24 horas",
      subject: "Ponerle Mozart de fondo a tu bebé no sirve de mucho 🎧",
      desc: "Se desmitifica el Efecto Mozart pasivo y se explica la importancia de la Escucha Activa, el silencio y la interacción humana con el padre/madre. Recuerda el enlace a los 4 audios de regalo.",
    },
    {
      num: 3,
      name: "Email 3: El Vínculo",
      timing: "A las 48h del Email 2",
      subject: "«Pero Javi... es que yo canto fatal» 🙈",
      desc: "Derriba el miedo a no afinar o no tener ritmo: tu bebé no busca un jurado, busca tu voz y tu mirada. La presencia vence a la perfección.",
    },
    {
      num: 4,
      name: "Email 4: Lenguaje Natural",
      timing: "A las 48h del Email 3",
      subject: "El lenguaje secreto que tú y tu bebé podéis compartir 🤫",
      desc: "La música se aprende como la lengua materna (primero absorción e inmersión, no partituras ni teoría rígida). Anticipa la biblioteca completa de Musicabalú.",
    },
    {
      num: 5,
      name: "Email 5: La Comunidad",
      timing: "A las 24h del Email 4",
      subject: "Las puertas de la Comunidad Musicabalú están abiertas 🚪✨",
      desc: "Propuesta de valor: repertorio completo, vídeos guía, 3,90 €/mes o 39 €/año. Posdata especial invitando a los Talleres de Música en Familia presenciales en Murcia.",
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 16px 80px 16px", fontFamily: "var(--font-body)" }}>
      {/* Cabecera y botón volver */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <Link href="/admin" style={{ color: "var(--color-cyan)", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600" }}>
            ← Volver al Panel de Control
          </Link>
          <h1 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#0f172a", margin: "6px 0 2px 0", fontFamily: "var(--font-heading)" }}>
            ⚡ Automatización del Embudo (Lead Magnet)
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.95rem" }}>
            Secuencia de 5 emails para educar, generar confianza y convertir leads de redes en suscriptores y alumnos de talleres.
          </p>
        </div>
      </div>

      {resultMsg && (
        <div style={{
          padding: "16px 20px",
          borderRadius: "12px",
          backgroundColor: resultMsg.includes("🎉") ? "#ecfdf5" : "#fef2f2",
          border: `1.5px solid ${resultMsg.includes("🎉") ? "#10b981" : "#f87171"}`,
          color: resultMsg.includes("🎉") ? "#065f46" : "#991b1b",
          fontWeight: "700",
          marginBottom: "24px",
        }}>
          {resultMsg}
        </div>
      )}

      {/* Tarjetas de Estadísticas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Total Leads (Regalo)</span>
          <div style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a", marginTop: "4px" }}>
            {loading ? "..." : data?.totalLeads || 0}
          </div>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Familias captadas</span>
        </div>

        <div style={{ backgroundColor: "#eff6ff", padding: "20px", borderRadius: "14px", border: "1.5px solid #bfdbfe", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: "0.85rem", color: "#1d4ed8", fontWeight: "700", textTransform: "uppercase" }}>Listos para enviar hoy</span>
          <div style={{ fontSize: "2rem", fontWeight: "900", color: "#1e40af", marginTop: "4px" }}>
            {loading ? "..." : data?.eligibleToSend?.length || 0}
          </div>
          <span style={{ fontSize: "0.8rem", color: "#3b82f6" }}>Cumplen tiempo de cadencia</span>
        </div>

        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>En pausa de cadencia</span>
          <div style={{ fontSize: "2rem", fontWeight: "900", color: "#475569", marginTop: "4px" }}>
            {loading ? "..." : data?.waitingNextStep || 0}
          </div>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Esperando 24h / 48h</span>
        </div>

        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Embudo Completado</span>
          <div style={{ fontSize: "2rem", fontWeight: "900", color: "#059669", marginTop: "4px" }}>
            {loading ? "..." : data?.completedFunnel || 0}
          </div>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Recibieron los 5 correos</span>
        </div>
      </div>

      {/* Cola de envíos pendientes */}
      <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              📨 Envíos programados para hoy ({data?.eligibleToSend?.length || 0})
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "4px 0 0 0" }}>
              Se envían automáticamente a diario mediante el cron de Vercel (10:00 h). También puedes ejecutarlos manualmente con este botón:
            </p>
          </div>

          <button
            onClick={handleSendNow}
            disabled={sending || loading || (data?.eligibleToSend?.length || 0) === 0}
            style={{
              backgroundColor: (data?.eligibleToSend?.length || 0) > 0 ? "var(--color-cyan)" : "#cbd5e1",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "999px",
              fontWeight: "800",
              fontSize: "0.95rem",
              cursor: (data?.eligibleToSend?.length || 0) > 0 && !sending ? "pointer" : "not-allowed",
              boxShadow: (data?.eligibleToSend?.length || 0) > 0 ? "0 4px 14px rgba(0, 178, 227, 0.35)" : "none",
            }}
          >
            {sending ? "⏳ Enviando correos..." : `▶️ Enviar ${data?.eligibleToSend?.length || 0} correos ahora`}
          </button>
        </div>

        {loading ? (
          <p style={{ color: "#64748b", fontStyle: "italic" }}>Cargando estado del embudo...</p>
        ) : (data?.eligibleToSend?.length || 0) === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "10px", color: "#64748b" }}>
            ✨ No hay correos pendientes de enviar en este momento. Las familias están dentro de su periodo de espera entre emails o ya han completado la secuencia.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "10px 12px" }}>Familia</th>
                  <th style={{ padding: "10px 12px" }}>Email</th>
                  <th style={{ padding: "10px 12px" }}>Próximo Correo</th>
                  <th style={{ padding: "10px 12px" }}>Condición Cumplida</th>
                </tr>
              </thead>
              <tbody>
                {data.eligibleToSend.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px", fontWeight: "700", color: "#1e293b" }}>{item.name}</td>
                    <td style={{ padding: "12px", color: "#475569" }}>{item.email}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        backgroundColor: item.step === 2 ? "#e0f2fe" : item.step === 3 ? "#fef3c7" : item.step === 4 ? "#ede9fe" : "#fce7f3",
                        color: item.step === 2 ? "#0369a1" : item.step === 3 ? "#92400e" : item.step === 4 ? "#6d28d9" : "#be185d",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "0.8rem",
                        fontWeight: "800",
                      }}>
                        Email {item.step}
                      </span>
                    </td>
                    <td style={{ padding: "12px", color: "#64748b", fontSize: "0.85rem" }}>{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Los 5 Emails del Embudo (Guía pedagógica y contenido) */}
      <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
          📖 Los 5 correos de la secuencia (Estrategia)
        </h2>

        {/* Pestañas de emails */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "16px", borderBottom: "1px solid #e2e8f0" }}>
          {emailPreviews.map((ep) => (
            <button
              key={ep.num}
              onClick={() => setActiveTab(ep.num)}
              style={{
                backgroundColor: activeTab === ep.num ? "var(--color-dark)" : "#f1f5f9",
                color: activeTab === ep.num ? "white" : "#475569",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "0.88rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Email {ep.num} ({ep.timing})
            </button>
          ))}
        </div>

        {/* Contenido del email activo */}
        {(() => {
          const current = emailPreviews.find((ep) => ep.num === activeTab);
          return (
            <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <span style={{ fontWeight: "800", color: "#0f172a", fontSize: "1.05rem" }}>{current.name}</span>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "600" }}>Cadencia: {current.timing}</span>
              </div>
              <p style={{ margin: "4px 0 12px 0", color: "var(--color-cyan)", fontWeight: "700", fontSize: "0.95rem" }}>
                Asunto: {current.subject}
              </p>
              <p style={{ margin: 0, color: "#475569", fontSize: "0.9rem", lineHeight: "1.5" }}>
                <strong>Objetivo:</strong> {current.desc}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
