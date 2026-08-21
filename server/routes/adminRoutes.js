import express from 'express';
import { adminLogin, getAdminProfile, getDashboardStats } from '../controllers/adminController.js';
import { getContacts } from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public login route
router.post('/login', adminLogin);

// Protected Admin Routes
router.get('/me', protectAdmin, getAdminProfile);
router.get('/dashboard', protectAdmin, getDashboardStats);
router.get('/messages', protectAdmin, getContacts);

export default router;
