import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old testing data (excluding admin)...');

  // Find the admin user to exclude
  const adminEmail = 'musicabalu@gmail.com';
  const adminUser = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (adminUser) {
    // Delete all enrollments EXCEPT admin's
    const enrollments = await prisma.enrollment.deleteMany({
      where: {
        userId: {
          not: adminUser.id
        }
      }
    });
    console.log(`Deleted ${enrollments.count} enrollments.`);

    // Delete all orders EXCEPT admin's
    const orders = await prisma.order.deleteMany({
      where: {
        userId: {
          not: adminUser.id
        }
      }
    });
    console.log(`Deleted ${orders.count} orders.`);

    // Delete all users EXCEPT admin
    const users = await prisma.user.deleteMany({
      where: {
        email: {
          not: adminEmail
        }
      }
    });
    console.log(`Deleted ${users.count} users.`);
  } else {
    // If admin is not found, just delete everything
    const enrollments = await prisma.enrollment.deleteMany({});
    console.log(`Deleted ${enrollments.count} enrollments.`);
    
    const orders = await prisma.order.deleteMany({});
    console.log(`Deleted ${orders.count} orders.`);
    
    const users = await prisma.user.deleteMany({});
    console.log(`Deleted ${users.count} users.`);
  }

  console.log('All test emails and users have been cleared (admin preserved)!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
