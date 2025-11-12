const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');

// Validation middleware
const bookingValidation = [
  body('clientName').trim().notEmpty().withMessage('Client name is required'),
  body('clientEmail').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('clientPhone').trim().notEmpty().withMessage('Phone number is required'),
  body('services').isArray({ min: 1 }).withMessage('At least one service must be selected'),
  body('totalPrice').isNumeric().withMessage('Total price must be a number'),
  body('preferredCallDate').isISO8601().withMessage('Valid date is required'),
  body('preferredCallTime').trim().notEmpty().withMessage('Preferred call time is required')
];

// Public routes
router.post('/', bookingValidation, createBooking);

// Admin routes (add authentication middleware in production)
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);
router.delete('/:id', deleteBooking);

module.exports = router;
