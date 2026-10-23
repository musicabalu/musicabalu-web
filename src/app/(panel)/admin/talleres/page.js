import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import Link from 'next/link'
import dashStyles from '../dashboard.module.css'

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'

// --- Server Actions ---
async function addWorkshop(formData) {
  "use server"
  const title = formData.get("title")
  const dateText = formData.get("dateText")
  const stripeLink = formData.get("stripeLink") || "/api/workshop-checkout"
  
  if (!title || !dateText) return

  await prisma.workshop.create({
    data: {
      title,
      dateText,
      stripeLink,
      isActive: true
    }
  })
  
  revalidatePath('/admin/talleres')
  revalidatePath('/talleres')
}

async function updateWorkshop(formData) {
  "use server"
  const id = formData.get("id")
  const title = formData.get("title")
  const dateText = formData.get("dateText")
  const stripeLink = formData.get("stripeLink") || "/api/workshop-checkout"

  if (!id || !title || !dateText) return

  await prisma.workshop.update({
    where: { id },
    data: {
      title,
      dateText,
      stripeLink
    }
  })

  revalidatePath('/admin/talleres')
  revalidatePath(`/admin/talleres/${id}`)
  revalidatePath('/talleres')
}

async function toggleWorkshop(id, currentStatus) {
  "use server"
  await prisma.workshop.update({
    where: { id },
    data: { isActive: !currentStatus }
  })
  revalidatePath('/admin/talleres')
  revalidatePath('/talleres')
}

async function toggleSoldOut(id, currentStatus) {
  "use server"
  await prisma.workshop.update({
    where: { id },
    data: { isSoldOut: !currentStatus }
  })
  revalidatePath('/admin/talleres')
  revalidatePath('/talleres')
}

async function deleteWorkshop(id) {
  "use server"
  // Borrar también las fichas de los peques de esta sesión de taller,
  // manteniendo intactos los usuarios (User) y sus posibles suscripciones.
  await prisma.order.deleteMany({
    where: {
      productType: 'workshop',
      productId: id
    }
  })
  await prisma.workshop.delete({
    where: { id }
  })
  revalidatePath('/admin/talleres')
  revalidatePath('/talleres')
}

