import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'jamusanchez@gmail.com';
  
  const user = await prisma.user.findUnique({
    where: { email }
  });
  console.log('User:', user);
  
  const enrollment = await prisma.enrollment.findMany({
    where: { email }
  });
  console.log('Enrollments:', enrollment);
}

main().catch(console.error).finally(() => prisma.$disconnect());
