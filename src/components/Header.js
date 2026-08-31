"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { data: session } = useSession();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo_texto_corazon.png" alt="Logo Musicabalú" width={180} height={45} style={{ objectFit: "contain" }} priority />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/conocenos" className={styles.navLink}>Conócenos</Link>
        <Link href="/presencial" className={styles.navLink}>Clases</Link>
        <Link href="/formaciones" className={styles.navLink}>Formaciones</Link>
        {/* Oculto hasta 1 oct 
        <Link href="/tienda" className={styles.navLink}>Tienda</Link>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          style={{ 
            background: "none", border: "none", cursor: "pointer", 
            position: "relative", fontSize: "1.5rem", marginLeft: "10px", marginRight: "10px"
          }}
          aria-label="Abrir carrito"
        >
          🛒
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: "-5px", right: "-10px",
              backgroundColor: "var(--color-pink)", color: "white",
              borderRadius: "50%", padding: "2px 6px", fontSize: "0.75rem", fontWeight: "bold"
            }}>
              {cartCount}
            </span>
          )}
        </button>
        */}

        {session ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link href="/dashboard" className="btn btn-cyan" suppressHydrationWarning>Mi Panel</Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="btn btn-ghost" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }} suppressHydrationWarning>
              Salir
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-outline" suppressHydrationWarning>Entrar</Link>
        )}
      </nav>
    </header>
  );
}
