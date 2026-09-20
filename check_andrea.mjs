import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      OR: [
        { parentName: { contains: 'Andrea' } },
        { email: { contains: 'andrea' } },
        { childName: { contains: 'Andrea' } }
      ]
    }
  });
  
  console.log("Found Enrollments:");
  console.dir(enrollments, { depth: null });
}

main().catch(console.error).finally(() => prisma.$disconnect());
