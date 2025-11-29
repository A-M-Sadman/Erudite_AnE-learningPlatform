import React, { useState } from 'react';
import { 
  BarChart3, Database, FileText, Brain, AlertTriangle, Activity,
  TrendingUp, DollarSign, Users, BookOpen, CheckCircle, XCircle,
  Download, Upload, Filter, Search, Eye, Edit, Trash2, RefreshCw,
  Settings, Bell, LogOut, User, ChevronDown, Menu, X, GraduationCap,
  PieChart, LineChart, Calendar, Clock, Award, Target, Zap, Shield,
  FileCheck, AlertCircle, Info, ChevronRight, Plus, Send, Lock
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart as RechartsLine, Line, PieChart as RechartsPie, 
  Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Area, AreaChart 
} from 'recharts';

export default function DataSpecialistDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/login';
    }
  };

  // Mock Data
  const systemStats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500', trend: 'up' },
    { label: 'Active Courses', value: '156', change: '+8%', icon: BookOpen, color: 'bg-green-500', trend: 'up' },
    { label: 'AI Accuracy', value: '94.2%', change: '+2.1%', icon: Brain, color: 'bg-purple-500', trend: 'up' },
    { label: 'Revenue', value: '$45,890', change: '+18%', icon: DollarSign, color: 'bg-orange-500', trend: 'up' }
  ];

  const dataQualityMetrics = [
    { name: 'Complete Records', value: 95, color: '#10b981' },
    { name: 'Missing Data', value: 3, color: '#f59e0b' },
    { name: 'Duplicates', value: 2, color: '#ef4444' }
  ];

  const engagementTrends = [
    { month: 'Jan', students: 245, instructors: 28, courses: 42 },
    { month: 'Feb', students: 289, instructors: 32, courses: 48 },
    { month: 'Mar', students: 312, instructors: 35, courses: 52 },
    { month: 'Apr', students: 378, instructors: 38, courses: 58 },
    { month: 'May', students: 425, instructors: 42, courses: 64 },
    { month: 'Jun', students: 498, instructors: 45, courses: 72 }
  ];

  const quizPerformanceData = [
    { range: '90-100', count: 342 },
    { range: '80-89', count: 456 },
    { range: '70-79', count: 289 },
    { range: '60-69', count: 123 },
    { range: '0-59', count: 67 }
  ];

  const coursePopularity = [
    { name: 'Web Dev', students: 245, revenue: 24500 },
    { name: 'Data Science', students: 189, revenue: 24381 },
    { name: 'Marketing', students: 156, revenue: 12324 },
    { name: 'Mobile Dev', students: 92, revenue: 13708 },
    { name: 'Machine Learning', students: 178, revenue: 28302 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 32400, costs: 12800, profit: 19600 },
    { month: 'Feb', revenue: 35600, costs: 13200, profit: 22400 },
    { month: 'Mar', revenue: 38200, costs: 14100, profit: 24100 },
    { month: 'Apr', revenue: 42800, costs: 15600, profit: 27200 },
    { month: 'May', revenue: 45200, costs: 16200, profit: 29000 },
    { month: 'Jun', revenue: 49800, costs: 17400, profit: 32400 }
  ];

  const aiInsights = [
    { id: 1, type: 'Performance Alert', student: 'Alice Johnson', course: 'Web Development', insight: 'Student showing declining performance. Recommend intervention.', severity: 'high', accuracy: 92, date: '2024-11-01' },
    { id: 2, type: 'Course Recommendation', student: 'Bob Smith', course: 'Data Science', insight: 'Student likely to excel in Machine Learning based on performance patterns.', severity: 'medium', accuracy: 88, date: '2024-11-02' },
    { id: 3, type: 'Engagement Prediction', student: 'Carol Davis', course: 'Digital Marketing', insight: 'High engagement predicted for next module. Consider advanced content.', severity: 'low', accuracy: 95, date: '2024-11-03' },
    { id: 4, type: 'Dropout Risk', student: 'David Brown', course: 'Mobile Dev', insight: 'Student at risk of dropping out. Engagement intervention needed.', severity: 'high', accuracy: 91, date: '2024-11-02' }
  ];

  const dataAlerts = [
    { id: 1, type: 'Missing Data', table: 'Enrollments', count: 12, severity: 'medium', message: '12 enrollment records missing completion dates' },
    { id: 2, type: 'Duplicate Records', table: 'Users', count: 8, severity: 'high', message: '8 duplicate user accounts detected' },
    { id: 3, type: 'Inconsistent Data', table: 'Scores', count: 5, severity: 'medium', message: '5 quiz scores exceed maximum possible points' },
    { id: 4, type: 'Orphaned Records', table: 'Progress', count: 23, severity: 'low', message: '23 progress records without valid enrollment' }
  ];

  const datasets = [
    { name: 'Users', records: 2847, size: '2.4 MB', lastUpdated: '2 hours ago', quality: 98 },
    { name: 'Courses', records: 156, size: '845 KB', lastUpdated: '5 hours ago', quality: 100 },
    { name: 'Enrollments', records: 8924, size: '5.2 MB', lastUpdated: '1 hour ago', quality: 96 },
    { name: 'Quizzes', records: 1247, size: '1.8 MB', lastUpdated: '3 hours ago', quality: 99 },
    { name: 'Scores', records: 15678, size: '3.6 MB', lastUpdated: '30 min ago', quality: 97 },
    { name: 'Progress', records: 8924, size: '4.1 MB', lastUpdated: '1 hour ago', quality: 95 }
  ];

  const activityLogs = [
    { id: 1, user: 'John Doe', action: 'Enrolled in course', table: 'Enrollments', timestamp: '2 hours ago', ip: '192.168.1.1' },
    { id: 2, user: 'Sarah Wilson', action: 'Updated course content', table: 'Content', timestamp: '3 hours ago', ip: '192.168.1.5' },
    { id: 3, user: 'Admin', action: 'Generated performance report', table: 'Reports', timestamp: '5 hours ago', ip: '192.168.1.10' },
    { id: 4, user: 'Mike Johnson', action: 'Completed quiz', table: 'Scores', timestamp: '1 day ago', ip: '192.168.1.3' }
  ];

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'monitoring', label: 'Data Monitoring', icon: Database },
    { id: 'analytics', label: 'Reports & Analytics', icon: FileText },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain },
    { id: 'cleaning', label: 'Data Cleaning', icon: RefreshCw },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} this month
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Quality & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Data Quality Overview
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <Pie
                data={dataQualityMetrics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataQualityMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {dataQualityMetrics.map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }}></div>
                  <span className="text-sm text-gray-600">{metric.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{metric.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Data Alerts
          </h3>
          <div className="space-y-3">
            {dataAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">{alert.type}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">Table: {alert.table}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {alert.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-blue-600 text-sm font-semibold hover:underline">
            View All Alerts →
          </button>
        </div>
      </div>

      {/* Engagement Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Platform Engagement Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={engagementTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="students" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="instructors" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="courses" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => setActiveTab('analytics')} className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-lg transition-shadow">
          <FileText className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg">Generate Report</h4>
          <p className="text-sm mt-1 text-blue-100">Create detailed analytics reports</p>
        </button>
        <button onClick={() => setActiveTab('ai-insights')} className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:shadow-lg transition-shadow">
          <Brain className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg">AI Analysis</h4>
          <p className="text-sm mt-1 text-purple-100">Review AI-generated insights</p>
        </button>
        <button onClick={() => setActiveTab('cleaning')} className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl hover:shadow-lg transition-shadow">
          <RefreshCw className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg">Clean Data</h4>
          <p className="text-sm mt-1 text-green-100">Run data cleaning operations</p>
        </button>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Data Monitoring</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{dataset.name}</h3>
                  <p className="text-sm text-gray-500">{dataset.records.toLocaleString()} records</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${
                dataset.quality >= 98 ? 'bg-green-100 text-green-700' :
                dataset.quality >= 95 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {dataset.quality}%
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Size:</span>
                <span className="font-semibold text-gray-800">{dataset.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Updated:</span>
                <span className="font-semibold text-gray-800">{dataset.lastUpdated}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className={`h-2 rounded-full ${
                  dataset.quality >= 98 ? 'bg-green-500' :
                  dataset.quality >= 95 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${dataset.quality}%` }}
              ></div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-semibold">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-semibold">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Quality Alerts</h3>
        <div className="space-y-3">
          {dataAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  alert.severity === 'high' ? 'text-red-500' :
                  alert.severity === 'medium' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div>
                  <p className="font-semibold text-gray-800">{alert.type}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">Table: {alert.table} • {alert.count} issues</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap">
                Fix Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Revenue Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="costs" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
            <Area type="monotone" dataKey="profit" stroke="#10b981" fill="#10b981" fillOpacity={0.7} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-600">$244,000</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Costs</p>
            <p className="text-2xl font-bold text-red-600">$89,300</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Net Profit</p>
            <p className="text-2xl font-bold text-green-600">$154,700</p>
          </div>
        </div>
      </div>

      {/* Quiz Performance & Course Popularity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quiz Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={quizPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Course Popularity & Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={coursePopularity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="students" fill="#3b82f6" />
              <Bar yAxisId="right" dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <FileText className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold text-gray-800">Student Progress Report</p>
            <p className="text-sm text-gray-600 mt-1">Comprehensive student performance analysis</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-semibold text-gray-800">Course Analytics</p>
            <p className="text-sm text-gray-600 mt-1">Detailed course engagement metrics</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <DollarSign className="w-6 h-6 text-orange-600 mb-2" />
            <p className="font-semibold text-gray-800">Financial Summary</p>
            <p className="text-sm text-gray-600 mt-1">Revenue and cost analysis</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">AI Insights & Model Evaluation</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <Zap className="w-4 h-4" />
          Run AI Analysis
        </button>
      </div>

      {/* AI Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Model Accuracy', value: '94.2%', icon: Target, color: 'bg-green-500' },
          { label: 'Predictions Made', value: '3,842', icon: Brain, color: 'bg-purple-500' },
          { label: 'Avg Confidence', value: '87.6%', icon: CheckCircle, color: 'bg-blue-500' },
          { label: 'False Positives', value: '2.1%', icon: AlertCircle, color: 'bg-orange-500' }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <h3 className="text-2xl font-bold text-gray-800">{metric.value}</h3>
              </div>
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">AI-Generated Insights</h3>
          <p className="text-sm text-gray-600 mt-1">Review and approve AI predictions and recommendations</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Accuracy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {aiInsights.map((insight) => (
                <tr key={insight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      insight.severity === 'high' ? 'bg-red-100 text-red-700' :
                      insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {insight.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{insight.student}</p>
                    <p className="text-xs text-gray-500">{insight.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">{insight.course}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs">{insight.insight}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${insight.accuracy >= 90 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${insight.accuracy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{insight.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Reject">
                        <XCircle className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Retraining */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-100 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Model Retraining Required</h3>
            <p className="text-sm text-gray-600">The AI model should be retrained with new data to improve accuracy.</p>
            <p className="text-sm text-gray-500 mt-2">Last trained: 15 days ago • Next recommended: 5 days</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <RefreshCw className="w-4 h-4" />
            Retrain Model
          </button>
        </div>
      </div>
    </div>
  );

  const renderCleaning = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Data Cleaning Tools</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <RefreshCw className="w-4 h-4" />
          Run All Cleanups
        </button>
      </div>

      {/* Cleaning Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Remove Duplicates</h3>
                <p className="text-sm text-gray-600">8 duplicate records found</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-semibold">
              Clean
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Users Table:</span>
              <span className="font-semibold text-gray-800">5 duplicates</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Enrollments Table:</span>
              <span className="font-semibold text-gray-800">3 duplicates</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Fix Missing Data</h3>
                <p className="text-sm text-gray-600">12 incomplete records</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 text-sm font-semibold">
              Fix
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Enrollments Table:</span>
              <span className="font-semibold text-gray-800">12 missing dates</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Validate Records</h3>
                <p className="text-sm text-gray-600">5 inconsistent records</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-semibold">
              Validate
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Scores Table:</span>
              <span className="font-semibold text-gray-800">5 invalid scores</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Merge Datasets</h3>
                <p className="text-sm text-gray-600">Consolidate related data</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm font-semibold">
              Merge
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-gray-800">Ready to merge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cleaning History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Cleaning History & Audit Trail</h3>
        <div className="space-y-3">
          {[
            { action: 'Removed duplicates', table: 'Users', count: 5, time: '2 hours ago', user: 'Data Specialist' },
            { action: 'Fixed missing data', table: 'Enrollments', count: 8, time: '1 day ago', user: 'Data Specialist' },
            { action: 'Validated records', table: 'Scores', count: 12, time: '2 days ago', user: 'Data Specialist' },
            { action: 'Merged datasets', table: 'Progress', count: 23, time: '3 days ago', user: 'Data Specialist' }
          ].map((log, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-800">{log.action}</p>
                  <p className="text-sm text-gray-600">Table: {log.table} • {log.count} records affected</p>
                  <p className="text-xs text-gray-500">{log.time} by {log.user}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Activity Logs & System Events</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Activities', value: '15,847', icon: Activity, color: 'bg-blue-500' },
          { label: 'Today', value: '342', icon: Clock, color: 'bg-green-500' },
          { label: 'Data Changes', value: '1,245', icon: Edit, color: 'bg-purple-500' },
          { label: 'System Events', value: '89', icon: AlertCircle, color: 'bg-orange-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {log.user.charAt(0)}
                      </div>
                      <p className="font-medium text-gray-800">{log.user}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">{log.action}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {log.table}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{log.timestamp}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 font-mono">{log.ip}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings & Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" defaultValue="Alex" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" defaultValue="Data" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue="alex.data@erudite.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <input type="text" defaultValue="Data Specialist" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Data Quality Alerts', desc: 'Get notified when data quality issues are detected' },
                { label: 'AI Model Updates', desc: 'Notifications about AI model performance and retraining needs' },
                { label: 'System Activity', desc: 'Alerts for critical system events and data changes' },
                { label: 'Daily Reports', desc: 'Receive daily summary of platform analytics' }
              ].map((pref, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{pref.label}</p>
                    <p className="text-sm text-gray-600">{pref.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Report Formats
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Default Export Format</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>PDF</option>
                  <option>CSV</option>
                  <option>Excel</option>
                  <option>JSON</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Report Frequency</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>On-Demand</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4">
                AD
              </div>
              <h3 className="text-xl font-bold text-gray-800">Alex Data</h3>
              <p className="text-gray-600">Data Specialist</p>
              <p className="text-sm text-gray-500 mt-2">alex.data@erudite.com</p>
              <button className="mt-4 w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                Change Photo
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold text-gray-800">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reports Generated</span>
                <span className="font-semibold text-gray-800">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Cleaned</span>
                <span className="font-semibold text-gray-800">1,245 records</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">AI Insights Reviewed</span>
                <span className="font-semibold text-gray-800">3,842</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                <p className="font-semibold text-sm text-gray-800">Change Password</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                <p className="font-semibold text-sm text-gray-800">Two-Factor Authentication</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                <p className="font-semibold text-sm text-gray-800">Privacy Settings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Erudite</h1>
                <p className="text-xs text-gray-500">Data Specialist Panel</p>
              </div>
            </div>

            {/* Center Section - Navigation Items (Hidden on mobile) */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
              <div className="flex items-center gap-1 justify-center">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Section - Icons & Profile */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative hidden sm:block">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    AD
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">Alex Data</p>
                      <p className="text-sm text-gray-500">alex.data@erudite.com</p>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setActiveTab('settings');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </button>
                    
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                
                {/* Sign Out in mobile menu */}
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'monitoring' && 'Data Monitoring'}
            {activeTab === 'analytics' && 'Reports & Analytics'}
            {activeTab === 'ai-insights' && 'AI Insights & Model Evaluation'}
            {activeTab === 'cleaning' && 'Data Cleaning Tools'}
            {activeTab === 'logs' && 'Activity Logs & System Events'}
            {activeTab === 'settings' && 'Settings & Profile'}
          </h1>
          <p className="text-gray-600 mt-1">
            {activeTab === 'overview' && 'Monitor system health, data quality, and platform performance'}
            {activeTab === 'monitoring' && 'Access and validate all platform datasets'}
            {activeTab === 'analytics' && 'Generate comprehensive reports and financial analytics'}
            {activeTab === 'ai-insights' && 'Review AI predictions and model performance metrics'}
            {activeTab === 'cleaning' && 'Maintain data integrity with automated cleaning operations'}
            {activeTab === 'logs' && 'Track all system activities and user actions'}
            {activeTab === 'settings' && 'Manage your profile and notification preferences'}
          </p>
        </div>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'monitoring' && renderMonitoring()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'ai-insights' && renderAIInsights()}
        {activeTab === 'cleaning' && renderCleaning()}
        {activeTab === 'logs' && renderLogs()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}