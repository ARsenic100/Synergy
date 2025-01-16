import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  getDiscussions,
  createDiscussion,
  getDiscussion,
  addReply,
  toggleLike
} from '../controllers/discussionController.js';

const router = express.Router();

// Get all discussions
router.get('/', getDiscussions);

// Create a new discussion
router.post('/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').isIn(['discussion', 'question', 'announcement'])
      .withMessage('Invalid category'),
    body('tags').isArray().withMessage('Tags must be an array')
  ],
  createDiscussion
);

// Get a specific discussion
router.get('/:id', getDiscussion);

// Add a reply to a discussion
router.post('/:id/replies',
  auth,
  [
    body('content').trim().notEmpty().withMessage('Reply content is required')
  ],
  addReply
);

// Toggle like on a discussion
router.post('/:id/like', auth, toggleLike);

export default router;