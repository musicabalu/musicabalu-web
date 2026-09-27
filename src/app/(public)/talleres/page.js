import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Talleres en Familia | Musicabalú',
  description: 'Inscripción para los talleres musicales de fin de semana.',
};

export default function TalleresPage() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        {/* Cabecera visual */}
        <div style={{ backgroundColor: 'var(--color-yellow)', padding: '60px 40px', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🧸</span>
          <h1 style={{ color: 'var(--color-dark)', margin: 0, fontSize: '2.5rem', fontFamily: 'var(--font-heading)', lineHeight: '1.2' }}>
            Taller de Música en Familia
          </h1>
          <p style={{ color: '#92400e', fontSize: '1.2rem', marginTop: '16px', fontWeight: '500' }}>
            Una experiencia musical de 45 minutos para conectar, disfrutar y aprender jugando.
          </p>
        </div>

        {/* Contenido y normas */}
        <div style={{ padding: '40px' }}>
          <h2 style={{ color: 'var(--color-dark)', fontSize: '1.5rem', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
            Antes de reservar, lee nuestras 4 normas de oro:
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>📵</div>
              <div>
                <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '4px' }}>1. Atención plena</strong>
                <p style={{ margin: 0, color: '#475569', lineHeight: '1.5' }}>Este es un espacio de conexión exclusiva con tu peque. Te pedimos que guardes el móvil durante toda la sesión.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🏃‍♀️</div>
              <div>
                <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '4px' }}>2. Libertad de movimiento</strong>
                <p style={{ margin: 0, color: '#475569', lineHeight: '1.5' }}>Los niños exploran moviéndose. Si tu peque necesita deambular o prefiere observar de lejos, es normal. No le obligues a participar, aprenderá por absorción.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>👥</div>
              <div>
                <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '4px' }}>3. Un solo acompañante</strong>
                <p style={{ margin: 0, color: '#475569', lineHeight: '1.5' }}>Para mantener un clima tranquilo, un volumen acústico sano y evitar el exceso de estímulos, pedimos que asista solo 1 adulto por cada niño matriculado.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>👏</div>
              <div>
                <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '4px' }}>4. Participación activa</strong>
                <p style={{ margin: 0, color: '#475569', lineHeight: '1.5' }}>La mejor forma de que el niño disfrute es verte disfrutar a ti. ¡Anímate a cantar, dar palmas y jugar sin vergüenza!</p>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '2px dashed #e2e8f0', margin: '40px 0' }} />

          {/* Formulario (Mockup estático por ahora hasta conectar con DB) */}
          <h2 style={{ color: 'var(--color-dark)', fontSize: '1.5rem', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
            Reserva tu plaza (20€ / familia)
          </h2>

          <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 20px 0', color: '#64748b' }}>
              Pronto activaremos las inscripciones automáticas con tarjeta. Si tienes dudas mientras tanto, escríbenos.
            </p>
            <Link 
              href="/" 
              style={{ display: 'block', textAlign: 'center', backgroundColor: 'var(--color-cyan)', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            >
              Volver al inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
