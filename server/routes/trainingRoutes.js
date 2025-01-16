import express from 'express';
import {
  getAllTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
  updateTopicStatus
} from '../controllers/trainingController.js';

const router = express.Router();

router.get('/', getAllTrainings);
router.get('/:id', getTrainingById);
router.post('/', createTraining);
router.patch('/:id', updateTraining);
router.delete('/:id', deleteTraining);
router.patch('/:id/topics/:topicId', updateTopicStatus);

export default router;