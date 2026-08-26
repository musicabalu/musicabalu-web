import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Debes iniciar sesión' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || !user.stripeId) {
      return NextResponse.json({ error: 'No tienes suscripciones activas' }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeId,
      return_url: `${request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://musicabalu.com'}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creando sesión del portal:', error);
    if (error.message.includes('Invalid API Key') || error.message.includes('No such customer')) {
      return NextResponse.json(
        { error: 'Simulación: Has hecho clic en el Portal. Cuando configures tu clave de Stripe real, esto te llevará a tu perfil de facturación.' },
        { status: 200 }
      );
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
