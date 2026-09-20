import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import ClientLayout from "./ClientLayout";

const prisma = new PrismaClient();

export default async function PanelServerLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { enrollments: true },
  });

  const isAdmin = user?.role === 'admin';
  const hasFullAccess = isAdmin || user?.hasActiveSub || user?.enrollments.some(e => e.status === 'active');
  const isPresential = isAdmin || user?.enrollments.some(e => e.status === 'active' || e.status === 'pending');

  return (
    <ClientLayout user={session.user} hasFullAccess={hasFullAccess} isPresential={isPresential} role={user?.role}>
      {children}
    </ClientLayout>
  );
}
