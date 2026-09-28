import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request) {
  const urlParams = new URL(request.url);
  const host = urlParams.host; // e.g. localhost:3001 or localhost:3000
  const protocol = urlParams.protocol;
  
  const redirectUri = `${protocol}//${host}/api/google/callback`;

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent select_account', // Forzamos para obtener el refresh token y elegir cuenta
    scope: ['https://www.googleapis.com/auth/contacts']
  });

  return NextResponse.redirect(url);
}
