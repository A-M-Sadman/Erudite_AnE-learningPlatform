import React, { useState } from 'react';
import { 
  LayoutDashboard, Headphones, AlertTriangle, CheckCircle, Clock, 
  Settings, Server, Database, Shield, Users, Activity, TrendingUp,
  Search, Filter, Eye, Edit, Send, MessageSquare, Bell, LogOut,
  User, ChevronDown, Menu, X, GraduationCap, Zap, HardDrive,
  Wifi, Monitor, Bug, Tool, FileText, Download, Upload, RefreshCw,
  XCircle, Cpu, BarChart3, Mail, Phone, Calendar, ArrowRight,
  AlertCircle, Info, Lock, Network, Globe
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';

export default function ITSupportDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketFilter, setTicketFilter] = useState('all');

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/login';
    }
  };

  // Mock Data
  const supportStats = [
    { label: 'Open Tickets', value: '47', change: '-5', icon: Headphones, color: 'bg-orange-500', trend: 'down' },
    { label: 'System Uptime', value: '99.8%', change: '+0.2%', icon: Server, color: 'bg-green-500', trend: 'up' },
    { label: 'Response Time', value: '12m', change: '-3m', icon: Clock, color: 'bg-blue-500', trend: 'down' },
    { label: 'Resolved Today', value: '23', change: '+8', icon: CheckCircle, color: 'bg-purple-500', trend: 'up' }
  ];

  const tickets = [
    { id: 1, title: 'Login Issues - Students Cannot Access Dashboard', user: 'Alice Johnson', email: 'alice@example.com', priority: 'high', status: 'open', category: 'Authentication', created: '2 hours ago', assigned: 'You', description: 'Multiple students reporting 401 errors when trying to log in.', lastUpdate: '30 min ago' },
    { id: 2, title: 'Course Video Not Loading', user: 'Bob Smith', email: 'bob@example.com', priority: 'medium', status: 'in-progress', category: 'Content', created: '5 hours ago', assigned: 'Sarah Tech', description: 'Videos in Web Development course show loading spinner indefinitely.', lastUpdate: '2 hours ago' },
    { id: 3, title: 'Database Connection Timeout', user: 'System Alert', email: 'system@erudite.com', priority: 'critical', status: 'open', category: 'Database', created: '1 hour ago', assigned: 'Unassigned', description: 'Database connection pool exhausted.', lastUpdate: '1 hour ago' },
    { id: 4, title: 'Quiz Submission Error', user: 'Carol Davis', email: 'carol@example.com', priority: 'high', status: 'open', category: 'Assessment', created: '3 hours ago', assigned: 'You', description: 'Quiz answers not saving.', lastUpdate: '45 min ago' },
    { id: 5, title: 'Email Notifications Not Sending', user: 'David Brown', email: 'david@example.com', priority: 'medium', status: 'in-progress', category: 'Email', created: '1 day ago', assigned: 'Mike Support', description: 'Course enrollment emails not delivered.', lastUpdate: '4 hours ago' },
    { id: 6, title: 'API Response Slow', user: 'Emily Wilson', email: 'emily@example.com', priority: 'low', status: 'open', category: 'Performance', created: '2 days ago', assigned: 'Unassigned', description: 'API endpoints taking 5+ seconds.', lastUpdate: '1 day ago' },
    { id: 7, title: 'Certificate Generation Failed', user: 'Frank Miller', email: 'frank@example.com', priority: 'medium', status: 'resolved', category: 'Features', created: '3 days ago', assigned: 'You', description: 'Certificate PDF not generating.', lastUpdate: '1 day ago' },
    { id: 8, title: 'Mobile App Crash on iOS', user: 'Grace Lee', email: 'grace@example.com', priority: 'high', status: 'resolved', category: 'Mobile', created: '4 days ago', assigned: 'Sarah Tech', description: 'App crashes on iOS 17.', lastUpdate: '2 days ago' }
  ];

  const systemStatus = [
    { service: 'Web Application', status: 'operational', uptime: '99.9%', lastCheck: '2 min ago', responseTime: '145ms' },
    { service: 'API Server', status: 'operational', uptime: '99.8%', lastCheck: '2 min ago', responseTime: '89ms' },
    { service: 'Database (Primary)', status: 'operational', uptime: '100%', lastCheck: '1 min ago', responseTime: '12ms' },
    { service: 'Database (Replica)', status: 'operational', uptime: '99.7%', lastCheck: '1 min ago', responseTime: '15ms' },
    { service: 'File Storage', status: 'operational', uptime: '99.9%', lastCheck: '3 min ago', responseTime: '234ms' },
    { service: 'Email Service', status: 'degraded', uptime: '95.2%', lastCheck: '1 min ago', responseTime: '1200ms' },
    { service: 'CDN', status: 'operational', uptime: '99.9%', lastCheck: '5 min ago', responseTime: '56ms' },
    { service: 'AI Processing', status: 'operational', uptime: '98.5%', lastCheck: '4 min ago', responseTime: '2300ms' }
  ];

  const recentActivity = [
    { user: 'John Support', action: 'Resolved ticket #1245', time: '5 min ago', type: 'ticket' },
    { user: 'System', action: 'Database backup completed', time: '15 min ago', type: 'system' },
    { user: 'Sarah Tech', action: 'Updated server configuration', time: '30 min ago', type: 'config' },
    { user: 'Mike Admin', action: 'Added new user permissions', time: '1 hour ago', type: 'security' },
    { user: 'System', action: 'CPU usage spike detected', time: '2 hours ago', type: 'alert' },
    { user: 'You', action: 'Closed 3 tickets', time: '3 hours ago', type: 'ticket' }
  ];

  const ticketTrends = [
    { month: 'Jan', open: 45, resolved: 52 },
    { month: 'Feb', open: 52, resolved: 48 },
    { month: 'Mar', open: 38, resolved: 65 },
    { month: 'Apr', open: 48, resolved: 58 },
    { month: 'May', open: 42, resolved: 68 },
    { month: 'Jun', open: 47, resolved: 71 }
  ];

  const ticketsByCategory = [
    { name: 'Authentication', value: 45, color: '#ef4444' },
    { name: 'Performance', value: 32, color: '#f59e0b' },
    { name: 'Features', value: 28, color: '#3b82f6' },
    { name: 'Content', value: 25, color: '#10b981' },
    { name: 'Database', value: 18, color: '#8b5cf6' },
    { name: 'Other', value: 15, color: '#6b7280' }
  ];

  const responseTimeData = [
    { time: '00:00', avgTime: 15 },
    { time: '04:00', avgTime: 8 },
    { time: '08:00', avgTime: 25 },
    { time: '12:00', avgTime: 32 },
    { time: '16:00', avgTime: 28 },
    { time: '20:00', avgTime: 18 }
  ];

  const systemMetrics = [
    { metric: 'CPU Usage', value: 45, unit: '%', status: 'good' },
    { metric: 'Memory Usage', value: 68, unit: '%', status: 'warning' },
    { metric: 'Disk Space', value: 72, unit: '%', status: 'warning' },
    { metric: 'Network Load', value: 35, unit: '%', status: 'good' },
    { metric: 'Active Users', value: 342, unit: '', status: 'good' },
    { metric: 'Database Connections', value: 85, unit: '', status: 'good' }
  ];

  const knowledgeBase = [
    { id: 1, title: 'How to Reset User Password', category: 'Authentication', views: 342, helpful: 45 },
    { id: 2, title: 'Troubleshooting Video Playback Issues', category: 'Content', views: 256, helpful: 38 },
    { id: 3, title: 'Database Backup Procedures', category: 'Database', views: 189, helpful: 52 },
    { id: 4, title: 'Setting Up SSL Certificates', category: 'Security', views: 145, helpful: 28 },
    { id: 5, title: 'API Rate Limiting Configuration', category: 'Performance', views: 134, helpful: 31 }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tickets', label: 'Support Tickets', icon: Headphones },
    { id: 'system', label: 'System Status', icon: Server },
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'knowledge', label: 'Knowledge Base', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = ticketFilter === 'all' || ticket.status === ticketFilter;
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from yesterday
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {tickets.filter(t => t.priority === 'critical' && t.status !== 'resolved').length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-red-800 mb-1">Critical System Alert</h3>
              <p className="text-sm text-red-700">
                {tickets.filter(t => t.priority === 'critical' && t.status !== 'resolved').length} critical issue(s) require immediate attention
              </p>
              <button onClick={() => setActiveTab('tickets')} className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">
                View Critical Tickets <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Tickets</h3>
            <button onClick={() => setActiveTab('tickets')} className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {tickets.slice(0, 5).map(ticket => (
              <div key={ticket.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  ticket.priority === 'critical' ? 'bg-red-500' : ticket.priority === 'high' ? 'bg-orange-500' :
                  ticket.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{ticket.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{ticket.user} • {ticket.created}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      ticket.status === 'open' ? 'bg-orange-100 text-orange-700' :
                      ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>{ticket.status}</span>
                    <span className="text-xs text-gray-500">{ticket.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">System Services</h3>
            <button onClick={() => setActiveTab('system')} className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {systemStatus.slice(0, 5).map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'operational' ? 'bg-green-500' :
                    service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{service.service}</p>
                    <p className="text-xs text-gray-500">{service.uptime} uptime</p>
                  </div>
                </div>
                <span className="text-xs text-gray-600">{service.responseTime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Ticket Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={ticketTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="open" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="resolved" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tickets by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ticketsByCategory} cx="50%" cy="50%" labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80} fill="#8884d8" dataKey="value">
                {ticketsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className={`p-2 rounded-lg ${
                activity.type === 'ticket' ? 'bg-blue-100' : activity.type === 'system' ? 'bg-green-100' :
                activity.type === 'config' ? 'bg-purple-100' : activity.type === 'security' ? 'bg-orange-100' : 'bg-red-100'
              }`}>
                {activity.type === 'ticket' && <Headphones className="w-4 h-4 text-blue-600" />}
                {activity.type === 'system' && <Server className="w-4 h-4 text-green-600" />}
                {activity.type === 'config' && <Settings className="w-4 h-4 text-purple-600" />}
                {activity.type === 'security' && <Shield className="w-4 h-4 text-orange-600" />}
                {activity.type === 'alert' && <AlertTriangle className="w-4 h-4 text-red-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800"><span className="font-semibold">{activity.user}</span> {activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Support Tickets</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Send className="w-4 h-4" />Create Ticket
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search tickets..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'open', 'in-progress', 'resolved'].map((filter) => (
              <button key={filter} onClick={() => setTicketFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  ticketFilter === filter ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      ticket.priority === 'critical' ? 'bg-red-500' : ticket.priority === 'high' ? 'bg-orange-500' :
                      ticket.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-semibold text-gray-800">{ticket.title}</p>
                      <p className="text-sm text-gray-500">#{ticket.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800">{ticket.user}</p>
                    <p className="text-sm text-gray-500">{ticket.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.priority === 'critical' ? 'bg-red-100 text-red-700' : ticket.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>{ticket.priority}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.status === 'open' ? 'bg-orange-100 text-orange-700' :
                    ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>{ticket.status === 'in-progress' ? 'In Progress' : ticket.status}</span>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-gray-800">{ticket.category}</span></td>
                <td className="px-6 py-4"><span className="text-sm text-gray-800">{ticket.assigned}</span></td>
                <td className="px-6 py-4"><span className="text-sm text-gray-600">{ticket.created}</span></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedTicket(ticket)} className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Reply">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSystem = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">System Status & Health</h2>
      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="font-bold text-green-800">All Systems Operational</h3>
            <p className="text-sm text-green-700">Last checked: 2 minutes ago</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Service Status</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {systemStatus.map((service, index) => (
            <div key={index} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${
                    service.status === 'operational' ? 'bg-green-500' :
                    service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{service.service}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {service.status === 'operational' ? 'Operational' :
                       service.status === 'degraded' ? 'Degraded Performance' : 'Down'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{service.uptime}</p>
                  <p className="text-xs text-gray-500 mt-1">{service.responseTime} response</p>
                  <p className="text-xs text-gray-400">{service.lastCheck}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">{metric.metric}</h4>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                metric.status === 'good' ? 'bg-green-100 text-green-700' :
                metric.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {metric.status}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-lg text-gray-600 mb-1">{metric.unit}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full ${
                  metric.status === 'good' ? 'bg-green-500' :
                  metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(metric.value, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Real-Time Monitoring</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Average Response Time (24 Hours)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={responseTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgTime" stroke="#3b82f6" strokeWidth={2} name="Response Time (min)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Active System Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-yellow-800">High Memory Usage Detected</p>
              <p className="text-sm text-yellow-700 mt-1">Memory usage at 68%. Consider scaling up resources.</p>
              <p className="text-xs text-yellow-600 mt-2">Triggered 2 hours ago</p>
            </div>
            <button className="text-yellow-600 hover:text-yellow-700">
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-yellow-800">Disk Space Running Low</p>
              <p className="text-sm text-yellow-700 mt-1">Disk usage at 72%. Cleanup or expansion recommended.</p>
              <p className="text-xs text-yellow-600 mt-2">Triggered 5 hours ago</p>
            </div>
            <button className="text-yellow-600 hover:text-yellow-700">
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-800">Email Service Degraded</p>
              <p className="text-sm text-red-700 mt-1">Email delivery experiencing delays. SMTP response time high.</p>
              <p className="text-xs text-red-600 mt-2">Triggered 30 minutes ago</p>
            </div>
            <button className="text-red-600 hover:text-red-700">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Server Load</h3>
          <div className="space-y-4">
            {[
              { label: 'CPU Load', value: 45, color: 'bg-blue-500' },
              { label: 'Memory', value: 68, color: 'bg-yellow-500' },
              { label: 'Disk I/O', value: 32, color: 'bg-green-500' },
              { label: 'Network', value: 28, color: 'bg-green-500' }
            ].map((load, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{load.label}</span>
                  <span className="font-semibold text-gray-800">{load.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`${load.color} h-3 rounded-full`} style={{ width: `${load.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Database Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-800">Active Connections</p>
                <p className="text-xs text-gray-500 mt-1">Current / Max</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">85 / 100</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-800">Query Response</p>
                <p className="text-xs text-gray-500 mt-1">Average time</p>
              </div>
              <p className="text-2xl font-bold text-green-600">12ms</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-800">Cache Hit Rate</p>
                <p className="text-xs text-gray-500 mt-1">Efficiency</p>
              </div>
              <p className="text-2xl font-bold text-green-600">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">User Management & Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Users', value: '2,847', change: '+142 this month', icon: Users, color: 'bg-blue-100', iconColor: 'text-blue-600' },
          { label: 'Active Now', value: '342', change: '12% of total users', icon: Activity, color: 'bg-green-100', iconColor: 'text-green-600' },
          { label: 'Locked Accounts', value: '8', change: 'Requires attention', icon: Shield, color: 'bg-orange-100', iconColor: 'text-orange-600' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Lock, color: 'text-blue-600', title: 'Reset Password', desc: 'Manually reset user password' },
            { icon: Shield, color: 'text-green-600', title: 'Unlock Account', desc: 'Unlock locked user accounts' },
            { icon: Mail, color: 'text-purple-600', title: 'Send Notification', desc: 'Broadcast to all users' }
          ].map((action, idx) => (
            <button key={idx} className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <action.icon className={`w-6 h-6 ${action.color}`} />
              <div className="text-left">
                <p className="font-semibold text-gray-800">{action.title}</p>
                <p className="text-sm text-gray-600">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent User Issues</h3>
        <div className="space-y-3">
          {[
            { user: 'alice@example.com', issue: 'Cannot access course materials', severity: 'high', time: '10 min ago' },
            { user: 'bob@example.com', issue: 'Profile picture not uploading', severity: 'low', time: '1 hour ago' },
            { user: 'carol@example.com', issue: 'Payment processing failed', severity: 'high', time: '2 hours ago' },
            { user: 'david@example.com', issue: 'Email verification not working', severity: 'medium', time: '3 hours ago' }
          ].map((issue, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  issue.severity === 'high' ? 'bg-red-500' : issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{issue.user}</p>
                  <p className="text-xs text-gray-600">{issue.issue}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{issue.time}</span>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Resolve</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderKnowledge = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Knowledge Base</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FileText className="w-4 h-4" />New Article
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search knowledge base..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full" />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {knowledgeBase.map((article) => (
            <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{article.title}</h4>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-600 px-2 py-1 bg-blue-50 rounded">{article.category}</span>
                  <span className="text-xs text-gray-500">{article.views} views</span>
                  <span className="text-xs text-gray-500">{article.helpful} found helpful</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Categories</h3>
          <div className="space-y-2">
            {['Authentication', 'Performance', 'Security', 'Database', 'Content'].map((cat, index) => (
              <button key={index} className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 font-medium text-gray-700">{cat}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
          <div className="space-y-2">
            {[
              { label: 'System Documentation', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
              { label: 'API Reference', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
              { label: 'Troubleshooting Guide', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
              { label: 'Security Best Practices', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' }
            ].map((link, idx) => (
              <button key={idx} className={`w-full text-left px-4 py-3 rounded-lg font-medium ${link.color}`}>{link.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings & Configuration</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />Profile Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" defaultValue="IT" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" defaultValue="Support" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue="support@erudite.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <input type="text" defaultValue="IT Support Specialist" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />Alert Preferences
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Critical System Alerts', desc: 'Immediate notifications for critical issues' },
                { label: 'High Priority Tickets', desc: 'Notifications for high priority support tickets' },
                { label: 'System Performance Alerts', desc: 'Alerts when system metrics exceed thresholds' },
                { label: 'Daily Summary Reports', desc: 'Receive daily platform health reports' }
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
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4">IT</div>
              <h3 className="text-xl font-bold text-gray-800">IT Support</h3>
              <p className="text-gray-600">Support Specialist</p>
              <p className="text-sm text-gray-500 mt-2">support@erudite.com</p>
              <button className="mt-4 w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">Change Photo</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Member Since', value: 'Jan 2024' },
                { label: 'Tickets Resolved', value: '1,245' },
                { label: 'Avg Response Time', value: '12 min' },
                { label: 'Satisfaction Rate', value: '4.9/5.0' }
              ].map((stat, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-gray-600">{stat.label}</span>
                  <span className="font-semibold text-gray-800">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Erudite</h1>
                <p className="text-xs text-gray-500">IT Support Panel</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
              <div className="flex items-center gap-1 justify-center">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}>
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative hidden sm:block">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">IT</div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">IT Support</p>
                      <p className="text-sm text-gray-500">support@erudite.com</p>
                    </div>
                    <button onClick={() => { setActiveTab('settings'); setProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4" /><span>Profile Settings</span>
                    </button>
                    <button onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" /><span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}>
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                <button onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'tickets' && 'Support Tickets'}
            {activeTab === 'system' && 'System Status & Health'}
            {activeTab === 'monitoring' && 'Real-Time Monitoring'}
            {activeTab === 'users' && 'User Management & Support'}
            {activeTab === 'knowledge' && 'Knowledge Base'}
            {activeTab === 'settings' && 'Settings & Configuration'}
          </h1>
          <p className="text-gray-600 mt-1">
            {activeTab === 'dashboard' && 'Monitor system health, tickets, and platform performance'}
            {activeTab === 'tickets' && 'Manage and resolve support tickets efficiently'}
            {activeTab === 'system' && 'Check the status of all platform services'}
            {activeTab === 'monitoring' && 'Real-time system metrics and alerts'}
            {activeTab === 'users' && 'Manage user accounts and resolve user issues'}
            {activeTab === 'knowledge' && 'Access technical documentation and guides'}
            {activeTab === 'settings' && 'Configure your profile and notification preferences'}
          </p>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'tickets' && renderTickets()}
        {activeTab === 'system' && renderSystem()}
        {activeTab === 'monitoring' && renderMonitoring()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'knowledge' && renderKnowledge()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}