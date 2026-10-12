import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Limpiando catálogo antiguo y eliminando merchandising...");
  await prisma.product.deleteMany({});

  console.log("Creando productos limpios de suscripción digital...");
  
  await prisma.product.createMany({
    data: [
      {
        id: 'sub_mensual',
        name: 'Suscripción Comunidad Familiar (Mensual)',
        description: 'Acceso completo e ilimitado a todas las canciones, recitados pedagógicos y píldoras en vídeo. Precio especial de lanzamiento para familias fundadoras (se congela a 3,90€/mes para siempre mientras mantengas tu suscripción activa). Cancela cuando quieras con 1 clic.',
        price: 390, // 3.90€ / mes
        type: 'subscription',
        imageUrl: '✨',
        isActive: true,
      },
      {
        id: 'sub_anual',
        name: 'Suscripción Comunidad Familiar (Anual)',
        description: '1 año completo de acceso a todas las canciones, recitados y píldoras pedagógicas. Ahorra más de 2 meses enteros con un único pago al año (equivalente a 3,25€/mes). Acceso ininterrumpido para cantar y jugar en familia.',
        price: 3900, // 39.00€ / año
        type: 'subscription',
        imageUrl: '🎁',
        isActive: true,
      }
    ]
  });

  const products = await prisma.product.findMany();
  console.log("✅ Productos configurados correctamente:", products.map(p => ({ id: p.id, name: p.name, price: p.price / 100 + '€' })));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
