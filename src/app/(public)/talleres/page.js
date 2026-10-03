import React from 'react';
import Link from 'next/link';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata = {
  title: 'Talleres en Familia | Musicabalú',
  description: 'Inscripción para los talleres musicales de fin de semana.',
};

export const revalidate = 0; // Ensure fresh data on every load

export default async function TalleresPage() {
  const activeWorkshops = await prisma.workshop.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        {/* Cabecera visual */}
        <div style={{ backgroundColor: 'var(--color-yellow)', padding: '60px 40px', textAlign: 'center' }}>
          <img src="/og-logo.png" alt="Musicabalú Logo" style={{ maxWidth: '80px', marginBottom: '16px', display: 'inline-block', borderRadius: '50%' }} />
          <h1 style={{ color: 'var(--color-dark)', margin: 0, fontSize: '2.5rem', fontFamily: 'var(--font-heading)', lineHeight: '1.2' }}>
            Taller de Música en Familia
          </h1>
          <p style={{ color: '#92400e', fontSize: '1.2rem', marginTop: '16px', fontWeight: '500' }}>
            Una experiencia musical de unos 45 minutos para conectar, disfrutar y aprender jugando.
          </p>
        </div>

        {/* Contenido y normas */}
        <div style={{ padding: '40px' }}>
          <h2 style={{ color: 'var(--color-dark)', fontSize: '1.5rem', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
            Queridas familias:
          </h2>
          <p style={{ margin: '0 0 16px 0', color: '#475569', lineHeight: '1.6' }}>
            Gracias, gracias, gracias por venir a disfrutar con nosotros a este espacio de conexión musical. 
            Os he preparado alguna información importante para que la sesión se desarrolle de la mejor manera posible y con el mayor beneficio y disfrute para los niños.
          </p>
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '12px', marginBottom: '32px' }}>
            <p style={{ margin: 0, color: '#166534', fontWeight: '500' }}>
              🎁 Además, <strong style={{ textDecoration: 'underline' }}>la inscripción a este taller te da acceso a nuestra plataforma web</strong>. Podrás escuchar algunas de nuestras canciones de estudio, recitados y píldoras formativas desde casa. Cuando se abra el plazo, también te saldrá la opción de suscribirte por 5,90€/mes para desbloquear el 100% del catálogo.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>✨</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                La energía con la que vengáis a las clases marca la diferencia. ¡Disfrutad de ese momento y espacio familiar especial y dejaos llevar!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>👕</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                Os recomiendo venir con ropa cómoda. Las sesiones se realizan sin calzado.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🤫</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                En nuestras sesiones creamos un espacio no verbal. Aunque el disfrute es una máxima en nuestras clases, trabajamos contenidos musicales fundamentados en la escucha. Es muy importante que, salvo que sea totalmente necesario, tratéis de no hablar ni con vuestro peque ni con otros padres y mantener la atención. El habla distrae de la música. Entre todos buscaremos un clima mágico y especial en el que sólo nos comunicaremos musicalmente.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🤝</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                Los padres sois responsables del bienestar de los niños en la clase y de que mantengan un comportamiento respetuoso hacia los objetos y los compañeros.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🕊️</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                Es importante dejar al niño a su aire. No intentar presionarle para que haga algo en concreto ni corregirle. No moverle piernas o brazos para hacer ritmos ni hacer las cosas por él.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🏃</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                No llamarle si se aleja de vosotros ni ir detrás de él. Mientras su comportamiento no sea molesto para los demás, es bueno dejarle que se mueva libremente. Él regresará al lugar de referencia cuando quiera.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🤍</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                Si un niño comienza a gritar, llorar, correr descontroladamente, lanzar materiales a otros o impide de alguna manera el buen funcionamiento de la clase: no está haciendo nada malo :) Está siendo puro (como son los peques) y tal vez explorando los límites de una actividad tan "lúdica" en la que no siempre es fácil encontrar el límite. En absoluto es motivo para enfadarse con ellos ni significa que no estén disfrutando de la actividad o no puedan hacerlo. Pero sí es importante que en ese momento lo alejéis del tatami o salgáis del aula y después volváis a entrar lo antes posible. 
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🤱</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                Las madres pueden sentirse libres de amamantar a sus hijos cuando quieran.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>👨‍👩‍👧</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                Los niños pueden venir acompañados sólo de un adulto (padre, madre o alguien con quien tenga un vínculo afectivo importante); en cualquier caso, quien asista a clase debe conocer nuestras normas básicas de funcionamiento y participar activamente en la sesión.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🎵</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.5', paddingTop: '8px' }}>
                Participad en todas las actividades hasta el punto en que os sintáis cómodos.
              </p>
            </div>
            
            <div style={{ backgroundColor: '#fff5f5', borderLeft: '4px solid #f56565', padding: '16px', borderRadius: '0 8px 8px 0', marginTop: '16px' }}>
              <strong style={{ color: '#c53030', display: 'block', marginBottom: '12px' }}>⚠️ EN EL AULA NO ESTÁ PERMITIDO:</strong>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#c53030', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>🧸 Que los niños traigan juguetes u objetos personales.</li>
                <li>📸 Hacer grabaciones o fotos.</li>
                <li>📱 Utilizar el teléfono (debe estar en silencio).</li>
                <li>🥪 Comer dentro del aula (los peques sí pueden beber agua dentro del aula, pero no sobre el tatami sino en el lugar que habilitemos para ello).</li>
                <li>🎂 <strong style={{ textDecoration: 'underline' }}>Límite de edad:</strong> Este taller está diseñado exclusivamente para niños y niñas de 0 a 36 meses. No está permitida la asistencia de niños mayores.</li>
              </ul>
            </div>

          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <p style={{ margin: '0 0 24px 0', color: '#64748b', fontWeight: 'bold' }}>
              La inscripción en esta sesión supone la aceptación del funcionamiento y las normas descritas.
            </p>
            <h2 style={{ color: 'var(--color-dark)', fontSize: '1.5rem', margin: '0 0 24px 0', fontFamily: 'var(--font-heading)' }}>
              Elige tu sesión y reserva tu plaza
            </h2>
            
            {activeWorkshops.length === 0 ? (
              <p style={{ margin: '0 0 20px 0', color: '#64748b', fontStyle: 'italic' }}>
                Ahora mismo no hay talleres programados. Síguenos en Instagram para enterarte de los próximos.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto 32px auto' }}>
                {activeWorkshops.map(w => (
                  <a 
                    key={w.id}
                    href={w.stripeLink} 
                    target="_blank"
                    rel="noreferrer"
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      backgroundColor: 'var(--color-cyan)', 
                      color: 'white', 
                      padding: '16px', 
                      borderRadius: '12px', 
                      textDecoration: 'none', 
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px' }}>{w.title}</span>
                    <span style={{ fontSize: '0.9rem', opacity: '0.9' }}>{w.dateText}</span>
                  </a>
                ))}
              </div>
            )}
            
            <Link 
              href="/" 
              style={{ display: 'inline-block', color: 'var(--color-cyan)', textDecoration: 'underline', fontWeight: '500' }}
            >
              Volver al inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
