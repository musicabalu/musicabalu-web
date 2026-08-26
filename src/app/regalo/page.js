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
      {/* Diseño Anti-Fugas: Sin menú de navegación */}
      <div className={styles.logo}>Musicabalú</div>

      <main className={styles.main}>
        {status === "success" ? (
          <div className={styles.successMessage}>
            <h1>¡Revisa tu correo!</h1>
            <p>Te acabo de enviar el enlace para descargar tu audio gratuito.</p>
            <Link href="/" className={styles.returnBtn}>Volver a la web principal</Link>
          </div>
        ) : (
          <div className={styles.content}>
            <h1 className={styles.title}>Relaja a tu bebé en 5 minutos</h1>
            <p className={styles.subtitle}>
              Descarga gratis nuestro audio de relajación basado en la metodología Gordon. 
              Ideal para crear un vínculo musical seguro con tu bebé de 0 a 3 años.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Tu nombre (o el de tu bebé)</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ej. Ana y Hugo"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Tu mejor email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="hola@ejemplo.com"
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando..." : "¡Quiero el audio gratis!"}
              </button>

              {status === "error" && (
                <p className={styles.errorText}>Hubo un problema. Por favor, inténtalo de nuevo.</p>
              )}
            </form>
            
            <p className={styles.privacyNote}>
              Al hacer clic aceptas nuestra <Link href="/legal/privacidad">Política de Privacidad</Link>. 
              No enviamos spam, solo música de calidad.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
