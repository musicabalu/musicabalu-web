import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function RecuperacionesPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user || (user.role !== 'admin' && !user.hasActiveSub)) {
    redirect('/comunidad');
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-md)', lineHeight: '1.7', color: 'var(--color-text)' }}>
      <h2 style={{ fontSize: '2rem', color: 'var(--color-pink)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-pink-light)', paddingBottom: '0.5rem' }}>
        Política de Recuperación de Clases
      </h2>
      
      <p style={{ fontSize: '1.1rem' }}>
        Como sabéis, en la inscripción viene recogido que:
      </p>
      <ul style={{ fontSize: '1.1rem', margin: '1rem 0 2rem 2rem' }}>
        <li>Las clases en las que falta el alumno <strong>no se recuperan por obligación</strong>.</li>
        <li>Las clases en las que falta el profesor <strong>sí se recuperan</strong> (se ofrecerá fecha).</li>
      </ul>

      <p style={{ fontSize: '1.1rem' }}>
        Dicho esto, si una familia no puede venir y se ha quedado algún hueco de otra familia, <strong>siempre me gusta ofrecer 
        la posibilidad</strong> de que pueda recuperarla en otro turno. Lo que ocurre es que esto no siempre es posible, 
        porque para poder hacerlo es necesario que haya hueco en otro grupo de esa misma semana y que yo lo sepa con antelación.
      </p>

      <h3 style={{ fontSize: '1.5rem', color: 'var(--color-cyan)', marginTop: '2rem' }}>¿Cómo organizarnos?</h3>
      <ol style={{ fontSize: '1.1rem', margin: '1rem 0 2rem 2rem', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
        <li>
          Solicitar venir en otro grupo <strong>debe ser algo puntual</strong>, ya que es importante que los peques vengan habitualmente en el mismo grupo.
        </li>
        <li>
          Cuando sepáis que no vais a asistir, <strong>avisadme con el mayor tiempo posible</strong>. Así podré saber si hay un hueco para otra familia.
        </li>
        <li>
          Si queréis intentar recuperar en otro horario, <strong>yo os apuntaré en una lista de espera por orden de petición</strong>.
        </li>
        <li>
          En cuanto se quede un hueco libre os escribiré para ofrecéroslo. (Tened en cuenta que a veces os avisaré con muy poca antelación, 
          o a lo mejor no os aviso porque esa semana nadie más ha faltado).
        </li>
      </ol>

      <div style={{ background: '#FEF2F2', padding: '1.5rem', borderRadius: '12px', margin: '2rem 0', border: '1px solid #FCA5A5' }}>
        <h4 style={{ color: '#DC2626', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>⚠️ IMPORTANTE</h4>
        <p style={{ margin: '0 0 1rem 0' }}>
          Debido a la cantidad de peques y a que los grupos están completos, <strong>la posible recuperación de una clase se tiene que dar en la MISMA SEMANA</strong> en la que se falta. Si no queda hueco, no se acumula para la siguiente.
        </p>
        <p style={{ margin: '0 0 1rem 0' }}>
          <strong>EXCEPCIÓN GRUPOS DE VIERNES:</strong> Si alguien de los viernes tiene un imprevisto, tiene la opción de recuperar esa clase en un grupo del <strong>martes siguiente</strong>.
        </p>
        <p style={{ margin: 0 }}>
          Si soy yo quien no puede realizar la clase, os pondré un día para recuperarla con tiempo. Aunque la idea es que todos la recuperemos ese día, si no es posible para alguien siempre le daré prioridad para que pueda recuperar en otro grupo.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#F8FAFC', borderRadius: '12px' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-dark)' }}>¿Vas a faltar?</h3>
        <p style={{ marginBottom: '1.5rem' }}>Avísame para entrar en la lista de espera de recuperación (si lo deseas).</p>
        <a 
          href="https://wa.me/34633715302?text=Hola%20Javi,%20esta%20semana%20no%20podremos%20asistir%20a%20clase.%20Por%20favor,%20apúntanos%20en%20la%20lista%20de%20espera%20para%20intentar%20recuperarla.%20¡Gracias!" 
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block', 
            background: '#25D366', 
            color: 'white', 
            padding: '1rem 2rem', 
            borderRadius: '30px', 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            fontSize: '1.1rem',
            boxShadow: '0 4px 6px rgba(37, 211, 102, 0.2)'
          }}
        >
          💬 Avisar por WhatsApp
        </a>
      </div>

      <p style={{ fontSize: '1.1rem', marginTop: '3rem', textAlign: 'center' }}>
        Muchas gracias por vuestra colaboración siempre ❤️🎶
      </p>
    </div>
  );
}
