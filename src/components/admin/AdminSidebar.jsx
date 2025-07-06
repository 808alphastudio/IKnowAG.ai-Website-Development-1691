import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiHome,FiFileText,FiUsers,FiBarChart3,FiEdit3,FiSettings,FiLogOut,FiChevronLeft,FiChevronRight,FiMail,FiEye,FiGlobe,FiExternalLink}=FiIcons;

const AdminSidebar=({activeTab,setActiveTab,isOpen,setIsOpen,user,onSignOut})=> {
  const menuItems=[
    {id: 'dashboard',label: 'Dashboard',icon: FiHome},
    {id: 'visitors',label: 'Visitor Management',icon: FiEye},
    {id: 'applications',label: 'Applications',icon: FiFileText},
    {id: 'partnerships',label: 'Partnerships',icon: FiUsers},
    {id: 'emails',label: 'Email Captures',icon: FiMail},
    {id: 'analytics',label: 'Analytics',icon: FiBarChart3},
    {id: 'content',label: 'Content',icon: FiEdit3},
    {id: 'site-settings',label: 'Site Settings',icon: FiGlobe},
    {id: 'email-providers',label: 'Email Providers',icon: FiMail},
    {id: 'settings',label: 'System Settings',icon: FiSettings},
  ];

  const handleViewSite = () => {
    // Open main site in new tab
    window.open('/', '_blank');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
          width: isOpen ? 256 : 64,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 border-r border-gray-200 ${
          isOpen ? 'w-64' : 'w-16'
        } lg:relative lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-trust-blue to-innovation-teal rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <div>
                  <div className="font-inter font-bold text-lg text-gray-900">Admin</div>
                  <div className="text-xs text-gray-600">IKnowAG.ai</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg hover:bg-gray-100 hidden lg:block"
            >
              <SafeIcon 
                icon={isOpen ? FiChevronLeft : FiChevronRight} 
                className="w-5 h-5 text-gray-500" 
              />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 overflow-y-auto" style={{maxHeight: 'calc(100vh - 280px)'}}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-trust-blue text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* View Site Button */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleViewSite}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors bg-energy-orange text-white hover:bg-orange-600"
            >
              <SafeIcon icon={FiExternalLink} className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">View Site</span>
            </button>
          </div>
        )}

        {/* User Info & Sign Out */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={onSignOut}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                title="Sign Out"
              >
                <SafeIcon icon={FiLogOut} className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default AdminSidebar;