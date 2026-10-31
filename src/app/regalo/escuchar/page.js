import fs from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegaloEscucharClient from '@/components/regalo/RegaloEscucharClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tus 4 Audios de Regalo | Musicabalú',
  description: 'Escucha tus 2 canciones y 2 recitados de Musicabalú directamente en tu móvil o tablet. Música respetuosa y sin pantallas basada en la metodología MLT de Edwin Gordon.',
};

export default function RegaloEscucharPage() {
  const titulosPath = path.join(process.cwd(), 'public', 'audios', 'comunidad_titulos.json');
  const allTracks = [];

  try {
    const fileContents = fs.readFileSync(titulosPath, 'utf8');
    const data = JSON.parse(fileContents);

    // Mantener el orden exacto del archivo
    const keysInOrder = Array.from(fileContents.matchAll(/"([^"]+)"\s*:/g)).map(m => m[1]);

    keysInOrder.forEach((url) => {
      if (data[url]) {
        const isCancion = url.includes('canciones/');
        allTracks.push({
          title: data[url],
          url,
          type: isCancion ? 'Canción' : 'Recitado',
        });
      }
    });
  } catch (err) {
    console.error('Error leyendo comunidad_titulos.json:', err);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fcfcfd' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <RegaloEscucharClient allTracks={allTracks} />
      </main>
      <Footer />
    </div>
  );
}
