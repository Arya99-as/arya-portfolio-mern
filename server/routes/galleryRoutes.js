import express from 'express';
import {
  getGallery,
  createGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', createGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router;
