import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiUsers, FiUserCheck, FiChevronRight, FiChevronLeft } = FiIcons;

const PartnershipPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const partnershipOptions = [
    {
      value: 'individual',
      companies: 1,
      price: '$3,500',
      title: 'Individual focus & customization',
      icon: FiUser,
      color: 'border-trust-blue',
    },
    {
      value: 'two-company',
      companies: 2,
      price: '$1,750 each',
      title: 'Collaborative learning',
      icon: FiUsers,
      color: 'border-innovation-teal',
    },
    {
      value: 'three-company',
      companies: 3,
      price: '$1,167 each',
      title: 'Maximum community',
      icon: FiUserCheck,
      color: 'border-success-green',
    },
  ];

  const steps = [
    { number: 1, title: 'Company Info', active: currentStep >= 1 },
    { number: 2, title: 'Partnership Details', active: currentStep >= 2 },
    { number: 3, title: 'Implementation', active: currentStep >= 3 },
  ];

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission here
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="pt-16">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold font-inter text-gray-900 mb-6">Apply for Partnership</h1>
            <p className="text-xl text-gray-600 font-open-sans">Only 5 partnerships available per quarter. Applications reviewed weekly.</p>
          </motion.div>
          
          {/* Partnership Options Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {partnershipOptions.map((option, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 border-2 ${option.color}`}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <SafeIcon icon={option.icon} className="text-gray-600 text-xl" />
                  </div>
                  <h3 className="font-bold mb-2">{option.companies} Company{option.companies > 1 ? 'ies' : ''}</h3>
                  <div className="text-xl font-bold text-gray-900 mb-2">{option.price}</div>
                  <p className="text-sm text-gray-600">{option.title}</p>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Multi-Step Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-inter text-gray-900 mb-4">Partnership Application</h2>
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.active ? 'bg-trust-blue text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.number}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        step.active ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-1 bg-gray-200 mx-4">
                        <div className={`h-1 transition-all duration-300 ${
                          currentStep > step.number ? 'bg-trust-blue w-full' : 'bg-gray-200 w-0'
                        }`}></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Company Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Media Company Name *</label>
                    <input
                      {...register('companyName', { required: 'Company name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      placeholder="Your Media Company"
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Media Type *</label>
                    <select
                      {...register('mediaType', { required: 'Media type is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                    >
                      <option value="">Select media type</option>
                      <option value="local-newspaper">Local Newspaper</option>
                      <option value="regional-magazine">Regional Magazine</option>
                      <option value="b2b-publication">B2B Publication</option>
                      <option value="community-radio">Community Radio</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.mediaType && <p className="text-red-500 text-sm mt-1">{errors.mediaType.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      placeholder="Your Full Name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Title *</label>
                    <input
                      {...register('title', { required: 'Title is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      placeholder="Publisher, Owner, CEO, etc."
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                    <select
                      {...register('companySize', { required: 'Company size is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                    >
                      <option value="">Select company size</option>
                      <option value="5-10">5-10 employees</option>
                      <option value="11-25">11-25 employees</option>
                      <option value="26-50">26-50 employees</option>
                      <option value="50+">50+ employees</option>
                    </select>
                    {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location (City, State) *</label>
                    <input
                      {...register('location', { required: 'Location is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      placeholder="City, State"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">What's your biggest operational challenge that AI could solve? *</label>
                    <textarea
                      {...register('challenge', { required: 'Please describe your challenge' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      rows="4"
                      placeholder="Describe your specific challenges with sales, content creation, market analysis, etc."
                    />
                    {errors.challenge && <p className="text-red-500 text-sm mt-1">{errors.challenge.message}</p>}
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Partnership Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Partnership Preference *</label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {partnershipOptions.map((option, index) => (
                        <label key={index} className="cursor-pointer">
                          <input
                            {...register('partnershipType', { required: 'Please select a partnership type' })}
                            type="radio"
                            value={option.value}
                            className="sr-only"
                          />
                          <div className={`border-2 rounded-lg p-4 transition-colors ${
                            watch('partnershipType') === option.value 
                              ? `${option.color} bg-blue-50` 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <div className="text-center">
                              <SafeIcon icon={option.icon} className="text-2xl mx-auto mb-2 text-gray-600" />
                              <div className="font-semibold">{option.companies} Company{option.companies > 1 ? 'ies' : ''}</div>
                              <div className="text-lg font-bold text-gray-900">{option.price}</div>
                              <div className="text-sm text-gray-600">{option.title}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.partnershipType && <p className="text-red-500 text-sm mt-1">{errors.partnershipType.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Have you heard about new AI-native competitors in your market?</label>
                    <textarea
                      {...register('competitors')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      rows="3"
                      placeholder="Any awareness of AI-powered startups or new media companies using AI in your region?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What's your timeline for AI implementation?</label>
                    <select
                      {...register('timeline')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (within 30 days)</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                    </select>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Implementation */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What specific AI tools interest you most?</label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'AI Proposal Builder',
                        'Newsletter Generation',
                        'Fact Checking Tool',
                        'Business Intelligence',
                        'Content Creation',
                        'Sales Optimization',
                        'Market Analysis',
                        'Other'
                      ].map((tool, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            {...register('interestedTools')}
                            type="checkbox"
                            value={tool}
                            className="mr-2 text-trust-blue focus:ring-trust-blue"
                          />
                          <span className="text-sm">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Any additional comments or questions?</label>
                    <textarea
                      {...register('comments')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                      rows="4"
                      placeholder="Tell us anything else we should know about your company or goals..."
                    />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Next Steps:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Application review within 5 business days</li>
                      <li>• Initial consultation call if approved</li>
                      <li>• Partnership agreement and scheduling</li>
                      <li>• 2-day onsite training + 12-month follow-up</li>
                    </ul>
                  </div>
                </motion.div>
              )}
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentStep === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  disabled={currentStep === 1}
                >
                  <SafeIcon icon={FiChevronLeft} className="mr-2" />
                  Previous
                </button>
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center bg-trust-blue hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Next
                    <SafeIcon icon={FiChevronRight} className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-energy-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipPage;