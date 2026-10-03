import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function main() {
  const invoices = await stripe.invoices.list({ limit: 100 });
  const paymentLinks = await stripe.paymentLinks.list({ limit: 10 });

  console.log("\n--- Invoices (Facturas) ---");
  invoices.data.forEach(i => {
    if (i.status !== 'paid') {
      console.log(`ID: ${i.id} | Date: ${new Date(i.created * 1000).toISOString().split('T')[0]} | Status: ${i.status} | Email: ${i.customer_email}`);
    }
  });

  console.log("\n--- Payment Links ---");
  paymentLinks.data.forEach(pl => {
    console.log(`ID: ${pl.id} | Active: ${pl.active} | URL: ${pl.url}`);
  });
}

main().catch(console.error);
