import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground' // MUST MATCH redirect_uri
);

const code = '4/0ATsMZqB9JpAA0bmQgUZCvy71csTvMBL9IXMTckb96BFCc6NLFlMLLga0QdxXd3lmVQPHvw';

async function getToken() {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('NUEVO REFRESH TOKEN:', tokens.refresh_token);
    console.log('Access Token (optional):', tokens.access_token);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

getToken();
