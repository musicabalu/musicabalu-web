import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function main() {
  const start = new Date('2026-09-17T00:00:00Z').getTime() / 1000;
  const end = new Date('2026-09-21T23:59:59Z').getTime() / 1000;

  const sessions = await stripe.checkout.sessions.list({
    created: { gte: Math.floor(start), lte: Math.floor(end) },
    limit: 100
  });

  console.log("\n=== CHECKOUT SESSIONS (Enlaces de pago) ===");
  sessions.data.forEach(s => {
    const date = new Date(s.created * 1000).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
    console.log(`[${date}] ID: ${s.id.slice(-8)} | Email: ${s.customer_details?.email || s.customer_email || 'N/A'} | Status: ${s.status} | Payment: ${s.payment_status} | Amount: ${s.amount_total/100}€`);
  });

  const paymentIntents = await stripe.paymentIntents.list({
    created: { gte: Math.floor(start), lte: Math.floor(end) },
    limit: 100
  });

  console.log("\n=== PAYMENT INTENTS (Intentos de cobro) ===");
  paymentIntents.data.forEach(pi => {
    const date = new Date(pi.created * 1000).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
    let errorMsg = pi.last_payment_error ? ` | Error: ${pi.last_payment_error.message}` : '';
    console.log(`[${date}] ID: ${pi.id.slice(-8)} | Email: ${pi.receipt_email || 'N/A'} | Status: ${pi.status} | Amount: ${pi.amount/100}€${errorMsg}`);
  });

  const subscriptions = await stripe.subscriptions.list({
    created: { gte: Math.floor(start), lte: Math.floor(end) },
    status: 'all',
    limit: 100
  });

  console.log("\n=== SUSCRIPCIONES ===");
  subscriptions.data.forEach(sub => {
    const date = new Date(sub.created * 1000).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
    console.log(`[${date}] ID: ${sub.id.slice(-8)} | Status: ${sub.status} | Customer: ${sub.customer}`);
  });
}

main().catch(console.error);
