import { Achievement } from '../models/Achievement.js';
import { initialAchievementsData } from '../seed.js';

let inMemoryAchievements = [...(initialAchievementsData || [])];

// GET /api/achievements
export const getAchievements = async (req, res, next) => {
  try {
    try {
      let dbItems = await Achievement.find({}).sort({ createdAt: -1 });
      if (dbItems && dbItems.length > 0) {
        return res.json({ success: true, count: dbItems.length, data: dbItems });
      }
    } catch (e) {
      // Fallback
    }
    return res.json({ success: true, count: inMemoryAchievements.length, data: inMemoryAchievements });
  } catch (error) {
    next(error);
  }
};

// POST /api/achievements (Admin/Public)
export const createAchievement = async (req, res, next) => {
  try {
    const { title, description, organization, date, image, ribbon, ribbonClass, cardClass, icon, event } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Title and description are required for an achievement');
    }

    const newItem = {
      _id: Date.now().toString(),
      title,
      description,
      organization: organization || event || 'D.Y. Patil College of Engineering and Technology',
      event: event || organization || '',
      date: date || '2026',
      image: image || '',
      ribbon: ribbon || '🥇 1st Prize',
      ribbonClass: ribbonClass || 'gold',
      cardClass: cardClass || 'gold-badge',
      icon: icon || '🏆',
      createdAt: new Date().toISOString()
    };

    try {
      const created = await Achievement.create(newItem);
      return res.status(201).json({ success: true, message: 'Achievement created successfully', data: created });
    } catch (e) {
      inMemoryAchievements.unshift(newItem);
      return res.status(201).json({ success: true, message: 'Achievement created successfully', data: newItem });
    }
  } catch (error) {
    next(error);
  }
};

// PUT /api/achievements/:id
export const updateAchievement = async (req, res, next) => {
  try {
    try {
      const item = await Achievement.findById(req.params.id);
      if (item) {
        Object.assign(item, req.body);
        const updated = await item.save();
        return res.json({ success: true, message: 'Achievement updated successfully', data: updated });
      }
    } catch (e) {
      // Fallback
    }

    const index = inMemoryAchievements.findIndex((i) => i._id === req.params.id || i.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error('Achievement not found');
    }

    inMemoryAchievements[index] = { ...inMemoryAchievements[index], ...req.body };
    return res.json({ success: true, message: 'Achievement updated successfully', data: inMemoryAchievements[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/achievements/:id
export const deleteAchievement = async (req, res, next) => {
  try {
    try {
      const item = await Achievement.findById(req.params.id);
      if (item) {
        await item.deleteOne();
        return res.json({ success: true, message: 'Achievement deleted successfully' });
      }
    } catch (e) {
      // Fallback
    }

    const index = inMemoryAchievements.findIndex((i) => i._id === req.params.id || i.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error('Achievement not found');
    }

    inMemoryAchievements.splice(index, 1);
    return res.json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error) {
    next(error);
  }
};
