import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import BibliotecaTabs from '@/components/comunidad/BibliotecaTabs';
import Image from 'next/image';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function CalendarioPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      enrollments: {
        where: { status: { in: ['active', 'pending'] } }
      }
    }
  });

  const isPresential = user?.enrollments.length > 0;
  const role = user?.role;

  if (!isPresential && role !== 'admin') {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', padding: '3rem' }}>
        <p>No tienes acceso a esta sección.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <BibliotecaTabs isPresential={isPresential} role={role} />

      <div style={{ 
        background: 'var(--color-bg, #FFFFFF)', 
        border: '1px solid var(--color-border, #E2E8F0)', 
        padding: '2rem', 
        borderRadius: '16px', 
        boxShadow: 'var(--shadow-sm)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Calendario Escolar 2026/2027</h2>
        <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <Image 
            src="/calendario.jpg" 
            alt="Calendario Escolar" 
            width={800} 
            height={1131} 
            layout="responsive" 
          />
        </div>
        <p style={{ marginTop: '1.5rem', color: '#64748b' }}>
          Guarda esta imagen en tu móvil para tener siempre a mano los días lectivos y festivos.
        </p>
      </div>
    </div>
  );
}
