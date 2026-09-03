import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";
import { google } from "googleapis";

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

        // Si el pago es asíncrono (ej. domiciliación SEPA) y aún se está procesando, 
        // Stripe completará la sesión pero el estado del pago no será 'paid'.
        // En este caso, ignoramos este evento y esperamos al webhook 'payment_intent.succeeded' (o similar)
        // Por ahora, solo procesamos si está pagado.
        if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
          console.log(`Pago no completado aún (status: ${session.payment_status}). Se ignora este evento.`);
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
          await prisma.user.update({
            where: { id: metadata.userId },
            data: { hasActiveSub: true, stripeId: session.customer }
          });
          console.log(`✅ Suscripción Comunidad activada para usuario ${metadata.userId}`);

        } else if (metadata.productType === 'gift' || metadata.productType === 'printful_merch') {
          // 3. Producto de pago único (Regalo o Merchandising)
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
          console.log(`✅ Orden creada para producto ${metadata.productName}`);

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
            console.log("✅ Emails de confirmación enviados");
          } catch (emailError) {
            console.error("❌ Error enviando emails de confirmación:", emailError);
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
