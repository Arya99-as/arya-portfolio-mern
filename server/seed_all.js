import mongoose from 'mongoose';
import { Project } from './models/Project.js';
import { Achievement } from './models/Achievement.js';
import { Gallery } from './models/Gallery.js';
import { Contact } from './models/Contact.js';
import { initialProjectsData, initialAchievementsData, initialGalleryData } from './seed.js';

async function seedAll() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/portfolio_db');
    console.log('[Seed] Connected to MongoDB portfolio_db...');

    // Seed Projects
    const pCount = await Project.countDocuments();
    if (pCount === 0) {
      await Project.insertMany(initialProjectsData);
      console.log('[Seed] Seeded Projects collection.');
    }

    // Seed Achievements
    const aCount = await Achievement.countDocuments();
    if (aCount === 0) {
      await Achievement.insertMany(initialAchievementsData);
      console.log('[Seed] Seeded Achievements collection.');
    }

    // Seed Gallery
    const gCount = await Gallery.countDocuments();
    if (gCount === 0) {
      await Gallery.insertMany(initialGalleryData);
      console.log('[Seed] Seeded Gallery collection.');
    }

    // Seed Contact
    const cCount = await Contact.countDocuments();
    if (cCount === 0) {
      await Contact.create({
        name: 'John Doe (Recruiter)',
        email: 'recruiter@techcompany.com',
        subject: 'Software Engineer Role Inquiry',
        message: 'Hello Arya, we reviewed your portfolio and would love to discuss an engineering role.'
      });
      console.log('[Seed] Seeded Contact collection.');
    }

    console.log('[Seed] All collections successfully seeded in MongoDB!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('[Seed Error]', err.message);
  }
}

seedAll();
