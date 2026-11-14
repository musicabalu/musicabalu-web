'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './PaqueteRegalo.module.css';

const BOX_TRACKS = [
  {
    id: 'cancion-panuelos',
    title: 'Canción 1: Juego con los Pañuelos de Gasa',
    subtitle: 'Movimiento continuo, fluidez y juego visual',
    instrument: '2 Pañuelos de gasa',
    instrumentIcon: '🧣',
    badgeBg: '#fdf2f8',
    badgeColor: '#be185d',
    borderColor: '#f472b6',
    src: '/audios/canciones/panuelos.mp3',
    guide: 'Sostened un pañuelo en cada mano (o dadle uno a vuestro peque y otro a vosotras). Moveos por el espacio trazando ondas suaves en el aire. En las partes lentas, dejadlo flotar y caer suavemente. Podéis jugar a esconderos detrás de él y aparecer cantando el final de la frase.',
  },
  {
    id: 'cancion-huevos',
    title: 'Canción 2: Juego con los Huevos Sonoros',
    subtitle: 'Pulsación rítmica, contrastes dinámicos y parada',
    instrument: '2 Huevos maraca',
    instrumentIcon: '🥚',
    badgeBg: '#eff6ff',
    badgeColor: '#1d4ed8',
    borderColor: '#60a5fa',
    src: '/audios/canciones/cumbiabalu.mp3',
    guide: 'Haced sonar los dos huevitos juntos siguiendo el pulso de la música. Jugad a esconder uno detrás de la espalda y sacarlo con energía, o hacedlos rodar suavemente por el suelo. Cuando la música respire o haga una pausa, ¡quietos como estatuas sin mover los huevos!',
  },
  {
    id: 'recitado-saquitos',
    title: 'Recitado: Juego con los Saquitos de Peso',
    subtitle: 'Métrica rítmica pura, propiocepción y peso corporal',
    instrument: '2 Saquitos de psicomotricidad',
    instrumentIcon: '🧸',
    badgeBg: '#fef3c7',
    badgeColor: '#b45309',
    borderColor: '#fbbf24',
    src: '/audios/recitados/chiquipan.mp3',
    guide: 'Colocad un saquito sobre cada rodilla de vuestro peque (o sobre vuestros hombros o cabeza si jugáis sentados). El peso del saquito ayuda al cerebro infantil a ubicar su propio cuerpo en el espacio (propiocepción). Acompañad el ritmo del recitado meciendo o pasando el saquito de una mano a otra con suavidad.',
  },
];

const VIDEO_PILLS_PREVIEW = [
  { numero: 1, title: 'Edwin Gordon y la MLT', desc: 'Cómo aprenden música los bebés de forma natural igual que el lenguaje hablado.' },
  { numero: 2, title: '¿Por qué canciones y recitados?', desc: 'El valor de separar melodía de ritmo sin la distracción de la palabra.' },
  { numero: 3, title: 'Música y lenguaje', desc: 'Conexión cerebral entre balbuceo vocal y vocabulario musical.' },
  { numero: 4, title: 'El balbuceo musical', desc: 'Respuestas tempranas y cómo identificarlas en casa.' },
  { numero: 5, title: 'Ritmo en brazos', desc: 'Juegos corporales y movimiento continuo de apego.' },
  { numero: 6, title: 'Contrastar para dormir', desc: 'Uso de modos menores y nanas para regular el descanso.' }
];

