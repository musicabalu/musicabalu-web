const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.fodppfwbvzbjojmgimiy:MusicaProject20.26@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true'
    }
  }
});
prisma.product.findMany()
  .then(r => console.log('Connected via Supavisor eu-central-1! Found:', r.length))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
