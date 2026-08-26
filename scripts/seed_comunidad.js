const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dbPath = path.join(__dirname, '../../database');
  const activitiesPath = path.join(dbPath, 'actividades_bruto_todos.json');
  const pillsPath = path.join(dbPath, 'pildoras_bruto_todos.json');

  console.log('🌱 Iniciando seed de La Comunidad...');

  // --- ACTIVITIES ---
  if (fs.existsSync(activitiesPath)) {
    const rawActivities = fs.readFileSync(activitiesPath, 'utf-8');
    try {
      const activities = JSON.parse(rawActivities);
      console.log(`Encontradas ${activities.length} actividades. Insertando en la BD...`);
      
      let activitiesAdded = 0;
      for (const act of activities) {
        // Simple deduplication logic: check if an activity with the same title and book exists
        const existing = await prisma.activity.findFirst({
          where: {
            titulo: act.titulo,
            libro_origen: act.libro_origen
          }
        });

        if (!existing) {
          await prisma.activity.create({
            data: {
              titulo: act.titulo || 'Sin título',
              edades: act.edades || 'No especificada',
              categoria: act.categoria || 'Sin categoría',
              descripcion: act.descripcion || '',
              libro_origen: act.libro_origen || 'Desconocido',
              isFree: activitiesAdded < 3 // Las primeras 3 son gratis
            }
          });
          activitiesAdded++;
        }
      }
      console.log(`✅ ${activitiesAdded} actividades nuevas añadidas.`);
    } catch (e) {
      console.error('⚠️ Error procesando actividades:', e.message);
    }
  } else {
    console.log('ℹ️ No se encontró el archivo de actividades.');
  }

  // --- PILLS ---
  if (fs.existsSync(pillsPath)) {
    const rawPills = fs.readFileSync(pillsPath, 'utf-8');
    try {
      const pills = JSON.parse(rawPills);
      console.log(`Encontradas ${pills.length} píldoras. Insertando en la BD...`);
      
      let pillsAdded = 0;
      for (const pill of pills) {
        // Simple deduplication logic
        const existing = await prisma.contentPill.findFirst({
          where: {
            teoria_mlt: pill.teoria_mlt,
            libro_origen: pill.libro_origen
          }
        });

        if (!existing) {
          await prisma.contentPill.create({
            data: {
              tipo: pill.tipo || 'General',
              teoria_mlt: pill.teoria_mlt || '',
              aplicacion_practica: pill.aplicacion_practica || '',
              libro_origen: pill.libro_origen || 'Desconocido',
              isFree: pillsAdded < 2 // Las primeras 2 son gratis
            }
          });
          pillsAdded++;
        }
      }
      console.log(`✅ ${pillsAdded} píldoras nuevas añadidas.`);
    } catch (e) {
      console.error('⚠️ Error procesando píldoras:', e.message);
    }
  } else {
    console.log('ℹ️ No se encontró el archivo de píldoras.');
  }

  console.log('🎉 Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
