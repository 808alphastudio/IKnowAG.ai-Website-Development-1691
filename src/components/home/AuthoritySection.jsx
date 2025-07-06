import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp, FiTarget, FiAward } = FiIcons;

const AuthoritySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold font-inter text-gray-900 mb-6"
          >
            The Media Executive Who's Always Been Ahead of the Curve
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans"
          >
            Guy Tasaka's track record of innovation spans enterprise media challenges and small media advantages
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Innovation Timeline */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiTrendingUp} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation Track Record</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center justify-between">
                  <span>2011:</span>
                  <span className="font-semibold">First local paywall</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>2014:</span>
                  <span className="font-semibold">First local FAST channel</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>2024:</span>
                  <span className="font-semibold">AI enablement tools</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Cross-Format Experience */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-innovation-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiTarget} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise & Small Media</h3>
              <div className="space-y-2 text-gray-600">
                <div>• 11 years at The New York Times</div>
                <div>• Enterprise media challenges</div>
                <div>• Local newspapers & B2B media</div>
                <div>• Television, audio & technology</div>
              </div>
            </div>
          </motion.div>
          
          {/* Current Authority */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiAward} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Recognition</h3>
              <div className="space-y-2 text-gray-600">
                <div>• LMA Innovator of the Year</div>
                <div>• E&P Technology Columnist</div>
                <div>• Speaking nationwide</div>
                <div>• Building practical AI tools</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthoritySection;