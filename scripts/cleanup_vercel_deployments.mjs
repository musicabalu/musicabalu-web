import { execSync } from 'child_process';

console.log("🔍 Obteniendo lista de despliegues en Vercel...");

try {
  const output = execSync('npx vercel ls musicabalu --json --limit 100', { encoding: 'utf-8' });
  const data = JSON.parse(output);
  const deployments = data.deployments || [];

  console.log(`📋 Total despliegues encontrados: ${deployments.length}`);

  if (deployments.length <= 2) {
    console.log("✅ Solo hay 2 o menos despliegues. No es necesario limpiar.");
    process.exit(0);
  }

  // Ordenar por createdAt descendente (el más reciente primero)
  deployments.sort((a, b) => b.createdAt - a.createdAt);

  const keep = deployments.slice(0, 2);
  const toDelete = deployments.slice(2);

  console.log(`🔒 Conservando los 2 despliegues más recientes:`);
  keep.forEach(d => console.log(`   - ${d.url} (${new Date(d.createdAt).toLocaleString('es-ES')})`));

  console.log(`\n🗑️ Despliegues antiguos a eliminar: ${toDelete.length}`);

  // Eliminar en lotes de 5 para no saturar la línea de comandos
  const batchSize = 5;
  let deletedCount = 0;

  for (let i = 0; i < toDelete.length; i += batchSize) {
    const batch = toDelete.slice(i, i + batchSize);
    const urls = batch.map(d => d.url).join(' ');
    console.log(`\nEliminando lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(toDelete.length / batchSize)} (${batch.length} despliegues)...`);
    
    try {
      execSync(`npx vercel rm ${urls} --yes`, { stdio: 'inherit' });
      deletedCount += batch.length;
    } catch (err) {
      console.error(`⚠️ Error eliminando parte del lote:`, err.message);
    }
  }

  console.log(`\n🎉 ¡Limpieza completada! Se han eliminado ${deletedCount} despliegues antiguos.`);
  console.log("💾 Tu almacenamiento en Vercel ha quedado liberado.");

} catch (error) {
  console.error("❌ Error en la limpieza:", error.message);
  process.exit(1);
}
