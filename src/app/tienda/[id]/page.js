import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import ProductDetailClient from "@/components/ProductDetailClient";

const prisma = new PrismaClient();

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product || !product.isActive) {
    notFound();
  }

  // Comprobar si necesita variantes
  const isClothing = product.name.includes("Camiseta") || product.name.includes("Body");

  const formatPrice = (cents) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100);

  const productData = {
    ...product,
    formattedPrice: formatPrice(product.price),
    isClothing
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ flex: 1, padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: "30px" }}>
          <BackButton label="← Volver a la Tienda" />
        </div>
        
        <ProductDetailClient product={productData} />
      </main>

      <Footer />
    </div>
  );
}
