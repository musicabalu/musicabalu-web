import fs from 'fs';

const filePath = '/Users/mgt/ProyectosVSCode/musicabalu/web26/src/app/(panel)/admin/estrategia/estrategiaData.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the previously inserted Talleres line
const targetText = '<li><strong>Talleres Familiares Puntuales (Pop-ups) en Escuelas:</strong> Sesiones sueltas de 45 minutos los fines de semana en escuelas infantiles colaboradoras. Máximo 10-12 familias a 20 € por inscripción. El modelo de alquiler será la cesión del 25% de la recaudación a la escuela. El objetivo es que actúen como un embudo hiperrentable hacia las suscripciones Freemium y las clases regulares.</li>\n  ';
content = content.replace(targetText, '');

// 2. Change Section 7 to 8, and 8 to 9.
content = content.replace('<div class="section-num sn7">7</div><div class="section-title">Calendario Operativo y Sprints', '<div class="section-num sn7">8</div><div class="section-title">Calendario Operativo y Sprints');
content = content.replace('<div class="section-num sn8">8</div><div class="section-title">Plan de Tráfico', '<div class="section-num sn8">9</div><div class="section-title">Plan de Tráfico');

// 3. Create the new Section 7 for Talleres
const newSection = `<!-- 7. TALLERES PUNTUALES -->
<div class="section pb">
  <div class="section-header"><div class="section-num sn7" style="background-color: var(--yellow); color: var(--dark);">7</div><div class="section-title">Talleres Familiares Puntuales (Pop-ups)</div></div>
  <div class="intro-box"><p><strong>El producto de entrada de alta rotación.</strong> Una experiencia intensiva de 45 minutos de música en familia durante los fines de semana, diseñada para captar volumen, generar ingresos rápidos y alimentar el embudo principal (clases y membresía).</p></div>
  <h3>Modelo Comercial y Operativa</h3>
  <ul class="checklist">
    <li><strong>Formato y Aforo:</strong> Sesiones sueltas de 45 minutos (ej. un sábado por la mañana, dos turnos seguidos). Máximo 10-12 familias por turno para asegurar calidad.</li>
    <li><strong>Precio:</strong> 20 € por familia inscrita.</li>
    <li><strong>Alquiler de Espacio:</strong> Se acuerda con la escuela infantil colaboradora una cesión del 25% de la recaudación a cambio del espacio y de que promocionen el taller a sus familias.</li>
    <li><strong>El Gancho del Embudo:</strong> Al inscribirse, se les regala una cuenta gratuita (Freemium) en la web. Cuando entran para prepararse para el taller, escuchan 4 canciones gratis pero ven el repertorio completo bloqueado, generando interés en la suscripción digital o presencial.</li>
  </ul>
</div>

`;

// Insert the new section just before section 8
content = content.replace('<!-- 7. CALENDARIO -->', newSection + '<!-- 8. CALENDARIO -->');

fs.writeFileSync(filePath, content);
console.log('Fixed estrategiaData.js');
