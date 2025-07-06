import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle } = FiIcons;

const AboutPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeline = [
    {
      period: 'The New York Times',
      description: '11 years understanding enterprise media challenges and opportunities',
      label: 'Enterprise Experience',
      color: 'bg-trust-blue',
      initials: 'NYT',
    },
    {
      period: '2011',
      description: 'Scripps Memphis Commercial Appeal - ahead of the curve',
      label: 'Digital Innovation',
      color: 'bg-innovation-teal',
      initials: '2011',
    },
    {
      period: '2014',
      description: 'Calkins Media - 10 years before streaming became essential',
      label: 'Streaming Pioneer',
      color: 'bg-success-green',
      initials: '2014',
    },
    {
      period: 'AI',
      description: 'Small media competitive advantage against new market entrants',
      label: 'Current Mission',
      color: 'bg-energy-orange',
      initials: 'AI',
    },
  ];

  const advantages = [
    '11 years at The New York Times understanding enterprise challenges',
    'Pioneer of first local paywall (2011) and FAST channel (2014)',
    'Cross-format experience from magazines to audio to technology',
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold font-inter text-gray-900 mb-6">
                The Media Executive Who Believes Small Companies Have the Real Advantage
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-open-sans">
                Having worked across magazines, newspapers, B2B media, television, audio, and technology, Guy Tasaka understands both enterprise media challenges and small media advantages.
              </p>
              
              <div className="bg-gradient-to-br from-trust-blue to-innovation-teal text-white p-6 rounded-2xl mb-8">
                <p className="text-lg italic font-open-sans">
                  "Speed beats size against new AI-native competitors. While enterprise media faces implementation challenges, new entrepreneurs are launching AI-powered media companies in local markets. Small media can implement frameworks quickly and establish competitive advantages before new entrants gain market share."
                </p>
              </div>
              
              <div className="space-y-4">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 bg-trust-blue rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiCheckCircle} className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700">{advantage}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center">
                <span className="text-6xl">👨‍💼</span>
              </div>
            </motion.div>
          </div>
          
          {/* Career Timeline */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold font-inter text-center text-gray-900 mb-12">Innovation Timeline</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-trust-blue to-innovation-teal"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <h3 className="text-xl font-bold text-gray-900">{item.period}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center relative z-10`}>
                      <span className="text-white font-bold text-sm">{item.initials}</span>
                    </div>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                      <span className="text-gray-500">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;