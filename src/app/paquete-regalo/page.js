import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaqueteRegaloClient from "./PaqueteRegaloClient";

export const metadata = {
  title: "Tu Paquete Regalo de Música en Familia · Musicabalú",
  description: "Desbloquea las 2 canciones y 1 recitado exclusivos incluidos en tu caja de regalo Musicabalú para jugar con los pañuelos, huevos sonoros y saquitos.",
};

export default function PaqueteRegaloPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc" }}>
      <Header />
      <main style={{ flex: 1, padding: "40px 20px 80px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px" }}>Cargando tu paquete de música...</div>}>
          <PaqueteRegaloClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
