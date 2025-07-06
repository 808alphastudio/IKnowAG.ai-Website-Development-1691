import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { createEmailCapture } from '../lib/supabaseQueries';

const { FiX, FiMail, FiGift, FiUsers, FiTrendingUp } = FiIcons;

const EmailCapturePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    // Check if user has already seen popup or subscribed
    const hasSeenPopup = localStorage.getItem('emailPopupSeen');
    const hasSubscribedBefore = localStorage.getItem('emailSubscribed');
    
    if (!hasSeenPopup && !hasSubscribedBefore) {
      // Show popup after 30 seconds or on scroll
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000);

      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 50) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createEmailCapture({
        email: data.email,
        source: 'popup',
        interests: data.interests || [],
        company_type: data.companyType || '',
      });
      
      setHasSubscribed(true);
      localStorage.setItem('emailSubscribed', 'true');
      reset();
      
      // Hide popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem('emailPopupSeen', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={closePopup}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative"
        >
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
          </button>

          {!hasSubscribed ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-trust-blue to-innovation-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiMail} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Stay Ahead of AI Competition
                </h3>
                <p className="text-gray-600">
                  Get exclusive AI frameworks and insights delivered to your inbox
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiGift} className="w-5 h-5 text-trust-blue" />
                  <span className="text-sm text-gray-700">Free AI implementation guides</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiUsers} className="w-5 h-5 text-innovation-teal" />
                  <span className="text-sm text-gray-700">Partnership opportunity updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-success-green" />
                  <span className="text-sm text-gray-700">Market intelligence reports</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <select
                    {...register('companyType')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                  >
                    <option value="">What type of media company?</option>
                    <option value="local-newspaper">Local Newspaper</option>
                    <option value="regional-magazine">Regional Magazine</option>
                    <option value="b2b-publication">B2B Publication</option>
                    <option value="community-radio">Community Radio</option>
                    <option value="digital-media">Digital Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">What interests you most?</p>
                  <div className="space-y-2">
                    {[
                      'AI Proposal Tools',
                      'Content Creation',
                      'Market Analysis',
                      'Partnership Opportunities'
                    ].map((interest) => (
                      <label key={interest} className="flex items-center">
                        <input
                          {...register('interests')}
                          type="checkbox"
                          value={interest}
                          className="mr-2 text-trust-blue focus:ring-trust-blue"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-trust-blue hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiMail} className="w-5 h-5" />
                      <span>Get AI Insights</span>
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiUsers} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to the Community!
              </h3>
              <p className="text-gray-600 mb-6">
                You'll receive your first AI framework guide within 24 hours.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Next:</strong> Check out our partnership opportunities or explore our AI tools demo.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmailCapturePopup;