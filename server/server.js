import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { initSingleOwnerAdmin } from './config/initAdmin.js';
import projectRoutes from './routes/projectRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;

// Connect Database & Initialize Admin Owner Account
connectDB().then(() => {
  initSingleOwnerAdmin();
});

// Middleware
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:5173'] : '*';
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Serve static frontend files if production build exists
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '..')));

// REST API Endpoints
app.use('/api/projects', projectRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

// API Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Arya A. Sutar Portfolio MERN Backend API running',
    timestamp: new Date().toISOString()
  });
});

// Centralized Error Handler Middleware
app.use(errorHandler);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Express Backend] Server listening on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.log(`[Express Backend] Port ${PORT} busy, retrying on port ${fallbackPort}...`);
    app.listen(fallbackPort, '0.0.0.0', () => {
      console.log(`[Express Backend] Server listening on port ${fallbackPort}`);
    });
  }
});
