import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany({
    include: { enrollments: true }
  });

  const emailGroups = {};
  
  allUsers.forEach(user => {
    if (!user.email) return;
    const lower = user.email.toLowerCase();
    if (!emailGroups[lower]) {
      emailGroups[lower] = [];
    }
    emailGroups[lower].push(user);
  });

  const duplicates = Object.keys(emailGroups).filter(email => emailGroups[email].length > 1);
  
  if (duplicates.length === 0) {
    console.log("No se han encontrado cuentas duplicadas por mayúsculas/minúsculas.");
  } else {
    console.log("⚠️ SE HAN ENCONTRADO DUPLICADOS:");
    duplicates.forEach(email => {
      console.log(`\nEmail base: ${email}`);
      emailGroups[email].forEach(u => {
        console.log(` - ID: ${u.id} | Email guardado: ${u.email} | Inscripciones: ${u.enrollments.length} | Rol: ${u.role}`);
      });
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
