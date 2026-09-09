import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixName() {
  const result = await prisma.enrollment.updateMany({
    where: {
      childName: { contains: 'Alonso Belluga' }
    },
    data: {
      childName: 'Rodrigo Belluga Sánchez'
    }
  });
  console.log(`Updated ${result.count} enrollments`);
}

fixName().finally(() => prisma.$disconnect());
