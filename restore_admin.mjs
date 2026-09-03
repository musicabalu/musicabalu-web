import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Restoring admin user...');

  const user = await prisma.user.upsert({
    where: { email: 'musicabalu@gmail.com' },
    update: { role: 'admin', hasActiveSub: false },
    create: { email: 'musicabalu@gmail.com', role: 'admin', hasActiveSub: false }
  });

  console.log(`Restored user: ${user.email} with role: ${user.role}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
