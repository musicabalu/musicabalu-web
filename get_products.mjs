import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.product.findMany();
  console.log(p.map(x => ({id: x.id, name: x.name, imageUrl: x.imageUrl})));
}
main().finally(() => prisma.$disconnect());
