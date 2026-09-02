import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import CartelClient from './CartelClient';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AdminCartelPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    redirect('/auth/login');
  }

  const groups = await prisma.group.findMany({
    orderBy: {
      createdAt: 'asc'
    }
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-dark)', marginBottom: '0.5rem' }}>Generador de Cartel WhatsApp</h1>
        <p style={{ color: 'var(--color-text-light)' }}>
          Actualiza el estado de las plazas y genera la imagen para subir a tu perfil o estado de WhatsApp.
        </p>
      </div>

      <CartelClient initialGroups={groups} />
    </div>
  );
}
