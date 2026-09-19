import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

async function main() {
  const names = ['Marian', 'Marián', 'Carolina', 'Mercedes', 'Merche'];
  
  const charges = await stripe.charges.list({ limit: 100 });
  const customers = await stripe.customers.list({ limit: 100 });
  
  console.log("=== Checking Charges by Name ===");
  for (const c of charges.data) {
    const name = c.billing_details?.name || 'No Name';
    if (names.some(n => name.toLowerCase().includes(n.toLowerCase()))) {
      console.log(`Charge: ${name} - ${c.amount/100} ${c.currency} - ${c.status} - Email: ${c.billing_details?.email} - Created: ${new Date(c.created*1000).toLocaleString()}`);
    }
  }

  console.log("\n=== Checking Customers by Name ===");
  for (const c of customers.data) {
    const name = c.name || 'No Name';
    if (names.some(n => name.toLowerCase().includes(n.toLowerCase()))) {
      console.log(`Customer: ${name} - ID: ${c.id} - Email: ${c.email}`);
    }
  }
}
main().catch(console.error);
