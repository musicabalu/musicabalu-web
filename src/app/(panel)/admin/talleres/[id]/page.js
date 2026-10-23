import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import WorkshopGroupClient from "./WorkshopGroupClient";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function WorkshopGroupPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  const { id } = await params;

  const workshop = await prisma.workshop.findUnique({
    where: { id },
  });

  if (!workshop) return notFound();

  const orders = await prisma.order.findMany({
    where: {
      productType: "workshop",
      productId: id,
      status: "completed",
    },
    include: {
      user: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return <WorkshopGroupClient workshop={workshop} initialOrders={orders} />;
}
