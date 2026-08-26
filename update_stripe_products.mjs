import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Limpiando productos antiguos...");
  await prisma.product.deleteMany({});

  console.log("Creando productos definitivos para la Tienda...");

  await prisma.product.createMany({
    data: [
      {
        name: 'Suscripción Comunidad Familiar',
        description: 'Acceso total a todas las canciones, audios, recitados y píldoras. Ideal para cantar y jugar en familia.',
        price: 590, // 5.90€
        type: 'subscription',
        imageUrl: '✨'
      },
      {
        name: 'Regala Musicabalú (1 Año)',
        description: 'Regala 1 año completo de acceso a la Comunidad Familiar. Se te enviará un código regalo por email.',
        price: 5900, // 59.00€
        type: 'gift',
        imageUrl: '🎁'
      },
      {
        name: 'Body Musicabalú (Bebé)',
        description: `No hay nada que importe más que la comodidad de un bebé y, por eso, este body es la elección perfecta para dar libertad a los más pequeños. Su cuello cruzado y el cierre inferior de 3 corchetes garantizan comodidad durante todo el día.

• 100% algodón airlume peinado e hilado en anillos
• Tela súper suave, ideal para su piel delicada (132,2 g/m²)
• Construcción con costuras laterales
• Cuello cruzado y cierre inferior de 3 corchetes para facilitar el cambio
• Color: Blanco`,
        price: 1990, // 19.90€
        type: 'printful_merch',
        imageUrl: '/imagenes/merchandising/body1.jpg, /imagenes/merchandising/body2.jpg'
      },
      {
        name: 'Camiseta Musicabalú (Infantil)',
        description: `¡Nunca es demasiado pronto para lucir un aspecto estupendo en clase de música! Con esta camiseta Bella + Canvas de algodón suave y ligero, incluso los peques más activos se sentirán cómodos. Su corte informal y el cuello redondo la convertirán en una de las prendas más queridas de su armario.

• 100% algodón Airlume peinado e hilado en anillos
• Tela ligera y transpirable (142 g/m²)
• Costuras laterales y corte cómodo
• Colores: Rosa o Blanca`,
        price: 1890, // 18.90€
        type: 'printful_merch',
        imageUrl: '/imagenes/merchandising/cam_blanca1.jpg, /imagenes/merchandising/cam_blanca2.jpg, /imagenes/merchandising/cam_blanca3.jpg, /imagenes/merchandising/cam_rosa1.jpg, /imagenes/merchandising/cam_rosa2.jpg'
      },
      {
        name: 'Bolsa de Tela Orgánica',
        description: `¡No hay nada más a la última que ser respetuoso con el medio ambiente! Esta bolsa de algodón orgánico certificado es súper resistente. Tiene el tamaño ideal para llevar pañales, libros, la merienda ¡y todo lo que necesitéis para clase!

• 100% sarga de algodón orgánico certificado (GOTS, OCS) y sello vegano PETA
• Tejido extra resistente (272 g/m²) que soporta hasta 13,6 kg de peso
• Dimensiones: 40,6 cm × 35,6 cm × 12,7 cm
• Compartimento principal muy amplio con tiras largas de 62,2 cm
• Color: Beige orgánico natural`,
        price: 2290, // 22.90€
        type: 'printful_merch',
        imageUrl: '/imagenes/merchandising/bolsa1.jpg, /imagenes/merchandising/bolsa2.jpg'
      }
    ]
  });

  console.log("✅ Productos creados con éxito.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
