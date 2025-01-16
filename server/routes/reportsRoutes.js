import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  generateReport,
  getReports,
  downloadReport,
  createCustomReport,
  deleteReport
} from '../controllers/reportsController.js';

const router = express.Router();

router.post('/generate', auth, generateReport);
router.get('/', auth, getReports);
router.get('/download/:id', auth, downloadReport);
router.post('/custom', auth, createCustomReport);
router.delete('/:id', auth, deleteReport);  // New delete endpoint

export default router;