import styles from "./page.module.css";
import Link from "next/link";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoogleReviews from "../../components/GoogleReviews";
import { REVIEWS } from "../../data/reviews";

export default function Presencial() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Clases Presenciales en Murcia</h1>
          <p className={styles.subtitle}>
            Desde 2017 llevando música a familias con peques en Murcia aplicando la MLT.
          </p>
        </section>
        
        <section className={styles.content}>
          <div className={styles.textContent}>
            <h2>La Teoría del Aprendizaje Musical</h2>
            <p className={styles.paragraph}>
              En Musicabalú ofrecemos clases de música de 0 a 3 años siguiendo la Teoría del Aprendizaje Musical de E. Gordon (MLT). Una sesión semanal de unos 40-45 minutos donde ofrecemos un gran estímulo musical a los peques a través de juegos, movimiento, danza, etc.
            </p>
            <p className={styles.paragraph}>
              Se trata básicamente de que vivencien el lenguaje de la música de una forma “natural” y “práctica”, como cualquier otro lenguaje, y en familia. Ofrecemos clases hasta los 3 años y los peques entran acompañados de uno de los papás.
            </p>
            
            <div style={{ marginTop: '2rem' }}>
              <Carousel 
                images={[
                  "/imagenes/clases/foto clases 1.jpg",
                  "/imagenes/clases/foto clases 2.jpg",
                  "/imagenes/clases/foto clases 3.jpg",
                  "/imagenes/clases/foto clases 4.jpg"
                ]} 
                altPrefix="Clases presenciales"
              />
            </div>
          </div>

          <div className={styles.videoSection}>
            <div className={styles.videoWrapper}>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/LLZF-6BB14U" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
            <div className={styles.socialLinks}>
              <p>O mira más fragmentos reales de nuestras clases en:</p>
              <div className={styles.socialButtons}>
                <a href="https://www.instagram.com/tv/B5HxPENHIf7/?igsh=bXB6b2hvN3U0eGRi" target="_blank" rel="noopener noreferrer" className={styles.socialBtnInsta}>
                  Ver en Instagram
                </a>
                <a href="https://www.facebook.com/watch/?v=544114412981060&ref=sharing" target="_blank" rel="noopener noreferrer" className={styles.socialBtnFb}>
                  Ver en Facebook
                </a>
              </div>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h2>¿Dónde estamos?</h2>
              <p>Impartimos nuestras clases en las instalaciones de <strong>EMPI</strong> (Escuela Murciana de Primera Infancia).</p>
              <div className={styles.mapWrapper}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.260793455163!2d-1.1305068248636576!3d37.97104270083118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6379058e19716b%3A0x3acb35d1b3cc30c1!2sMusicabal%C3%BA!5e0!3m2!1ses!2suk!4v1787331250308!5m2!1ses!2suk" 
                  width="100%" 
                  height="250" 
                  style={{border:0, borderRadius: "12px", marginTop: "1rem"}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin">
                </iframe>
              </div>
            </div>
            
            <div className={styles.infoCard}>
              <h2>Dinámica y Grupos</h2>
              <ul className={styles.detailsList}>
                <li>Grupos muy reducidos (plazas limitadas).</li>
                <li>Niños de 0 a 3 años.</li>
                <li>Acompañados de un adulto en el aula.</li>
                <li>Una sesión semanal (40-45 min).</li>
              </ul>
              <div className={styles.contactNotice}>
                <p>Escríbenos para consultar horarios, precios y huecos disponibles al 633715302 o a hola@musicabalu.com.</p>
              </div>
            </div>
          </div>

          <GoogleReviews reviews={REVIEWS} variant="slider" />
        </section>

        <section className={styles.actionSection}>
          <div className={styles.ctaGroup}>
            <a href="mailto:hola@musicabalu.com?subject=Información Clases Presenciales EMPI" className={styles.primaryBtn}>
              Consultar disponibilidad
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
