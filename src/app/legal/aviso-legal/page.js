import Link from "next/link";

export default function AvisoLegal() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
      <Link href="/" style={{ color: "var(--color-primary)", textDecoration: "underline", marginBottom: "2rem", display: "inline-block" }}>
        &larr; Volver al inicio
      </Link>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Aviso Legal</h1>
      
      <p style={{ marginBottom: "1rem" }}>
        En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, 
        de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Datos Identificativos</h2>
      <p style={{ marginBottom: "1rem", color: "var(--color-text-light)" }}>
        Titular: Javier Muñoz Sánchez<br />
        NIF: 48402528V<br />
        Domicilio fiscal: C/Sierra de Guadarrama, 26, 30163, Murcia.<br />
        Email: musicabalu@gmail.com
      </p>

      <p style={{ marginTop: "3rem", color: "var(--color-text-light)", fontSize: "0.9rem" }}>
        [Nota Interna: Este es un texto provisional para estructurar la ruta.]
      </p>
    </div>
  );
}
