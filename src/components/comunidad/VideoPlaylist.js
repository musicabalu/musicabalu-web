"use client";

import { useState } from 'react';
import styles from './VideoPlaylist.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function VideoPlaylist({ pills, hasFullAccess }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePill = pills[activeIndex];
  const isLocked = !hasFullAccess;

  return (
    <div className={styles.playlistContainer}>
      {/* Reproductor Principal */}
      <div className={styles.mainPlayerSection}>
        <div className={styles.videoWrapper}>
          {isLocked ? (
            <div className={styles.lockedOverlay}>
              <div className={styles.lockedIcon}>🔒</div>
              <h3 style={{color: 'white', marginBottom: '1rem'}}>Contenido Premium</h3>
              <Link href="/tienda" className={styles.unlockBtn}>
                Desbloquear Píldoras
              </Link>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${activePill.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
              title={activePill.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            ></iframe>
          )}
        </div>

        {/* Información del vídeo activo */}
        <div className={styles.activeInfo}>
          <h2 className={styles.activeTitle}>{activePill.title}</h2>
          <div className={styles.ideaBox}>
            <h4 className={styles.ideaTitle}>💡 La idea clave:</h4>
            <p className={styles.ideaText}>{activePill.ideaClave}</p>
          </div>
        </div>
      </div>

      {/* Lista de Reproducción (Sidebar) */}
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Siguiente... ({pills.length} vídeos)</h3>
        <div className={styles.videoList}>
          {pills.map((pill, index) => {
            const isActive = index === activeIndex;
            return (
              <button 
                key={pill.id} 
                className={`${styles.playlistItem} ${isActive ? styles.activeItem : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className={styles.thumbnailWrapper}>
                  {/* YouTube default thumbnail */}
                  <img 
                    src={`https://img.youtube.com/vi/${pill.youtubeId}/mqdefault.jpg`} 
                    alt={pill.title}
                    className={styles.thumbnail}
                  />
                  {isActive && <div className={styles.playingOverlay}>▶ Jugando</div>}
                  {isLocked && !isActive && <div className={styles.lockedThumb}>🔒</div>}
                </div>
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemTitle}>{pill.title}</h4>
                  <span className={styles.itemBadge}>Vídeo</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
