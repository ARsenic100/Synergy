import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import { validateObjectId, handleValidationErrors } from '../middleware/validators.js';
import {
  createTicket,
  getTickets,
  updateTicket,
  addComment,
} from '../controllers/supportController.js';

const router = express.Router();

// Get all tickets (with optional query filters)
router.get('/tickets', auth, getTickets);

// Create a new ticket
router.post(
  '/tickets',
  auth,
  [
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category')
      .isIn(['technical', 'account', 'policy', 'other'])
      .withMessage('Invalid category'),
    body('priority')
      .isIn(['low', 'medium', 'high'])
      .withMessage('Invalid priority'),
  ],
  handleValidationErrors,
  createTicket
);

// Update a ticket (partial updates allowed)
router.patch(
  '/tickets/:id',
  auth,
  validateObjectId,
  [
    body('status')
      .optional()
      .isIn(['open', 'in-progress', 'resolved', 'closed'])
      .withMessage('Invalid status'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Invalid priority'),
  ],
  handleValidationErrors,
  updateTicket
);

// Add a comment to a ticket
router.post(
  '/tickets/:id/comments',
  auth,
  validateObjectId,
  [body('content').trim().notEmpty().withMessage('Comment content is required')],
  handleValidationErrors,
  addComment
);

export default router;
