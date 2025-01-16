import mongoose from 'mongoose';

// Item Schema
const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCritical: Boolean,
  isCompleted: { type: Boolean, default: false },
  recommendation: String
});

// Category Schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Infrastructure Requirements', 'Staffing Requirements', 'Curriculum Standards', 'Digital Infrastructure']
  },
  items: [ItemSchema]
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);