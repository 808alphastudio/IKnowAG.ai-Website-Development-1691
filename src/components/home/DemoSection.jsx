import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiBarChart, FiZap, FiFileText, FiTarget } = FiIcons;

const DemoSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-inter mb-6">
            See Small Media Speed Advantage in Action
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto font-open-sans">
            Watch Guy Tasaka transform actual ratecard and sales call notes into deal-closing proposals using simple AI frameworks
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Video Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-center h-full cursor-pointer hover:bg-gray-700 transition-colors group">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 bg-energy-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors"
                  >
                    <SafeIcon icon={FiPlay} className="text-3xl ml-1" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">15-Minute AI Proposal Creation</h3>
                  <p className="text-gray-300">Real Media Company Demo</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-energy-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Book Your Custom Demo
              </motion.button>
            </div>
          </motion.div>
          
          {/* Demo Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <SafeIcon icon={FiBarChart} className="text-2xl mb-3" />
              <h4 className="font-semibold mb-2">Input</h4>
              <ul className="text-sm space-y-1 opacity-80">
                <li>• Your ratecard</li>
                <li>• Sales call notes</li>
                <li>• Advertiser info</li>
                <li>• Business overview</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <SafeIcon icon={FiZap} className="text-2xl mb-3" />
              <h4 className="font-semibold mb-2">Speed</h4>
              <ul className="text-sm space-y-1 opacity-80">
                <li>• 15 minutes total</li>
                <li>• Simple methodology</li>
                <li>• No complex systems</li>
                <li>• Immediate results</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <SafeIcon icon={FiFileText} className="text-2xl mb-3" />
              <h4 className="font-semibold mb-2">Output</h4>
              <ul className="text-sm space-y-1 opacity-80">
                <li>• Custom proposal</li>
                <li>• Strategic recommendations</li>
                <li>• Pricing justification</li>
                <li>• Ready-to-send format</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <SafeIcon icon={FiTarget} className="text-2xl mb-3" />
              <h4 className="font-semibold mb-2">Results</h4>
              <ul className="text-sm space-y-1 opacity-80">
                <li>• Deal-closing quality</li>
                <li>• Partnership-ready</li>
                <li>• Competitive advantage</li>
                <li>• Control your destiny</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;