import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function analyze() {
  console.log("=== 1. LEADS DEL REGALO (/regalo) ===");
  // Activity logs with "Lead Magnet" or users created via /regalo
  const leadLogs = await prisma.activityLog.findMany({
    where: { action: { contains: "Lead Magnet" } },
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });

  console.log(`Total registros en ActivityLog de Lead Magnet: ${leadLogs.length}`);
  for (const log of leadLogs) {
    const u = log.user;
    // Check if user has other activity logs (logins, audio plays, etc.)
    const otherLogs = await prisma.activityLog.findMany({
      where: {
        userId: u.id,
        id: { not: log.id }
      },
      orderBy: { createdAt: "desc" }
    });
    // Check if user has active sessions
    const sessions = await prisma.session.findMany({
      where: { userId: u.id }
    });

    console.log(`\n- Lead: ${u.name} <${u.email}> (Registrado: ${log.createdAt.toLocaleString('es-ES')})`);
    console.log(`  Sesiones activas: ${sessions.length}`);
    console.log(`  Otras acciones registradas (${otherLogs.length}):`);
    if (otherLogs.length === 0) {
      console.log(`    ⚠️ NINGUNA ACTIVIDAD POSTERIOR (No ha iniciado sesión ni escuchado nada)`);
    } else {
      otherLogs.forEach(ol => {
        console.log(`    • [${ol.createdAt.toLocaleString('es-ES')}] ${ol.action} -> ${ol.details || ''}`);
      });
    }
  }

  console.log("\n=== 2. SUSCRIPTORES EXTERNOS A CLASES PRESENCIALES (Comunidad Online 3,90€ / 39€) ===");
  const externalSubs = await prisma.user.findMany({
    where: {
      hasActiveSub: true,
      email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com', 'jamusanchez@gmail.com'] }
    },
    include: {
      enrollments: true,
      orders: true,
      sessions: true
    }
  });

  // Filter those without active/pending enrollments in physical classes
  const purelyExternal = externalSubs.filter(u => 
    !u.enrollments || !u.enrollments.some(e => e.status === 'active' || e.status === 'pending')
  );

  console.log(`Total suscriptores online encontrados: ${purelyExternal.length}`);

  for (const sub of purelyExternal) {
    console.log(`\n👤 Suscriptor: ${sub.name || 'Sin nombre'} <${sub.email}>`);
    console.log(`   Rol: ${sub.role}`);
    console.log(`   Sesiones registradas: ${sub.sessions.length}`);
    console.log(`   Pedidos Stripe: ${sub.orders.length}`);
    sub.orders.forEach(o => {
      console.log(`     - Pedido: ${o.productName} (${o.amountTotal / 100}€) - ${o.createdAt.toLocaleString('es-ES')}`);
    });

    const userLogs = await prisma.activityLog.findMany({
      where: { userId: sub.id },
      orderBy: { createdAt: "desc" },
      take: 20
    });

    console.log(`   Actividad registrada en ActivityLog (${userLogs.length} eventos recientes):`);
    if (userLogs.length === 0) {
      console.log(`     ⚠️ Sin actividad registrada.`);
    } else {
      userLogs.forEach(l => {
        console.log(`     • [${l.createdAt.toLocaleString('es-ES')}] ${l.action} -> ${l.details || ''}`);
      });
    }
  }

  console.log("\n=== 3. RESUMEN GLOBAL DE ACTIVIDAD (ÚLTIMOS 30 DÍAS) ===");
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const allLogs = await prisma.activityLog.findMany({
    where: {
      createdAt: { gte: thirtyDaysAgo },
      user: {
        email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com', 'jamusanchez@gmail.com'] }
      }
    },
    include: { user: true }
  });

  console.log(`Total eventos en últimos 30 días (excluyendo admin): ${allLogs.length}`);

  const actionCounts = {};
  const audioCounts = {};
  const pageCounts = {};

  allLogs.forEach(l => {
    actionCounts[l.action] = (actionCounts[l.action] || 0) + 1;
    if (l.action === "Reproducción Audio" || l.action.includes("Audio") || l.action.includes("Canción")) {
      audioCounts[l.details] = (audioCounts[l.details] || 0) + 1;
    }
    if (l.action === "Visita Página" || l.action.includes("Página")) {
      pageCounts[l.details] = (pageCounts[l.details] || 0) + 1;
    }
  });

  console.log("\nConteo por tipo de acción:");
  console.dir(actionCounts);

  console.log("\nTop páginas visitadas:");
  console.dir(pageCounts);

  console.log("\nTop audios reproducidos:");
  console.dir(audioCounts);
}

analyze().catch(console.error).finally(() => prisma.$disconnect());
