const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['SEO', 'Social Media', 'Content Marketing', 'PPC', 'Email Marketing', 'Web Design', 'Analytics', 'Branding', 'Other']
  },
  basePrice: {
    type: Number,
    required: [true, 'Base price is required'],
    min: [0, 'Price cannot be negative']
  },
  pricingModel: {
    type: String,
    enum: ['fixed', 'hourly', 'monthly', 'per-project'],
    default: 'fixed'
  },
  features: [{
    type: String,
    trim: true
  }],
  addons: [{
    name: String,
    price: Number,
    description: String
  }],
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['hours', 'days', 'weeks', 'months'],
      default: 'days'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    default: '🎯'
  }
}, {
  timestamps: true
});

// Index for faster queries
serviceSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Service', serviceSchema);
