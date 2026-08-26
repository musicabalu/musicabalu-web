const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Asegurarnos de que no hay productos para evitar duplicados en pruebas
  await prisma.product.deleteMany({});

  console.log("🌱 Insertando productos placeholder en la base de datos...");

  const products = [
    {
      id: 'pack_regalo',
      name: 'Paquete Regalo Musicabalú',
      description: 'El kit perfecto para empezar. Incluye 2 pañuelos, 2 huevos sonoros, saquitos y una tarjeta QR con 3 canciones.',
      price: 3500, // En céntimos (35,00 €)
      type: 'physical_kit',
      imageUrl: '🎁', // Guardamos el emoji como placeholder temporal
    },
    {
      id: 'audio_relajacion',
      name: 'Audio Relajación y Sueño',
      description: '45 minutos de música continua diseñada con frecuencias específicas para ayudar al descanso de tu bebé.',
      price: 990, // En céntimos (9,90 €)
      type: 'digital',
      imageUrl: '🌙',
    },
    {
      id: 'merch_camiseta',
      name: 'Camiseta Musicabalú (Infantil)',
      description: 'Camiseta de algodón 100% orgánico con nuestra mascota estampada.',
      price: 2200, // En céntimos (22,00 €)
      type: 'printful_merch',
      imageUrl: '👕',
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
    console.log(`✅ Producto insertado: ${product.name}`);
  }
  
  // También insertamos un usuario 'educador' de prueba
  const testUser = await prisma.user.upsert({
    where: { email: 'profe@musicabalu.com' },
    update: { role: 'educador' },
    create: {
      email: 'profe@musicabalu.com',
      role: 'educador',
      name: 'Profesora Prueba'
    }
  });
  console.log(`👤 Usuario de prueba asegurado: ${testUser.email} (Rol: ${testUser.role})`);

  console.log("🎉 Seeding completado exitosamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
