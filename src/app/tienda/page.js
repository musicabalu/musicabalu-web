import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PrismaClient } from "@prisma/client";
import ProductCard from "@/components/ProductCard";
const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function Tienda() {
  const dbProducts = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  const formatPrice = (cents) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100);

  const getColor = (type) => {
    if (type === "subscription") return "var(--color-cyan)";
    if (type === "gift") return "var(--color-pink)";
    if (type === "physical_kit") return "var(--color-yellow)";
    if (type === "digital") return "var(--color-cyan)";
    return "var(--color-text-light)";
  };

  const getLabel = (type) => {
    if (type === "subscription") return "Suscripción";
    if (type === "gift") return "Tarjeta Regalo";
    if (type === "physical_kit") return "Físico";
    if (type === "digital") return "Digital";
    return "Merchandising";
  };

  const productos = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.type === 'printful_merch' ? "" : (p.description || ""),
    price: formatPrice(p.price),
    type: getLabel(p.type),
    emoji: p.imageUrl,
    color: getColor(p.type),
  }));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, padding: "60px 20px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "2.5rem", color: "var(--color-dark)", marginBottom: "15px" }}>
            Tienda Oficial
          </h1>
          <p style={{ color: "var(--color-text-light)", maxWidth: "600px", margin: "0 auto 30px", fontSize: "1.1rem" }}>
            Materiales pedagógicos, descargables y merchandising para llevar la experiencia Musicabalú a tu casa.
          </p>
          <div style={{ backgroundColor: 'var(--color-cyan-light)', color: 'var(--color-dark)', padding: '10px 20px', borderRadius: '30px', display: 'inline-block', fontSize: '0.9rem', border: '1px solid var(--color-cyan)' }}>
            🚚 Los gastos de envío (4,90€) para productos físicos se añadirán al finalizar tu compra.
          </div>


        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
        }}>
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
