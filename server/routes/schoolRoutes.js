import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  getAllSchools,
  getSchoolById,
  addSchool,
  updateSchool,
  deleteSchool,
  getSchoolComparison
} from '../controllers/schoolController.js';

const router = express.Router();

// Get all schools
router.get('/', auth, getAllSchools);

// Get a school by ID
router.get('/:id', auth, getSchoolById);

// Get school comparison data
router.get('/:id/comparison', auth, getSchoolComparison);

// Add a new school
router.post(
  '/',
  auth,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('district').trim().notEmpty().withMessage('District is required'),
    body('currentStructure')
      .optional()
      .isIn(['Odd Structure', 'Standard Structure'])
      .withMessage('Invalid current structure'),
    body('recommendedStructure')
      .optional()
      .isIn(['Odd Structure', 'Standard Structure'])
      .withMessage('Invalid recommended structure'),
    body('transitionStatus')
      .optional()
      .isIn(['pending', 'in-progress', 'completed'])
      .withMessage('Invalid transition status'),
    body('performanceBand')
      .isIn(['Excellent', 'Good', 'Average', 'Poor'])
      .withMessage('Invalid performance band'),
    body('studentCount').isInt({ min: 0 }).withMessage('Invalid student count'),
    body('teacherCount').isInt({ min: 0 }).withMessage('Invalid teacher count'),
    body('coordinates.lat').isFloat().withMessage('Invalid latitude'),
    body('coordinates.lng').isFloat().withMessage('Invalid longitude'),
    body('facilities').isArray().withMessage('Facilities must be an array'),
    body('type')
      .isIn(['government', 'private', 'aided', 'unaided'])
      .withMessage('Invalid school type'),

    body('qualityScore').isInt({ min: 0, max: 100 }).withMessage('Invalid quality score'),
  ],
  addSchool
);

// Update school details
router.patch(
  '/:id',
  auth,
  [
    body('name').optional().trim().notEmpty(),
    body('state').optional().trim().notEmpty(),
    body('district').optional().trim().notEmpty(),
    body('currentStructure')
      .optional()
      .isIn(['Odd Structure', 'Standard Structure']),
    body('recommendedStructure')
      .optional()
      .isIn(['Odd Structure', 'Standard Structure']),
    body('transitionStatus')
      .optional()
      .isIn(['pending', 'in-progress', 'completed']),
    body('performanceBand')
      .optional()
      .isIn(['Excellent', 'Good', 'Average', 'Poor']),
    body('studentCount').optional().isInt({ min: 0 }),
    body('teacherCount').optional().isInt({ min: 0 }),
    body('facilities').optional().isArray(),
    body('type').optional().isIn(['government', 'private', 'aided', 'unaided']),
    body('qualityScore').optional().isInt({ min: 0, max: 100 }),
    body('coordinates.lat').optional().isFloat(),
    body('coordinates.lng').optional().isFloat(),
  ],
  updateSchool
);

// Delete a school
router.delete('/:id', auth, deleteSchool);

export default router;