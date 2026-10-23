"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Regalo() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Musicabalú
        </Link>
      </div>

      <main className={styles.main}>
        {status === "success" ? (
          <div className={styles.successMessage}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "10px" }}>📬</span>
            <h1 style={{ color: "var(--color-dark)", fontSize: "1.8rem", marginBottom: "12px" }}>
              ¡Acceso enviado a tu correo!
            </h1>
            <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: "1.6", maxWidth: "440px", margin: "0 auto 24px auto" }}>
              Te acabo de enviar un correo a <strong>{email}</strong> con el enlace directo para escuchar tus <strong>2 canciones y 2 recitados</strong>.
            </p>
            <p style={{ fontSize: "0.9rem", color: "#718096", backgroundColor: "#f7fafc", padding: "12px", borderRadius: "10px", marginBottom: "24px" }}>
              💡 Si no lo ves en tu bandeja principal en 1-2 minutos, echa un vistazo en la carpeta de <strong>Promociones</strong> o <strong>Spam</strong>.
            </p>
            <Link href="/" className={styles.returnBtn} style={{ textDecoration: "none" }}>
              Volver a la web principal
            </Link>
          </div>
        ) : (
          <div className={styles.content} style={{ maxWidth: "560px" }}>
            <span style={{
              display: "inline-block",
              background: "#E0F6FD",
              color: "#00B2E3",
              fontWeight: "700",
              fontSize: "0.85rem",
              padding: "6px 14px",
              borderRadius: "20px",
              marginBottom: "16px"
            }}>
              🎁 Regalo para tu peque (0 a 3 años)
            </span>

            <h1 className={styles.title} style={{ fontSize: "1.85rem", color: "var(--color-dark)" }}>
              Accede a tus 2 canciones y 2 recitados de regalo
            </h1>
            
            <p className={styles.subtitle} style={{ fontSize: "1rem", marginBottom: "20px" }}>
              Música infantil 100% original, acústica y sin pantallas basada en la Teoría del Aprendizaje Musical de E. Gordon (MLT). Para disfrutar, calmar o jugar juntos en casa.
            </p>

            {/* Qué incluye el regalo */}
            <div style={{
              textAlign: "left",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "16px 20px",
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "0.92rem",
              color: "#334155"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span>🎵</span>
                <div><strong>2 Canciones en contraste:</strong> una de relajación/calma y otra que invita a un movimiento más dinámico.</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span>🥁</span>
                <div><strong>2 Recitados:</strong> en métricas no tan habituales para enriquecer su vocabulario rítmico.</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span>📱</span>
                <div><strong>Acceso directo e inmediato:</strong> en tu móvil, tablet u ordenador (sin necesidad de instalar nada).</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Tu nombre</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ej. Laura"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">¿A qué correo te lo envío?</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={status === "loading"}
                style={{ backgroundColor: "var(--color-pink)", cursor: "pointer" }}
              >
                {status === "loading" ? "Enviando tus accesos..." : "¡Quiero mis canciones y recitados gratis! →"}
              </button>

              {status === "error" && (
                <p className={styles.errorText}>Hubo un problema. Por favor, revisa el correo o inténtalo de nuevo.</p>
              )}
            </form>
            
            <p className={styles.privacyNote}>
              Al hacer clic aceptas nuestra <Link href="/legal/privacidad">Política de Privacidad</Link>. 
              Cero spam: solo contenidos musicales respetuosos para tu peque.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
