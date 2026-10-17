import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import Link from 'next/link'

const prisma = new PrismaClient()

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
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div style={{ padding: '24px', maxWidth: '1080px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Gestión de Talleres Pop-up</h1>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>
            Página pública: <Link href="/talleres" target="_blank" style={{ color: '#00B2E3', fontWeight: 'bold' }}>musicabalu.com/talleres ↗</Link>
          </p>
        </div>
        <Link href="/admin" style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', borderRadius: '8px', textDecoration: 'none', color: '#334155', fontWeight: '600' }}>
          ← Volver al Panel
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Formulario de creación */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '12px' }}>Añadir nuevo Taller</h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '16px', lineHeight: '1.45' }}>
            Puedes separar la fecha/hora y la dirección con una barra vertical <code>|</code> para que salgan en dos líneas bonitas.
          </p>
          
          <form action={addWorkshop} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Título del Taller</label>
              <input name="title" required placeholder="Ej: Taller en Pequeñas Sonrisas (La Flota)" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Fecha, Hora y Dirección</label>
              <input name="dateText" required placeholder="Ej: Sábado 21 Nov · 11:00 a 11:45 h | 📍 P.º Gabriel Císcar, 22" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
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
          <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '16px' }}>Talleres Configurados ({workshops.length})</h2>
          
          {workshops.length === 0 ? (
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
              No hay talleres creados todavía.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {workshops.map(w => (
                <div key={w.id} style={{ backgroundColor: 'white', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '1.08rem', color: w.isActive ? '#0f172a' : '#94a3b8' }}>
                        {w.title}
                        {!w.isActive && <span style={{ marginLeft: '8px', fontSize: '0.78rem', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>Oculto</span>}
                        {w.isSoldOut && <span style={{ marginLeft: '8px', fontSize: '0.78rem', backgroundColor: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>Completo</span>}
                      </h3>
                      <p style={{ margin: '0', fontSize: '0.9rem', color: '#475569' }}>{w.dateText}</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
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
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
