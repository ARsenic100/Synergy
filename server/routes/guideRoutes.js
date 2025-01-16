import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getAllGuides,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
  updateStepStatus,
  updateCheckpoint
} from '../controllers/guideController.js';

const router = express.Router();

router.get('/',  getAllGuides);
router.get('/:id',  getGuideById);
router.post('/',  createGuide);
router.patch('/:id',  updateGuide);
router.delete('/:id',  deleteGuide);
router.patch('/step/status',  updateStepStatus);
router.patch('/step/checkpoint',  updateCheckpoint);

export default router;