'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ExitoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '600px' }}>
      <h1 style={{ color: '#AADB1E', fontSize: '2.5rem', marginBottom: '15px' }}>¡Inscripción Completada! 🎉</h1>
      
      {sessionId ? (
        <p style={{ color: '#4A5568', fontSize: '1.1rem', marginBottom: '30px' }}>
          Tu pago de la matrícula se ha procesado con éxito y la plaza está reservada. En breve recibirás un correo con todos los detalles.
        </p>
      ) : (
        <p style={{ color: '#4A5568', fontSize: '1.1rem', marginBottom: '30px' }}>
          Tu solicitud de inscripción ha sido registrada con éxito y tu plaza presencial queda confirmada. En breve recibirás un correo con todos los detalles y el resguardo.
        </p>
      )}

      <Link href="/" style={{ backgroundColor: '#00B2E3', color: 'white', padding: '12px 25px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', display: 'inline-block' }}>
        Volver a Inicio
      </Link>
    </div>
  );
}

export default function ExitoInscripcion() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', padding: '20px' }}>
      <Suspense fallback={<div>Cargando...</div>}>
        <ExitoContent />
      </Suspense>
    </div>
  );
}
