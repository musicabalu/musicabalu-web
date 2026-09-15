import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function listEfectivo() {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      paymentMethod: { not: 'stripe' }
    },
    include: {
      user: true
    }
  });

  console.log(`=== ALUMNOS EN EFECTIVO/TRANSFERENCIA (${enrollments.length}) ===`);
  enrollments.forEach(e => {
    console.log(`- Peque: ${e.childName}`);
    console.log(`  Padre/Madre: ${e.parentName}`);
    console.log(`  Email: ${e.email}`);
    console.log(`  Teléfono: ${e.phone}`);
    console.log(`  Grupo ID: ${e.groupId}`);
    console.log(`  Método registrado: ${e.paymentMethod}`);
    console.log("-----------------------------------------");
  });
}

listEfectivo()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
