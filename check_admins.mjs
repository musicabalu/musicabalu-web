import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.user.findMany({
    where: { role: 'admin' }
  });
  console.log("Admins:", admins);
}
main().catch(console.error).finally(() => prisma.$disconnect());
