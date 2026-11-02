import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TallerReservaClient from "./TallerReservaClient";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reserva de Plaza - Taller de Música en Familia | Musicabalú",
  description: "Formulario de confirmación y reserva de plaza para talleres de música en familia de Musicabalú.",
  robots: "noindex, nofollow", // Página privada para enlaces directos
};

export default async function TallerReservaPage() {
  const workshops = await prisma.workshop.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  const workshopOrders = await prisma.order.findMany({
    where: {
      productType: "workshop",
      status: "completed",
    },
    select: { productId: true },
  });

  const countByWorkshopId = {};
  for (const o of workshopOrders) {
    countByWorkshopId[o.productId] = (countByWorkshopId[o.productId] || 0) + 1;
  }

  const workshopsWithStatus = workshops.map((w) => {
    const sold = countByWorkshopId[w.id] || 0;
    const isFull = w.isSoldOut || sold >= 10;
    return {
      ...w,
      soldCount: sold,
      isFull,
    };
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px" }}>Cargando formulario...</div>}>
          <TallerReservaClient workshops={workshopsWithStatus} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
