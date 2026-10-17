import crypto from "crypto";

const SECRET = process.env.NEXTAUTH_SECRET || process.env.STRIPE_WEBHOOK_SECRET || "musicabalu-unsubscribe-secret-2026";

export function generateUnsubscribeToken(email) {
  const normalized = (email || "").trim().toLowerCase();
  return crypto.createHmac("sha256", SECRET).update(normalized).digest("hex").slice(0, 32);
}

export function verifyUnsubscribeToken(email, token) {
  if (!email || !token) return false;
  const expected = generateUnsubscribeToken(email);
  return expected === token;
}

export function getUnsubscribeUrl(email) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://musicabalu.com";
  const normalized = (email || "").trim().toLowerCase();
  const token = generateUnsubscribeToken(normalized);
  return `${origin}/baja-emails?email=${encodeURIComponent(normalized)}&token=${token}`;
}

export const LOPD_TEXT_HTML = `
  <div style="font-size: 10px; color: #999; line-height: 1.4; text-align: justify; font-family: sans-serif;">
    <strong>Protección de Datos</strong><br/>
    MUSICABALÚ le informa que su dirección de correo electrónico, así como el resto de los datos de carácter personal que nos facilite, serán objeto de tratamiento en nuestros ficheros con la finalidad de gestionar las comunicaciones, la relación con los alumnos y familias, y el envío de información profesional o de los servicios de nuestra empresa por vía electrónica.<br/><br/>
    Usted podrá en cualquier momento ejercer sus derechos de acceso, rectificación, supresión y portabilidad de sus datos, de limitación y oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, en los términos establecidos en la LSSI-CE, el Reglamento General de Protección de Datos Europeo 2016/679 (RGPD) y la Ley Orgánica 3/2018 de 5 de diciembre de Protección de Datos (LOPDGDD). El responsable del tratamiento es Javier Muñoz Sánchez, con DNI 48402528V y domicilio en Sierra de Guadarrama, 26, 30163, Murcia. Para ejercer dichos derechos o si no desea recibir más correos de nuestra parte, envíenos un correo electrónico a hola@musicabalu.com manifestando tal deseo.
  </div>
`;

export function getNewsletterFooterHtml(email, includeUnsubscribe = true) {
  const unsubUrl = getUnsubscribeUrl(email);
  return `
    <hr style="margin-top: 40px; border: none; border-top: 1px solid #eee;" />
    ${
      includeUnsubscribe
        ? `<p style="font-size: 12px; color: #64748b; text-align: center; margin: 16px 0; font-family: sans-serif;">
             ¿Prefieres consultar las novedades directamente en la web y no recibir estos avisos semanales por correo?<br/>
             <a href="${unsubUrl}" style="color: #F4436C; text-decoration: underline; font-weight: bold;">Pulsa aquí para darte de baja de estos correos</a> (mantendrás intacto tu acceso a la plataforma y a tus clases).
           </p>`
        : ""
    }
    ${LOPD_TEXT_HTML}
  `;
}
