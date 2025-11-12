import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaPhone } from 'react-icons/fa';

const Header = ({ cartCount }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl">🎯</div>
            <div>
              <h1 className="text-2xl font-bold text-primary-600">BlueHeads</h1>
              <p className="text-xs text-gray-500">Digital Marketing Solutions</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Services
            </Link>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Pricing
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/booking"
              className="relative btn-primary flex items-center space-x-2"
            >
              <FaShoppingCart />
              <span>Book Now</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
