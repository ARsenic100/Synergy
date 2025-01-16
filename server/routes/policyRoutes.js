import express from 'express';
import { body } from 'express-validator';
import { auth} from '../middleware/auth.js';
import {
  getPolicies,
  createPolicy,
  updatePolicy,
  getPolicy,
  archivePolicy
} from '../controllers/policyController.js';

const router = express.Router();

// Get all policies
router.get('/', auth, getPolicies);

// Get specific policy
router.get('/:id', auth, getPolicy);

// Create new policy
router.post('/',
  [auth],
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('summary').trim().notEmpty().withMessage('Summary is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').isIn(['infrastructure', 'academic', 'administrative'])
      .withMessage('Invalid category'),
    body('importance').isIn(['low', 'medium', 'high'])
      .withMessage('Invalid importance level'),
    body('effectiveDate').isISO8601().withMessage('Valid effective date is required')
  ],
  createPolicy
);

// Update policy
router.patch('/:id',
  [auth],
  updatePolicy
);

// Archive policy
router.patch('/:id/archive',
  [auth],
  archivePolicy
);

export default router;