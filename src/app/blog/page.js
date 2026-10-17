import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blogPosts";
import styles from "./blog.module.css";

export const metadata = {
  title: "Blog de Estimulación Musical Temprana | Musicabalú",
  description:
    "Juegos musicales para bebés y niños, ciencia del desarrollo musical infantil (Music Learning Theory de Edwin Gordon) y recursos prácticos para disfrutar de la música en casa.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <span className={styles.heroBadge}>✨ Blog de Musicabalú</span>
          <h1 className={styles.heroTitle}>
            Música, ciencia y juego para disfrutar en familia
          </h1>
          <p className={styles.heroSubtitle}>
            Ideas prácticas para cantar y jugar en casa con tu peque, basadas en la{" "}
            <strong>Music Learning Theory</strong> de Edwin Gordon y en la neurociencia del
            desarrollo infantil.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.cardImageWrapper}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className={styles.cardImage}
                  loading="lazy"
                />
                <span
                  className={styles.cardCategory}
                  style={{ color: post.categoryColor }}
                >
                  {post.category}
                </span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span>⏱️ {post.readTime}</span>
                  <span>•</span>
                  <span>Por {post.author}</span>
                </div>

                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardSubtitle}>{post.subtitle}</p>

                <span className={styles.cardLink}>
                  Leer artículo completo →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>
            ¿Quieres llevar la experiencia musical de Musicabalú a vuestro salón? 💛
          </h2>
          <p className={styles.ctaText}>
            En la <strong>Comunidad Musicabalú</strong> encontrarás todas nuestras canciones
            originales en distintos modos y métricas, recitados rítmicos y píldoras breves en
            vídeo para disfrutar en familia desde solo 3,90 €/mes.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/tienda" className={styles.ctaPrimary}>
              Descubrir la Comunidad Online
            </Link>
            <Link href="/presencial" className={styles.ctaSecondary}>
              Ver clases presenciales en Murcia
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
