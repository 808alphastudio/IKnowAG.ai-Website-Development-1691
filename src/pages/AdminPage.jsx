import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import VisitorManager from '../components/admin/VisitorManager';
import ApplicationsManager from '../components/admin/ApplicationsManager';
import PartnershipsManager from '../components/admin/PartnershipsManager';
import AnalyticsView from '../components/admin/AnalyticsView';
import ContentManager from '../components/admin/ContentManager';
import SettingsPanel from '../components/admin/SettingsPanel';
import EmailCapturesManager from '../components/admin/EmailCapturesManager';
import SiteSettings from '../components/admin/SiteSettings';
import EmailProviderSettings from '../components/admin/EmailProviderSettings';
import AdminLogin from '../components/admin/AdminLogin';
import { useAuth } from '../hooks/useAuth';
import { Toaster } from 'react-hot-toast';

const { FiLock } = FiIcons;

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const { user, loading, signOut } = useAuth();

  // Demo mode toggle - remove this in production
  const enableDemoMode = () => {
    setDemoMode(true);
  };

  // Create a demo user object for demo mode
  const demoUser = {
    email: 'demo@iknowag.ai',
    id: 'demo-user-id'
  };

  const currentUser = demoMode ? demoUser : user;

  // Loading state
  if (loading && !demoMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trust-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Authentication check with demo mode option
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-trust-blue to-innovation-teal flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-trust-blue to-innovation-teal rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">AI</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-inter">Admin Access</h1>
            <p className="text-gray-600 mt-2">Choose your access method</p>
          </div>

          <div className="space-y-4">
            {/* Demo Mode Button */}
            <button
              onClick={enableDemoMode}
              className="w-full bg-energy-orange hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <span>🎯 Try Demo Mode</span>
            </button>

            <div className="text-center">
              <span className="text-gray-500 text-sm">or</span>
            </div>

            {/* Supabase Login Component */}
            <AdminLogin />
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Demo Mode:</strong> Explore all admin features with sample data
              </p>
              <p className="text-xs text-gray-500">
                No authentication required • Full feature access
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'visitors': return <VisitorManager />;
      case 'applications': return <ApplicationsManager />;
      case 'partnerships': return <PartnershipsManager />;
      case 'analytics': return <AnalyticsView />;
      case 'content': return <ContentManager />;
      case 'settings': return <SettingsPanel />;
      case 'emails': return <EmailCapturesManager />;
      case 'site-settings': return <SiteSettings />;
      case 'email-providers': return <EmailProviderSettings />;
      default: return <DashboardOverview />;
    }
  };

  const handleSignOut = () => {
    if (demoMode) {
      setDemoMode(false);
    } else {
      signOut();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Toaster position="top-right" />

      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="fixed top-0 left-0 right-0 bg-energy-orange text-white text-center py-2 z-50">
          <span className="text-sm font-medium">
            🎯 DEMO MODE ACTIVE - Exploring admin features with sample data
          </span>
        </div>
      )}

      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
      } ${demoMode ? 'mt-10' : ''}`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <SafeIcon icon={FiIcons.FiMenu} className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-inter">
                  Admin Dashboard {demoMode && <span className="text-energy-orange">(Demo)</span>}
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {currentUser.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiLock} className="w-4 h-4" />
                <span>{demoMode ? 'Demo Access' : 'Secure Admin Access'}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {demoMode ? 'Exit Demo' : 'Sign Out'}
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;