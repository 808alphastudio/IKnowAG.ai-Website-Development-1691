import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import EmailCaptureInline from '../EmailCaptureInline';

const { FiTarget, FiPlay } = FiIcons;

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-trust-blue to-innovation-teal flex items-center">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Primary Message */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl lg:text-6xl font-bold font-inter leading-tight mb-6">
              AI Enablement for Small Media Companies Who Want to Control Their Own Destiny
            </h1>
            <p className="text-xl lg:text-2xl font-open-sans mb-8 opacity-90 leading-relaxed">
              Simple AI frameworks, not complex systems. Guy Tasaka teaches small media companies to harness their biggest advantage: speed. While enterprise media faces implementation challenges, new AI-native entrepreneurs are entering local markets. You can move faster than both.
            </p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20"
            >
              <div className="flex items-center justify-between text-sm font-medium">
                <span>🔥 Currently Available:</span>
                <span className="text-energy-orange font-bold">2 Partnership Spots</span>
              </div>
              <div className="mt-2 text-sm opacity-80">
                Up to 3 companies share $3,500 training • Only 5 partnerships at a time
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button className="bg-energy-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                Watch 15-Minute Demo
              </button>
              <Link
                to="/partnership"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/30 backdrop-blur-sm text-center"
              >
                Apply for Partnership
              </Link>
            </motion.div>

            {/* Email Capture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <EmailCaptureInline
                variant="hero"
                title="Get AI Framework Updates"
                subtitle="Join 500+ media executives getting practical AI insights"
                buttonText="Get Free Updates"
                className="max-w-lg"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <SafeIcon icon={FiTarget} className="text-6xl mb-4 mx-auto" />
                  <div className="font-semibold text-xl">Small Media AI Tools in Action</div>
                  <div className="text-sm opacity-70 mt-2">See the 15-minute proposal demo</div>
                </div>
              </div>
            </div>

            {/* Floating partnership indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-success-green text-white px-6 py-3 rounded-full font-semibold shadow-lg animate-pulse-slow"
            >
              ✓ Up to 3 Companies Share Training
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;