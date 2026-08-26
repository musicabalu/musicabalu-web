"use client";

import React, { useRef, useState, useEffect } from 'react';

export default function AudioPlayer({ src, title, onClose, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    // Si han pasado más de 3 segundos, reiniciar la canción actual
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else if (onPrev) {
      // Si no, ir a la anterior
      onPrev();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    if (audioRef.current) {
      const newTime = Number(e.target.value);
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--color-bg)',
      borderTop: '2px solid var(--color-cyan)',
      padding: '15px 20px',
      paddingBottom: 'calc(15px + env(safe-area-inset-bottom, 0))',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexShrink: 0 }}>
        <button 
          onClick={handlePrev}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--color-dark)', transition: 'var(--transition-fast)' }}
          title="Anterior / Reiniciar"
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-cyan)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
        >
          ⏮
        </button>
        <button 
          onClick={stopAudio}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--color-dark)', transition: 'var(--transition-fast)' }}
          title="Detener"
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-pink)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
        >
          ⏹
        </button>
        <button 
          onClick={togglePlay}
          style={{
            background: 'var(--color-pink)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: 'var(--shadow-md)',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button 
          onClick={onNext}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--color-dark)', transition: 'var(--transition-fast)' }}
          title="Siguiente"
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-cyan)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-dark)'}
        >
          ⏭
        </button>
      </div>

      <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '250px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-dark)' }}>{title}</strong>
          {onClose && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-light)' }}>
              ✖ Cerrar
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>{formatTime(progress)}</span>
          <input 
            type="range" 
            min={0} 
            max={duration || 100} 
            value={progress} 
            onChange={handleProgressChange}
            style={{ flex: 1, accentColor: 'var(--color-cyan)' }}
          />
          <span style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>{formatTime(duration)}</span>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={src} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext || (() => setIsPlaying(false))}
      />
    </div>
  );
}
