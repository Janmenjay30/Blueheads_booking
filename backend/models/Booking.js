const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  clientEmail: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  clientPhone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  services: [{
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    serviceName: String,
    basePrice: Number,
    selectedAddons: [{
      name: String,
      price: Number
    }],
    quantity: {
      type: Number,
      default: 1,
      min: 1
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  preferredCallDate: {
    type: Date,
    required: [true, 'Preferred call date is required']
  },
  preferredCallTime: {
    type: String,
    required: [true, 'Preferred call time is required']
  },
  message: {
    type: String,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Index for faster queries
bookingSchema.index({ status: 1, preferredCallDate: 1 });
bookingSchema.index({ clientEmail: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