function PaqueteRegaloContent({ allTracks }) {
  const searchParams = useSearchParams();
  const urlEmail = searchParams.get('email') || '';
  const urlName = searchParams.get('name') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Tabs: 'caja' | 'canciones' | 'recitados' | 'pildoras'
  const [activeTab, setActiveTab] = useState('caja');

  // Reproductor de audio
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Modal para items bloqueados
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const audioRef = useRef(null);

  // Comprobar si ya está desbloqueado
  useEffect(() => {
    const savedUnlocked = localStorage.getItem('musicabalu_caja_unlocked');
    const savedEmail = localStorage.getItem('musicabalu_caja_email');
    const savedName = localStorage.getItem('musicabalu_caja_name');

    if (urlEmail || savedUnlocked === 'true' || savedEmail) {
      setIsUnlocked(true);
      setEmail(urlEmail || savedEmail || '');
      setName(urlName || savedName || '');

      // Registrar visita si viene con email
      if (urlEmail) {
        fetch('/api/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'VISITA_PAQUETE_REGALO',
            details: 'Acceso a /paquete-regalo desde email/QR',
            email: urlEmail
          })
        }).catch(() => {});
      }
    }
  }, [urlEmail, urlName]);

  const handleUnlockSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'paquete-regalo' }),
      });

      await fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'DESBLOQUEO_PAQUETE_REGALO',
          details: `Activó sus 3 audios de la caja (${name || 'Sin nombre'})`,
          email
        })
      }).catch(() => {});

      localStorage.setItem('musicabalu_caja_unlocked', 'true');
      localStorage.setItem('musicabalu_caja_email', email);
      if (name) localStorage.setItem('musicabalu_caja_name', name);

      setIsUnlocked(true);
    } catch (err) {
      console.error(err);
      setIsUnlocked(true); // Permitir acceso aunque falle la red
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || !time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playBoxTrack = (idx) => {
    if (idx < 0 || idx >= BOX_TRACKS.length) return;
    const track = BOX_TRACKS[idx];
    setCurrentTrackIndex(idx);

    if (audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Error al reproducir:', err);
            setIsPlaying(false);
          });
      }
    }

    if (email) {
      fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'REPRODUCIR_PAQUETE_REGALO',
          details: track.title,
          email
        })
      }).catch(() => {});
    }
  };

  const togglePlayBoxTrack = (idx) => {
    if (currentTrackIndex === idx && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
      }
      return;
    }
    playBoxTrack(idx);
  };

  const toggleBottomPlay = () => {
    if (!audioRef.current || currentTrackIndex === null) {
      playBoxTrack(0);
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  const handleNext = () => {
    const nextIdx = currentTrackIndex !== null ? (currentTrackIndex + 1) % BOX_TRACKS.length : 0;
    playBoxTrack(nextIdx);
  };

  const handlePrev = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIdx = currentTrackIndex !== null ? (currentTrackIndex - 1 + BOX_TRACKS.length) % BOX_TRACKS.length : 0;
    playBoxTrack(prevIdx);
  };

  const handleSeek = (e) => {
    const target = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
      setCurrentTime(target);
    }
  };

  const currentPlayingTrack = currentTrackIndex !== null ? BOX_TRACKS[currentTrackIndex] : null;

  // Filtrado de pistas bloqueadas según pestaña
  let lockedTracks = [];
  if (activeTab === 'canciones') {
    lockedTracks = (allTracks || []).filter((t) => t.type === 'Canción');
  } else if (activeTab === 'recitados') {
    lockedTracks = (allTracks || []).filter((t) => t.type === 'Recitado');
  }

  // PANTALLA 1: Puerta de Entrada Exprés (Captura de Lead sin fricción)
  if (!isUnlocked) {
    return (
      <div style={{ maxWidth: '640px', margin: '40px auto 80px' }}>
        <div className={styles.gateCard}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>🎁</div>
          <div className={styles.badgeRegalo}>Tu Caja de Música Familiar</div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: '900', color: '#0f172a', margin: '0 0 12px 0' }}>
            ¡Te damos la bienvenida a Musicabalú!
          </h1>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 28px 0' }}>
            Introduce tu nombre y correo electrónico para activar las <strong>2 canciones y 1 recitado</strong> creados especialmente para los instrumentos de tu caja de regalo.
          </p>

          <form onSubmit={handleUnlockSubmit}>
            <input
              type="text"
              placeholder="Tu nombre (o el de tu peque)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="email"
              placeholder="Tu correo electrónico *"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
            <button type="submit" disabled={submitting} className={styles.btnSubmitGate}>
              {submitting ? 'Abriendo tu caja...' : '✨ Entrar y Escuchar mi Música'}
            </button>
          </form>

          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '16px', marginBottom: 0 }}>
            🔒 Acceso directo sin contraseñas. Guardamos tu espacio para que siempre puedas volver.
          </p>
        </div>
      </div>
    );
  }

  // PANTALLA 2: Plataforma Completa Integrada (Fórmula Embudo)
  return (
    <div>
      {/* Elemento de audio nativo */}
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
        <div className={styles.badgeRegalo}>🎁 Tu Espacio Musicabalú</div>
        <h1 className={styles.heroTitle}>
          {name ? `¡Hola, ${name}!` : '¡Hola, familia!'}
        </h1>
        <p className={styles.heroSub}>
          Aquí tienes las <strong>2 canciones y 1 recitado</strong> diseñados para jugar con los pañuelos, huevos y saquitos de tu caja física. Pulsa cualquier botón y empieza a jugar con tu peque.
        </p>

        {/* Explicación Pedagógica Gordon MLT */}
        <div className={styles.gordonCard}>
          <div className={styles.gordonIcon}>💡</div>
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#1e293b', fontWeight: '800' }}>
              ¿Por qué estas melodías no tienen letras con historias?
            </h3>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: '1.55' }}>
              En Musicabalú componemos toda la música basándonos en la <strong>Teoría del Aprendizaje Musical (MLT) de Edwin Gordon</strong>. Al liberar al cerebro infantil de la sobrecarga de la palabra y los sintetizadores estridentes, el peque absorbe la entonación y el ritmo puro con total naturalidad, exactamente igual que aprende su idioma materno.
            </p>
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación */}
      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('caja')}
          className={`${styles.tabBtn} ${activeTab === 'caja' ? styles.tabBtnActive : ''}`}
        >
          🎁 Mi Caja de Música (3 pistas)
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
          🗣️ Recitados (+14)
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
            ¿Queréis más música para vuestra rutina? Desbloquea más de 50 canciones, nanas, recitados y píldoras en vídeo para disfrutar sin pantallas.
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

      {/* CONTENIDO SEGÚN PESTAÑA */}

      {/* 1. PESTAÑA: MI CAJA DE MÚSICA */}
      {activeTab === 'caja' && (
        <div>
          {/* Aviso / Truco para instalar como App */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #86efac',
            borderRadius: '16px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.9rem',
            color: '#166534',
            lineHeight: '1.5'
          }}>
            <span style={{ fontSize: '1.4rem' }}>📱</span>
            <div>
              <strong>Consejo para el día a día:</strong> Añade esta página a la pantalla de inicio de tu móvil (tocando <em>Compartir → Añadir a pantalla de inicio</em>) para abrir tu reproductor de Musicabalú con 1 solo toque siempre que vayáis a jugar.
            </div>
          </div>

          {/* Grilla de las 3 pistas de la caja */}
          <div className={styles.boxTracksGrid}>
            {BOX_TRACKS.map((track, idx) => {
              const isThisPlaying = currentTrackIndex === idx && isPlaying;
              const isSelected = currentTrackIndex === idx;

              return (
                <div
                  key={track.id}
                  className={`${styles.boxTrackCard} ${isSelected ? styles.boxTrackCardPlaying : ''}`}
                  style={{ borderLeft: `6px solid ${track.borderColor}` }}
                >
                  <div className={styles.boxTrackHeader}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span
                          className={styles.instrumentBadge}
                          style={{ backgroundColor: track.badgeBg, color: track.badgeColor }}
                        >
                          <span>{track.instrumentIcon}</span>
                          <span>{track.instrument}</span>
                        </span>
                        {isSelected && (
                          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#00B2E3' }}>
                            {isThisPlaying ? '▶️ Sonando' : '⏸️ En pausa'}
                          </span>
                        )}
                      </div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#0f172a', fontWeight: '900' }}>
                        {track.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                        {track.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => togglePlayBoxTrack(idx)}
                      className={`${styles.playActionBtn} ${isThisPlaying ? styles.playActionBtnActive : ''}`}
                    >
                      <span>{isThisPlaying ? '⏸️' : '▶️'}</span>
                      <span>{isThisPlaying ? 'Pausar' : 'Reproducir'}</span>
                    </button>
                  </div>

                  {/* Guía Pedagógica de Juego */}
                  <div className={styles.guideCard}>
                    <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>✨</span>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#1e293b', display: 'block', marginBottom: '2px' }}>
                        Idea para jugar en casa con {track.instrument.toLowerCase()}:
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                        {track.guide}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ESCAPARATE DE LA TIENDA: Ampliar la Caja de Instrumentos */}
          <div className={styles.storeShowcase}>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <span style={{ backgroundColor: '#e2e8f0', color: '#475569', fontSize: '0.75rem', fontWeight: '800', padding: '3px 12px', borderRadius: '999px', textTransform: 'uppercase' }}>
                Tienda de Instrumentos
              </span>
              <h3 style={{ margin: '8px 0 6px 0', fontSize: '1.4rem', color: '#0f172a', fontWeight: '900' }}>
                🧸 ¿Queréis ampliar la orquesta en casa?
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.92rem', lineHeight: '1.5' }}>
                Seleccionamos instrumentos acústicos de alta calidad, afinados y libres de plásticos estridentes, ideales para las manitas de tu peque.
              </p>
            </div>

            <div className={styles.storeGrid}>
              <div className={styles.storeItem}>
                <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>🔔</div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#0f172a', fontWeight: '800' }}>Campanas Afinadas</h4>
                <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                  Afinación precisa diatónica para descubrir las notas tocando y experimentando.
                </p>
                <Link href="/tienda" style={{ color: '#00B2E3', fontWeight: '800', fontSize: '0.9rem', textDecoration: 'none' }}>
                  Ver en la Tienda →
                </Link>
              </div>

              <div className={styles.storeItem}>
                <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>🪘</div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#0f172a', fontWeight: '800' }}>Percusión Acústica</h4>
                <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                  Panderetas de madera natural, claves y crótalos respetuosos con su oído.
                </p>
                <Link href="/tienda" style={{ color: '#00B2E3', fontWeight: '800', fontSize: '0.9rem', textDecoration: 'none' }}>
                  Ver en la Tienda →
                </Link>
              </div>

              <div className={styles.storeItem}>
                <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>🎁</div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#0f172a', fontWeight: '800' }}>Tarjetas Regalo</h4>
                <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                  Regala un año entero de música respetuosa a otra familia amiga.
                </p>
                <Link href="/regalo" style={{ color: '#00B2E3', fontWeight: '800', fontSize: '0.9rem', textDecoration: 'none' }}>
                  Ver Opciones →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PESTAÑA: PÍLDORAS MLT (VÍDEOS) */}
      {activeTab === 'pildoras' && (
        <div className={styles.tracksGrid}>
          {VIDEO_PILLS_PREVIEW.map((p) => (
            <div
              key={p.numero}
              onClick={() => {
                setModalTitle(`Píldora #${p.numero}: ${p.title}`);
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
      )}

      {/* 3. PESTAÑAS: CANCIONES O RECITADOS BLOQUEADOS */}
      {(activeTab === 'canciones' || activeTab === 'recitados') && (
        <div className={styles.tracksGrid}>
          {lockedTracks.map((track) => (
            <div
              key={track.title}
              onClick={() => {
                setModalTitle(track.title);
                setShowModal(true);
              }}
              className={`${styles.trackCard} ${styles.trackCardLocked}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {track.type}
                </span>
                <span className={styles.lockedBadge}>🔒 Comunidad</span>
              </div>

              <h4 style={{ margin: '0 0 14px 0', fontSize: '1.15rem', color: '#64748b', fontWeight: '800' }}>
                {track.title}
              </h4>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' }}>
                  Toca para desbloquear 🔒
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reproductor Flotante Inferior */}
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
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.pause();
                  setIsPlaying(false);
                  setCurrentTrackIndex(null);
                }}
                className={styles.playerCloseBtn}
              >
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

      {/* Modal de Bloqueo al tocar una pista cerrada */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setShowModal(false)}>×</button>
            <div style={{ fontSize: '2.8rem', marginBottom: '10px' }}>🔒</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', margin: '0 0 10px 0' }}>
              {modalTitle ? `"${modalTitle}"` : 'Contenido Exclusivo'}
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

export default function PaqueteRegaloClient({ allTracks }) {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Cargando tu paquete de música...</div>}>
      <PaqueteRegaloContent allTracks={allTracks} />
    </Suspense>
  );
}
