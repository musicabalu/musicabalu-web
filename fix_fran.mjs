import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const oldUserId = 'cmtle68df0000c3ljs9tmp8fb'; 
  const newUserId = 'cmtlqwamd0004y27g35gf42zx';

  // Remove stripeId from old user so we can assign it to the new one
  await prisma.user.update({
    where: { id: oldUserId },
    data: { stripeId: null }
  });

  // Copy name and stripeId to the new user
  await prisma.user.update({
    where: { id: newUserId },
    data: {
      name: 'Francisco Bas Esparza',
      stripeId: 'cus_VBvtoyDPVPSaSB'
    }
  });

  // Delete the old user
  await prisma.user.delete({
    where: { id: oldUserId }
  });

  console.log("¡Arreglado el problema de Francisco!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
