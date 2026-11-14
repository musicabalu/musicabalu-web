import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Paquete Regalo | Admin Musicabalú",
};

export default function PackagingAdminPage() {
  return (
    <div style={{ maxWidth: "1050px", margin: "0 auto", padding: "30px 20px" }}>
      {/* Navegación */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/admin"
          style={{
            color: "var(--color-cyan, #00B2E3)",
            fontWeight: "700",
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          ← Volver al Panel de Control
        </Link>
      </div>

      {/* Cabecera */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "inline-block", backgroundColor: "#e0f2fe", color: "#0369a1", fontWeight: "800", fontSize: "0.85rem", padding: "4px 12px", borderRadius: "999px", marginBottom: "8px" }}>
          📦 Producción Física & Estrategia Digital · Campaña Navidad
        </div>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", margin: "0 0 10px 0" }}>
          🎁 Paquete Regalo
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: "1.6", margin: 0 }}>
          Estrategia completa de la caja de regalo física de Musicabalú: tarjeta con QR, contenido musical exclusivo (2 canciones + 1 recitado), landing de desbloqueo, manual de packaging y escandallo de costes.
        </p>
      </div>

      {/* Acceso Rápido a la Página de los Audios */}
      <div style={{
        backgroundColor: "#f0f9ff",
        border: "2px solid #bae6fd",
        borderRadius: "20px",
        padding: "22px 26px",
        marginBottom: "36px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px"
      }}>
        <div>
          <span style={{ backgroundColor: "#0284c7", color: "white", fontSize: "0.75rem", fontWeight: "800", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase" }}>
            Página Pública Creada
          </span>
          <h3 style={{ margin: "6px 0 4px 0", color: "#0369a1", fontSize: "1.25rem", fontWeight: "900" }}>
            Landing de Desbloqueo: <code style={{ fontSize: "1.05rem", backgroundColor: "white", padding: "2px 8px", borderRadius: "6px", border: "1px solid #7dd3fc" }}>/paquete-regalo</code>
          </h3>
          <p style={{ margin: 0, color: "#0c4a6e", fontSize: "0.9rem", lineHeight: "1.5" }}>
            La página a la que llega la familia al escanear el QR. Incluye formulario de captación de email, reproductor interactivo, descargas MP3 offline y guía de juego para cada instrumento.
          </p>
        </div>
        <Link
          href="/paquete-regalo"
          target="_blank"
          style={{
            backgroundColor: "#0284c7",
            color: "white",
            padding: "12px 20px",
            borderRadius: "12px",
            fontWeight: "800",
            fontSize: "0.95rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)"
          }}
        >
          <span>Abrir Landing de la Caja</span>
          <span>↗</span>
        </Link>
      </div>

      {/* Estrategia Tarjeta Regalo + Audios + QR */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "28px",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        marginBottom: "36px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ fontSize: "1.8rem" }}>🎫</span>
          <div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", margin: 0 }}>
              Estrategia de la Tarjeta Regalo: Modelo Plataforma / Embudo
            </h2>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>
              Cómo convertimos a los receptores del regalo en usuarios habituales de Musicabalú y la Tienda
            </p>
          </div>
        </div>

        <p style={{ fontSize: "0.98rem", color: "#334155", lineHeight: "1.65", marginBottom: "20px" }}>
          El regalo físico (la caja con los pañuelos, huevos y saquitos) suele comprarlo un abuelo, tío o amigo de la familia. <strong>Quien abre la caja no es quien la compró</strong>. Por tanto, la tarjeta regalo actúa como un <strong>&ldquo;Caballo de Troya&rdquo; de captación de leads de altísima calidad</strong> que entran a vivir la experiencia dentro de nuestra plataforma.
        </p>

        {/* Los 3 pasos del flujo */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ backgroundColor: "#00B2E3", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800" }}>1</span>
              <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>Escaneo del QR en la tarjeta</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
              El código QR de la tarjeta lleva directamente a <code style={{ color: "#0369a1" }}>musicabalu.com/paquete-regalo</code>. Sin contraseñas complejas: solo escriben su <strong>Nombre y Email</strong> para registrarse y activar las canciones al instante.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ backgroundColor: "#00B2E3", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800" }}>2</span>
              <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>Reproductor Web Integrado (Sin MP3 sueltos)</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
              <strong>No permitimos la descarga de archivos MP3 sueltos</strong>. Para escuchar la música abren la plataforma web de Musicabalú (que pueden anclar a la pantalla de inicio del móvil). Así regresan a nuestra web cada vez que juegan en casa.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ backgroundColor: "#00B2E3", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800" }}>3</span>
              <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>Efecto Escaparate: Comunidad + Tienda</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
              Sigue el modelo de nuestra página de embudo: ven sus 3 pistas abiertas, pero tienen a la vista las canciones bloqueadas con candado 🔒 de la Comunidad y un escaparate directo con <strong>campanas y percusión de la tienda</strong> para ampliar su set de instrumentos.
            </p>
          </div>
        </div>

        {/* Las 3 Piezas Musicales */}
        <h3 style={{ fontSize: "1.15rem", fontWeight: "900", color: "#0f172a", marginBottom: "14px" }}>
          🎵 Contenido Musical del Paquete (2 Canciones + 1 Recitado)
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "26px" }}>
          <div style={{ borderLeft: "4px solid #f472b6", backgroundColor: "#fff1f2", padding: "16px", borderRadius: "0 12px 12px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "1.1rem" }}>🧣</span>
              <strong style={{ color: "#9f1239", fontSize: "0.95rem" }}>Canción 1: Juego con Pañuelos</strong>
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "#881337", lineHeight: "1.5" }}>
              Diseñada para <strong>movimiento continuo y fluidez</strong>. Estimula el seguimiento visual en bebés y la coordinación motriz gruesa al lanzar y atrapar el pañuelo.
            </p>
          </div>

          <div style={{ borderLeft: "4px solid #60a5fa", backgroundColor: "#eff6ff", padding: "16px", borderRadius: "0 12px 12px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "1.1rem" }}>🥚</span>
              <strong style={{ color: "#1e40af", fontSize: "0.95rem" }}>Canción 2: Juego con Huevos Sonoros</strong>
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "#1e3a8a", lineHeight: "1.5" }}>
              Enfocada en <strong>pulsación rítmica, dinámicas (forte/piano) y paradas</strong>. Desarrolla el autocontrol inhibitorio y la precisión motriz fina.
            </p>
          </div>

          <div style={{ borderLeft: "4px solid #fbbf24", backgroundColor: "#fffbeb", padding: "16px", borderRadius: "0 12px 12px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "1.1rem" }}>🧸</span>
              <strong style={{ color: "#92400e", fontSize: "0.95rem" }}>Recitado: Juego con Saquitos de Peso</strong>
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "#78350f", lineHeight: "1.5" }}>
              Ritmo puro en métrica binaria o ternaria para trabajar <strong>propiocepción y peso corporal</strong>. Ayuda al peque a percibir los límites de su cuerpo y a relajarse.
            </p>
          </div>
        </div>

        {/* Guía de Diseño de la Tarjeta Física */}
        <h3 style={{ fontSize: "1.15rem", fontWeight: "900", color: "#0f172a", marginBottom: "14px" }}>
          📐 Especificaciones para Diseñar e Imprimir la Tarjeta Física
        </h3>
        <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
            <div>
              <strong style={{ color: "#0f172a", display: "block", marginBottom: "6px", fontSize: "0.92rem" }}>
                📄 Formato y Papel Recomendado
              </strong>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.87rem", color: "#475569", lineHeight: "1.6" }}>
                <li>Tamaño: <strong>A6 (10,5 × 14,8 cm)</strong> o 10 × 15 cm. Cabe perfecta sobre el papel de seda en la caja.</li>
                <li>Gramaje: <strong>Cartulina estucada mate de 350 g</strong> (tacto de postal prémium, no se dobla).</li>
                <li>Acabado: Mate antihuellas para que se pueda escribir a boli sin que resbale la tinta.</li>
              </ul>
            </div>

            <div>
              <strong style={{ color: "#0f172a", display: "block", marginBottom: "6px", fontSize: "0.92rem" }}>
                🎨 Cara A (Anverso: Emoción y Dedicatoria)
              </strong>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.87rem", color: "#475569", lineHeight: "1.6" }}>
                <li>Logo de Musicabalú con frase: <em>&ldquo;Música para compartir y crecer juntos&rdquo;</em>.</li>
                <li>Líneas para rellenar a mano: <strong>Para:</strong> _______ / <strong>De:</strong> _______</li>
                <li>Espacio libre para una dedicatoria cariñosa de quien regala la caja.</li>
              </ul>
            </div>

            <div>
              <strong style={{ color: "#0f172a", display: "block", marginBottom: "6px", fontSize: "0.92rem" }}>
                📲 Cara B (Reverso: Desbloqueo y Seguridad)
              </strong>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.87rem", color: "#475569", lineHeight: "1.6" }}>
                <li><strong>Código QR grande y contrastado</strong> en el centro.</li>
                <li>URL visible debajo: <code style={{ color: "#00B2E3", fontWeight: "700" }}>musicabalu.com/paquete-regalo</code></li>
                <li>Texto: <em>&ldquo;Escanea este código con la cámara de tu móvil para activar y escuchar las 2 canciones y el recitado creados para los instrumentos de esta caja.&rdquo;</em></li>
                <li>Aviso legal en letra pequeña: Marcado CE, instrumentos para uso bajo supervisión de un adulto.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Comparativa Visual: Caja Real vs Resultado Unboxing */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
        marginBottom: "36px"
      }}>
        {/* Tu caja real */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "20px",
          border: "1.5px solid #e2e8f0",
          boxShadow: "0 4px 14px rgba(0,0,0,0.04)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: "800", color: "#0f172a", fontSize: "1rem" }}>📦 Tu Caja Real (Cerrada)</span>
            <span style={{ backgroundColor: "#dcfce7", color: "#15803d", fontSize: "0.75rem", fontWeight: "800", padding: "3px 8px", borderRadius: "999px" }}>Impresa y lista</span>
          </div>
          <div style={{ position: "relative", width: "100%", height: "260px", borderRadius: "14px", overflow: "hidden", backgroundColor: "#f8fafc" }}>
            <Image
              src="/imagenes/packaging/caja_real_musicabalu.jpg"
              alt="Caja real Musicabalú"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <p style={{ fontSize: "0.88rem", color: "#64748b", marginTop: "12px", marginBottom: 0, lineHeight: "1.5" }}>
            Caja automontable postal en cartón blanco puro con la marca frontal <em>&ldquo;Musicabalú · canta aprende juega crece&rdquo;</em>. Formato perfecto y rígido.
          </p>
        </div>

        {/* Resultado Unboxing */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "20px",
          border: "2px solid #00B2E3",
          boxShadow: "0 8px 24px rgba(0, 178, 227, 0.12)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: "800", color: "#0f172a", fontSize: "1rem" }}>✨ Experiencia Unboxing (Abierta)</span>
            <span style={{ backgroundColor: "#e0f2fe", color: "#0369a1", fontSize: "0.75rem", fontWeight: "800", padding: "3px 8px", borderRadius: "999px" }}>Objetivo Final</span>
          </div>
          <div style={{ position: "relative", width: "100%", height: "260px", borderRadius: "14px", overflow: "hidden", backgroundColor: "#f8fafc" }}>
            <Image
              src="/imagenes/packaging/unboxing_ejemplo.jpg"
              alt="Ejemplo de unboxing de regalo"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <p style={{ fontSize: "0.88rem", color: "#64748b", marginTop: "12px", marginBottom: 0, lineHeight: "1.5" }}>
            Al levantar la solapa, los padres ven el papel de seda en tono pastel cerrado con la pegatina y, reposando encima, la tarjeta de bienvenida con el código QR.
          </p>
        </div>
      </div>

      {/* Aclaración: ¿1 papel o 2 papeles? */}
      <div style={{
        backgroundColor: "#fffbeb",
        border: "1.5px solid #fde68a",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "36px"
      }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#92400e", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>💡</span> Aclaración sobre el papel de seda de la foto
        </h3>
        <p style={{ fontSize: "0.95rem", color: "#78350f", lineHeight: "1.6", margin: "0 0 12px 0" }}>
          En la foto generada parece que hay una banda o faja decorativa más estrecha en el centro. Esto se puede hacer de dos formas:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", border: "1px solid #fef3c7" }}>
            <strong style={{ color: "#92400e", display: "block", marginBottom: "6px" }}>Opción 1: Un solo pliego (Recomendada por sencillez)</strong>
            <p style={{ fontSize: "0.88rem", color: "#78350f", margin: 0, lineHeight: "1.5" }}>
              Usas un único pliego de papel de seda (blanco o pastel de unos 50 cm de ancho). Cubres el fondo y doblas las dos alas al centro solapándose 4-5 cm. Queda impecable, minimalista y es el método más rápido para montar las 50 cajas.
            </p>
          </div>
          <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", border: "1px solid #fef3c7" }}>
            <strong style={{ color: "#92400e", display: "block", marginBottom: "6px" }}>Opción 2: Pliego base + Tira central (Efecto fajín)</strong>
            <p style={{ fontSize: "0.88rem", color: "#78350f", margin: 0, lineHeight: "1.5" }}>
              Cierras el pliego base normalmente y, antes de pegar el sticker, le colocas una tira estrecha de papel kraft o de papel seda de contraste (de unos 8 cm de ancho) que cruza el paquete como un cinturón. Es muy vistoso, aunque añade 1 minuto más de trabajo por caja.
            </p>
          </div>
        </div>
      </div>

      {/* Guía Paso a Paso */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "28px",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        marginBottom: "36px"
      }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", marginBottom: "20px" }}>
          📐 Paso a Paso de Montaje
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ backgroundColor: "#00B2E3", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800" }}>1</span>
              <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>Colocar el pliego</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
              Coloca el papel centrado en el fondo, dejando que sobresalgan alas amplias a izquierda y derecha de la caja.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ backgroundColor: "#00B2E3", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800" }}>2</span>
              <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>Base de pañuelos</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
              Dobla los <strong>2 pañuelos de gasa planos</strong> en el fondo como alfombra textil. Encima acomoda los <strong>2 huevos y los 2 saquitos</strong> en paralelo.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ backgroundColor: "#00B2E3", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800" }}>3</span>
              <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>Pliegue y sello</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
              Pliega ala izquierda y luego ala derecha solapándose suavemente en el centro. Coloca la <strong>pegatina redonda</strong> en la unión central.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ backgroundColor: "#00B2E3", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800" }}>4</span>
              <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>Tarjeta con QR</strong>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
              Deja la tarjeta reposando justo encima del papel cerrado (o con una esquinita bajo la pegatina). Al abrir la tapa, es lo primero que leen.
            </p>
          </div>
        </div>
      </div>

      {/* Sección Pegatinas: Precios y Proveedores */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "28px",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        marginBottom: "36px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ fontSize: "1.6rem" }}>🏷️</span>
          <h2 style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", margin: 0 }}>
            ¿Encarece comprar pegatinas? (Precios y Dónde pedirlas)
          </h2>
        </div>
        <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px" }}>
          <strong>No, en absoluto.</strong> Las pegatinas personalizadas son uno de los elementos más baratos de imprenta y el que más multiplica la sensación de producto profesional. Para un lote de 50 o 100 cajas, el coste unitario es de apenas <strong>0,08 € a 0,15 € por caja</strong>.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "20px" }}>
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px" }}>
            <h4 style={{ margin: "0 0 6px 0", color: "#0f172a", fontWeight: "800" }}>Opción 1: Imprenta Local / Copistería en Murcia</h4>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748b", lineHeight: "1.5" }}>
              Vas a una imprenta digital (ej. Gráficas San Antonio, Copistería técnica cerca de la universidad, etc.). Les pides <strong>2 o 3 pliegos A3 en papel adhesivo con medio corte circular</strong>.
              <br /><strong style={{ color: "#0f172a" }}>Coste:</strong> ~6 € a 10 € en total. Te las dan en el mismo día.
            </p>
          </div>

          <div style={{ border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px" }}>
            <h4 style={{ margin: "0 0 6px 0", color: "#0f172a", fontWeight: "800" }}>Opción 2: Imprentas Online (Camaloon, Sticker Mule, VistaPrint)</h4>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748b", lineHeight: "1.5" }}>
              Pides un lote de <strong>50 o 100 pegatinas redondas de 3,5 cm o 4 cm</strong>. Vienen troqueladas individualmente o en rollos.
              <br /><strong style={{ color: "#0f172a" }}>Coste:</strong> ~12 € a 16 € con envío incluido (~0,12 € / ud).
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "14px 18px", borderRadius: "12px" }}>
          <strong style={{ color: "#166534", fontSize: "0.92rem", display: "block", marginBottom: "4px" }}>
            ✅ Especificaciones recomendadas para el archivo de la pegatina:
          </strong>
          <span style={{ fontSize: "0.86rem", color: "#15803d", lineHeight: "1.5" }}>
            • Formato: <strong>Redonda de 3,5 cm o 4 cm de diámetro</strong>.<br />
            • Diseño: Fondo blanco (o transparente) con el isotipo de Musicabalú (el corazón con destellos o el logo completo).<br />
            • Acabado: <strong>Mate o satinado suave</strong> (queda mucho más elegante que el brillo plástico para un producto infantil).
          </span>
        </div>
      </div>

      {/* Escandallo Financiero de las 50 cajas */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "28px",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
      }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", marginBottom: "16px" }}>
          💰 Escandallo de Coste y Margen (Lote 50 Cajas de Navidad)
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                <th style={{ padding: "12px 14px" }}>Concepto</th>
                <th style={{ padding: "12px 14px" }}>Coste Unitario</th>
                <th style={{ padding: "12px 14px" }}>Total (50 cajas)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 14px", color: "#1e293b" }}>Materiales (2 pañuelos gasa + 2 huevos sonoros + 2 saquitos)</td>
                <td style={{ padding: "12px 14px" }}>~6,50 €</td>
                <td style={{ padding: "12px 14px" }}>325,00 €</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 14px", color: "#1e293b" }}>Packaging (Caja blanca impresa + papel seda + tarjeta QR + pegatina)</td>
                <td style={{ padding: "12px 14px" }}>~3,50 €</td>
                <td style={{ padding: "12px 14px" }}>175,00 €</td>
              </tr>
              <tr style={{ backgroundColor: "#f0f9ff", fontWeight: "800", color: "#0369a1" }}>
                <td style={{ padding: "14px" }}>COSTE TOTAL POR CAJA</td>
                <td style={{ padding: "14px" }}>10,00 €</td>
                <td style={{ padding: "14px" }}>500,00 €</td>
              </tr>
              <tr style={{ backgroundColor: "#f0fdf4", fontWeight: "800", color: "#15803d" }}>
                <td style={{ padding: "14px" }}>PVP VENTA RECOMENDADO</td>
                <td style={{ padding: "14px" }}>29,90 €</td>
                <td style={{ padding: "14px" }}>1.495,00 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "18px", padding: "14px 18px", backgroundColor: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: "12px", color: "#6b21a8", fontSize: "0.92rem", fontWeight: "700" }}>
          🎉 Beneficio neto estimado: ~995 € de margen limpio en las 50 cajas (66 % de margen bruto).
        </div>
      </div>
    </div>
  );
}
