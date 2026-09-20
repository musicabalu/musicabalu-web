import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      childName: {
        contains: 'Clara Zafra'
      }
    }
  });

  if (enrollment) {
    console.log(`Found enrollment for child: ${enrollment.childName}`);
    console.log(`Current parent name: ${enrollment.parentName}`);
    
    const updated = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { parentName: 'Lucía Bernal Díaz' }
    });
    
    console.log(`Successfully updated parent name to: ${updated.parentName}`);
  } else {
    console.log("Could not find an enrollment for Clara Zafra.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
