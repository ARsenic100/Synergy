import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  getResources,
  createResource,
  downloadResource,
  toggleLike,
  recordView
} from '../controllers/resourceController.js';

const router = express.Router();

router.get('/', getResources);

router.post('/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('type').trim().notEmpty().withMessage('Type is required'),
    body('category').isIn(['template', 'guide', 'case-study', 'report']).withMessage('Invalid category'),
    body('fileUrl').trim().notEmpty().withMessage('File URL is required'),
    body('fileSize').trim().notEmpty().withMessage('File size is required')
  ],
  createResource
);

router.post('/:id/download', auth, downloadResource);
router.post('/:id/like', auth, toggleLike);
router.post('/:id/view', auth, recordView);

export default router;