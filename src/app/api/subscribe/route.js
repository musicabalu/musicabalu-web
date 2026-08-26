import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email y nombre son requeridos" },
        { status: 400 }
      );
    }

    // Aquí irá la clave de la API de MailerLite cuando esté creada la cuenta.
    // Se deberá guardar en un archivo .env.local como MAILERLITE_API_KEY
    const API_KEY = process.env.MAILERLITE_API_KEY;
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID; // El ID del grupo "Lead Magnet Audio"

    // Si no hay clave de API configurada (estamos en desarrollo/fase inicial), 
    // simulamos un retraso de 1 segundo y devolvemos éxito para que veas cómo funciona la interfaz.
    if (!API_KEY) {
      console.log(`[SIMULACIÓN] Nuevo Lead captado: ${name} (${email})`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ success: true, simulated: true });
    }

    // Código real de conexión a MailerLite v2
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: name,
        },
        groups: [GROUP_ID]
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      console.error("Error de MailerLite:", errorData);
      return NextResponse.json(
        { error: "Error al suscribir al usuario" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
