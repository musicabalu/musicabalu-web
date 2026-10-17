import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' }) : null;

function getEmailTransporter() {
  if (process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'ssl0.ovh.net',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else if (process.env.EMAIL_SERVER) {
    return nodemailer.createTransport(process.env.EMAIL_SERVER);
  } else if (process.env.GMAIL_USER) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
  }
  return null;
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    // 1. Obtener datos de la inscripción antes de borrarla
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: id },
      include: { group: true }
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Inscripción no encontrada' }, { status: 404 });
    }

    // 2. Cancelar automáticamente la suscripción periódica en Stripe si la tiene
    let stripeCancelled = false;
    let stripeDetails = '';
    if (stripe && (enrollment.userId || enrollment.email)) {
      try {
        const user = enrollment.userId 
          ? await prisma.user.findUnique({ where: { id: enrollment.userId }, include: { enrollments: true } })
          : await prisma.user.findUnique({ where: { email: enrollment.email }, include: { enrollments: true } });

        if (user?.stripeId) {
          // Comprobar si tiene más inscripciones activas (por si tiene otro hermano matriculado)
          const activeSiblings = user.enrollments.filter(e => e.id !== id && e.status === 'active');
          if (activeSiblings.length === 0) {
            const subs = await stripe.subscriptions.list({
              customer: user.stripeId,
              status: 'active'
            });
            for (const sub of subs.data) {
              await stripe.subscriptions.cancel(sub.id);
              stripeCancelled = true;
              console.log(`✅ Suscripción de Stripe ${sub.id} cancelada automáticamente para el cliente ${user.stripeId}`);
            }
            if (stripeCancelled) {
              stripeDetails = ' (Suscripción de Stripe cancelada automáticamente)';
            }
          }
        }
      } catch (stripeError) {
        console.error('Error cancelando suscripción en Stripe:', stripeError);
      }
    }

    // 3. Enviar email automático de despedida con el texto de Javi
    if (enrollment.email) {
      try {
        const transporter = getEmailTransporter();
        if (transporter) {
          const senderEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || 'Musicabalú <hola@musicabalu.com>';
          const parentName = enrollment.parentName ? enrollment.parentName.split(' ')[0] : 'Familia';
          const childName = enrollment.childName || 'tu peque';

          const emailHtml = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2C3333; max-width: 600px; margin: 0 auto; line-height: 1.6; padding: 20px;">
              <div style="text-align: center; margin-bottom: 25px;">
                <h1 style="color: #F4436C; margin: 0; font-size: 1.8rem;">Musicabalú</h1>
                <p style="color: #718096; margin: 4px 0 0 0; font-size: 0.9rem;">Estimulación musical temprana</p>
              </div>

              <div style="background-color: #ffffff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <p style="font-size: 1.05rem; margin-top: 0;">Hola, <strong>${parentName}</strong>:</p>

                <p>Hemos dado de baja tu plaza en Musicabalú. Ha sido un enorme placer vivir momentos de conexión musical contigo y con <strong>${childName}</strong>.</p>

                <p>Aunque ya no nos veamos semanalmente, si lo deseas puedes seguir teniendo Musicabalú en casa a través de la plataforma que ya conoces. Como siempre, cada semana seguiremos añadiendo contenidos.</p>

                <p>Podéis acceder a la biblioteca familiar con una suscripción mensual o anual muy accesible (desde 3,90 €/mes o 39 €/año) directamente desde nuestra web:</p>

                <div style="text-align: center; margin: 26px 0;">
                  <a href="https://musicabalu.com/tienda" style="background-color: #00B2E3; color: white; padding: 12px 28px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; font-size: 1rem;">
                    Acceder a la Biblioteca Familiar →
                  </a>
                </div>

                <p>Ojalá os acompañe en muchas tardes de conexión y música en el salón 🤗❤️</p>

                <p style="margin-top: 26px; color: #2C3333;">
                  Un abrazo enorme,<br><br>
                  <strong>Javi.</strong>
                </p>
              </div>

              <div style="text-align: center; margin-top: 20px; font-size: 0.8rem; color: #A0AEC0;">
                <p>Musicabalú · <a href="mailto:hola@musicabalu.com" style="color: #00B2E3; text-decoration: none;">hola@musicabalu.com</a></p>
              </div>
            </div>
          `;

          await transporter.sendMail({
            from: senderEmail,
            to: enrollment.email,
            subject: `Baja de tu plaza en Musicabalú 💛`,
            html: emailHtml
          });

          console.log(`✉️ Email de baja enviado con éxito a ${enrollment.email}`);
        }
      } catch (emailErr) {
        console.error('Error enviando email de confirmación de baja:', emailErr);
      }
    }

    // 4. Registrar en ActivityLog
    try {
      if (session.user?.id) {
        await prisma.activityLog.create({
          data: {
            userId: session.user.id,
            action: 'Baja Alumno Presencial',
            details: `Baja de ${enrollment.childName} (Grupo: ${enrollment.group?.name || enrollment.groupId}) - Email enviado a ${enrollment.email}${stripeDetails}`
          }
        });
      }
    } catch (logErr) {
      console.error('Error guardando log de baja:', logErr);
    }

    // 5. Borrar la inscripción
    await prisma.enrollment.delete({
      where: { id: id }
    });

    revalidatePath('/admin', 'layout');

    return NextResponse.json({ 
      success: true, 
      emailSent: Boolean(enrollment.email),
      stripeCancelled 
    });
    
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const data = await req.json();
    const updateData = {};
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.groupId !== undefined) updateData.groupId = data.groupId;
    if (data.isEmpi !== undefined) updateData.isEmpi = data.isEmpi;
    if (data.paymentMethod !== undefined) updateData.paymentMethod = data.paymentMethod;
    if (data.paymentFrequency !== undefined) updateData.paymentFrequency = data.paymentFrequency;

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: id },
      data: updateData
    });

    revalidatePath('/admin', 'layout');

    return NextResponse.json({ success: true, enrollment: updatedEnrollment });
    
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
