import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Reading HTML file...');
  const htmlPath = path.resolve(process.cwd(), '../database/pildoras_y_guiones_unificados.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  const $ = cheerio.load(html);
  
  const pills = [];
  
  $('h2').each((index, element) => {
    const text = $(element).text();
    if (text.includes('🎬 Píldora')) {
      // Find the content until the next h2 or hr
      const title = text;
      let theoryContent = '';
      let scriptContent = '';
      
      let current = $(element).next();
      let section = null;
      
      while (current.length > 0 && !current.is('h2') && !current.is('hr')) {
        if (current.is('h3')) {
          if (current.text().includes('Base Teórica')) {
            section = 'theory';
          } else if (current.text().includes('Guion de Vídeo')) {
            section = 'script';
          }
        } else {
          if (section === 'theory') {
            theoryContent += $.html(current);
          } else if (section === 'script') {
            scriptContent += $.html(current);
          }
        }
        current = current.next();
      }
      
      pills.push({
        title,
        theoryContent: theoryContent.trim(),
        scriptContent: scriptContent.trim(),
        status: 'Pendiente',
        order: index
      });
    }
  });

  console.log(`Found ${pills.length} scripts from HTML.`);
  
  // Clear existing
  console.log('Clearing existing VideoScripts...');
  await prisma.videoScript.deleteMany({});
  
  // Insert parsed
  console.log('Inserting parsed scripts...');
  let i = 0;
  for (const pill of pills) {
    await prisma.videoScript.create({ data: { ...pill, order: i++ } });
  }

  // Insert the 2 new ones
  console.log('Inserting the 2 new scripts...');
  
  const gordonScript = `
<p><strong>Concepto:</strong> El cerebro del bebé absorbe la música como un idioma materno.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos para separarlos en edición.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>¿Sabías que la forma en que los bebés aprenden música ya ha sido descifrada por la ciencia?</p>
<p>A lo largo de su vida, el gran pedagogo e investigador Edwin Gordon demostró cómo aprende música nuestro cerebro. Y nos dejó una enseñanza brutal: los primeros años de vida son nuestra mayor ventana de oportunidad.</p>
<p>Según su 'Teoría del Aprendizaje Musical', en esos primeros años el cerebro del bebé absorbe la música exactamente igual que absorbe su idioma materno. Por eso, no podemos desaprovechar ese momento.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"En Musicabalú nos basamos 100% en su ciencia para hacer magia en clase. Síguenos para descubrir cómo potenciar el talento de tu peque."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"En nuestra comunidad usamos esta misma ciencia en cada juego. Sigue explorando las siguientes píldoras para entender cómo funciona."</p>
`;

  await prisma.videoScript.create({
    data: {
      title: '🎬 Píldora 113: "Edwin Gordon y la Teoría del Aprendizaje Musical"',
      theoryContent: '<p>Gordon demostró que el aprendizaje musical temprano (0-3 años) es crucial y se asimila de forma idéntica al desarrollo del lenguaje materno, en la etapa de Aculturación.</p>',
      scriptContent: gordonScript.trim(),
      status: 'Próxima',
      order: i++
    }
  });

  const recitadosScript = `
<p><strong>Concepto:</strong> Separación de tonalidad (canciones) y ritmo (recitados) + evitar letras distractoras y modos limitados.</p>
<p><strong>Estrategia de Grabación:</strong> Graba el cuerpo del vídeo primero y luego los dos finales alternativos para separarlos en edición.</p>
<hr/>
<p><strong>(COMIENZA A GRABAR EL CUERPO)</strong></p>
<p>Si te fijas, en nuestras clases usamos dos cosas muy distintas: <br/>
Canciones con melodía y recitados que son solo ritmo.</p>
<p>¿Por qué los separamos?<br/>
Es una de las grandes aportaciones de Edwin Gordon.</p>
<p>Al usar la voz cantada trabajamos la afinación, <br/>
y con la voz hablada trabajamos el pulso rítmico. <br/>
Separarlos ayuda al peque a interiorizar la diferencia y afinar muchísimo mejor.</p>
<p>Pero nuestras canciones tienen algo especial.<br/>
Casi todas las canciones infantiles tradicionales están en modo mayor o menor. <br/>
Nosotros utilizamos hasta 8 modos musicales diferentes para darles un vocabulario musical muchísimo más rico.</p>
<p>Y hay otra gran diferencia: <strong>las letras</strong>.<br/>
Normalmente, las canciones infantiles cuentan historias. <br/>
Pero según Gordon, hasta los 3 años... ¡el texto distrae al cerebro de escuchar la música!</p>
<p>Por eso, la mayoría de nuestras canciones no tienen letra, o si la tienen, es solo para acompañar un movimiento, no para contar un cuento.</p>
<p>Mucha más variedad musical, y cero distracciones.<br/>
Así es como el cerebro de tu peque aprende de verdad.</p>
<p><strong>(PAUSA Y CORTA EL CUERPO)</strong></p>
<p><strong>FINAL A (Redes Sociales):</strong><br/>
"Soy Javi, sígueme si quieres descubrir cómo potenciar a tu bebé a través de la música."</p>
<p><strong>FINAL B (Plataforma Web):</strong><br/>
"Te animo a que explores las canciones de La Comunidad y busques cuáles no tienen texto."</p>
`;

  await prisma.videoScript.create({
    data: {
      title: '🎬 Píldora 114: "¿Por qué utilizamos canciones y recitados?"',
      theoryContent: '<p>Separación de sintaxis tonal y rítmica para evitar saturación cognitiva. Uso de 8 modos para riqueza de vocabulario. Eliminación de texto distractor en etapas tempranas.</p>',
      scriptContent: recitadosScript.trim(),
      status: 'Próxima',
      order: i++
    }
  });

  console.log('Seding complete! Inserted 114 scripts.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
