import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';
import BibliotecaTabs from '@/components/comunidad/BibliotecaTabs';
import VideoPlaylist from '@/components/comunidad/VideoPlaylist';
import { VIDEO_PILLS } from '@/data/videoPills';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

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

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <BibliotecaTabs isPresential={isPresential} role={role} />

      <div style={{ paddingBottom: '120px', marginTop: '1.5rem' }}>
        <VideoPlaylist pills={VIDEO_PILLS} hasFullAccess={hasFullAccess} />
      </div>
    </div>
  );
}
