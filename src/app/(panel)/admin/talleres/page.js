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
  const stripeLink = formData.get("stripeLink")
  
  if (!title || !dateText || !stripeLink) return

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

async function toggleWorkshop(id, currentStatus) {
  "use server"
  await prisma.workshop.update({
    where: { id },
    data: { isActive: !currentStatus }
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
  if (!session || session.user.email !== "marian.alvcon@gmail.com" && session.user.email !== "hola@musicabalu.com") {
    redirect("/login")
  }

  const workshops = await prisma.workshop.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Gestión de Talleres Pop-up</h1>
        <Link href="/admin" style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', borderRadius: '8px', textDecoration: 'none', color: '#334155' }}>
          Volver al Panel
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Formulario de creación */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '16px' }}>Publicar nuevo Taller</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
            Recuerda crear primero el "Enlace de Pago" en Stripe y pegar aquí la URL.
          </p>
          
          <form action={addWorkshop} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px' }}>Título del Taller</label>
              <input name="title" required placeholder="Ej: Taller Escuela Origami" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px' }}>Fecha y Hora</label>
              <input name="dateText" required placeholder="Ej: Sábado 15 Nov - 11:00h" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px' }}>Enlace de Pago de Stripe</label>
              <input name="stripeLink" type="url" required placeholder="https://buy.stripe.com/..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
              Publicar Taller
            </button>
          </form>
        </div>

        {/* Lista de Talleres */}
        <div style={{ flex: '2', minWidth: '400px' }}>
          <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '16px' }}>Talleres Publicados</h2>
          
          {workshops.length === 0 ? (
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
              No hay talleres creados todavía.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {workshops.map(w => (
                <div key={w.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: w.isActive ? '#0f172a' : '#94a3b8' }}>
                      {w.title}
                      {!w.isActive && <span style={{ marginLeft: '8px', fontSize: '0.8rem', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>Oculto</span>}
                    </h3>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#475569' }}>{w.dateText}</p>
                    <a href={w.stripeLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#2563eb' }}>Ver Stripe</a>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <form action={toggleWorkshop.bind(null, w.id, w.isActive)}>
                      <button type="submit" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: w.isActive ? '#fff' : '#f8fafc', cursor: 'pointer' }}>
                        {w.isActive ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </form>
                    <form action={deleteWorkshop.bind(null, w.id)} onSubmit={(e) => {
                      if(!confirm("¿Seguro que quieres borrar este taller definitivamente?")) e.preventDefault();
                    }}>
                      <button type="submit" style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#ef4444', color: 'white', cursor: 'pointer' }}>
                        Borrar
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
