import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { enrollmentId, attendanceData } = await req.json();

    if (!enrollmentId || !attendanceData) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { attendanceData }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al actualizar asistencia:", error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
