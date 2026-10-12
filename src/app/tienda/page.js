import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PrismaClient } from "@prisma/client";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function Tienda() {
  const session = await getServerSession(authOptions);
  let hasFullAccess = false;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { enrollments: { where: { status: 'active' } } }
    });
    hasFullAccess = user?.hasActiveSub || (user?.enrollments && user.enrollments.length > 0) || user?.role === 'admin';
  }

  const dbProducts = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });

  const formatPrice = (cents) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100);

  const getColor = (type) => {
    if (type === "subscription") return "var(--color-cyan)";
    if (type === "gift") return "var(--color-pink)";
    return "var(--color-text-light)";
  };

  const getLabel = (type) => {
    if (type === "subscription") return "Suscripción Digital";
    if (type === "gift") return "Tarjeta Regalo";
    return "Digital";
  };

  const productos = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description || "",
    price: formatPrice(p.price),
    rawPrice: p.price,
    type: getLabel(p.type),
    isSubscription: p.type === "subscription",
    emoji: p.imageUrl || "🎵",
    color: getColor(p.type),
    hasFullAccess,
  }));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, padding: "50px 20px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* Banner si el usuario ya tiene acceso completo */}
        {hasFullAccess && (
          <div style={{
            backgroundColor: "#f0fdf4",
            border: "2px solid #86efac",
            borderRadius: "20px",
            padding: "24px 30px",
            textAlign: "center",
            maxWidth: "750px",
            margin: "0 auto 40px",
            boxShadow: "0 4px 20px rgba(34, 197, 94, 0.12)"
          }}>
            <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "8px" }}>🎉</span>
            <h2 style={{ color: "#166534", fontSize: "1.35rem", fontWeight: "800", marginBottom: "6px", fontFamily: "var(--font-heading)" }}>
              ¡Ya formas parte de la Comunidad Musicabalú!
            </h2>
            <p style={{ color: "#15803d", fontSize: "0.98rem", lineHeight: "1.5", margin: "0 0 18px" }}>
              Tu cuenta tiene acceso completo e ilimitado a todas nuestras canciones, recitados y píldoras en vídeo incluido con tus clases presenciales o tu suscripción activa.
            </p>
            <Link 
              href="/comunidad/canciones" 
              className="btn btn-cyan" 
              style={{ padding: "10px 26px", fontWeight: "700", textDecoration: "none", display: "inline-block" }}
            >
              Ir a mi Biblioteca de Canciones 🎵
            </Link>
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ 
            display: "inline-block", 
            padding: "6px 16px", 
            backgroundColor: "rgba(0, 178, 227, 0.12)", 
            color: "var(--color-cyan, #00B2E3)", 
            borderRadius: "20px", 
            fontSize: "0.85rem", 
            fontWeight: "700", 
            marginBottom: "15px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Plataforma Online Musicabalú
          </span>
          <h1 style={{ fontSize: "2.5rem", color: "var(--color-dark)", marginBottom: "15px", fontFamily: "var(--font-heading)", fontWeight: "800" }}>
            Únete a la Comunidad Familiar
          </h1>
          <p style={{ color: "var(--color-text-light)", maxWidth: "620px", margin: "0 auto 25px", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Todas nuestras canciones originales, recitados pedagógicos y píldoras en vídeo para acompañar el desarrollo musical de tu bebé desde casa.
          </p>

          <div style={{ 
            backgroundColor: "#fffbeb", 
            color: "#92400e", 
            padding: "12px 24px", 
            borderRadius: "30px", 
            display: "inline-block", 
            fontSize: "0.92rem", 
            border: "1.5px solid #fde68a",
            fontWeight: "600",
            boxShadow: "0 2px 8px rgba(245, 158, 11, 0.1)"
          }}>
            ✨ <strong>Precio Especial Fundadores:</strong> Se congela tu cuota para siempre mientras mantengas tu suscripción.
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          maxWidth: "850px",
          margin: "0 auto"
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
