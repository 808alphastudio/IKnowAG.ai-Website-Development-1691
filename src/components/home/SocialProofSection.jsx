import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SocialProofSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const conferences = [
    {
      name: 'City Magazine Annual Conference',
      description: 'Metropolitan media transformation',
      initials: 'CM',
      color: 'bg-trust-blue',
    },
    {
      name: 'Montana Newspapers Convention',
      description: 'Small market AI implementation',
      initials: 'MT',
      color: 'bg-innovation-teal',
    },
    {
      name: 'Oregon Press Association',
      description: 'Regional media innovation leadership',
      initials: 'OR',
      color: 'bg-success-green',
    },
    {
      name: 'Community Publishers Conference',
      description: 'Collaborative media strategies',
      initials: 'CP',
      color: 'bg-energy-orange',
    },
  ];

  const testimonials = [
    {
      quote: "Guy's methodology helped us implement AI tools that gave us a real competitive advantage. While our competitors were still debating AI strategy, we were already using it to improve our sales process.",
      author: "Sarah Johnson",
      title: "Regional Magazine Publisher",
      borderColor: 'border-trust-blue',
    },
    {
      quote: "The collaborative partnership model was perfect. Learning alongside two other media companies gave us perspectives we never would have gained alone.",
      author: "Mike Rodriguez",
      title: "Community Newspaper Owner",
      borderColor: 'border-innovation-teal',
    },
    {
      quote: "Simple frameworks that actually work. No complex systems, no vendor dependency. We control our AI destiny now.",
      author: "Jennifer Chen",
      title: "B2B Publication Director",
      borderColor: 'border-success-green',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-inter text-gray-900 mb-6">
            Teaching Small Media AI Enablement Nationwide
          </h2>
          <p className="text-xl text-gray-600 font-open-sans">
            The methodology you learn here is being taught at industry conferences across the country
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Conference Speaking */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent & Upcoming Conferences</h3>
            <div className="space-y-4">
              {conferences.map((conference, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + (0.1 * index) }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-12 h-12 ${conference.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold">{conference.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{conference.name}</h4>
                    <p className="text-sm text-gray-600">{conference.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Client Success Stories */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Partnership Success Stories</h3>
            
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + (0.1 * index) }}
                  className={`border-l-4 ${testimonial.borderColor} pl-6`}
                >
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;