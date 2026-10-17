"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleUnsubscribe = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("done");
      } else {
        setErrorMsg(data.error || "No se pudo procesar la solicitud.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg("Error de conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

  useEffect(() => {
    // Si viene con email y token válidos desde el correo, podemos confirmar en 1 clic
  }, []);

  return (
    <div style={{
      maxWidth: "560px",
      margin: "60px auto",
      backgroundColor: "white",
      padding: "40px 32px",
      borderRadius: "24px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      textAlign: "center",
      border: "1px solid #f1f5f9"
    }}>
      {status === "done" ? (
        <>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
          <h1 style={{ fontSize: "1.6rem", color: "var(--color-dark)", marginBottom: "12px", fontWeight: "800" }}>
            Has dejado de recibir los avisos semanales
          </h1>
          <p style={{ color: "#475569", lineHeight: "1.6", marginBottom: "24px" }}>
            Hemos anotado tu preferencia para <strong>{email}</strong>. Ya no recibirás los correos de los viernes ni boletines de novedades de la web.
          </p>
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "14px", borderRadius: "12px", fontSize: "0.9rem", color: "#166534", marginBottom: "24px" }}>
            🎵 <strong>Nota importante:</strong> Tu acceso a la plataforma Comunidad Musicabalú y las comunicaciones importantes sobre tus clases presenciales (si asistes a un grupo semanal) siguen totalmente activos.
          </div>
          <Link href="/" className="btn btn-cyan" style={{ display: "inline-block", textDecoration: "none" }}>
            Volver a Musicabalú
          </Link>
        </>
      ) : (
        <>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>💌</div>
          <h1 style={{ fontSize: "1.6rem", color: "var(--color-dark)", marginBottom: "12px", fontWeight: "800" }}>
            ¿Prefieres no recibir los correos semanales?
          </h1>
          <p style={{ color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
            Vas a darte de baja de los avisos semanales de novedades para el correo:<br />
            <strong style={{ color: "var(--color-dark)" }}>{email || "tu cuenta"}</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: "1.5", marginBottom: "28px" }}>
            Seguirás teniendo acceso normal a tu cuenta de la Comunidad Musicabalú y, si vienes a clases presenciales, seguirás recibiendo los avisos propios de tu grupo.
          </p>

          {status === "error" && (
            <div style={{ backgroundColor: "#fef2f2", color: "#b91c1c", padding: "12px", borderRadius: "10px", marginBottom: "20px", fontSize: "0.9rem" }}>
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleUnsubscribe}
            disabled={status === "loading" || !email}
            className="btn btn-dark"
            style={{ width: "100%", padding: "14px", fontSize: "1rem", fontWeight: "800", cursor: "pointer" }}
          >
            {status === "loading" ? "Procesando..." : "Confirmar baja de los correos semanales"}
          </button>

          <div style={{ marginTop: "18px" }}>
            <Link href="/" style={{ fontSize: "0.9rem", color: "#64748b", textDecoration: "underline" }}>
              Cancelar y volver a la web
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function BajaEmailsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc" }}>
      <Header />
      <main style={{ flex: 1, padding: "20px" }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "60px" }}>Cargando...</div>}>
          <UnsubscribeContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
