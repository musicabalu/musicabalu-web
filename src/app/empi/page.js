import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EmpiLandingClient from "./EmpiLandingClient";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Familias EMPI · Entorno Musicabalú en el Aula",
  description: "Ventaja exclusiva para familias de Escuela Infantil EMPI: suscríbete a la plataforma Musicabalú por 29 €/año y lleva la música viva de su aula a casa.",
  openGraph: {
    title: "Familias EMPI · Entorno Musicabalú en el Aula",
    description: "Ventaja exclusiva para familias de Escuela Infantil EMPI: suscripción anual bonificada a 29 €/año (cupón EMPI2026).",
    url: "https://musicabalu.com/empi",
  },
};

export default async function EmpiLandingPage() {
  const session = await getServerSession(authOptions);
  let hasFullAccess = false;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { enrollments: { where: { status: "active" } } },
    });
    hasFullAccess =
      user?.hasActiveSub ||
      (user?.enrollments && user.enrollments.length > 0) ||
      user?.role === "admin";
  }

  // Buscar el producto de suscripción
  const subProduct = await prisma.product.findFirst({
    where: { type: "subscription", isActive: true },
    orderBy: { price: "asc" },
  });

  const productData = subProduct
    ? {
        id: subProduct.id,
        name: subProduct.name,
        price: subProduct.price,
        description: subProduct.description || "",
        type: subProduct.type,
      }
    : {
        id: "sub_anual",
        name: "Suscripción Comunidad Familiar (Anual)",
        price: 2900,
        description: "Acceso completo a la plataforma digital Musicabalú",
        type: "subscription",
      };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <EmpiLandingClient product={productData} hasFullAccess={hasFullAccess} />
      </main>
      <Footer />
    </div>
  );
}
