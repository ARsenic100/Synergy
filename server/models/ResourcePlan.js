import mongoose, { Schema, Document } from 'mongoose';



const ResourcePlanSchema = new Schema({
  schoolId: { type: String, required: true },
  resourceType: { type: String, required: true },
  quantity: { type: Number, required: true },
  priority: { 
    type: String, 
    enum: ['critical', 'high', 'medium', 'low'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'modified'],
    default: 'pending'
  },
  estimatedCost: { type: Number, required: true },
  justification: { type: String },
  implementationStatus: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  utilizationRate: { type: Number },
  deliveryEfficiency: { type: Number },
  satisfactionScore: { type: Number }
}, {
  timestamps: true
});

export default mongoose.model('ResourcePlan', ResourcePlanSchema);