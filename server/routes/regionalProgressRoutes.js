import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getRegionalMetrics,
  getStateComparison,
  getRegionalChallenges,
  getRegionalGoals,
  addRegionalGoal,
  updateGoalProgress
} from '../controllers/regionalProgressController.js';

const router = express.Router();

router.get('/metrics/:state', auth, getRegionalMetrics);
router.get('/comparison', auth, getStateComparison);
router.get('/challenges/:state', auth, getRegionalChallenges);
router.get('/goals/:state', auth, getRegionalGoals);
router.post('/goals', auth, addRegionalGoal);
router.patch('/goals/:goalId', auth, updateGoalProgress);

export default router;