import Link from "next/link";

export default function Privacidad() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", color: "var(--color-dark)" }}>
      <Link href="/" style={{ color: "var(--color-primary)", textDecoration: "underline", marginBottom: "2rem", display: "inline-block" }}>
        &larr; Volver al inicio
      </Link>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Política de Privacidad</h1>
      
      <p style={{ marginBottom: "1.5rem" }}>
        En Musicabalú nos tomamos muy en serio la privacidad de tus datos y los de tu familia. 
        Este documento explica cómo recopilamos, utilizamos y protegemos tu información personal de acuerdo con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>1. Responsable del Tratamiento</h2>
      <ul style={{ marginBottom: "1.5rem", listStyleType: "none", padding: 0 }}>
        <li><strong>Titular:</strong> Javier Muñoz Sánchez</li>
        <li><strong>NIF:</strong> 48402528V</li>
        <li><strong>Dirección:</strong> C/Sierra de Guadarrama, 26, 30163, Murcia.</li>
        <li><strong>Email:</strong> hola@musicabalu.com</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>2. Finalidad del Tratamiento de los Datos</h2>
      <p style={{ marginBottom: "1rem" }}>
        Los datos personales que recabamos a través de la web (formularios de contacto, registro, compras) se utilizan para:
      </p>
      <ul style={{ marginLeft: "2rem", marginBottom: "1.5rem" }}>
        <li>Gestionar tu inscripción en las clases presenciales o digitales.</li>
        <li>Procesar los pagos de forma segura a través de nuestro proveedor (Stripe).</li>
        <li>Dar acceso a la plataforma digital (Comunidad Musicabalú / Formaciones).</li>
        <li>Enviarte comunicaciones importantes sobre el servicio (horarios, avisos, material pedagógico).</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>3. Legitimación</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        La base legal para el tratamiento de tus datos es:
        <br/>- El <strong>consentimiento expreso</strong> que nos otorgas al marcar la casilla de aceptación en nuestros formularios.
        <br/>- La <strong>ejecución de un contrato</strong> al adquirir una suscripción, inscribirte a clases presenciales o comprar en nuestra tienda.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>4. Conservación de los Datos</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Los datos personales proporcionados se conservarán mientras se mantenga la relación mercantil o hasta que solicites su supresión y, en cualquier caso, durante los años necesarios para cumplir con las obligaciones legales aplicables.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>5. Comunicación de Datos a Terceros</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Musicabalú no venderá ni cederá tus datos a terceros, salvo obligación legal. Sin embargo, para poder ofrecer nuestros servicios, compartimos ciertos datos con proveedores que cumplen con la normativa (como Stripe para el procesamiento de pagos, y Google para el alojamiento de datos y emails).
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>6. Tus Derechos</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Cualquier persona tiene derecho a obtener confirmación sobre si en Musicabalú estamos tratando datos personales que les conciernan. Tienes derecho a acceder a tus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando los datos ya no sean necesarios para los fines que fueron recogidos. 
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        Podrás ejercer tus derechos de Acceso, Rectificación, Cancelación, Oposición, Limitación y Portabilidad dirigiéndote por escrito a <strong>hola@musicabalu.com</strong>, adjuntando una copia de tu DNI.
      </p>
    </div>
  );
}
