import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  totalSchools: { type: Number, required: true },
  budgetAllocated: { type: Number, required: true },
  budgetUtilized: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

export const Region = mongoose.model("Region", RegionSchema);
