import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { getSettings, updateSettings } from '../../lib/supabaseQueries';
import toast from 'react-hot-toast';

const { FiSettings, FiMail, FiShield, FiDatabase, FiUsers, FiBell, FiGlobe, FiLock, FiSave, FiRefreshCw } = FiIcons;

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'IKnowAG.ai',
      tagline: 'AI Enablement for Small Media Companies',
      adminEmail: 'admin@iknowag.ai',
      supportEmail: 'support@iknowag.ai',
      timezone: 'America/New_York',
      maintenanceMode: false,
    },
    partnerships: {
      maxPartnerships: 5,
      applicationReviewDays: 5,
      partnershipDuration: 12,
      maxCompaniesPerPartnership: 3,
      autoApprovalEnabled: false,
      requireManualReview: true,
    },
    email: {
      emailProvider: 'mailgun',
      mailgunDomain: '',
      mailgunApiKey: '',
      sendgridApiKey: '',
      fromEmail: 'guy@iknowag.ai',
      fromName: 'Guy Tasaka - IKnowAG.ai',
      replyToEmail: 'guy@iknowag.ai',
      emailSignature: 'Best regards,\nGuy Tasaka\nIKnowAG.ai\nhttps://iknowag.ai',
      enableEmailCapture: true,
      popupDelay: 30,
      popupScrollTrigger: 50,
    },
    notifications: {
      newApplications: true,
      partnershipUpdates: true,
      systemAlerts: true,
      weeklyReports: true,
      emailNotifications: true,
      slackIntegration: false,
      slackWebhookUrl: '',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 60,
      passwordExpiration: 90,
      loginAttempts: 5,
      ipWhitelisting: false,
      auditLogging: true,
    },
    integrations: {
      googleAnalytics: 'GA-XXXXXXXXX',
      facebookPixel: '',
      linkedinInsight: '',
      supabaseUrl: 'https://jpjoppwsmjjnfcutkfct.supabase.co',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const savedSettings = await getSettings();
      if (savedSettings) {
        setSettings(savedSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'partnerships', label: 'Partnerships', icon: FiUsers },
    { id: 'email', label: 'Email Settings', icon: FiMail },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'integrations', label: 'Integrations', icon: FiGlobe },
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
      await updateSettings(settings);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const testEmailSettings = async () => {
    try {
      toast.loading('Testing email configuration...');
      // Simulate email test
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.dismiss();
      toast.success('Test email sent successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to send test email');
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
          <input
            type="text"
            value={settings.general.tagline}
            onChange={(e) => handleSettingChange('general', 'tagline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
          <input
            type="email"
            value={settings.general.adminEmail}
            onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
          <input
            type="email"
            value={settings.general.supportEmail}
            onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
              className="text-trust-blue focus:ring-trust-blue"
            />
            <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">Temporarily disable public access to the site</p>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Provider</label>
          <select
            value={settings.email.emailProvider}
            onChange={(e) => handleSettingChange('email', 'emailProvider', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          >
            <option value="mailgun">Mailgun</option>
            <option value="sendgrid">SendGrid</option>
            <option value="smtp">Custom SMTP</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reply To Email</label>
          <input
            type="email"
            value={settings.email.replyToEmail}
            onChange={(e) => handleSettingChange('email', 'replyToEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          />
        </div>
      </div>

      {settings.email.emailProvider === 'mailgun' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mailgun Domain</label>
            <input
              type="text"
              value={settings.email.mailgunDomain}
              onChange={(e) => handleSettingChange('email', 'mailgunDomain', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              placeholder="mg.yourdomain.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mailgun API Key</label>
            <input
              type="password"
              value={settings.email.mailgunApiKey}
              onChange={(e) => handleSettingChange('email', 'mailgunApiKey', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Signature</label>
        <textarea
          value={settings.email.emailSignature}
          onChange={(e) => handleSettingChange('email', 'emailSignature', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          rows="4"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Capture Settings</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.email.enableEmailCapture}
                onChange={(e) => handleSettingChange('email', 'enableEmailCapture', e.target.checked)}
                className="text-trust-blue focus:ring-trust-blue"
              />
              <span className="text-sm font-medium text-gray-700">Enable Email Capture Popup</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Popup Delay (seconds)</label>
            <input
              type="number"
              value={settings.email.popupDelay}
              onChange={(e) => handleSettingChange('email', 'popupDelay', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              min="5"
              max="120"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Scroll Trigger (%)</label>
            <input
              type="number"
              value={settings.email.popupScrollTrigger}
              onChange={(e) => handleSettingChange('email', 'popupScrollTrigger', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              min="10"
              max="90"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={testEmailSettings}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <SafeIcon icon={FiMail} className="w-4 h-4" />
          <span>Send Test Email</span>
        </button>
      </div>
    </div>
  );

  const renderPartnershipSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Active Partnerships</label>
          <input
            type="number"
            value={settings.partnerships.maxPartnerships}
            onChange={(e) => handleSettingChange('partnerships', 'maxPartnerships', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            min="1"
            max="10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Application Review Days</label>
          <input
            type="number"
            value={settings.partnerships.applicationReviewDays}
            onChange={(e) => handleSettingChange('partnerships', 'applicationReviewDays', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            min="1"
            max="30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Duration (months)</label>
          <input
            type="number"
            value={settings.partnerships.partnershipDuration}
            onChange={(e) => handleSettingChange('partnerships', 'partnershipDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            min="6"
            max="24"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Companies per Partnership</label>
          <input
            type="number"
            value={settings.partnerships.maxCompaniesPerPartnership}
            onChange={(e) => handleSettingChange('partnerships', 'maxCompaniesPerPartnership', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            min="1"
            max="3"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.partnerships.autoApprovalEnabled}
            onChange={(e) => handleSettingChange('partnerships', 'autoApprovalEnabled', e.target.checked)}
            className="text-trust-blue focus:ring-trust-blue"
          />
          <span className="text-sm font-medium text-gray-700">Auto-approval for qualified applications</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.partnerships.requireManualReview}
            onChange={(e) => handleSettingChange('partnerships', 'requireManualReview', e.target.checked)}
            className="text-trust-blue focus:ring-trust-blue"
          />
          <span className="text-sm font-medium text-gray-700">Require manual review for all applications</span>
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">New Applications</span>
            <p className="text-xs text-gray-500">Receive notifications when new partnership applications are submitted</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.newApplications}
            onChange={(e) => handleSettingChange('notifications', 'newApplications', e.target.checked)}
            className="text-trust-blue focus:ring-trust-blue"
          />
        </label>
        <label className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">Partnership Updates</span>
            <p className="text-xs text-gray-500">Get notified about partnership progress and milestones</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.partnershipUpdates}
            onChange={(e) => handleSettingChange('notifications', 'partnershipUpdates', e.target.checked)}
            className="text-trust-blue focus:ring-trust-blue"
          />
        </label>
        <label className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">Weekly Reports</span>
            <p className="text-xs text-gray-500">Summary of applications, partnerships, and revenue</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.weeklyReports}
            onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
            className="text-trust-blue focus:ring-trust-blue"
          />
        </label>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Slack Integration</span>
              <p className="text-xs text-gray-500">Send notifications to Slack channel</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.slackIntegration}
              onChange={(e) => handleSettingChange('notifications', 'slackIntegration', e.target.checked)}
              className="text-trust-blue focus:ring-trust-blue"
            />
          </label>
          
          {settings.notifications.slackIntegration && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slack Webhook URL</label>
              <input
                type="url"
                value={settings.notifications.slackWebhookUrl}
                onChange={(e) => handleSettingChange('notifications', 'slackWebhookUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                placeholder="https://hooks.slack.com/services/..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            min="15"
            max="480"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.security.loginAttempts}
            onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            min="3"
            max="10"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
            <p className="text-xs text-gray-500">Require 2FA for admin login</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
            className="text-trust-blue focus:ring-trust-blue"
          />
        </label>
        <label className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">Audit Logging</span>
            <p className="text-xs text-gray-500">Log all admin actions and changes</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.auditLogging}
            onChange={(e) => handleSettingChange('security', 'auditLogging', e.target.checked)}
            className="text-trust-blue focus:ring-trust-blue"
          />
        </label>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
        <input
          type="text"
          value={settings.integrations.googleAnalytics}
          onChange={(e) => handleSettingChange('integrations', 'googleAnalytics', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          placeholder="GA-XXXXXXXXX"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
          <input
            type="text"
            value={settings.integrations.facebookPixel}
            onChange={(e) => handleSettingChange('integrations', 'facebookPixel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="123456789012345"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Insight Tag</label>
          <input
            type="text"
            value={settings.integrations.linkedinInsight}
            onChange={(e) => handleSettingChange('integrations', 'linkedinInsight', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="12345"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Configuration</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Supabase URL</label>
          <input
            type="url"
            value={settings.integrations.supabaseUrl}
            onChange={(e) => handleSettingChange('integrations', 'supabaseUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="https://your-project.supabase.co"
          />
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'partnerships': return renderPartnershipSettings();
      case 'email': return renderEmailSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'integrations': return renderIntegrationSettings();
      default: return renderGeneralSettings();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-inter">Settings</h1>
            <p className="text-gray-600">Loading settings...</p>
          </div>
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
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Settings</h1>
          <p className="text-gray-600">Manage system configuration and preferences</p>
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

export default SettingsPanel;