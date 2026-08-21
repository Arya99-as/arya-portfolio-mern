import express from 'express';
import { getPortfolioStats } from '../controllers/statsController.js';

const router = express.Router();

router.get('/', getPortfolioStats);

export default router;
