import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const user = await prisma.user.findFirst({
    where: { email: { contains: 'marian' } },
    include: { enrollments: true }
  });
  console.log(user);
}
check().finally(() => prisma.$disconnect());
