import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

async function main() {
  const names = ['Marian', 'Carolina', 'Mercedes', 'Merche'];
  
  const enrollments = await prisma.enrollment.findMany({
    where: {
      OR: [
        { parentName: { contains: 'Marian' } },
        { parentName: { contains: 'Marián' } },
        { parentName: { contains: 'Carolina' } },
        { parentName: { contains: 'Mercedes' } },
        { parentName: { contains: 'Merche' } }
      ]
    }
  });

  console.log("=== Specific Enrollments ===");
  for (const e of enrollments) {
    console.log(`- ${e.parentName} (${e.email}): ${e.status} [${e.paymentMethod}]`);
    
    // Check Stripe for this email
    const charges = await stripe.charges.list({ limit: 100 });
    const userCharges = charges.data.filter(c => c.billing_details?.email === e.email || c.receipt_email === e.email);
    console.log(`  Stripe Charges for ${e.email}: ${userCharges.length}`);
    userCharges.forEach(c => {
      console.log(`    ${c.amount/100} ${c.currency} - ${c.status} - ${new Date(c.created * 1000).toLocaleString()}`);
    });
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
