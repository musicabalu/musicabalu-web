import styles from "./page.module.css";
import Link from "next/link";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Formaciones() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* HERO */}
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Recursos Musicales para Educadores y Familias <br/>
            <span className={styles.highlight}>(0 a 6 años)</span>
          </h1>
          <p className={styles.subtitle}>
            Una formación diseñada para personas <strong>sin conocimientos musicales</strong> que quieren usar la música de verdad en el día a día del aula o de casa.
          </p>
          <div className={styles.heroActions}>
            <a href="mailto:hola@musicabalu.com?subject=Información Formación Recursos Musicales" className={styles.primaryBtn}>
              Solicitar Información
            </a>
          </div>
        </section>

        {/* DOLOR Y EMPATÍA */}
        <section className={styles.empathySection}>
          <div className={styles.empathyGrid}>
            <div className={styles.empathyCarousel}>
              <Carousel 
                images={[
                  "/imagenes/formaciones/formaciones 5.JPG",
                  "/imagenes/formaciones/formaciones 6.JPG",
                  "/imagenes/formaciones/formaciones 8.JPG",
                  "/imagenes/formaciones/formaciones 2.JPG",
                  "/imagenes/formaciones/formaciones 1.jpg"
                ]} 
                altPrefix="Formación MLT"
              />
            </div>
            <div className={styles.empathyText}>
              <p>
                A menudo, educadores y padres usan la música porque les gusta cantar a sus peques, pero nadie les ha enseñado a hacerlo ni cómo pueden aportarles más.
              </p>
              <p>
                Esta formación extrae lo principal de la Teoría del Aprendizaje Musical (MLT) y crea una guía práctica para que te lleves recursos potentes que funcionan y que sí podrás aplicar mañana mismo.
              </p>
            </div>
          </div>
        </section>

        {/* QUÉ SÍ Y QUÉ NO */}
        <section className={styles.claritySection}>
          <div className={styles.clarityContainer}>
            <div className={styles.clarityCard_Yes} style={{ textAlign: 'center' }}>
              <h3>✅ Qué es esta formación</h3>
              <ul style={{ display: 'inline-block', textAlign: 'left' }}>
                <li>Una guía práctica para usar la música como verdadera vía de comunicación.</li>
                <li>Una reflexión profunda sobre cómo compartir música con los niños.</li>
                <li>Un espacio para perder el miedo a tu propia voz (exploración vocal).</li>
                <li>Un manual para usar el movimiento real (fluidez, peso, espacio).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONTENIDO DEL CURSO */}
        <section className={styles.contentSection}>
          <h2>¿Qué te llevas exactamente?</h2>
          <div className={styles.contentGrid}>
            <div className={styles.contentCard}>
              <div className={styles.cardIcon}>🎵</div>
              <h4>El Paso a Paso</h4>
              <ul className={styles.checkList}>
                <li><span className={styles.checkIcon}>✅</span> Análisis de materiales que funcionan</li>
                <li><span className={styles.checkIcon}>✅</span> Repertorio modal y rítmico (No solo en Do Mayor)</li>
                <li><span className={styles.checkIcon}>✅</span> Gestión del espacio y la atención de los niños</li>
              </ul>
            </div>
            <div className={styles.contentCard}>
              <div className={styles.cardIcon}>💃</div>
              <h4>El Movimiento</h4>
              <p>Aprenderás a usar el cuerpo sin coreografías cerradas. Fomentaremos un movimiento fluido que activa el cerebro.</p>
            </div>
            <div className={styles.contentCard}>
              <div className={styles.cardIcon}>📚</div>
              <h4>Material Incluido</h4>
              <p>Tras la formación, te llevarás los apuntes completos y los audios para aprender las canciones tranquilamente.</p>
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section style={{ padding: '5rem 2rem', backgroundColor: '#f9fafb' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', color: 'var(--color-dark)' }}>Lo que opinan quienes ya lo han vivido</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Testimonio 1 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'var(--color-cyan)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', marginRight: '15px' }}>
                  M
                </div>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--color-dark)', fontSize: '1.1rem' }}>Merche Martínez</h4>
                  <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Educadora de Infantil</p>
                </div>
              </div>
              <div style={{ color: '#FBBF24', letterSpacing: '2px', marginBottom: '1rem', fontSize: '1.2rem' }}>
                ★★★★★
              </div>
              <p style={{ color: '#4a5568', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                "Esta formación me ha resultado muy práctica, nos ha aportado muchos recursos y juegos musicales que puedo llevar al aula desde el primer minuto. Además me encanta tener los apuntes y canciones siempre disponibles en la web. Lo recomiendo al 100%"
              </p>
            </div>
            
            {/* Espacio preparado para el 2 y el 3 */}
            
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.actionSection}>
          <h2>¿Te vienes a la próxima edición?</h2>
          <p>Escríbenos para conocer las próximas fechas disponibles para educadores o grupos de familias.</p>
          <a href="mailto:hola@musicabalu.com?subject=Información Formación Recursos Musicales" className={styles.primaryBtnDark}>
            Contactar ahora
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
