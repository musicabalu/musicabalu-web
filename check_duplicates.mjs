import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

async function main() {
  console.log("=== Checking Database Enrollments ===");
  const enrollments = await prisma.enrollment.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const emailCounts = {};
  enrollments.forEach(e => {
    emailCounts[e.email] = (emailCounts[e.email] || 0) + 1;
  });

  console.log("Emails with multiple enrollments:");
  Object.entries(emailCounts).filter(([email, count]) => count > 1).forEach(([email, count]) => {
    const records = enrollments.filter(e => e.email === email).map(e => `${e.parentName} (${e.childName}) - ${e.status} - ${e.paymentMethod}`);
    console.log(`- ${email} (${count}):`);
    records.forEach(r => console.log(`    ${r}`));
  });

  console.log("\n=== Checking Stripe Payments (Last 100) ===");
  try {
    const charges = await stripe.charges.list({ limit: 100 });
    const chargeEmails = {};
    charges.data.forEach(c => {
      const email = c.billing_details?.email || c.receipt_email || 'No email';
      chargeEmails[email] = (chargeEmails[email] || 0) + 1;
    });

    console.log("Emails with multiple charges in Stripe:");
    Object.entries(chargeEmails).filter(([email, count]) => count > 1 && email !== 'No email').forEach(([email, count]) => {
      console.log(`- ${email} (${count} cargos)`);
      const userCharges = charges.data.filter(c => (c.billing_details?.email === email || c.receipt_email === email));
      userCharges.forEach(c => {
        console.log(`    Monto: ${c.amount/100} ${c.currency.toUpperCase()} - Estado: ${c.status} - Creado: ${new Date(c.created * 1000).toLocaleString()}`);
      });
    });
  } catch (error) {
    console.log("Error querying Stripe (maybe test mode or invalid key):", error.message);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
