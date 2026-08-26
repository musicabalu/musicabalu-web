import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <h2>Musicabalú.</h2>
          <p>Educación Musical Temprana</p>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/legal/privacidad">Privacidad</Link>
          <Link href="/legal/aviso-legal">Aviso Legal</Link>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "0.85rem", color: "var(--color-text-light)", opacity: 0.7 }}>
        Contacto: 633715302 | musicabalu@gmail.com
      </div>
    </footer>
  );
}
