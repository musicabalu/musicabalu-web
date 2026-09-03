import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const adultDesc = `Esta camiseta premium unisex tiene un tacto suave y ligero y las dosis justas de elasticidad. Su corte cómodo y unisex favorece a cualquiera. Y no lo decimos nosotros: es una de las favoritas de nuestros clientes. ¡Seguro que pronto también será la tuya!

Los colores sólidos son 100% de algodón Airlume peinado e hilado en anillos
El tono Ash es en un 99% de algodón peinado e hilado en anillos y contiene un 1% de poliéster
Los tonos Heather se componen de un 52% de algodón peinado e hilado en anillos y un 48% de poliéster
Los tonos Athletic y Black Heather se componen de un 90% de algodón peinado e hilado en anillos y un 10% de poliéster
Los tonos Heather Prism tienen un 99% de algodón peinado e hilado en anillos y un 1% de poliéster
Peso del tejido: 142 g/m² (4,2 oz/yd²)
Tela prelavada
Densidad del hilo: 30 filamentos
Confeccionada con costuras laterales
Etiqueta extraíble
Tapeta de hombro a hombro
Producto base procedente de Nicaragua, México Honduras o EEUU

Aviso: El tejido es ligeramente translúcido y puede resultar algo transparente, especialmente en colores claros o bajo determinadas condiciones de iluminación.`;

  await prisma.product.update({
    where: { id: 'merch_camiseta_adulto' },
    data: { description: adultDesc }
  });
  console.log('✅ Adult t-shirt description updated.');
}
main().finally(() => prisma.$disconnect());
