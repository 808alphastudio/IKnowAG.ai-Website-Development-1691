import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { getEmailCaptures, sendEmail } from '../../lib/supabaseQueries';
import toast from 'react-hot-toast';

const { FiMail, FiDownload, FiSend, FiEye, FiFilter, FiSearch, FiUsers, FiTrendingUp } = FiIcons;

const EmailCapturesManager = () => {
  const [emailCaptures, setEmailCaptures] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [filters, setFilters] = useState({
    source: 'all',
    companyType: 'all',
    dateRange: '30d'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEmailCaptures();
  }, []);

  useEffect(() => {
    filterEmails();
  }, [emailCaptures, filters, searchTerm]);

  const loadEmailCaptures = async () => {
    setLoading(true);
    try {
      const data = await getEmailCaptures();
      setEmailCaptures(data);
    } catch (error) {
      console.error('Error loading email captures:', error);
      // Mock data for demo
      setEmailCaptures([
        {
          id: '1',
          email: 'sarah@metroweekly.com',
          company_type: 'local-newspaper',
          source: 'popup',
          interests: ['AI Proposal Tools', 'Content Creation'],
          created_at: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          email: 'mike@vbj.com',
          company_type: 'b2b-publication',
          source: 'inline',
          interests: ['Market Analysis', 'Partnership Opportunities'],
          created_at: '2024-01-14T14:22:00Z',
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterEmails = () => {
    let filtered = emailCaptures.filter(capture => {
      const matchesSearch = capture.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource = filters.source === 'all' || capture.source === filters.source;
      const matchesCompanyType = filters.companyType === 'all' || capture.company_type === filters.companyType;
      
      return matchesSearch && matchesSource && matchesCompanyType;
    });

    setFilteredEmails(filtered);
  };

  const exportEmails = () => {
    const headers = ['Email', 'Company Type', 'Source', 'Interests', 'Date'];
    const csvData = filteredEmails.map(capture => [
      capture.email,
      capture.company_type || 'Not specified',
      capture.source,
      (capture.interests || []).join('; '),
      new Date(capture.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email-captures-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Email list exported successfully');
  };

  const handleSendEmail = async (emailData) => {
    try {
      await sendEmail({
        to: selectedEmails,
        subject: emailData.subject,
        content: emailData.content,
        type: emailData.type
      });
      setShowComposeModal(false);
      setSelectedEmails([]);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'popup': return 'bg-blue-100 text-blue-800';
      case 'inline': return 'bg-green-100 text-green-800';
      case 'partnership': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-inter">Email Captures</h1>
            <p className="text-gray-600">Loading email data...</p>
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
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Email Captures</h1>
          <p className="text-gray-600">Manage newsletter subscribers and email campaigns</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowComposeModal(true)}
            disabled={selectedEmails.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={FiSend} className="w-4 h-4" />
            <span>Send Email ({selectedEmails.length})</span>
          </button>
          <button
            onClick={exportEmails}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{emailCaptures.length}</p>
            </div>
            <div className="w-12 h-12 bg-trust-blue rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {emailCaptures.filter(e => {
                  const date = new Date(e.created_at);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-innovation-teal rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Popup Captures</p>
              <p className="text-2xl font-bold text-gray-900">
                {emailCaptures.filter(e => e.source === 'popup').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-green rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiMail} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {emailCaptures.length > 0 ? '12.5%' : '0%'}
              </p>
            </div>
            <div className="w-12 h-12 bg-energy-orange rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={filters.source}
              onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            >
              <option value="all">All Sources</option>
              <option value="popup">Popup</option>
              <option value="inline">Inline</option>
              <option value="partnership">Partnership</option>
            </select>

            <select
              value={filters.companyType}
              onChange={(e) => setFilters(prev => ({ ...prev, companyType: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="local-newspaper">Local Newspaper</option>
              <option value="regional-magazine">Regional Magazine</option>
              <option value="b2b-publication">B2B Publication</option>
              <option value="community-radio">Community Radio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEmails(filteredEmails.map(email => email.email));
                      } else {
                        setSelectedEmails([]);
                      }
                    }}
                    className="text-trust-blue focus:ring-trust-blue"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmails.map((capture) => (
                <tr key={capture.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(capture.email)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmails([...selectedEmails, capture.email]);
                        } else {
                          setSelectedEmails(selectedEmails.filter(email => email !== capture.email));
                        }
                      }}
                      className="text-trust-blue focus:ring-trust-blue"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{capture.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {capture.company_type ? capture.company_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceColor(capture.source)}`}>
                      {capture.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {(capture.interests || []).slice(0, 2).map((interest, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {interest}
                        </span>
                      ))}
                      {(capture.interests || []).length > 2 && (
                        <span className="text-xs text-gray-500">+{capture.interests.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(capture.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose Email Modal */}
      {showComposeModal && (
        <EmailComposeModal
          recipients={selectedEmails}
          onClose={() => setShowComposeModal(false)}
          onSend={handleSendEmail}
        />
      )}
    </div>
  );
};

const EmailComposeModal = ({ recipients, onClose, onSend }) => {
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
    type: 'newsletter'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSend(emailData);
    } finally {
      setIsLoading(false);
    }
  };

  const templates = {
    newsletter: {
      subject: 'New AI Framework Available for Small Media Companies',
      content: `Hi there,

We've just released a new AI framework specifically designed for small media companies.

This week's focus: Sales Proposal Automation

Key benefits:
• 15-minute proposal creation
• Competitive pricing analysis
• Custom client recommendations
• Professional formatting

Available to our partnership program members.

Best regards,
Guy Tasaka
IKnowAG.ai`
    },
    partnership: {
      subject: 'Partnership Opportunity Available - Limited Spots',
      content: `Hello,

We have a new partnership opportunity opening up for small media companies.

Details:
• Up to 3 companies can share $3,500 training
• 2-day onsite implementation
• 12 months of follow-up support
• All AI frameworks included

Applications are being reviewed weekly.

Apply now: [Partnership Link]

Guy Tasaka
IKnowAG.ai`
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Compose Email</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <SafeIcon icon={FiIcons.FiX} className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Sending to {recipients.length} recipient{recipients.length !== 1 ? 's' : ''}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Type
            </label>
            <select
              value={emailData.type}
              onChange={(e) => {
                const template = templates[e.target.value];
                setEmailData({
                  type: e.target.value,
                  subject: template.subject,
                  content: template.content
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            >
              <option value="newsletter">Newsletter</option>
              <option value="partnership">Partnership Update</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Line
            </label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Content
            </label>
            <textarea
              value={emailData.content}
              onChange={(e) => setEmailData({ ...emailData, content: e.target.value })}
              rows="12"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
              required
            />
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
              disabled={isLoading}
              className="px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <SafeIcon icon={FiSend} className="w-4 h-4" />
                  <span>Send Email</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailCapturesManager;