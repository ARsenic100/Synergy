import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  analyzeSchoolData
} from '../controllers/challengesController.js';

const router = express.Router();

router.get('/', getChallenges);
router.post('/', createChallenge);
router.patch('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);
router.post('/analyze', analyzeSchoolData);

export default router;