import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
    enum: ['infrastructure', 'engagement', 'academic', 'compliance'],
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  earnedDate: {
    type: Date,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  shared: {
    type: Boolean,
    default: false
  },
  shareDate: Date,
  criteria: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

export default mongoose.model('Achievement', achievementSchema);