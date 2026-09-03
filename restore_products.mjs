import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { id: 'merch_camiseta_1' },
    data: { name: 'Camiseta Musicabalú Peques (Logo MB)' }
  });
  
  await prisma.product.update({
    where: { id: 'merch_camiseta_2' },
    data: { name: 'Camiseta Musicabalú Peques (Logo Corazón)' }
  });

  // Check if body exists, if not create
  const body = await prisma.product.findUnique({ where: { id: 'merch_body' } });
  if (!body) {
    await prisma.product.create({
      data: {
        id: 'merch_body',
        name: 'Body Musicabalú',
        description: 'Body de algodón 100% orgánico.',
        price: 1800,
        type: 'printful_merch',
        imageUrl: '/imagenes/merchandising/body1.jpg, /imagenes/merchandising/body2.jpg',
        isActive: true,
      }
    });
    console.log('✅ Body restored.');
  }

  // Check if bolsa exists, if not create
  const bolsa = await prisma.product.findUnique({ where: { id: 'merch_bolsa' } });
  if (!bolsa) {
    await prisma.product.create({
      data: {
        id: 'merch_bolsa',
        name: 'Bolsa de tela (Tote Bag)',
        description: 'Bolsa de algodón ecológico muy resistente, perfecta para llevar tus instrumentos.',
        price: 1500,
        type: 'printful_merch',
        imageUrl: '/imagenes/merchandising/bolsa1.jpg, /imagenes/merchandising/bolsa2.jpg',
        isActive: true,
      }
    });
    console.log('✅ Bolsa restored.');
  }
}
main().finally(() => prisma.$disconnect());
