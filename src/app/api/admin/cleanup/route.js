import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    // Seguridad: Solo admin
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const now = new Date();

    // 1. Limpiar pedidos pendientes antiguos (carritos abandonados)
    const deletedOrders = await prisma.order.deleteMany({
      where: {
        status: 'pending',
        createdAt: {
          lt: thirtyDaysAgo
        }
      }
    });

    // 2. Limpiar tokens de verificación caducados
    const deletedTokens = await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lt: now
        }
      }
    });

    // 3. Limpiar sesiones caducadas
    const deletedSessions = await prisma.session.deleteMany({
      where: {
        expires: {
          lt: now
        }
      }
    });

    // 4. Limpiar usuarios sin verificar que no tienen pedidos ni inscripciones (lleva más de 30 días creado)
    // Prisma no guarda createdAt en User, por lo que usaremos una estrategia conservadora:
    // Si no tiene stripeId, ni orders, ni enrollments, ni emailVerified... 
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        role: 'familia',
        emailVerified: null,
        stripeId: null,
        orders: { none: {} },
        enrollments: { none: {} }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Limpieza completada correctamente',
      stats: {
        ordersDeleted: deletedOrders.count,
        tokensDeleted: deletedTokens.count,
        sessionsDeleted: deletedSessions.count,
        usersDeleted: deletedUsers.count
      }
    });

  } catch (error) {
    console.error('Error en cleanup:', error);
    return NextResponse.json({ error: 'Error interno en limpieza' }, { status: 500 });
  }
}
