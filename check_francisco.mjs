import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: 'Francisco', mode: 'insensitive' } },
        { name: { contains: 'Bas', mode: 'insensitive' } },
        { name: { contains: 'Esparza', mode: 'insensitive' } },
        { email: { contains: 'francisco', mode: 'insensitive' } }
      ]
    },
    include: { enrollments: true }
  });
  
  const enrollments = await prisma.enrollment.findMany({
    where: {
      OR: [
        { parentName: { contains: 'Francisco', mode: 'insensitive' } },
        { childName: { contains: 'Alan', mode: 'insensitive' } }
      ]
    },
    include: { user: true }
  });

  console.log("Usuarios encontrados:", JSON.stringify(users, null, 2));
  console.log("Inscripciones encontradas:", JSON.stringify(enrollments, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
