import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { getApplications, updateApplicationStatus } from '../../lib/supabaseQueries';
import toast from 'react-hot-toast';

const { FiSearch, FiFilter, FiDownload, FiEye, FiCheck, FiX, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiBuilding } = FiIcons;

const ApplicationsManager = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    mediaType: 'all',
    partnershipType: 'all',
    dateRange: '30d'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch applications from Supabase
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await getApplications();
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
      // Fallback to mock data if Supabase fails
      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
    } finally {
      setLoading(false);
    }
  };

  // Mock data fallback
  const mockApplications = [
    {
      id: '1',
      company_name: 'Metro Weekly',
      media_type: 'Local Newspaper',
      contact_name: 'Sarah Johnson',
      contact_title: 'Publisher',
      contact_email: 'sarah@metroweekly.com',
      contact_phone: '(555) 123-4567',
      location: 'Portland, OR',
      company_size: '11-25',
      partnership_type: 'two-company',
      status: 'pending',
      challenge: 'We need help with AI-powered content creation and sales proposal automation.',
      competitors: 'Aware of some new digital-first publications using AI for content generation.',
      timeline: '1-3-months',
      interested_tools: ['AI Proposal Builder', 'Content Creation', 'Newsletter Generation'],
      comments: 'Very interested in collaborative learning model.',
      created_at: '2024-01-15T10:30:00Z',
      reviewed_at: null,
      reviewed_by: null,
    },
    {
      id: '2',
      company_name: 'Valley Business Journal',
      media_type: 'B2B Publication',
      contact_name: 'Mike Rodriguez',
      contact_title: 'Owner',
      contact_email: 'mike@vbj.com',
      contact_phone: '(555) 987-6543',
      location: 'Fresno, CA',
      company_size: '5-10',
      partnership_type: 'individual',
      status: 'approved',
      challenge: 'Need AI tools for market analysis and business intelligence.',
      competitors: 'Not aware of direct AI competitors yet.',
      timeline: 'immediate',
      interested_tools: ['Business Intelligence', 'Market Analysis', 'AI Proposal Builder'],
      comments: 'Ready to implement immediately.',
      created_at: '2024-01-14T14:22:00Z',
      reviewed_at: '2024-01-14T16:45:00Z',
      reviewed_by: 'admin@iknowag.ai',
    }
  ];

  // Filter applications
  useEffect(() => {
    let filtered = applications.filter(app => {
      const matchesSearch = app.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || app.status === filters.status;
      const matchesMediaType = filters.mediaType === 'all' || app.media_type === filters.mediaType;
      const matchesPartnership = filters.partnershipType === 'all' || app.partnership_type === filters.partnershipType;
      
      return matchesSearch && matchesStatus && matchesMediaType && matchesPartnership;
    });
    
    setFilteredApplications(filtered);
  }, [applications, filters, searchTerm]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      await loadApplications(); // Refresh the data
      toast.success(`Application ${newStatus} successfully`);
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  const exportApplications = () => {
    // Create CSV export
    const headers = ['Company', 'Contact', 'Email', 'Type', 'Location', 'Status', 'Date'];
    const csvData = filteredApplications.map(app => [
      app.company_name,
      app.contact_name,
      app.contact_email,
      app.media_type,
      app.location,
      app.status,
      new Date(app.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `applications-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Applications exported successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPartnershipLabel = (type) => {
    switch (type) {
      case 'individual': return 'Individual ($3,500)';
      case 'two-company': return '2 Companies ($1,750 each)';
      case 'three-company': return '3 Companies ($1,167 each)';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-inter">Partnership Applications</h1>
            <p className="text-gray-600">Loading applications...</p>
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
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Partnership Applications</h1>
          <p className="text-gray-600">Review and manage partnership applications</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportApplications}
            className="flex items-center space-x-2 px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={filters.mediaType}
              onChange={(e) => setFilters(prev => ({ ...prev, mediaType: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Local Newspaper">Local Newspaper</option>
              <option value="Regional Magazine">Regional Magazine</option>
              <option value="B2B Publication">B2B Publication</option>
              <option value="Community Radio">Community Radio</option>
            </select>

            <select
              value={filters.partnershipType}
              onChange={(e) => setFilters(prev => ({ ...prev, partnershipType: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            >
              <option value="all">All Partnerships</option>
              <option value="individual">Individual</option>
              <option value="two-company">2 Companies</option>
              <option value="three-company">3 Companies</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partnership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{application.company_name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                        {application.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{application.contact_name}</div>
                      <div className="text-sm text-gray-500">{application.contact_title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.media_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getPartnershipLabel(application.partnership_type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowDetails(true);
                        }}
                        className="text-trust-blue hover:text-blue-700"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(application.id, 'approved')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <SafeIcon icon={FiCheck} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(application.id, 'rejected')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <SafeIcon icon={FiX} className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showDetails && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Company Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiBuilding} className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{selectedApplication.company_name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                      <span>{selectedApplication.location}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Media Type:</span>
                      <span className="ml-2">{selectedApplication.media_type}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Company Size:</span>
                      <span className="ml-2">{selectedApplication.company_size} employees</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{selectedApplication.contact_name}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Title:</span>
                      <span className="ml-2">{selectedApplication.contact_title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiMail} className="w-4 h-4 text-gray-400" />
                      <span>{selectedApplication.contact_email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiPhone} className="w-4 h-4 text-gray-400" />
                      <span>{selectedApplication.contact_phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partnership Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Preferred Partnership:</span>
                    <span className="ml-2 font-medium">{getPartnershipLabel(selectedApplication.partnership_type)}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Implementation Timeline:</span>
                    <span className="ml-2">{selectedApplication.timeline}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Interested Tools:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedApplication.interested_tools?.map((tool, index) => (
                        <span key={index} className="px-2 py-1 bg-trust-blue text-white text-xs rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenges and Comments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Challenges</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Main Challenge:</h4>
                    <p className="text-gray-600 mt-1">{selectedApplication.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Competitive Awareness:</h4>
                    <p className="text-gray-600 mt-1">{selectedApplication.competitors}</p>
                  </div>
                  {selectedApplication.comments && (
                    <div>
                      <h4 className="font-medium text-gray-700">Additional Comments:</h4>
                      <p className="text-gray-600 mt-1">{selectedApplication.comments}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Current Status:</span>
                    <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                  </div>
                  {selectedApplication.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          handleStatusChange(selectedApplication.id, 'approved');
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedApplication.id, 'rejected');
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManager;