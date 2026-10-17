import React from 'react';
import Link from 'next/link';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata = {
  title: 'Talleres de Música en Familia en Murcia | Musicabalú',
  description: 'Inscripción para los talleres musicales en familia (0 a 36 meses) en Murcia.',
};

export const revalidate = 0; // Ensure fresh data on every load

export default async function TalleresPage() {
  const activeWorkshops = await prisma.workshop.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        {/* Cabecera visual con foto real de las sesiones */}
        <div style={{ backgroundColor: 'var(--color-yellow)', padding: '48px 32px 44px', textAlign: 'center' }}>
          <img src="/og-logo.png" alt="Musicabalú Logo" style={{ maxWidth: '76px', marginBottom: '14px', display: 'inline-block', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
          <h1 style={{ color: 'var(--color-dark)', margin: 0, fontSize: 'clamp(1.9rem, 4vw, 2.5rem)', fontFamily: 'var(--font-heading)', lineHeight: '1.2', fontWeight: '900' }}>
            Taller de Música en Familia
          </h1>
          <p style={{ color: '#92400e', fontSize: '1.15rem', marginTop: '12px', marginBottom: '26px', fontWeight: '600', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Una experiencia musical de unos 45 minutos para conectar, disfrutar y aprender jugando.
          </p>

          <div style={{
            maxWidth: '660px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
            border: '4px solid rgba(255, 255, 255, 0.85)'
          }}>
            <img
              src="/imagenes/clases/foto clases 1.jpg"
              alt="Sesión de música en familia en Musicabalú"
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                 objectPosition: 'center 35%',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Contenido y normas */}
        <div style={{ padding: '40px' }}>
          <p style={{ color: '#c53030', fontWeight: 'bold', marginBottom: '24px', backgroundColor: '#fff5f5', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #f56565' }}>
            Límite de edad: Este taller está diseñado exclusivamente para peques de 0 a 36 meses.
          </p>

          <h2 style={{ color: 'var(--color-dark)', fontSize: '1.5rem', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
            Queridas familias:
          </h2>
          <p style={{ margin: '0 0 24px 0', color: '#475569', lineHeight: '1.6' }}>
            Gracias, gracias, gracias por venir a disfrutar con nosotros a este espacio de conexión musical. 
            Os he preparado alguna información importante para que la sesión se desarrolle de la mejor manera posible y con el mayor beneficio y disfrute para los niños.
          </p>

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
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
              <p style={{ margin: 0, color: '#166534', fontWeight: '500' }}>
                🎁 <strong style={{ textDecoration: 'underline' }}>La inscripción a este taller te da acceso a nuestra plataforma web</strong> en la que podrás escuchar algunas de nuestras canciones de estudio, recitados y píldoras formativas desde casa.
              </p>
            </div>

          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '28px 24px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ margin: 0, color: '#b45309', fontSize: '0.95rem', lineHeight: '1.5' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>⚠️ Política de Cancelación:</strong>
                En caso de no asistir finalmente, el dinero no se devuelve bajo ninguna circunstancia salvo que haya un justificante médico y se haya avisado con al menos 24 horas de antelación al inicio de la sesión para poder ofrecer la plaza a otra familia.
              </p>
            </div>
            
            <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '0.92rem', lineHeight: '1.55' }}>
              <strong>La inscripción en esta sesión supone la aceptación del funcionamiento, las normas descritas y nuestra <Link href="/legal/privacidad" target="_blank" style={{ color: 'var(--color-cyan)', textDecoration: 'underline' }}>Política de Privacidad</Link>.</strong> Te enviaremos por correo electrónico tu acceso a la plataforma web y las novedades o próximos talleres de Musicabalú (podrás darte de baja de estas comunicaciones en cualquier momento con un solo clic).
            </p>
            <h2 style={{ color: 'var(--color-dark)', fontSize: '1.5rem', margin: '0 0 24px 0', fontFamily: 'var(--font-heading)' }}>
              Elige tu sesión y reserva tu plaza
            </h2>
            
            {activeWorkshops.length === 0 ? (
              <p style={{ margin: '0 0 20px 0', color: '#64748b', fontStyle: 'italic' }}>
                Ahora mismo no hay talleres programados. Síguenos en Instagram para enterarte de los próximos.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '560px', margin: '0 auto 32px auto' }}>
                {activeWorkshops.map(w => {
                  const parts = (w.dateText || '').split('|').map(s => s.trim());
                  const schedulePart = parts[0] || w.dateText;
                  const addressPart = parts[1] || null;

                  if (w.isSoldOut) {
                    return (
                      <a 
                        key={w.id}
                        href={`https://wa.me/34633715302?text=Hola%20Musicabalú,%20quería%20apuntarme%20a%20la%20lista%20de%20espera%20del%20taller%20${encodeURIComponent(w.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          backgroundColor: '#f1f5f9', 
                          color: '#64748b', 
                          padding: '18px 20px', 
                          borderRadius: '14px', 
                          textDecoration: 'none', 
                          border: '2px dashed #cbd5e1',
                          transition: 'transform 0.2s',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{ fontWeight: '800', fontSize: '1.12rem', marginBottom: '6px', textDecoration: 'line-through', color: '#94a3b8' }}>{w.title}</span>
                        <span style={{ fontSize: '0.95rem', marginBottom: addressPart ? '4px' : '10px', color: '#94a3b8' }}>🗓️ {schedulePart}</span>
                        {addressPart && (
                          <span style={{ fontSize: '0.88rem', marginBottom: '10px', color: '#94a3b8' }}>{addressPart}</span>
                        )}
                        <span style={{ backgroundColor: '#e2e8f0', color: '#475569', padding: '5px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>Taller Completo - Apuntarse a la lista de espera</span>
                      </a>
                    );
                  }
                  
                  return (
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
                        padding: '18px 20px', 
                        borderRadius: '14px', 
                        textDecoration: 'none', 
                        boxShadow: '0 6px 14px rgba(0, 178, 227, 0.22)',
                        transition: 'transform 0.2s',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontWeight: '800', fontSize: '1.15rem', marginBottom: '6px' }}>{w.title}</span>
                      <span style={{ fontSize: '0.96rem', fontWeight: '600', marginBottom: addressPart ? '4px' : '10px' }}>🗓️ {schedulePart}</span>
                      {addressPart && (
                        <span style={{ fontSize: '0.88rem', opacity: '0.95', marginBottom: '12px' }}>{addressPart}</span>
                      )}
                      <span style={{
                        backgroundColor: 'white',
                        color: 'var(--color-dark)',
                        padding: '6px 16px',
                        borderRadius: '999px',
                        fontSize: '0.88rem',
                        fontWeight: '800',
                        marginTop: '2px'
                      }}>
                        Reservar plaza →
                      </span>
                    </a>
                  );
                })}
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
