import tls from 'node:tls';

const email = 'musicabalu@gmail.com';
const pass = 'mwrkcbgkhgdvlfji';

async function getSentSample() {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(993, 'imap.gmail.com', { rejectUnauthorized: false }, () => {});

    let step = 0;
    let buffer = '';

    socket.on('data', (data) => {
      buffer += data.toString();
      if (step === 0 && buffer.includes('* OK')) {
        buffer = '';
        step = 1;
        socket.write(`A01 LOGIN ${email} ${pass}\r\n`);
      } else if (step === 1 && buffer.includes('A01 OK')) {
        buffer = '';
        step = 2;
        socket.write(`A02 SELECT "[Gmail]/Enviados"\r\n`);
      } else if (step === 2 && buffer.includes('A02 OK')) {
        buffer = '';
        step = 3;
        // Search last message
        socket.write(`A03 SEARCH ALL\r\n`);
      } else if (step === 3 && buffer.includes('A03 OK')) {
        const searchLine = buffer.split('\r\n').find(l => l.startsWith('* SEARCH'));
        const ids = searchLine ? searchLine.replace('* SEARCH', '').trim().split(/\s+/).filter(Boolean) : [];
        buffer = '';
        const lastId = ids[ids.length - 1];
        step = 4;
        socket.write(`A04 FETCH ${lastId} BODY[TEXT]\r\n`);
      } else if (step === 4 && (buffer.includes('A04 OK') || buffer.includes(')'))) {
        socket.write(`A05 LOGOUT\r\n`);
        resolve(buffer);
      }
    });

    socket.on('error', reject);
    socket.on('end', () => resolve(buffer));
  });
}

getSentSample().then(b => {
  console.log("LAST EMAIL CONTENT:\n", b);
  process.exit(0);
}).catch(console.error);
