import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const email = 'jamusanchez@gmail.com';
  
  // Try to find the user
  let user = await prisma.user.findUnique({ where: { email } });
  
  if (user) {
    console.log(`Usuario encontrado: ${user.email} con rol ${user.role}. Actualizando a educador...`);
    user = await prisma.user.update({
      where: { email },
      data: { role: 'educador' }
    });
    console.log("Usuario actualizado correctamente:", user);
  } else {
    console.log("Usuario no encontrado, creándolo como educador...");
    user = await prisma.user.create({
      data: {
        email,
        name: 'Javier (Formación)',
        role: 'educador'
      }
    });
    console.log("Usuario creado:", user);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
