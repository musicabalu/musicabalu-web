import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Configurar jamusanchez@gmail.com como EDUCADOR (solo formaciones)
  const educador = await prisma.user.upsert({
    where: { email: "jamusanchez@gmail.com" },
    update: { role: 'educador', hasActiveSub: false },
    create: { email: "jamusanchez@gmail.com", role: 'educador', hasActiveSub: false }
  });
  console.log("✅ jamusanchez@gmail.com configurado como:", educador.role);

  // Configurar musicabalu@gmail.com como ADMIN (acceso total)
  const admin = await prisma.user.upsert({
    where: { email: "musicabalu@gmail.com" },
    update: { role: 'admin', hasActiveSub: true },
    create: { email: "musicabalu@gmail.com", role: 'admin', hasActiveSub: true }
  });
  console.log("✅ musicabalu@gmail.com configurado como:", admin.role);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
