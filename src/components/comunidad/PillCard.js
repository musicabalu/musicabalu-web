import styles from './PillCard.module.css';
import Link from 'next/link';

export default function PillCard({ pill, hasFullAccess }) {
  // Determine border color based on type
  let cardStyle = styles.card;
  const typeLower = pill.tipo.toLowerCase();
  if (typeLower.includes('faq') || typeLower.includes('pregunta')) {
    cardStyle = `${styles.card} ${styles.cardFAQ}`;
  } else if (typeLower.includes('mito')) {
    cardStyle = `${styles.card} ${styles.cardMito}`;
  }

  const isLocked = !hasFullAccess && !pill.isFree;

  if (isLocked) {
    cardStyle = `${cardStyle} ${styles.locked}`;
  }

  return (
    <div className={cardStyle}>
      {isLocked && (
        <div className={styles.lockedOverlay}>
          <div className={styles.lockedIcon}>🔒</div>
          <Link href="/tienda" style={{ textDecoration: 'none' }}>
            <div className={styles.lockedText}>Premium</div>
          </Link>
        </div>
      )}

      <div className={styles.header}>
        <span className={styles.badge}>{pill.tipo}</span>
        {pill.isFree && !hasFullAccess && (
          <span className={`${styles.badge} ${styles.freeBadge}`}>Gratis 🔓</span>
        )}
      </div>
      
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>La Teoría (MLT):</h4>
        <p className={styles.content}>&ldquo;{pill.teoria_mlt}&rdquo;</p>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>En Casa (Nuestra propuesta):</h4>
        <p className={styles.practiceText}>{pill.aplicacion_practica}</p>
      </div>
    </div>
  );
}
