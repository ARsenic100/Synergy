// Scheduled job setup for deleting old messages
import { deleteOldInteractions } from '../controllers/chatbotController.js';
import cron from 'node-cron';

cron.schedule('0 * * * *', deleteOldInteractions); // Runs every hour