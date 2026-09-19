import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

async function main() {
  console.log("Fetching all PaymentIntents from Stripe...");
  let intents = [];
  for await (const intent of stripe.paymentIntents.list({ limit: 100 })) {
    intents.push(intent);
  }
  
  console.log(`Total PaymentIntents found: ${intents.length}`);
  for (const i of intents) {
    if (i.status === 'succeeded' || i.status === 'processing') {
      const email = i.receipt_email || 'No email';
      console.log(`- ${i.amount/100} ${i.currency} - Email: ${email}`);
    }
  }
}
main().catch(console.error);
