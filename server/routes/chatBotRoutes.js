import express from 'express';
import { askFromPDF } from '../controllers/chatbotController.js';
const router = express.Router();

router.post('/ask-pdf', askFromPDF);

export default router;