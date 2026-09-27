import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.email !== 'musicabalu@gmail.com') {
    return false;
  }
  return true;
}

export async function GET() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const waitlist = await prisma.waitlist.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(waitlist);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching waitlist' }, { status: 500 });
  }
}

export async function POST(req) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { childName, childBirthDate, parentName, contact, desiredGroups, notes, status } = body;

    const newEntry = await prisma.waitlist.create({
      data: {
        childName,
        childBirthDate: childBirthDate || null,
        parentName,
        contact,
        desiredGroups,
        notes: notes || null,
        status: status || 'pending'
      }
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating waitlist entry' }, { status: 500 });
  }
}

export async function PUT(req) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, childName, childBirthDate, parentName, contact, desiredGroups, notes, status } = body;

    const updatedEntry = await prisma.waitlist.update({
      where: { id },
      data: {
        childName,
        childBirthDate,
        parentName,
        contact,
        desiredGroups,
        notes,
        status
      }
    });
    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating waitlist entry' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await prisma.waitlist.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting waitlist entry' }, { status: 500 });
  }
}
