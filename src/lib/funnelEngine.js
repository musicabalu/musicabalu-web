import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";
import { getFunnelEmail } from "./funnelEmails.js";

const prisma = new PrismaClient();

export async function processFunnel({ sendNow = true } = {}) {
  // 1. Emails dados de baja
  const unsubs = await prisma.adminNote.findMany({
    where: { category: "EmailBaja" },
    select: { title: true },
  });
  const unsubSet = new Set(unsubs.map((u) => (u.title || "").toLowerCase().trim()));

  // 2. Todos los logs de entrada al regalo
  const initialLogs = await prisma.activityLog.findMany({
    where: {
      details: { contains: "/regalo" },
    },
    include: {
      user: {
        include: {
          activityLogs: {
            orderBy: { createdAt: "asc" },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Agrupar por usuario único
  const userMap = new Map();
  for (const log of initialLogs) {
    if (!log.user || !log.user.email) continue;
    const email = log.user.email.toLowerCase().trim();
    if (!userMap.has(email)) {
      userMap.set(email, {
        user: log.user,
        initialOptIn: log.createdAt,
      });
    }
  }

  const now = new Date();
  const H20 = 20 * 60 * 60 * 1000; // 20 horas de margen para cadencia de 24h
  const H44 = 44 * 60 * 60 * 1000; // 44 horas de margen para cadencia de 48h

  const queue = [];
  const statusSummary = {
    totalLeads: userMap.size,
    subscribersExcluded: 0,
    unsubscribedExcluded: 0,
    waitingNextStep: 0,
    completedFunnel: 0,
    eligibleToSend: [],
    sentResults: [],
  };

  for (const [email, { user, initialOptIn }] of userMap.entries()) {
    // Si ya tiene suscripción de pago activa, no le vendemos suscripción
    if (user.hasActiveSub) {
      statusSummary.subscribersExcluded++;
      continue;
    }

    // Si ha pedido baja
    if (unsubSet.has(email)) {
      statusSummary.unsubscribedExcluded++;
      continue;
    }

    // Revisar qué correos del embudo ya tiene
    const logs = user.activityLogs || [];
    const log2 = logs.find((l) => l.action === "Funnel Email 2");
    const log3 = logs.find((l) => l.action === "Funnel Email 3");
    const log4 = logs.find((l) => l.action === "Funnel Email 4");
    const log5 = logs.find((l) => l.action === "Funnel Email 5");

    let nextStep = null;
    let dueReason = "";

    if (!log2) {
      const elapsed = now.getTime() - new Date(initialOptIn).getTime();
      if (elapsed >= H20) {
        nextStep = 2;
        dueReason = "Más de 24h desde registro inicial";
      }
    } else if (!log3) {
      const elapsed = now.getTime() - new Date(log2.createdAt).getTime();
      if (elapsed >= H44) {
        nextStep = 3;
        dueReason = "Más de 48h desde Email 2";
      }
    } else if (!log4) {
      const elapsed = now.getTime() - new Date(log3.createdAt).getTime();
      if (elapsed >= H44) {
        nextStep = 4;
        dueReason = "Más de 48h desde Email 3";
      }
    } else if (!log5) {
      const elapsed = now.getTime() - new Date(log4.createdAt).getTime();
      if (elapsed >= H20) {
        nextStep = 5;
        dueReason = "Más de 24h desde Email 4";
      }
    } else {
      statusSummary.completedFunnel++;
      continue;
    }

    if (nextStep) {
      queue.push({
        user,
        email,
        nextStep,
        dueReason,
      });
    } else {
      statusSummary.waitingNextStep++;
    }
  }

  statusSummary.eligibleToSend = queue.map((q) => ({
    name: q.user.name || "Sin nombre",
    email: q.email,
    step: q.nextStep,
    reason: q.dueReason,
  }));

  // 3. Ejecutar envío si sendNow es true
  if (sendNow && queue.length > 0) {
    const transport = createTransport(process.env.EMAIL_SERVER);
    const fromAddress = process.env.EMAIL_FROM || "Musicabalú <hola@musicabalu.com>";

    for (const item of queue) {
      const emailData = getFunnelEmail(item.nextStep, {
        name: item.user.name,
        email: item.email,
      });

      if (!emailData) continue;

      try {
        await transport.sendMail({
          from: fromAddress,
          to: item.email,
          subject: emailData.subject,
          html: emailData.html,
        });

        // Registrar en ActivityLog
        await prisma.activityLog.create({
          data: {
            userId: item.user.id,
            action: emailData.actionLog,
            details: emailData.subject,
          },
        });

        statusSummary.sentResults.push({
          email: item.email,
          step: item.nextStep,
          status: "sent",
          subject: emailData.subject,
        });

        console.log(`✅ [Funnel] Email ${item.nextStep} enviado con éxito a ${item.email}`);
      } catch (err) {
        console.error(`❌ [Funnel] Error enviando Email ${item.nextStep} a ${item.email}:`, err);
        statusSummary.sentResults.push({
          email: item.email,
          step: item.nextStep,
          status: "error",
          error: err.message,
        });
      }
    }
  }

  return statusSummary;
}
