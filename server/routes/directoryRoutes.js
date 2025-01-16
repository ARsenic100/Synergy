import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  getStakeholders,
  createStakeholder,
  requestConnection,
  updateConnectionStatus
} from '../controllers/directoryController.js';

const router = express.Router();

router.get('/', getStakeholders);

router.post('/',
  auth,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('role').isIn(['School Administrator', 'Education Policy Expert', 'Teacher', 'Support Staff'])
      .withMessage('Invalid role'),
    body('organization').trim().notEmpty().withMessage('Organization is required'),
    body('contact.email').isEmail().withMessage('Valid email is required'),
    body('expertise').isArray().withMessage('Expertise must be an array')
  ],
  createStakeholder
);

router.post('/:id/connect', auth, requestConnection);

router.patch('/:id/connections/:userId',
  auth,
  [
    body('status').isIn(['accepted', 'rejected'])
      .withMessage('Invalid status')
  ],
  updateConnectionStatus
);

export default router;