import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminServerLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Redirigir a login si no hay sesión
  if (!session) {
    redirect("/login");
  }

  // Redirigir a comunidad (u otra ruta segura) si no es admin
  if (session.user.role !== "admin") {
    redirect("/comunidad");
  }

  return (
    <>
      {children}
    </>
  );
}
