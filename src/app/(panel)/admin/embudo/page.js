import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import EmbudoClient from "./EmbudoClient";

export const metadata = {
  title: "Automatización Embudo de Ventas | Musicabalú Admin",
};

export default async function EmbudoAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return <EmbudoClient />;
}
