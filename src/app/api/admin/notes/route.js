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

    const notes = await prisma.adminNote.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { title, category, content } = await req.json();

    const newNote = await prisma.adminNote.create({
      data: {
        title,
        category: category || "General",
        content: content || ""
      }
    });

    return NextResponse.json({ success: true, note: newNote });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { id, title, category, content } = await req.json();
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (content !== undefined) updateData.content = content;

    const updatedNote = await prisma.adminNote.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, note: updatedNote });
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });
    }

    await prisma.adminNote.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Nota eliminada' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
