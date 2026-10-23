import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function ComunidadPage() {
  redirect('/comunidad/canciones');
}
