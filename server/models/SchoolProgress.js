import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'upcoming'],
    default: 'upcoming'
  },
  completedAt: Date,
  dueDate: Date,
  description: String,
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

const recommendationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  impact: String,
  status: {
    type: String,
    enum: ['pending', 'implemented', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const progressMetricsSchema = new mongoose.Schema({
  overall: {
    current: Number,
    previous: Number
  },
  infrastructure: {
    current: Number,
    previous: Number
  },
  staffTraining: {
    current: Number,
    previous: Number
  },
  compliance: {
    current: Number,
    previous: Number
  },
  calculatedAt: {
    type: Date,
    default: Date.now
  }
});

const schoolProgressSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  metrics: progressMetricsSchema,
  milestones: [milestoneSchema],
  recommendations: [recommendationSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
schoolProgressSchema.index({ schoolId: 1 });

export default mongoose.model('SchoolProgress', schoolProgressSchema);