import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { role: 'educador' }
  });
  console.log("Usuarios educadores:", users.map(u => u.email));
}
main().finally(() => prisma.$disconnect());
