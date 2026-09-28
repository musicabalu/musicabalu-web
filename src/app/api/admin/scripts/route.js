import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const scripts = await prisma.videoScript.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ success: true, scripts });
  } catch (error) {
    console.error('Error fetching scripts:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const data = await req.json();

    if (Array.isArray(data.reorder)) {
      // Reorder batch update
      // data.reorder format: [{ id: '...', order: 1 }, { id: '...', order: 2 }]
      const updates = data.reorder.map((item) =>
        prisma.videoScript.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      );
      await prisma.$transaction(updates);
      return NextResponse.json({ success: true, message: 'Orden actualizado' });
    } else if (data.id && data.status) {
      // Update single status
      await prisma.videoScript.update({
        where: { id: data.id },
        data: { status: data.status }
      });
      return NextResponse.json({ success: true, message: 'Estado actualizado' });
    } else {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating scripts:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
