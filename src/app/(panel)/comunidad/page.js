import { PrismaClient } from '@prisma/client';
import styles from './page.module.css';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export default async function ComunidadPage() {
  const session = await getServerSession(authOptions);
  const activitiesCount = await prisma.activity.count();
  const pillsCount = await prisma.contentPill.count();

  // Get first name for welcome message
  const firstName = session?.user?.name ? session.user.name.split(' ')[0] : 'Familia';

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>¡Hola, {firstName}!</h1>
        <p className={styles.subtitle}>Explora todos los recursos musicales que hemos preparado para vosotros.</p>
      </header>

      <section className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Bienvenido/a a tu rincón musical</h2>
        <p className={styles.welcomeText}>
          Aquí encontrarás todas las canciones, nanas, recitados y píldoras formativas (MLT) 
          que utilizamos en nuestras clases. Pon un poco de música en vuestra rutina diaria 
          y disfruta del desarrollo musical de tu peque.
        </p>
        <Link href="/comunidad/canciones" className={styles.welcomeAction}>
          🎵 Escuchar Canciones
        </Link>
      </section>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{activitiesCount}</div>
          <div className={styles.statLabel}>Actividades y Canciones</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{pillsCount}</div>
          <div className={styles.statLabel}>Píldoras Educativas</div>
        </div>
      </div>
    </div>
  );
}
