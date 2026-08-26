import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      where: {
        NOT: {
          name: {
            contains: 'prueba',
            mode: 'insensitive'
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Si no hay grupos, devolvemos algunos grupos mock (para desarrollo)
    if (groups.length === 0) {
      return NextResponse.json([
        { id: '1', name: 'Bebés (0 a 3 años)', schedule: 'Martes 16:30-17:15', capacity: 12 },
        { id: '2', name: 'Bebés (0 a 3 años)', schedule: 'Martes 17:30-18:15', capacity: 12 },
        { id: '3', name: 'Bebés (0 a 3 años)', schedule: 'Martes 18:30-19:15', capacity: 12 },
        { id: '4', name: 'Bebés (0 a 3 años)', schedule: 'Jueves 16:30-17:15', capacity: 12 },
        { id: '5', name: 'Bebés (0 a 3 años)', schedule: 'Jueves 17:30-18:15', capacity: 12 },
        { id: '6', name: 'Mayores (3 años)', schedule: 'Jueves 18:30-19:15', capacity: 12 },
        { id: '7', name: 'Bebés (0 a 3 años)', schedule: 'Viernes 16:30-17:15', capacity: 12 },
        { id: '8', name: 'Bebés (0 a 3 años)', schedule: 'Viernes 17:30-18:15', capacity: 12 },
        { id: '9', name: 'Mayores (3 años)', schedule: 'Viernes 18:30-19:15', capacity: 12 }
      ]);
    }

    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
