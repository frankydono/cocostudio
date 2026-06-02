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
    }
  });

  try {
    await transporter.verify();
  } catch (verifyErr) {
    console.error('SMTP verify error:', verifyErr);
    return res.status(500).json({ error: 'SMTP connection failed', detail: verifyErr.message || verifyErr.code });
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
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%);padding:32px 40px;text-align:center;">
              <img src="https://www.cocostudio.ph/images/cocologo.png" alt="CocoStudio" width="140" style="display:block;margin:0 auto 12px auto;border:0;" />
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">New Inquiry Received</h1>
              <p style="margin:8px 0 0 0;font-size:13px;color:rgba(255,255,255,0.85);">Via cocostudio.ph Contact Form</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 24px 0;font-size:14px;color:#c4c4d4;line-height:1.6;">A new message has been submitted through the CocoStudio website. Here are the details:</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #1f1f2e;">
                    <span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:4px;">Name</span>
                    <span style="font-size:15px;color:#f0f0ff;font-weight:500;">${firstName} ${lastName || ''}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #1f1f2e;">
                    <span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:4px;">Email</span>
                    <a href="mailto:${email}" style="font-size:15px;color:#a3e635;text-decoration:none;font-weight:500;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #1f1f2e;">
                    <span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:4px;">Phone</span>
                    <a href="tel:${phone}" style="font-size:15px;color:#f0f0ff;text-decoration:none;font-weight:500;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #1f1f2e;">
                    <span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:4px;">Service Interested In</span>
                    <span style="font-size:15px;color:#f0f0ff;font-weight:500;">${service || 'Not specified'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0 0 0;">
                    <span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3e635;font-weight:600;margin-bottom:8px;">Message</span>
                    <div style="font-size:14px;color:#c4c4d4;line-height:1.7;background-color:#16161f;border-radius:10px;padding:16px;border-left:3px solid #a3e635;">
                      ${message ? message.replace(/\n/g, '<br/>') : '<em style="color:#6b6b8a;">No message provided</em>'}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px 40px;text-align:center;">
              <a href="mailto:${email}?subject=Re: CocoStudio Inquiry" style="display:inline-block;background:linear-gradient(135deg,#a3e635 0%,#84cc16 100%);color:#0a0a0f;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;letter-spacing:0.3px;">Reply to ${firstName}</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0d14;padding:24px 40px;text-align:center;border-top:1px solid #1f1f2e;">
              <p style="margin:0 0 8px 0;font-size:13px;color:#6b6b8a;font-weight:500;">CocoStudio</p>
              <p style="margin:0 0 4px 0;font-size:12px;color:#4a4a6a;">Symfoni Kamias, Quezon City, Philippines</p>
              <p style="margin:0;font-size:12px;color:#4a4a6a;">+63 (0)917-114-7814 &bull; <a href="mailto:inquiry@cocostudio.ph" style="color:#a3e635;text-decoration:none;">inquiry@cocostudio.ph</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email', detail: error.message || error.code });
  }
};
