import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

async function main() {
  const names = ['Marian', 'Marián', 'Carolina', 'Mercedes', 'Merche'];
  
  console.log("Fetching all charges from Stripe...");
  let charges = [];
  for await (const charge of stripe.charges.list({ limit: 100 })) {
    charges.push(charge);
  }
  
  console.log(`Total charges found: ${charges.length}`);
  
  console.log("\n=== Checking Charges by Name ===");
  for (const c of charges) {
    const name = c.billing_details?.name || c.receipt_email || 'No Name';
    if (names.some(n => name.toLowerCase().includes(n.toLowerCase()))) {
      console.log(`Charge: ${name} - ${c.amount/100} ${c.currency} - ${c.status} - Email: ${c.billing_details?.email} - Created: ${new Date(c.created*1000).toLocaleString()}`);
    }
  }
}
main().catch(console.error);
