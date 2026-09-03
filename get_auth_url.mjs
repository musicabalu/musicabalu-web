import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'urn:ietf:wg:oauth:2.0:oob'
);

const scopes = [
  'https://www.googleapis.com/auth/contacts'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent' // Forces it to return a new refresh token
});

console.log('\n=== PASO 1 ===');
console.log('Haz clic (o copia y pega) en el siguiente enlace y autoriza con tu cuenta de musicabalu@gmail.com:');
console.log('\n' + url + '\n');
console.log('=== PASO 2 ===');
console.log('Cuando aceptes, Google te dará un código. Cópialo y pégalo en el chat para que genere el nuevo token.\n');
