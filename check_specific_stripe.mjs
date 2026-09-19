import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

async function main() {
  const emails = ['p.rodrigues.carolina@gmail.com', 'marian.hellincantero@gmail.com', 'mmercedes.carceles@gmail.com'];
  
  for (const email of emails) {
    console.log(`\n=== Checking Stripe for ${email} ===`);
    try {
      const customers = await stripe.customers.list({ email: email });
      console.log(`Found ${customers.data.length} customers.`);
      
      for (const customer of customers.data) {
        console.log(`  Customer ID: ${customer.id}`);
        const charges = await stripe.charges.list({ customer: customer.id, limit: 10 });
        console.log(`  Charges for this customer: ${charges.data.length}`);
        charges.data.forEach(c => {
          console.log(`    - ${c.amount/100} ${c.currency} (${c.status}) - ${new Date(c.created*1000).toLocaleString()}`);
        });
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}
main().catch(console.error);
