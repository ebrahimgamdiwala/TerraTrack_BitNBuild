import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Campaign title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Campaign description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  goalAmount: {
    type: Number,
    required: [true, 'Goal amount is required'],
    min: [1, 'Goal amount must be at least 1'],
    max: [10000000, 'Goal amount cannot exceed 10 million']
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Current amount cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Campaign category is required'],
    enum: {
      values: [
        'reforestation',
        'ocean-cleanup',
        'renewable-energy',
        'wildlife-conservation',
        'climate-action',
        'water-conservation',
        'sustainable-agriculture',
        'pollution-control',
        'biodiversity',
        'green-technology'
      ],
      message: 'Please select a valid campaign category'
    }
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  imageUrl: {
    type: String,
    default: null
  },
  location: {
    type: String,
    required: [true, 'Campaign location is required'],
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90']
    },
    longitude: {
      type: Number,
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180']
    }
  },
  organizer: {
    type: String,
    required: [true, 'Organizer name is required'],
    trim: true
  },
  organizerContact: {
    email: {
      type: String,
      required: [true, 'Organizer email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      trim: true
    }
  },
  impactMetrics: {
    expectedImpact: {
      type: String,
      required: [true, 'Expected impact description is required'],
      trim: true
    },
    measurableGoals: [{
      metric: String,
      target: String,
      achieved: {
        type: String,
        default: 'In Progress'
      }
    }]
  },
  donorCount: {
    type: Number,
    default: 0,
    min: [0, 'Donor count cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  urgent: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  updates: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    imageUrl: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for raisedAmount (maps to currentAmount for frontend compatibility)
campaignSchema.virtual('raisedAmount').get(function() {
  return this.currentAmount;
});

// Virtual for progress percentage
campaignSchema.virtual('progressPercentage').get(function() {
  return Math.min(Math.round((this.currentAmount / this.goalAmount) * 100), 100);
});

// Virtual for days remaining
campaignSchema.virtual('daysRemaining').get(function() {
  const now = new Date();
  const diffTime = this.endDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
});

// Virtual for campaign status based on dates and goal
campaignSchema.virtual('campaignStatus').get(function() {
  const now = new Date();
  
  if (this.status === 'cancelled' || this.status === 'paused') {
    return this.status;
  }
  
  if (this.currentAmount >= this.goalAmount) {
    return 'completed';
  }
  
  if (now > this.endDate) {
    return 'expired';
  }
  
  if (now < this.startDate) {
    return 'upcoming';
  }
  
  return 'active';
});

// Index for better query performance
campaignSchema.index({ status: 1, createdAt: -1 });
campaignSchema.index({ category: 1, status: 1 });
campaignSchema.index({ featured: 1, urgent: 1 });
campaignSchema.index({ endDate: 1 });
campaignSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

// Pre-save middleware to update the updatedAt field
campaignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure virtual fields are serialized
campaignSchema.set('toJSON', { virtuals: true });
campaignSchema.set('toObject', { virtuals: true });

export default mongoose.model('Campaign', campaignSchema);