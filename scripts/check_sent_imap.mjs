import tls from 'node:tls';

const email = 'musicabalu@gmail.com';
const pass = 'mwrkcbgkhgdvlfji';

async function checkSent() {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(993, 'imap.gmail.com', { rejectUnauthorized: false }, () => {
      console.log('Connected to IMAP');
    });

    let step = 0;
    let buffer = '';
    const sentAddresses = new Set();

    socket.on('data', (data) => {
      buffer += data.toString();
      // Handle steps
      if (step === 0 && buffer.includes('* OK')) {
        buffer = '';
        step = 1;
        socket.write(`A01 LOGIN ${email} ${pass}\r\n`);
      } else if (step === 1 && buffer.includes('A01 OK')) {
        buffer = '';
        step = 2;
        // Gmail Sent folder is "[Gmail]/Enviados" or "[Gmail]/Sent Mail"
        socket.write(`A02 LIST "" "*"\r\n`);
      } else if (step === 2 && buffer.includes('A02 OK')) {
        // Detect sent folder name
        const match = buffer.match(/"([^"]*)"\s*$/m) || buffer.match(/\\Sent[^\n\r]*"([^"]+)"/);
        let sentFolder = '[Gmail]/Enviados';
        if (buffer.includes('"[Gmail]/Sent Mail"')) {
          sentFolder = '[Gmail]/Sent Mail';
        } else if (buffer.includes('"[Gmail]/Enviados"')) {
          sentFolder = '[Gmail]/Enviados';
        }
        console.log('Sent folder:', sentFolder);
        buffer = '';
        step = 3;
        socket.write(`A03 SELECT "${sentFolder}"\r\n`);
      } else if (step === 3 && buffer.includes('A03 OK')) {
        buffer = '';
        step = 4;
        // Search today's messages
        const today = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateStr = `${today.getDate()}-${months[today.getMonth()]}-${today.getFullYear()}`;
        socket.write(`A04 SEARCH SINCE ${dateStr}\r\n`);
      } else if (step === 4 && buffer.includes('A04 OK')) {
        const searchLine = buffer.split('\r\n').find(l => l.startsWith('* SEARCH'));
        const ids = searchLine ? searchLine.replace('* SEARCH', '').trim().split(/\s+/).filter(Boolean) : [];
        console.log(`Found ${ids.length} messages sent today.`);
        buffer = '';
        if (ids.length === 0) {
          socket.write(`A05 LOGOUT\r\n`);
          resolve([]);
          return;
        }
        // Fetch headers for last 100 messages
        const recentIds = ids.slice(-100).join(',');
        step = 5;
        socket.write(`A05 FETCH ${recentIds} (BODY.PEEK[HEADER.FIELDS (TO SUBJECT DATE)])\r\n`);
      } else if (step === 5 && buffer.includes('A05 OK')) {
        // Extract To addresses
        const lines = buffer.split('\r\n');
        for (const line of lines) {
          if (/^To:\s*/i.test(line)) {
            const raw = line.replace(/^To:\s*/i, '').trim();
            const emailMatches = raw.match(/<([^>]+)>/) || raw.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
            if (emailMatches) {
              sentAddresses.add(emailMatches[1].trim().toLowerCase());
            }
          }
        }
        step = 6;
        socket.write(`A06 LOGOUT\r\n`);
        resolve(Array.from(sentAddresses));
      }
    });

    socket.on('error', reject);
    socket.on('end', () => {
      resolve(Array.from(sentAddresses));
    });
  });
}

checkSent()
  .then(sent => {
    console.log(`SENT_COUNT: ${sent.length}`);
    console.log(JSON.stringify(sent, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error('IMAP error:', err);
    process.exit(1);
  });
