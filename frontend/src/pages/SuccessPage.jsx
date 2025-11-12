import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaEnvelope, FaCalendar } from 'react-icons/fa';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="mb-6">
            <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600">Thank you for choosing BlueHeads</p>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-primary-900 mb-4">What happens next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Check your email</p>
                  <p className="text-sm text-gray-600">
                    We've sent a confirmation email with your booking details.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaCalendar className="text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">We'll call you</p>
                  <p className="text-sm text-gray-600">
                    Our team will reach out at your preferred time to discuss your requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-600 mb-6">
              If you have any questions in the meantime, feel free to reach out to us at{' '}
              <a href="mailto:info@blueheads.com" className="text-primary-600 hover:underline">
                info@blueheads.com
              </a>
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Booking reference will be available in your confirmation email
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
