import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    include: { user: true }
  });
  console.log(`Total orders: ${orders.length}`);
  
  const enrollments = await prisma.enrollment.findMany({
    include: { user: true }
  });
  console.log(`Total enrollments: ${enrollments.length}`);
  
  const names = ['Marian', 'Marián', 'Carolina', 'Mercedes', 'Merche'];
  
  console.log("\n=== Checking Enrollments for the 3 names ===");
  enrollments.forEach(e => {
    if (names.some(n => e.parentName.toLowerCase().includes(n.toLowerCase()))) {
      console.log(`${e.parentName} - ${e.email} - Payment: ${e.paymentMethod} - Status: ${e.status}`);
    }
  });

  console.log("\n=== Checking Orders for the 3 names ===");
  orders.forEach(o => {
    if (names.some(n => o.user?.name.toLowerCase().includes(n.toLowerCase()))) {
      console.log(`${o.user?.name} - ${o.user?.email} - Product: ${o.productName} - Status: ${o.status}`);
    }
  });
}
main().catch(console.error).finally(() => prisma.$disconnect());
