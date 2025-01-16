import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: String,
  url: String
});

const checkpointSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const stepSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  duration: String,
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  },
  content: String,
  resources: [resourceSchema],
  checkpoints: [checkpointSchema]
});

const guideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['infrastructure', 'academic', 'administrative'],
    required: true
  },
  estimatedDuration: String,
  steps: [stepSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Guide', guideSchema);