import React from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';

const ServiceCard = ({ service, onAddToCart, isInCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-4xl">{service.icon}</span>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              {service.category}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 flex-grow">{service.description}</p>

      <div className="mb-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Features:</h4>
        <ul className="space-y-1">
          {service.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" size={12} />
              <span>{feature}</span>
            </li>
          ))}
          {service.features.length > 4 && (
            <li className="text-xs text-gray-500 ml-5">
              +{service.features.length - 4} more features
            </li>
          )}
        </ul>
      </div>

      {service.addons && service.addons.length > 0 && (
        <div className="mb-4 pb-4 border-t pt-4">
          <p className="text-xs text-gray-500">
            {service.addons.length} add-on{service.addons.length > 1 ? 's' : ''} available
          </p>
        </div>
      )}

      <div className="mt-auto">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-primary-600">
              {formatPrice(service.basePrice)}
            </p>
            <p className="text-xs text-gray-500">
              {service.pricingModel === 'monthly' && 'per month'}
              {service.pricingModel === 'per-project' && 'one-time'}
              {service.pricingModel === 'hourly' && 'per hour'}
            </p>
          </div>
          {service.duration && (
            <p className="text-xs text-gray-500">
              {service.duration.value} {service.duration.unit}
            </p>
          )}
        </div>

        <button
          onClick={() => onAddToCart(service)}
          disabled={isInCart}
          className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
            isInCart
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {isInCart ? (
            <>
              <FaCheck />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <FaPlus />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
