import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { inMemoryAdmin } from '../config/initAdmin.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers['x-admin-token']) {
    token = req.headers['x-admin-token'];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized access: No token provided' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'arya_sutar_jwt_private_key_secure_2026';
    const decoded = jwt.verify(token, jwtSecret);

    try {
      const dbAdmin = await Admin.findById(decoded.id).select('-password');
      if (dbAdmin) {
        req.admin = dbAdmin;
        return next();
      }
    } catch (e) {
      // Fallback
    }

    if (inMemoryAdmin && decoded.email === inMemoryAdmin.email) {
      req.admin = { email: inMemoryAdmin.email, role: 'OWNER' };
      return next();
    }

    return res.status(401).json({ success: false, message: 'Unauthorized access: Invalid owner token' });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized access: Token expired or invalid' });
  }
};
