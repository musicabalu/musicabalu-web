import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ success: true, count: products.length, url: process.env.DATABASE_URL?.substring(0, 30) + '...' });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack,
      url: process.env.DATABASE_URL?.substring(0, 30) + '...'
    }, { status: 500 });
  }
}
