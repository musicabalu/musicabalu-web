import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only track authenticated users
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }
    
    // Avoid double instantiation issue if Prisma is already caching, 
    // it's fine for small API endpoints
    const body = await req.json();
    const { action, details } = body;
    
    if (!action || !details) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    
    // We get the user ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true }
    });
    
    // Extra safety, don't track superadmin purely navigating 
    // (uncomment if you want to exclude admin tracking)
    // if (user?.role === 'admin') {
    //    return NextResponse.json({ success: true, ignored: true });
    // }
    
    if (user) {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action,
          details
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/logActivity:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
