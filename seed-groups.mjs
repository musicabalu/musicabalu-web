import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.group.createMany({
    data: [
      { name: 'Bebés (0 a 3 años)', schedule: 'Martes 16:30-17:15', capacity: 12 },
      { name: 'Bebés (0 a 3 años)', schedule: 'Martes 17:30-18:15', capacity: 12 },
      { name: 'Bebés (0 a 3 años)', schedule: 'Martes 18:30-19:15', capacity: 12 },
      { name: 'Bebés (0 a 3 años)', schedule: 'Jueves 16:30-17:15', capacity: 12 },
      { name: 'Bebés (0 a 3 años)', schedule: 'Jueves 17:30-18:15', capacity: 12 },
      { name: 'Mayores (3 años)', schedule: 'Jueves 18:30-19:15', capacity: 12 },
      { name: 'Bebés (0 a 3 años)', schedule: 'Viernes 16:30-17:15', capacity: 12 },
      { name: 'Bebés (0 a 3 años)', schedule: 'Viernes 17:30-18:15', capacity: 12 },
      { name: 'Mayores (3 años)', schedule: 'Viernes 18:30-19:15', capacity: 12 }
    ]
  });
  
  try {
    // Delete any test groups that don't have enrollments
    await prisma.group.deleteMany({
      where: { name: { contains: 'prueba' }, enrollments: { none: {} } }
    });
  } catch(e) {
    console.log("Ignored error deleting test groups:", e.message);
  }

  console.log("Groups seeded successfully");
}

main().catch(console.error).finally(() => prisma.$disconnect());
