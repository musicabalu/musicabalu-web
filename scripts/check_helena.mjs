import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      childName: {
        contains: 'Helena Cano',
        mode: 'insensitive'
      }
    },
    include: {
      user: true
    }
  });

  console.log("Enrollments:", JSON.stringify(enrollments, null, 2));

  if (enrollments.length > 0) {
    const userId = enrollments[0].userId;
    const orders = await prisma.order.findMany({
      where: { userId }
    });
    console.log("Orders for this user:", JSON.stringify(orders, null, 2));
    
    const logs = await prisma.activityLog.findMany({
      where: { userId }
    });
    console.log("Activity logs for this user:", JSON.stringify(logs, null, 2));
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
