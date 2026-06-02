const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, service, message } = req.body;

  if (!firstName || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailPass = process.env.EMAIL_PASS;
  if (!emailPass) {
    console.error('EMAIL_PASS environment variable is not set');
    return res.status(500).json({ error: 'Server email configuration error' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'franco.cawagas@cocostudio.ph',
      pass: emailPass
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  const mailOptions = {
    from: 'franco.cawagas@cocostudio.ph',
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
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service || 'Not specified'}</p>
      <p><strong>Message:</strong><br/>${message ? message.replace(/\n/g, '<br/>') : 'No message provided'}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
