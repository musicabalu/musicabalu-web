import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function audit() {
  const enrollments = await prisma.enrollment.findMany({
    include: { user: true }
  });

  // Check for duplicates by childName
  const byChild = {};
  enrollments.forEach(e => {
    byChild[e.childName] = byChild[e.childName] || [];
    byChild[e.childName].push(e);
  });

  console.log("=== POSIBLES PEQUES MATRICULADOS VARIAS VECES ===");
  for (const [name, array] of Object.entries(byChild)) {
    if (array.length > 1) {
      console.log(`- ${name} tiene ${array.length} inscripciones.`);
    }
  }

  // Check for missing data
  console.log("\n=== COMPROBANDO INSCRIPCIONES (Riesgo de pagos faltantes) ===");
  const suspicious = enrollments.filter(e => e.status !== 'active');
  if (suspicious.length > 0) {
    suspicious.forEach(e => {
      console.log(`Ojo: ${e.childName} tiene estado '${e.status}' y no active.`);
    });
  } else {
    console.log("Todas las inscripciones registradas están 'active'.");
  }

  // Check for users with multiple enrollments under same user (might be siblings, which is fine)
  const byUser = {};
  enrollments.forEach(e => {
    byUser[e.userId] = byUser[e.userId] || [];
    byUser[e.userId].push(e);
  });

  console.log("\n=== USUARIOS CON VARIAS INSCRIPCIONES (Posibles hermanos o duplicados) ===");
  for (const [uid, array] of Object.entries(byUser)) {
    if (array.length > 1) {
      console.log(`- El usuario ${array[0].user.email} tiene ${array.length} inscripciones:`);
      array.forEach(e => console.log(`   -> Peque: ${e.childName}`));
    }
  }

}

audit().catch(console.error).finally(() => prisma.$disconnect());
