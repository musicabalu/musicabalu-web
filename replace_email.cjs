const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/legal/aviso-legal/page.js',
  'src/app/legal/privacidad/page.js',
  'src/components/Footer.js',
  'src/app/inscripcion/page.js',
  'src/app/inscripcion/ef/page.js',
  'src/components/ProductDetailClient.js',
  'src/app/(panel)/admin/estrategia/estrategiaData.js',
  'src/app/formaciones/page.js',
  'src/app/presencial/page.js',
  'src/app/api/webhooks/stripe/route.js',
  'src/app/(panel)/comunidad/pildoras/page.js'
];

for (const file of filesToUpdate) {
  const filePath = path.join('/Users/mgt/ProyectosVSCode/musicabalu/web26', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const oldContent = content;
    // Replace all occurrences
    content = content.replace(/musicabalu@gmail\.com/g, 'hola@musicabalu.com');
    if (content !== oldContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
