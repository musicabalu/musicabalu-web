import Link from "next/link";

export default function Privacidad() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
      <Link href="/" style={{ color: "var(--color-primary)", textDecoration: "underline", marginBottom: "2rem", display: "inline-block" }}>
        &larr; Volver al inicio
      </Link>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Política de Privacidad</h1>
      
      <p style={{ marginBottom: "1rem" }}>
        En Musicabalú nos tomamos muy en serio la privacidad de tus datos y los de tu familia. 
        Este documento explica cómo recopilamos, utilizamos y protegemos tu información personal.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. Responsable del Tratamiento</h2>
      <p style={{ marginBottom: "1rem", color: "var(--color-text-light)" }}>
        Javier Muñoz Sánchez (48402528V)<br />
        C/Sierra de Guadarrama, 26, 30163, Murcia.<br />
        Email de contacto: musicabalu@gmail.com
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. Finalidad de los Datos</h2>
      <p style={{ marginBottom: "1rem" }}>
        Los datos recogidos a través de los formularios (nombre, email) se utilizan exclusivamente para:
      </p>
      <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
        <li>Gestionar tu inscripción en las clases presenciales o digitales.</li>
        <li>Procesar los pagos de forma segura a través de nuestro proveedor (Stripe).</li>
        <li>Enviarte comunicaciones importantes sobre el servicio.</li>
      </ul>

      <p style={{ marginTop: "3rem", color: "var(--color-text-light)", fontSize: "0.9rem" }}>
        [Nota Interna: Este es un texto provisional. En la fase final se añadirá el texto legal completo elaborado por gestoría.]
      </p>
    </div>
  );
}
