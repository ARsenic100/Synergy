import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['discussions', 'surveys', 'policies', 'directory', 'events', 'resources', 'progress', 'achievements', 'support'],
    required: true
  },
  action: {
    type: String,
    enum: ['view', 'create', 'update', 'delete'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ type: 1, createdAt: -1 });

export default mongoose.model('Activity', activitySchema);