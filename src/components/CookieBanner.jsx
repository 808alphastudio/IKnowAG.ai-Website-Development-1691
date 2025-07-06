import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to improve your experience and analyze website traffic. 
          By continuing to use our site, you agree to our use of cookies.
        </p>
        <div className="flex gap-4">
          <button
            onClick={acceptCookies}
            className="bg-trust-blue hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Accept
          </button>
          <button
            onClick={declineCookies}
            className="border border-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieBanner;