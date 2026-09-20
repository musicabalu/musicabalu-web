import Image from 'next/image';

export default function CartelEmpiPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f0f0f0', padding: '2rem', minHeight: '100vh' }}>
      <div style={{
        width: '1080px',
        height: '1920px',
        backgroundColor: '#ffffff',
        transform: 'scale(0.4)',
        transformOrigin: 'top center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '120px 80px',
        boxSizing: 'border-box',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        borderRadius: '40px',
        fontFamily: 'var(--font-heading), sans-serif'
      }}>
        
        {/* Etiqueta Superior */}
        <div style={{
          backgroundColor: 'var(--color-yellow)',
          color: 'var(--color-dark)',
          padding: '20px 60px',
          borderRadius: '50px',
          fontSize: '48px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '80px',
          boxShadow: '0 10px 20px rgba(254, 214, 94, 0.4)'
        }}>
          ÚLTIMAS PLAZAS
        </div>

        {/* Texto Principal */}
        <h1 style={{
          fontSize: '90px',
          color: 'var(--color-dark)',
          textAlign: 'center',
          fontWeight: '900',
          lineHeight: '1.2',
          marginBottom: '40px'
        }}>
          Precio especial<br/>para familias de EMPI
        </h1>

        {/* Separador */}
        <div style={{ width: '150px', height: '8px', backgroundColor: 'var(--color-cyan)', borderRadius: '4px', marginBottom: '60px' }}></div>

        {/* Subtítulo en Rosa */}
        <h2 style={{
          fontSize: '65px',
          color: 'var(--color-pink)',
          textAlign: 'center',
          fontWeight: '800',
          lineHeight: '1.3',
          marginBottom: 'auto' // Empuja el resto hacia abajo
        }}>
          Clases de música según<br/>la MLT de Gordon
        </h2>

        {/* Elemento Gráfico (Opcional) */}
        <div style={{ fontSize: '150px', marginBottom: 'auto', opacity: '0.8' }}>
          🎶👶🎵
        </div>

        {/* Logo */}
        <div style={{ marginBottom: '60px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img src="/logo_texto_corazon.png" alt="Musicabalú" style={{ width: '600px', height: 'auto' }} />
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: 'var(--color-cyan-light)',
          width: '100%',
          padding: '40px',
          borderRadius: '30px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '45px', color: 'var(--color-cyan)', fontWeight: '900', margin: 0 }}>
            www.musicabalu.com
          </p>
        </div>

      </div>
    </div>
  );
}
