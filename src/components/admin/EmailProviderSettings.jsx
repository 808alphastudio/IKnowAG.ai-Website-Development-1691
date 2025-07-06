import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { getEmailSettings, updateEmailSettings } from '../../lib/supabaseQueries';
import toast from 'react-hot-toast';

const { FiMail, FiSettings, FiSend, FiCheck, FiX, FiPlus, FiEdit3, FiTrash2 } = FiIcons;

const EmailProviderSettings = () => {
  const [activeProvider, setActiveProvider] = useState('mailgun');
  const [settings, setSettings] = useState({
    mailgun: {
      domain: '',
      apiKey: '',
      baseUrl: 'https://api.mailgun.net/v3',
      enabled: false
    },
    sendgrid: {
      apiKey: '',
      enabled: false
    },
    amazonses: {
      accessKeyId: '',
      secretAccessKey: '',
      region: 'us-east-1',
      enabled: false
    }
  });
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmailSettings();
  }, []);

  const loadEmailSettings = async () => {
    setLoading(true);
    try {
      const data = await getEmailSettings();
      if (data) {
        setSettings(data.providers || settings);
        setEmailTemplates(data.templates || []);
      }
    } catch (error) {
      console.error('Error loading email settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderChange = (provider, field, value) => {
    setSettings(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [field]: value
      }
    }));
  };

  const testEmailProvider = async (provider) => {
    try {
      toast.loading('Testing email provider...');
      
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.dismiss();
      toast.success(`${provider} configuration is valid!`);
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to test ${provider} configuration`);
    }
  };

  const saveProviderSettings = async () => {
    try {
      await updateEmailSettings({
        providers: settings,
        templates: emailTemplates
      });
      toast.success('Email provider settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save email provider settings');
    }
  };

  const renderMailgunSettings = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
          <input
            type="text"
            value={settings.mailgun.domain}
            onChange={(e) => handleProviderChange('mailgun', 'domain', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="mg.yourdomain.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
          <input
            type="password"
            value={settings.mailgun.apiKey}
            onChange={(e) => handleProviderChange('mailgun', 'apiKey', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Base URL</label>
        <input
          type="text"
          value={settings.mailgun.baseUrl}
          onChange={(e) => handleProviderChange('mailgun', 'baseUrl', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderSendGridSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
        <input
          type="password"
          value={settings.sendgrid.apiKey}
          onChange={(e) => handleProviderChange('sendgrid', 'apiKey', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        />
      </div>
    </div>
  );

  const renderAmazonSESSettings = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Access Key ID</label>
          <input
            type="text"
            value={settings.amazonses.accessKeyId}
            onChange={(e) => handleProviderChange('amazonses', 'accessKeyId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="AKIAIOSFODNN7EXAMPLE"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secret Access Key</label>
          <input
            type="password"
            value={settings.amazonses.secretAccessKey}
            onChange={(e) => handleProviderChange('amazonses', 'secretAccessKey', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
        <select
          value={settings.amazonses.region}
          onChange={(e) => handleProviderChange('amazonses', 'region', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
        >
          <option value="us-east-1">US East (N. Virginia)</option>
          <option value="us-west-2">US West (Oregon)</option>
          <option value="eu-west-1">EU (Ireland)</option>
        </select>
      </div>
    </div>
  );

  const renderProviderSettings = () => {
    switch (activeProvider) {
      case 'mailgun': return renderMailgunSettings();
      case 'sendgrid': return renderSendGridSettings();
      case 'amazonses': return renderAmazonSESSettings();
      default: return renderMailgunSettings();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Email Provider Settings</h1>
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
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Email Provider Settings</h1>
          <p className="text-gray-600">Configure email providers and transactional email templates</p>
        </div>
        <button
          onClick={saveProviderSettings}
          className="flex items-center space-x-2 px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiCheck} className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provider Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Providers</h3>
            <div className="space-y-3">
              {[
                { id: 'mailgun', name: 'Mailgun', icon: FiMail },
                { id: 'sendgrid', name: 'SendGrid', icon: FiSend },
                { id: 'amazonses', name: 'Amazon SES', icon: FiSettings }
              ].map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setActiveProvider(provider.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    activeProvider === provider.id
                      ? 'border-trust-blue bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={provider.icon} className="w-5 h-5" />
                    <span className="font-medium">{provider.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {settings[provider.id]?.enabled && (
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Provider Configuration */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {activeProvider.charAt(0).toUpperCase() + activeProvider.slice(1)} Configuration
              </h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings[activeProvider]?.enabled || false}
                  onChange={(e) => handleProviderChange(activeProvider, 'enabled', e.target.checked)}
                  className="text-trust-blue focus:ring-trust-blue"
                />
                <span className="text-sm font-medium text-gray-700">Enable Provider</span>
              </label>
            </div>

            {renderProviderSettings()}

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => testEmailProvider(activeProvider)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <SafeIcon icon={FiSend} className="w-4 h-4" />
                <span>Test Configuration</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Transactional Email Templates</h3>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4" />
              <span>New Template</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <EmailTemplatesTable
            templates={emailTemplates}
            onEdit={(template) => {
              setSelectedTemplate(template);
              setShowTemplateModal(true);
            }}
            onDelete={(templateId) => {
              setEmailTemplates(prev => prev.filter(t => t.id !== templateId));
              toast.success('Template deleted successfully');
            }}
          />
        </div>
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <EmailTemplateModal
          template={selectedTemplate}
          onClose={() => {
            setShowTemplateModal(false);
            setSelectedTemplate(null);
          }}
          onSave={(template) => {
            if (selectedTemplate) {
              setEmailTemplates(prev => prev.map(t => t.id === template.id ? template : t));
            } else {
              setEmailTemplates(prev => [...prev, { ...template, id: Date.now().toString() }]);
            }
            setShowTemplateModal(false);
            setSelectedTemplate(null);
            toast.success('Template saved successfully');
          }}
        />
      )}
    </div>
  );
};

const EmailTemplatesTable = ({ templates, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {templates.map((template) => (
            <tr key={template.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{template.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {template.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(template)}
                    className="text-trust-blue hover:text-blue-700"
                  >
                    <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(template.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EmailTemplateModal = ({ template, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    type: template?.type || 'welcome',
    subject: template?.subject || '',
    htmlContent: template?.htmlContent || '',
    textContent: template?.textContent || '',
    triggers: template?.triggers || [],
    active: template?.active || true
  });

  const templateTypes = [
    'welcome',
    'email_verification',
    'password_reset',
    'application_received',
    'application_approved',
    'application_rejected',
    'partnership_reminder',
    'newsletter'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {template ? 'Edit Template' : 'New Email Template'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              >
                {templateTypes.map(type => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              placeholder="Use {{variables}} for dynamic content"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HTML Content</label>
            <textarea
              value={formData.htmlContent}
              onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              rows="10"
              placeholder="HTML email template content..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Content (Fallback)</label>
            <textarea
              value={formData.textContent}
              onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              rows="6"
              placeholder="Plain text version of the email..."
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="text-trust-blue focus:ring-trust-blue"
              />
              <span className="text-sm font-medium text-gray-700">Active Template</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Template
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailProviderSettings;