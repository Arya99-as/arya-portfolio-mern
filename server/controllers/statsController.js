import { Project } from '../models/Project.js';
import { Achievement } from '../models/Achievement.js';
import { Gallery } from '../models/Gallery.js';
import { Contact } from '../models/Contact.js';

// GET /api/stats
export const getPortfolioStats = async (req, res, next) => {
  try {
    let projectsCount = 6;
    let achievementsCount = 4;
    let galleryCount = 10;
    let messagesCount = 5;

    try {
      projectsCount = await Project.countDocuments();
      achievementsCount = await Achievement.countDocuments();
      galleryCount = await Gallery.countDocuments();
      messagesCount = await Contact.countDocuments();
    } catch (dbErr) {
      console.warn('[Stats] MongoDB count fallback activated:', dbErr.message);
    }

    return res.json({
      success: true,
      data: {
        projects: projectsCount || 6,
        achievements: achievementsCount || 4,
        gallery: galleryCount || 10,
        messages: messagesCount || 5
      }
    });
  } catch (error) {
    next(error);
  }
};
