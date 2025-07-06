import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUser, FiUsers, FiUserCheck, FiBookOpen, FiTarget, FiTool, FiMapPin } = FiIcons;

const PartnershipModelSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const partnershipOptions = [
    {
      companies: 1,
      price: '$3,500',
      pricePerCompany: '$3,500',
      title: 'Individual Focus',
      description: 'Complete customization and exclusive attention',
      features: [
        'Complete customization',
        'Exclusive attention',
        'Proprietary implementation',
        'Premium experience'
      ],
      borderColor: 'border-gray-200',
      hoverBorderColor: 'hover:border-trust-blue',
      priceColor: 'text-trust-blue',
      icon: FiUser,
    },
    {
      companies: 2,
      price: '$1,750',
      pricePerCompany: '$1,750 each',
      title: 'Collaborative Learning',
      description: 'Cost sharing benefits with peer learning',
      features: [
        'Cost sharing benefits',
        'Peer learning',
        'Shared insights',
        'Networking opportunities'
      ],
      borderColor: 'border-innovation-teal',
      hoverBorderColor: 'hover:border-success-green',
      priceColor: 'text-innovation-teal',
      icon: FiUsers,
      popular: true,
    },
    {
      companies: 3,
      price: '$1,167',
      pricePerCompany: '$1,167 each',
      title: 'Maximum Learning',
      description: 'Maximum cost efficiency with diverse perspectives',
      features: [
        'Maximum cost efficiency',
        'Diverse perspectives',
        'Community building',
        'Cross-pollination'
      ],
      borderColor: 'border-gray-200',
      hoverBorderColor: 'hover:border-success-green',
      priceColor: 'text-success-green',
      icon: FiUserCheck,
    },
  ];

  const includedFeatures = [
    {
      icon: FiBookOpen,
      title: '2-Day Onsite Training',
      description: 'Hands-on methodology with your specific use cases',
      color: 'bg-trust-blue',
    },
    {
      icon: FiTarget,
      title: '10 Follow-Up Sessions',
      description: 'One-hour sessions over 12 months',
      color: 'bg-innovation-teal',
    },
    {
      icon: FiTool,
      title: 'All AI Frameworks',
      description: 'Access to current tools + R&D pipeline',
      color: 'bg-success-green',
    },
    {
      icon: FiMapPin,
      title: 'US Travel Included',
      description: 'International travel additional',
      color: 'bg-energy-orange',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-inter text-gray-900 mb-6">
            Collaborative Partnerships: Up to 3 Companies Share $3,500
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
            Cost-effective AI enablement training with peer learning benefits
          </p>
        </motion.div>
        
        {/* Partnership Calculator */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {partnershipOptions.map((option, index) => (
            <motion.div
              key={option.companies}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${option.borderColor} ${option.hoverBorderColor} transition-colors relative`}
            >
              {option.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-success-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                  POPULAR
                </div>
              )}
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={option.icon} className="text-gray-600 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{option.companies} Company{option.companies > 1 ? 'ies' : ''}</h3>
                <div className={`text-4xl font-bold ${option.priceColor} mb-4`}>
                  {option.price} {option.companies > 1 && <span className="text-lg">each</span>}
                </div>
                <div className="text-gray-600 mb-6">{option.title}</div>
                <ul className="text-sm space-y-2 text-gray-600">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">All Partnerships Include</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <SafeIcon icon={feature.icon} className="text-white text-xl" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/partnership"
              className="bg-energy-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 inline-block"
            >
              Apply for Partnership
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipModelSection;