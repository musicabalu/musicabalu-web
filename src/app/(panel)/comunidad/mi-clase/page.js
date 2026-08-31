import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import styles from '../page.module.css';
import BibliotecaTabs from '@/components/comunidad/BibliotecaTabs';

const prisma = new PrismaClient();

export default async function MiClasePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      enrollments: {
        where: { status: { in: ['active', 'pending'] } },
        include: { group: true }
      }
    }
  });

  const enrollment = user?.enrollments[0];
  const isPresential = user?.enrollments.some(e => e.status === 'active' || e.status === 'pending');
  const role = user?.role;

  if (!enrollment) {
    return (
      <div className={styles.fadeInUp} style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <BibliotecaTabs isPresential={isPresential} role={role} />
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <p className={styles.subtitle}>Actualmente no estás matriculado en ningún grupo presencial.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.fadeInUp} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <BibliotecaTabs isPresential={isPresential} role={role} />

      {/* Tarjeta de Información del Grupo */}
      <div style={{ 
        background: 'var(--color-bg, #FFFFFF)', 
        border: '1px solid var(--color-border, #E2E8F0)', 
        padding: '2rem', 
        borderRadius: '16px', 
        marginBottom: '3rem',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-green, #AADB1E)' }} />
        <h2 style={{ color: 'var(--color-dark, #2C3333)', margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: '800' }}>👩‍🏫 Tu Grupo: {enrollment.group.name} {enrollment.group.schedule}</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, color: 'var(--color-text, #4A5568)', fontSize: '1.1rem' }}><strong>🕒 Horario:</strong> {enrollment.group.schedule}</p>
          <p style={{ margin: 0, color: 'var(--color-text, #4A5568)', fontSize: '1.1rem' }}><strong>👶 Peque:</strong> {enrollment.childName}</p>
        </div>
      </div>

      {/* Pautas y Normas de la Clase */}
      <section style={{ 
        background: 'var(--color-bg, #FFFFFF)', 
        padding: '3rem', 
        borderRadius: '16px', 
        boxShadow: 'var(--shadow-sm)', 
        border: '1px solid var(--color-border, #E2E8F0)',
        lineHeight: '1.8', 
        color: 'var(--color-text, #4A5568)',
        fontSize: '1.05rem'
      }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-dark, #2C3333)', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>Queridas familias:</h3>
        
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          Gracias, gracias, gracias por confiar en nuestro proyecto y alimentarlo con vuestro cariño. Os agradezco enormemente la ilusión depositada en nuestras clases y os he preparado alguna información importante para que las sesiones se desarrollen de la mejor manera posible y con el mayor beneficio para los niños:
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>✨</span><span>La <strong>energía</strong> con la que vengáis a las clases marca la diferencia. Si queréis que vuestros peques aprovechen las clases lo mejor posible y vivan con ilusión esta forma de relacionarse con la música, os animo mucho a que seáis los primeros en poner cariño, ilusión y disfrute cada semana. Disfrutad de ese momento y espacio familiar especial y dejaos llevar!</span></li>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>👕</span><span>Os recomiendo venir con ropa cómoda. Las sesiones se realizan <strong>sin calzado</strong>.</span></li>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>🤫</span><span>En nuestras sesiones creamos un <strong>espacio no verbal</strong>. Aunque el disfrute es una máxima en nuestras clases, recordad que estamos trabajando contenidos musicales. Por eso, salvo que sea totalmente necesario, es muy importante tratar de no hablar ni con el niño ni con otros padres y mantener la atención. El habla distrae de la música. Entre todos buscaremos un clima mágico y especial en el que sólo nos comunicaremos musicalmente.</span></li>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>🤝</span><span>Los padres sois responsables del bienestar de los niños en la clase y de que mantengan un comportamiento respetuoso hacia los objetos y los compañeros.</span></li>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>🕊️</span><span>Es importante <strong>dejar al niño a su aire</strong>. No intentar presionarle para que haga algo en concreto ni corregirle. No moverle piernas o brazos para hacer ritmos ni hacer las cosas por él.</span></li>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>🏃</span><span>No llamarle si se aleja de vosotros ni ir detrás de él. Forma parte de un comportamiento habitual que el niño explore el espacio de la clase y que se aleje del regazo de los padres para ganar autonomía. Mientras su comportamiento no sea molesto para los demás, es bueno dejarle que se mueva libremente. Él regresará al lugar de referencia cuando quiera.</span></li>
          <li style={{ display: 'flex', gap: '1rem', background: 'var(--color-bg-alt, #FAFAFA)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border, #E2E8F0)' }}><span style={{ fontSize: '1.25rem' }}>🤍</span><span>Si un niño comienza a gritar, llorar, correr descontroladamente, lanzar materiales a otros o impide de alguna manera el buen funcionamiento de la clase: <strong>no está haciendo nada malo :)</strong> Está siendo puro (como son los peques) y tal vez explorando los límites de una actividad tan "lúdica" en la que no siempre es fácil encontrar el límite. En absoluto es motivo para enfadarse con ellos ni significa que no estén disfrutando de la actividad o no puedan hacerlo. Pero sí es importante que en ese momento lo alejéis del tatami o salgáis del aula y después volváis a entrar lo antes posible. Salir del aula cuando un peque se encuentra así no es ningún castigo ni algo negativo; al contrario, debe servir para que, con cariño y paciencia, le ayudemos a comprender mejor cómo estamos en las clases y a que pueda disfrutarlas realmente. Y aunque no siempre dé resultados inmediatos, considero que le estamos enseñando un camino que se verá reflejado más pronto que tarde.</span></li>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>🤱</span><span>Las madres pueden sentirse libres de amamantar a sus hijos cuando quieran.</span></li>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>👨‍👩‍👧</span><span>Los niños pueden venir acompañados de un adulto (padre, madre o alguien con quien tenga un vínculo afectivo importante); en cualquier caso, quien asista a clase debe conocer nuestras normas básicas de funcionamiento y participar activamente en la sesión.</span></li>
          <li style={{ display: 'flex', gap: '1rem' }}><span style={{ fontSize: '1.25rem' }}>🎵</span><span>Participad en todas las actividades hasta el punto en que os sintáis cómodos.</span></li>
        </ul>

        <div style={{ 
          background: 'var(--color-pink-light, #FDE8EE)', 
          border: '1px solid var(--color-pink, #F4436C)',
          padding: '2rem', 
          borderRadius: '16px',
        }}>
          <h4 style={{ color: 'var(--color-pink, #F4436C)', margin: '0 0 1.25rem 0', fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚠️</span> EN EL AULA NO ESTÁ PERMITIDO:
          </h4>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, color: 'var(--color-dark, #2C3333)', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: '500' }}>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}><span>🧸</span><span>Que los niños traigan juguetes u objetos personales.</span></li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}><span>📸</span><span>Hacer grabaciones o fotos.</span></li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}><span>📱</span><span>Utilizar el teléfono (debe estar en silencio).</span></li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}><span>🥪</span><span>Comer dentro del aula (los peques sí pueden beber agua dentro del aula, pero no sobre el tatami sino en el lugar donde dejamos los bolsos y cosas personales).</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
