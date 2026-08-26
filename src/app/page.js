import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoogleReviews from "../components/GoogleReviews";
import { REVIEWS } from "../data/reviews";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* HEADER NAVEGACIÓN */}
      <Header />

      <main className={styles.main}>
        {/* SECCIÓN AUTORIDAD Y MÉTODO */}
        <section className={styles.methodSection} style={{ paddingTop: '6rem' }}>
          <div className={styles.methodGrid}>
            <div className={styles.methodText}>
              <h2 className={styles.sectionTitle}>No sólo son canciones. <br/>Es conexión.</h2>
              <p>
                <strong>Desde 2017 llevamos música a familias con peques en Murcia aplicando la MLT.</strong><br/><br/>
                Durante los primeros 3 años de vida, el cerebro de tu bebé absorbe la música igual que el lenguaje materno. En Musicabalú no usamos "música para entretener" (aunque nuestras sesiones sean tan divertidas)
              </p>
              <ul className={styles.methodList}>
                <li>
                  <span className={styles.checkIcon}>✨</span>
                  <div className={styles.methodListText}>
                    <strong>Patrones tonales y rítmicos:</strong> Nos ayudan a decir nuestras primeras "palabras musicales".
                  </div>
                </li>
                <li>
                  <span className={styles.checkIcon}>🧠</span>
                  <div className={styles.methodListText}>
                    <strong>Repertorio variado en modos y métricas:</strong> Que enriquece al máximo su escucha y amplía su vocabulario musical.
                  </div>
                </li>
                <li>
                  <span className={styles.checkIcon}>💞</span>
                  <div className={styles.methodListText}>
                    <strong>Vínculo seguro:</strong> Un espacio con cero exigencias para mirarnos a los ojos y jugar juntos.
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.methodImageWrapper}>
              <div className={styles.decorativeCircle}></div>
              <Image 
                src="/imagenes/clases/foto clases 17.jpg" 
                alt="Clase presencial de Musicabalú" 
                width={500} 
                height={500} 
                className={styles.homePhoto} 
                priority
              />
            </div>
          </div>
        </section>

        {/* HERO SECTION - GANCHO EMOCIONAL */}
        <section className={styles.hero} style={{ minHeight: 'auto', padding: '4rem 2rem' }}>
          <div className={styles.heroBg}></div>
          <div className={styles.heroContent}>
            <h1 className={`${styles.heroTitle} ${styles.heroTitlePink}`}>
              Conecta con tu bebé a través de <span className={styles.highlight}>la música</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Descubre la Educación Musical Temprana basada en neurociencia para potenciar su desarrollo cerebral, motriz y emocional mientras jugáis.
            </p>
            <div className={styles.heroActions}>
              <Link href="/presencial" className={styles.primaryCta}>
                Ven a clase en Murcia
              </Link>
              <Link href="/regalo" className={styles.secondaryCta}>
                Audio de relajación GRATIS
              </Link>
            </div>
            <div className={styles.heroMetrics}>
              <span>+80 familias activas</span>
              <span className={styles.dotSeparator}>•</span>
              <span>Teoría del Aprendizaje Musical (MLT)</span>
            </div>
          </div>
        </section>

        {/* SECCIÓN RESEÑAS */}
        <section className={styles.reviewsSection} style={{ padding: "0 2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <GoogleReviews reviews={REVIEWS} variant="slider" />
        </section>

        {/* SECCIÓN EL CLUB MUSICABALÚ: SUSCRIPCIÓN DIGITAL */}
        <section className={styles.digitalSection}>
          <div className={styles.digitalContent}>
            <h2 className={styles.sectionTitleYellow}>Comunidad Musicabalú</h2>
            <p className={styles.digitalSubtitle}>
              Únete a nuestra comunidad. Una biblioteca digital viva con canciones y recitados basados en la MLT de Gordon y consejos para aplicar la música en las rutinas diarias (baño, sueño, rabietas).
            </p>
            <div className={styles.pricingCard}>
              <div className={styles.authorshipBadge}>
                <span className={styles.badgeIcon}>✍️</span>
                <span>Canciones y recitados 100% originales compuestos con propósitos pedagógicos.</span>
              </div>
              <div className={styles.pricingHeader}>
                <h3>Suscripción Familiar</h3>
                <div className={styles.price}>
                  <span className={styles.amount}>5,90€</span>
                  <span className={styles.period}>/mes</span>
                </div>
              </div>
              <h3>La Comunidad</h3>
              <p style={{ marginBottom: "1.5rem" }}>
                Un ecosistema para familias que quieren integrar la música en casa con sentido.
              </p>
              <ul className={styles.centeredList}>
                <li>Recursos para el día a día.</li>
                <li>Canciones para potenciar su parte tonal.</li>
                <li>Recitados exclusivos para jugar con ritmo.</li>
              </ul>
              <Link href="/login" className={styles.pricingCta}>Empezar ahora</Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
