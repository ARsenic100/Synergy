import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getStateProgress,
  getKeyMetrics,
  getTransitionTrends,
  getInsights
} from '../controllers/progressController.js';

const router = express.Router();

router.get('/state-progress', auth, getStateProgress);
router.get('/key-metrics', auth, getKeyMetrics);
router.get('/transition-trends', auth, getTransitionTrends);
router.get('/insights', auth, getInsights);

export default router;