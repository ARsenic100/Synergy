import mongoose from 'mongoose';

const communityFeedbackSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['improvement', 'issue'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'addressed', 'investigating'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  },
  response: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
});

export default mongoose.model('CommunityFeedback', communityFeedbackSchema);