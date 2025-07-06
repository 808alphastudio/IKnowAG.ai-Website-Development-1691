import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { createEmailCapture } from '../lib/supabaseQueries';

const { FiMail, FiArrowRight } = FiIcons;

const EmailCaptureInline = ({ 
  title = "Stay Updated on AI Tools for Small Media",
  subtitle = "Get practical frameworks and partnership updates delivered to your inbox",
  placeholder = "Enter your email address",
  buttonText = "Get Updates",
  variant = "default", // default, compact, hero
  className = ""
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createEmailCapture({
        email: data.email,
        source: 'inline',
        page: window.location.pathname,
      });
      
      setHasSubscribed(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setHasSubscribed(false);
      }, 5000);
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'bg-gray-50 rounded-lg p-6';
      case 'hero':
        return 'bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-white';
      default:
        return 'bg-white rounded-xl p-8 shadow-lg border border-gray-200';
    }
  };

  const getTextColor = () => {
    return variant === 'hero' ? 'text-white' : 'text-gray-900';
  };

  const getSubtextColor = () => {
    return variant === 'hero' ? 'text-white/90' : 'text-gray-600';
  };

  if (hasSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${getVariantStyles()} ${className} text-center`}
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          <SafeIcon icon={FiMail} className={`w-6 h-6 ${variant === 'hero' ? 'text-white' : 'text-success-green'}`} />
          <h3 className={`text-xl font-bold ${getTextColor()}`}>
            Thanks for subscribing!
          </h3>
        </div>
        <p className={`${getSubtextColor()}`}>
          You'll receive your first AI framework guide within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${getVariantStyles()} ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className={`text-2xl font-bold ${getTextColor()} mb-2`}>
          {title}
        </h3>
        <p className={`${getSubtextColor()}`}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder={placeholder}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent ${
                variant === 'hero' 
                  ? 'bg-white/20 border-white/30 text-white placeholder-white/70' 
                  : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className={`text-sm mt-1 ${variant === 'hero' ? 'text-white/90' : 'text-red-500'}`}>
                {errors.email.message}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
              variant === 'hero'
                ? 'bg-energy-orange hover:bg-orange-600 text-white'
                : 'bg-trust-blue hover:bg-blue-700 text-white'
            } hover:scale-105`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <span>{buttonText}</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <p className={`text-xs text-center mt-3 ${variant === 'hero' ? 'text-white/70' : 'text-gray-500'}`}>
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </motion.div>
  );
};

export default EmailCaptureInline;