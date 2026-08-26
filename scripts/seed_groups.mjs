import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const groups = [
    { name: 'Bebés (0 a 3 años)', schedule: 'Martes 16:30-17:15', capacity: 12 },
    { name: 'Bebés (0 a 3 años)', schedule: 'Martes 17:30-18:15', capacity: 12 },
    { name: 'Bebés (0 a 3 años)', schedule: 'Martes 18:30-19:15', capacity: 12 },
    { name: 'Bebés (0 a 3 años)', schedule: 'Jueves 16:30-17:15', capacity: 12 },
    { name: 'Bebés (0 a 3 años)', schedule: 'Jueves 17:30-18:15', capacity: 12 },
    { name: 'Mayores (3 años)', schedule: 'Jueves 18:30-19:15', capacity: 12 },
    { name: 'Bebés (0 a 3 años)', schedule: 'Viernes 16:30-17:15', capacity: 12 },
    { name: 'Bebés (0 a 3 años)', schedule: 'Viernes 17:30-18:15', capacity: 12 },
    { name: 'Mayores (3 años)', schedule: 'Viernes 18:30-19:15', capacity: 12 }
  ];

  // Primero vaciamos si hay algo (opcional, para estar limpios)
  await prisma.group.deleteMany({});

  console.log('Creando grupos...');
  for (const g of groups) {
    await prisma.group.create({ data: g });
  }
  console.log('¡9 grupos creados exitosamente!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
