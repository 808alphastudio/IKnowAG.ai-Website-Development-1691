import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EmailCaptureInline from '../EmailCaptureInline';

const FinalCTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const trustElements = [
    'Only 5 partnerships available quarterly',
    'Applications reviewed weekly',
    'Up to 3 companies can collaborate',
    '$3,500 total (US travel included)',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-trust-blue to-innovation-teal text-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-inter mb-6">
            Ready to Control Your AI Destiny?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto font-open-sans">
            Don't wait while new AI-native entrepreneurs enter your market. Learn practical frameworks and gain competitive advantage before new competitors establish themselves.
          </p>
        </motion.div>

        {/* Quick Application Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold mb-6">Start Your Partnership Journey</h3>
          <div className="space-y-4 text-left">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">What makes your media company unique?</h4>
              <p className="text-sm opacity-80">Tell us about your specific challenges and goals</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Partnership preference?</h4>
              <p className="text-sm opacity-80">Individual focus or collaborative learning with peers</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Ready to move faster than competitors?</h4>
              <p className="text-sm opacity-80">Join other forward-thinking media companies</p>
            </div>
          </div>
          <Link
            to="/partnership"
            className="w-full bg-energy-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg mt-6 inline-block"
          >
            Apply for Partnership
          </Link>
        </motion.div>

        {/* Email Capture */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <EmailCaptureInline
            variant="hero"
            title="Stay Updated on Partnership Opportunities"
            subtitle="Get notified when new partnership spots open up"
            buttonText="Get Notified"
            className="max-w-lg mx-auto"
          />
        </motion.div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-4 gap-6 text-sm opacity-80"
        >
          {trustElements.map((element, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-3">
              {element}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;