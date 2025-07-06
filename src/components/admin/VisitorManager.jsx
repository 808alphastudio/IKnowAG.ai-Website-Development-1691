import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { getVisitors, getVisitorDetails, updateVisitorScore } from '../../lib/supabaseQueries';
import toast from 'react-hot-toast';

const { FiUsers, FiEye, FiMapPin, FiClock, FiTrendingUp, FiMail, FiUser, FiX } = FiIcons;

const VisitorManager = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    designation: 'all',
    leadScore: 'all',
    dateRange: '30d'
  });

  useEffect(() => {
    loadVisitors();
  }, []);

  useEffect(() => {
    filterVisitors();
  }, [visitors, filters]);

  const loadVisitors = async () => {
    setLoading(true);
    try {
      const data = await getVisitors();
      setVisitors(data);
    } catch (error) {
      console.error('Error loading visitors:', error);
      // Mock data for demo
      setVisitors([
        {
          id: '1',
          visitor_id: 'vis_123',
          email: 'sarah@metroweekly.com',
          name: 'Sarah Johnson',
          designation: 'email',
          lead_score: 85,
          original_source: 'google',
          location: 'Portland, OR',
          visit_count: 12,
          last_activity: '2024-01-15T10:30:00Z',
          first_seen: '2024-01-10T08:15:00Z'
        },
        {
          id: '2',
          visitor_id: 'vis_124',
          email: null,
          name: null,
          designation: 'visitor',
          lead_score: 25,
          original_source: 'direct',
          location: 'Seattle, WA',
          visit_count: 3,
          last_activity: '2024-01-15T14:22:00Z',
          first_seen: '2024-01-15T12:00:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterVisitors = () => {
    let filtered = visitors.filter(visitor => {
      const matchesDesignation = filters.designation === 'all' || visitor.designation === filters.designation;
      
      let matchesLeadScore = true;
      if (filters.leadScore === 'high') matchesLeadScore = visitor.lead_score >= 75;
      else if (filters.leadScore === 'medium') matchesLeadScore = visitor.lead_score >= 50 && visitor.lead_score < 75;
      else if (filters.leadScore === 'low') matchesLeadScore = visitor.lead_score < 50;
      
      return matchesDesignation && matchesLeadScore;
    });

    setFilteredVisitors(filtered);
  };

  const getDesignationColor = (designation) => {
    switch (designation) {
      case 'subscriber': return 'bg-green-100 text-green-800';
      case 'registered': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-yellow-100 text-yellow-800';
      case 'visitor': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const viewVisitorDetails = async (visitor) => {
    try {
      const details = await getVisitorDetails(visitor.visitor_id);
      setSelectedVisitor({ ...visitor, ...details });
      setShowDetails(true);
    } catch (error) {
      console.error('Error loading visitor details:', error);
      setSelectedVisitor(visitor);
      setShowDetails(true);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-inter">Visitor Management</h1>
            <p className="text-gray-600">Loading visitor data...</p>
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
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Visitor Management</h1>
          <p className="text-gray-600">Track and manage website visitors and leads</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{visitors.length}</p>
            </div>
            <div className="w-12 h-12 bg-trust-blue rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Identified</p>
              <p className="text-2xl font-bold text-gray-900">
                {visitors.filter(v => v.email).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-innovation-teal rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High-Score Leads</p>
              <p className="text-2xl font-bold text-gray-900">
                {visitors.filter(v => v.lead_score >= 75).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-green rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Lead Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {visitors.length > 0 ? Math.round(visitors.reduce((sum, v) => sum + v.lead_score, 0) / visitors.length) : 0}
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
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.designation}
            onChange={(e) => setFilters(prev => ({ ...prev, designation: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          >
            <option value="all">All Designations</option>
            <option value="visitor">Visitors</option>
            <option value="email">Email Captured</option>
            <option value="registered">Registered</option>
            <option value="subscriber">Subscribers</option>
          </select>

          <select
            value={filters.leadScore}
            onChange={(e) => setFilters(prev => ({ ...prev, leadScore: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          >
            <option value="all">All Lead Scores</option>
            <option value="high">High (75+)</option>
            <option value="medium">Medium (50-74)</option>
            <option value="low">Low (&lt;50)</option>
          </select>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visitor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {visitor.name || visitor.email || `Visitor ${visitor.visitor_id.slice(-6)}`}
                      </div>
                      {visitor.email && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <SafeIcon icon={FiMail} className="w-3 h-3 mr-1" />
                          {visitor.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDesignationColor(visitor.designation)}`}>
                      {visitor.designation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getLeadScoreColor(visitor.lead_score)}`}>
                      {visitor.lead_score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                      {visitor.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {visitor.visit_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                      {new Date(visitor.last_activity).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewVisitorDetails(visitor)}
                      className="text-trust-blue hover:text-blue-700"
                    >
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visitor Details Modal */}
      {showDetails && selectedVisitor && (
        <VisitorDetailsModal
          visitor={selectedVisitor}
          onClose={() => setShowDetails(false)}
          getDesignationColor={getDesignationColor}
        />
      )}
    </div>
  );
};

const VisitorDetailsModal = ({ visitor, onClose, getDesignationColor }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Visitor Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Name:</span>
                  <span className="ml-2">{visitor.name || 'Unknown'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Email:</span>
                  <span className="ml-2">{visitor.email || 'Not captured'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Designation:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getDesignationColor(visitor.designation)}`}>
                    {visitor.designation}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Lead Score:</span>
                  <span className="ml-2 font-medium">{visitor.lead_score}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Total Visits:</span>
                  <span className="ml-2">{visitor.visit_count}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">First Seen:</span>
                  <span className="ml-2">{new Date(visitor.first_seen).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Last Activity:</span>
                  <span className="ml-2">{new Date(visitor.last_activity).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Original Source:</span>
                  <span className="ml-2">{visitor.original_source}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Session history would be displayed here with visitor tracking data</p>
            </div>
          </div>

          {/* Page Views */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Views</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Page view history would be displayed here with detailed analytics</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisitorManager;