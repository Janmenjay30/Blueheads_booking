import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import { FaFilter, FaSearch } from 'react-icons/fa';

const HomePage = ({ cart, setCart }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = ['All', 'SEO', 'Social Media', 'Content Marketing', 'PPC', 'Email Marketing', 'Web Design', 'Analytics', 'Branding'];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, selectedCategory, searchTerm]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getAll();
      setServices(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load services. Please try again later.');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const handleAddToCart = (service) => {
    if (!cart.find(item => item._id === service._id)) {
      setCart([...cart, { ...service, quantity: 1, selectedAddons: [] }]);
    }
  };

  const isInCart = (serviceId) => {
    return cart.some(item => item._id === serviceId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Digital Marketing Services
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our comprehensive range of services, see transparent pricing, and book a consultation call.
        </p>
      </section>

      {/* Search & Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <FaFilter className="text-gray-500 flex-shrink-0" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Services Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredServices.map(service => (
          <ServiceCard
            key={service._id}
            service={service}
            onAddToCart={handleAddToCart}
            isInCart={isInCart(service._id)}
          />
        ))}
      </div>

      {filteredServices.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
        </div>
      )}

      {/* CTA Section */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => navigate('/booking')}
            className="btn-primary shadow-2xl text-lg px-8 py-4 flex items-center space-x-2"
          >
            <span>Proceed to Booking</span>
            <span className="bg-white text-primary-600 rounded-full px-3 py-1 font-bold">
              {cart.length}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
