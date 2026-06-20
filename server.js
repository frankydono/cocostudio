const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Load .env file if present (for local dev)
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) {
        process.env[key.trim()] = rest.join('=').trim();
      }
    });
  }
} catch (e) { /* ignore */ }

const PORT = 3003;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

function serveStatic(req, res) {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf8');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
}

async function handleApiContact(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const payload = JSON.parse(body);
      console.log('[Local API] Payload:', payload);

      const { firstName, lastName, email, phone, service, message } = payload;
      if (!firstName || !email || !phone) {
        console.error('[Local API] Missing required fields');
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing required fields' }));
        return;
      }

      const emailPass = process.env.EMAIL_PASS;
      console.log('[Local API] EMAIL_PASS present:', !!emailPass);
      if (!emailPass) {
        console.error('[Local API] EMAIL_PASS not set in .env file');
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'EMAIL_PASS not set. Create a .env file with EMAIL_PASS=your_password' }));
        return;
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: 'franco.cawagas@cocostudio.ph',
          pass: emailPass
        }
      });

      try {
        const verifyResult = await transporter.verify();
        console.log('[Local API] SMTP verify result:', verifyResult);
      } catch (verifyErr) {
        console.error('[Local API] SMTP verify error:', verifyErr);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'SMTP connection failed', detail: verifyErr.message || verifyErr.code }));
        return;
      }

      const mailOptions = {
        from: '"CocoStudio Website" <franco.cawagas@cocostudio.ph>',
        to: 'franco.cawagas@cocostudio.ph',
        replyTo: email,
        subject: `New Inquiry from ${firstName} ${lastName || ''} via CocoStudio Website`,
        text: `
Name: ${firstName} ${lastName || ''}
Email: ${email}
Phone: ${phone}
Service: ${service || 'Not specified'}
Message:
${message || 'No message provided'}
        `,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Inquiry - CocoStudio</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0a0a0f;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:#111118;border-radius:16px;overflow:hidden;border:1px solid #1f1f2e;">
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%);padding:32px 40px;text-align:center;">
              <img src="https://www.cocostudio.ph/images/cocologo.png" alt="CocoStudio" width="140" style="display:block;margin:0 auto 12px auto;border:0;" />
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">New Inquiry Received</h1>
              <p style="margin:8px 0 0 0;font-size:13px;color:rgba(255,255,255,0.85);">Via cocostudio.ph Contact Form</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 24px 0;font-size:14px;color:#c4c4d4;line-height:1.6;">A new message has been submitted through the CocoStudio website. Here are the details:</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr><td style="padding:14px 0;border-bottom:1px solid #1f1f2e;"><span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:4px;">Name</span><span style="font-size:15px;color:#f0f0ff;font-weight:500;">${firstName} ${lastName || ''}</span></td></tr>
                <tr><td style="padding:14px 0;border-bottom:1px solid #1f1f2e;"><span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:4px;">Email</span><a href="mailto:${email}" style="font-size:15px;color:#a3e635;text-decoration:none;font-weight:500;">${email}</a></td></tr>
                <tr><td style="padding:14px 0;border-bottom:1px solid #1f1f2e;"><span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:4px;">Phone</span><a href="tel:${phone}" style="font-size:15px;color:#f0f0ff;text-decoration:none;font-weight:500;">${phone}</a></td></tr>
                <tr><td style="padding:14px 0;border-bottom:1px solid #1f1f2e;"><span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:4px;">Service Interested In</span><span style="font-size:15px;color:#f0f0ff;font-weight:500;">${service || 'Not specified'}</span></td></tr>
                <tr><td style="padding:14px 0 0 0;"><span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:8px;">Message</span><div style="font-size:14px;color:#c4c4d4;line-height:1.7;background-color:#16161f;border-radius:10px;padding:16px;border-left:3px solid #a3e635;">${message ? message.replace(/\n/g, '<br/>') : '<em style="color:#6b6b8a;">No message provided</em>'}</div></td></tr>
              </table>
            </td>
          </tr>
          <tr><td style="padding:0 40px 32px 40px;text-align:center;"><a href="mailto:${email}?subject=Re: CocoStudio Inquiry" style="display:inline-block;background:linear-gradient(135deg,#a3e635 0%,#84cc16 100%);color:#0a0a0f;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;letter-spacing:0.3px;">Reply to ${firstName}</a></td></tr>
          <tr><td style="background-color:#0d0d14;padding:24px 40px;text-align:center;border-top:1px solid #1f1f2e;"><p style="margin:0 0 8px 0;font-size:13px;color:#6b6b8a;font-weight:500;">CocoStudio</p><p style="margin:0 0 4px 0;font-size:12px;color:#4a4a6a;">Symfoni Kamias, Quezon City, Philippines</p><p style="margin:0;font-size:12px;color:#4a4a6a;">+63 (0)917-114-7814 &bull; <a href="mailto:inquiry@cocostudio.ph" style="color:#a3e635;text-decoration:none;">inquiry@cocostudio.ph</a></p></td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('[Local API] Email sent. MessageId:', info.messageId);
      console.log('[Local API] Server response:', info.response);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, messageId: info.messageId }));
    } catch (error) {
      console.error('[Local API] Email send error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to send email', detail: error.message || error.code }));
    }
  });
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/contact') {
    handleApiContact(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});
