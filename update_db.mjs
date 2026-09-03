import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { id: 'merch_camiseta_1' },
    data: { name: 'Camiseta Musicabalú Peques' }
  });
  await prisma.product.update({
    where: { id: 'merch_camiseta_2' },
    data: { name: 'Camiseta Musicabalú Peques' }
  });
  await prisma.product.update({
    where: { id: 'merch_camiseta_adulto' },
    data: { price: 2200 }
  });
  console.log('✅ DB updated');
}
main().finally(() => prisma.$disconnect());
