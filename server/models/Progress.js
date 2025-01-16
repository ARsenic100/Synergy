import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  metrics: {
    utilizationRate: Number,
    implementationProgress: Number,
    deliveryEfficiency: Number,
    satisfactionScore: Number
  },
  milestones: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'pending'],
      default: 'pending'
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  }],
  trends: [{
    metric: String,
    value: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Progress', progressSchema);