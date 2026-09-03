import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { enrollments: true, orders: true },
  });

  const isPresential = user?.enrollments.some(e => e.status === 'active' || e.status === 'pending');
  const hasActiveSub = user?.hasActiveSub;
  const isB2B = user?.role === 'educador' || user?.role === 'admin';

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      {/* Cabecera */}
      <div style={{ marginBottom: "40px", paddingBottom: "24px", borderBottom: "2px solid var(--color-border)" }}>
        {params?.success === 'true' && (
          <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #bbf7d0' }}>
            <strong style={{ fontSize: '1.1rem' }}>¡Compra completada con éxito! 🎉</strong><br/><br/>
            Acabamos de enviarte un email con la confirmación. Tu pedido aparecerá en tu historial de compras y, si has adquirido una suscripción, ya tienes acceso a los contenidos desbloqueados.
          </div>
        )}
        <p style={{ color: "var(--color-text-light)", marginBottom: "6px", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Panel personal
        </p>
        <h1 style={{ fontSize: "2rem", color: "var(--color-dark)" }}>
          Hola, {user.name || user.email.split("@")[0]} 👋
        </h1>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
      }}>

        {user?.role === 'admin' ? (
          <>
            {/* 1. Comunidad Musicabalú (Admin) */}
            <Link href="/comunidad/mi-clase" style={{ textDecoration: 'none' }}>
              <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-pink)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                  🧸 Comunidad Musicabalú
                </h2>
                <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Acceso a todas las clases, canciones y recursos.
                </p>
              </section>
            </Link>

            {/* 2. Mis Formaciones (Admin) */}
            <Link href="/formaciones/plataforma" style={{ textDecoration: 'none' }}>
              <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid #d97706", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                  🎓 Mis Formaciones
                </h2>
                <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Módulos y recursos para educadores.
                </p>
              </section>
            </Link>

            {/* 3. Administrador (Admin) */}
            <Link href="/admin" style={{ textDecoration: 'none' }}>
              <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-dark)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                  ⚙️ Administrador
                </h2>
                <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Panel de control, inscripciones y grupos.
                </p>
              </section>
            </Link>

            {/* 4. Cronograma (Admin) */}
            <Link href="/admin/cronograma" style={{ textDecoration: 'none' }}>
              <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-cyan)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                  📅 Cronograma
                </h2>
                <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Planificación de tareas y objetivos.
                </p>
              </section>
            </Link>

            {/* 5. Plan Estratégico (Admin) */}
            <Link href="/admin/estrategia" style={{ textDecoration: 'none' }}>
              <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-green)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                  📈 Plan Estratégico
                </h2>
                <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Documento maestro y hojas de ruta.
                </p>
              </section>
            </Link>
            
            {/* 6. Auditoría (Admin) */}
            <Link href="/admin/auditoria" style={{ textDecoration: 'none' }}>
              <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-text-light)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                  🧹 Auditoría
                </h2>
                <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Mantenimiento de bases de datos.
                </p>
              </section>
            </Link>
          </>
        ) : (
          <>
            {/* 1. Mi Clase (Solo presenciales) */}
            {isPresential && (
              <>
                <Link href="/comunidad/mi-clase" style={{ textDecoration: 'none' }}>
                  <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-green)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                    <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                      👩‍🏫 Mi Clase
                    </h2>
                    <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                      Información y pautas de tu grupo presencial.
                    </p>
                  </section>
                </Link>

                {/* 1.5 Calendario (Solo presenciales) */}
                <Link href="/comunidad/calendario" style={{ textDecoration: 'none' }}>
                  <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-yellow)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                    <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                      📅 Calendario
                    </h2>
                    <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                      Calendario escolar del curso actual.
                    </p>
                  </section>
                </Link>
              </>
            )}

            {/* Sección Comunidad (Solo visible si tienen acceso activo o presencial) */}
            {(hasActiveSub || isPresential) && (
              <>
                {/* 2. Canciones */}
                <Link href="/comunidad/canciones" style={{ textDecoration: 'none' }}>
                  <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-pink)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                    <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", justifyContent: 'space-between', color: "var(--color-dark)" }}>
                      <span>🎵 Canciones</span>
                    </h2>
                    <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                      Música para cantar y bailar en familia.
                    </p>
                  </section>
                </Link>

                {/* 3. Recitados */}
                <Link href="/comunidad/recitados" style={{ textDecoration: 'none' }}>
                  <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-cyan)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                    <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", justifyContent: 'space-between', color: "var(--color-dark)" }}>
                      <span>🗣️ Recitados</span>
                    </h2>
                    <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                      Juegos rítmicos y vocales sin melodía.
                    </p>
                  </section>
                </Link>

                {/* 4. Píldoras y FAQs */}
                <Link href="/comunidad/pildoras" style={{ textDecoration: 'none' }}>
                  <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-yellow)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                    <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", justifyContent: 'space-between', color: "var(--color-dark)" }}>
                      <span>💊 Píldoras y FAQs</span>
                    </h2>
                    <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                      Respuestas rápidas y consejos prácticos.
                    </p>
                  </section>
                </Link>
              </>
            )}

            {/* 5. Formaciones (B2B) */}
            {isB2B && (
              <Link href="/formaciones/plataforma" style={{ textDecoration: 'none' }}>
                <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid #d97706", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                  <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                    🎓 Mis Formaciones
                  </h2>
                  <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    Acceso a los módulos y recursos para educadores.
                  </p>
                </section>
              </Link>
            )}

            {/* 6. Historial de compras (Oculto hasta 1 Octubre) 
            <Link href="/dashboard/compras" style={{ textDecoration: 'none' }}>
              <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-text-light)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
                <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                  📦 Mi Historial
                </h2>
                <div style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  {user.orders.length > 0 || user.enrollments.length > 0 ? (
                    <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--color-dark)' }}>
                      {user.orders.length > 0 && <li>{user.orders.length} compra(s) en la tienda.</li>}
                      {user.enrollments.length > 0 && <li>{user.enrollments.length} inscripción(es) a clases.</li>}
                    </ul>
                  ) : (
                    <p style={{ margin: 0 }}>Aún no tienes compras ni inscripciones registradas.</p>
                  )}
                </div>
              </section>
            </Link>
            {/* 7. Mensaje para usuarios sin acceso (Cuenta gratuita / Sin clase presencial) */}
            {!isPresential && !hasActiveSub && !isB2B && (
              <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-cyan)", height: '100%' }}>
                <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
                  🧸 La Comunidad Musicabalú
                </h2>
                <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  ¡Hola! Tu cuenta está lista, pero en estos momentos estamos preparando los últimos detalles de nuestra plataforma digital. 
                  Muy pronto abriremos las suscripciones para que puedas disfrutar de toda nuestra música y recursos pedagógicos desde casa.
                </p>
                <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#edf2f7', borderRadius: '8px', fontSize: '0.85rem', color: '#4a5568', textAlign: 'center' }}>
                  ⏳ Próximamente...
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
