import mongoose from 'mongoose';

const resourceAllocationSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Infrastructure', 'Technology', 'Teaching Staff', 'Learning Materials']
  },
  allocated_amount: {
    type: Number,
    required: true
  },
  utilized_amount: {
    type: Number,
    required: true
  },
  fiscal_year: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ResourceAllocation', resourceAllocationSchema);