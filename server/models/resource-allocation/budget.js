import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  total_budget: {
    type: Number,
    required: true
  },
  allocated_budget: {
    type: Number,
    required: true
  },
  spent_budget: {
    type: Number,
    required: true
  },
  savings: {
    type: Number,
    default: 0
  },
  fiscal_year: {
    type: String,
    required: true
  },
  utilization_rate: {
    type: Number,
    default: 0
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

export default mongoose.model('Budget', budgetSchema);