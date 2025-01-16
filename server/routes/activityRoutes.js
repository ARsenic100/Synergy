import express from 'express';
// import {trackA}
import { trackActivity, getRecentActivities } from '../controllers/activityController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, trackActivity);
router.get('/recent', auth, getRecentActivities);

export default router;