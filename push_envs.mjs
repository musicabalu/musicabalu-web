import fs from 'fs';
import { execSync } from 'child_process';

const envContent = fs.readFileSync('.env', 'utf-8');
const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));

for (const line of lines) {
  const equalIdx = line.indexOf('=');
  if (equalIdx > -1) {
    const key = line.slice(0, equalIdx).trim();
    let value = line.slice(equalIdx + 1).trim();

    // EXCEPCIÓN: No sincronizar DATABASE_URL porque Vercel necesita la URL del Pooler (IPv4)
    // y en local usamos la directa (IPv6/5432)
    if (key === 'DATABASE_URL') {
      console.log(`⚠️  Saltando DATABASE_URL (se mantiene la del pooler en Vercel)`);
      continue;
    }

    // Eliminar comillas dobles si las hubiera (ya las quitamos antes, pero por si acaso)
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    console.log(`Borrando ${key}...`);
    try {
      execSync(`npx vercel env rm ${key} production -y`, { stdio: 'ignore' });
    } catch (e) {
      // Ignorar si no existe
    }

    console.log(`Añadiendo ${key}...`);
    try {
      execSync(`echo "${value}" | npx vercel env add ${key} production`, { stdio: 'ignore' });
      console.log(`✅ ${key} añadido correctamente.`);
    } catch (e) {
      console.error(`❌ Error añadiendo ${key}`);
    }
  }
}
console.log("¡Variables sincronizadas!");
