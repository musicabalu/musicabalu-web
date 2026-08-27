"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import styles from "./page.module.css";
import { useSearchParams, useRouter } from "next/navigation";

function LoginForm() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [mode, setMode] = useState("login");

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      const callback = searchParams.get("callbackUrl") || "/dashboard";
      router.push(callback);
    }
  }, [sessionStatus, router, searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (sessionStatus === "authenticated") {
      const callback = searchParams.get("callbackUrl") || "/dashboard";
      router.push(callback);
      return;
    }
    
    setStatus("loading");
    
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const res = await signIn("email", { 
      email, 
      redirect: false,
      callbackUrl
    });
    
    if (res?.error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  if (sessionStatus === "loading" || sessionStatus === "authenticated") {
    return (
      <div className={styles.loginCard} style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <p style={{ color: 'var(--color-dark)' }}>Cargando tu panel...</p>
      </div>
    );
  }

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.title}>
        {mode === 'login' ? 'Acceso a tu cuenta' : 'Crea tu cuenta gratis'}
      </h1>
      
      {status === "success" ? (
        <div className={styles.successBox}>
          <h3>¡Enlace enviado!</h3>
          <p>Revisa la bandeja de entrada de <strong>{email}</strong> y haz clic en el enlace mágico para entrar.</p>
          <div className={styles.note} style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-light)', background: 'rgba(255,255,255,0.6)', padding: '1rem', borderRadius: '8px', textAlign: 'left' }}>
            💡 <strong>Pequeño consejo:</strong> El inicio de sesión ocurrirá en el navegador donde se abra el enlace. Si tu correo abre los enlaces en un navegador distinto al que quieres usar (ej. estabas en Safari y te lo abre en Chrome), puedes darle a "Copiar enlace" en tu correo y pegarlo directamente en la barra de direcciones de este navegador.
          </div>
        </div>
      ) : (
        <>
          <p className={styles.subtitle}>
            {mode === 'login' 
              ? 'Si ya estás registrado, introduce tu email. Si llevas días inactivo te volverá a llegar a tu correo un enlace seguro para entrar, sin necesidad de contraseñas.'
              : 'Introduce tu email y te enviaremos un enlace mágico para crear tu cuenta al instante. ¡Sin contraseñas!'}
          </p>
          
          <div className={styles.tabs}>
            <button 
              type="button"
              className={mode === 'login' ? styles.tabActive : styles.tab}
              onClick={() => setMode('login')}
            >
              Iniciar sesión
            </button>
            <button 
              type="button"
              className={mode === 'register' ? styles.tabActive : styles.tab}
              onClick={() => setMode('register')}
            >
              Registrarse
            </button>
          </div>
          
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Tu Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@correo.com"
                autoComplete="email"
                suppressHydrationWarning
              />
            </div>
            
            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando..." : (mode === 'login' ? "Entrar" : "Crear cuenta")}
            </button>

            {status === "error" && (
              <p className={styles.errorText}>Ha ocurrido un error. Inténtalo de nuevo.</p>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default function Login() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Musicabalú</Link>
        </div>
        <BackButton label="← Inicio" />
      </header>

      <main className={styles.main}>
        <Suspense fallback={<div className={styles.loginCard}>Cargando...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
