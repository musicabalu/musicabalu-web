import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";
import { google } from "googleapis";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

// Este código no se usa en pruebas locales por ahora, 
// pero está listo para cuando subamos la web a Vercel.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const prisma = new PrismaClient();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error(`❌ Error de firma del Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

    // Manejar el evento (La llamada de teléfono de Stripe)
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const metadata = session.metadata || {};

        console.log("Stripe Checkout Completado:", metadata);

        // Si el pago es asíncrono (ej. domiciliación SEPA), Stripe completará la sesión 
        // pero el estado del pago puede ser 'processing' o 'unpaid'.
        // Para no bloquear la plaza y enviar el email de confirmación inmediatamente,
        // aceptamos estos estados si la sesión de checkout se ha completado.
        const validStatuses = ['paid', 'no_payment_required', 'processing', 'unpaid'];
        if (!validStatuses.includes(session.payment_status)) {
          console.log(`Pago con estado inválido (status: ${session.payment_status}). Se ignora este evento.`);
          break;
        }

        if (metadata.type === 'matricula') {
          // 1. Matrícula de clases presenciales
          const enrollment = await prisma.enrollment.update({
            where: { id: metadata.enrollmentId },
            data: { status: 'active' },
            include: { user: true }
          });
          
          // Asegurarnos de que el usuario tiene el stripeId
          await prisma.user.update({
            where: { id: metadata.userId },
            data: { stripeId: session.customer }
          });

          // Registrar actividad de pago exitoso
          try {
            await prisma.activityLog.create({
              data: {
                userId: metadata.userId,
                action: 'Pago Matrícula (Completado)',
                details: `Inscripción activada para: ${enrollment.childName}`
              }
            });
          } catch (logErr) {
            console.error('Error al registrar ActivityLog del webhook:', logErr);
          }

          console.log(`✅ Matrícula activada para enrollment ${metadata.enrollmentId}`);

          // --- GOOGLE CONTACTS Y EMAIL ADMIN TRAS PAGO EXITOSO ---
          let googleContactsStatus = 'No se intentó';
          let googleContactsError = '';
          
          try {
            if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
              const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET
              );
              oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

              const people = google.people({ version: 'v1', auth: oauth2Client });
              
              const groupInfo = await prisma.group.findUnique({ where: { id: enrollment.groupId } });
              let labelName = 'Musicabalú 26/27';
              if (groupInfo) {
                const startTime = groupInfo.schedule.split('-')[0].trim();
                labelName = `26/27 ${startTime}`;
              }

              const groupsList = await people.contactGroups.list();
              let targetGroup = groupsList.data.contactGroups?.find(g => g.name === labelName);

              if (!targetGroup) {
                const createdGroup = await people.contactGroups.create({
                  requestBody: { contactGroup: { name: labelName } }
                });
                targetGroup = createdGroup.data;
              }

              const contactName = `${enrollment.parentName} (Madre/Padre de ${enrollment.childName})`;

              await people.people.createContact({
                requestBody: {
                  names: [{ givenName: contactName }],
                  emailAddresses: [{ value: enrollment.email, type: 'work' }],
                  phoneNumbers: [{ value: enrollment.phone, type: 'mobile' }],
                  memberships: [
                    {
                      contactGroupMembership: {
                        contactGroupResourceName: targetGroup.resourceName
                      }
                    }
                  ]
                }
              });
              googleContactsStatus = '✅ Creado con éxito';
              console.log(`✅ Contacto añadido a Google Contacts tras pago Stripe: ${contactName}`);
            }
          } catch (googleError) {
            googleContactsStatus = '❌ Error al crear contacto';
            googleContactsError = googleError.message || String(googleError);
            console.error('❌ Error sincronizando con Google Contacts desde Webhook:', googleError);
          }

          try {
            const transport = createTransport(process.env.EMAIL_SERVER);
            const adminEmail = process.env.EMAIL_FROM || 'hola@musicabalu.com';

            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: adminEmail,
              subject: `🟢 Nueva Inscripción (Pago Completado): ${enrollment.childName}`,
              html: `<p>Se ha completado el pago de matrícula para una nueva inscripción.</p>
                     <ul>
                       <li><strong>Peque:</strong> ${enrollment.childName} (Nacimiento: ${enrollment.childBirthDate})</li>
                       <li><strong>Madre/Padre:</strong> ${enrollment.parentName}</li>
                       <li><strong>Teléfono:</strong> ${enrollment.phone}</li>
                       <li><strong>Email:</strong> ${enrollment.email}</li>
                       <li><strong>Método de pago:</strong> ${enrollment.paymentMethod} (${enrollment.paymentFrequency})</li>
                       <li><strong>Estado:</strong> Activa (Stripe pagado)</li>
                     </ul>
                     <hr/>
                     <p><strong>Estado Google Contacts:</strong> ${googleContactsStatus}</p>
                     ${googleContactsError ? `<p style="color:red;"><strong>Error Google:</strong> ${googleContactsError}</p>` : ''}
                     <p><small>Este es un mensaje automático del webhook de Stripe de Musicabalú.</small></p>`
            });
            console.log('✅ Email a admin enviado tras pago Stripe');
          } catch (adminEmailError) {
            console.error('Error enviando correo a administrador desde webhook:', adminEmailError);
          }

          // ENVIAR EMAILS DE RESGUARDO Y BIENVENIDA AL USUARIO TRAS PAGO EXITOSO
          try {
            const transport = createTransport(process.env.EMAIL_SERVER);
            const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://musicabalu.com';

            const lopdFooter = `
              <hr style="margin-top: 40px; border: none; border-top: 1px solid #eee;" />
              <div style="font-size: 10px; color: #999; line-height: 1.4; text-align: justify; font-family: sans-serif;">
                <strong>Protección de Datos</strong><br/>
                MUSICABALÚ le informa que su dirección de correo electrónico, así como el resto de los datos de carácter personal que nos facilite, serán objeto de tratamiento en nuestros ficheros con la finalidad de gestionar las comunicaciones, la relación con los alumnos y familias, y el envío de información profesional o de los servicios de nuestra empresa por vía electrónica.<br/><br/>
                Usted podrá en cualquier momento ejercer sus derechos de acceso, rectificación, supresión y portabilidad de sus datos, de limitación y oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, en los términos establecidos en la LSSI-CE, el Reglamento General de Protección de Datos Europeo 2016/679 (RGPD) y la Ley Orgánica 3/2018 de 5 de diciembre de Protección de Datos (LOPDGDD). El responsable del tratamiento es Javier Muñoz Sánchez, con DNI 48402528V y domicilio en Sierra de Guadarrama, 26, 30163, Murcia. Para ejercer dichos derechos o si no desea recibir más correos de nuestra parte, envíenos un correo electrónico a hola@musicabalu.com manifestando tal deseo.
              </div>
            `;

            // 1. Correo de Resguardo
            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: enrollment.email,
              subject: 'Resguardo de Inscripción - Musicabalú',
              html: `<p>Hola ${enrollment.parentName},</p>
                     <p>Hemos registrado correctamente el pago de matrícula y la inscripción de <strong>${enrollment.childName}</strong>.</p>
                     <p>Has elegido como método de pago para las mensualidades/trimestres: <strong>${enrollment.paymentMethod === 'stripe' ? 'Domiciliación Bancaria' : 'Efectivo'} (${enrollment.paymentFrequency})</strong>.</p>
                     <p>¡Gracias por confiar en nosotros!</p>
                     <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />
                     <h3 style="color: #444;">Tu Copia de las Condiciones Generales Aceptadas</h3>
                     <p style="font-size: 0.9em; color: #666;">A continuación, te adjuntamos una copia de las condiciones que has aceptado al realizar esta inscripción, para que las tengas siempre a mano:</p>
                     
                     <div style="font-size: 0.85em; color: #555; background: #f9f9f9; padding: 15px; border-radius: 8px;">
                       <h4 style="margin-top:0;">CLASES Y FUNCIONAMIENTO</h4>
                       <p>Las clases consistirán en una sesión semanal con una duración aproximada de 40-45 minutos y se ofrecerán en grupos de entre 6 y 12 niños. Los niños deberán asistir a las clases acompañados de su madre, padre o persona con la que mantengan algún vínculo afectivo (un solo adulto). Para garantizar la calidad de la experiencia musical y la concentración de peques, es indispensable la participación activa del adulto acompañante y el respeto a las pautas y normas de funcionamiento del aula que el profesor indicará al inicio del curso.</p>

                       <h4>GRUPOS</h4>
                       <p>Para confirmar un grupo es necesario un mínimo de 6 niños inscritos. En caso de matricularse en un grupo que finalmente no llegue a este número mínimo de alumnos, cabe la posibilidad de que el grupo se cancele. En ese caso se le ofrecerá a los alumnos inscritos en este grupo otro horario disponible; en caso de no poder ubicarse en ningún otro grupo, el alumno podrá solicitar la devolución del importe de la matrícula.</p>

                       <h4>PRECIOS</h4>
                       <p>Matrícula: 25€/alumno<br/>
                       Cuota mensual: Matriculados en EMPI (26/27): 45€ | No matriculados: 50€<br/>
                       Cuota trimestral: Matriculados en EMPI (26/27): 117€ | No matriculados: 132€</p>

                       <h4>MATRÍCULA Y RESERVA DE PLAZA</h4>
                       <p>La matrícula funcionará como reserva de plaza. Si un alumno deja de asistir algún mes perderá el derecho a la plaza. La matrícula no se devuelve en ninguna circunstancia (salvo cancelación del grupo), ni tampoco los pagos mensuales o trimestrales ya realizados.</p>

                       <h4>CUOTAS MENSUALES / TRIMESTRALES</h4>
                       <p>Los pagos deben realizarse durante los primeros 5 días de cada mes o trimestre. Las personas que se incorporan con las clases comenzadas deben pagar mensualmente en el primer trimestre que estén. Las mensualidades son fijas. No se descuentan ni festivos ni clases perdidas por causa del alumno. No hay posibilidad de clase suelta. Si un alumno se incorpora en un mes que ya esté empezado deberá pagar la mitad de la cuota mensual. En el caso de no querer continuar asistiendo a nuestras clases se deberá comunicar con al menos 15 días de antelación.</p>

                       <h4>DESCUENTOS</h4>
                       <p>Los hermanos podrán disfrutar de un 15% de descuento en el pago mensual y un 10% en el trimestral. La matrícula no lleva ningún tipo de descuento.</p>

                       <h4>CALENDARIO</h4>
                       <p>El curso 2026/27 comenzará el 16 de septiembre de 2026. Este mes se abonará sólo la mitad de la cuota. Seguiremos el calendario establecido; cada grupo tendrá 36 clases desde septiembre hasta junio. <a href="${origin}/calendario.jpg" target="_blank" style="color: #00B2E3; text-decoration: underline;">Haz clic aquí para ver el Calendario del Curso</a>.</p>
                       <p>Los trimestres del curso serán: 1) Oct-Nov-Dic, 2) Ene-Feb-Mar, 3) Abr-May-Jun.</p>

                       <h4>RECUPERACIÓN DE CLASES</h4>
                       <p>Las clases perdidas por causa del alumno no se recuperan. Las clases perdidas por causa del profesor sí se recuperan. En este caso se ofrecerá una fecha de recuperación para todo el grupo; quien no pueda asistir no se le ofrecerá otra ni se le devolverá el dinero.</p>

                       <h4>UBICACIÓN</h4>
                       <p>Las clases de Musicabalú son un proyecto independiente de EMPI. Musicabalú se reserva el derecho de modificar la ubicación de las clases dentro de la misma zona o ciudad por motivos de aforo, mejoras en las instalaciones o fuerza mayor.</p>
                     </div>
                     ${lopdFooter}`
            });

            // 2. Correo de Bienvenida (El Gancho)
            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: enrollment.email,
              subject: 'Bienvenida a la familia Musicabalú 🎵 (Tus accesos)',
              html: `<p>Hola ${enrollment.parentName},</p>
                     <p>¡Qué alegría darte la bienvenida a nuestra pequeña familia! Estoy deseando que podamos vivir juntos momentos inolvidables con la música como hilo conductor.</p>
                     <p>Como familia presencial, tienes acceso 100% gratuito a nuestra plataforma digital ("La Comunidad Musicabalú"). En ella no sólo encontrarás todas nuestras canciones, sino que he preparado un rincón exclusivo para ti llamado <strong>"Mi Clase Presencial"</strong>.</p>
                     <p>Es necesario que, antes de venir a la primera clase, entres y leas las indicaciones previas (qué ropa traer, cómo comportarse en el aula, la importancia del silencio...). ¡Tranqui, se lee en 2 minutos y nos ayuda muchísimo a todos!</p>
                     <p><strong>Tus Datos de Acceso:</strong></p>
                     <ul>
                       <li><strong>Link:</strong> www.musicabalu.com/login</li>
                       <li><strong>Email:</strong> ${enrollment.email}</li>
                     </ul>
                     <p><em>⚠️ Nota Importante: Puedes acceder ya a la plataforma, pero todos los contenidos de audio estarán disponibles a partir del <strong>16 de septiembre</strong>. ¡Te avisaré cuando esté todo listo!</em></p>
                     <p>Un abrazo y nos vemos muy pronto,<br>Javi.</p>
                     ${lopdFooter}`
            });
            console.log("✅ Emails de matrícula y bienvenida enviados tras pago Stripe");
          } catch (emailError) {
            console.error("❌ Error enviando emails de matrícula/bienvenida:", emailError);
          }
          
        } else if (metadata.productType === 'subscription') {
          // 2. Suscripción recurrente (Comunidad)
          const targetEmail = session.customer_details?.email || session.customer_email;
          let user = null;
          if (metadata.userId) {
            user = await prisma.user.findUnique({ where: { id: metadata.userId } });
          }
          if (!user && targetEmail) {
            user = await prisma.user.findUnique({ where: { email: targetEmail } });
          }

          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: { hasActiveSub: true, stripeId: session.customer }
            });
            console.log(`✅ Suscripción Comunidad activada para usuario ${user.email} (${user.id})`);
          } else if (targetEmail) {
            // Edge case: crear usuario si no existía previamente
            user = await prisma.user.create({
              data: {
                email: targetEmail,
                name: session.customer_details?.name || 'Suscriptor Comunidad',
                hasActiveSub: true,
                stripeId: session.customer,
                role: 'user'
              }
            });
            console.log(`✅ Usuario creado y suscrito a Comunidad: ${user.email}`);
          }

          // Registrar la orden en el panel de ventas
          try {
            await prisma.order.create({
              data: {
                userId: user ? user.id : (metadata.userId || null),
                stripeSessionId: session.id,
                productId: metadata.productId || 'subscription',
                productName: metadata.productName || 'Suscripción Comunidad Familiar',
                productType: 'subscription',
                amountTotal: session.amount_total || 0,
                currency: session.currency || 'eur',
                status: 'completed'
              }
            });
            console.log(`✅ Orden de suscripción registrada en panel de ventas`);
          } catch (orderErr) {
            console.error("⚠️ Error registrando order de suscripción:", orderErr);
          }

          // Enviar emails de confirmación
          try {
            const { getNewsletterFooterHtml } = await import("@/lib/emailUnsubscribe");
            const transport = createTransport(process.env.EMAIL_SERVER);
            if (targetEmail) {
              await transport.sendMail({
                from: process.env.EMAIL_FROM,
                to: targetEmail,
                subject: "¡Bienvenido/a a la Comunidad Familiar Musicabalú! 🎵",
                html: `<p>¡Hola!</p>
                       <p>Tu suscripción a la <strong>Comunidad Musicabalú</strong> se ha activado con éxito.</p>
                       <p>Ya tienes acceso completo e ilimitado a todas nuestras canciones, recitados pedagógicos y píldoras formativas en vídeo.</p>
                       <p>Puedes acceder en cualquier momento desde tu móvil, tablet u ordenador aquí:<br>
                       <a href="https://musicabalu.com/comunidad/canciones" style="color: #00B2E3; font-weight: bold;">Acceder a la Biblioteca Musicabalú</a></p>
                       <p>Cada viernes añadimos nuevos contenidos a la plataforma y te avisaremos por correo para que podáis disfrutarlos en casa.</p>
                       <p>Si tienes cualquier duda pedagógica o técnica, solo tienes que responder a este correo o escribir a <a href="mailto:hola@musicabalu.com">hola@musicabalu.com</a>.</p>
                       <p>Un abrazo y bienvenidos,<br>Javi.</p>
                       ${getNewsletterFooterHtml(targetEmail, true)}`
              });
            }

            // Notificación al administrador
            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: "hola@musicabalu.com",
              subject: "🎉 Nueva Suscripción a la Comunidad Familiar",
              text: `¡Nueva suscripción!\n\nPlan: ${metadata.productName || "Suscripción"}\nImporte: ${((session.amount_total || 0) / 100).toFixed(2)}€\nEmail: ${targetEmail}\nStripe ID: ${session.id}`
            });
            console.log("✅ Emails de confirmación de suscripción enviados");
          } catch (emailError) {
            console.error("⚠️ Error enviando emails de suscripción:", emailError);
          }

        } else if (metadata.productType === 'gift' || metadata.productId === 'regala_musicabalu') {
          // 3A. Tarjeta Regalo Suscripción Anual (Regala Musicabalú)
          const order = await prisma.order.create({
            data: {
              userId: metadata.userId,
              stripeSessionId: session.id,
              productId: metadata.productId || 'regala_musicabalu',
              productName: metadata.productName || 'Regala Musicabalú · Tarjeta Regalo Anual',
              productType: 'gift',
              amountTotal: session.amount_total,
              currency: session.currency,
              status: 'completed'
            }
          });
          console.log(`✅ Orden creada para regalo ${order.id}`);

          // Generar código único de activación (ej. BALU-8A3F1C)
          const randomCode = `BALU-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
          const buyerEmail = session.customer_details?.email || session.customer_email;

          await prisma.giftCode.create({
            data: {
              code: randomCode,
              orderId: order.id,
              buyerEmail: buyerEmail,
              status: 'pending',
              durationMonths: 12
            }
          });
          console.log(`🎁 Código de regalo creado: ${randomCode} para ${buyerEmail}`);

          // Enviar correo al comprador con el vale y su código
          try {
            if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM && buyerEmail) {
              const transport = createTransport(process.env.EMAIL_SERVER);
              const activateUrl = `https://musicabalu.com/activar?code=${randomCode}`;

              // Extraer nombres personalizados si el comprador los rellenó en Stripe
              const paraField = (session.custom_fields || []).find(f => f.key === "para_quien");
              const deField = (session.custom_fields || []).find(f => f.key === "de_parte_de");
              const para = paraField?.text?.value || "Familia";
              const de = deField?.text?.value || "Con todo el cariño ❤️";

              // Intentar generar el vale personalizado con su código y nombres reales
              let pdfPath = path.join(process.cwd(), "public/vale_regalo_musicabalu.pdf");
              let imagePath = path.join(process.cwd(), "public/vale_regalo_musicabalu.png");

              try {
                const scriptPath = path.join(process.cwd(), "../scripts/create_gift_voucher_image.py");
                const customPrefix = `/tmp/vale_${randomCode}`;
                if (fs.existsSync(scriptPath)) {
                  execSync(`python3 "${scriptPath}" "${para.replace(/"/g, '\\"')}" "${de.replace(/"/g, '\\"')}" "${randomCode}" "${customPrefix}"`, { timeout: 10000 });
                  if (fs.existsSync(`${customPrefix}.pdf`) && fs.existsSync(`${customPrefix}.png`)) {
                    pdfPath = `${customPrefix}.pdf`;
                    imagePath = `${customPrefix}.png`;
                  }
                }
              } catch (genErr) {
                console.log("Aviso: usando plantilla base de vale regalo:", genErr?.message);
              }

              const attachments = [];
              if (fs.existsSync(pdfPath)) {
                attachments.push({
                  filename: `Vale_Regalo_Musicabalu_${randomCode}.pdf`,
                  path: pdfPath
                });
              }
              if (fs.existsSync(imagePath)) {
                attachments.push({
                  filename: `Vale_Regalo_Musicabalu_${randomCode}.png`,
                  path: imagePath
                });
              }

              await transport.sendMail({
                from: process.env.EMAIL_FROM,
                to: buyerEmail,
                subject: "🎁 ¡Aquí tienes tu Vale Regalo de Musicabalú!",
                attachments: attachments,
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
                    <div style="text-align: center; margin-bottom: 24px;">
                      <span style="font-size: 2.5rem;">🎁</span>
                      <h1 style="color: #db2777; margin: 8px 0; font-size: 1.8rem;">¡Muchísimas gracias por regalar música!</h1>
                      <p style="color: #64748b; font-size: 1rem; margin: 0;">Tu compra de <strong>1 Año Completo de Comunidad Musicabalú</strong> se ha completado con éxito.</p>
                    </div>

                    <div style="background: #fdf2f8; border: 2px dashed #f472b6; border-radius: 16px; padding: 24px; text-align: center; margin: 24px 0;">
                      <span style="font-size: 0.85rem; font-weight: bold; color: #9d174d; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px;">
                        Código Único de Activación
                      </span>
                      <div style="font-family: monospace; font-size: 1.8rem; font-weight: bold; color: #db2777; letter-spacing: 2px; margin-bottom: 12px;">
                        ${randomCode}
                      </div>
                      <p style="font-size: 0.9rem; color: #475569; margin: 0;">
                        Válido para 1 año de acceso familiar a partir del día en que se active en la web.
                      </p>
                    </div>

                    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 24px;">
                      <h3 style="color: #0f172a; margin-top: 0; font-size: 1.05rem;">🔒 Efecto sorpresa 100% garantizado:</h3>
                      <p style="margin: 0; font-size: 0.95rem; color: #475569;">
                        La persona a la que le regales <strong>NO recibirá ningún correo ni notificación</strong> de nuestra parte. Todo queda en tus manos para darle la sorpresa cuando tú decidas.
                      </p>
                    </div>

                    <div style="margin-bottom: 24px;">
                      <h3 style="color: #0f172a; font-size: 1.05rem;">¿Cómo puedes entregarle el regalo?</h3>
                      <p style="color: #334155; font-size: 0.95rem; margin-bottom: 12px;">
                        Te hemos adjuntado a este correo tu vale regalo en dos formatos listos para usar:
                      </p>
                      <ul style="color: #334155; font-size: 0.95rem; padding-left: 20px; line-height: 1.7; margin-bottom: 16px;">
                        <li><strong>📄 Archivo PDF adjunto:</strong> Ideal para imprimir en papel o cartulina para entregarlo en mano.</li>
                        <li><strong>🖼️ Archivo Imagen PNG adjunto:</strong> Listo para guardar en las fotos de tu móvil y reenviarlo directamente por WhatsApp.</li>
                      </ul>

                      <p style="color: #334155; font-size: 0.95rem; margin-bottom: 8px;">
                        Si prefieres avisarle por WhatsApp, puedes copiar este mensaje:
                      </p>
                      <blockquote style="background: #f8fafc; border-left: 3px solid #00B2E3; margin: 10px 0; padding: 12px 16px; font-style: italic; font-size: 0.9rem; color: #334155; border-radius: 4px;">
                        "¡Sorpresa! 🎉 Os hemos regalado 1 año completo de música viva en familia con Musicabalú 🎵. Podéis activar vuestra suscripción cuando queráis entrando en <a href="${activateUrl}" style="color: #00B2E3; font-weight: bold;">musicabalu.com/activar</a> con el código: <strong>${randomCode}</strong>"
                      </blockquote>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${activateUrl}" 
                         style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 30px; display: inline-block; box-shadow: 0 4px 15px rgba(219, 39, 119, 0.3);">
                        Ver Página de Activación 🎁
                      </a>
                    </div>

                    <p style="font-size: 0.85rem; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px; text-align: center;">
                      Musicabalú · Licencia individual para uso familiar · Sin renovaciones automáticas<br>
                      ¿Tienes alguna consulta? Escríbenos a <a href="mailto:hola@musicabalu.com" style="color: #00B2E3;">hola@musicabalu.com</a>
                    </p>
                  </div>
                `
              });

              // Notificación interna al administrador
              await transport.sendMail({
                from: process.env.EMAIL_FROM,
                to: "hola@musicabalu.com",
                subject: `🎁 Venta Vale Regalo: ${randomCode} (${buyerEmail})`,
                text: `¡Nueva compra de tarjeta regalo!\n\nProducto: ${metadata.productName || "Regala Musicabalú"}\nImporte: ${(session.amount_total / 100).toFixed(2)}€\nCódigo generado: ${randomCode}\nComprador: ${buyerEmail}\nStripe ID: ${session.id}\n`
              });
              console.log("✅ Emails de vale regalo enviados con éxito");
            }
          } catch (emailErr) {
            console.error("❌ Error enviando email de vale regalo:", emailErr);
          }

        } else if (metadata.productType === 'printful_merch') {
          // 3B. Merchandising Print-on-demand
          await prisma.order.create({
            data: {
               userId: metadata.userId,
               stripeSessionId: session.id,
               productId: metadata.productId,
               productName: metadata.productName || "Producto Tienda",
               productType: metadata.productType,
               amountTotal: session.amount_total,
               currency: session.currency,
               status: 'completed'
            }
          });
          console.log(`✅ Orden creada para merch ${metadata.productName}`);

          try {
            const transport = createTransport(process.env.EMAIL_SERVER);
            // Email al cliente
            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: session.customer_details?.email,
              subject: "Confirmación de tu compra en Musicabalú",
              html: `<p>¡Hola!</p><p>Hemos recibido correctamente tu pedido de: <strong>${metadata.productName || "nuestra tienda"}</strong>.</p><p>¡Muchas gracias por tu compra! Muy pronto nos pondremos en contacto contigo o te enviaremos más detalles sobre el envío.</p><p>Un abrazo,<br>El equipo de Musicabalú</p>`
            });
            // Email al administrador
            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: "hola@musicabalu.com",
              subject: "💰 Nueva Venta en la Tienda",
              text: `Se ha vendido: ${metadata.productName || "Producto"} por ${(session.amount_total / 100).toFixed(2)}€\n\nComprador: ${session.customer_details?.email}\nStripe ID: ${session.id}`
            });
            console.log("✅ Emails de confirmación de merch enviados");
          } catch (emailError) {
            console.error("❌ Error enviando emails de confirmación:", emailError);
          }

        } else if (metadata.type === 'workshop' || metadata.productType === 'workshop') {
          // 4. Inscripción en Taller Familiar Pop-up
          const targetEmail = session.customer_details?.email || session.customer_email;
          const customerName = session.customer_details?.name || "Familia";
          const customerPhone = session.customer_details?.phone || "No indicado";
          const childField = (session.custom_fields || []).find(f => f.key === "child_name");
          const birthField = (session.custom_fields || []).find(f => f.key === "child_birth_date");
          const childName = childField?.text?.value || "Peque";
          const childBirthDate = birthField?.text?.value || "";
          const childInfo = childBirthDate ? `${childName} (${childBirthDate})` : childName;

          let user = null;
          if (targetEmail) {
            user = await prisma.user.findUnique({ where: { email: targetEmail } });
            if (!user) {
              user = await prisma.user.create({
                data: {
                  email: targetEmail,
                  name: customerName,
                  stripeId: session.customer || undefined,
                  role: "familia"
                }
              });
            }
          }

          let soldCount = 1;
          try {
            if (user) {
              await prisma.order.create({
                data: {
                  userId: user.id,
                  stripeSessionId: session.id,
                  productId: metadata.workshopId || "workshop",
                  productName: metadata.productName || "Taller Música en Familia",
                  productType: "workshop",
                  amountTotal: session.amount_total || 2000,
                  currency: session.currency || "eur",
                  status: "completed",
                  shippingData: JSON.stringify({
                    adultName: customerName,
                    email: targetEmail,
                    phone: customerPhone,
                    childName,
                    childBirthDate,
                    childInfo,
                    notes: "",
                    attended: null
                  })
                }
              });
            }

            if (metadata.workshopId) {
              soldCount = await prisma.order.count({
                where: {
                  productType: "workshop",
                  productId: metadata.workshopId,
                  status: "completed"
                }
              });

              if (soldCount >= 10) {
                await prisma.workshop.update({
                  where: { id: metadata.workshopId },
                  data: { isSoldOut: true }
                });
                console.log(`🔒 Taller ${metadata.workshopId} marcado automáticamente como COMPLETO (10/10 plazas)`);
              }
            }
          } catch (orderErr) {
            console.error("⚠️ Error registrando order de taller:", orderErr);
          }

          try {
            const { getNewsletterFooterHtml } = await import("@/lib/emailUnsubscribe");
            const transport = createTransport(process.env.EMAIL_SERVER);
            if (targetEmail) {
              await transport.sendMail({
                from: process.env.EMAIL_FROM,
                to: targetEmail,
                subject: "¡Plaza confirmada para el Taller de Música en Familia! 🎵💛",
                html: `<p>Hola ${customerName},</p>
                       <p>¡Qué alegría! Hemos recibido correctamente tu inscripción para el <strong>${metadata.productName || "Taller de Música en Familia"}</strong>.</p>
                       <p>Como te comentábamos en la inscripción, tienes incluido el acceso gratuito a la versión abierta de nuestra plataforma web, donde ya puedes escuchar una selección de nuestras canciones de estudio, recitados y píldoras formativas desde casa:</p>
                       <ul>
                         <li><strong>Enlace de acceso:</strong> <a href="https://musicabalu.com/login" style="color: #00B2E3; font-weight: bold;">www.musicabalu.com/login</a></li>
                         <li><strong>Tu email de acceso:</strong> ${targetEmail}</li>
                       </ul>
                       <p>Recuerda venir con ropa cómoda (entraremos sin calzado) y llegar unos 5-10 minutos antes para acomodarnos con calma.</p>
                       <p>¡Estoy deseando compartir este ratito de música con vosotros!</p>
                       <p>Un abrazo,<br>Javi.</p>
                       ${getNewsletterFooterHtml(targetEmail, true)}`
              });
            }

            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: "hola@musicabalu.com",
              subject: `🧸 Nueva Inscripción a Taller (${soldCount}/10): ${customerName}`,
              text: `¡Nueva plaza reservada en Taller!\n\nOcupación actual: ${soldCount} / 10 plazas${soldCount >= 10 ? " (¡TALLER COMPLETO! Cerrado automáticamente)" : ""}\nTaller: ${metadata.productName}\nAdulto: ${customerName}\nPeque: ${childInfo}\nTeléfono: ${customerPhone}\nEmail: ${targetEmail}\nImporte: ${((session.amount_total || 2000) / 100).toFixed(2)} €`
            });
          } catch (emailErr) {
            console.error("⚠️ Error enviando emails de taller:", emailErr);
          }

        } else {
          // Fallback legacy por si acaso
          const userEmail = session.customer_details?.email;
          if (userEmail) {
            await prisma.user.update({
              where: { email: userEmail },
              data: { hasActiveSub: true, stripeId: session.customer },
            });
            console.log(`✅ Acceso concedido (fallback) a: ${userEmail}`);
          }
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        // Si cancela o deja de pagar, le quitamos el acceso
        await prisma.user.updateMany({
          where: { stripeId: subscription.customer },
          data: { hasActiveSub: false },
        });
        console.log(`❌ Acceso revocado al cliente: ${subscription.customer}`);
        break;
      }

      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Error procesando el evento de Stripe:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
