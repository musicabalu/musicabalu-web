import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'jamusanchez@gmail.com';
  
  const updated = await prisma.user.update({
    where: { email },
    data: { role: 'admin' }
  });
  
  console.log(`Updated user ${updated.email} to role: ${updated.role}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
