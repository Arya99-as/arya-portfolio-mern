import nodemailer from 'nodemailer';

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const smtpHost = process.env.SMTP_HOST || process.env.MAIL_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || process.env.MAIL_PORT) || 587;
  const smtpUser = (process.env.SMTP_USER || process.env.MAIL_USER || 'sutararya.6336@gmail.com').trim();
  const smtpPassword = (process.env.SMTP_PASSWORD || process.env.MAIL_PASSWORD || 'qqsupuopzvkwglry').trim().replace(/["'\s]/g, '');
  const contactEmail = (process.env.CONTACT_EMAIL || 'sutararya.6336@gmail.com').trim();

  const isPlaceholderPassword = !smtpPassword || smtpPassword.includes('your-app-password') || smtpPassword.includes('your_gmail_app_password');

  if (smtpUser && smtpPassword && !isPlaceholderPassword) {
    const plainTextBody = `================================\nNEW PORTFOLIO CONTACT\n================================\n\nName:\n${name}\n\nEmail:\n${email}\n\nSubject:\n${subject}\n\nMessage:\n\n${message}\n\n================================`;

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; background-color: #0d1117; color: #e6edf3; border-radius: 8px; border: 1px solid #30363d;">
        <h2 style="color: #5FD3C4; margin-top: 0; border-bottom: 1px solid #30363d; padding-bottom: 10px;">⚡ NEW PORTFOLIO CONTACT</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #5FD3C4; text-decoration: none;">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: 0; border-top: 1px solid #30363d; margin: 15px 0;" />
        <h3 style="color: #8b949e; margin-bottom: 8px;">Message:</h3>
        <div style="background-color: #161b22; padding: 15px; border-radius: 6px; white-space: pre-wrap; border-left: 3px solid #5FD3C4; color: #f0f6fc; line-height: 1.6;">${message}</div>
      </div>
    `;

    const mailOptions = {
      from: `"${name} (Portfolio Contact)" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New Portfolio Contact: ${subject}`,
      text: plainTextBody,
      html: htmlBody
    };

    const configs = [
      {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPassword },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000
      },
      {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user: smtpUser, pass: smtpPassword },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000
      },
      {
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPassword }
      }
    ];

    let lastError = null;
    for (const config of configs) {
      try {
        const transporter = nodemailer.createTransport(config);
        const info = await transporter.sendMail(mailOptions);
        console.log(`[SMTP Email Service] Email delivered successfully to ${contactEmail}. Message ID: ${info.messageId}`);
        return true;
      } catch (err) {
        lastError = err;
        console.warn(`[SMTP Transport Attempt Failed] ${err.message}. Trying next configuration...`);
      }
    }

    console.error(`[SMTP Email Service Error] All delivery attempts failed: ${lastError?.message}`);
    throw new Error(`SMTP Delivery Failed: ${lastError?.message}`);
  } else {
    console.log(`[SMTP Email Service Notification] Saved message to MongoDB for ${name} (${email}). To activate real SMTP delivery to ${contactEmail}, set SMTP_USER and SMTP_PASSWORD in server/.env.`);
    return true;
  }
};
