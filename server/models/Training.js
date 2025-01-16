import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  }
});

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topics: [topicSchema],
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['basic', 'intermediate', 'advanced'],
      required: true,
    },
    completionRate: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Training', trainingSchema);