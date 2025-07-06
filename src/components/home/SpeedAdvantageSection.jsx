import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiZap, FiTarget, FiUsers, FiShield } = FiIcons;

const SpeedAdvantageSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
            Your Size is Your Superpower Against New Competition
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-open-sans">
            While enterprise media faces implementation challenges and AI-native entrepreneurs enter local markets, 
            smart small media companies can move faster than both.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Comparison Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-bold text-red-900 mb-4">Enterprise Media Challenges</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Complex implementation processes</li>
                <li>• Long approval cycles</li>
                <li>• High vendor dependencies</li>
                <li>• Slow adaptation to change</li>
              </ul>
            </div>
            
            <div className="text-center text-2xl font-bold text-gray-500">VS</div>
            
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-green-900 mb-4">Small Media Advantages</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Simple AI framework implementation</li>
                <li>• Quick decision making</li>
                <li>• Control your own destiny</li>
                <li>• Move faster than new competitors</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Speed Advantage Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-innovation-teal to-trust-blue rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">The Speed Advantage</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiZap} className="text-white" />
                  </div>
                  <span>Implement AI frameworks in weeks, not months</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiTarget} className="text-white" />
                  </div>
                  <span>Gain competitive advantage before new entrants</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUsers} className="text-white" />
                  </div>
                  <span>Learn collaboratively with peer companies</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiShield} className="text-white" />
                  </div>
                  <span>Control technology instead of vendor dependency</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="bg-energy-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
            Learn How to Move Faster Than Your Competitors
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeedAdvantageSection;