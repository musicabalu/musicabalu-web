export const estrategiaHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Musicabalú — Plan Estratégico 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --pink:   #F4436C;
    --cyan:   #00B2E3;
    --yellow: #FED65E;
    --green:  #AADB1E;
    --dark:   #3C4040;
    --pink-light:   #FDE8EE;
    --cyan-light:   #E0F6FD;
    --yellow-light: #FEF9E7;
    --green-light:  #F0FADC;
    --gray-bg: #FAFAFA;
    --border:  #E8E8E8;
    --white:   #FFFFFF;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Montserrat',sans-serif; background:var(--gray-bg); color:var(--dark); font-size:10.5pt; line-height:1.65; }
  .page { max-width:800px; margin:0 auto; background:var(--white); }

  /* ═══════════════ COVER ═══════════════ */
  .cover {
    background: var(--white);
    padding: 0;
    page-break-after: always;
    position: relative;
    min-height: 600px;
    overflow: hidden;
  }
  /* top color band */
  .cover-top {
    background: var(--pink);
    padding: 40px 60px 36px;
    position: relative;
  }
  .cover-top::after {
    content: '';
    position: absolute;
    bottom: -28px; left: 0; right: 0;
    height: 56px;
    background: var(--white);
    clip-path: ellipse(55% 100% at 50% 100%);
  }
  .cover-badge {
    display: inline-block;
    background: rgba(255,255,255,0.25);
    border: 1.5px solid rgba(255,255,255,0.5);
    color: white;
    padding: 5px 16px;
    border-radius: 20px;
    font-family: 'Quicksand',sans-serif;
    font-size: 8.5pt;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 28px;
  }
  .cover-logo-img {
    display: block;
    height: 80px;
    margin-bottom: 20px;
    filter: brightness(0) invert(1);
  }
  .cover-title {
    font-family: 'Quicksand', sans-serif;
    font-size: 28pt;
    font-weight: 700;
    color: white;
    line-height: 1.25;
    margin-bottom: 10px;
  }
  .cover-sub {
    font-size: 11pt;
    font-weight: 400;
    color: rgba(255,255,255,0.85);
    margin-bottom: 0;
  }

  /* color stripe */
  .cover-stripe {
    display: flex;
    height: 8px;
  }
  .cover-stripe span { flex: 1; }
  .cs1 { background: var(--pink); }
  .cs2 { background: var(--cyan); }
  .cs3 { background: var(--yellow); }
  .cs4 { background: var(--green); }

  /* cover body */
  .cover-body {
    padding: 50px 60px 50px;
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }
  .cover-mascot {
    width: 160px;
    flex-shrink: 0;
  }
  .cover-info { flex: 1; }
  .cover-info h2 {
    font-family: 'Quicksand', sans-serif;
    font-size: 13pt;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border);
  }
  .cover-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .cover-kpi { background: var(--gray-bg); border-radius: 8px; padding:12px 14px; border-left: 4px solid var(--cyan); }
  .cover-kpi-val { font-family:'Quicksand',sans-serif; font-size:16pt; font-weight:700; color:var(--pink); }
  .cover-kpi-lbl { font-size:8.5pt; color:#666; margin-top:2px; }
  .cover-slogan {
    display: flex; gap: 8px; flex-wrap: wrap;
    margin-top: 16px;
  }
  .cover-slogan span {
    font-family:'Quicksand',sans-serif;
    font-size:10pt; font-weight:700;
    padding: 5px 14px; border-radius: 20px;
  }
  .ts1 { background:var(--pink); color:white; }
  .ts2 { background:var(--cyan); color:white; }
  .ts3 { background:var(--yellow); color:var(--dark); }
  .ts4 { background:var(--green); color:var(--dark); }

  .cover-date { font-size:8.5pt; color:#999; margin-top:20px; font-style:italic; }

  /* ═══════════════ SECTION LAYOUT ═══════════════ */
  .content { padding: 0 50px; }
  .section { padding: 40px 0 0; }

  .section-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 22px;
    padding-bottom: 12px;
    border-bottom: 3px solid var(--border);
  }
  .section-num {
    width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family:'Quicksand',sans-serif; font-size: 13pt; font-weight: 700;
    color: white; flex-shrink: 0;
  }
  .sn1 { background: var(--pink); }
  .sn2 { background: var(--cyan); }
  .sn3 { background: var(--yellow); color: var(--dark) !important; }
  .sn4 { background: var(--green); color: var(--dark) !important; }
  .sn5 { background: var(--pink); }
  .sn6 { background: var(--cyan); }
  .sn7 { background: var(--yellow); color: var(--dark) !important; }
  .sn8 { background: var(--green); color: var(--dark) !important; }

  .section-title {
    font-family:'Quicksand',sans-serif;
    font-size: 15pt; font-weight: 700;
    color: var(--dark);
  }

  /* ═══════════════ TABLES ═══════════════ */
  table { width:100%; border-collapse:collapse; margin-bottom:18px; font-size:9.5pt; border-radius:8px; overflow:hidden; }
  thead tr { background: var(--dark); color:white; }
  thead th { padding:9px 13px; text-align:left; font-weight:600; font-size:8.5pt; letter-spacing:0.3px; font-family:'Quicksand',sans-serif; }
  tbody tr:nth-child(even) { background:#F5F5F5; }
  tbody tr:nth-child(odd)  { background:var(--white); }
  tbody td { padding:8px 13px; color:#555; border-bottom:1px solid var(--border); }
  tbody td:first-child { font-weight:600; color:var(--dark); }
  tr.hl td { background:var(--yellow-light)!important; font-weight:700; color:var(--dark)!important; border-top:2px solid var(--yellow); }

  /* ═══════════════ CARDS ═══════════════ */
  .cards { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px; }
  .card { background:var(--white); border:1.5px solid var(--border); border-radius:10px; padding:14px 16px; border-top: 4px solid var(--cyan); }
  .card.cp { border-top-color: var(--pink); }
  .card.cg { border-top-color: var(--green); }
  .card.cy { border-top-color: var(--yellow); }
  .card-icon { font-size:18pt; margin-bottom:5px; }
  .card-title { font-family:'Quicksand',sans-serif; font-size:9.5pt; font-weight:700; color:var(--dark); margin-bottom:3px; }
  .card-body { font-size:8.5pt; color:#777; }
  .card-value { font-family:'Quicksand',sans-serif; font-size:17pt; font-weight:700; color:var(--pink); margin-top:3px; }
  .card-value small { font-size:9pt; font-weight:400; color:#999; }

  /* ═══════════════ ALERTS ═══════════════ */
  .alert { padding:13px 16px; border-radius:8px; margin-bottom:14px; font-size:9.5pt; display:flex; gap:12px; align-items:flex-start; }
  .alert-icon { font-size:13pt; flex-shrink:0; margin-top:1px; }
  .alert-content { flex:1; }
  .alert-title { font-family:'Quicksand',sans-serif; font-weight:700; margin-bottom:3px; font-size:9.5pt; }
  .alert p { margin:0; line-height:1.55; }
  .aw { background:var(--yellow-light); border-left:4px solid var(--yellow); }
  .aw .alert-title { color:#8B6914; }
  .ad { background:var(--pink-light); border-left:4px solid var(--pink); }
  .ad .alert-title { color:var(--pink); }
  .ai { background:var(--cyan-light); border-left:4px solid var(--cyan); }
  .ai .alert-title { color:#006E8E; }
  .as { background:var(--green-light); border-left:4px solid var(--green); }
  .as .alert-title { color:#5A7A00; }

  /* ═══════════════ INTRO BOX ═══════════════ */
  .intro-box { background:var(--gray-bg); border-left:4px solid var(--pink); padding:16px 20px; border-radius:0 8px 8px 0; margin-bottom:18px; }
  .intro-box p { color:#555; font-size:10pt; }
  .intro-box strong { color:var(--dark); }

  /* ═══════════════ CHECKLIST ═══════════════ */
  .checklist { list-style:none; margin-bottom:14px; }
  .checklist li { padding:6px 0 6px 26px; position:relative; font-size:9.5pt; color:#555; border-bottom:1px dashed var(--border); }
  .checklist li::before { content:'\\25A1'; position:absolute; left:0; color:#CCC; font-size:12pt; top:4px; }
  .checklist.urg li::before { content:'\\25C6'; color:var(--pink); font-size:8pt; top:8px; }
  .checklist.done li { color:#999; text-decoration:line-through; }
  .checklist.done li::before { content:'\\2713'; color:var(--green); font-size:10pt; top:6px; font-weight:bold; text-decoration:none; display:inline-block; }
  .checklist.curr li { font-weight:600; color:var(--dark); }
  .checklist.curr li::before { content:'\\25B6'; color:var(--cyan); font-size:9pt; top:6px; }

  /* ═══════════════ PILLS ═══════════════ */
  .pill { display:inline-block; padding:2px 9px; border-radius:12px; font-size:8pt; font-weight:600; font-family:'Quicksand',sans-serif; }
  .pr { background:var(--pink-light); color:var(--pink); }
  .po { background:var(--yellow-light); color:#8B6914; }
  .pt { background:var(--cyan-light); color:#006E8E; }
  .pg { background:#F0F0F0; color:#888; }

  /* ═══════════════ SUBHEADINGS ═══════════════ */
  h3 { font-family:'Quicksand',sans-serif; font-size:11pt; font-weight:700; color:var(--dark); margin:20px 0 9px; padding-left:10px; border-left:3px solid var(--pink); }
  h4 { font-family:'Quicksand',sans-serif; font-size:10pt; font-weight:600; color:var(--cyan); margin:14px 0 7px; }
  p { font-size:10pt; color:#555; margin-bottom:10px; line-height:1.65; }

  /* ═══════════════ FUNNEL ═══════════════ */
  .funnel { background:var(--gray-bg); border-radius:10px; padding:18px 22px; margin-bottom:18px; border: 1.5px solid var(--border); }
  .fstep { display:flex; align-items:center; gap:12px; padding:7px 0; }
  .farrow { color:#CCC; font-size:13pt; padding:2px 0 2px 10px; }
  .fdot { width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Quicksand',sans-serif; font-weight:700; font-size:10pt; flex-shrink:0; color:white; }
  .fd1 { background:var(--pink); }
  .fd2 { background:var(--cyan); }
  .fd3 { background:var(--yellow); color:var(--dark)!important; }
  .fd4 { background:var(--green); color:var(--dark)!important; }
  .fd5 { background:var(--pink); }
  .fd6 { background:var(--cyan); }
  .ftext { font-size:9.5pt; color:#555; }
  .ftext strong { color:var(--dark); }

  /* ═══════════════ ROLES ═══════════════ */
  .roles { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }
  .rcard { background:var(--white); border:1.5px solid var(--border); border-radius:8px; padding:12px 14px; }
  .rpfx { font-family:'Courier New',monospace; padding:2px 7px; border-radius:4px; font-size:8pt; font-weight:700; display:inline-block; margin-bottom:5px; }
  .rpfx-p { background:var(--pink); color:white; }
  .rpfx-c { background:var(--cyan); color:white; }
  .rpfx-y { background:var(--yellow); color:var(--dark); }
  .rpfx-g { background:var(--green); color:var(--dark); }
  .rname { font-family:'Quicksand',sans-serif; font-size:10pt; font-weight:700; color:var(--dark); }
  .rdesc { font-size:8.5pt; color:#777; margin-top:3px; }

  /* ═══════════════ PAGE BREAK ═══════════════ */
  .pb { page-break-before:always; padding-top:0; }

  /* ═══════════════ FOOTER ═══════════════ */
  .footer-stripe { display:flex; height:6px; }
  .footer-stripe span { flex:1; }
  .footer { padding:18px 50px; background:var(--dark); color:rgba(255,255,255,0.65); font-size:8.5pt; display:flex; justify-content:space-between; align-items:center; font-family:'Montserrat',sans-serif; }
  .footer strong { color:white; }
  .footer-logo { height:28px; filter:brightness(0) invert(1); opacity:0.8; }

  /* ═══════════════ PRINT ═══════════════ */
  @media print {
    body { background:white; } .page { max-width:100%; }
    .cover-top,.cover-stripe,.alert,.rcard,.card,thead tr,tr.hl td,.footer,.footer-stripe,.fdot,.section-num,.cover-badge,.cover-kpi,.ts1,.ts2,.ts3,.ts4,.cover-slogan span { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  }
</style>
</head>
<body>
<div class="page">

<!-- ══════════════════════ PORTADA ══════════════════════ -->
<div class="cover">
  <div class="cover-top">
    <div class="cover-badge">Plan Estratégico &middot; Documento Maestro &middot; 2026</div>
    <img class="cover-logo-img" src="logos/PNG/logo_slogan.png" alt="Musicabalú">
    <div class="cover-title">De escuela local<br>a marca nacional</div>
    <div class="cover-sub">musicabalu.com &middot; Murcia, España &middot; Desde 2017</div>
  </div>
  <div class="cover-stripe">
    <span class="cs1"></span><span class="cs2"></span><span class="cs3"></span><span class="cs4"></span>
  </div>
  <div class="cover-body">
    <img class="cover-mascot" src="logos/PNG/logo_completo 320x.png" alt="">
    <div class="cover-info">
      <h2>Snapshot del negocio</h2>
      <div class="cover-kpis">
        <div class="cover-kpi">
          <div class="cover-kpi-val">9.º</div>
          <div class="cover-kpi-lbl">Curso · Desde 2017</div>
        </div>
        <div class="cover-kpi">
          <div class="cover-kpi-val">~85</div>
          <div class="cover-kpi-lbl">Alumnos este curso</div>
        </div>
        <div class="cover-kpi">
          <div class="cover-kpi-val">1.124</div>
          <div class="cover-kpi-lbl">Seguidores Instagram</div>
        </div>
        <div class="cover-kpi">
          <div class="cover-kpi-val">5</div>
          <div class="cover-kpi-lbl">Líneas de negocio</div>
        </div>
      </div>
      <div class="cover-slogan">
        <span class="ts1">canta</span>
        <span class="ts2">aprende</span>
        <span class="ts3">juega</span>
        <span class="ts4">crece</span>
      </div>
      <div class="cover-date">Documento vivo &middot; Actualización continua</div>
    </div>
  </div>
</div>

<!-- ══════════════════════ CONTENIDO ══════════════════════ -->
<div class="content">

<!-- PILAR 0: MARCO MENTAL Y FILOSOFÍA -->
<div class="section pb">
  <div class="section-header"><div class="section-num" style="background-color: var(--dark); color: var(--white);">0</div><div class="section-title">Marco Mental y Filosofía del Emprendedor</div></div>
  <div class="intro-box" style="border-left: 4px solid var(--dark); background: #eee;">
    <p><strong>El filtro definitivo de Musicabalú.</strong> Este pilar no es teoría de autoayuda; es el <em>manual de operaciones mental</em> que rige cada movimiento estratégico, financiero y creativo de este documento. Extraído de los cuatro grandes pilares fundacionales: <em>Padre Rico Padre Pobre, El Código del Dinero, Misión Emprender y Tus Zonas Erróneas</em>.</p>
  </div>
  
  <h3>1. La Construcción del Activo (Padre Rico, Padre Pobre)</h3>
  <div class="alert as">
    <div class="alert-icon">🏛️</div>
    <div class="alert-content">
      <div class="alert-title">El Cuadrante del Flujo del Dinero y la Trampa de la "Carrera de la Rata"</div>
      <p>La riqueza no se mide en euros facturados, sino en <em>tiempo</em>. El sistema educativo tradicional programa a los músicos para operar en el cuadrante "E" (Empleado) o "A" (Autoempleado), donde el dinero es una función directa del tiempo invertido (clases presenciales). Si dejas de dar clases, tus ingresos caen a cero. Esto es la "Carrera de la Rata". La verdadera riqueza se encuentra en los cuadrantes "D" (Dueño de negocio con sistemas) e "I" (Inversor). Un "Activo" es todo aquello que mete dinero en tu bolsillo independientemente de si estás trabajando físicamente o no.</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>1. El Rol de las Clases Presenciales:</strong> Las clases en EMPI no son tu negocio final; son tu <em>inyección de cashflow</em> (flujo de caja). Utilizaremos ese dinero seguro no para gastarlo, sino para financiar la creación de la plataforma digital sin estrés.</li>
        <li><strong>2. Construcción de Propiedad Intelectual (El Activo Real):</strong> Tus grabaciones de canciones, los recitados MLT, y las bases de datos de actividades son tu verdadero Activo. Invertirás tu tiempo de agosto en crearlas una sola vez.</li>
        <li><strong>3. Apalancamiento Financiero (OPM - Other People's Money):</strong> La maniobra del Pago Único del SEPE es una jugada maestra de inteligencia financiera. Has utilizado un pasivo gubernamental (tu derecho a paro) para inyectar capital en la fase de riesgo y asegurar 3 años libres de cuotas de Seguridad Social, blindando la supervivencia del negocio.</li>
      </ul>
    </div>
  </div>

  <h3>2. La Multiplicación Digital (El Código del Dinero)</h3>
  <div class="alert ai">
    <div class="alert-icon">🌐</div>
    <div class="alert-content">
      <div class="alert-title">Ingresos Pasivos, Escalabilidad y el Negocio de la Información</div>
      <p>La regla inquebrantable de la nueva economía es: "Desconecta tus ingresos de tu tiempo". Raimon Samsó expone que el mayor riesgo hoy en día es depender de una sola fuente de ingresos (las clases presenciales). La meta del Año 3 de Musicabalú (superar los 104.000€) es matemáticamente imposible vendiendo horas físicas. Se sustenta única y exclusivamente en el apalancamiento digital: vender productos de información (Info-productos) que tienen un coste de réplica cero.</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>1. El Ecosistema de Múltiples Fuentes:</strong> No eres un "profesor de música", eres un productor de soluciones educativas. Construiremos 4 fuentes de ingresos: 1) Presencial (Cashflow), 2) Suscripción B2C (Ingreso recurrente), 3) Formaciones B2B a escuelas (High ticket), 4) Productos físicos/digitales (Upsells).</li>
        <li><strong>2. El Coste Marginal Cero:</strong> Un vídeo explicativo de MLT para padres te cuesta 1 hora de grabar en agosto. Cuesta lo mismo que lo vea 1 suscriptor que 10.000. Esta es la llave de la libertad financiera del proyecto.</li>
        <li><strong>3. Delegación Tecnológica:</strong> No serás el esclavo técnico de tu negocio. Automatizaremos las ventas, las altas de suscripción y el email marketing, operando desde el concepto de "Negocio Inteligente".</li>
      </ul>
    </div>
  </div>

  <h3>3. El Hábito de Servir y Ejecutar (Misión Emprender)</h3>
  <div class="alert" style="background: var(--yellow-light); border-left: 4px solid var(--yellow);">
    <div class="alert-icon">🚀</div>
    <div class="alert-content">
      <div class="alert-title">La Ley de la Entrega y la Acción Masiva Imperfecta</div>
      <p>El dinero es simplemente una consecuencia inevitable de aportar un valor masivo al mercado. Si te enfocas en "facturar", generarás resistencia (Fuerza). Si te enfocas en "servir" (Poder) y solucionar los problemas reales del desarrollo infantil de las familias, el retorno económico está garantizado. Esto se acompaña de una disciplina militar: la diferencia entre un soñador y un emprendedor es la capacidad de ejecutar cuando la motivación ha desaparecido.</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>1. Foco en la Transformación, no en el Servicio:</strong> Musicabalú no "vende clases de música". Musicabalú vende el desarrollo cognitivo del cerebro del bebé y una herramienta de conexión emocional brutal para unos padres estresados.</li>
        <li><strong>2. Acción Masiva Imperfecta:</strong> Prohibido el perfeccionismo estético que retrasa lanzamientos. Es mejor un vídeo subido a la plataforma con una luz regular hoy, que un vídeo perfecto renderizándose dentro de un mes.</li>
        <li><strong>3. Responsabilidad Incondicional:</strong> Asumes el 100% de la responsabilidad de tus resultados. Si un taller no se llena, no es culpa del mes, del algoritmo o del SEF; es una falta de aporte de valor o de visibilidad que tú debes corregir.</li>
      </ul>
    </div>
  </div>

  <h3>4. Erradicación del Síndrome del Impostor (Tus Zonas Erróneas)</h3>
  <div class="alert" style="background: var(--pink-light); border-left: 4px solid var(--pink);">
    <div class="alert-icon">🧠</div>
    <div class="alert-content">
      <div class="alert-title">Eliminación de la Preocupación, la Culpa y la Búsqueda de Aprobación</div>
      <p>Wayne Dyer identifica las dos emociones más inútiles del ser humano: la culpa (por lo que pasó) y la preocupación (por lo que pasará). Ambas consumen tu energía en el presente (Niveles bajísimos de vibración). En el emprendimiento, esto se traduce en el Síndrome del Impostor ("¿Quién soy yo para dar formaciones a maestros?") y la necesidad constante de seguridad externa (el miedo a la llamada del SEF o a la opinión de músicos clásicos).</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>1. Blindaje frente a la Opinión Externa:</strong> La metodología MLT es sólida, pero tu forma de comunicarla será fresca y comercial. Si instituciones más "puristas" o tradicionales te critican, lo entenderás como una señal de que estás atacando el centro del mercado, no te justificarás ante ellos.</li>
        <li><strong>2. Muerte de la Preocupación (El Presente Absoluto):</strong> Cortar de raíz los pensamientos sobre "¿Qué pasa si no consigo los 100 suscriptores?". La única realidad es el bloque de tiempo de hoy: grabar las 3 canciones planificadas para esta tarde.</li>
        <li><strong>3. Auto-Aprobación Radical:</strong> No necesitas permiso de ninguna entidad para autodenominarte experto en MLT. Tienes el conocimiento y estás creando la plataforma. La autoridad te la da el valor que reciben tus clientes, no un diploma en la pared.</li>
      </ul>
    </div>
  </div>

  <h3>5. Sistemas infalibles sobre metas lejanas (Hábitos Atómicos)</h3>
  <div class="alert" style="background: var(--cyan-light); border-left: 4px solid var(--cyan);">
    <div class="alert-icon">⚛️</div>
    <div class="alert-content">
      <div class="alert-title">La Identidad y las 4 Leyes del Cambio de Conducta</div>
      <p>No te elevas al nivel de tus metas, desciendes al nivel de tus sistemas. Las metas ("Facturar 3000€" o "Grabar 30 vídeos") establecen la dirección, pero crean ansiedad y un efecto yoyo: una vez alcanzadas, la motivación desaparece. Los sistemas garantizan el progreso constante (la Regla del 1%). El núcleo es la <strong>Identidad</strong>: no buscamos "conseguir grabar un vídeo", anclamos la creencia de <em>"Soy un educador disciplinado que documenta su proceso"</em>.</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>1. Hacerlo Obvio (La Señal):</strong> El entorno vence a la motivación. La cámara y el micro estarán siempre montados. <em>Apilamiento de Hábitos:</em> "Después del café de las 9:00, abro VSCode".</li>
        <li><strong>2. Hacerlo Atractivo (El Anhelo):</strong> <em>Agrupación de Tentaciones:</em> "Solo escucharé mi podcast favorito MIENTRAS edito los cortes de vídeo de las cápsulas".</li>
        <li><strong>3. Hacerlo Sencillo (La Respuesta):</strong> Reducir fricción técnica con plantillas pre-guardadas. <em>Regla de los 2 Minutos:</em> Cuando procrastines, tu objetivo es solo "grabar durante 2 minutos".</li>
        <li><strong>4. Hacerlo Satisfactorio (La Recompensa):</strong> Usaremos un "Rastreador de Hábitos" visual (Notion o pizarra) marcando una X cada día que grabes. "No romper la cadena" genera satisfacción inmediata.</li>
      </ul>
    </div>
  </div>

  <h3>6. Operar desde el Poder, no desde la Fuerza (El Poder contra la Fuerza)</h3>
  <div class="alert" style="background: var(--green-light); border-left: 4px solid var(--green);">
    <div class="alert-icon">⚡</div>
    <div class="alert-content">
      <div class="alert-title">El Mapa de la Conciencia y la Influencia Magnética</div>
      <p>Todo emite una frecuencia en una escala de 1 a 1000. Por debajo de 200 (Miedo, Deseo, Orgullo) operamos desde la <strong>Fuerza</strong>: consume energía, genera estrés crónico y crea resistencia (ej. Luchar contra el SEPE por miedo). Por encima de 200 (Coraje, Aceptación, Razón, Amor) operamos desde el <strong>Poder</strong>: fluye sin esfuerzo e influye por gravedad (ej. Estructurar MLT en bases de datos [Razón: 400]).</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>1. Trascender el Esfuerzo (Hustle Culture):</strong> Musicabalú renuncia al paradigma del "emprendedor quemado". Si crear un curso se siente como arrastrar una roca por obligación económica, estamos en "Fuerza". Pivotaremos hasta que surja de la "Razón" o la "Aceptación".</li>
        <li><strong>2. Marketing Magnético:</strong> Calibraremos el contenido de RRSS desde la Alegría por compartir. Este magnetismo natural atraerá a familias y educadores sin tener que "empujar" ventas agresivas.</li>
        <li><strong>3. El Test de Vibración:</strong> Antes de aceptar un proyecto, evaluaremos: ¿Esto me contrae y me genera ansiedad (Fuerza) o me expande e ilusiona (Poder)? Solo las decisiones de Poder entran en la estrategia.</li>
      </ul>
    </div>
  </div>

  <h3>✅ El Filtro de Toma de Decisiones (Checklist del Mentor)</h3>
  <p>Cualquier proyecto, oferta, taller, colaboración o gasto que se nos presente de aquí en adelante, debe pasar obligatoriamente por este filtro antes de ser aceptado:</p>
  <ul class="checklist">
    <li>¿Esta acción <strong>construye o fortalece nuestro Activo</strong> (o solo es un parche para ganar dinero hoy)?</li>
    <li>¿El resultado de este trabajo es <strong>escalable</strong> o digitalizable?</li>
    <li>¿Aporta un <strong>valor transformacional</strong> real a nuestras familias?</li>
    <li>¿Estoy tomando esta decisión desde la <strong>confianza y la abundancia</strong> (y no desde el miedo o la escasez)?</li>
  </ul>
</div>

<!-- PILAR 0.5: PROTOCOLOS PEDAGÓGICOS -->
<div class="section pb">
  <div class="section-header"><div class="section-num sn1">1</div><div class="section-title">Excelencia Pedagógica y Musical (Fundamento MLT)</div></div>
  <div class="intro-box" style="border-left: 4px solid var(--cyan); background: var(--cyan-light);">
    <p><strong>El núcleo científico del método.</strong> Basado en la tesis doctoral <em>"Audiation and the study of singing" (Mitchell, 2007)</em>. Este bloque contiene los protocolos inquebrantables de Music Learning Theory para la creación de contenido, las formaciones y tu propio estudio musical. Son la demostración de máxima autoridad y rigor metodológico frente a la competencia.</p>
  </div>
  
  <h3>1. El Protocolo de Aprendizaje de Repertorio (Separación de Elementos)</h3>
  <div class="alert as">
    <div class="alert-icon">🎼</div>
    <div class="alert-content">
      <div class="alert-title">Contexto antes que contenido</div>
      <p>Aprender música es como aprender un idioma materno. No enseñamos a leer antes de hablar. Cuando diseñes material o enseñes en formaciones, el proceso debe aislar el ritmo de la tonalidad para evitar la dependencia muscular y promover la verdadera <em>Audiation</em> (comprensión musical).</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>Fase 1 (Ritmo aislado):</strong> Cantar rítmicamente en sílaba neutral (di, da) con metrónomo. El pulso (macrobeat) se siente con fluidos movimientos o peso (talones), <strong>NUNCA con golpecitos rígidos (tapping)</strong>.</li>
        <li><strong>Fase 2 (Tonalidad aislada):</strong> Cantar la melodía sin ritmo (notas de igual duración), preferiblemente en <em>staccato</em>. Esto evita el uso de <em>portamentos</em> (deslizarse) basados en memoria muscular y asegura que el cerebro audie la nota antes de fonar.</li>
        <li><strong>Fase 3:</strong> Combinar tonalidad y ritmo en sílaba neutral antes de meter la letra.</li>
      </ul>
    </div>
  </div>

  <h3>2. La Independencia Musical (El Peligro del Piano)</h3>
  <div class="alert ad">
    <div class="alert-icon">🎹</div>
    <div class="alert-content">
      <div class="alert-title">Anticipación vs. Imitación Instantánea</div>
      <p>Tocar la melodía en el piano mientras el alumno canta bloquea el desarrollo del oído interno. Obliga al cerebro a procesar la música en el "presente" (imitando lo que acaba de oír) en lugar de audiar hacia el "futuro" (anticipando).</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>Aplicación en Formaciones:</strong> Establecer la tonalidad tocando solo la tónica/dominante y dejar que el alumno (o tú mismo en tu estudio) cante a capella. Es el único camino hacia la independencia musical total.</li>
      </ul>
    </div>
  </div>

  <h3>3. El Poder del Silencio Activo</h3>
  <div class="alert ai">
    <div class="alert-icon">🤫</div>
    <div class="alert-content">
      <div class="alert-title">Dinámica estrella para talleres y RRSS</div>
      <p>Si no puedes sostener la música en tu mente en ausencia de sonido físico, no estás audiando. Esta es una herramienta perfecta (una de tus "píldoras") para incluir en las formaciones B2B o en redes para demostrar impacto inmediato.</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>El ejercicio:</strong> Cantar una frase conocida en grupo, mutear el sonido físico durante todo un compás (manteniendo la audiación interna activa), y volver a entrar en el compás siguiente exactamente a tiempo y en tono.</li>
      </ul>
    </div>
  </div>

  <h3>4. Respaldo Científico (Autoridad Musical)</h3>
  <div class="alert" style="background: #F8F9FA; border-left: 4px solid #6c757d;">
    <div class="alert-icon">📚</div>
    <div class="alert-content">
      <div class="alert-title">Estudios de Referencia para Formaciones y Web</div>
      <p>Utiliza estas referencias académicas como prueba irrefutable al presentar los beneficios de tus programas a padres (B2C) y escuelas (B2B).</p>
      <ul class="checklist" style="margin-top: 10px;">
        <li><strong>Desarrollo Cerebral Temprano:</strong> <em>"Becoming Musically Enculturated: Effects of Music Classes for Infants on Brain and Behavior" (Trainor et al., 2012).</em> Demuestra que la participación activa en clases de música antes del primer año de vida (vs. escucha pasiva) acelera el desarrollo auditivo del cerebro y genera bebés que sonríen más, son más fáciles de calmar y se comunican mejor.</li>
        <li><strong>Desarrollo Cognitivo y Ejecutivo:</strong> <em>"Music and Rhythm as Promising Tools to Assess and Improve Cognitive Development in Children: A Scoping Review" (Acta Paediatrica, 2024).</em> Revisión médica reciente que confirma que la estimulación musical mejora drásticamente las "funciones ejecutivas", la atención y la inteligencia general en niños pequeños.</li>
        <li><strong>Fluidez Verbal y Lenguaje:</strong> <em>"Development of semantic verbal fluency in children aged 2 to 5 and its relationship with participating in music activities" (2024).</em> Comprueba que las actividades musicales estructuradas disparan la adquisición de vocabulario y la comprensión semántica en edad preescolar.</li>
      </ul>
      <p style="font-size: 8.5pt; color: #888; margin-top: 8px; margin-bottom: 0;"><em>* Nota: Los PDFs completos de estos estudios han sido descargados mediante IA y están archivados en la carpeta local <code>referencias MLT/estudios_cientificos/</code> para tu consulta.</em></p>
    </div>
  </div>
</div>

<!-- 2. EL NEGOCIO -->
<div class="section">
  <div class="section-header"><div class="section-num sn2">2</div><div class="section-title">El negocio en Junio de 2026</div></div>
  <div class="intro-box"><p><strong>Musicabalú</strong> es una escuela de Educación Musical Temprana especializada en la primera infancia (niños de 0 a 3 años) en Murcia, dentro de EMPI (Escuela Murciana de Primera Infancia). Fundada en 2017 por <strong>Javier Muñoz Sánchez</strong>, sigue la <strong>Teoría del Aprendizaje Musical de E. Gordon (MLT)</strong>. En 2026 inicia su 9.º&nbsp;curso.</p></div>
  <div class="cards">
    <div class="card cp"><div class="card-icon">🎵</div><div class="card-title">Alumnos activos</div><div class="card-value">~85 <small>niños</small></div><div class="card-body">25 EMPI &middot; 60 no-EMPI &middot; 4 familias con hermanos</div></div>
    <div class="card"><div class="card-icon">📅</div><div class="card-title">Grupos semanales</div><div class="card-value">9 <small>grupos/sem.</small></div><div class="card-body">Sept–Jun &middot; 36 semanas &middot; 9,5 meses lectivos</div></div>
    <div class="card cg"><div class="card-icon">📱</div><div class="card-title">Instagram @musicabalu</div><div class="card-value">1.124 <small>seguidores</small></div><div class="card-body">72 publicaciones &middot; Comunidad local sólida</div></div>
    <div class="card cy"><div class="card-icon">🌐</div><div class="card-title">Web</div><div class="card-value">musicabalu.com</div><div class="card-body">En construcción &middot; Zona privada alumnos activa</div></div>
  </div>
</div>

<!-- 3. COMPETENCIA -->
<div class="section pb">
  <div class="section-header"><div class="section-num sn3">3</div><div class="section-title">Análisis de la competencia y Benchmarking</div></div>
  <div class="intro-box"><p><strong>Conocer el terreno:</strong> Este análisis radiografía el mercado en tres niveles para identificar el "secreto del éxito" de cada referente y afinar nuestro posicionamiento con un objetivo claro: <strong>Convertir a Musicabalú en el principal proyecto de educación musical de 0 a 3 años en habla hispana.</strong></p></div>

  <h3>1. Competencia Local (Región de Murcia)</h3>
  <p>La disputa por la captación del alumnado físico (0-3 años).</p>
  <div class="cards">
    <div class="card cp"><div class="card-icon">📍</div><div class="card-title">Legato Espacio Musical</div><div class="card-body">Trabajan con MLT (Gordon) y Método Suzuki. <strong>Su éxito:</strong> Excelente posicionamiento local y unificación de dos de los métodos más demandados.</div></div>
    <div class="card cg"><div class="card-icon">📍</div><div class="card-title">Crescendo / In Crescendo</div><div class="card-body">Acercamiento a metodologías activas. <strong>Su éxito:</strong> Fuerte presencia física en la zona (Ronda Sur) y amplitud de edades.</div></div>
    <div class="card cy"><div class="card-icon">📍</div><div class="card-title">Aula Sonidos</div><div class="card-body"><strong>Su éxito:</strong> Hiper-especialización en el Método Suzuki instrumental desde edades muy tempranas.</div></div>
    <div class="card pt"><div class="card-icon">📍</div><div class="card-title">Vuela Música</div><div class="card-body"><strong>Su éxito:</strong> Enfoque diferenciado y muy específico centrado en la musicoterapia y la atención temprana clínica.</div></div>
  </div>

  <h3>2. Referentes Nacionales (España)</h3>
  <p>Competidores e instituciones relevantes para posicionar nuestro <strong>Piso 4 (Formaciones)</strong> y modelo digital.</p>
  <ul class="checklist">
    <li><strong>Gorgoritos (Granada):</strong> <br>
      <em>Qué ofrecen:</em> Clases presenciales, investigación universitaria y formación en MLT.<br>
      <em>El secreto de su éxito:</em> Su gran vinculación académica (Universidad de Granada) que les otorga una enorme autoridad, sumada a una estética impecable y minimalista en redes (~6k seguidores). Son el ejemplo de cómo ser académico sin perder la belleza visual.</li>
    <li><strong>CreciendoMiSol (Madrid):</strong> <br>
      <em>Qué ofrecen:</em> Clases presenciales híbridas (Gordon, Musica in Culla, Suzuki) y una gran tienda online.<br>
      <em>El secreto de su éxito:</em> Haber sabido escalar un modelo presencial saturado hacia el E-commerce. Su aportación más valiosa es su tienda física y online de instrumentos y cuentos, creando un ecosistema donde la familia consume sus clases y sus productos.</li>
    <li><strong>Cuentas de Pedagogía / Influencers (ej. Irene Mariné):</strong> <br>
      <em>Qué ofrecen:</em> Recursos descargables, tips de aula y cursos online cortos.<br>
      <em>El secreto de su éxito:</em> Perfiles con >60k seguidores que demuestran que el <strong>tono 100% cercano, empático y cero académico</strong> vende masivamente. Su mayor valor es traducir problemas diarios (rabietas, rutinas) en "herramientas útiles de aplicación inmediata".</li>
    <li><strong>IGEME y Música con Corazón (Madrid):</strong> <br>
      <em>Qué ofrecen:</em> Certificaciones oficiales para profesores en Music Learning Theory.<br>
      <em>El secreto de su éxito:</em> Son la máxima autoridad "oficial" y purista de Gordon en España. Su aportación es el rigor metodológico absoluto, aunque con un tono muy formal.</li>
  </ul>

  <h3>3. Benchmarking Internacional</h3>
  <p>Los gigantes globales que marcan la pauta en escalabilidad y creación de comunidad en habla hispana.</p>
  <ul class="checklist">
    <li><strong>Claro de Luna (Ecuador/Latam):</strong> <br>
      <em>Qué ofrecen:</em> Clases presenciales, formaciones online internacionales y escuela digital.<br>
      <em>El secreto de su éxito:</em> <strong>Es nuestro espejo principal.</strong> Camila Avella ha creado una comunidad enorme (>15k seguidores reales). Su aportación más valiosa es su capacidad de comunicar la metodología musical (Gordon/Musica in Culla) con una frescura, cercanía y magnetismo brutal, logrando vender online a toda Latinoamérica.</li>
    <li><strong>Music Together (USA/Global):</strong> <br>
      <em>Qué ofrecen:</em> Clases de música en familia (0-5) a nivel mundial.<br>
      <em>El secreto de su éxito:</em> Son el estándar de oro en <strong>escalabilidad de licencias</strong>. Su mayor éxito es haber paquetizado su método para que profesores de todo el mundo paguen por usar su marca, su app y vender sus materiales obligatorios.</li>
    <li><strong>Audiation Institute (Italia):</strong> <br>
      <em>Qué ofrecen:</em> Formación e investigación profunda en MLT.<br>
      <em>El secreto de su éxito:</em> Es el ente europeo con mayor prestigio investigador y su aportación es la evolución constante de la teoría de Gordon adaptada a la educación europea.</li>
  </ul>

  <h3>Conclusión DAFO del Posicionamiento</h3>
  <div class="alert as"><div class="alert-icon">🎯</div><div class="alert-content"><div class="alert-title">La Visión: Referentes en Habla Hispana</div><p>Actualmente el mercado se divide en dos extremos: las <strong>instituciones académicas</strong> (muy formales y rigurosas) y las <strong>influencers de pedagogía</strong> (muy cercanas y rentables, pero a veces sin un método musical profundo). <br><br><strong>El gran hueco de Musicabalú es conquistar el centro:</strong> Combinar la máxima autoridad metodológica de la MLT con el marketing digital, la frescura visual y la empatía brutal de los grandes referentes B2C de Latinoamérica. Traduciendo la teoría de Gordon a "herramientas de impacto real" y dirigiéndonos al nicho de <strong>0 a 3 años</strong>, el objetivo es claro: en pocos años, Musicabalú será el proyecto de referencia absoluta en habla hispana para la educación musical en la primera infancia.</p></div></div>
</div>

<!-- 4. AUDITORÍA DIGITAL -->
<div class="section pb">
  <div class="section-header"><div class="section-num sn4">4</div><div class="section-title">Auditoría de Presencia Digital</div></div>
  <div class="intro-box"><p><strong>Punto de partida:</strong> Lo que funciona para llenar clases locales no sirve para escalar a nivel internacional. Este es el diagnóstico crudo y el salto necesario en nuestros tres pilares digitales.</p></div>

  <!-- AUDITORÍA ORIGINAL JULIO/AGOSTO 2026 -->
  <h3>📋 Auditoría original — Julio / Agosto 2026</h3>

  <h4>1. Ecosistema Google (Búsqueda y Local)</h4>
  <ul class="checklist">
    <li><strong>Estado:</strong> Dependencia de la marca madre (EMPI). Aparecemos referenciados, pero sin músculo propio.</li>
    <li><strong>Diagnóstico:</strong> Sin ficha de Google My Business propia consolidada. Sin metadata SEO diferenciado por página. Sin datos estructurados (Schema). Sin sitemap. Sin Open Graph. Las 4 páginas públicas compartían el mismo título y descripción → canibalización de keywords.</li>
    <li><strong>Oportunidad:</strong> Independizarnos en Google Maps para dominar Murcia a corto plazo. A medio plazo, SEO de contenidos para captar tráfico nacional (ej. "música para calmar rabietas").</li>
  </ul>

  <h4>2. Instagram (@musicabalu)</h4>
  <ul class="checklist">
    <li><strong>Estado:</strong> ~1.124 seguidores fieles. Contenido funciona como "escaparate" local de clases presenciales.</li>
    <li><strong>Diagnóstico:</strong> Para alcanzar el nivel de referentes (Irene Mariné, Claro de Luna), el escaparate no basta. Hay que pasar de mostrar "lo bien que lo pasamos" a vender "soluciones".</li>
    <li><strong>El salto:</strong> Transición a Cuenta de Creador / Autoridad. Salir a cámara regalando píldoras de valor. El objetivo es viralizar conocimiento, no fotos locales.</li>
  </ul>

  <h4>3. La Web (musicabalu.com)</h4>
  <ul class="checklist">
    <li><strong>Estado:</strong> Web operativa pero sin optimización SEO. Sirviendo la zona privada (Comunidad) pero invisible para Google más allá de búsquedas directas de marca.</li>
    <li><strong>Diagnóstico:</strong> Una web sin SEO técnico es dinero que se quema. Necesita ser una Máquina de Conversión con embudos, lead magnets y páginas de venta.</li>
  </ul>

  <div style="height:1.5rem;border-bottom:2px dashed #E2E8F0;margin-bottom:1.5rem;"></div>

  <!-- AUDITORÍA ACTUALIZADA SEPTIEMBRE 2026 -->
  <h3>✅ Auditoría actualizada — Septiembre 2026</h3>
  <p style="color:#4A5568;margin-bottom:1.5rem;">Revisión completa realizada el 13–14 de septiembre de 2026. Resultado: <strong>posición 1 en la búsqueda local más importante</strong> ("clases música bebés Murcia 0 3 años"), por delante de EMPI, Legato y Mago Diapasón.</p>

  <h4>Tabla de cambios implementados</h4>
  <table>
    <thead><tr><th>Acción</th><th>Detalle</th><th>Estado</th></tr></thead>
    <tbody>
      <tr><td>Metadata individual por página</td><td>Título y descripción únicos en <code>/presencial</code>, <code>/formaciones</code>, <code>/conocenos</code></td><td><span class="pill pt">✅ Live</span></td></tr>
      <tr><td>Open Graph + Twitter Card</td><td>Tarjetas visuales al compartir en WhatsApp/RRSS. Imagen OG propia.</td><td><span class="pill pt">✅ Live</span></td></tr>
      <tr><td>Schema.org LocalBusiness + ⭐⭐⭐⭐⭐</td><td>Datos estructurados en <code>/presencial</code>. Activa estrellas en Google.</td><td><span class="pill pt">✅ Live</span></td></tr>
      <tr><td>Sitemap.xml automático</td><td>6 URLs declaradas con prioridades. Next.js genera <code>/sitemap.xml</code>.</td><td><span class="pill pt">✅ Live</span></td></tr>
      <tr><td>Google Search Console</td><td>Dominio verificado. Sitemap enviado e indexación activada.</td><td><span class="pill pt">✅ Verificado</span></td></tr>
      <tr><td>Google Business Profile</td><td>Horario curso 26/27 actualizado. Fotos de clases añadidas. Reseñas ya estaban respondidas. Google Post de inicio de curso publicado.</td><td><span class="pill pt">✅ Completo</span></td></tr>
    </tbody>
  </table>

  <h4>Estado actual por pilar</h4>
  <table>
    <thead><tr><th>Área</th><th>Julio/Agosto 2026</th><th>Septiembre 2026</th></tr></thead>
    <tbody>
      <tr><td>Metadata SEO por página</td><td>❌ Todas idénticas</td><td>✅ Diferenciado</td></tr>
      <tr><td>Open Graph</td><td>❌ Ausente</td><td>✅ Activo</td></tr>
      <tr><td>Schema.org (estrellas Google)</td><td>❌ Ausente</td><td>✅ Activo</td></tr>
      <tr><td>Sitemap.xml</td><td>❌ No existía</td><td>✅ Funcionando</td></tr>
      <tr><td>Search Console</td><td>❌ Sin verificar</td><td>✅ Verificado</td></tr>
      <tr><td>Google Business Profile</td><td>⚠️ Básico</td><td>✅ Optimizado</td></tr>
      <tr><td>Posición "clases música bebés Murcia"</td><td>⚠️ Aparición parcial</td><td><strong>✅ Posición 1</strong></td></tr>
      <tr><td>Posición búsqueda nacional MLT España</td><td>❌ Ausente</td><td>⚠️ Pendiente blog</td></tr>
    </tbody>
  </table>

  <h4>🔵 Próximos pasos (Octubre 2026 en adelante)</h4>
  <ul class="checklist">
    <li><strong>Blog SEO — Artículo 1:</strong> "Cómo usar la música para calmar a tu bebé". Keyword de alta intención, captura email, lead magnet. Objetivo: tráfico orgánico nacional.</li>
    <li><strong>Pedir reseñas a familias nuevas del curso 26/27:</strong> El Schema de AggregateRating ya está activo. Cada reseña nueva en Google Maps se refleja en los resultados de búsqueda.</li>
    <li><strong>Google Post semanal en GBP:</strong> Mantener la ficha activa con una publicación por semana durante el arranque del curso.</li>
    <li><strong>Instagram — Transición a Cuenta de Autoridad:</strong> Contenido en vídeo hablando a cámara, píldoras de valor MLT, herramientas de aplicación inmediata para familias.</li>
  </ul>
</div>

<!-- 5. ESTRATEGIA GLOBAL -->
<div class="section pb">
  <div class="section-header"><div class="section-num sn5">5</div><div class="section-title">Estrategia global</div></div>
  <div class="intro-box"><p><strong>La Regla de Oro:</strong> Las tácticas (embudos, web, anuncios) son herramientas. Este bloque define nuestra brújula para asegurar que cada acción técnica construya la escalabilidad real del negocio, con la ambición de dominar el mercado hispano.</p></div>

  <h3>1. El gran objetivo (La Estrella Polar)</h3>
  <ul class="checklist">
    <li><strong>Corto plazo (Año 1):</strong> Rentabilizar y asegurar el "cash flow" de la escuela presencial en Murcia, convirtiéndola en nuestro laboratorio y principal fuente de contenido para redes.</li>
    <li><strong>Medio/largo plazo (Año 2+):</strong> Desvincular ingresos de las horas de trabajo físico mediante la explosión del negocio online (suscripciones y formaciones), convirtiendo a Musicabalú en <strong>el proyecto educativo musical de 0 a 3 años líder en habla hispana</strong>.</li>
  </ul>

  <h3>2. Posicionamiento y propuesta de valor</h3>
  <p>Vendes desarrollo cognitivo, motriz y emocional para los bebés, y un espacio de conexión de calidad para las familias. El tono de marca será empático, científico, profesional y cercano. <strong>Marketing de Atracción por Autoridad y Confianza.</strong></p>

  <h3>3. El cliente ideal (Buyer Persona)</h3>
  <div class="cards">
    <div class="card cp"><div class="card-icon">👨‍👩‍👧</div><div class="card-title">Familias (B2C)</div><div class="card-body">Madres/padres buscando desarrollo para su bebé y tiempo de calidad.<br><em>Solución:</em> Sesiones presenciales y herramientas para el día a día.</div></div>
    <div class="card cg"><div class="card-icon">👩‍🏫</div><div class="card-title">Educadores (B2B)</div><div class="card-body">Profesores de infantil sin formación musical.<br><em>Solución:</em> Plataforma web con canciones, recursos y metodología.</div></div>
  </div>

  <h3>4. La Escalera de Valor</h3>
  <div class="funnel">
    <div class="fstep"><div class="fdot fd1">0</div><div class="ftext"><strong>Piso 0 (GRATUITO):</strong> Contenido en RRSS y YouTube (ej. "Cómo relajar a tu bebé"). Es el cebo de atracción.</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd2">1</div><div class="ftext"><strong>Piso 1 (LEAD MAGNET):</strong> Recurso gratuito de alto valor a cambio del email (ej. guía en audio de nanas).</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd3">2</div><div class="ftext"><strong>Piso 2 (CONTENIDO DIGITAL & MEMBRESÍA):</strong> Suscripción digital (5,90 €/mes) y audios de relajación de la tienda.</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd4">3</div><div class="ftext"><strong>Piso 3 (TALLERES PUNTUALES):</strong> Talleres familiares de 45 min en escuelas (20 €/familia). Gran puente de conversión presencial.</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd5">4</div><div class="ftext"><strong>Piso 4 (PRESENCIAL REGULAR):</strong> Clases presenciales continuas (0-3 años en EMPI). Base de cashflow, cupo limitado.</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd6">5</div><div class="ftext"><strong>Piso 5 (FORMACIONES):</strong> Educadores y familias (0-6 años). Intensivos de 8h, ticket más alto (100–120 €), máxima rentabilidad.</div></div>
  </div>

  <h3>5. El Viaje del Cliente (Customer Journey)</h3>
  <ul class="checklist">
    <li><strong>Atracción (Descubrimiento):</strong> Contenido estructurado en Instagram/YouTube. Demostración de autoridad sin venta directa.</li>
    <li><strong>Captación (Embudo):</strong> Envío a Landing Page para descarga del Lead Magnet a cambio del email.</li>
    <li><strong>Nutrición (Email Marketing):</strong> Secuencia automática de correos de altísimo valor. Casos de éxito y el "porqué" del método.</li>
    <li><strong>Conversión (Venta):</strong> Oferta en el momento adecuado: membresía digital o reserva de plaza presencial.</li>
  </ul>
</div>

<!-- 6. LÍNEAS DE NEGOCIO -->
<div class="section pb">
  <div class="section-header">
    <div class="section-num sn6">6</div>
    <div class="section-title">Líneas de Negocio</div>
  </div>
  <div class="intro-box">
    <p><strong>El ecosistema de monetización de Musicabalú.</strong> Agrupamos la actividad en 5 vías complementarias para diversificar ingresos, maximizar el impacto pedagógico y transicionar progresivamente de la venta de tiempo físico a la escalabilidad de activos digitales.</p>
  </div>
  <h2 style="font-family:'Quicksand',sans-serif; font-size:13pt; color:var(--dark); margin:25px 0 15px; border-bottom:2px solid var(--border); padding-bottom:6px;">6.1 Clases presenciales (Core Local)</h2>
  <h3>Precios actuales y subida curso 2026–2027</h3>
  <table>
    <thead><tr><th>Grupo</th><th>Mensual actual</th><th>Mensual nuevo</th><th>Trimestral actual</th><th>Trimestral nuevo</th></tr></thead>
    <tbody>
      <tr><td>Matriculados EMPI</td><td>40 €</td><td><strong>45 €</strong></td><td>105 €</td><td><strong>117 €</strong></td></tr>
      <tr><td>No matriculados EMPI</td><td>45 €</td><td><strong>50 €</strong></td><td>120 €</td><td><strong>132 €</strong></td></tr>
      <tr><td>Descuento hermanos</td><td>−15 % mensual</td><td>−15 % mensual</td><td>−10 % trimestral</td><td>−10 % trimestral</td></tr>
    </tbody>
  </table>
  <p style="font-size:8.5pt;color:#999;">Matrícula 25 €/alumno sin descuento &middot; Septiembre: medio mes &middot; T1 oct–dic &middot; T2 ene–mar &middot; T3 abr–jun</p>
  <div class="cards">
    <div class="card cp"><div class="card-title">Ingresos actuales (estimado)</div><div class="card-value">~35.000 € <small>/año</small></div><div class="card-body">Mix mensual / trimestral</div></div>
    <div class="card cg"><div class="card-title">Ingresos con nueva tarifa</div><div class="card-value">~39.500 € <small>/año</small></div><div class="card-body">+4.500 € · Estable de ahí en adelante</div></div>
  </div>
  <div class="alert ai"><div class="alert-icon">💡</div><div class="alert-content"><div class="alert-title">Argumento para las familias</div><p>Subida moderada tras varios años congelada. A cambio: <strong>acceso incluido</strong> a la sección web con grabaciones de canciones y recitados de las clases.</p></div></div>

  <h3>Alquiler instalaciones EMPI</h3>
  <table>
    <thead><tr><th>Periodo</th><th>Base Imponible</th><th>IVA (21%)</th><th>Total Mensual</th></tr></thead>
    <tbody>
      <tr><td>Septiembre</td><td>335,00 €</td><td>70,35 €</td><td>405,35 €</td></tr>
      <tr><td>Octubre a Junio (x9)</td><td>665,00 € / mes</td><td>139,65 € / mes</td><td>804,65 € / mes</td></tr>
      <tr class="hl"><td>Total anual</td><td>6.320,00 €</td><td>1.327,20 €</td><td><strong>7.647,20 €</strong></td></tr>
    </tbody>
  </table>
  <p>El acuerdo cerrado permite planificar los costes fijos de alquiler con total precisión de cara a la facturación anual de la escuela.</p>

  <h3>Especialización en Primera Infancia: Grupos de 0 a 3 años</h3>
  <div class="alert ai"><div class="alert-icon">💡</div><div class="alert-content"><div class="alert-title">Nuevo Enfoque: 0 a 3 años</div><p>Transición a una <strong>superespecialización exclusiva en la primera infancia (0 a 3 años)</strong>. Se elimina la idea de mantener a los alumnos hasta los 4 años y el concepto de "graduación".</p></div></div>
  <ul class="checklist">
    <li><strong>Estructura de grupos:</strong> Se establecen dos únicos tipos de grupos: <strong>0 a 3 años (Bebés)</strong> y <strong>3 años (Mayores)</strong>.</li>
    <li><strong>Grupos de 3 años:</strong> Se ofertarán muy pocos grupos de esta edad (en principio, solo 2). Al entrar acompañados de un adulto, el espacio en el aula limita fuertemente el aforo (máximo 8 peques por grupo).</li>
  </ul>
</div>

  <h2 style="font-family:'Quicksand',sans-serif; font-size:13pt; color:var(--dark); margin:35px 0 15px; border-bottom:2px solid var(--border); padding-bottom:6px;">6.2 Formaciones (Educadores y Familias)</h2>
  <div class="intro-box"><p><strong>El segundo producto estrella:</strong> Es el servicio por el que más dinero se cobra por persona. Aunque el objetivo no es dar muchas al año, se ofrecen desde el principio porque aportan altísima rentabilidad y autoridad al proyecto.</p></div>
  <h3>Público Objetivo (0 a 6 años)</h3>
  <ul class="checklist">
    <li><strong>Educadores infantiles:</strong> Maestros y profesionales que trabajan con niños de 0 a 6 años y necesitan recursos musicales para el aula.</li>
    <li><strong>Familias:</strong> Padres y madres que buscan llevar la metodología a casa con mayor profundidad.</li>
  </ul>
  <h3>Modelo Comercial y Operativa</h3>
  <ul class="checklist">
    <li><strong>Formato, Aforo y Precio (Validado):</strong> Tras el éxito de la 1ª edición, el formato óptimo es de <strong>8 horas en un único día (sábado completo)</strong>. La clave será hacer el intensivo de 8h con grandes bloques de descanso y dinámicas variadas. <strong>El aforo estimado será de 12 a 20 plazas</strong> (nunca realizándose con menos de 10 inscritos). El precio de <strong>100€ (Early Bird) / 120€ (Regular)</strong> asegura una rentabilidad bruta conservadora de entre <strong>1.300€ y 2.200€ por cada edición presencial</strong>.</li>
    <li><strong>Negociación de Espacios:</strong> Evitar la cesión del 30% de facturación. El modelo escalable es negociar un precio de alquiler fijo (100€-150€/mañana) o un intercambio de "Espacio por Plazas" (ofrecer 2 plazas gratuitas al equipo docente del centro a cambio del uso de sus instalaciones). Espacios ideales: Escuelas Infantiles Privadas, Centros de Atención Temprana y Coworkings.</li>
    <li><strong>Venta B2B con FUNDAE:</strong> Es el gran imán para profesorado de educación concertada/privada. Para evitar la enorme burocracia del SEPE, Musicabalú se apoyará en una <strong>Entidad Organizadora externa</strong> (gestoría) que tramitará las bonificaciones a cambio de una pequeña tasa por alumno, manteniendo a Javier como el formador exclusivo.</li>
    <li><strong>El salto al formato Híbrido/Online:</strong> Aprovechar las presenciales para grabar material audiovisual. Esto permitirá crear un producto empaquetado (vídeos + 1 tutoría mensual en Zoom) vendible a toda España y Latinoamérica con un margen del 100%.</li>
  </ul>
  
  <h4>Base de Datos Inicial de Prospectos (Expansión Nacional)</h4>
  <p>Listado de Escuelas Infantiles Privadas (candidatas al intercambio "Plazas por Espacio"):</p>
  <ul class="checklist">
    <li><strong>Murcia:</strong> E.I. Jacky (web@escuelainfantiljacky.com), CEI Crecemos (info@ceicrecemos.es), Pequeñas Sonrisas, E.I. Santa Helena. <em>Atención Temprana:</em> Koru, APADI, Sicoedu.</li>
    <li><strong>Alicante:</strong> N.E. Garabatos (direccion@nuestraescuelagarabatos.com), CEI Hormiguitas, Somos Colores.</li>
    <li><strong>Valencia:</strong> Mi Cole Ruzafa (info@micolevalencia.org), Ruzafa Montessori, E.I. la Estrella, Little Stars.</li>
    <li><strong>Madrid:</strong> E.I. Nemomarlin (info@escuelanemomarlin.com), Smart Nursery, Menagar.</li>
    <li><strong>Barcelona:</strong> Escola Petit Far (escolapetitfar@gmail.com), Nemomarlin Gràcia, Llar D' Infants Goi Goi.</li>
    <li><strong>Sevilla:</strong> E.I. Solyluna (solyluna.murube@gmail.com), E.I. Oliver, CEI Rainbow.</li>
    <li><strong>Málaga:</strong> E.I. Maitena (maitena2@grupomaitena.com), C.E.I. Patito Amarillo, E.I. Santa Paula.</li>
    <li><strong>Zaragoza:</strong> Érase una vez (escuelainfantil@eraseunavezcei.com), G.I. Peter Pan, E.I. Trompitas.</li>
  </ul>
</div>

  <h2 style="font-family:'Quicksand',sans-serif; font-size:13pt; color:var(--dark); margin:35px 0 15px; border-bottom:2px solid var(--border); padding-bottom:6px;">6.3 Talleres Familiares Puntuales (0 a 3 años)</h2>
  <div class="intro-box">
    <p><strong>Experiencia inmersiva y producto de entrada de alta rotación:</strong> Sesiones sueltas e intensivas de <strong>45 minutos</strong> de música en familia durante los fines de semana. Diseñadas para potenciar el vínculo afectivo a través del neurodesarrollo musical, generar ingresos rápidos y alimentar de forma continua el embudo principal (clases presenciales, membresía web y productos de la tienda).</p>
  </div>

  <h3>1. Metodología y Carácter Inmersivo (Gordon MLT)</h3>
  <div class="alert as">
    <div class="alert-icon">👶</div>
    <div class="alert-content">
      <div class="alert-title">Música en Familia sin Palabras</div>
      <p>La sesión se rige estrictamente por la <strong>Teoría del Aprendizaje Musical (MLT) de Edwin E. Gordon</strong>. Es una experiencia <em>"sin palabras"</em>, apoyada exclusivamente en la voz cantada, el silencio activo, el contraste de modos musicales (mayor, menor, dórico, etc.) y métricas inusuales, y el movimiento corporal fluido continuo. Crea una atmósfera de altísima calidad auditiva y calma, alejada del ruido y sobreestimulación del ocio infantil comercial.</p>
    </div>
  </div>

  <h3>2. Requisitos y Condiciones del Espacio (A cargo del centro)</h3>
  <p>Para garantizar la magia de la sesión no se requiere gran equipamiento ni tecnología; el secreto está en la limpieza y calidad del entorno físico:</p>
  <ul class="checklist">
    <li><strong>Sala diáfana y despejada:</strong> Espacio amplio, cálido, limpio y completamente libre de obstáculos (sin mesas, sillas ni juguetes o materiales a la vista que distraigan la atención visual de los peques).</li>
    <li><strong>Suelo blando y acogedor:</strong> Aula de psicomotricidad, suelo de corcho, tatami o tarima/madera limpia. Todos los asistentes acceden descalzos o con calcetines.</li>
    <li><strong>Amplitud de espacios colaboradores:</strong> No tiene por qué ser únicamente una escuela infantil tradicional. Encajan a la perfección <em>Centros de Desarrollo Infantil y Atención Temprana (CDIAT)</em>, <em>Espacios de crianza respetuosa / pedagogías activas (Montessori, Waldorf)</em>, <em>Salas de psicomotricidad / movimiento</em> y <em>Estudios de yoga familiar</em>.</li>
    <li><strong>Material musical aportado por Musicabalú:</strong> Todos los instrumentos específicos (campanas afinadas, fulares, paracaídas, pelotas táctiles, huevos sonoros) son transportados e higienizados por Javier.</li>
  </ul>

  <h3>3. Compromiso y Pautas de las Familias</h3>
  <div class="alert ai">
    <div class="alert-icon">✨</div>
    <div class="alert-content">
      <div class="alert-title">El Código de Sala para una Experiencia Mágica</div>
      <p>Dado el carácter inmersivo, el centro colaborador debe comunicar con antelación estas normas básicas a los padres inscritos:</p>
      <ul class="checklist" style="margin-top: 8px;">
        <li><strong>Aforo y Ratio:</strong> Máximo <strong>10 a 12 familias por turno</strong> (estrictamente 1 bebé de 0 a 36 meses acompañado por 1 único adulto de referencia para no saturar la sala).</li>
        <li><strong>Puntualidad Absoluta:</strong> Llegar 10 minutos antes para descalzarse y acomodarse. Una vez iniciada la música, no se interrumpe la sesión abriendo la puerta.</li>
        <li><strong>Presencia Plena y Silencio Adulto:</strong> Los adultos no hablan entre ellos ni dirigen verbalmente a los niños. Las consignas se transmiten cantando y mediante el modelaje corporal.</li>
        <li><strong>Libertad de Movimiento:</strong> Nunca se fuerza al niño a sentarse o a interactuar. El bebé explora el espacio a su ritmo; el adulto modela disfrutando de la música.</li>
        <li><strong>Cero Dispositivos:</strong> Móviles guardados y silenciados. Prohibidas fotos o vídeos durante la sesión para proteger la intimidad y la inmersión del grupo.</li>
      </ul>
    </div>
  </div>

  <h3>4. Modelos Comerciales y Rentabilidad</h3>
  <div class="cards">
    <div class="card cp">
      <div class="card-icon">🏢</div>
      <div class="card-title">Vía A: Presupuesto Cerrado (B2B)</div>
      <div class="card-value">220 € <small>+ IVA / pase</small></div>
      <div class="card-body">Factura cerrada al centro por taller de 45 min (o 380 € por 2 pases seguidos de mañanas). El centro asume el coste como actividad de fidelización o cobra entrada directa a sus alumnos.</div>
    </div>
    <div class="card cg">
      <div class="card-icon">🎟️</div>
      <div class="card-title">Vía B: Pop-up a Taquilla (Alquiler %)</div>
      <div class="card-value">20 € <small>/ familia</small></div>
      <div class="card-body">10-12 familias = 200 € a 240 € por sesión. Se pacta una cesión del <strong>20%–25% de la recaudación</strong> al centro a cambio del espacio y de promocionar el evento a sus familias.</div>
    </div>
  </div>

  <div class="alert as">
    <div class="alert-icon">🧲</div>
    <div class="alert-content">
      <div class="alert-title">El Imán del Embudo (Funnel hacia la Web y Clases)</div>
      <p>El taller no termina a los 45 minutos. Cada familia participante recibe el alta en una <strong>cuenta Freemium</strong> en la web de Musicabalú para seguir escuchando 4 audios en casa. Quienes viven la experiencia en vivo son el público con mayor tasa de conversión para apuntarse a las clases regulares de EMPI, suscribirse a la plataforma o adquirir los packs de relajación.</p>
    </div>
  </div>

  <h3>5. Base de Datos de Espacios Prospectables en la Región de Murcia</h3>
  <p>Candidatos ideales para talleres familiares puntuales (escuelas infantiles, centros de atención temprana, espacios Montessori/Waldorf y centros de psicomotricidad/crianza con sala diáfana de suelo cálido):</p>

  <table>
    <thead>
      <tr>
        <th>Municipio / Zona</th>
        <th>Centro / Espacio</th>
        <th>Tipo de Espacio / Sala</th>
        <th>Teléfono</th>
        <th>Email de Contacto</th>
      </tr>
    </thead>
    <tbody>
      <!-- Murcia Capital & Pedanías -->
      <tr><td>Murcia (Centro/Norte)</td><td><strong>E.I. Bilingüe Jacky</strong> (C/ José Javier, 12)</td><td>Escuela Infantil Privada · Aula psicomotricidad</td><td>968 29 41 25 / 659 59 51 84</td><td>web@escuelainfantiljacky.com</td></tr>
      <tr><td>Murcia (San Basilio)</td><td><strong>E.I. Nenos Star</strong> (C/ Catedrático Fernando Piñuela, 5)</td><td>Escuela Infantil Privada · Sala diáfana</td><td>968 07 90 24 / 661 91 32 24</td><td>info@escuelainfantilnenos.com</td></tr>
      <tr><td>Murcia (Espinardo / JC1)</td><td><strong>CEI JC1</strong> (C/ Monseñor José Manuel Lorca, 2ª)</td><td>Centro Infantil · Espacio polivalente</td><td>640 51 53 23</td><td>jc1centroinfantil@gmail.com</td></tr>
      <tr><td>Murcia (Juan de Borbón)</td><td><strong>CEI Crecemos</strong> (Av. Francisco Jiménez Ruiz, 10)</td><td>Centro Infantil · Aula de psicomotricidad / tarima</td><td>696 57 71 08 / 968 78 66 79</td><td>info@ceicrecemos.es</td></tr>
      <tr><td>Murcia (San Basilio)</td><td><strong>E.I. Origami</strong> (Plaza Tomás y Valiente, 4)</td><td>Proyecto respetuoso · Sala diáfana</td><td>968 28 50 15</td><td>info@origamieim.com</td></tr>
      <tr><td>Murcia (Centro)</td><td><strong>CEI Los Molinos</strong> (Centro urbano)</td><td>Centro Infantil · Estimulación temprana</td><td>968 29 93 42</td><td>info@escuelainfantil-losmolinos.com</td></tr>
      <tr><td>Murcia (La Flota)</td><td><strong>Centro CRESCERE</strong> (Av. Marina Española / Victoria)</td><td>Desarrollo Infantil · Sala de psicomotricidad acolchada</td><td>868 07 94 35 / 633 27 35 91</td><td>info@centrocrescere.com</td></tr>
      <tr><td>Murcia (La Alberca)</td><td><strong>Jardín Waldorf Murcia</strong> (C/ de los Caños, 3)</td><td>Pedagogía Waldorf · Suelo de madera / diáfano</td><td>646 97 67 90</td><td>asociacionwaldorfmurcia@gmail.com</td></tr>
      <tr><td>Murcia (Puente Tocinos)</td><td><strong>Montessori British School</strong> (C/ Ermita Vieja, 26)</td><td>Pedagogía Montessori · Salas diáfanas cálidas</td><td>604 54 77 42 / 629 42 15 88</td><td>hello@montessoribritish.com</td></tr>
      <tr><td>Murcia (Juan de Borbón)</td><td><strong>CDIAT Fundación ASINTER</strong> (C/ Periodista Encarna Sánchez, 20)</td><td>Atención Temprana · Salas de estimulación sensorial</td><td>968 23 02 84</td><td>asinter@fundacionasinter.com</td></tr>
      <tr><td>Murcia (Torreagüera)</td><td><strong>CDIAT Sicoedu</strong> (Avda. San Javier, 58)</td><td>Desarrollo Infantil · Sala de psicomotricidad con tatami</td><td>968 82 09 10 / 717 70 82 46</td><td>info@sicoedu.es</td></tr>
      <tr><td>Murcia (Centro)</td><td><strong>Centro AtemyTea</strong> (C/ Marín Baldo, 1)</td><td>Atención Temprana · Salas acondicionadas</td><td>868 05 01 02 / 635 38 04 27</td><td>info@atemytea.com</td></tr>
      <tr><td>Murcia (Infante)</td><td><strong>ASTRAPACE Atención Temprana</strong> (C/ Vicente Aleixandre, 11B)</td><td>Desarrollo Infantil · Salas de movimiento</td><td>968 34 00 90</td><td>astrapace@astrapace.com</td></tr>
      <tr><td>Murcia (San Miguel)</td><td><strong>Centro Juan XXIII / ASSIDO</strong> (Avda. Miguel de Cervantes)</td><td>Centro de Desarrollo Infantil y Familias</td><td>968 29 38 10</td><td>assido@assido.com</td></tr>
      <tr><td>Murcia (La Flota)</td><td><strong>E.I. Pequeñas Sonrisas</strong> (C/ Abenarabi, 14)</td><td>Escuela Infantil Privada · Sala polivalente</td><td>968 20 42 12</td><td>pequenassonrisas@gmail.com</td></tr>

      <!-- Cartagena & Mar Menor -->
      <tr><td>Cartagena (Centro)</td><td><strong>CEI Pepico Paluco</strong> (C/ Jiménez de la Espada, 21B)</td><td>Escuela Infantil Privada · Sala psicomotricidad</td><td>968 50 04 00</td><td>cep.pepicopaluco@gmail.com</td></tr>
      <tr><td>Cartagena (Pozo Estrecho)</td><td><strong>Escuela Alma Montessori</strong> (Finca La Gregoria, 2)</td><td>Pedagogía Montessori · Espacio diáfano natural</td><td>744 48 55 27</td><td>info@espacioeducativoalmamontessori.es</td></tr>
      <tr><td>Cartagena (Ciudad Jardín)</td><td><strong>CEI Pipiripao</strong> (C/ Jorge Juan, 39)</td><td>Centro Infantil · Aula de movimiento</td><td>968 31 43 53</td><td>ceipipiripao@gmail.com</td></tr>
      <tr><td>Cartagena (Sta. Ana)</td><td><strong>Colegio Miralmonte</strong> (Plaza Baden Powell, s/n)</td><td>Etapa 0-3 / Infantil · Gran aula psicomotriz</td><td>968 33 07 03</td><td>info@colegiomiralmonte.com</td></tr>
      <tr><td>Cartagena (Canteras)</td><td><strong>Colegio La Vaguada</strong> (Avda. La Española, 48 bis)</td><td>Infantil · Sala de usos múltiples</td><td>968 12 65 42</td><td>info@colegiolavaguada.com</td></tr>
      <tr><td>San Javier (Ribera)</td><td><strong>CAI Santiago de la Ribera</strong> (C/ Alcalá de Henares, s/n)</td><td>Atención a la Infancia · Sala polivalente</td><td>629 62 89 38</td><td>educacion@sanjavier.es</td></tr>
      <tr><td>San Javier (Centro)</td><td><strong>E.M. Infantil San Javier</strong> (C/ Crucero Baleares, s/n)</td><td>Escuela Municipal 0-3 · Espacio diáfano</td><td>968 19 12 40</td><td>educacion@sanjavier.es</td></tr>

      <!-- Molina de Segura & Vega Media -->
      <tr><td>Molina de Segura</td><td><strong>E.I. Santa Helena</strong> (C/ Reino Unido, s/n)</td><td>Escuela Infantil Privada · Aula de psicomotricidad</td><td>968 64 36 79</td><td>eisantahelena@gmail.com</td></tr>
      <tr><td>Molina (Altorreal)</td><td><strong>CAI Altorreal</strong> (Avda. del Golf, s/n)</td><td>Centro Infantil en urbanización · Sala amplia</td><td>696 20 52 32</td><td>consu210@hotmail.com</td></tr>
      <tr><td>Molina (La Alcayna)</td><td><strong>CAI La Alcayna</strong> (C/ Maracaibo, s/n)</td><td>Atención a la Infancia · Aula diáfana</td><td>606 10 38 82</td><td>inmarubioh@hotmail.com</td></tr>
      <tr><td>Molina de Segura</td><td><strong>CAI El Llano</strong> (C/ Serreta, s/n)</td><td>Centro Infantil Cativos · Suelo acolchado</td><td>968 20 68 79</td><td>llano@cativos.com</td></tr>
      <tr><td>Molina de Segura</td><td><strong>E.I. Consolación</strong> (C/ Ermita Nueva, s/n)</td><td>Escuela Infantil Municipal · Sala de usos múltiples</td><td>968 61 18 02</td><td>eiconsolacion@hotmail.com</td></tr>

      <!-- Alcantarilla -->
      <tr><td>Alcantarilla</td><td><strong>E.I. Bambi</strong> (C/ San Fernando, 7)</td><td>Escuela Infantil Privada · Aula psicomotricidad</td><td>968 89 32 77 / 606 93 72 52</td><td>hola@escuelainfantilbambialcantarilla.com</td></tr>
      <tr><td>Alcantarilla</td><td><strong>Centro Infantil Valeryna</strong> (C/ Menorca, 2, Bajo A)</td><td>Centro Infantil y Estimulación · Sala acolchada</td><td>603 01 86 39</td><td>info@valeryna.com</td></tr>
      <tr><td>Alcantarilla</td><td><strong>E.I. Municipal Alcantarilla</strong> (C/ Cerámica Ángel Galindo, 1)</td><td>Instalaciones infantiles municipales · Sala amplia</td><td>968 89 47 95</td><td>30018311@murciaeduca.es</td></tr>

      <!-- Lorca, Guadalentín & Noroeste -->
      <tr><td>Lorca (Centro)</td><td><strong>Centro Infantil L'Ecole</strong> (C/ Musso Valiente, Torrelorca)</td><td>Centro Infantil Privado · Aula psicomotriz</td><td>968 11 38 45 / 695 49 06 64</td><td>info@guarderialecole.com</td></tr>
      <tr><td>Lorca</td><td><strong>E.I. Municipal de Lorca</strong> (C/ Tenor Mario Gabarrón, 2)</td><td>Escuela Infantil · Sala de psicomotricidad 0-3</td><td>695 49 07 40</td><td>educacion@lorca.es</td></tr>
      <tr><td>Caravaca de la Cruz</td><td><strong>Colegio Consolación (Infantil)</strong> (C/ Mª Rosa Molas, 1)</td><td>Etapa 0-3 y psicomotricidad · Suelo adaptado</td><td>968 70 88 54</td><td>info@consolacioncaravaca.com</td></tr>
      <tr><td>Cieza</td><td><strong>E.I. Municipal de Cieza</strong> (C/ Velázquez, 4)</td><td>Escuela Infantil · Aulas diáfanas adaptadas</td><td>968 76 38 14</td><td>escuela.infantil@cieza.es</td></tr>
    </tbody>
  </table>
</div>

  <h2 style="font-family:'Quicksand',sans-serif; font-size:13pt; color:var(--dark); margin:35px 0 15px; border-bottom:2px solid var(--border); padding-bottom:6px;">6.4 Modelo de suscripción digital (Membresía B2C)</h2>
  <h3>Diferenciación de accesos (Estrategia de Producto Único)</h3>
  <div class="alert as"><div class="alert-icon">🔄</div><div class="alert-content"><div class="alert-title">Producto Único y Liberación Trimestral</div><p>La plataforma es un único ecosistema idéntico para familias presenciales (acceso gratuito incluido) y suscriptores externos (5,90€). Los audios se reutilizan de las formaciones, acompañados de "Píldoras Prácticas en Casa" extraídas con IA. El contenido se libera en 3 bloques trimestrales (Otoño, Invierno, Primavera) para mantener el valor percibido alto sin saturar.</p></div></div>
  <table>
    <thead><tr><th></th><th>Familias alumnas</th><th>Suscripción externa</th></tr></thead>
    <tbody>
      <tr><td>Biblioteca musical completa (Otoño, Invierno, Primavera)</td><td>✅</td><td>✅</td></tr>
      <tr><td>Píldoras prácticas para rutinas en casa</td><td>✅</td><td>✅</td></tr>
      <tr><td>Nuevos lanzamientos trimestrales</td><td>✅</td><td>✅</td></tr>
      <tr class="hl"><td>Precio</td><td>Incluido en cuota</td><td><strong>5,90 €/mes · 49 €/año</strong></td></tr>
    </tbody>
  </table>
  <div class="cards">
    <div class="card cp"><div class="card-title">Precio de lanzamiento</div><div class="card-value">3,90 € <small>/mes</small></div><div class="card-body">Primeros 50 suscriptores. Regular: 5,90 €/mes.</div></div>
    <div class="card cg"><div class="card-title">Meta crítica año 2</div><div class="card-value">100 <small>suscriptores</small></div><div class="card-body">= ~7.050 €/año recurrentes. Cubre el salto de la SS.</div></div>
  </div>
  <h3>Funnel de captación</h3>
  <div class="funnel">
    <div class="fstep"><div class="fdot fd1">①</div><div class="ftext"><strong>Lead magnet</strong> — "3 canciones gratis para cantar con tu bebé" (landing web)</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd2">②</div><div class="ftext"><strong>Newsletter mensual</strong> con valor real — genera confianza</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd3">③</div><div class="ftext"><strong>Oferta de suscripción</strong> — acceso completo a la biblioteca</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd4">④</div><div class="ftext"><strong>Upsell</strong> — audio, pack guitarra, formación para educadores</div></div>
  </div>
  <h3>Fuentes de captación</h3>
  <ul class="checklist">
    <li>Asistentes a formaciones — todos pasan por el funnel automáticamente.</li>
    <li>Ex-alumnos de Murcia que ya no vienen a clase.</li>
    <li>Instagram / Reels educativos → tráfico nacional de educadoras de infantil.</li>
    <li>SEO en musicabalu.com: "formación música bebés España", "música Gordon niños".</li>
  </ul>
  <h3>Tecnología por fases</h3>
  <table>
    <thead><tr><th>Fase</th><th>Plataforma</th><th>Cuándo</th></tr></thead>
    <tbody>
      <tr><td>Fase 1 — validar</td><td>Gumroad o Ko-fi (gestionan IVA europeo, sin desarrollo previo)</td><td>Año 1</td></tr>
      <tr><td>Fase 2 — escalar</td><td>MemberPress o WooCommerce Memberships en musicabalu.com</td><td>Año 2</td></tr>
    </tbody>
  </table>
</div>

  <h2 style="font-family:'Quicksand',sans-serif; font-size:13pt; color:var(--dark); margin:35px 0 15px; border-bottom:2px solid var(--border); padding-bottom:6px;">6.5 La tienda — audios y productos físicos</h2>
  <h3>Productos digitales</h3>
  <table>
    <thead><tr><th>Producto</th><th>Precio</th><th>Estado</th><th>Prioridad</th></tr></thead>
    <tbody>
      <tr><td>Audio relajación / sueño (40–60 min)</td><td><strong>9,90 €</strong> descarga</td><td>Por producir</td><td><span class="pill pr">🔴 Alta</span></td></tr>
      <tr><td>Pack guitarra (~20 vídeos canciones propias)</td><td><strong>49 €</strong> de por vida</td><td>Por producir</td><td><span class="pill po">🟡 Media</span></td></tr>
    </tbody>
  </table>
  <h3>Productos físicos</h3>
  <table>
    <thead><tr><th>Producto</th><th>PVP</th><th>Margen bruto</th><th>Estado</th><th>Prioridad</th></tr></thead>
    <tbody>
      <tr><td>Paquete regalo Musicabalú</td><td><strong>28–35 €</strong></td><td>~50–60 %</td><td>Por lanzar</td><td><span class="pill po">🟡 Media</span></td></tr>
      <tr><td>Libro sonoro (12 canciones + ilustraciones)</td><td><strong>18–22 €</strong> (editorial)</td><td>Royalties 8–12 %</td><td>En desarrollo</td><td><span class="pill pg">🔵 L. Plazo</span></td></tr>
    </tbody>
  </table>
  <h4>Paquete regalo — contenido y márgenes</h4>
  <table>
    <thead><tr><th>Componente</th><th>Coste mayorista</th></tr></thead>
    <tbody>
      <tr><td>2 pañuelos de música</td><td>2–4 €</td></tr>
      <tr><td>2 huevos sonoros</td><td>2–5 €</td></tr>
      <tr><td>2 saquitos de psicomotricidad</td><td>2–4 €</td></tr>
      <tr><td>Caja + packaging + tarjeta QR (3 canciones)</td><td>3–6 €</td></tr>
      <tr class="hl"><td>Total coste → PVP recomendado 28–35 €</td><td><strong>9–19 €</strong></td></tr>
    </tbody>
  </table>
  <h4>Libro sonoro — estrategia editorial</h4>
  <p>Editoriales a contactar: <strong>Kalandraka, Nubeocho, Takatuka, A buen paso, Edelvives.</strong> Primero editorial (sin inversión, con distribución). Si rechazan: versión con QR codes (1.500–3.000 €) para testear el mercado.</p>
  <h3>Orden de lanzamiento</h3>
  <div class="funnel">
    <div class="fstep"><div class="fdot fd1">1</div><div class="ftext"><strong>Audio relajación</strong> — rápido de producir, ingreso inmediato</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd2">2</div><div class="ftext"><strong>Suscripción digital</strong> — motor de ingresos recurrentes para el año 2</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd3">3</div><div class="ftext"><strong>Paquete regalo</strong> — buen margen, ideal para campañas navideñas</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd4">4</div><div class="ftext"><strong>Pack guitarra</strong> — requiere producción de vídeo</div></div>
    <div class="farrow">↓</div>
    <div class="fstep"><div class="fdot fd5">5</div><div class="ftext"><strong>Libro sonoro</strong> — proyecto a largo plazo (editorial o autoedición)</div></div>
  </div>
</div>

<!-- 7. PROYECCIÓN FINANCIERA -->
<div class="section pb">
  <div class="section-header"><div class="section-num sn7" style="background-color: var(--yellow); color: var(--dark) !important;">7</div><div class="section-title">Proyección financiera a 3 años (Objetivo Escalabilidad)</div></div>
  <div class="intro-box"><p>El objetivo del Año 3 no es mantener un negocio local estable, sino haber ejecutado una transición total hacia la <strong>escalabilidad digital masiva en el mundo hispano</strong>. Las formaciones online y la suscripción deben dispararse, haciendo que cualquier coste fijo pase a ser irrelevante.</p></div>
  <div class="alert ai"><div class="alert-icon">📊</div><div class="alert-content"><div class="alert-title">Rentabilidad de Formaciones Presenciales</div><p>Calculando de forma realista un aforo promedio de 12 a 20 plazas (a 100-120€), cada formación inyecta entre ~1.300€ y 2.200€ brutos de liquidez inmediata. Para alcanzar el objetivo del Año 1 (5.500€), bastan <strong>apenas 3 o 4 sábados completos al año</strong>. El crecimiento exponencial de los años 2 y 3 (hasta 25.000€) vendrá impulsado por la conversión de este formato al modelo digital (ventas pasivas B2C y B2B en Latam/España).</p></div></div>
    <div class="alert as" style="margin-bottom:18px;">
    <div class="alert-icon">🎪</div>
    <div class="alert-content">
      <div class="alert-title">Impacto de los Talleres Familiares Puntuales (~10 al año)</div>
      <p>Con solo <strong>1 taller al mes</strong> (10 sesiones al año en sábados lectivos por la mañana), se generan <strong>2.000 € brutos directos en el Año 1</strong> (10 sesiones × 200 € promedio) con un esfuerzo de apenas 10 horas de docencia anuales. En los años 2 y 3, al incorporar turnos dobles o más centros colaboradores, escala a <strong>3.500 € y 5.000 €</strong>, sirviendo a su vez como el canal de captación de menor coste para la membresía web y las clases regulares.</p>
    </div>
  </div>
  <table>
    <thead><tr><th>Concepto</th><th>Año 1 (Validación)</th><th>Año 2 (Crecimiento)</th><th>Año 3 (Escalado global)</th></tr></thead>
    <tbody>
      <tr><td>Clases presenciales (Tope físico en EMPI)</td><td>39.500 €</td><td>39.500 €</td><td>39.500 €</td></tr>
      <tr><td>Formaciones (Presencial + Online Latam/ES)</td><td>5.500 €</td><td>12.000 €</td><td><strong>25.000 €</strong></td></tr>
      <tr><td>Talleres familiares puntuales (~1 al mes, 10 al año)</td><td>2.000 €</td><td>3.500 €</td><td><strong>5.000 €</strong></td></tr>
      <tr><td>Suscripción digital + Tienda (Foco B2C)</td><td>2.000 €</td><td>12.000 €</td><td><strong>40.000 €</strong></td></tr>
      <tr class="hl"><td>Total ingresos brutos</td><td><strong>49.000 €</strong></td><td><strong>67.000 €</strong></td><td><strong>109.500 €</strong></td></tr>
      <tr><td>Alquiler EMPI (con IVA)</td><td>7.647 €</td><td>7.647 €</td><td>7.647 €</td></tr>
      <tr><td>Cuota SS autónomo (Cubierto por Fondo SEPE)</td><td>0 €</td><td>0 €</td><td>0 €</td></tr>
      <tr><td>Otros gastos operativos y Marketing (Ads)</td><td>4.000 €</td><td>7.000 €</td><td>12.000 €</td></tr>
      <tr style="color:var(--pink);"><td>Liquidación IVA Tienda/Digital/Talleres</td><td>400 €</td><td>2.200 €</td><td>7.200 €</td></tr>
      <tr><td>Total gastos operativos e impuestos</td><td>12.047 €</td><td>16.847 €</td><td>26.847 €</td></tr>
      <tr class="hl"><td>Beneficio Neto (Antes IRPF)</td><td><strong>36.953 €</strong></td><td><strong>50.153 €</strong></td><td><strong>82.653 €</strong></td></tr>
      <tr><td>IRPF estimado (~22–30 %)</td><td>8.130 €</td><td>12.037 €</td><td>24.796 €</td></tr>
      <tr class="hl"><td>Rentabilidad Líquida</td><td><strong>~28.823 €</strong></td><td><strong>~38.116 €</strong></td><td><strong>~57.857 €</strong></td></tr>
    </tbody>
  </table>
  <div class="alert as"><div class="alert-icon">🚀</div><div class="alert-content"><div class="alert-title">El impacto de la escalabilidad online</div><p>Gracias al ajuste del pago único mixto (donde se capitalizan solo 1.812,93€ para material y el resto se guarda para cuotas), la Seguridad Social está cubierta de forma ininterrumpida hasta <strong>Agosto del Año 3 (2029)</strong>, dotando al negocio de una tremenda liquidez durante 36 meses. Esa liquidez servirá para invertir agresivamente en publicidad (Meta Ads), llenando los cursos y la suscripción sin preocuparte de los gastos fijos. <strong>Confirmado por el SEPE (octubre 2026):</strong> cada mes el SEPE ingresa el importe de la cuota de autónomo y lo descuenta del remanente total de la prestación (el total del paro menos lo capitalizado para material), lo que cuadra con la previsión de ~3 años de cuotas cubiertas. Cuando en el Año 4 se agote el fondo del SEPE y comiences a pagar tu cuota, el negocio digital estará facturando tanto que este gasto será un simple "ruido de fondo".</p></div></div>
</div>

<!-- 8. ORGANIZACIÓN SEMANAL -->
<div class="section pb">
  <div class="section-header"><div class="section-num sn8">8</div><div class="section-title">Organización Semanal (Sistema de Hábitos Atómicos)</div></div>
  <div class="intro-box"><p><strong>El Diseño del Entorno (1ª Ley: Hacerlo Obvio):</strong> Esta distribución horaria no es una meta suelta, es un <em>sistema inquebrantable basado en tu identidad</em>. Las tareas técnicas se delegan a la IA para eliminar barreras (Hacerlo Sencillo), y el trabajo profundo se rige por el "Apilamiento de Hábitos". Operaremos desde el <em>Poder</em>, fluyendo sin fricción, en lugar de forzarnos a trabajar usando la <em>Fuerza</em>.</p></div>
  
  <h3>1. El Core Presencial</h3>
  <div class="cards">
    <div class="card cp"><div class="card-icon">🎤</div><div class="card-title">Impartir Clases</div><div class="card-value">~9 h <small>/sem</small></div><div class="card-body">9 grupos de 0-3 años</div></div>
    <div class="card cg"><div class="card-icon">📚</div><div class="card-title">Preparación</div><div class="card-value">~1 h <small>/sem</small></div><div class="card-body">Materiales y estructura de aula</div></div>
  </div>

  <h3>2. Trabajo Digital y Gestión (Desglose Detallado)</h3>
  
  <h4>Grabación de contenido web recurrente (~2 h 45 min / sem)</h4>
  <ul class="checklist">
    <li>Grabar 1 canción y 1 recitado rítmico a la semana para los bloques de Invierno y Primavera (T2/T3). Composiciones propias.</li>
    <li>Preparar el set de grabación (luces, micro, cámara) y hacer tomas rápidas.</li>
    <li>Edición mínima de audio/vídeo y subida a la plataforma web.</li>
  </ul>

  <h4>Nuevos productos y proyectos (~1 h 45 min / sem)</h4>
  <ul class="checklist">
    <li>Trabajo por <em>sprints</em> mensuales: enfocarse en un solo producto a la vez hasta terminarlo.</li>
    <li><strong>Sprints ejemplos:</strong> Guionizar y grabar audios de relajación; grabar videotutoriales del pack de guitarra; maquetar el libro sonoro.</li>
  </ul>

  <h4>Redes Sociales y Embudos de Venta (~3 h / sem)</h4>
  <ul class="checklist">
    <li><strong>Grabación en bloque (Batching):</strong> Dedicar 2h seguidas para grabar los 3-4 Reels de toda la semana.</li>
    <li>Lectura y adaptación de los guiones creados por IA.</li>
    <li>Programación de las publicaciones en Meta Business Suite.</li>
    <li>Revisión de las secuencias de correos automáticos (Newsletters y Lead Magnets).</li>
  </ul>

  <h4>Prospección B2B (Formaciones) (~1 h / sem)</h4>
  <ul class="checklist">
    <li>Búsqueda de nuevas escuelas infantiles o espacios (ej. Google Maps, LinkedIn).</li>
    <li>Envío de emails en frío o mensajes directos usando plantillas probadas.</li>
    <li>Llamadas de seguimiento o reuniones cortas para cerrar colaboraciones ("Espacio por plazas").</li>
    <li>Coordinación con la gestoría externa para trámites de bonificación (FUNDAE).</li>
  </ul>

  <h4>Comunicación con familias (Hasta ~3 h 15 min / sem)</h4>
  <ul class="checklist">
    <li><strong>Sistema de Ventanas:</strong> 3 bloques diarios de 15 min de lunes a jueves (9:00, 14:00 y 20:00) y 1 bloque los viernes (14:00). Exclusivos para contestar WhatsApps/Emails. Si no hay mensajes, el tiempo queda libre.</li>
    <li>Responder dudas pedagógicas de los padres (clases presenciales o suscriptores).</li>
    <li>Gestión de incidencias: faltas de asistencia, recuperaciones, retrasos.</li>
    <li>Gestión de cobros: enviar recordatorios de pago a familias que no tengan domiciliación.</li>
    <li>Utilización de plantillas de correo (copy/paste) para agilizar respuestas repetitivas.</li>
  </ul>

  <h4>Analítica, Asesoría y Finanzas (~1 h / sem)</h4>
  <ul class="checklist">
    <li><strong>Métricas Web:</strong> Revisar altas/bajas de la suscripción, descargas del Lead Magnet y rendimiento de anuncios (Ads) si los hubiera.</li>
    <li><strong>Contabilidad Diaria:</strong> Clasificar facturas de gastos (Amazon, alquiler, herramientas digitales) y guardarlas en Drive.</li>
    <li><strong>Asesoría (Trimestral):</strong> Recopilación y envío de facturas a la gestoría para la presentación de los modelos trimestrales de IVA e IRPF (picos de trabajo en enero, abril, julio y octubre).</li>
    <li>Actualizar hoja de previsión de ingresos y control de la hucha de la Tarifa Plana / Cuota Cero.</li>
  </ul>

  <h4>Mantenimiento Técnico de la Web (~0,5 h / sem)</h4>
  <ul class="checklist">
    <li>Pruebas de usuario: entrar a la web como cliente para verificar que los enlaces y botones funcionan.</li>
    <li>Solicitar a la IA nuevas funciones, arreglos de bugs o actualizaciones visuales.</li>
    <li>Revisar notificaciones de Stripe (pagos fallidos, tarjetas caducadas).</li>
  </ul>

  <table style="margin-top:20px;">
    <tbody>
      <tr class="hl"><td><strong>Total Global de Trabajo</strong></td><td colspan="2"><strong>~22 - 24 horas semanales</strong> (sumando las 11 horas presenciales)</td></tr>
    </tbody>
  </table>
</div>
<!-- ANEXO I: TECNOLOGÍA IA -->
<div class="section pb" style="background:#f9f9f9; padding:20px; border-radius:12px; margin-top:40px;">
  <div class="section-header"><div class="section-num sn1" style="width: 40px; border-radius: 20px;">AI</div><div class="section-title">Anexo I: Manual de Modelos IA (Antigravity)</div></div>
  <p style="font-size:10pt; color:#444;">Guía rápida de los "cerebros" disponibles en nuestro entorno de desarrollo y cuándo utilizar cada uno para optimizar el proyecto Musicabalú:</p>
  
  <ul class="checklist">
    <li><strong>Claude 3.5 Sonnet 🎨 (El Diseñador Web):</strong> Actualmente el mejor modelo del mundo para escribir código visual (React, CSS, interfaces de usuario). Úsalo cuando quieras que la web se vea más bonita, añadir animaciones o estructurar visualmente un panel de control.</li>
    <li><strong>Gemini 1.5 Pro 🧠 (El Estratega de Contexto Masivo):</strong> El rey indiscutible para absorber información gigante. Es el único capaz de leerse toda la carpeta del proyecto, los 20 libros en PDF de MLT y cruzar datos sin perder la memoria. Úsalo para planificar, resumir leyes del SEPE o crear bases de datos pedagógicas.</li>
    <li><strong>GPT-4o ⚙️ (El Lógico Rápido):</strong> Excelente para tareas matemáticas, depuración de errores de código muy concretos o redacción de correos con un tono muy estándar y corporativo.</li>
    <li><strong>Modelos "Flash" o "Haiku" ⚡:</strong> Son las versiones ultraligeras y rápidas. No sirven para programar cosas complejas, pero son ideales para tareas repetitivas (ej. clasificar un Excel gigante fila por fila) porque consumen muy pocos recursos y no se saturan.</li>
  </ul>
  
  <div class="alert as" style="margin-top: 15px;">
    <div class="alert-icon">💡</div>
    <div class="alert-content">
      <div class="alert-title">¿Hay límites de uso o saturación?</div>
      <p>Al utilizar este entorno de desarrollo (Antigravity), los modelos se alimentan por conexiones API profesionales, no por la interfaz web gratuita. <strong>No tienen los bloqueos típicos de "Has alcanzado el límite de mensajes"</strong> que sufren los usuarios gratuitos en ChatGPT o Claude.com. El sistema gestiona las cuotas internamente para que puedas programar durante horas sin que la IA "se canse".</p>
    </div>
  </div>
  
  <div class="alert ad" style="margin-top: 15px;">
    <div class="alert-icon">🎯</div>
    <div class="alert-content">
      <div class="alert-title">Directriz Estratégica: Exprimir Gemini Advanced</div>
      <p>Puesto que dispones de la suscripción de pago a Gemini Advanced (Google One AI Premium), <strong>todas las automatizaciones futuras del negocio (formularios, gestión de alumnos en Excel/Sheets, embudos de correo) se diseñarán de forma nativa en el ecosistema de Google</strong>. El objetivo es exprimir la inteligencia artificial integrada en Gmail y Google Docs para que la suscripción se pague sola ahorrándote horas de gestión administrativa semanal.</p>
    </div>
  </div>
</div>

</div><!-- /content -->

<!-- FOOTER -->
<div class="footer-stripe">
  <span class="cs1"></span><span class="cs2"></span><span class="cs3"></span><span class="cs4"></span>
</div>
<div class="footer">
  <img class="footer-logo" src="logos/PNG/logo_texto.png" alt="Musicabalú">
  <div>musicabalu.com &middot; musicabalu@gmail.com</div>
  <div>Documento vivo &middot; Abril 2026</div>
</div>

</div><!-- /page -->
</body>
</html>
`;
