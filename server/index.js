import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Route imports
import authRoutes from './routes/authRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import directoryRoutes from './routes/directoryRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import policyRoutes from './routes/policyRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import schooldetailRoutes from './routes/schoolDetailRoutes.js';
import regionalProgressRoutes from './routes/regionalProgressRoutes.js';
import schoolProgressRoutes from './routes/schoolProgressRoutes.js';
import comparativeProgressRoutes from './routes/comparativeProgressRoutes.js';
import challengesRoutes from './routes/challengesRoutes.js';
import reportRoutes from './routes/reportsRoutes.js';
import chatBotRoutes from './routes/chatBotRoutes.js';
import resourcePlanRoutes from './routes/resourcePlanRoutes.js';
import standardRoutes from './routes/standardRoutes.js';
import guideRoutes from './routes/guideRoutes.js';
import trainingRoutes from './routes/trainingRoutes.js';
import testRoutes from './routes/testRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI,{
  dbName: process.env.DB_NAME,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/regional-progress', regionalProgressRoutes);
app.use('/api/school-progress', schoolProgressRoutes);
app.use('/api/comparative-progress', comparativeProgressRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/school/details', schooldetailRoutes);
app.use('/api/chatbot', chatBotRoutes);
app.use('/api/resource-plans', resourcePlanRoutes);
app.use('/api/standardization', standardRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/test',testRoutes);
app.use('/api/activities', activityRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});