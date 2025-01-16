import mongoose from 'mongoose';

const challengeMetricsSchema = new mongoose.Schema({
  criticalIssues: {
    type: Number,
    required: true,
    default: 0
  },
  openChallenges: {
    type: Number,
    required: true,
    default: 0
  },
  resolvedThisMonth: {
    type: Number,
    required: true,
    default: 0
  },
  lastAnalyzed: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ChallengeMetrics', challengeMetricsSchema);