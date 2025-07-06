import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { 
  FiUsers, FiCalendar, FiDollarSign, FiMapPin, FiPhone, FiMail,
  FiPlus, FiEdit3, FiTrash2, FiCheck, FiClock, FiAlertCircle, FiX
} = FiIcons;

const PartnershipsManager = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState(null);

  // Mock data - replace with Supabase queries
  useEffect(() => {
    const mockPartnerships = [
      {
        id: 1,
        name: 'Portland Media Collaborative',
        companies: [
          { name: 'Metro Weekly', contact: 'Sarah Johnson', email: 'sarah@metroweekly.com' },
          { name: 'Pacific Business Journal', contact: 'Tom Wilson', email: 'tom@pbj.com' }
        ],
        type: 'two-company',
        totalValue: 3500,
        perCompany: 1750,
        status: 'active',
        startDate: '2024-02-01',
        onSiteDate: '2024-02-15',
        location: 'Portland, OR',
        sessionsCompleted: 2,
        totalSessions: 10,
        frameworks: ['AI Proposal Builder', 'Newsletter Generation', 'Business Intelligence'],
        notes: 'Excellent collaboration between companies. Strong progress on AI implementation.',
        createdAt: '2024-01-14T10:00:00Z'
      },
      {
        id: 2,
        name: 'Valley Business Focus',
        companies: [
          { name: 'Valley Business Journal', contact: 'Mike Rodriguez', email: 'mike@vbj.com' }
        ],
        type: 'individual',
        totalValue: 3500,
        perCompany: 3500,
        status: 'scheduled',
        startDate: '2024-02-20',
        onSiteDate: '2024-02-20',
        location: 'Fresno, CA',
        sessionsCompleted: 0,
        totalSessions: 10,
        frameworks: ['Business Intelligence', 'Market Analysis', 'AI Proposal Builder'],
        notes: 'Individual partnership focused on B2B market analysis.',
        createdAt: '2024-01-15T14:30:00Z'
      },
      {
        id: 3,
        name: 'Texas Media Innovation',
        companies: [
          { name: 'Community Voice Radio', contact: 'Jennifer Chen', email: 'jen@cvradio.org' },
          { name: 'Austin Weekly', contact: 'David Park', email: 'david@austinweekly.com' },
          { name: 'Hill Country Magazine', contact: 'Lisa Turner', email: 'lisa@hcmag.com' }
        ],
        type: 'three-company',
        totalValue: 3500,
        perCompany: 1167,
        status: 'completed',
        startDate: '2023-11-01',
        onSiteDate: '2023-11-15',
        location: 'Austin, TX',
        sessionsCompleted: 10,
        totalSessions: 10,
        frameworks: ['Content Creation', 'Business Intelligence', 'Newsletter Generation', 'Fact Checking Tool'],
        notes: 'Highly successful three-company collaboration. All companies implementing AI tools effectively.',
        createdAt: '2023-10-20T09:15:00Z'
      }
    ];
    setPartnerships(mockPartnerships);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return FiCheck;
      case 'scheduled':
        return FiClock;
      case 'completed':
        return FiCheck;
      case 'cancelled':
        return FiAlertCircle;
      default:
        return FiClock;
    }
  };

  const getPartnershipTypeLabel = (type) => {
    switch (type) {
      case 'individual':
        return '1 Company';
      case 'two-company':
        return '2 Companies';
      case 'three-company':
        return '3 Companies';
      default:
        return type;
    }
  };

  const calculateProgress = (completed, total) => {
    return total > 0 ? (completed / total) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Active Partnerships</h1>
          <p className="text-gray-600">Manage ongoing and completed partnerships</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>New Partnership</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Partnerships</p>
              <p className="text-2xl font-bold text-gray-900">
                {partnerships.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {partnerships.filter(p => p.status === 'scheduled').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCalendar} className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${partnerships.reduce((sum, p) => sum + p.totalValue, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-green bg-opacity-10 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-success-green" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {partnerships.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCheck} className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Partnerships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partnerships.map((partnership) => (
          <motion.div
            key={partnership.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{partnership.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(partnership.status)}`}>
                    <SafeIcon icon={getStatusIcon(partnership.status)} className="w-3 h-3 mr-1" />
                    {partnership.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {getPartnershipTypeLabel(partnership.type)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Companies */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Companies</h4>
              <div className="space-y-2">
                {partnership.companies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{company.name}</span>
                    <span className="text-gray-500">{company.contact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            {partnership.status === 'active' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Training Progress</span>
                  <span className="text-gray-900 font-medium">
                    {partnership.sessionsCompleted}/{partnership.totalSessions} sessions
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-trust-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress(partnership.sessionsCompleted, partnership.totalSessions)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Total Value:</span>
                <span className="font-medium">${partnership.totalValue.toLocaleString()}</span>
                <span className="text-gray-500">
                  (${partnership.perCompany.toLocaleString()} per company)
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{new Date(partnership.startDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{partnership.location}</span>
              </div>
            </div>

            {/* Frameworks */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">AI Frameworks</h4>
              <div className="flex flex-wrap gap-1">
                {partnership.frameworks.slice(0, 3).map((framework, index) => (
                  <span key={index} className="px-2 py-1 bg-trust-blue bg-opacity-10 text-trust-blue text-xs rounded-full">
                    {framework}
                  </span>
                ))}
                {partnership.frameworks.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{partnership.frameworks.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Notes */}
            {partnership.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">{partnership.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Create Partnership Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New Partnership</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                    placeholder="e.g., Austin Media Collaborative"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Partnership Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent">
                      <option value="individual">Individual ($3,500)</option>
                      <option value="two-company">2 Companies ($1,750 each)</option>
                      <option value="three-company">3 Companies ($1,167 each)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                    placeholder="Partnership notes and objectives..."
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Partnership
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PartnershipsManager;