import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  subsections: [{
    heading: {
      type: String,
      trim: true
    },
    content: {
      type: String
    }
  }]
});

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['progress', 'resource', 'analysis'],
    required: true
  },
  content: {
    type: [sectionSchema],
    required: true
  },
  format: {
    type: String,
    enum: ['PDF', 'Excel'],
    default: 'PDF'
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  downloadUrl: String,
  size: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Report', reportSchema);