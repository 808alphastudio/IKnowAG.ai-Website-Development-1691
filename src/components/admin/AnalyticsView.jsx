import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const { FiTrendingUp, FiUsers, FiDollarSign, FiCalendar } = FiIcons;

const AnalyticsView = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  // Mock analytics data
  const conversionData = [
    { month: 'Aug', visitors: 1200, applications: 8, partnerships: 1 },
    { month: 'Sep', visitors: 1450, applications: 12, partnerships: 2 },
    { month: 'Oct', visitors: 1680, applications: 15, partnerships: 3 },
    { month: 'Nov', visitors: 2100, applications: 18, partnerships: 2 },
    { month: 'Dec', visitors: 1890, applications: 14, partnerships: 1 },
    { month: 'Jan', visitors: 2350, applications: 23, partnerships: 4 },
  ];

  const revenueData = [
    { month: 'Aug', revenue: 3500, partnerships: 1 },
    { month: 'Sep', revenue: 7000, partnerships: 2 },
    { month: 'Oct', revenue: 10500, partnerships: 3 },
    { month: 'Nov', revenue: 7000, partnerships: 2 },
    { month: 'Dec', revenue: 3500, partnerships: 1 },
    { month: 'Jan', revenue: 14000, partnerships: 4 },
  ];

  const mediaTypeDistribution = [
    { name: 'Local Newspaper', value: 12, color: '#2C5282' },
    { name: 'Regional Magazine', value: 6, color: '#319795' },
    { name: 'B2B Publication', value: 3, color: '#38A169' },
    { name: 'Community Radio', value: 2, color: '#F56500' },
  ];

  const geographicData = [
    { state: 'California', applications: 8, partnerships: 2 },
    { state: 'Texas', applications: 5, partnerships: 2 },
    { state: 'Oregon', applications: 4, partnerships: 1 },
    { state: 'Washington', applications: 3, partnerships: 1 },
    { state: 'Colorado', applications: 3, partnerships: 0 },
  ];

  const partnershipPerformance = [
    { name: 'Individual', count: 2, revenue: 7000, avgSatisfaction: 4.8 },
    { name: '2 Companies', count: 1, revenue: 3500, avgSatisfaction: 4.9 },
    { name: '3 Companies', count: 1, revenue: 3500, avgSatisfaction: 4.7 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Analytics Dashboard</h1>
          <p className="text-gray-600">Track performance metrics and business insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          >
            <option value="1m">Last month</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">17.4%</p>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-green-600">+2.1%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Partnership Value</p>
              <p className="text-2xl font-bold text-gray-900">$3,500</p>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-green-600">Stable</span>
                <span className="text-sm text-gray-500 ml-1">pricing model</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-trust-blue bg-opacity-10 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-trust-blue" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time to Partnership</p>
              <p className="text-2xl font-bold text-gray-900">7.2 days</p>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-green-600">-1.3 days</span>
                <span className="text-sm text-gray-500 ml-1">faster process</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-innovation-teal bg-opacity-10 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCalendar} className="w-6 h-6 text-innovation-teal" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Client Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">4.8/5</p>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-green-600">+0.2</span>
                <span className="text-sm text-gray-500 ml-1">rating increase</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-success-green bg-opacity-10 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-success-green" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stackId="1" 
                stroke="#2C5282" 
                fill="#2C5282" 
                fillOpacity={0.3}
                name="Website Visitors"
              />
              <Area 
                type="monotone" 
                dataKey="applications" 
                stackId="2" 
                stroke="#319795" 
                fill="#319795" 
                fillOpacity={0.6}
                name="Applications"
              />
              <Area 
                type="monotone" 
                dataKey="partnerships" 
                stackId="3" 
                stroke="#38A169" 
                fill="#38A169"
                name="Partnerships"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#2C5282" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Media Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mediaTypeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {mediaTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Geographic Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Performance</h3>
          <div className="space-y-3">
            {geographicData.map((state, index) => (
              <div key={state.state} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{state.state}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{state.applications} apps</span>
                  <span className="text-sm font-medium text-trust-blue">{state.partnerships} partnerships</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-trust-blue h-2 rounded-full"
                      style={{ width: `${(state.partnerships / state.applications) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Partnership Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Partnership Type Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partnership Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partnershipPerformance.map((type) => (
                <tr key={type.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{type.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {type.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${type.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{type.avgSatisfaction}/5</span>
                      <div className="ml-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full mr-1 ${
                              i < Math.floor(type.avgSatisfaction) ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      100%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsView;