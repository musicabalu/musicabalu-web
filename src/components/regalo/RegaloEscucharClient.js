'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './RegaloEscuchar.module.css';

const FREE_TITLES = ['Cumbia Balú', 'Duérmete', 'Chiqui Pan', 'Cuando te diga'];

const VIDEO_PILLS_PREVIEW = [
  { numero: 1, title: 'Edwin Gordon y la MLT', desc: 'Cómo aprenden música los bebés de forma natural igual que el lenguaje hablado.' },
  { numero: 2, title: '¿Por qué canciones y recitados?', desc: 'El valor de separar melodía de ritmo sin la distracción de la palabra.' },
  { numero: 3, title: 'Música y lenguaje', desc: 'Conexión cerebral entre balbuceo vocal y vocabulario musical.' },
  { numero: 4, title: 'El balbuceo musical', desc: 'Respuestas tempranas y cómo identificarlas en casa.' },
  { numero: 5, title: 'Ritmo en brazos', desc: 'Juegos corporales y movimiento continuo de apego.' },
  { numero: 6, title: 'Contrastar para dormir', desc: 'Uso de modos menores y nanas para regular el descanso.' }
];

function RegaloEscucharContent({ allTracks }) {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const nameParam = searchParams.get('name') || '';

  const [activeTab, setActiveTab] = useState('regalos'); // 'regalos' | 'canciones' | 'recitados' | 'pildoras'
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalTrackTitle, setModalTrackTitle] = useState('');

  const audioRef = useRef(null);

  // Registrar visita silenciosa si viene con email
  useEffect(() => {
    if (emailParam) {
      fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'Visita de vista (Lead Regalo)',
          details: 'Accedió a /regalo/escuchar',
          email: emailParam
        })
      }).catch(() => {});
    }
  }, [emailParam]);

  // Lista de solo los 4 regalos
  const freeTracks = allTracks.filter(t => FREE_TITLES.includes(t.title));

  const formatTime = (time) => {
    if (isNaN(time) || !time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playTrackByIndex = (idx) => {
    if (idx < 0 || idx >= freeTracks.length) return;
    const track = freeTracks[idx];
    const rawUrl = track.url || '';
    const safeSrc = rawUrl.startsWith('http') || rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;

    setCurrentTrackIndex(idx);

    if (audioRef.current) {
      audioRef.current.src = safeSrc;
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Error al reproducir audio:', err);
            setIsPlaying(false);
          });
      }
    }

    // Registrar actividad de reproducción
    if (emailParam) {
      fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'REPRODUCIR_AUDIO (Lead Regalo)',
          details: track.title,
          email: emailParam
        })
      }).catch(() => {});
    }
  };

  const handleTrackClick = (track) => {
    const isFree = FREE_TITLES.includes(track.title);
    if (!isFree) {
      setModalTrackTitle(track.title);
      setShowModal(true);
      return;
    }

    const freeIdx = freeTracks.findIndex(t => t.title === track.title);
    if (freeIdx === -1) return;

    // Si ya es la pista actual, pausar o reanudar directamente en el gesto del usuario
    if (currentTrackIndex === freeIdx && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
      return;
    }

    // Si es otra pista, reproducir de inmediato
    playTrackByIndex(freeIdx);
  };

  const toggleBottomPlay = () => {
    if (!audioRef.current || currentTrackIndex === null) {
      if (freeTracks.length > 0) playTrackByIndex(0);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const handleNext = () => {
    if (freeTracks.length === 0) return;
    const nextIdx = currentTrackIndex !== null ? (currentTrackIndex + 1) % freeTracks.length : 0;
    playTrackByIndex(nextIdx);
  };

  const handlePrev = () => {
    if (freeTracks.length === 0) return;
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIdx = currentTrackIndex !== null ? (currentTrackIndex - 1 + freeTracks.length) % freeTracks.length : 0;
    playTrackByIndex(prevIdx);
  };

  const handleSeek = (e) => {
    const targetTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  // Filtrado según la pestaña activa
  let displayedTracks = [];
  if (activeTab === 'regalos') {
    displayedTracks = freeTracks;
  } else if (activeTab === 'canciones') {
    displayedTracks = allTracks.filter(t => t.type === 'Canción');
  } else if (activeTab === 'recitados') {
    displayedTracks = allTracks.filter(t => t.type === 'Recitado');
  }

  const currentPlayingTrack = currentTrackIndex !== null ? freeTracks[currentTrackIndex] : null;

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '24px 16px 140px' }}>
      {/* Elemento de audio nativo siempre presente en el DOM para compatibilidad 100% móvil */}
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={handleNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Hero Bienvenida */}
      <div className={styles.heroBox}>
        <div className={styles.badgeRegalo}>🎁 Tu Regalo de Bienvenida</div>
        <h1 className={styles.heroTitle}>
          {nameParam ? `¡Hola, ${nameParam}!` : '¡Hola, familia!'}
        </h1>
        <p className={styles.heroSub}>
          Aquí tienes tus <strong>2 canciones y 2 recitados</strong> listos para escuchar hoy mismo en casa con tu peque. Pulsa el botón ▶️ y comenzarán a sonar al instante.
        </p>

        {/* Explicación Pedagógica MLT */}
        <div className={styles.gordonCard}>
          <div className={styles.gordonIcon}>💡</div>
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#1e293b', fontWeight: '800' }}>
              ¿Por qué estas melodías no tienen letras que cuenten historias?
            </h3>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: '1.55' }}>
              En Musicabalú compongo toda la música basándome en la <strong>Teoría del Aprendizaje Musical (MLT) de Edwin Gordon</strong>. Al eliminar la sobrecarga de la palabra y los sintetizadores estridentes, el cerebro del peque se concentra en el pulso y la entonación pura, desarrollando su oído musical exactamente igual que cuando absorbe el lenguaje materno.
            </p>
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación */}
      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('regalos')}
          className={`${styles.tabBtn} ${activeTab === 'regalos' ? styles.tabBtnActive : ''}`}
        >
          🎁 Mis 4 Audios Abiertos
        </button>
        <button
          onClick={() => setActiveTab('canciones')}
          className={`${styles.tabBtn} ${activeTab === 'canciones' ? styles.tabBtnActive : ''}`}
        >
          🎵 Canciones (+25)
        </button>
        <button
          onClick={() => setActiveTab('recitados')}
          className={`${styles.tabBtn} ${activeTab === 'recitados' ? styles.tabBtnActive : ''}`}
        >
          🗣️ Recitados (+12)
        </button>
        <button
          onClick={() => setActiveTab('pildoras')}
          className={`${styles.tabBtn} ${activeTab === 'pildoras' ? styles.tabBtnActive : ''}`}
        >
          🎬 Píldoras MLT
        </button>
      </div>

      {/* Banner de desbloqueo Comunidad */}
      <div className={styles.unlockBanner}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.3rem' }}>✨</span>
            <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>Comunidad Familiar Musicabalú</strong>
          </div>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: '1.45' }}>
            Desbloquea el repertorio completo (+40 canciones, recitados y píldoras en vídeo) para disfrutar sin límites en familia.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-cyan, #00B2E3)' }}>3,90 €</span>
            <small style={{ color: '#64748b', fontSize: '0.85rem' }}> / mes</small>
          </div>
          <Link href="/tienda/sub_mensual" className={styles.btnDesbloquear}>
            Desbloquear Todo →
          </Link>
        </div>
      </div>

      {/* Lista de Pistas o Píldoras */}
      {activeTab === 'pildoras' ? (
        <div className={styles.tracksGrid}>
          {VIDEO_PILLS_PREVIEW.map((p) => (
            <div
              key={p.numero}
              onClick={() => {
                setModalTrackTitle(`Píldora #${p.numero}: ${p.title}`);
                setShowModal(true);
              }}
              className={`${styles.trackCard} ${styles.trackCardLocked}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontWeight: '800', color: '#64748b', fontSize: '0.85rem' }}>🎬 Píldora #{p.numero}</span>
                <span className={styles.lockedBadge}>🔒 Comunidad</span>
              </div>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#1e293b', fontWeight: '800' }}>{p.title}</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: '1.4' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.tracksGrid}>
          {displayedTracks.map((track) => {
            const isFree = FREE_TITLES.includes(track.title);
            const isSelected =
              isFree &&
              currentTrackIndex !== null &&
              freeTracks[currentTrackIndex]?.title === track.title;
            const isPlayingThis = isSelected && isPlaying;

            return (
              <div
                key={track.title}
                onClick={() => handleTrackClick(track)}
                className={`${styles.trackCard} ${isFree ? styles.trackCardFree : styles.trackCardLocked} ${isPlayingThis ? styles.trackCardPlaying : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: isFree ? 'var(--color-cyan, #00B2E3)' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {track.type}
                  </span>
                  {isFree ? (
                    <span className={styles.freeBadge}>
                      {isPlayingThis ? '▶️ Sonando' : isSelected ? '⏸️ Pausado' : '🔓 Disponible'}
                    </span>
                  ) : (
                    <span className={styles.lockedBadge}>🔒 Comunidad</span>
                  )}
                </div>

                <h4 style={{ margin: '0 0 14px 0', fontSize: '1.15rem', color: isFree ? '#0f172a' : '#64748b', fontWeight: '800' }}>
                  {track.title}
                </h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {isFree ? (
                    <button
                      className={`${styles.playButton} ${isPlayingThis ? styles.playButtonActive : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrackClick(track);
                      }}
                    >
                      {isPlayingThis ? '⏸️ Pausar' : '▶️ Reproducir'}
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' }}>
                      Toca para desbloquear 🔒
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reproductor Flotante en la parte inferior */}
      {currentPlayingTrack && (
        <div className={styles.playerBar}>
          <div className={styles.playerControls}>
            <button onClick={handlePrev} className={styles.playerNavBtn} title="Anterior">
              ⏮
            </button>
            <button onClick={toggleBottomPlay} className={styles.playerMainPlayBtn} title={isPlaying ? 'Pausar' : 'Reproducir'}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={handleNext} className={styles.playerNavBtn} title="Siguiente">
              ⏭
            </button>
          </div>

          <div className={styles.playerTrackInfo}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>{currentPlayingTrack.title}</strong>
              <button onClick={() => { if (audioRef.current) audioRef.current.pause(); setIsPlaying(false); setCurrentTrackIndex(null); }} className={styles.playerCloseBtn}>
                ✖ Cerrar
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', minWidth: '32px' }}>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                style={{ flex: 1, accentColor: '#00B2E3' }}
              />
              <span style={{ fontSize: '11px', color: '#64748b', minWidth: '32px' }}>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Bloqueo al tocar una canción con candado */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setShowModal(false)}>×</button>
            <div style={{ fontSize: '2.8rem', marginBottom: '10px' }}>🔒</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', margin: '0 0 10px 0' }}>
              {modalTrackTitle ? `"${modalTrackTitle}"` : 'Contenido Exclusivo'}
            </h3>
            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.55', margin: '0 0 20px 0' }}>
              Esta pista forma parte de la <strong>Comunidad Familiar Musicabalú</strong>. Únete hoy para acceder a todas las canciones, nanas, recitados y píldoras pedagógicas creadas para tu peque.
            </p>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '22px', textAlign: 'left' }}>
              <div style={{ fontWeight: '800', color: '#1e293b', marginBottom: '8px', fontSize: '0.92rem' }}>
                Con tu suscripción tienes:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                <li>Acceso ilimitado a más de 40 canciones y recitados (MLT).</li>
                <li>Nuevos audios y materiales añadidos cada semana.</li>
                <li>Píldoras formativas para guiar el desarrollo musical en casa.</li>
                <li>Sin permanencia: cancelas en 1 clic cuando quieras.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/tienda/sub_mensual" className={styles.modalPrimaryBtn}>
                ✨ Unirme por solo 3,90 € / mes
              </Link>
              <Link href="/tienda/sub_anual" className={styles.modalSecondaryLink}>
                O elige el plan anual por 39 €/año (ahorras 2 meses)
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegaloEscucharClient({ allTracks }) {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Cargando tus audios...</div>}>
      <RegaloEscucharContent allTracks={allTracks} />
    </Suspense>
  );
}
