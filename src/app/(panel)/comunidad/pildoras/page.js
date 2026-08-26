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

      {/* Píldoras en Vídeo */}
      <h2 style={{ color: 'var(--color-dark)', marginTop: '2rem', marginBottom: '1.5rem', fontSize: '1.8rem', fontWeight: '800' }}>
        Píldoras en Vídeo
      </h2>
      <VideoPlaylist pills={VIDEO_PILLS} hasFullAccess={hasFullAccess} />

      {/* Píldoras de Texto (Antiguas o base de datos) */}
      {pills.length > 0 && (
        <>
          <h2 style={{ color: 'var(--color-primary)', marginTop: '3rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            Textos y Referencias MLT
          </h2>
          <div className={styles.grid}>
            {pills.map(pill => (
              <PillCard key={pill.id} pill={pill} hasFullAccess={hasFullAccess} />
            ))}
          </div>
        </>
      )}

      {/* Sugerencias CTA */}
      <div style={{ marginTop: '4rem', marginBottom: '2rem', padding: '2rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: '12px', textAlign: 'center', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
        <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
          ¿Te gustaría que tratáramos algún tema en especial en esta sección?<br/>
          Envíanos tus dudas o sugerencias a <a href="mailto:musicabalu@gmail.com" className="link-cyan">musicabalu@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
