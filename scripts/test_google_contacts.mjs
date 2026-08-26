import { google } from 'googleapis';

async function testContacts() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const people = google.people({ version: 'v1', auth: oauth2Client });
    
    console.log('Probando listar grupos...');
    const groupsList = await people.contactGroups.list();
    console.log('Grupos:', groupsList.data.contactGroups?.map(g => g.name));
    console.log('✅ Google Contacts API está habilitada y funcionando.');

  } catch (err) {
    console.error('Error:', err.message);
  }
}

testContacts();
