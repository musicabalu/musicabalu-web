import { getNewsletterFooterHtml } from "./emailUnsubscribe.js";

export function getFunnelEmail(step, { name, email }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://musicabalu.com";
  const cleanEmail = (email || "").trim().toLowerCase();
  const rawName = (name || "").trim();
  const firstName = rawName ? rawName.split(" ")[0] : "familia";

  const playerUrl = `${siteUrl}/regalo/escuchar?email=${encodeURIComponent(cleanEmail)}&name=${encodeURIComponent(firstName)}`;
  const storeUrl = `${siteUrl}/tienda`;
  const workshopsUrl = `${siteUrl}/talleres`;

  const containerStart = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px 20px; color: #2d3748; line-height: 1.65; font-size: 16px;">
      <p style="font-size: 18px; font-weight: 700; color: #1a202c; margin-bottom: 20px;">
        ¡Hola, ${firstName}!
      </p>
  `;

  const containerEnd = `
      <p style="margin-top: 28px; margin-bottom: 4px;">
        Un abrazo grande,
      </p>
      <p style="font-weight: 700; color: #1a202c; margin-top: 0;">
        Javi Balú<br/>
        <span style="font-weight: 400; color: #718096; font-size: 14px;">Educador musical y creador de Musicabalú</span>
      </p>
      ${getNewsletterFooterHtml(cleanEmail, true)}
    </div>
  `;

  switch (step) {
    case 2:
      return {
        step: 2,
        actionLog: "Funnel Email 2",
        subject: "Ponerle Mozart de fondo a tu bebé no sirve de mucho 🎧",
        html: `
          ${containerStart}
          <p>
            Seguro que has escuchado alguna vez el famoso <em>"Efecto Mozart"</em>. Esa idea tan extendida de que ponerle música clásica de fondo a un bebé mientras juega con otras cosas lo hace más inteligente.
          </p>

          <p>
            Sin embargo, la ciencia moderna (y la Teoría del Aprendizaje Musical de Edwin Gordon) nos demuestra que eso <strong>no sirve de mucho</strong>.
          </p>

          <p>
            El cerebro de un bebé durante los 3 primeros años de vida es una esponja increíble, sí. Pero aprende por <strong>interacción humana</strong>, no por ósmosis pasiva. Para que la música realmente moldee su cerebro y desarrolle lo que llamamos <strong>"Atención Sostenida"</strong>, necesita <strong>Escucha Activa</strong>.
          </p>

          <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 14px 18px; margin: 24px 0; border-radius: 8px;">
            <strong style="color: #15803d; font-size: 16px;">¿Y cómo se consigue la escucha activa?</strong><br/>
            <span style="color: #374151;">
              Con tu implicación. Con el silencio entre las notas. Con miradas cómplices, respiración compartida y contrastes rítmicos que le hagan abrir los ojos y conectar contigo.
            </span>
          </div>

          <p>
            La buena noticia es que es mucho más fácil (y divertido) de lo que parece. No necesitas saber tocar un instrumento ni entender de partituras.
          </p>

          <p>
            Solo necesitas música compuesta específicamente para su etapa y un poquito de guía. De eso te hablaré en un par de días.
          </p>

          <p>
            Mientras tanto, cuéntame: ¿has podido probar ya las canciones del regalo? Si aún no lo has hecho, puedes escucharlas directamente en un solo clic aquí:
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="${playerUrl}" style="background-color: #00B2E3; color: white; padding: 13px 26px; border-radius: 999px; text-decoration: none; font-weight: 800; font-size: 15px; display: inline-block; box-shadow: 0 4px 12px rgba(0, 178, 227, 0.3);">
              🎵 Escuchar mis 4 audios de regalo ahora →
            </a>
          </div>

          <p>
            ¡Que tengáis un gran día y que disfrutéis mucho de la música!
          </p>
          ${containerEnd}
        `,
      };

    case 3:
      return {
        step: 3,
        actionLog: "Funnel Email 3",
        subject: "«Pero Javi... es que yo canto fatal» 🙈",
        html: `
          ${containerStart}
          <p>
            Es la frase que más veces he escuchado en toda mi trayectoria como educador musical:
          </p>

          <blockquote style="margin: 20px 0; padding: 12px 18px; background-color: #f8fafc; border-left: 4px solid #cbd5e1; font-style: italic; color: #475569;">
            "Javi, a mí me encantaría hacer música con mi peque en casa, pero es que desafino y no tengo nada de ritmo".
          </blockquote>

          <p>
            Hoy quiero quitarte ese peso de encima. Grábate esto:
          </p>

          <p style="font-size: 18px; font-weight: 800; color: #008eb5; text-align: center; margin: 24px 0;">
            El mejor modelo musical para tu peque no soy yo. Eres tú.
          </p>

          <p>
            Tu bebé no es el jurado de un concurso de televisión. No está evaluando si das la nota perfecta. Lo que tu hijo busca instintivamente es <strong>el vínculo contigo</strong>: busca tu voz, tu cercanía y el movimiento de tu cuerpo.
          </p>

          <p>
            Cuando le cantas una melodía pura, mirándole a los ojos y disfrutando del momento, le estás regalando un canal de comunicación emocional único. No hace falta que seas perfecto: <strong>hace falta que estés presente</strong>.
          </p>

          <p>
            Por eso creé Musicabalú: para darte a ti las herramientas (canciones en modos variados, recitados y pautas súper sencillas) para que TÚ seas su guía musical sin exigencias ni agobios.
          </p>

          <p>
            En un par de días te contaré cómo puedes tener todo este repertorio siempre a mano en tu día a día.
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${playerUrl}" style="color: #00B2E3; font-weight: 700; text-decoration: underline;">
              👉 Pulsa aquí para volver a escuchar tus canciones de regalo
            </a>
          </div>
          ${containerEnd}
        `,
      };

    case 4:
      return {
        step: 4,
        actionLog: "Funnel Email 4",
        subject: "El lenguaje secreto que tú y tu bebé podéis compartir 🤫",
        html: `
          ${containerStart}
          <p>
            Piensa por un momento en cómo aprendemos a hablar nuestra lengua materna:
          </p>

          <p>
            Primero escuchamos durante meses... luego balbuceamos... decimos nuestras primeras palabras sueltas... y poco a poco empezamos a construir frases para expresar lo que sentimos. Mucho después aprendemos las letras y la gramática. Nadie intentaría enseñarle el abecedario a un bebé de 9 meses, ¿verdad?
          </p>

          <p>
            Con la música ocurre exactamente igual.
          </p>

          <p>
            Sin embargo, la educación tradicional casi siempre empieza por el final: partituras, teoría pesada y exigirles que se queden quietos. El resultado habitual es frustración y desconexión.
          </p>

          <div style="background-color: #fef2f2; border-left: 4px solid #f87171; padding: 14px 18px; margin: 24px 0; border-radius: 8px;">
            <strong style="color: #991b1b; font-size: 16px;">El enfoque de Musicabalú es 100% natural y comunicativo:</strong><br/>
            <span style="color: #374151;">
              A través de recitados rítmicos, canciones en diferentes modos musicales (no todo es el típico "do-re-mi" infantil) y movimiento libre, los peques absorben la música igual que aprendieron a decir "mamá" o "agua": jugando.
            </span>
          </div>

          <p>
            ¿Te imaginas tener una biblioteca completa con canciones originales listas para transformar el momento del baño, los viajes en coche o las tardes de juego en casa?
          </p>

          <p>
            Mañana te abro las puertas a todo ello. Muy atento a tu bandeja de entrada.
          </p>
          ${containerEnd}
        `,
      };

    case 5:
      return {
        step: 5,
        actionLog: "Funnel Email 5",
        subject: "Las puertas de la Comunidad Musicabalú están abiertas 🚪✨",
        html: `
          ${containerStart}
          <p>
            Durante estos días hemos hablado de por qué la música infantil no tiene por qué ser ruidosa ni repetitiva, y de cómo el vínculo musical estimula el cerebro de tu peque como ninguna otra actividad.
          </p>

          <p>
            Hoy quiero invitarte a dar el paso: te presento la <strong>Comunidad Musicabalú</strong>.
          </p>

          <p>
            Es nuestra plataforma web privada donde tienes acceso ilimitado a todo el método:
          </p>

          <ul style="padding-left: 20px; line-height: 1.8; color: #374151;">
            <li>🎵 <strong>Repertorio completo y en constante crecimiento:</strong> Canciones y recitados clasificados por momentos (calma, juego, rutinas).</li>
            <li>👨‍🏫 <strong>Vídeos explicativos:</strong> Te enseño en píldoras cortas cómo utilizar cada canción en casa sin complicaciones.</li>
            <li>🧠 <strong>Metodología Gordon (MLT):</strong> Variedad de modos y métricas que potencian su atención y desarrollo auditivo.</li>
            <li>📱 <strong>Desde cualquier dispositivo:</strong> Sin anuncios, sin pantallas para el peque y con reproductor integrado.</li>
          </ul>

          <div style="background-color: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 20px; text-align: center; margin: 28px 0;">
            <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-bottom: 6px;">
              Acceso Inmediato
            </div>
            <div style="font-size: 26px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">
              Solo 3,90 € / mes
            </div>
            <p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">
              O 39 € / año (con 2 meses de regalo). Sin permanencia: cancelas con un solo clic cuando quieras.
            </p>
            <a href="${storeUrl}" style="background-color: #F4436C; color: white; padding: 14px 30px; border-radius: 999px; text-decoration: none; font-weight: 800; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px rgba(244, 67, 108, 0.35);">
              ✨ Unirme a la Comunidad Musicabalú ahora →
            </a>
          </div>

          <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 16px 20px; margin: 26px 0; font-size: 14.5px;">
            <strong>📍 P.D. para familias en Murcia:</strong><br/>
            Si vivís en Murcia capital o alrededores, también tenéis la opción de venir a vivir esta experiencia en directo a nuestros <strong>Talleres de Música en Familia</strong> (máximo 10 familias por grupo). Podéis ver las próximas fechas y reservar plaza aquí: <a href="${workshopsUrl}" style="color: #00B2E3; font-weight: bold;">musicabalu.com/talleres</a>.
          </div>

          <p>
            ¡Deseando veros dentro y acompañaros en esta etapa tan mágica!
          </p>
          ${containerEnd}
        `,
      };

    default:
      return null;
  }
}
