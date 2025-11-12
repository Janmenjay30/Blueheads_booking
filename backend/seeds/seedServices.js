const mongoose = require('mongoose');
const Service = require('../models/Service');
require('dotenv').config();

const services = [
  {
    name: 'SEO Optimization - Starter',
    description: 'Basic SEO package including keyword research, on-page optimization, and monthly reporting.',
    category: 'SEO',
    basePrice: 499,
    pricingModel: 'monthly',
    features: [
      'Keyword research (up to 20 keywords)',
      'On-page SEO optimization',
      'Meta tags optimization',
      'Monthly performance report',
      'Google Analytics setup'
    ],
    addons: [
      { name: 'Extra 10 keywords', price: 100, description: 'Additional keyword targeting' },
      { name: 'Backlink building', price: 200, description: '10 quality backlinks per month' }
    ],
    duration: { value: 1, unit: 'months' },
    icon: '🔍'
  },
  {
    name: 'Social Media Management',
    description: 'Complete social media management for 3 platforms with content creation and posting.',
    category: 'Social Media',
    basePrice: 799,
    pricingModel: 'monthly',
    features: [
      '3 social media platforms',
      '20 posts per month',
      'Custom graphics and captions',
      'Community engagement',
      'Monthly analytics report'
    ],
    addons: [
      { name: 'Additional platform', price: 150, description: 'Manage one more social platform' },
      { name: 'Video content', price: 300, description: '4 short-form videos per month' }
    ],
    duration: { value: 1, unit: 'months' },
    icon: '📱'
  },
  {
    name: 'Content Marketing Package',
    description: 'Professional blog posts and content creation to boost your online presence.',
    category: 'Content Marketing',
    basePrice: 599,
    pricingModel: 'monthly',
    features: [
      '4 blog posts (800-1000 words each)',
      'SEO-optimized content',
      'Topic research',
      'Content calendar',
      'Image sourcing'
    ],
    addons: [
      { name: 'Extra blog post', price: 150, description: 'One additional 800-word post' },
      { name: 'Email newsletter', price: 200, description: 'Monthly newsletter creation' }
    ],
    duration: { value: 1, unit: 'months' },
    icon: '✍️'
  },
  {
    name: 'Google Ads Campaign',
    description: 'Professional PPC campaign setup and management for maximum ROI.',
    category: 'PPC',
    basePrice: 899,
    pricingModel: 'monthly',
    features: [
      'Campaign setup and strategy',
      'Keyword research',
      'Ad copy creation (5 variations)',
      'Landing page optimization tips',
      'Weekly performance monitoring',
      'Monthly optimization'
    ],
    addons: [
      { name: 'Facebook Ads', price: 400, description: 'Add Facebook advertising' },
      { name: 'Display advertising', price: 300, description: 'Google Display Network campaigns' }
    ],
    duration: { value: 1, unit: 'months' },
    icon: '💰'
  },
  {
    name: 'Email Marketing Campaign',
    description: 'Design, create, and send professional email campaigns to grow your business.',
    category: 'Email Marketing',
    basePrice: 399,
    pricingModel: 'monthly',
    features: [
      '4 email campaigns per month',
      'Email template design',
      'List segmentation',
      'A/B testing',
      'Performance analytics'
    ],
    addons: [
      { name: 'Automation setup', price: 250, description: 'Email automation workflows' },
      { name: 'Extra campaigns', price: 100, description: '2 additional email sends' }
    ],
    duration: { value: 1, unit: 'months' },
    icon: '📧'
  },
  {
    name: 'Landing Page Design',
    description: 'Custom, conversion-optimized landing page for your marketing campaigns.',
    category: 'Web Design',
    basePrice: 1299,
    pricingModel: 'per-project',
    features: [
      'Custom responsive design',
      'Mobile optimization',
      'Lead capture form',
      'SEO-friendly structure',
      '2 rounds of revisions',
      'Fast loading optimization'
    ],
    addons: [
      { name: 'A/B test variant', price: 400, description: 'Create second version for testing' },
      { name: 'Conversion tracking', price: 200, description: 'Full analytics setup' }
    ],
    duration: { value: 2, unit: 'weeks' },
    icon: '🎨'
  },
  {
    name: 'Brand Identity Package',
    description: 'Complete brand identity including logo, colors, fonts, and brand guidelines.',
    category: 'Branding',
    basePrice: 1999,
    pricingModel: 'per-project',
    features: [
      'Logo design (3 concepts)',
      'Color palette',
      'Typography selection',
      'Brand guidelines document',
      'Social media templates',
      'Business card design'
    ],
    addons: [
      { name: 'Additional logo concepts', price: 300, description: '2 more logo variations' },
      { name: 'Website mockup', price: 500, description: 'Homepage design mockup' }
    ],
    duration: { value: 3, unit: 'weeks' },
    icon: '🎯'
  },
  {
    name: 'Analytics & Reporting Setup',
    description: 'Comprehensive analytics setup and custom dashboard for tracking KPIs.',
    category: 'Analytics',
    basePrice: 699,
    pricingModel: 'per-project',
    features: [
      'Google Analytics 4 setup',
      'Goal tracking configuration',
      'Custom dashboard creation',
      'Conversion tracking',
      'Monthly reporting template',
      '1-hour training session'
    ],
    addons: [
      { name: 'Tag Manager setup', price: 200, description: 'Google Tag Manager implementation' },
      { name: 'Heatmap tools', price: 150, description: 'Hotjar or similar setup' }
    ],
    duration: { value: 1, unit: 'weeks' },
    icon: '📊'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing services');

    // Insert new services
    const createdServices = await Service.insertMany(services);
    console.log(`✅ Successfully seeded ${createdServices.length} services`);

    console.log('\n📋 Services by category:');
    const categories = [...new Set(services.map(s => s.category))];
    categories.forEach(cat => {
      const count = services.filter(s => s.category === cat).length;
      console.log(`   ${cat}: ${count} service(s)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
