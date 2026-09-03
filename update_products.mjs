import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  
  const products = [
    {
      id: 'pack_regalo',
      name: 'Paquete Regalo Musicabalú',
      description: 'El kit perfecto para empezar. Incluye 2 pañuelos, 2 huevos sonoros, saquitos y una tarjeta QR con 3 canciones.',
      price: 3500,
      type: 'physical_kit',
      imageUrl: '🎁',
    },
    {
      id: 'audio_relajacion',
      name: 'Audio Relajación y Sueño',
      description: '45 minutos de música continua diseñada con frecuencias específicas para ayudar al descanso de tu bebé.',
      price: 990,
      type: 'digital',
      imageUrl: '🌙',
    },
    {
      id: 'merch_camiseta_1',
      name: 'Camiseta Musicabalú (Logo Texto)',
      description: 'Camiseta de algodón 100% orgánico con nuestro logotipo original.',
      price: 2200,
      type: 'printful_merch',
      imageUrl: '/imagenes/merchandising/cam1_blanca1.jpg, /imagenes/merchandising/cam1_blanca2.jpg, /imagenes/merchandising/cam1_blanca3.jpg, /imagenes/merchandising/cam1_rosa1.jpg, /imagenes/merchandising/cam1_rosa2.jpg',
    },
    {
      id: 'merch_camiseta_2',
      name: 'Camiseta Musicabalú (Mascota)',
      description: 'Camiseta de algodón 100% orgánico con nuestra mascota estampada.',
      price: 2200,
      type: 'printful_merch',
      imageUrl: '/imagenes/merchandising/cam2_blanca1.jpg, /imagenes/merchandising/cam2_blanca2.jpg, /imagenes/merchandising/cam2_negra1.jpg, /imagenes/merchandising/cam2_negra2.jpg, /imagenes/merchandising/cam2_rosa1.jpg, /imagenes/merchandising/cam2_rosa2.jpg',
    },
    {
      id: 'merch_camiseta_adulto',
      name: 'Camiseta Adulto (Unisex)',
      description: 'Nuestra camiseta premium Bella + Canvas 3001. Corte moderno, tacto muy suave y excelente calidad.',
      price: 2500,
      type: 'printful_merch',
      imageUrl: '/imagenes/merchandising/camadult_amarilla1.jpg, /imagenes/merchandising/camadult_amarilla2.jpg, /imagenes/merchandising/camadult_blanca1.jpg, /imagenes/merchandising/camadult_blanca2.jpg, /imagenes/merchandising/camadult_negra1.jpg, /imagenes/merchandising/camadult_negra2.jpg, /imagenes/merchandising/camadult_verde1.jpg, /imagenes/merchandising/camadult_verde2.jpg',
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
    console.log(`✅ Producto insertado: ${product.name}`);
  }
}
main().finally(() => prisma.$disconnect());
