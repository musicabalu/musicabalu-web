import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    // Opcional: si quisieras borrar también el usuario si no tiene más cosas, podrías hacerlo, 
    // pero de momento borramos solo la inscripción
    await prisma.enrollment.delete({
      where: { id: id }
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const data = await req.json();
    const updateData = {};
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.groupId !== undefined) updateData.groupId = data.groupId;
    if (data.isEmpi !== undefined) updateData.isEmpi = data.isEmpi;
    if (data.paymentMethod !== undefined) updateData.paymentMethod = data.paymentMethod;
    if (data.paymentFrequency !== undefined) updateData.paymentFrequency = data.paymentFrequency;

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: id },
      data: updateData
    });

    revalidatePath('/admin', 'layout');

    return NextResponse.json({ success: true, enrollment: updatedEnrollment });
    
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
