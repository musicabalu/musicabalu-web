import { PrismaClient } from '@prisma/client';
import GroupDetailClient from './GroupDetailClient';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function GroupPage({ params }) {
  const { id } = await params;

  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      enrollments: {
        where: { status: 'active' },
        orderBy: { childName: 'asc' }
      }
    }
  });

  if (!group) return notFound();

  return (
    <div>
      <GroupDetailClient group={group} />
    </div>
  );
}
