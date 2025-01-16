import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  getEvents,
  createEvent,
  registerForEvent,
  cancelRegistration
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);

router.post('/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid start time is required'),
    body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid end time is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('type').isIn(['online', 'in-person', 'hybrid']).withMessage('Invalid event type'),
    body('registrationDeadline').isISO8601().withMessage('Valid registration deadline is required')
  ],
  createEvent
);

router.post('/:id/register', auth, registerForEvent);
router.delete('/:id/register', auth, cancelRegistration);

export default router;