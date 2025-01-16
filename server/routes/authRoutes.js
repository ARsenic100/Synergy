import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import {
  register,
  login,
  getProfile,
  updateProfile,
  resetPassword,
  getPendingApprovals,
  approveUser,
  rejectUser
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', upload.single('document'), register);
router.post('/login', login);

// authed routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/reset-password', auth, resetPassword);

// Admin routes
router.get(
  '/pending-approvals',
  auth,
  authorize('SUPER_ADMIN'),
  getPendingApprovals
);
router.put(
  '/approve/:userId',
  auth,
  authorize('SUPER_ADMIN', 'SCHOOL_ADMIN'),
  approveUser
);
router.delete(
  '/reject/:userId',
  auth,
  authorize('SUPER_ADMIN', 'SCHOOL_ADMIN'),
  rejectUser
);

export default router;