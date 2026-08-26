import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import fs from 'fs';
import path from 'path';
import styles from '../page.module.css';
import AudioList from '@/components/comunidad/AudioList';
import BibliotecaTabs from '@/components/comunidad/BibliotecaTabs';

const prisma = new PrismaClient();

export default async function RecitadosPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { enrollments: { where: { status: { in: ['active', 'pending'] } } } }
  });

  const hasFullAccess = user?.hasActiveSub || user?.enrollments.some(e => e.status === 'active') || user?.role === 'admin';
  const isPresential = user?.enrollments.some(e => e.status === 'active' || e.status === 'pending');
  const role = user?.role;

  // Leer el titulos.json
  const titulosPath = path.join(process.cwd(), 'public', 'audios', 'titulos.json');
  let tracks = [];

  try {
    const fileContents = fs.readFileSync(titulosPath, 'utf8');
    const data = JSON.parse(fileContents);

    // Filtrar solo recitados
    Object.entries(data).forEach(([url, title]) => {
      if (url.includes('recitados/')) {
        tracks.push({ title, url, type: 'Recitado' });
      }
    });
  } catch (error) {
    console.error("Error leyendo titulos.json:", error);
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <BibliotecaTabs isPresential={isPresential} role={role} />

      <div style={{ paddingBottom: '120px' }}>
        <AudioList tracks={tracks} hasFullAccess={hasFullAccess} />
      </div>
    </div>
  );
}
