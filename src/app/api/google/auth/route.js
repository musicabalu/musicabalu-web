import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/google/callback'
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // Forzamos para obtener el refresh token
    scope: ['https://www.googleapis.com/auth/contacts']
  });

  return NextResponse.redirect(url);
}
