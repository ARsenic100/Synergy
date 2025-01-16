import mongoose from "mongoose";

const fundingSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    // required: true
  },
  value: {
    type: Number,
    required: true,
  },
  fiscal_year: {
    type: String,
    // required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("FundingSource", fundingSourceSchema);
