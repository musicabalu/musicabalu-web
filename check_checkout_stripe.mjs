import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

async function main() {
  console.log("Fetching all Checkout Sessions from Stripe...");
  let sessions = [];
  for await (const session of stripe.checkout.sessions.list({ limit: 100 })) {
    sessions.push(session);
  }
  
  console.log(`Total Checkout Sessions found: ${sessions.length}`);
  const emailCounts = {};
  
  for (const s of sessions) {
    if (s.payment_status === 'paid') {
      const email = s.customer_details?.email || 'No Email';
      emailCounts[email] = (emailCounts[email] || 0) + 1;
    }
  }

  console.log("\n=== Checking Paid Checkout Sessions by Email ===");
  for (const [email, count] of Object.entries(emailCounts)) {
    if (count > 1) {
      console.log(`DUPLICATE FOUND: ${email} paid ${count} times!`);
    } else {
      console.log(`OK: ${email} paid 1 time.`);
    }
  }
}
main().catch(console.error);
