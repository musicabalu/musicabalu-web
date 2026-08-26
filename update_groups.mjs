import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Updating groups...");

  await prisma.enrollment.deleteMany({});
  await prisma.group.deleteMany({});
  
  console.log("Deleted old groups and enrollments. Creating new ones...");
  
  await prisma.group.createMany({
    data: [
      { name: 'Bebés', schedule: 'Martes 16:30 - 17:15', capacity: 10 },
      { name: 'Bebés', schedule: 'Martes 17:30 - 18:15', capacity: 10 },
      { name: 'Bebés', schedule: 'Martes 18:30 - 19:15', capacity: 10 },

      { name: 'Bebés', schedule: 'Jueves 16:30 - 17:15', capacity: 10 },
      { name: 'Bebés', schedule: 'Jueves 17:30 - 18:15', capacity: 10 },
      { name: 'Mayores', schedule: 'Jueves 18:30 - 19:15', capacity: 8 },

      { name: 'Bebés', schedule: 'Viernes 16:30 - 17:15', capacity: 10 },
      { name: 'Bebés', schedule: 'Viernes 17:30 - 18:15', capacity: 10 },
      { name: 'Mayores', schedule: 'Viernes 18:30 - 19:15', capacity: 8 }
    ]
  });

  console.log("Done!");
}

main().finally(() => prisma.$disconnect());
