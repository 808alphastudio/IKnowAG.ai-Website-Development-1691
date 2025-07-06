import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiSettings } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Guy', path: '/about' },
    { name: 'Partnership', path: '/partnership' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-trust-blue to-innovation-teal rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-inter font-bold text-xl text-gray-900">IKnowAG.ai</div>
              <div className="text-xs text-gray-600">Powered by TasakaDigital.com</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-trust-blue'
                    : 'text-gray-700 hover:text-trust-blue'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/admin"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Admin Panel"
            >
              <SafeIcon icon={FiSettings} className="w-4 h-4" />
              <span className="text-sm">Admin</span>
            </Link>
            <Link
              to="/partnership"
              className="bg-energy-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.2 }}
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-trust-blue'
                    : 'text-gray-700 hover:text-trust-blue'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 text-gray-700 hover:text-trust-blue transition-colors"
            >
              <SafeIcon icon={FiSettings} className="w-4 h-4" />
              <span>Admin Panel</span>
            </Link>
            <Link
              to="/partnership"
              onClick={() => setIsMenuOpen(false)}
              className="bg-energy-orange hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center transition-all duration-300 mt-4"
            >
              Apply for Partnership
            </Link>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;