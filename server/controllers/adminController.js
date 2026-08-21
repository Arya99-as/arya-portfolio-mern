import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { Contact } from '../models/Contact.js';
import { Project } from '../models/Project.js';
import { inMemoryAdmin } from '../config/initAdmin.js';

const generateToken = (id, email) => {
  const secret = process.env.JWT_SECRET || 'arya_sutar_jwt_private_key_secure_2026';
  return jwt.sign({ id, email, role: 'OWNER' }, secret, {
    expiresIn: '24h'
  });
};

// POST /api/admin/login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const inputEmail = email.trim().toLowerCase();

    // Check DB Admin
    let dbAdmin = null;
    try {
      dbAdmin = await Admin.findOne({ email: inputEmail });
    } catch (e) {
      // Fallback
    }

    if (dbAdmin) {
      const isMatch = await dbAdmin.matchPassword(password);
      if (isMatch) {
        const token = generateToken(dbAdmin._id, dbAdmin.email);
        return res.json({
          success: true,
          message: 'Authentication successful',
          token,
          user: { email: dbAdmin.email, role: dbAdmin.role }
        });
      }
    }

    // Check In-Memory Admin Fallback
    if (inMemoryAdmin && inputEmail === inMemoryAdmin.email.toLowerCase()) {
      const isMatch = await bcrypt.compare(password, inMemoryAdmin.password);
      if (isMatch) {
        const token = generateToken('owner_static_id', inMemoryAdmin.email);
        return res.json({
          success: true,
          message: 'Authentication successful',
          token,
          user: { email: inMemoryAdmin.email, role: 'OWNER' }
        });
      }
    }

    // Generic Security Failure Message
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/me
export const getAdminProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.admin
  });
};

// GET /api/admin/dashboard
export const getDashboardStats = async (req, res, next) => {
  try {
    let projectCount = 3;
    let messageCount = 0;

    try {
      projectCount = await Project.countDocuments({});
      messageCount = await Contact.countDocuments({});
    } catch (e) {
      // Fallback
    }

    res.json({
      success: true,
      stats: {
        totalProjects: projectCount,
        totalMessages: messageCount,
        ownerStatus: 'ACTIVE_ONLINE',
        lastLogin: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};
