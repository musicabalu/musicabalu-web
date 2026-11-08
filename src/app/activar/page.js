import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivarClient from "./ActivarClient";

export const metadata = {
  title: "Activar Vale Regalo · Musicabalú",
  description: "Activa tu tarjeta regalo de la suscripción anual a la Comunidad Musicabalú y empieza a disfrutar de la música en familia.",
};

export default function ActivarPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc" }}>
      <Header />
      <main style={{ flex: 1, padding: "40px 20px 80px", maxWidth: "680px", margin: "0 auto", width: "100%" }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px" }}>Cargando formulario...</div>}>
          <ActivarClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
