import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  getAchievements,
  awardAchievement,
  shareAchievement,
  getAllAcheivements
} from '../controllers/achievementController.js';

const router = express.Router();

router.get('/:userId', auth, getAchievements);

router.post('/:userId',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').isIn(['infrastructure', 'engagement', 'academic', 'compliance'])
      .withMessage('Invalid category'),
    body('points').isInt({ min: 0 }).withMessage('Points must be a positive number'),
    body('icon').trim().notEmpty().withMessage('Icon is required')
  ],
  awardAchievement
);

router.post('/:id/share', auth, shareAchievement);

router.get('/:schoolId',getAllAcheivements);

export default router;