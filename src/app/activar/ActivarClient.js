"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ActivarClient() {
  const searchParams = useSearchParams();
  const initialCode = (searchParams.get("code") || "").trim().toUpperCase();

  const [code, setCode] = useState(initialCode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/gift/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "No se ha podido activar el código. Por favor, revisa los datos.");
        return;
      }

      setSuccessData(data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Ha ocurrido un error de conexión. Por favor, inténtalo de nuevo.");
    }
  };

  if (status === "success" && successData) {
    const formattedExpiry = new Date(successData.expiresAt).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "28px",
        padding: "40px 32px",
        boxShadow: "0 20px 45px rgba(219, 39, 119, 0.08), 0 4px 12px rgba(0,0,0,0.03)",
        border: "2px solid #86efac",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "12px" }}>🎉</div>
        <span style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: "20px",
          backgroundColor: "#dcfce7",
          color: "#15803d",
          fontSize: "0.85rem",
          fontWeight: "800",
          marginBottom: "16px",
        }}>
          ✅ ¡Regalo Activado con Éxito!
        </span>

        <h1 style={{
          fontSize: "2.1rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "12px",
          fontFamily: "var(--font-heading)",
          lineHeight: "1.2"
        }}>
          ¡Bienvenida a la Comunidad Musicabalú!
        </h1>

        <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: "1.6", maxWidth: "520px", margin: "0 auto 24px" }}>
          Ya tienes acceso ilimitado a todo el repertorio de canciones, recitados y píldoras pedagógicas en vídeo para cantar y disfrutar en casa.
        </p>

        <div style={{
          backgroundColor: "#f8fafc",
          border: "1.5px solid #e2e8f0",
          borderRadius: "16px",
          padding: "20px",
          maxWidth: "460px",
          margin: "0 auto 30px",
          textAlign: "left"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.92rem" }}>
            <span style={{ color: "#64748b" }}>Cuenta activada:</span>
            <strong style={{ color: "#0f172a" }}>{successData.email}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.92rem" }}>
            <span style={{ color: "#64748b" }}>Duración:</span>
            <strong style={{ color: "#16a34a" }}>1 Año Completo</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem" }}>
            <span style={{ color: "#64748b" }}>Válido hasta:</span>
            <strong style={{ color: "#0f172a" }}>{formattedExpiry}</strong>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Link
            href={`/login?email=${encodeURIComponent(successData.email)}&callbackUrl=/comunidad/canciones`}
            className="btn btn-primary"
            style={{
              padding: "16px 36px",
              fontSize: "1.15rem",
              fontWeight: "800",
              borderRadius: "30px",
              background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
              color: "#ffffff",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 6px 20px rgba(219, 39, 119, 0.35)"
            }}
          >
            Entrar a la Biblioteca de Canciones 🎶 →
          </Link>
        </div>

        <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: "1.5", margin: 0 }}>
          Te hemos enviado también un correo con la confirmación.<br />
          Para entrar en cualquier momento, basta con introducir tu email: te enviaremos un enlace mágico seguro sin contraseñas.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "28px",
      padding: "40px 32px",
      boxShadow: "0 20px 45px rgba(219, 39, 119, 0.08), 0 4px 12px rgba(0,0,0,0.03)",
      border: "2px solid #fbcfe8",
    }}>
      {/* Cabecera de la tarjeta */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#fdf2f8",
          color: "#be185d",
          padding: "6px 16px",
          borderRadius: "20px",
          fontSize: "0.85rem",
          fontWeight: "800",
          marginBottom: "14px",
          border: "1px solid #fbcfe8"
        }}>
          <span>🎁</span>
          <span>Tarjeta Regalo · Suscripción Anual</span>
        </div>

        <h1 style={{
          fontSize: "2.1rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "10px",
          fontFamily: "var(--font-heading)",
          lineHeight: "1.2"
        }}>
          Activa tu <span style={{ color: "#db2777" }}>Regalo Musicabalú</span>
        </h1>

        <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: "1.5", maxWidth: "480px", margin: "0 auto" }}>
          Introduce el código de activación que aparece en tu vale y el email donde quieres disfrutar de tu año de música en familia.
        </p>

        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "#f8fafc",
          border: "1.5px solid #cbd5e1",
          padding: "5px 14px",
          borderRadius: "12px",
          fontSize: "0.82rem",
          color: "#334155",
          fontWeight: "700",
          marginTop: "16px"
        }}>
          <span>🏡</span>
          <span>Licencia individual para uso familiar</span>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Código de activación */}
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "800", color: "#1e293b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Código de Activación *
          </label>
          <input
            type="text"
            required
            placeholder="Ej. BALU-XXXX-XXXX"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "14px",
              border: "2px solid #cbd5e1",
              fontSize: "1.15rem",
              fontFamily: "monospace",
              letterSpacing: "1.5px",
              fontWeight: "700",
              color: "#db2777",
              backgroundColor: "#fffdf9",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          <span style={{ fontSize: "0.8rem", color: "#94a3b8", display: "block", marginTop: "4px" }}>
            Encontrarás este código en el recuadro dorado de tu tarjeta o vale regalo.
          </span>
        </div>

        {/* Correo electrónico */}
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "800", color: "#1e293b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Tu Correo Electrónico *
          </label>
          <input
            type="email"
            required
            placeholder="tu-email@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "14px",
              border: "2px solid #cbd5e1",
              fontSize: "1rem",
              color: "#0f172a",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          <span style={{ fontSize: "0.8rem", color: "#94a3b8", display: "block", marginTop: "4px" }}>
            Aquí se activará el acceso y recibirás el enlace mágico para entrar cuando quieras.
          </span>
        </div>

        {/* Nombre */}
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "800", color: "#1e293b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Nombre *
          </label>
          <input
            type="text"
            required
            placeholder="Tu nombre y apellidos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "14px",
              border: "2px solid #cbd5e1",
              fontSize: "1rem",
              color: "#0f172a",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Mensaje de error si falla */}
        {status === "error" && (
          <div style={{
            backgroundColor: "#fef2f2",
            border: "1.5px solid #fca5a5",
            borderRadius: "12px",
            padding: "12px 16px",
            color: "#b91c1c",
            fontSize: "0.92rem",
            lineHeight: "1.5"
          }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Botón de envío */}
        <div style={{ marginTop: "10px" }}>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "1.15rem",
              fontWeight: "800",
              borderRadius: "30px",
              background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
              color: "#ffffff",
              border: "none",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              boxShadow: "0 6px 20px rgba(219, 39, 119, 0.35)",
              opacity: status === "loading" ? 0.7 : 1,
            }}
          >
            {status === "loading" ? "Activando tu suscripción..." : "Activar mi Año de Música ✨"}
          </button>
        </div>

        {/* Garantías y notas */}
        <div style={{
          marginTop: "10px",
          borderTop: "1.5px dashed #f1f5f9",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "0.85rem",
          color: "#64748b"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🔒</span>
            <span><strong>Sin pagos ni renovaciones automáticas:</strong> Es un regalo 100% libre de cobros sorpresa.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🕒</span>
            <span>Tu año (365 días) comienza a contar en el momento exacto en que pulses Activar.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>✉️</span>
            <span>¿Tienes problemas con tu código? Escríbenos a <a href="mailto:hola@musicabalu.com" style={{ color: "#00B2E3", fontWeight: "bold" }}>hola@musicabalu.com</a> y te atendemos encantados.</span>
          </div>
        </div>
      </form>
    </div>
  );
}
