import Link from "next/link";

export default function AvisoLegal() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", color: "var(--color-dark)" }}>
      <Link href="/" style={{ color: "var(--color-primary)", textDecoration: "underline", marginBottom: "2rem", display: "inline-block" }}>
        &larr; Volver al inicio
      </Link>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Aviso Legal</h1>
      
      <p style={{ marginBottom: "1.5rem" }}>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), a continuación se exponen los datos identificativos del titular del sitio web:
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>1. Datos Identificativos</h2>
      <ul style={{ marginBottom: "1.5rem", listStyleType: "none", padding: 0 }}>
        <li><strong>Titular:</strong> Javier Muñoz Sánchez</li>
        <li><strong>NIF:</strong> 48402528V</li>
        <li><strong>Domicilio fiscal:</strong> C/Sierra de Guadarrama, 26, 30163, Murcia.</li>
        <li><strong>Email:</strong> hola@musicabalu.com</li>
        <li><strong>Sitio Web:</strong> musicabalu.com</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>2. Condiciones Generales de Uso</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        El acceso y/o uso de este portal web atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro el USUARIO será responsable de aportar información veraz y lícita.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>3. Propiedad Intelectual e Industrial</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Javier Muñoz Sánchez (Musicabalú) por sí o como cesionario, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: audios, canciones, recitados, imágenes, sonido, vídeos, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, etc.).
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Musicabalú.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>4. Exclusión de Garantías y Responsabilidad</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Musicabalú no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>5. Modificaciones</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Musicabalú se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>6. Legislación Aplicable y Jurisdicción</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        La relación entre Musicabalú y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Murcia.
      </p>
    </div>
  );
}
