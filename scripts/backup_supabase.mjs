import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function runBackup() {
  const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), 'backups', `supabase_${dateStr}`);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  console.log(`📦 Iniciando backup de Supabase en: ${backupDir}`);

  const tables = {
    users: () => prisma.user.findMany(),
    groups: () => prisma.group.findMany(),
    enrollments: () => prisma.enrollment.findMany(),
    orders: () => prisma.order.findMany(),
    products: () => prisma.product.findMany(),
    workshops: () => prisma.workshop.findMany(),
    waitlists: () => prisma.waitlist.findMany(),
    videoScripts: () => prisma.videoScript.findMany(),
    adminNotes: () => prisma.adminNote.findMany(),
    activities: () => prisma.activity.findMany(),
    contentPills: () => prisma.contentPill.findMany(),
    activityLogs: () => prisma.activityLog.findMany(),
  };

  const summary = {};

  for (const [name, queryFn] of Object.entries(tables)) {
    try {
      const data = await queryFn();
      summary[name] = data.length;
      fs.writeFileSync(path.join(backupDir, `${name}.json`), JSON.stringify(data, null, 2), 'utf-8');
      console.log(`  ✓ ${name}: ${data.length} registros`);
    } catch (err) {
      console.error(`  ✗ Error en tabla ${name}:`, err.message);
      summary[name] = `Error: ${err.message}`;
    }
  }

  // Guardar también un archivo único consolidado con todo
  const fullBackup = {};
  for (const name of Object.keys(tables)) {
    try {
      const raw = fs.readFileSync(path.join(backupDir, `${name}.json`), 'utf-8');
      fullBackup[name] = JSON.parse(raw);
    } catch {}
  }
  fs.writeFileSync(path.join(backupDir, 'full_backup.json'), JSON.stringify(fullBackup, null, 2), 'utf-8');

  // Metadata summary
  fs.writeFileSync(path.join(backupDir, 'summary.json'), JSON.stringify({
    createdAt: new Date().toISOString(),
    records: summary
  }, null, 2), 'utf-8');

  console.log(`\n🎉 Backup completado exitosamente con ${Object.values(summary).reduce((a, b) => (typeof b === 'number' ? a + b : a), 0)} registros totales.`);
}

runBackup()
  .catch(err => {
    console.error('Error fatal durante el backup:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
