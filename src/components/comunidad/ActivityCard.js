import styles from './ActivityCard.module.css';

export default function ActivityCard({ activity }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{activity.titulo}</h3>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeCat}`}>
            {activity.categoria}
          </span>
          <span className={`${styles.badge} ${styles.badgeAge}`}>
            {activity.edades}
          </span>
          <span className={`${styles.badge} ${styles.badgeBook}`}>
            📚 {activity.libro_origen}
          </span>
        </div>
      </div>
      <p className={styles.description}>{activity.descripcion}</p>
    </div>
  );
}
