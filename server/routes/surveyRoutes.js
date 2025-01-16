import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  getSurveys,
  createSurvey,
  submitResponse,
  getSurveyAnalytics
} from '../controllers/surveyController.js';

const router = express.Router();

router.get('/', getSurveys);

router.post('/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('questions').isArray().withMessage('Questions must be an array'),
    body('questions.*.question').trim().notEmpty().withMessage('Question text is required'),
    body('questions.*.type').isIn(['multiple-choice', 'text', 'rating'])
      .withMessage('Invalid question type'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required')
  ],
  createSurvey
);

router.post('/:id/responses',
  auth,
  [
    body('answers').isArray().withMessage('Answers must be an array'),
    body('answers.*.question').isMongoId().withMessage('Valid question ID is required'),
    body('answers.*.answer').notEmpty().withMessage('Answer is required')
  ],
  submitResponse
);

router.get('/:id/analytics', auth, getSurveyAnalytics);

export default router;