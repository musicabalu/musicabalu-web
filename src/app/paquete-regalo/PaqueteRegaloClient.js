'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const TRACKS = [
  {
    id: 'cancion-panuelos',
    title: 'Canción 1: Juego con los Pañuelos de Gasa',
    subtitle: 'Movimiento continuo, fluidez y juego visual',
    instrument: '2 Pañuelos de gasa',
    instrumentIcon: '🧣',
    instrumentBadgeBg: '#fdf2f4',
    instrumentBadgeColor: '#be185d',
    borderColor: '#f472b6',
    src: '/audios/canciones/Cumbia Balu.mp3', // Placeholder hasta audio definitivo
    downloadName: 'Musicabalu_Cancion_Panuelos.mp3',
    guide: 'Sostened un pañuelo en cada mano (o dadle uno a vuestro peque y otro a vosotras). Moveos por el espacio trazando ondas suaves en el aire. En las partes lentas, dejadlo flotar y caer suavemente. Podéis jugar a esconderos detrás de él y aparecer cantando el final de la frase.',
  },
  {
    id: 'cancion-huevos',
    title: 'Canción 2: Juego con los Huevos Sonoros',
    subtitle: 'Pulsación rítmica, contrastes dinámicos y parada',
    instrument: '2 Huevos maraca',
    instrumentIcon: '🥚',
    instrumentBadgeBg: '#eff6ff',
    instrumentBadgeColor: '#1d4ed8',
    borderColor: '#60a5fa',
    src: '/audios/canciones/Duermete.mp3', // Placeholder hasta audio definitivo
    downloadName: 'Musicabalu_Cancion_Huevos_Sonoros.mp3',
    guide: 'Haced sonar los dos huevitos juntos siguiendo el pulso de la música. Jugad a esconder uno detrás de la espalda y sacarlo con energía, o hacedlos rodar suavemente por el suelo. Cuando la música respire o haga una pausa, ¡quietos como estatuas sin mover los huevos!',
  },
  {
    id: 'recitado-saquitos',
    title: 'Recitado: Juego con los Saquitos de Peso',
    subtitle: 'Métrica rítmica pura, propiocepción y peso corporal',
    instrument: '2 Saquitos de psicomotricidad',
    instrumentIcon: '🧸',
    instrumentBadgeBg: '#fef3c7',
    instrumentBadgeColor: '#b45309',
    borderColor: '#fbbf24',
    src: '/audios/recitados/Chiqui Pan.mp3', // Placeholder hasta audio definitivo
    downloadName: 'Musicabalu_Recitado_Saquitos.mp3',
    guide: 'Colocad un saquito sobre cada rodilla de vuestro peque (o sobre vuestros hombros o cabeza si jugáis sentados). El peso del saquito ayuda al cerebro infantil a ubicar su propio cuerpo en el espacio (propiocepción). Acompañad el ritmo del recitado meciendo o pasando el saquito de una mano a otra con suavidad.',
  },
];

