import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getSchoolProgress,
  updateMilestone,
  getRecentActivity
} from '../controllers/schoolProgressController.js';

const router = express.Router();

router.get('/:schoolId', auth, getSchoolProgress);
router.patch('/:schoolId/milestones/:milestoneId', auth, updateMilestone);
router.get('/:schoolId/activity', auth, getRecentActivity);

export default router;