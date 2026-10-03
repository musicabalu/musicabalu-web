import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  let updatedUsers = 0;

  for (const user of allUsers) {
    if (user.email && user.email !== user.email.toLowerCase()) {
      console.log(`Convirtiendo usuario a minúsculas: ${user.email}`);
      await prisma.user.update({
        where: { id: user.id },
        data: { email: user.email.toLowerCase() }
      });
      updatedUsers++;
    }
  }

  const allEnrollments = await prisma.enrollment.findMany();
  let updatedEnrollments = 0;

  for (const enr of allEnrollments) {
    if (enr.email && enr.email !== enr.email.toLowerCase()) {
      console.log(`Convirtiendo inscripción a minúsculas: ${enr.email}`);
      await prisma.enrollment.update({
        where: { id: enr.id },
        data: { email: enr.email.toLowerCase() }
      });
      updatedEnrollments++;
    }
  }

  console.log(`Proceso terminado. Usuarios actualizados: ${updatedUsers}. Inscripciones actualizadas: ${updatedEnrollments}.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
