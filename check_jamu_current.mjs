import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkJamu() {
  const user = await prisma.user.findUnique({
    where: { email: 'jamusanchez@gmail.com' },
    include: { enrollments: true }
  });
  console.log(JSON.stringify(user, null, 2));
}

checkJamu().catch(console.error).finally(() => prisma.$disconnect());
