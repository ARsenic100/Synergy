import express from 'express';
import { askFromPDF } from '../controllers/chatbotController.js';

const router = express.Router();

router.post("/analyze",askFromPDF);

export default router;