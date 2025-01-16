import mongoose from 'mongoose';

// Schema for historical data
const historyEntrySchema = new mongoose.Schema({
  currentStructure: {
    type: String,
    enum: ['Odd Structure', 'Standard Structure'],
  },
  recommendedStructure: {
    type: String,
    enum: ['Odd Structure', 'Standard Structure'],
  },
  transitionStatus: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
  },
  performanceBand: {
    type: String,
    enum: ['Excellent', 'Good', 'Average', 'Poor'],
  },
  studentCount: {
    type: Number,
    min: 0,
  },
  teacherCount: {
    type: Number,
    min: 0,
  },
  type:{
    type: String,
    enum: ['government', 'private', 'aided', 'unaided'],
  },
  facilities: {
    type: [String],
  },
  qualityScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  updatedAt: {
    type: Date,
    required: true,
  }
});

const schoolSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SchoolDetail',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    currentStructure: {
      type: String,
      enum: ['Odd Structure', 'Standard Structure'],
      default: 'Odd Structure',
    },
    recommendedStructure: {
      type: String,
      enum: ['Odd Structure', 'Standard Structure'],
      default: 'Standard Structure',
    },
    transitionStatus: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    performanceBand: {
      type: String,
      enum: ['Excellent', 'Good', 'Average', 'Poor'],
      required: true,
    },
    qualityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    studentCount: {
      type: Number,
      required: true,
      min: 0,
    },
    teacherCount: {
      type: Number,
      required: true,
      min: 0,
    },
    facilities: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ['government', 'private', 'aided', 'unaided'],
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    schoolUDISECode:{
      type: String,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    history: [historyEntrySchema]
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to manage history
schoolSchema.pre('save', function(next) {
  const school = this;
  
  // If this is a new document, skip history creation
  if (school.isNew) {
    return next();
  }

  // Check if a month has passed since the last history entry
  const lastHistoryEntry = school.history[0];
  if (lastHistoryEntry) {
    const lastUpdateDate = new Date(lastHistoryEntry.updatedAt);
    const currentDate = new Date();
    
    // Only add to history if last entry is from a different month
    if (lastUpdateDate.getMonth() === currentDate.getMonth() &&
        lastUpdateDate.getFullYear() === currentDate.getFullYear()) {
      return next();
    }
  }

  // Create new history entry
  const historyEntry = {
    currentStructure: school.currentStructure,
    recommendedStructure: school.recommendedStructure,
    transitionStatus: school.transitionStatus,
    performanceBand: school.performanceBand,
    studentCount: school.studentCount,
    teacherCount: school.teacherCount,
    facilities: school.facilities,
    qualityScore: school.qualityScore,
    type: school.type,
    updatedAt: new Date()
  };

  // Add new entry to the beginning of history array
  school.history.unshift(historyEntry);

  // Keep only last 12 months of history
  if (school.history.length > 12) {
    school.history = school.history.slice(0, 12);
  }

  next();
});

export default mongoose.model('School', schoolSchema);