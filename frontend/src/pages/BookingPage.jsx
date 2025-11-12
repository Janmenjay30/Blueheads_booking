import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../services/api';
import { FaTrash, FaCalendar, FaClock, FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';

const BookingPage = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    companyName: '',
    preferredCallDate: '',
    preferredCallTime: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleRemoveFromCart = (serviceId) => {
    setCart(cart.filter(item => item._id !== serviceId));
  };

  const handleAddonToggle = (serviceId, addon) => {
    setCart(cart.map(item => {
      if (item._id === serviceId) {
        const addonExists = item.selectedAddons.find(a => a.name === addon.name);
        const selectedAddons = addonExists
          ? item.selectedAddons.filter(a => a.name !== addon.name)
          : [...item.selectedAddons, addon];
        return { ...item, selectedAddons };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const basePrice = item.basePrice * (item.quantity || 1);
      const addonsPrice = item.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
      return total + basePrice + addonsPrice;
    }, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) newErrors.clientName = 'Name is required';
    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Invalid email format';
    }
    if (!formData.clientPhone.trim()) newErrors.clientPhone = 'Phone is required';
    if (!formData.preferredCallDate) newErrors.preferredCallDate = 'Date is required';
    if (!formData.preferredCallTime) newErrors.preferredCallTime = 'Time is required';

    // Check if date is in the future
    const selectedDate = new Date(formData.preferredCallDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      newErrors.preferredCallDate = 'Date must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Please add at least one service to your cart');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        services: cart.map(item => ({
          serviceId: item._id,
          serviceName: item.name,
          basePrice: item.basePrice,
          selectedAddons: item.selectedAddons,
          quantity: item.quantity || 1
        })),
        totalPrice: calculateTotal()
      };

      await bookingsAPI.create(bookingData);
      
      // Clear cart and navigate to success page
      setCart([]);
      navigate('/success');
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some services to get started!</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Complete Your Booking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item._id} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{formatPrice(item.basePrice)}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {item.addons && item.addons.length > 0 && (
                    <div className="ml-4 mt-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Add-ons:</p>
                      {item.addons.map(addon => (
                        <label key={addon.name} className="flex items-center text-sm mb-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.selectedAddons.some(a => a.name === addon.name)}
                            onChange={() => handleAddonToggle(item._id, addon)}
                            className="mr-2"
                          />
                          <span>{addon.name} (+{formatPrice(addon.price)})</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {item.selectedAddons && item.selectedAddons.length > 0 && (
                    <div className="text-sm text-green-600 mt-2">
                      Selected add-ons: +{formatPrice(item.selectedAddons.reduce((sum, a) => sum + a.price, 0))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary-600">{formatPrice(calculateTotal())}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Final pricing will be confirmed during consultation
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card">
            <h2 className="text-2xl font-bold mb-6">Your Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">
                  <FaUser className="inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.clientName ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
              </div>

              <div>
                <label className="label">
                  <FaEnvelope className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className={`input-field ${errors.clientEmail ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>}
              </div>

              <div>
                <label className="label">
                  <FaPhone className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  className={`input-field ${errors.clientPhone ? 'border-red-500' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.clientPhone && <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>}
              </div>

              <div>
                <label className="label">
                  <FaBuilding className="inline mr-2" />
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="label">
                  <FaCalendar className="inline mr-2" />
                  Preferred Call Date *
                </label>
                <input
                  type="date"
                  name="preferredCallDate"
                  value={formData.preferredCallDate}
                  onChange={handleInputChange}
                  min={minDate}
                  className={`input-field ${errors.preferredCallDate ? 'border-red-500' : ''}`}
                />
                {errors.preferredCallDate && <p className="text-red-500 text-sm mt-1">{errors.preferredCallDate}</p>}
              </div>

              <div>
                <label className="label">
                  <FaClock className="inline mr-2" />
                  Preferred Call Time *
                </label>
                <select
                  name="preferredCallTime"
                  value={formData.preferredCallTime}
                  onChange={handleInputChange}
                  className={`input-field ${errors.preferredCallTime ? 'border-red-500' : ''}`}
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                  <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                  <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                </select>
                {errors.preferredCallTime && <p className="text-red-500 text-sm mt-1">{errors.preferredCallTime}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label className="label">Additional Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="input-field"
                rows="4"
                placeholder="Tell us more about your project or specific requirements..."
              />
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-secondary flex-1"
              >
                Continue Shopping
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? 'Submitting...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
