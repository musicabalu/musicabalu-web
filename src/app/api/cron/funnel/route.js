import { NextResponse } from "next/server";
import { processFunnel } from "@/lib/funnelEngine";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request) {
  try {
    // Si hay un CRON_SECRET configurado, verificarlo
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      const url = new URL(request.url);
      const key = url.searchParams.get("key");
      if (key !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    console.log("⏱️ [Cron] Ejecutando procesamiento diario del embudo...");
    const result = await processFunnel({ sendNow: true });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    });
  } catch (error) {
    console.error("❌ [Cron] Error en cron de embudo:", error);
    return NextResponse.json(
      { error: "Error procesando cron de embudo", details: error.message },
      { status: 500 }
    );
  }
}
