import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PlataformaLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "educador" && session.user.role !== "admin")) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{
          backgroundColor: "var(--color-pink-light)",
          padding: "40px",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "500px",
          border: "1px solid var(--color-pink)"
        }}>
          <h1 style={{ color: "var(--color-pink)", marginBottom: "15px" }}>Acceso Restringido</h1>
          <p style={{ color: "var(--color-dark)", marginBottom: "20px" }}>
            Tu cuenta ({session?.user?.email}) no tiene acceso a la plataforma privada para educadores.
            Si ya realizaste la formación, contáctanos para activar tu acceso.
          </p>
          <a href="/dashboard" className="btn btn-pink">
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  return children;
}
