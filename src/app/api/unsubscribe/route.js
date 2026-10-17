import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyUnsubscribeToken } from "@/lib/emailUnsubscribe";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, token } = await request.json();
    const normalizedEmail = (email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    if (!verifyUnsubscribeToken(normalizedEmail, token)) {
      return NextResponse.json({ error: "Enlace de baja no válido" }, { status: 403 });
    }

    // 1. Si tiene inscripción en clases presenciales, desmarcar acceptedComms
    await prisma.enrollment.updateMany({
      where: {
        email: {
          equals: normalizedEmail,
          mode: "insensitive",
        },
      },
      data: {
        acceptedComms: false,
      },
    });

    // 2. Guardar registro en AdminNote (categoría EmailBaja) para cubrir también suscriptores de 3,90€/39€
    const existing = await prisma.adminNote.findFirst({
      where: {
        category: "EmailBaja",
        title: normalizedEmail,
      },
    });

    if (!existing) {
      await prisma.adminNote.create({
        data: {
          category: "EmailBaja",
          title: normalizedEmail,
          content: `Baja automática de boletines semanales solicitada el ${new Date().toLocaleString("es-ES")}`,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al procesar baja de email:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
