import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEdit, FiFileText, FiCheckCircle, FiTrendingUp } = FiIcons;

const FrameworksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const frameworks = [
    {
      icon: FiEdit,
      title: 'AI Proposal Builder',
      description: 'Ratecard + Sales Notes → Custom Proposal',
      complexity: 'Simple',
      time: '15 minutes',
      comparison: 'vs. Enterprise CRM Integration (weeks of implementation)',
      gradient: 'from-trust-blue to-innovation-teal',
    },
    {
      icon: FiFileText,
      title: 'Newsletter Generation',
      description: 'City Data → Professional Newsletter',
      complexity: 'No-code',
      time: '5 minutes',
      comparison: 'vs. Complex CMS Requirements (hours of manual creation)',
      gradient: 'from-success-green to-innovation-teal',
    },
    {
      icon: FiCheckCircle,
      title: 'Fact Checking Tool',
      description: 'Article Text → Verification Report',
      complexity: 'One-click',
      time: 'Instant',
      comparison: 'vs. Enterprise Verification Systems (manual research process)',
      gradient: 'from-energy-orange to-trust-blue',
    },
    {
      icon: FiTrendingUp,
      title: 'Business Intelligence',
      description: 'Local Business → Market Analysis',
      complexity: 'Automated',
      time: 'Minutes',
      comparison: 'vs. Custom Development (days of research)',
      gradient: 'from-innovation-teal to-success-green',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-inter text-gray-900 mb-6">
            Simple AI Frameworks That Actually Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
            While competitors implement complex enterprise systems, you can be using practical frameworks and gaining competitive advantage
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {frameworks.map((framework, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              className={`bg-gradient-to-br ${framework.gradient} rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={framework.icon} className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{framework.title}</h3>
                  <p className="opacity-90">{framework.description}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-2">
                  <span>Complexity:</span>
                  <span className="font-semibold">{framework.complexity}</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-2">
                  <span>Time:</span>
                  <span className="font-semibold">{framework.time}</span>
                </div>
                <div className="text-xs opacity-75 mt-4">
                  {framework.comparison}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworksSection;