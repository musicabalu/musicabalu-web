import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product || !product.isActive) {
    notFound();
  }

  let hasFullAccess = false;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { enrollments: { where: { status: 'active' } } }
    });
    hasFullAccess = user?.hasActiveSub || (user?.enrollments && user.enrollments.length > 0) || user?.role === 'admin';
  }

  const formatPrice = (cents) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100);

  const productData = {
    ...product,
    formattedPrice: formatPrice(product.price),
    hasFullAccess,
    isClothing: false
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ flex: 1, padding: "40px 20px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: "30px" }}>
          <BackButton label="← Volver a la Tienda" />
        </div>
        
        <ProductDetailClient product={productData} />
      </main>

      <Footer />
    </div>
  );
}
