"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TallerReservaClient({ workshops }) {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("taller") || (workshops[0] ? workshops[0].id : "");

  const [workshopId, setWorkshopId] = useState(preselectedId);
  const [adultName, setAdultName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [childBirthDate, setChildBirthDate] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setErrorMessage("Debes aceptar las normas del aula y la política de privacidad");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/talleres/reserva-directa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopId,
          adultName,
          email,
          phone,
          childName,
          childBirthDate,
          acceptedTerms,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Hubo un error al procesar tu inscripción. Inténtalo de nuevo.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Error de conexión. Por favor, comprueba tu conexión e inténtalo de nuevo.");
    }
  };

  const selectedWorkshop = workshops.find((w) => w.id === workshopId);

  if (status === "success") {
    return (
      <div style={{
        maxWidth: "620px",
        margin: "40px auto 80px auto",
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "40px 32px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        textAlign: "center"
      }}>
        <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "16px" }}>🎉</span>
        <h1 style={{ color: "var(--color-dark)", fontSize: "1.9rem", margin: "0 0 12px 0", fontFamily: "var(--font-heading)" }}>
          ¡Plaza confirmada con éxito!
        </h1>
        <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "24px" }}>
          Hemos registrado la inscripción de <strong>{childName}</strong> para el <strong>{selectedWorkshop?.title || "Taller de Música en Familia"}</strong>.
        </p>

        <div style={{
          backgroundColor: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "14px",
          padding: "20px",
          marginBottom: "28px",
          textAlign: "left"
        }}>
          <div style={{ fontWeight: "700", color: "#166534", marginBottom: "6px", fontSize: "1rem" }}>
            📬 Confirmación enviada a {email}
          </div>
          <p style={{ margin: "0 0 10px 0", color: "#374151", fontSize: "0.93rem", lineHeight: "1.5" }}>
            Te hemos enviado un correo con todos los detalles de la sesión y tus claves de acceso gratuitas a la web de Musicabalú.
          </p>
          <p style={{ margin: 0, color: "#15803d", fontSize: "0.88rem", fontWeight: "600" }}>
            💡 Si no lo ves en tu bandeja en 1 minuto, echa un vistazo en la carpeta de Promociones o Spam.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <Link
            href="/login"
            style={{
              display: "inline-block",
              backgroundColor: "var(--color-cyan)",
              color: "white",
              fontWeight: "800",
              padding: "14px 32px",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(0, 178, 227, 0.35)",
              fontSize: "1rem"
            }}
          >
            ▶️ Acceder a la web para escuchar las canciones
          </Link>
          <Link
            href="/"
            style={{ color: "#64748b", textDecoration: "underline", fontSize: "0.9rem", marginTop: "8px" }}
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "660px", margin: "30px auto 80px auto", padding: "0 16px" }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        border: "1px solid #e2e8f0"
      }}>
        {/* Cabecera */}
        <div style={{
          backgroundColor: "var(--color-yellow)",
          padding: "36px 28px 30px",
          textAlign: "center"
        }}>
          <span style={{
            display: "inline-block",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            color: "#92400e",
            fontWeight: "800",
            fontSize: "0.85rem",
            padding: "4px 14px",
            borderRadius: "999px",
            marginBottom: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}>
            🧸 Inscripción Oficial al Taller
          </span>
          <h1 style={{
            color: "var(--color-dark)",
            margin: "0 0 10px 0",
            fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)",
            fontFamily: "var(--font-heading)",
            lineHeight: "1.2",
            fontWeight: "900"
          }}>
            Reserva de Plaza
          </h1>
          <p style={{
            color: "#92400e",
            fontSize: "1rem",
            margin: 0,
            fontWeight: "600",
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.5"
          }}>
            Taller de Música en Familia (0 a 36 meses). Rellena tus datos para formalizar tu plaza y activar tu acceso a los contenidos musicales.
          </p>
        </div>

        {/* Aviso de pago en sede */}
        <div style={{
          backgroundColor: "#eff6ff",
          borderBottom: "1px solid #bfdbfe",
          padding: "16px 24px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          fontSize: "0.92rem",
          color: "#1e40af",
          lineHeight: "1.5"
        }}>
          <span style={{ fontSize: "1.3rem" }}>ℹ️</span>
          <div>
            <strong>Pago gestionado con el centro colaborador:</strong> Esta inscripción es directa y no requiere pago con tarjeta en esta web, ya que el importe se abona a través de la escuela infantil asociada.
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: "32px 28px" }}>
          
          {/* Selector de taller */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontWeight: "700", marginBottom: "8px", color: "#1e293b", fontSize: "0.95rem" }}>
              🗓️ Selecciona la sesión a la que vas a asistir *
            </label>
            <select
              value={workshopId}
              onChange={(e) => setWorkshopId(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1.5px solid #cbd5e1",
                fontSize: "0.95rem",
                color: "#1e293b",
                backgroundColor: "#f8fafc",
                outline: "none"
              }}
            >
              {workshops.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.title} — {w.dateText}
                </option>
              ))}
            </select>
          </div>

          {/* Datos del adulto */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", color: "#1e293b", fontSize: "0.9rem" }}>
                Nombre del adulto acompañante *
              </label>
              <input
                type="text"
                value={adultName}
                onChange={(e) => setAdultName(e.target.value)}
                required
                placeholder="Ej. Carmen López"
                style={{
                  width: "100%",
                  padding: "11px 13px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", color: "#1e293b", fontSize: "0.9rem" }}>
                Teléfono móvil *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Ej. 654 321 987"
                style={{
                  width: "100%",
                  padding: "11px 13px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", color: "#1e293b", fontSize: "0.9rem" }}>
              Correo electrónico (para enviarte la confirmación y acceso web) *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tucorreo@ejemplo.com"
              style={{
                width: "100%",
                padding: "11px 13px",
                borderRadius: "10px",
                border: "1.5px solid #cbd5e1",
                fontSize: "0.95rem",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Datos del peque */}
          <div style={{
            backgroundColor: "#f8fafc",
            padding: "18px 20px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            marginBottom: "24px"
          }}>
            <h3 style={{ margin: "0 0 14px 0", fontSize: "0.98rem", color: "#0f172a", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>👶</span> Datos del peque (0 a 36 meses)
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", color: "#334155", fontSize: "0.88rem" }}>
                  Nombre del peque *
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  required
                  placeholder="Ej. Mateo"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "0.92rem",
                    backgroundColor: "white",
                    boxSizing: "border-box"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", color: "#334155", fontSize: "0.88rem" }}>
                  Fecha de nacimiento *
                </label>
                <input
                  type="text"
                  value={childBirthDate}
                  onChange={(e) => setChildBirthDate(e.target.value)}
                  required
                  placeholder="DD/MM/AAAA"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "0.92rem",
                    backgroundColor: "white",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Normas y Condiciones resumidas */}
          <div style={{
            backgroundColor: "#fefce8",
            border: "1px solid #fef08a",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "0.86rem",
            color: "#854d0e",
            lineHeight: "1.5",
            marginBottom: "20px"
          }}>
            <strong>Recordatorio de normas básicas:</strong> Las sesiones se realizan sin calzado (en calcetines), con un único adulto acompañante por peque y cuidando un espacio tranquilo de escucha activa.
          </div>

          {/* Checkbox de aceptación */}
          <div style={{ marginBottom: "26px" }}>
            <label style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              cursor: "pointer",
              fontSize: "0.88rem",
              color: "#334155",
              lineHeight: "1.5"
            }}>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
                style={{ marginTop: "3px", width: "17px", height: "17px", flexShrink: 0, cursor: "pointer" }}
              />
              <span>
                He leído y acepto el funcionamiento de la sesión, las normas de aula y la{" "}
                <Link href="/legal/privacidad" target="_blank" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>
                  Política de Privacidad
                </Link>{" "}
                de Musicabalú.
              </span>
            </label>
          </div>

          {/* Mensaje de error */}
          {errorMessage && (
            <div style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "0.9rem",
              marginBottom: "20px"
            }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              width: "100%",
              backgroundColor: "var(--color-pink)",
              color: "white",
              border: "none",
              padding: "15px 24px",
              borderRadius: "999px",
              fontSize: "1.08rem",
              fontWeight: "800",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              boxShadow: "0 6px 18px rgba(244, 67, 108, 0.35)",
              transition: "transform 0.15s, opacity 0.15s",
              opacity: status === "loading" ? 0.75 : 1
            }}
          >
            {status === "loading" ? "Confirmando tu plaza..." : "Confirmar mi plaza en el taller →"}
          </button>
        </form>
      </div>
    </div>
  );
}
