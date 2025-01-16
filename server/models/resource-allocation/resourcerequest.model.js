// models/ResourceRequest.ts
import mongoose from "mongoose";

const ResourceMatchSchema = new mongoose.Schema({
  requestingSchoolId: { type: String, required: true },
  matchedSchoolId: { type: String, required: true },
  resourceType: { type: String, required: true },
  matchScore: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});


const SharedResourceSchema = new mongoose.Schema({
  schoolId: { type: String, required: true },
  resourceType: { type: String, required: true },
  totalQuantity: { type: Number, required: true },
  sharedQuantity: { type: Number, required: true },
  availableFrom: { type: Date },
  availableTo: { type: Date },
  status: {
    type: String,
    enum: ['available', 'shared', 'unavailable'],
    default: 'available'
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ResourceRequestSchema = new mongoose.Schema({
  schoolUdiseCode: { type: String, required: true },
  requestType: { 
    type: String, 
    enum: ['Infrastructure', 'Teaching Staff', 'Technology', 'Learning Materials','Others'],
    required: true 
  },
  extra: {
    type: String,
    default: 'none',
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'],
    required: true,
    default: 'pending'
  },
  estimatedcost: {type: Number,required: true},
  quantity: { type: Number, required: true },
  priority: { 
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true 
  },
  aiAnalysis: {
    urgencyScore: { type: Number },
    predictedNeed: { type: Number },
    contextScore: { type: Number },
    averageScore: { type: Number },
    recommendations: [{ type: String }],
    lastAnalyzed: { type: Date }
  },
  resourceMatches: [ResourceMatchSchema],
  sharedResources: [SharedResourceSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const ResourceRequest = mongoose.model("ResourceRequest", ResourceRequestSchema);
export const SharedResource = mongoose.model('SharedResource', SharedResourceSchema);
