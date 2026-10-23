import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return NextResponse.json({ error: "Inscripción no encontrada" }, { status: 404 });
    }

    let extra = {};
    try {
      extra = order.shippingData ? JSON.parse(order.shippingData) : {};
    } catch (e) {
      extra = {};
    }

    if (body.notes !== undefined) extra.notes = body.notes;
    if (body.attended !== undefined) extra.attended = body.attended;
    if (body.childName !== undefined) extra.childName = body.childName;
    if (body.childBirthDate !== undefined) extra.childBirthDate = body.childBirthDate;

    const updated = await prisma.order.update({
      where: { id },
      data: {
        shippingData: JSON.stringify(extra),
      },
    });

    return NextResponse.json({ ok: true, order: updated });
  } catch (error) {
    console.error("Error actualizando inscripción de taller:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const isFullGroupDelete = searchParams.get("group") === "1";

    if (isFullGroupDelete) {
      // Borrar el grupo completo del taller y los datos de los peques de esa sesión,
      // conservando intactos los usuarios (User) y sus posibles suscripciones.
      await prisma.order.deleteMany({
        where: {
          productType: "workshop",
          productId: id,
        },
      });
      await prisma.workshop.delete({
        where: { id },
      });
      return NextResponse.json({ ok: true });
    }

    // Borrar una inscripción individual de un peque en el taller (libera 1 plaza)
    const order = await prisma.order.findUnique({ where: { id } });
    if (order) {
      await prisma.order.delete({ where: { id } });
      // Si el taller estaba marcado como completo por llegar a 12, reabrir si baja de 12
      if (order.productId) {
        const remaining = await prisma.order.count({
          where: {
            productType: "workshop",
            productId: order.productId,
            status: "completed",
          },
        });
        if (remaining < 12) {
          await prisma.workshop.updateMany({
            where: { id: order.productId },
            data: { isSoldOut: false },
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando inscripción/grupo de taller:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
