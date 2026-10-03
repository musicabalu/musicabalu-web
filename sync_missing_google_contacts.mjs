import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando sincronización de contactos perdidos en Google...");

  // Leer .env
  const envPath = '.env';
  if (!fs.existsSync(envPath)) {
    throw new Error('.env file not found');
  }
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = envContent.split('\n').reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k && v.length) {
      acc[k] = v.join('=').replace(/"/g, '').trim();
    }
    return acc;
  }, {});

  const oauth2Client = new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN });

  const people = google.people({ version: 'v1', auth: oauth2Client });

  // 1. Obtener todos los grupos para mapearlos por nombre
  const contactGroupsRes = await people.contactGroups.list();
  const groups = contactGroupsRes.data.contactGroups || [];
  const groupMap = {};
  groups.forEach(g => {
    groupMap[g.name] = g.resourceName;
  });

  // Función para obtener o crear grupo
  async function getOrCreateGroup(labelName) {
    if (groupMap[labelName]) {
      return groupMap[labelName];
    }
    console.log(`Creando etiqueta en Google Contacts: ${labelName}`);
    const res = await people.contactGroups.create({
      requestBody: { contactGroup: { name: labelName } }
    });
    groupMap[labelName] = res.data.resourceName;
    return res.data.resourceName;
  }

  // 2. Obtener los alumnos recientes (desde el 10 de Septiembre)
  const recentEnrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: new Date('2026-09-10T00:00:00Z')
      },
      status: { in: ['active', 'pending'] }
    },
    include: {
      group: true
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Encontradas ${recentEnrollments.length} inscripciones desde el 10 de septiembre.`);

  // 3. Procesarlas
  let added = 0;
  for (const enr of recentEnrollments) {
    try {
      const contactName = `${enr.parentName} (Madre/Padre de ${enr.childName})`;
      
      // Buscar si ya existe para evitar duplicados exactos por email
      const searchRes = await people.people.searchContacts({
        query: enr.email,
        readMask: 'names,emailAddresses'
      });
      
      if (searchRes.data.results && searchRes.data.results.length > 0) {
        console.log(`⏩ Saltando ${contactName} - Ya existe en Google Contacts (email coincide).`);
        continue;
      }

      // Determinar etiqueta
      let labelName = "Musicabalú (Sin grupo)";
      if (enr.group && enr.group.location) {
        const locName = enr.group.location;
        if (locName.includes('EMPI')) labelName = 'Musicabalú - EMPI';
        else if (locName.includes('La Casa del Árbol')) labelName = 'Musicabalú - Casa del Árbol';
        else if (locName.includes('Kala')) labelName = 'Musicabalú - Espacio Kala';
        else if (locName.includes('Limonar')) labelName = 'Musicabalú - Colegio El Limonar';
        else labelName = `Musicabalú - ${locName}`;
      }

      const resourceName = await getOrCreateGroup(labelName);

      // Crear contacto
      await people.people.createContact({
        requestBody: {
          names: [{ givenName: contactName }],
          emailAddresses: [{ value: enr.email, type: 'work' }],
          phoneNumbers: [{ value: enr.phone || '', type: 'mobile' }],
          memberships: [
            {
              contactGroupMembership: {
                contactGroupResourceName: resourceName
              }
            }
          ]
        }
      });
      console.log(`✅ Creado: ${contactName} con etiqueta [${labelName}]`);
      added++;
    } catch (err) {
      console.error(`❌ Error con ${enr.parentName}:`, err.message);
    }
  }

  console.log(`\n🎉 Proceso completado. Se han añadido ${added} contactos nuevos.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
