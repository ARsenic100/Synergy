import express from 'express';
import { auth } from '../middleware/auth.js';
import { getComparativeAnalysis } from '../controllers/comparativeProgressController.js';

const router = express.Router();

router.get('/analysis', auth, getComparativeAnalysis);

export default router;