import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json().catch(() => ({}));
    const { action, details, email } = body;

    const targetEmail = session?.user?.email || (email ? email.trim().toLowerCase() : null);

    if (!targetEmail || !action) {
      return NextResponse.json({ error: 'Unauthorized or missing action' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: targetEmail } });

    if (user) {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action,
          details: details || null,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging activity:', error);
    return NextResponse.json({ error: 'Failed to log activity' }, { status: 500 });
  }
}
