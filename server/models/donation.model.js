import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: [true, 'Campaign ID is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [1, 'Minimum donation amount is $1'],
    max: [100000, 'Maximum donation amount is $100,000']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
  },
  donorName: {
    type: String,
    trim: true
  },
  donorEmail: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto', 'stripe']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentProcessor: {
    type: String,
    enum: ['stripe', 'paypal', 'square', 'other'],
    default: 'stripe'
  },
  processorTransactionId: {
    type: String,
    sparse: true
  },
  // Stripe specific fields
  stripeSessionId: {
    type: String,
    unique: true,
    sparse: true
  },
  stripePaymentIntentId: {
    type: String,
    sparse: true
  },
  receiptUrl: {
    type: String
  },
  receiptId: {
    type: String,
    unique: true,
    sparse: true
  },
  refundAmount: {
    type: Number,
    default: 0,
    min: [0, 'Refund amount cannot be negative']
  },
  refundReason: {
    type: String,
    trim: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    referralSource: String
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

// Virtual for net amount (after refunds)
donationSchema.virtual('netAmount').get(function() {
  return this.amount - this.refundAmount;
});

// Virtual for paymentStatus (maps to status for frontend compatibility)
donationSchema.virtual('paymentStatus').get(function() {
  return this.status;
});

// Ensure virtuals are included in JSON output
donationSchema.set('toJSON', { virtuals: true });
donationSchema.set('toObject', { virtuals: true });

// Index for better query performance
donationSchema.index({ campaignId: 1, status: 1 });
donationSchema.index({ userId: 1, donationDate: -1 });
donationSchema.index({ status: 1, donationDate: -1 });

// Pre-save middleware to update the updatedAt field
donationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set processedAt when payment status changes to completed
  if (this.isModified('status') && this.status === 'completed' && !this.processedAt) {
    this.processedAt = Date.now();
  }
  
  next();
});

// Post-save middleware to update campaign amount
donationSchema.post('save', async function(doc) {
  if (doc.status === 'completed') {
    try {
      const Campaign = mongoose.model('Campaign');
      
      // Calculate total donations for this campaign
      const totalDonations = await mongoose.model('Donation').aggregate([
        { 
          $match: { 
            campaignId: doc.campaignId, 
            status: 'completed' 
          } 
        },
        { 
          $group: { 
            _id: null, 
            total: { $sum: '$amount' },
            count: { $sum: 1 }
          } 
        }
      ]);
      
      const total = totalDonations.length > 0 ? totalDonations[0].total : 0;
      const count = totalDonations.length > 0 ? totalDonations[0].count : 0;
      
      // Update campaign with new totals
      await Campaign.findByIdAndUpdate(doc.campaignId, {
        currentAmount: total,
        donorCount: count,
        updatedAt: Date.now()
      });
      
    } catch (error) {
      console.error('Error updating campaign totals:', error);
    }
  }
});

// Post-save middleware for refunds
donationSchema.post('save', async function(doc) {
  if (doc.isModified('refundAmount') && doc.refundAmount > 0) {
    try {
      const Campaign = mongoose.model('Campaign');
      
      // Recalculate campaign totals after refund
      const totalDonations = await mongoose.model('Donation').aggregate([
        { 
          $match: { 
            campaignId: doc.campaignId, 
            status: 'completed' 
          } 
        },
        { 
          $group: { 
            _id: null, 
            total: { $sum: { $subtract: ['$amount', '$refundAmount'] } },
            count: { $sum: 1 }
          } 
        }
      ]);
      
      const total = totalDonations.length > 0 ? Math.max(0, totalDonations[0].total) : 0;
      const count = totalDonations.length > 0 ? totalDonations[0].count : 0;
      
      await Campaign.findByIdAndUpdate(doc.campaignId, {
        currentAmount: total,
        donorCount: count,
        updatedAt: Date.now()
      });
      
    } catch (error) {
      console.error('Error updating campaign totals after refund:', error);
    }
  }
});

// Ensure virtual fields are serialized
donationSchema.set('toJSON', { virtuals: true });
donationSchema.set('toObject', { virtuals: true });

export default mongoose.model('Donation', donationSchema);