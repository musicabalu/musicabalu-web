import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Creando usuarios de prueba...");

  // 1. Administrador
  await prisma.user.upsert({
    where: { email: 'musicabalu@gmail.com' },
    update: { role: 'admin', hasActiveSub: false },
    create: { email: 'musicabalu@gmail.com', role: 'admin', hasActiveSub: false }
  });

  // 2. Solo Biblioteca Familiar (Suscripción digital)
  await prisma.user.upsert({
    where: { email: 'biblioteca@musicabalu.com' },
    update: { role: 'familia', hasActiveSub: true },
    create: { email: 'biblioteca@musicabalu.com', role: 'familia', hasActiveSub: true }
  });

  // 3. Solo Formaciones
  await prisma.user.upsert({
    where: { email: 'formaciones@musicabalu.com' },
    update: { role: 'educador', hasActiveSub: false },
    create: { email: 'formaciones@musicabalu.com', role: 'educador', hasActiveSub: false }
  });

  // 4. Comunidad Presencial (Requiere un grupo y una inscripción)
  // Primero aseguramos que existe un grupo
  let group = await prisma.group.findFirst();
  if (!group) {
    group = await prisma.group.create({
      data: { name: 'Grupo de Prueba', schedule: 'Lunes 17:00', capacity: 10 }
    });
  }

  const presencialUser = await prisma.user.upsert({
    where: { email: 'presencial@musicabalu.com' },
    update: { role: 'familia', hasActiveSub: false },
    create: { email: 'presencial@musicabalu.com', role: 'familia', hasActiveSub: false }
  });

  // Asegurar que tiene una inscripción activa
  const existingEnrollment = await prisma.enrollment.findFirst({
    where: { userId: presencialUser.id }
  });

  if (!existingEnrollment) {
    await prisma.enrollment.create({
      data: {
        childName: 'Niño Prueba',
        parentName: 'Padre Prueba',
        phone: '123456789',
        email: 'presencial@musicabalu.com',
        paymentMethod: 'efectivo',
        status: 'active',
        groupId: group.id,
        userId: presencialUser.id
      }
    });
  }

  // 5. Usuario Nuevo (Sin paquete)
  await prisma.user.upsert({
    where: { email: 'nuevo@musicabalu.com' },
    update: { role: 'familia', hasActiveSub: false },
    create: { email: 'nuevo@musicabalu.com', role: 'familia', hasActiveSub: false }
  });

  console.log("✅ Usuarios de prueba creados exitosamente.");
  console.log("");
  console.log("Puedes iniciar sesión en /login con los siguientes correos (el enlace saldrá en tu terminal):");
  console.log("- musicabalu@gmail.com (Solo Administrador / Formaciones)");
  console.log("- biblioteca@musicabalu.com (Solo Biblioteca Familiar)");
  console.log("- formaciones@musicabalu.com (Solo Mis Formaciones)");
  console.log("- presencial@musicabalu.com (Mi Clase Presencial + Biblioteca Familiar)");
  console.log("- nuevo@musicabalu.com (Sin acceso, candados activados)");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