export default function PaqueteRegaloClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState('');

  // Reproductor state
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Comprobar si ya se registró previamente en este dispositivo
  useEffect(() => {
    try {
      const saved = localStorage.getItem('musicabalu_paquete_regalo_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) {
          setName(parsed.name || '');
          setEmail(parsed.email || '');
          setIsUnlocked(true);
        }
      }
    } catch {
      // Ignorar errores de localStorage
    }
  }, []);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      setErrorMessage('Por favor, indica tu nombre y correo para activar tu regalo.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Registrar lead en la base de datos
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      // Guardar en localStorage
      try {
        localStorage.setItem(
          'musicabalu_paquete_regalo_user',
          JSON.stringify({ name, email, date: new Date().toISOString() })
        );
      } catch {}

      setIsUnlocked(true);
      setStatus('idle');
    } catch (err) {
      console.error(err);
      // Permitir desbloqueo incluso si falla el endpoint para no bloquear a la familia
      setIsUnlocked(true);
      setStatus('idle');
    }
  };

  const handlePlayTrack = (track) => {
    if (!audioRef.current) return;

    if (activeTrackId === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      audioRef.current.src = track.src;
      audioRef.current.currentTime = 0;
      setActiveTrackId(track.id);
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Cabecera de Bienvenida */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#eff6ff',
          color: '#0284c7',
          fontWeight: '800',
          fontSize: '0.85rem',
          padding: '6px 16px',
          borderRadius: '999px',
          marginBottom: '14px',
          border: '1.5px solid #bae6fd'
        }}>
          <span>🎁</span>
          <span>Paquete Regalo Oficial Musicabalú</span>
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.6rem)',
          fontWeight: '900',
          color: '#0f172a',
          margin: '0 0 14px 0',
          fontFamily: 'var(--font-heading)',
          lineHeight: '1.2'
        }}>
          ¡Bienvenida a tu Experiencia Musical en Familia!
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#475569',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Has recibido en tus manos la caja de Musicabalú con los <strong>2 pañuelos de gasa, los 2 huevos sonoros y los 2 saquitos de peso</strong>. 
          Aquí tienes tus <strong>2 canciones y 1 recitado</strong> exclusivos para jugar con tu peque en casa, 100% libre de pantallas.
        </p>
      </div>

      {/* BLOQUE CONDICIONAL: FORMULARIO DE DESBLOQUEO O CONTENIDO DIRECTO */}
      {!isUnlocked ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '36px 30px',
          border: '2px solid #FED65E',
          boxShadow: '0 12px 30px rgba(254, 214, 94, 0.2)',
          textAlign: 'center',
          maxWidth: '540px',
          margin: '0 auto 40px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✨</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
            Activa tu regalo en 1 segundo
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 24px 0' }}>
            Indica tu nombre y correo para vincular tu paquete, desbloquear el reproductor y recibir tu enlace para escuchar las canciones siempre que quieras.
          </p>

          <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="text"
              placeholder="Tu nombre (o el de tu peque)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            {errorMessage && (
              <p style={{ color: '#dc2626', fontSize: '0.88rem', margin: '4px 0 0' }}>{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                backgroundColor: 'var(--color-cyan, #00B2E3)',
                color: 'white',
                border: 'none',
                padding: '15px 24px',
                borderRadius: '999px',
                fontSize: '1.05rem',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(0, 178, 227, 0.3)',
                transition: 'transform 0.15s',
                marginTop: '6px'
              }}
            >
              {status === 'loading' ? 'Activando tu regalo...' : '🎵 Desbloquear mis canciones ahora'}
            </button>
          </form>

          <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '16px', marginBottom: 0 }}>
            🔒 Cero spam. Solo utilizaremos tu correo para enviarte el acceso directo a este regalo y noticias de música infantil respetuosa.
          </p>
        </div>
      ) : (
        /* ÁREA REPRODUCTORA Y GUÍAS DE JUEGO */
        <div>
          {/* Mensaje de bienvenida para usuario activo */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            borderRadius: '16px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>✅</span>
              <span style={{ color: '#166534', fontWeight: '700', fontSize: '0.95rem' }}>
                Regalo desbloqueado para <strong>{name || 'Familia'}</strong> ({email})
              </span>
            </div>
            <span style={{ color: '#15803d', fontSize: '0.82rem', fontWeight: '600' }}>
              Acceso ilimitado y permanente
            </span>
          </div>

          {/* LISTA DE LOS 3 AUDIOS CON REPRODUCTOR INTERACTIVO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '40px' }}>
            {TRACKS.map((track) => {
              const isCurrent = activeTrackId === track.id;

              return (
                <div
                  key={track.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    border: `2px solid ${isCurrent ? track.borderColor : '#e2e8f0'}`,
                    padding: '24px',
                    boxShadow: isCurrent ? `0 10px 25px -5px ${track.borderColor}33` : '0 4px 14px rgba(0,0,0,0.03)',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                >
                  {/* Encabezado del audio */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    <div>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: track.instrumentBadgeBg,
                        color: track.instrumentBadgeColor,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        marginBottom: '6px'
                      }}>
                        <span>{track.instrumentIcon}</span>
                        <span>{track.instrument}</span>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                        {track.title}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                        {track.subtitle}
                      </p>
                    </div>

                    {/* Botón Descargar MP3 */}
                    <a
                      href={track.src}
                      download={track.downloadName}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#f8fafc',
                        color: '#475569',
                        border: '1px solid #cbd5e1',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        transition: 'background-color 0.15s'
                      }}
                      title="Descargar archivo MP3 para escuchar sin conexión"
                    >
                      <span>📥</span>
                      <span>Descargar MP3</span>
                    </a>
                  </div>

                  {/* Reproductor con barra de progreso */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '14px',
                    padding: '14px 18px',
                    marginBottom: '16px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}>
                    {/* Botón Play/Pause redondo */}
                    <button
                      onClick={() => handlePlayTrack(track)}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: isCurrent && isPlaying ? '#0f172a' : 'var(--color-cyan, #00B2E3)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(0, 178, 227, 0.25)'
                      }}
                    >
                      {isCurrent && isPlaying ? '⏸' : '▶'}
                    </button>

                    {/* Barra de progreso */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <input
                        type="range"
                        min="0"
                        max={isCurrent ? duration || 100 : 100}
                        value={isCurrent ? currentTime : 0}
                        onChange={handleSeek}
                        disabled={!isCurrent}
                        style={{
                          width: '100%',
                          accentColor: 'var(--color-cyan, #00B2E3)',
                          cursor: isCurrent ? 'pointer' : 'default'
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
                        <span>{isCurrent ? formatTime(currentTime) : '0:00'}</span>
                        <span>{isCurrent && duration ? formatTime(duration) : '--:--'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Guía de Juego con el material */}
                  <div style={{
                    backgroundColor: '#fffdf5',
                    border: '1px solid #fed65e',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '0.88rem',
                    color: '#78350f',
                    lineHeight: '1.5'
                  }}>
                    <strong style={{ color: '#92400e', display: 'block', marginBottom: '3px' }}>
                      💡 Idea para jugar con tu peque:
                    </strong>
                    {track.guide}
                  </div>
                </div>
              );
            })}
          </div>

          {/* GUÍA DE FILOSOFÍA: POR QUÉ ESTOS MATERIALES */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '28px',
            border: '1.5px solid #e2e8f0',
            marginBottom: '36px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
              ¿Por qué estos materiales y no juguetes con pilas?
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', margin: '0 0 14px 0' }}>
              Los juguetes musicales convencionales tocan melodías automáticas con luces que sobreestimulan el sistema nervioso del bebé sin permitirle participar.
              Los <strong>pañuelos, huevos y saquitos</strong> son materiales acústicos y abiertos recomendados por la Music Learning Theory de Edwin Gordon:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '10px' }}>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block', marginBottom: '2px' }}>1. La voz como modelo</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Tu voz o la música cantada sin instrumentos estridentes activa los centros del lenguaje en su cerebro.</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '10px' }}>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block', marginBottom: '2px' }}>2. Movimiento somático</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Sentir el peso, el flujo y el espacio ayuda a coordinar su motricidad y la percepción del ritmo.</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '10px' }}>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block', marginBottom: '2px' }}>3. Conexión de apego</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Cantar mirándole a los ojos fortalece el vínculo seguro y regula su calma de forma natural.</span>
              </div>
            </div>
          </div>

          {/* BANNER COMUNIDAD MUSICABALÚ (EL GANCHO A LA SUSCRIPCIÓN) */}
          <div style={{
            backgroundColor: 'linear-gradient(135deg, #00B2E3 0%, #008eb5 100%)',
            background: 'linear-gradient(135deg, #00B2E3 0%, #008eb5 100%)',
            color: 'white',
            borderRadius: '24px',
            padding: '32px 28px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 178, 227, 0.25)',
            marginBottom: '30px'
          }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', fontWeight: '800', padding: '4px 12px', borderRadius: '999px', display: 'inline-block', marginBottom: '10px' }}>
              ⭐ DA UN PASO MÁS EN FAMILIA ⭐
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '900', margin: '0 0 10px 0' }}>
              ¿Queréis más música viva cada semana?
            </h3>
            <p style={{ fontSize: '1rem', opacity: 0.95, maxWidth: '560px', margin: '0 auto 20px', lineHeight: '1.5' }}>
              Únete a la <strong>Comunidad Musicabalú</strong>: un catálogo vivo con decenas de canciones modales, recitados rítmicos y píldoras en vídeo para adultos con ideas de juego para cada momento del día.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/tienda"
                style={{
                  backgroundColor: 'white',
                  color: '#008eb5',
                  padding: '13px 26px',
                  borderRadius: '999px',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                Conocer la Comunidad Musicabalú →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Pie legal de seguridad */}
      <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.78rem', lineHeight: '1.5', marginTop: '20px' }}>
        Aviso de seguridad: Los instrumentos y materiales incluidos en el Paquete Regalo están homologados con marcado CE. 
        Recomendado para uso exclusivo bajo la supervisión directa y activa de un adulto.
      </div>
    </div>
  );
}
