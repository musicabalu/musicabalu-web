import { PrismaClient } from '@prisma/client';
import ActivityCard from '@/components/comunidad/ActivityCard';
import styles from './page.module.css';

const prisma = new PrismaClient();

export default async function ActividadesPage() {
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Actividades MLT</h1>
        <p className={styles.subtitle}>Explora cientos de ejercicios prácticos para hacer en casa.</p>
      </header>

      <div className={styles.grid}>
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
