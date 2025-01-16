import mongoose from 'mongoose';

const directorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['School Administrator', 'Education Policy Expert', 'Teacher', 'Support Staff']
  },
  organization: {
    type: String,
    required: true
  },
  location: {
    state: String,
    district: String,
    address: String
  },
  contact: {
    email: {
      type: String,
      required: true
    },
    phone: String
  },
  expertise: [{
    type: String
  }],
  imageUrl: String,
  connections: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  }
}, {
  timestamps: true
});

export default mongoose.model('Directory', directorySchema);