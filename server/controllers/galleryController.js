import { Gallery } from '../models/Gallery.js';
import { initialGalleryData } from '../seed.js';

let inMemoryGallery = [...(initialGalleryData || [])];

// GET /api/gallery
export const getGallery = async (req, res, next) => {
  try {
    try {
      let dbItems = await Gallery.find({}).sort({ createdAt: -1 });
      if (dbItems && dbItems.length > 0) {
        return res.json({ success: true, count: dbItems.length, data: dbItems });
      }
    } catch (e) {
      // Fallback
    }
    return res.json({ success: true, count: inMemoryGallery.length, data: inMemoryGallery });
  } catch (error) {
    next(error);
  }
};

// POST /api/gallery
export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, category, image, description, featured } = req.body;

    if (!title || !image) {
      res.status(400);
      throw new Error('Title and image URL/path are required for gallery items');
    }

    const newItem = {
      _id: Date.now().toString(),
      title,
      category: category || 'Projects',
      image,
      description: description || '',
      featured: Boolean(featured),
      createdAt: new Date().toISOString()
    };

    try {
      const created = await Gallery.create(newItem);
      return res.status(201).json({ success: true, message: 'Gallery item created successfully', data: created });
    } catch (e) {
      inMemoryGallery.unshift(newItem);
      return res.status(201).json({ success: true, message: 'Gallery item created successfully', data: newItem });
    }
  } catch (error) {
    next(error);
  }
};

// DELETE /api/gallery/:id
export const deleteGalleryItem = async (req, res, next) => {
  try {
    try {
      const item = await Gallery.findById(req.params.id);
      if (item) {
        await item.deleteOne();
        return res.json({ success: true, message: 'Gallery item deleted successfully' });
      }
    } catch (e) {
      // Fallback
    }

    const index = inMemoryGallery.findIndex((i) => i._id === req.params.id || i.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error('Gallery item not found');
    }

    inMemoryGallery.splice(index, 1);
    return res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
