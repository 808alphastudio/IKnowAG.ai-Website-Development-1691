import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { getSiteSettings, updateSiteSettings } from '../../lib/supabaseQueries';
import toast from 'react-hot-toast';

const { FiSettings, FiImage, FiType, FiPalette, FiGlobe, FiSave, FiUpload } = FiIcons;

const SiteSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'IKnowAG.ai',
      businessName: 'IKnowAG.ai',
      tagline: 'AI Enablement for Small Media Companies',
      description: 'Guy Tasaka teaches small media companies AI enablement frameworks. Simple solutions, not complex systems.',
      logo: '',
      favicon: '',
      heroImage: ''
    },
    branding: {
      primaryColor: '#2C5282',
      secondaryColor: '#319795',
      accentColor: '#F56500',
      fontFamily: 'Inter',
      fontHeadings: 'Inter',
      fontBody: 'Open Sans'
    },
    seo: {
      metaTitle: 'IKnowAG.ai - AI Enablement for Small Media Companies',
      metaDescription: 'Guy Tasaka teaches small media companies AI enablement frameworks. Simple solutions, not complex systems.',
      ogImage: '',
      ogDescription: 'While enterprise media faces challenges, new AI-native entrepreneurs enter local markets. Learn practical frameworks and move faster than both.',
      keywords: 'small media AI, local newspaper AI tools, media AI consultant, Guy Tasaka, AI enablement training',
      schemaType: 'Organization'
    },
    analytics: {
      googleAnalytics: 'GA-XXXXXXXXX',
      facebookPixel: '',
      linkedinPixel: '',
      microsoftClarity: '',
      customTrackingCode: ''
    }
  });

  useEffect(() => {
    loadSiteSettings();
  }, []);

  const loadSiteSettings = async () => {
    setLoading(true);
    try {
      const data = await getSiteSettings();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'branding', label: 'Branding', icon: FiPalette },
    { id: 'seo', label: 'SEO & Meta', icon: FiGlobe },
    { id: 'analytics', label: 'Analytics', icon: FiSettings }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      await updateSiteSettings(settings);
      setHasUnsavedChanges(false);
      toast.success('Site settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save site settings');
    }
  };

  const handleFileUpload = async (category, key, file) => {
    try {
      // In a real implementation, upload to storage service
      const url = URL.createObjectURL(file);
      handleSettingChange(category, key, url);
      toast.success('File uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload file');
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
          <input
            type="text"
            value={settings.general.businessName}
            onChange={(e) => handleSettingChange('general', 'businessName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Used as a variable throughout the site</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
        <input
          type="text"
          value={settings.general.tagline}
          onChange={(e) => handleSettingChange('general', 'tagline', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={settings.general.description}
          onChange={(e) => handleSettingChange('general', 'description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          rows="3"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {settings.general.logo ? (
              <img src={settings.general.logo} alt="Logo" className="h-16 mx-auto" />
            ) : (
              <SafeIcon icon={FiImage} className="h-16 w-16 text-gray-400 mx-auto" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileUpload('general', 'logo', e.target.files[0])}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <SafeIcon icon={FiUpload} className="w-4 h-4 mr-1" />
              Upload Logo
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {settings.general.favicon ? (
              <img src={settings.general.favicon} alt="Favicon" className="h-8 w-8 mx-auto" />
            ) : (
              <SafeIcon icon={FiImage} className="h-8 w-8 text-gray-400 mx-auto" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileUpload('general', 'favicon', e.target.files[0])}
              className="hidden"
              id="favicon-upload"
            />
            <label
              htmlFor="favicon-upload"
              className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <SafeIcon icon={FiUpload} className="w-4 h-4 mr-1" />
              Upload
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {settings.general.heroImage ? (
              <img src={settings.general.heroImage} alt="Hero" className="h-16 mx-auto object-cover" />
            ) : (
              <SafeIcon icon={FiImage} className="h-16 w-16 text-gray-400 mx-auto" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileUpload('general', 'heroImage', e.target.files[0])}
              className="hidden"
              id="hero-upload"
            />
            <label
              htmlFor="hero-upload"
              className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <SafeIcon icon={FiUpload} className="w-4 h-4 mr-1" />
              Upload
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrandingSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Color Palette</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.branding.primaryColor}
              onChange={(e) => handleSettingChange('branding', 'primaryColor', e.target.value)}
              className="w-12 h-10 rounded border border-gray-300"
            />
            <input
              type="text"
              value={settings.branding.primaryColor}
              onChange={(e) => handleSettingChange('branding', 'primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.branding.secondaryColor}
              onChange={(e) => handleSettingChange('branding', 'secondaryColor', e.target.value)}
              className="w-12 h-10 rounded border border-gray-300"
            />
            <input
              type="text"
              value={settings.branding.secondaryColor}
              onChange={(e) => handleSettingChange('branding', 'secondaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.branding.accentColor}
              onChange={(e) => handleSettingChange('branding', 'accentColor', e.target.value)}
              className="w-12 h-10 rounded border border-gray-300"
            />
            <input
              type="text"
              value={settings.branding.accentColor}
              onChange={(e) => handleSettingChange('branding', 'accentColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">Typography</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Heading Font</label>
          <select
            value={settings.branding.fontHeadings}
            onChange={(e) => handleSettingChange('branding', 'fontHeadings', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
            <option value="Montserrat">Montserrat</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Body Font</label>
          <select
            value={settings.branding.fontBody}
            onChange={(e) => handleSettingChange('branding', 'fontBody', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          >
            <option value="Open Sans">Open Sans</option>
            <option value="Roboto">Roboto</option>
            <option value="Lato">Lato</option>
            <option value="Source Sans Pro">Source Sans Pro</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
        <input
          type="text"
          value={settings.seo.metaTitle}
          onChange={(e) => handleSettingChange('seo', 'metaTitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          maxLength="60"
        />
        <p className="text-xs text-gray-500 mt-1">{settings.seo.metaTitle.length}/60 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
        <textarea
          value={settings.seo.metaDescription}
          onChange={(e) => handleSettingChange('seo', 'metaDescription', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          rows="3"
          maxLength="160"
        />
        <p className="text-xs text-gray-500 mt-1">{settings.seo.metaDescription.length}/160 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
        <input
          type="text"
          value={settings.seo.keywords}
          onChange={(e) => handleSettingChange('seo', 'keywords', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OpenGraph Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {settings.seo.ogImage ? (
              <img src={settings.seo.ogImage} alt="OG Image" className="h-24 mx-auto object-cover" />
            ) : (
              <SafeIcon icon={FiImage} className="h-24 w-24 text-gray-400 mx-auto" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileUpload('seo', 'ogImage', e.target.files[0])}
              className="hidden"
              id="og-image-upload"
            />
            <label
              htmlFor="og-image-upload"
              className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <SafeIcon icon={FiUpload} className="w-4 h-4 mr-1" />
              Upload OG Image
            </label>
            <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Schema Type</label>
          <select
            value={settings.seo.schemaType}
            onChange={(e) => handleSettingChange('seo', 'schemaType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          >
            <option value="Organization">Organization</option>
            <option value="LocalBusiness">Local Business</option>
            <option value="ProfessionalService">Professional Service</option>
            <option value="EducationalOrganization">Educational Organization</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">OpenGraph Description</label>
        <textarea
          value={settings.seo.ogDescription}
          onChange={(e) => handleSettingChange('seo', 'ogDescription', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          rows="3"
        />
      </div>
    </div>
  );

  const renderAnalyticsSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
          <input
            type="text"
            value={settings.analytics.googleAnalytics}
            onChange={(e) => handleSettingChange('analytics', 'googleAnalytics', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="GA-XXXXXXXXX or G-XXXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
          <input
            type="text"
            value={settings.analytics.facebookPixel}
            onChange={(e) => handleSettingChange('analytics', 'facebookPixel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="123456789012345"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Insight Tag</label>
          <input
            type="text"
            value={settings.analytics.linkedinPixel}
            onChange={(e) => handleSettingChange('analytics', 'linkedinPixel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="12345"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Microsoft Clarity</label>
          <input
            type="text"
            value={settings.analytics.microsoftClarity}
            onChange={(e) => handleSettingChange('analytics', 'microsoftClarity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="abcdefghij"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Custom Tracking Code</label>
        <textarea
          value={settings.analytics.customTrackingCode}
          onChange={(e) => handleSettingChange('analytics', 'customTrackingCode', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          rows="6"
          placeholder="<!-- Custom tracking code goes here -->"
        />
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'branding': return renderBrandingSettings();
      case 'seo': return renderSEOSettings();
      case 'analytics': return renderAnalyticsSettings();
      default: return renderGeneralSettings();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Site Settings</h1>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-trust-blue"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Site Settings</h1>
          <p className="text-gray-600">Configure your website appearance and functionality</p>
        </div>
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>
          )}
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className="flex items-center space-x-2 px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Settings Categories</h3>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-trust-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label} Settings
              </h3>
              {hasUnsavedChanges && (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  Unsaved Changes
                </span>
              )}
            </div>
            {renderActiveTab()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;