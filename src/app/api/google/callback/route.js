import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/google/callback'
    );

    const { tokens } = await oauth2Client.getToken(code);
    
    if (tokens.refresh_token) {
      const envPath = path.resolve(process.cwd(), '.env');
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }

      // Si ya existe la línea, la reemplazamos, si no la añadimos
      if (envContent.includes('GOOGLE_REFRESH_TOKEN=')) {
        envContent = envContent.replace(/GOOGLE_REFRESH_TOKEN=.*/g, `GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`);
      } else {
        envContent += `\nGOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"\n`;
      }

      fs.writeFileSync(envPath, envContent);

      return NextResponse.json({ success: true, message: '¡Token guardado exitosamente en .env! Ya puedes cerrar esta ventana y avisar a la IA.' });
    } else {
      return NextResponse.json({ error: 'No se obtuvo refresh_token. Es posible que ya hayas autorizado la app antes. Revoca los permisos en tu cuenta de Google y vuelve a intentarlo.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in google callback:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
