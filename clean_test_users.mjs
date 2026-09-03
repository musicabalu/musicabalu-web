import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'musicabalu@gmail.com';
  
  // Find all users to delete
  const usersToDelete = await prisma.user.findMany({
    where: {
      email: {
        not: adminEmail
      }
    }
  });

  console.log(`Borrando ${usersToDelete.length} usuarios de prueba...`);

  // Delete all users except admin
  const result = await prisma.user.deleteMany({
    where: {
      email: {
        not: adminEmail
      }
    }
  });

  console.log(`Se han borrado ${result.count} usuarios.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
