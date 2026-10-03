import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const allActivities = await prisma.activity.findMany({
    select: { id: true, titulo: true, categoria: true }
  });
  console.log("=== Todas las Actividades ===");
  allActivities.forEach(a => console.log(`${a.id} | ${a.categoria} | ${a.titulo}`));

  const allLogs = await prisma.activityLog.findMany();
  console.log("\n=== Todos los Logs de Actividad (Muestra 20) ===");
  allLogs.slice(0, 20).forEach(l => console.log(`${l.action} | ${l.details}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
