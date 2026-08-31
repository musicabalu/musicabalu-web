import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Conocenos() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/imagenes/bio/javi balu.jpg" 
                alt="Javi Balú dando clases de música" 
                width={500} 
                height={500} 
                className={styles.bioPhoto}
                priority 
              />
            </div>
            <div className={styles.textContent}>
              <h1 className={styles.title}>Hola, soy Javi Balú</h1>
              <p className={styles.paragraph}>
                Soy músico: me encanta componer, cantar y jugar haciendo música con lo que sea. Tengo estudios superiores de guitarra clásica y formación como profesor especializado en Educación Musical Temprana según la MLT de Gordon... aunque hago algunas cosas más :)
              </p>
              <p className={styles.paragraph}>
                Siempre he sentido la creación musical como algo muy natural en mi vida. Y mi objetivo con Musicabalú es exactamente ese: acercar mi visión de la creatividad musical a los más pequeños y a sus familias de la forma más práctica y lúdica posible.
              </p>
            </div>
          </div>
        </section>

        {/* STORYTELLING - EL ORIGEN */}
        <section className={styles.storySection}>
          <div className={styles.storyContent}>
            <h2>¿Cómo nació Musicabalú?</h2>
            <div className={styles.storyText}>
              <p>
                Aunque hasta hace quince años nunca había imaginado trabajar con bebés, todo cambió justo cuando iba a nacer mi primer hijo. En aquel momento comencé a buscar incansablemente cuál era la mejor manera en que podía enseñarle música de una forma puramente natural y práctica, sin comenzar con teoría pesada, partituras abstractas o la obligación de tocar un instrumento de manera estática.
              </p>
              <p>
                Fue entonces cuando descubrí la Teoría del Aprendizaje Musical (MLT) de Edwin Gordon. Como músico y educador, nada me transformó tanto como ese descubrimiento.
              </p>
              <p>
                Comencé a formarme en IGEME con Marisa Pérez como profesor de Educación Musical Temprana para la etapa de 0 a 6 años, además de asistir a formaciones de referentes mundiales como Wendy Valerio o Arnolfo Borsacchi. 
              </p>
              <p>
                Enseguida le di forma a Musicabalú y en 2017 ya estaba trabajando con bebés y familias. Me sentí como pez en el agua. Disfruto tanto de este "trabajo" que realmente no lo considero un trabajo.
              </p>
            </div>
          </div>
        </section>

        {/* LA FILOSOFÍA */}
        <section className={styles.philosophySection}>
          <div className={styles.philosophyContent}>
            <h2>Los 4 pilares de Musicabalú</h2>
            
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.icon}>✍️</div>
                <h3>Canciones 100% Originales</h3>
                <p>He compuesto cada canción y recitado que escucharás con un propósito pedagógico específico.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.icon}>🎶</div>
                <h3>Repertorio estimulante</h3>
                <p>Siguiendo la Teoría del Aprendizaje Musical utilizamos un repertorio rico en modos y métricas musicales para que la escucha sea lo más rica posible.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.icon}>🧠</div>
                <h3>Neurociencia (MLT)</h3>
                <p>Aplicamos los principios de la Teoría del Aprendizaje Musical para desarrollar la atención sostenida, la escucha activa y la psicomotricidad fina y gruesa.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.icon}>💞</div>
                <h3>El Vínculo Seguro</h3>
                <p>El mejor modelo musical para un bebé no soy yo, son sus padres. Las clases presenciales y la Comunidad Musicabalú están diseñados para que conectéis juntos a través de la música.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.actionSection}>
          <h2>¿Nos conocemos cantando?</h2>
          <div className={styles.actionButtons}>
            <Link href="/presencial" className={styles.primaryBtn}>
              Ver Clases en Murcia
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
