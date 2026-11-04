import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { processFunnel } from "@/lib/funnelEngine";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Solo vista previa (sendNow: false)
    const preview = await processFunnel({ sendNow: false });
    return NextResponse.json(preview);
  } catch (error) {
    console.error("Error obteniendo estado del embudo:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Ejecución real
    const result = await processFunnel({ sendNow: true });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error ejecutando envíos del embudo:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
