import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const enrollmentIdToDelete = 'cmu9sq79s0001tcjuqiuc9rwx';
  
  const deleted = await prisma.enrollment.delete({
    where: { id: enrollmentIdToDelete }
  });
  
  console.log("Successfully deleted duplicate enrollment:", deleted);
}

main().catch(console.error).finally(() => prisma.$disconnect());
