import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const logs = await prisma.activityLog.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { email: true } } }
  });
  console.log("Últimos 5 logs:", JSON.stringify(logs, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
