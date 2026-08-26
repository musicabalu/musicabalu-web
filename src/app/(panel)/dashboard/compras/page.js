import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ComprasPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' }
      },
      enrollments: {
        include: { group: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
          ← Volver al panel
        </Link>
      </div>
      <div style={{ marginBottom: "40px", paddingBottom: "24px", borderBottom: "2px solid var(--color-border)" }}>
        <h1 style={{ fontSize: "2rem", color: "var(--color-dark)", marginBottom: "8px" }}>
          Mi Historial Completo
        </h1>
        <p style={{ color: "var(--color-text-light)" }}>
          Aquí puedes consultar el detalle de todas tus compras físicas, digitales e inscripciones presenciales.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛍️ Pedidos de la Tienda
          </h2>
          {user.orders.length === 0 ? (
            <p style={{ color: 'var(--color-text-light)', fontStyle: 'italic', backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px dashed var(--color-border)' }}>
              No hay compras registradas en la tienda.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {user.orders.map(order => (
                <div key={order.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--color-cyan)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--color-dark)' }}>{order.productName}</strong>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-cyan)' }}>{(order.amountTotal / 100).toFixed(2)} €</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: '1.6' }}>
                    📅 Fecha: {new Date(order.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    <br />
                    📦 Estado del pedido: Confirmado y procesando
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏫 Inscripciones a Clases
          </h2>
          {user.enrollments.length === 0 ? (
            <p style={{ color: 'var(--color-text-light)', fontStyle: 'italic', backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px dashed var(--color-border)' }}>
              No hay inscripciones a clases registradas.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {user.enrollments.map(enrollment => (
                <div key={enrollment.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--color-pink)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--color-dark)' }}>Alumno/a: {enrollment.childName}</strong>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-pink)' }}>
                      {enrollment.status === 'active' ? '✅ Activa' : '⏳ Pendiente'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: '1.6' }}>
                    🎓 Grupo: <strong>{enrollment.group?.name || 'Asignando...'}</strong>
                    <br />
                    📅 Fecha de inscripción: {new Date(enrollment.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    <br />
                    💳 Método de pago: {enrollment.paymentMethod === 'stripe' ? 'Stripe (Automático)' : 'Efectivo/Transferencia'} ({enrollment.paymentFrequency})
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
