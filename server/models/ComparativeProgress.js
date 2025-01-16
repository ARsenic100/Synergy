import mongoose from 'mongoose';

const comparativeProgressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['district', 'school'],
    required: true
  },
  state: {
    type: String,
    required: true
  },
  metrics: {
    standardizationRate: {
      value: Number,
      change: Number
    },
    schoolsTransitioned: {
      value: Number,
      change: Number
    },
    resourceUtilization: {
      value: Number,
      change: Number
    },
    completionTime: {
      value: Number,
      change: Number
    }
  },
  progressDistribution: [{
    name: String,
    standardized: Number,
    inProgress: Number,
    pending: Number
  }],
  topPerformers: [{
    name: String,
    score: Number,
    change: Number
  }],
  insights: {
    strongPerformance: {
      entity: String,
      description: String
    },
    areasForImprovement: {
      entity: String,
      description: String
    },
    trendingUpward: {
      entity: String,
      description: String
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ComparativeProgress', comparativeProgressSchema);