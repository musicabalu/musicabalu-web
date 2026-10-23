"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './VideoPlaylist.module.css';
import Link from 'next/link';

export default function VideoPlaylist({ pills, hasFullAccess }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const defaultPillId = (!hasFullAccess ? pills.find(p => p.isFree)?.id : pills[0]?.id) || pills[0]?.id || 1;
  const [activeId, setActiveId] = useState(defaultPillId);
  const lastLoggedPillId = useRef(null);

  // Filter pills based on category
  const filteredPills = selectedCategory === 'all' 
    ? pills 
    : pills.filter(p => p.categoria === selectedCategory);

  // Make sure activePill is valid
  let activePill = pills.find(p => p.id === activeId) || pills[0];

  // Registrar visualización de la píldora activa cuando está desbloqueada
  useEffect(() => {
    if (!activePill) return;
    const isLocked = !hasFullAccess && !activePill.isFree;
    if (!isLocked && lastLoggedPillId.current !== activePill.id) {
      lastLoggedPillId.current = activePill.id;
      fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'VER_PILDORA',
          details: `Píldora #${activePill.numero}: ${activePill.title}`
        })
      }).catch(e => console.error(e));
    }
  }, [activePill, hasFullAccess]);

  const handleSelectPill = (pill) => {
    setActiveId(pill.id);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const categoryPills = cat === 'all' ? pills : pills.filter(p => p.categoria === cat);
    const firstOfCategory = (!hasFullAccess ? categoryPills.find(p => p.isFree) : categoryPills[0]) || categoryPills[0];
    if (firstOfCategory) {
      setActiveId(firstOfCategory.id);
    }
  };

  const currentIndex = filteredPills.findIndex(p => p.id === activePill.id);
  const prevPill = currentIndex > 0 ? filteredPills[currentIndex - 1] : null;
  const nextPill = currentIndex < filteredPills.length - 1 ? filteredPills[currentIndex + 1] : null;

  const isCurrentLocked = !hasFullAccess && !activePill.isFree;

  const countTeoria = pills.filter(p => p.categoria === 'teoria').length;
  const countPractica = pills.filter(p => p.categoria === 'practica').length;

  return (
    <div className={styles.container}>
      {/* Selector de categorías */}
      <div className={styles.categoryFilters}>
        <button
          onClick={() => handleCategoryChange('all')}
          className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.filterBtnActive : ''}`}
        >
          🌟 Todas ({pills.length})
        </button>
        <button
          onClick={() => handleCategoryChange('teoria')}
          className={`${styles.filterBtn} ${selectedCategory === 'teoria' ? styles.filterBtnActiveTeoria : ''}`}
        >
          🧠 MLT ({countTeoria})
        </button>
        <button
          onClick={() => handleCategoryChange('practica')}
          className={`${styles.filterBtn} ${selectedCategory === 'practica' ? styles.filterBtnActivePractica : ''}`}
        >
          🎯 Consejos Prácticos en Casa ({countPractica})
        </button>
      </div>

      {/* Reproductor Principal y Ficha */}
      <div className={styles.playerCard}>
        {/* Columna Izquierda: Reproductor Vertical 9:16 */}
        <div className={styles.videoColumn}>
          <div className={styles.verticalVideoWrapper}>
            {isCurrentLocked ? (
              <div className={styles.lockedOverlay}>
                <div className={styles.lockedIcon}>🔒</div>
                <h3 className={styles.lockedTitle}>Píldora Exclusiva</h3>
                <p className={styles.lockedText}>
                  Forma parte de la Comunidad Musicabalú para ver todos los vídeos formativos y consejos pedagógicos.
                </p>
                <Link href="/tienda" className={styles.unlockBtn}>
                  Unirme a la Comunidad ✨
                </Link>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activePill.youtubeId}?rel=0&modestbranding=1&playsinline=1&cc_load_policy=0&iv_load_policy=3`}
                title={activePill.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              />
            )}
          </div>
        </div>

        {/* Columna Derecha: Información Pedagógica y Detalles */}
        <div className={styles.infoColumn}>
          <div className={styles.badgeRow}>
            <span className={`${styles.categoryBadge} ${activePill.categoria === 'practica' ? styles.badgePractica : styles.badgeTeoria}`}>
              {activePill.categoriaIcon} {activePill.categoriaLabel}
            </span>
            {activePill.isFree && !hasFullAccess && (
              <span className={styles.freeBadge}>
                🔓 Muestra Gratuita
              </span>
            )}
            <span className={styles.pillNumber}>
              Píldora #{activePill.numero}
            </span>
          </div>

          <h2 className={styles.pillTitle}>{activePill.title}</h2>

          <div className={styles.ideaBox}>
            <h4 className={styles.boxTitle}>💡 La idea clave:</h4>
            <p className={styles.boxText}>{activePill.ideaClave}</p>
          </div>

          {activePill.aplicacionPractica && (
            <div className={styles.practiceBox}>
              <h4 className={styles.practiceTitle}>✨ En casa (nuestra propuesta):</h4>
              <p className={styles.practiceText}>{activePill.aplicacionPractica}</p>
            </div>
          )}

          {/* Navegación rápida entre píldoras */}
          <div className={styles.navRow}>
            <button
              onClick={() => prevPill && handleSelectPill(prevPill)}
              disabled={!prevPill}
              className={styles.navBtn}
            >
              ← Anterior
            </button>
            <span className={styles.navCount}>
              {currentIndex + 1} de {filteredPills.length}
            </span>
            <button
              onClick={() => nextPill && handleSelectPill(nextPill)}
              disabled={!nextPill}
              className={styles.navBtn}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>

      {/* Catálogo de Píldoras de la lista */}
      <div className={styles.listSection}>
        <h3 className={styles.listSectionTitle}>
          Explora las píldoras ({filteredPills.length})
        </h3>
        <div className={styles.pillsGrid}>
          {filteredPills.map((pill) => {
            const isActive = pill.id === activePill.id;
            const isLocked = !hasFullAccess && !pill.isFree;

            return (
              <div
                key={pill.id}
                onClick={() => handleSelectPill(pill)}
                className={`${styles.pillItemCard} ${isActive ? styles.pillItemActive : ''}`}
                role="button"
                tabIndex={0}
              >
                <div className={styles.pillThumbWrapper}>
                  <img
                    src={`https://img.youtube.com/vi/${pill.youtubeId}/mqdefault.jpg`}
                    alt={pill.title}
                    className={styles.pillThumb}
                    loading="lazy"
                  />
                  <div className={styles.pillThumbOverlay}>
                    {isActive ? (
                      <span className={styles.playingTag}>▶ Viendo</span>
                    ) : isLocked ? (
                      <span className={styles.lockTag}>🔒 Premium</span>
                    ) : (
                      <span className={styles.playIcon}>▶</span>
                    )}
                  </div>
                  <span className={styles.pillThumbNum}>#{pill.numero}</span>
                </div>

                <div className={styles.pillItemContent}>
                  <div className={styles.pillItemBadge}>
                    {pill.categoriaIcon} {pill.categoria === 'practica' ? 'Práctica' : 'MLT'}
                  </div>
                  <h4 className={styles.pillItemTitle}>{pill.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
