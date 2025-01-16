// models/ResourceUtilization.ts
import mongoose from "mongoose";

const ResourceUtilizationSchema = new mongoose.Schema({
  schoolUdiseCode: { type: String, required: true },
  resourceType: { 
    type: String, 
    enum: ['Infrastructure', 'Teaching Staff', 'Technology', 'Learning Materials'],
    required: true 
  },
  utilizationPercentage: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100 
  },
  lastUpdated: { type: Date, default: Date.now }
});

export const ResourceUtilization = mongoose.model("ResourceUtilization", ResourceUtilizationSchema);
