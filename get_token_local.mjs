import { google } from 'googleapis';
import http from 'http';
import url from 'url';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[match[1].trim()] = val;
  }
});

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
);

const scopes = ['https://www.googleapis.com/auth/contacts'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent'
});

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/?code=')) {
    const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
    const code = qs.get('code');
    res.end('<h1>Exito! Vuelve al chat.</h1><p>Ya puedes cerrar esta ventana.</p>');
    server.close();
    
    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log('\n✅ ¡TOKEN CONSEGUIDO!\n');
      console.log('Tu nuevo GOOGLE_REFRESH_TOKEN es:\n');
      console.log(tokens.refresh_token);
      console.log('\nCópialo y ponlo en el .env (y en Vercel).');
    } catch (e) {
      console.error('Error consiguiendo token:', e.message);
    }
  }
}).listen(3000, () => {
  console.log('\n=== PASO 1 ===');
  console.log('Abre este enlace en tu navegador y autoriza:');
  console.log('\n' + authUrl + '\n');
  console.log('Esperando respuesta...\n');
});
