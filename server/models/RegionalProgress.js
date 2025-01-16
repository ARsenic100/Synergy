import mongoose from 'mongoose';

const goalMilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const regionalGoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  progress: { type: Number, default: 0 },
  milestones: [goalMilestoneSchema],
  state: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const RegionalGoal = mongoose.model('RegionalGoal', regionalGoalSchema);

export default RegionalGoal;