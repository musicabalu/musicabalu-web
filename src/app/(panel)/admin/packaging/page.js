import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Paquete Regalo y Guía de Packaging | Admin Musicabalú",
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
          📦 Producción Física · Campaña Navidad
        </div>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", margin: "0 0 10px 0" }}>
          🎁 Paquete Regalo & Guía de Packaging
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: "1.6", margin: 0 }}>
          Manual visual para el montaje de las 50 cajas regalo de Musicabalú. Experiencia de unboxing artesanal, técnica del papel de seda, costes y proveedores de pegatinas.
        </p>
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
