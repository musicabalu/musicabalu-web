import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS, getPostBySlug } from "@/data/blogPosts";
import styles from "../blog.module.css";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | Musicabalú",
    };
  }

  return {
    title: `${post.title} | Blog Musicabalú`,
    description: post.seoDescription || post.subtitle,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.subtitle,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className={styles.articlePage}>
      <Header />

      <header className={styles.articleHeader}>
        <div className={styles.articleHeaderInner}>
          <Link href="/blog" className={styles.backLink}>
            ← Volver al Blog
          </Link>
          <div>
            <span
              className={styles.heroBadge}
              style={{ color: post.categoryColor, marginBottom: "0.5rem" }}
            >
              {post.category}
            </span>
          </div>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <p className={styles.articleSubtitle}>{post.subtitle}</p>
          <div className={styles.articleMeta}>
            <span>✍️ Escrito por {post.author}</span>
            <span>•</span>
            <span>⏱️ {post.readTime}</span>
          </div>
        </div>
      </header>

      <div className={styles.coverWrapper}>
        <img
          src={post.coverImage}
          alt={post.title}
          className={styles.coverImage}
        />
      </div>

      <article className={styles.articleContainer}>
        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>
            ¿Te gustaría tener las canciones y juegos de Musicabalú en casa? 🎶
          </h2>
          <p className={styles.ctaText}>
            Accede a nuestra biblioteca familiar con canciones sin letra en distintos modos y
            métricas, recitados rítmicos y píldoras breves de ciencia y práctica musical para
            compartir con tu peque cada semana.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/tienda" className={styles.ctaPrimary}>
              Unirme a la Comunidad Musicabalú
            </Link>
            <Link href="/formaciones" className={styles.ctaSecondary}>
              Ver formaciones para docentes y familias
            </Link>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <h2 className={styles.relatedHeading}>
              Sigue descubriendo más ideas musicales
            </h2>
            <div className={styles.grid}>
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className={styles.card}
                >
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <span
                      className={styles.cardCategory}
                      style={{ color: rel.categoryColor }}
                    >
                      {rel.category}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span>⏱️ {rel.readTime}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{rel.title}</h3>
                    <p className={styles.cardSubtitle}>{rel.subtitle}</p>
                    <span className={styles.cardLink}>Leer artículo →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
