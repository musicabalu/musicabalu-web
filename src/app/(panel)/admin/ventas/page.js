import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from '../dashboard.module.css';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function VentasDashboard() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  const enrollments = await prisma.enrollment.findMany({
    where: { paymentMethod: 'stripe' },
    orderBy: { createdAt: 'desc' },
    include: { user: true, group: true }
  });

  // Combine both into a single array
  const allSales = [
    ...orders.map(o => ({
      id: o.id,
      date: new Date(o.createdAt),
      productName: o.productName,
      type: 'Tienda (' + (o.productType === 'digital' ? 'Digital' : 'Físico') + ')',
      typeColor: o.productType === 'digital' ? { bg: '#E0F6FD', text: '#00B2E3' } : { bg: '#EBF8FF', text: '#3182CE' },
      user: o.user || { name: 'Invitado', email: '' },
      amount: (o.amountTotal / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }),
      status: o.status === 'completed' ? 'Completado' : o.status,
      shippingData: o.shippingData ? JSON.parse(o.shippingData) : null
    })),
    ...enrollments.map(e => ({
      id: e.id,
      date: new Date(e.createdAt),
      productName: `Inscripción: ${e.childName} (${e.group?.name || 'Grupo'})`,
      type: 'Suscripción',
      typeColor: { bg: '#FEEBC8', text: '#DD6B20' }, // Orange for subscriptions
      user: e.user || { name: e.parentName, email: e.email },
      amount: 'Pago Recurrente', // Since enrollment doesn't store exact amount paid initially
      status: e.status === 'active' ? 'Activa' : (e.status === 'pending' ? 'Pendiente' : 'Cancelada'),
      shippingData: null
    }))
  ].sort((a, b) => b.date - a.date);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ventas de la Tienda</h1>
        <p className={styles.subtitle}>Listado completo de pedidos</p>
      </header>

      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {allSales.length === 0 ? (
          <p>No hay ventas registradas.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '10px' }}>
                <th style={{ padding: '12px', color: '#4A5568' }}>Fecha</th>
                <th style={{ padding: '12px', color: '#4A5568' }}>Producto/Servicio</th>
                <th style={{ padding: '12px', color: '#4A5568' }}>Tipo</th>
                <th style={{ padding: '12px', color: '#4A5568' }}>Cliente</th>
                <th style={{ padding: '12px', color: '#4A5568' }}>Importe</th>
                <th style={{ padding: '12px', color: '#4A5568' }}>Estado</th>
                <th style={{ padding: '12px', color: '#4A5568' }}>Detalles de Envío</th>
              </tr>
            </thead>
            <tbody>
              {allSales.map((sale) => {
                const shipping = sale.shippingData;
                
                return (
                  <tr key={sale.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                      {sale.date.toLocaleDateString('es-ES', { 
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute:'2-digit'
                      })}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{sale.productName}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        background: sale.typeColor.bg,
                        color: sale.typeColor.text,
                        padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold',
                        whiteSpace: 'nowrap'
                      }}>
                        {sale.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                      {sale.user?.name || 'Usuario'}<br/>
                      <span style={{ color: '#718096', fontSize: '0.8rem' }}>{sale.user?.email}</span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#2C3333' }}>
                      {sale.amount}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        background: (sale.status === 'Completado' || sale.status === 'Activa') ? '#C6F6D5' : (sale.status === 'Pendiente' ? '#FEFCBF' : '#FED7D7'),
                        color: (sale.status === 'Completado' || sale.status === 'Activa') ? '#22543D' : (sale.status === 'Pendiente' ? '#975A16' : '#822727'),
                        padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
                      }}>
                        {sale.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '0.85rem', color: '#4A5568' }}>
                      {shipping ? (
                        <>
                          <div>{shipping.name}</div>
                          <div>{shipping.address?.line1} {shipping.address?.line2}</div>
                          <div>{shipping.address?.postal_code} {shipping.address?.city}</div>
                          <div>{shipping.address?.state}, {shipping.address?.country}</div>
                        </>
                      ) : (
                        <span style={{ color: '#A0AEC0' }}>-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
