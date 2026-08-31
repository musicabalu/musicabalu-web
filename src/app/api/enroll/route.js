import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16' // Ajusta según la versión instalada en tu proyecto
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { childName, childBirthDate, parentName, phone, email, groupId, paymentMethod, paymentFrequency, acceptedTerms, acceptedComms, skipStripeMatricula } = body;

    if (!childName || !parentName || !phone || !email || !groupId || !paymentMethod || !acceptedTerms) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o no has aceptado las condiciones.' }, { status: 400 });
    }

    // 1. Crear o buscar usuario en Prisma
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: parentName,
          role: 'familia'
        }
      });
    }

    // 2. Comprobar si existe en Stripe o crearlo
    let stripeCustomerId = user.stripeId;
    if ((!stripeCustomerId || stripeCustomerId === "") && (paymentMethod === 'stripe' || !skipStripeMatricula)) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        phone: phone,
      });
      stripeCustomerId = customer.id;
      
      // Guardar el stripeId en la base de datos
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeId: stripeCustomerId }
      });
    }

    // 3. Crear la inscripción en estado 'pending'
    const enrollment = await prisma.enrollment.create({
      data: {
        childName,
        childBirthDate,
        parentName,
        phone,
        email,
        paymentMethod,
        paymentFrequency,
        groupId,
        userId: user.id,
        acceptedTerms: Boolean(acceptedTerms),
        acceptedComms: Boolean(acceptedComms),
        status: skipStripeMatricula ? 'active' : 'pending' // Si es veterano, se activa directo
      }
    });

    // --- FASE 6: ENVÍO DE EMAILS ---
    // Usamos Nodemailer para mandar el resguardo y la bienvenida
    try {
      if ((process.env.SMTP_USER && process.env.SMTP_PASS) || (process.env.GMAIL_USER && process.env.GMAIL_PASS)) {
        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://musicabalu.com';
        
        let transporter;
        if (process.env.SMTP_USER) {
          transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'ssl0.ovh.net',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          });
        } else {
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS
            }
          });
        }
        
        const senderEmail = process.env.SMTP_USER || process.env.GMAIL_USER;

        // 1. Correo de Resguardo
        await transporter.sendMail({
          from: `"Musicabalú" <${senderEmail}>`,
          to: email,
          subject: 'Resguardo de Inscripción - Musicabalú',
          html: `<p>Hola ${parentName},</p>
                 <p>Hemos registrado la inscripción de <strong>${childName}</strong>.</p>
                 <p>Has elegido como método de pago para las mensualidades/trimestres: <strong>${paymentMethod === 'stripe' ? 'Domiciliación Bancaria' : 'Efectivo'} (${paymentFrequency})</strong>.</p>
                 <p>¡Gracias por confiar en nosotros!</p>
                 <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />
                 <h3 style="color: #444;">Tu Copia de las Condiciones Generales Aceptadas</h3>
                 <p style="font-size: 0.9em; color: #666;">A continuación, te adjuntamos una copia de las condiciones que has aceptado al realizar esta inscripción, para que las tengas siempre a mano:</p>
                 
                 <div style="font-size: 0.85em; color: #555; background: #f9f9f9; padding: 15px; border-radius: 8px;">
                   <h4 style="margin-top:0;">CLASES Y FUNCIONAMIENTO</h4>
                   <p>Las clases consistirán en una sesión semanal con una duración aproximada de 40-45 minutos y se ofrecerán en grupos de entre 6 y 12 niños. Los niños deberán asistir a las clases acompañados de su madre, padre o persona con la que mantengan algún vínculo afectivo (un solo adulto). Para garantizar la calidad de la experiencia musical y la concentración de los peques, es indispensable la participación activa del adulto acompañante y el respeto a las pautas y normas de funcionamiento del aula que el profesor indicará al inicio del curso.</p>

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
                 </div>`
        });

        // 2. Correo de Bienvenida (El Gancho)
        await transporter.sendMail({
          from: `"Musicabalú" <${senderEmail}>`,
          to: email,
          subject: 'Bienvenida a la familia Musicabalú 🎵 (Tus accesos)',
          html: `<p>Hola ${parentName},</p>
                 <p>¡Qué alegría darte la bienvenida a nuestra pequeña familia! Estoy deseando que podamos vivir juntos momentos inolvidables con la música como hilo conductor.</p>
                 <p>Como familia presencial, tienes acceso 100% gratuito a nuestra plataforma digital ("La Comunidad Musicabalú"). En ella no sólo encontrarás todas nuestras canciones, sino que he preparado un rincón exclusivo para ti llamado <strong>"Mi Clase Presencial"</strong>.</p>
                 <p>Es necesario que, antes de venir a la primera clase, entres y leas las indicaciones previas (qué ropa traer, cómo comportarse en el aula, la importancia del silencio...). ¡Tranqui, se lee en 2 minutos y nos ayuda muchísimo a todos!</p>
                 <p><strong>Tus Datos de Acceso:</strong></p>
                 <ul>
                   <li><strong>Link:</strong> www.musicabalu.com/login</li>
                   <li><strong>Email:</strong> ${email}</li>
                 </ul>
                 <p><em>⚠️ Nota Importante: Puedes acceder ya a la plataforma, pero todos los contenidos de audio estarán disponibles a partir del <strong>16 de septiembre</strong>. ¡Te avisaré cuando esté todo listo!</em></p>
                 <p>Un abrazo y nos vemos muy pronto,<br>Javi.</p>`
        });
      } else {
        console.warn('Faltan credenciales SMTP_USER o GMAIL_USER. Emails no enviados.');
      }
    } catch (emailError) {
      console.error('Error enviando correos:', emailError);
      // No bloqueamos la inscripción si falla el email
    }

    // --- FASE 4: GOOGLE CONTACTS API (CON ETIQUETAS) ---
    try {
      if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );
        oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

        const people = google.people({ version: 'v1', auth: oauth2Client });
        
        // 1. Obtener información del grupo desde la base de datos
        const groupInfo = await prisma.group.findUnique({ where: { id: groupId } });
        let labelName = 'Musicabalú 26/27';
        if (groupInfo) {
          // Extraemos solo el día y la hora de inicio (ej. 'Martes 16:30' de 'Martes 16:30-17:15')
          const startTime = groupInfo.schedule.split('-')[0].trim();
          labelName = `26/27 ${startTime}`;
        }

        // 2. Buscar si la etiqueta ya existe en Google Contacts
        const groupsList = await people.contactGroups.list();
        let targetGroup = groupsList.data.contactGroups?.find(g => g.name === labelName);

        // 3. Si no existe, la creamos
        if (!targetGroup) {
          const createdGroup = await people.contactGroups.create({
            requestBody: {
              contactGroup: { name: labelName }
            }
          });
          targetGroup = createdGroup.data;
          console.log(`🏷️ Nueva etiqueta de Google Contacts creada: ${labelName}`);
        }

        // Formato solicitado: Nombre del Adulto (Madre/Padre de Nombre del Peque)
        const contactName = `${parentName} (Madre/Padre de ${childName})`;

        // 4. Crear el contacto y asignarle la etiqueta
        await people.people.createContact({
          requestBody: {
            names: [{ givenName: contactName }],
            emailAddresses: [{ value: email, type: 'work' }],
            phoneNumbers: [{ value: phone, type: 'mobile' }],
            memberships: [
              {
                contactGroupMembership: {
                  contactGroupResourceName: targetGroup.resourceName
                }
              }
            ]
          }
        });
        console.log(`✅ Contacto añadido a Google Contacts: ${contactName} con la etiqueta ${labelName}`);
      } else {
        console.warn('⚠️ No se ha guardado en Google Contacts porque falta el GOOGLE_REFRESH_TOKEN en el .env');
      }
    } catch (googleError) {
      console.error('❌ Error sincronizando con Google Contacts:', googleError);
      // No bloqueamos la inscripción si falla Google Contacts
    }
    
    // 4. Generar Stripe Checkout si NO se saltan la matrícula
    if (!skipStripeMatricula) {
      const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://musicabalu.com';
      // Precio fijo de matrícula: 25€
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'sepa_debit'],
        ...(stripeCustomerId ? { customer: stripeCustomerId } : {}),
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Matrícula Anual Musicabalú',
                description: `Inscripción para las clases de ${childName}`,
              },
              unit_amount: 2500, // 25.00€
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        // MUY IMPORTANTE: Esto guarda la tarjeta para que luego puedas crearle suscripciones personalizadas
        payment_intent_data: {
          setup_future_usage: 'off_session', 
        },
        success_url: `${origin}/inscripcion/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/inscripcion`,
        metadata: {
          enrollmentId: enrollment.id,
          userId: user.id,
          type: 'matricula'
        }
      });

      return NextResponse.json({ checkoutUrl: session.url });
    }

    // Si saltó Stripe (Veteranos en efectivo en junio), devolvemos success
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error en /api/enroll:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
