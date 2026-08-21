import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';

export let inMemoryAdmin = null;

export const initSingleOwnerAdmin = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || 'sutararya.6336@gmail.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'AryaSutarAdmin@2026!';

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  inMemoryAdmin = {
    email: adminEmail,
    password: hashedPassword,
    role: 'OWNER'
  };

  try {
    const existingCount = await Admin.countDocuments({});
    if (existingCount === 0) {
      await Admin.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'OWNER'
      });
      console.log(`[Admin Seed] Single Owner Admin Account initialized: ${adminEmail}`);
    } else {
      console.log(`[Admin Seed] Owner Account already exists in MongoDB.`);
    }
  } catch (error) {
    console.log(`[Admin Seed] Running with fallback single owner account (${adminEmail}).`);
  }
};