// --- Page Component ---
export default async function AdminTalleresPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  const workshops = await prisma.workshop.findMany({
    orderBy: { createdAt: 'asc' }
  })

  const workshopOrders = await prisma.order.findMany({
    where: {
      productType: 'workshop',
      status: 'completed'
    },
    include: {
      user: true
    },
    orderBy: { createdAt: 'asc' }
  })

  const ordersByWorkshop = {}
  for (const o of workshopOrders) {
    if (!ordersByWorkshop[o.productId]) ordersByWorkshop[o.productId] = []
    ordersByWorkshop[o.productId].push(o)
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1120px', margin: '0 auto' }}>
      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0, color: '#0f172a' }}>🧸 Talleres</h1>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>
            Página pública de reservas: <Link href="/talleres" target="_blank" style={{ color: '#00B2E3', fontWeight: 'bold' }}>musicabalu.com/talleres ↗</Link> · Aforo máximo automático: <strong>12 plazas por sesión</strong>
          </p>
        </div>
        <Link href="/admin" style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', borderRadius: '8px', textDecoration: 'none', color: '#334155', fontWeight: '600' }}>
          ← Volver al Panel
        </Link>
      </div>

      {/* APARTADO 1: GRUPOS EN MARCHA (TALLERES ACTUALES) */}
      <section style={{ marginBottom: '44px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 className={dashStyles.sectionTitle} style={{ margin: '0 0 4px 0' }}>
            Grupos en marcha (Talleres actuales)
          </h2>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748b' }}>
            Haz clic en cualquier sesión para abrir su grupo y ver las fichas de los peques inscritos (edad, teléfono con WhatsApp directo, notas y asistencia).
          </p>
        </div>

        {workshops.length === 0 ? (
          <div style={{ padding: '28px', backgroundColor: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
            No hay ningún grupo de taller en marcha ahora mismo.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '20px' }}>
            {workshops.map(w => {
              const sessionOrders = ordersByWorkshop[w.id] || []
              const enrolled = sessionOrders.length
              const capacity = 12
              const percentage = Math.round((enrolled / capacity) * 100)
              const isFull = w.isSoldOut || enrolled >= capacity
              const parts = (w.dateText || '').split('|').map(s => s.trim())
              const schedulePart = parts[0] || w.dateText
              const addressPart = parts[1] || ''

              return (
                <Link key={w.id} href={`/admin/talleres/${w.id}`} style={{ textDecoration: 'none' }}>
                  <div className={dashStyles.groupCard} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: w.isActive ? 1 : 0.65 }}>
                    <div>
                      <h3 className={dashStyles.groupName} style={{ fontSize: '1.08rem', marginBottom: '6px' }}>
                        {w.title}
                      </h3>
                      <p className={dashStyles.groupSchedule} style={{ marginBottom: addressPart ? '4px' : '12px' }}>
                        🕒 {schedulePart}
                      </p>
                      {addressPart && (
                        <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 12px 0' }}>
                          {addressPart}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className={dashStyles.progressBar}>
                        <div
                          className={dashStyles.progressFill}
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: isFull ? '#ef4444' : 'var(--color-cyan)'
                          }}
                        />
                      </div>

                      <div className={dashStyles.groupStats}>
                        <span>{enrolled} / {capacity} plazas</span>
                        <span className={`${dashStyles.badge} ${isFull ? dashStyles.badgeFull : dashStyles.badgeOpen}`}>
                          {!w.isActive ? 'OCULTO' : (isFull ? 'COMPLETO' : 'DISPONIBLE')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '0 0 36px 0' }} />

      {/* APARTADO 2: GESTIÓN DE TALLERES POP-UP */}
      <section>
        <div style={{ marginBottom: '20px' }}>
          <h2 className={dashStyles.sectionTitle} style={{ margin: '0 0 4px 0' }}>
            Gestión de Talleres Pop-up
          </h2>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748b' }}>
            Desde aquí puedes crear nuevos talleres cuando quieras, modificar horarios o direcciones, o borrar las sesiones una vez terminadas.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Formulario de creación */}
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.15rem', marginTop: 0, marginBottom: '12px' }}>Añadir nuevo Taller</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '16px', lineHeight: '1.45' }}>
              Puedes separar la fecha/hora y la dirección con una barra vertical <code>|</code> para que salgan en dos líneas. Al publicarlo, se crea automáticamente su grupo arriba y su pasarela de Stripe (20 €, máx. 12 plazas).
            </p>
            
            <form action={addWorkshop} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Título del Taller</label>
                <input name="title" required placeholder="Ej: Taller en Pequeñas Sonrisas (La Flota) — 1ª Sesión" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Fecha, Hora y Dirección</label>
                <input name="dateText" required placeholder="Ej: Sábado 21 Nov · 11:00 a 11:45 h | 📍 P.º Gabriel Císcar, 22, Murcia" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Enlace de Pago (Opcional)</label>
                <input name="stripeLink" type="text" placeholder="Déjalo vacío para pago automático en Stripe (20 €)" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px' }}>
                + Publicar Taller
              </button>
            </form>
          </div>

          {/* Lista de Talleres con edición directa */}
          <div style={{ flex: '2', minWidth: '400px' }}>
            <h3 style={{ fontSize: '1.15rem', marginTop: 0, marginBottom: '16px' }}>Talleres Configurados ({workshops.length})</h3>
            
            {workshops.length === 0 ? (
              <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
                No hay talleres creados todavía.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {workshops.map(w => {
                  const sessionOrders = ordersByWorkshop[w.id] || []
                  const soldCount = sessionOrders.length
                  const isFull = w.isSoldOut || soldCount >= 12

                  return (
                    <div key={w.id} style={{ backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <div>
                          <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: w.isActive ? '#0f172a' : '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span>{w.title}</span>
                            <span style={{
                              fontSize: '0.8rem',
                              backgroundColor: isFull ? '#fee2e2' : '#e0f2fe',
                              color: isFull ? '#b91c1c' : '#0369a1',
                              padding: '3px 10px',
                              borderRadius: '999px',
                              fontWeight: '800'
                            }}>
                              👥 {soldCount} / 12 plazas
                            </span>
                            {!w.isActive && <span style={{ fontSize: '0.78rem', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>Oculto</span>}
                            {isFull && <span style={{ fontSize: '0.78rem', backgroundColor: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>Completo</span>}
                          </h4>
                          <p style={{ margin: '0', fontSize: '0.9rem', color: '#475569' }}>{w.dateText}</p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <Link
                            href={`/admin/talleres/${w.id}`}
                            style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '700' }}
                          >
                            Ver Grupo ➔
                          </Link>
                          <form action={toggleSoldOut.bind(null, w.id, w.isSoldOut)}>
                            <button type="submit" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: w.isSoldOut ? '#fff' : '#fee2e2', color: w.isSoldOut ? '#334155' : '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                              {w.isSoldOut ? 'Reabrir plazas' : 'Marcar ¡Lleno!'}
                            </button>
                          </form>
                          <form action={toggleWorkshop.bind(null, w.id, w.isActive)}>
                            <button type="submit" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: w.isActive ? '#fff' : '#f8fafc', cursor: 'pointer', fontSize: '0.85rem' }}>
                              {w.isActive ? 'Ocultar' : 'Mostrar'}
                            </button>
                          </form>
                          <form action={deleteWorkshop.bind(null, w.id)}>
                            <button type="submit" style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#ef4444', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
                              Borrar
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Desplegable para editar cualquier dato sin borrar el taller */}
                      <details style={{ marginTop: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                        <summary style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#2563eb', fontWeight: '600' }}>
                          ✏️ Editar horario, dirección o enlace de pago
                        </summary>
                        <form action={updateWorkshop} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                          <input type="hidden" name="id" value={w.id} />
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#475569', marginBottom: '2px' }}>Título</label>
                            <input name="title" defaultValue={w.title} required style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#475569', marginBottom: '2px' }}>Fecha, Hora y Dirección</label>
                            <input name="dateText" defaultValue={w.dateText} required style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#475569', marginBottom: '2px' }}>Enlace de Pago (Si lo dejas vacío o en automático usa Stripe Checkout 20 €)</label>
                            <input name="stripeLink" type="text" defaultValue={w.stripeLink && w.stripeLink.includes("stripe.com") ? w.stripeLink : ""} placeholder="Automático (Stripe Checkout 20 €)" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                          <button type="submit" style={{ alignSelf: 'flex-start', backgroundColor: '#0f172a', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                            Guardar cambios
                          </button>
                        </form>
                      </details>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  )
}
