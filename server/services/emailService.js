import nodemailer from 'nodemailer';

const getTransporter = () => {
  const smtpHost = process.env.SMTP_HOST || process.env.MAIL_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || process.env.MAIL_PORT) || 587;
  const smtpUser = (process.env.SMTP_USER || process.env.MAIL_USER || 'sutararya.6336@gmail.com').trim();
  let smtpPassword = (process.env.SMTP_PASSWORD || process.env.MAIL_PASSWORD || 'qqsupuopzvkwglry').trim().replace(/["'\s]/g, '');

  if (!smtpPassword || smtpPassword.toLowerCase().includes('your') || smtpPassword.toLowerCase().includes('placeholder')) {
    smtpPassword = 'qqsupuopzvkwglry';
  }

  const isSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

  if (smtpHost.includes('gmail') && smtpPort === 587) {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPassword
    }
  });
};

export const verifySMTPConnection = async () => {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT || '587';
  const smtpUser = (process.env.SMTP_USER || 'sutararya.6336@gmail.com').trim();

  const maskedUser = smtpUser ? `${smtpUser.substring(0, 3)}***@${smtpUser.split('@')[1] || 'gmail.com'}` : 'Not Configured';
  console.log(`[SMTP Diagnostic] Configuring Host: ${smtpHost}:${smtpPort}, User: ${maskedUser}`);

  try {
    const transporter = getTransporter();
    await transporter.verify();
    console.log('[SMTP Diagnostic] Transporter connection verification: SUCCESSFUL ✅');
    return true;
  } catch (err) {
    console.error(`[SMTP Diagnostic Error] Connection verification FAILED: ${err.message}`);
    return false;
  }
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const smtpUser = (process.env.SMTP_USER || 'sutararya.6336@gmail.com').trim();
  const contactEmail = (process.env.CONTACT_EMAIL || 'sutararya.6336@gmail.com').trim();

  console.log(`[Contact API SMTP] Preparing email dispatch from "${name}" <${email}>`);
  console.log(`[Contact API SMTP] Recipient (CONTACT_EMAIL): ${contactEmail}`);

  try {
    const transporter = getTransporter();

    const plainTextBody = `New Portfolio Contact\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;

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
      subject: `Portfolio Contact: ${subject}`,
      text: plainTextBody,
      html: htmlBody
    };

    console.log('[Contact API SMTP] ATTEMPTING SMTP SEND via transporter.sendMail()...');
    const info = await transporter.sendMail(mailOptions);

    console.log('[Contact API SMTP SEND RESULT]:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });

    return {
      success: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    };
  } catch (err) {
    console.error(`[Contact API SMTP ERROR] Failed to send email: ${err.message}`);
    return {
      success: false,
      error: err.message
    };
  }
};

