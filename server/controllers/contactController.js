import { Contact } from '../models/Contact.js';
import { sendContactEmail } from '../services/emailService.js';

let inMemoryContacts = [];
const lastSubmissionMap = new Map();

// POST /api/contact
export const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Field presence validation
    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error('Please fill in all required fields (Name, Email, Subject, Message)');
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedSubject = String(subject).trim();
    const trimmedMessage = String(message).trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      res.status(400);
      throw new Error('Fields cannot contain only whitespace');
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      res.status(400);
      throw new Error('Please provide a valid email address');
    }

    // 3. Length checks
    if (trimmedName.length > 100) {
      res.status(400);
      throw new Error('Name must be less than 100 characters');
    }

    if (trimmedSubject.length > 200) {
      res.status(400);
      throw new Error('Subject must be less than 200 characters');
    }

    if (trimmedMessage.length > 5000) {
      res.status(400);
      throw new Error('Message is too long. Maximum allowed limit is 5000 characters');
    }

    // 4. Anti-spam 10-second rate limiting
    const clientKey = req.ip || trimmedEmail;
    const lastSubmitTime = lastSubmissionMap.get(clientKey);
    const now = Date.now();
    if (lastSubmitTime && now - lastSubmitTime < 10000) {
      res.status(429);
      throw new Error('Please wait 10 seconds before submitting another message');
    }
    lastSubmissionMap.set(clientKey, now);

    // 5. Store message in MongoDB
    const newContact = {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage
    };

    let savedData;
    try {
      savedData = await Contact.create(newContact);
    } catch (dbErr) {
      console.warn('[Contact Controller DB Warning] MongoDB write fallback:', dbErr.message);
      newContact._id = Date.now().toString();
      newContact.createdAt = new Date().toISOString();
      inMemoryContacts.unshift(newContact);
      savedData = newContact;
    }

    // 6. Deliver email via Nodemailer SMTP
    try {
      await sendContactEmail({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage
      });
    } catch (smtpErr) {
      console.error('[SMTP Controller Error]', smtpErr.message || smtpErr);
      res.status(500);
      return res.json({
        success: false,
        message: 'Unable to send message. Please try again.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: savedData
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact (Admin/Private)
export const getContacts = async (req, res, next) => {
  try {
    try {
      const contacts = await Contact.find({}).sort({ createdAt: -1 });
      if (contacts) {
        return res.json({ success: true, count: contacts.length, data: contacts });
      }
    } catch (e) {
      // Fallback
    }
    return res.json({ success: true, count: inMemoryContacts.length, data: inMemoryContacts });
  } catch (error) {
    next(error);
  }
};
