import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';
import PillCard from '@/components/comunidad/PillCard';
import VideoPlaylist from '@/components/comunidad/VideoPlaylist';
import styles from './page.module.css';
import BibliotecaTabs from '@/components/comunidad/BibliotecaTabs';
import { VIDEO_PILLS } from '@/data/videoPills';

const prisma = new PrismaClient();

export default async function PildorasPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { enrollments: { where: { status: { in: ['active', 'pending'] } } } }
  });

  const hasFullAccess = user?.hasActiveSub || user?.enrollments.some(e => e.status === 'active') || user?.role === 'admin';
  const isPresential = user?.enrollments.some(e => e.status === 'active' || e.status === 'pending');
  const role = user?.role;

  const pills = await prisma.contentPill.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <BibliotecaTabs isPresential={isPresential} role={role} />

      <div style={{ paddingBottom: '120px', marginTop: '2rem' }}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'white', borderRadius: '16px', border: '2px dashed var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '3rem' }}>🚧</span>
          <h2 style={{ marginTop: '1rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>Lo tenemos casi a punto</h2>
          <p style={{ color: 'var(--color-text-light)', marginTop: '0.5rem', fontSize: '1.1rem' }}>Enseguida lo tendrás disponible.</p>
        </div>
      </div>
    </div>
  );
}
