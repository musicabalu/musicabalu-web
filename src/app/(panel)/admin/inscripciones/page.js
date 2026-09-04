import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import InscripcionesClient from "./InscripcionesClient";
import BackButton from "@/components/BackButton";

export const dynamic = 'force-dynamic'; // Para que los datos estén siempre frescos

export default async function InscripcionesPage() {
  // Obtenemos todos los grupos, incluyendo las inscripciones 'active' en cada uno
  let groups = await prisma.group.findMany({
    include: {
      enrollments: {
        where: {
          status: 'active'
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });

  // Ordenar los grupos por día de la semana y luego por hora
  const days = { 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sábado': 6, 'Domingo': 7 };
  
  groups.sort((a, b) => {
    // Extraer el día (ej: "Martes 16:30 - 17:15" -> "Martes")
    const dayA = a.schedule.split(' ')[0];
    const dayB = b.schedule.split(' ')[0];
    
    if (days[dayA] !== days[dayB]) {
      return (days[dayA] || 99) - (days[dayB] || 99);
    }
    
    // Si es el mismo día, ordenar por hora (ej: "16:30")
    const timeA = a.schedule.split(' ')[1] || '';
    const timeB = b.schedule.split(' ')[1] || '';
    return timeA.localeCompare(timeB);
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <BackButton href="/admin" />
      <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333' }}>Panel de Inscripciones</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Aquí puedes ver a todos los alumnos matriculados organizados por grupo.
      </p>
      
      <InscripcionesClient initialGroups={groups} />
    </div>
  );
}
