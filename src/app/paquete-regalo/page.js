import fs from 'fs';
import path from 'path';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaqueteRegaloClient from "./PaqueteRegaloClient";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Tu Paquete Regalo de Música en Familia · Musicabalú",
  description: "Desbloquea las 2 canciones y 1 recitado exclusivos incluidos en tu caja de regalo Musicabalú para jugar con los pañuelos, huevos sonoros y saquitos.",
};

export default function PaqueteRegaloPage() {
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
        const fixedUrl = url.startsWith('/') ? url : `/${url}`;
        allTracks.push({
          title: data[url],
          url: fixedUrl,
          type: isCancion ? 'Canción' : 'Recitado',
        });
      }
    });
  } catch (err) {
    console.error('Error leyendo comunidad_titulos.json:', err);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc" }}>
      <Header />
      <main style={{ flex: 1, padding: "30px 16px 80px", maxWidth: "980px", margin: "0 auto", width: "100%" }}>
        <PaqueteRegaloClient allTracks={allTracks} />
      </main>
      <Footer />
    </div>
  );
}
