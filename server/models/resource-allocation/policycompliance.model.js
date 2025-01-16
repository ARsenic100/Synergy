// models/PolicyCompliance.ts
import mongoose from "mongoose";

const PolicyComplianceSchema = new mongoose.Schema({
  regionCode: { type: String, required: true },
  metric: { 
    type: String, 
    enum: ['Resource Distribution', 'Equity Measures'],
    required: true 
  },
  compliancePercentage: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100 
  },
  lastUpdated: { type: Date, default: Date.now }
});

export const PolicyCompliance = mongoose.model("PolicyCompliance", PolicyComplianceSchema);
