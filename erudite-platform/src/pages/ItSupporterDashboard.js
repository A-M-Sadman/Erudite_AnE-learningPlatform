import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, Headphones, AlertTriangle, CheckCircle, Clock, 
  Settings, Server, Database, Shield, Users, Activity, TrendingUp,
  Search, Filter, Eye, Edit, Send, MessageSquare, Bell, LogOut,
  User, ChevronDown, Menu, X, GraduationCap, Zap, HardDrive,
  Wifi, Monitor, Bug, Tool, FileText, Download, Upload, RefreshCw,
  XCircle, Cpu, BarChart3, Mail, Phone, Calendar, ArrowRight,
  AlertCircle, Info, Lock, Network, Globe, Plus, Trash2, Check,
  Loader, Save, Key, UserPlus
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import {
  userAPI, discussionAPI, commentAPI, evaluationAPI
} from '../services/api';
import techSupportService from '../services/techSupportService';
import authService from '../services/authService';

export default function ITSupportDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketFilter, setTicketFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Data states
  const [tickets, setTickets] = useState([]);
  const [techSupportStudents, setTechSupportStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [comments, setComments] = useState([]);
  const [knowledgeArticles, setKnowledgeArticles] = useState([]);
  
  // Form states
  const [newTicket, setNewTicket] = useState({
    Problem_Title: '',
    Category: '',
    Status: 'open',
    T_User_ID: 16,
    S_User_ID: ''
  });
  const [newDiscussion, setNewDiscussion] = useState({ 
    Post: '', 
    Course_Code: 'TECH-SUPPORT',
    User_ID: 16 
  });
  const [newComment, setNewComment] = useState({ Comment: '', DISCUSSION_ID: null });
  const [replyComment, setReplyComment] = useState({ Comment: '', Parent_ID: null });
  const [newSolution, setNewSolution] = useState({ It_Solution: '', Problem_ID: null });
  
  // Profile states
  const [profile, setProfile] = useState({
    First_Name: '',
    Last_Name: '',
    Email: '',
    Role_Type: 'ITSupport'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // UI states
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [showKnowledgeForm, setShowKnowledgeForm] = useState(false);
  const [showSolutionForm, setShowSolutionForm] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(null);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  
  // IT Support user info
  const currentUser = {
    User_ID: 16,
    First_Name: 'IT',
    Last_Name: 'Support',
    Email: 'support@erudite.com',
    Role_Type: 'ITSupport'
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
    fetchUserProfile();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch tech support tickets
      // Note: You'll need to create or update your techSupportService to fetch tickets
      // For now, using mock data that matches your database schema
      const mockTickets = [
        {
          Problem_ID: 1,
          Problem_Title: 'Login Issues - Students Cannot Access Dashboard',
          Category: 'Authentication',
          Status: 'open',
          T_User_ID: 16,
          S_User_ID: 1,
          Create_Time: '2024-03-20 10:30:00'
        },
        {
          Problem_ID: 2,
          Problem_Title: 'Course Video Not Loading',
          Category: 'Content',
          Status: 'in-progress',
          T_User_ID: null,
          S_User_ID: 2,
          Create_Time: '2024-03-20 09:15:00'
        }
      ];
      setTickets(mockTickets);

      // Fetch all users for assignment
      const usersData = await userAPI.getAll();
      setUsers(usersData);

      // Fetch discussions for knowledge base
      const discussionsData = await discussionAPI.getAll();
      const techDiscussions = discussionsData.filter(d => 
        d.Course_Code === 'TECH-SUPPORT' || d.Category === 'Technical'
      );
      setDiscussions(techDiscussions);

      // Mock tech support student data
      const mockTechStudents = [
        {
          Problem_ID: 1,
          St_Problem: 'Getting 401 error when trying to login',
          It_Solution: 'Clear browser cache and cookies, then try again',
          TimeStamp: '2024-03-20 11:45:00'
        }
      ];
      setTechSupportStudents(mockTechStudents);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const userData = await userAPI.get(currentUser.User_ID);
      setProfile({
        First_Name: userData.First_Name || 'IT',
        Last_Name: userData.Last_Name || 'Support',
        Email: userData.Email || 'support@erudite.com',
        Role_Type: userData.Role_Type || 'ITSupport'
      });
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const fetchDiscussionComments = async (discussionId) => {
    try {
      const commentsData = await commentAPI.getAll(discussionId);
      setComments(prev => ({
        ...prev,
        [discussionId]: commentsData
      }));
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  // Ticket handlers
  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!newTicket.Problem_Title.trim() || !newTicket.Category) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // This would call your actual API
      // await techSupportService.createTicket(newTicket);
      console.log('Creating ticket:', newTicket);
      
      // Add to local state for demo
      const newTicketId = tickets.length + 1;
      const ticketToAdd = {
        Problem_ID: newTicketId,
        ...newTicket,
        Create_Time: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      setTickets([...tickets, ticketToAdd]);
      
      setNewTicket({
        Problem_Title: '',
        Category: '',
        Status: 'open',
        T_User_ID: 16,
        S_User_ID: ''
      });
      setShowTicketForm(false);
      alert('Ticket created successfully!');
    } catch (err) {
      console.error('Error creating ticket:', err);
      alert('Failed to create ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTicket = async (ticketId, assignToUserId = 16) => {
    try {
      const updatedTickets = tickets.map(ticket => 
        ticket.Problem_ID === ticketId 
          ? { ...ticket, T_User_ID: assignToUserId }
          : ticket
      );
      setTickets(updatedTickets);
      alert('Ticket assigned successfully!');
    } catch (err) {
      console.error('Error assigning ticket:', err);
      alert('Failed to assign ticket.');
    }
  };

  const handleUpdateTicketStatus = async (ticketId, newStatus) => {
    try {
      const updatedTickets = tickets.map(ticket => 
        ticket.Problem_ID === ticketId 
          ? { ...ticket, Status: newStatus }
          : ticket
      );
      setTickets(updatedTickets);
      alert(`Ticket status updated to ${newStatus}!`);
    } catch (err) {
      console.error('Error updating ticket status:', err);
      alert('Failed to update ticket status.');
    }
  };

  const handleAddSolution = async (problemId, e) => {
    e.preventDefault();
    if (!newSolution.It_Solution.trim()) {
      alert('Please enter a solution');
      return;
    }

    try {
      // This would call your API
      // await techSupportService.addSolution(problemId, { It_Solution: newSolution.It_Solution });
      console.log('Adding solution:', problemId, newSolution.It_Solution);
      
      // Update tech support student data
      const updatedStudents = techSupportStudents.map(student =>
        student.Problem_ID === problemId
          ? { ...student, It_Solution: newSolution.It_Solution }
          : student
      );
      setTechSupportStudents(updatedStudents);
      
      setNewSolution({ It_Solution: '', Problem_ID: null });
      setShowSolutionForm(null);
      alert('Solution added successfully!');
    } catch (err) {
      console.error('Error adding solution:', err);
      alert('Failed to add solution.');
    }
  };

  // Discussion handlers (for knowledge base)
  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    if (!newDiscussion.Post.trim()) {
      alert('Please enter a discussion topic');
      return;
    }

    setLoading(true);
    try {
      const discussionData = {
        Post: newDiscussion.Post,
        Course_Code: 'TECH-SUPPORT',
        User_ID: currentUser.User_ID,
        Post_Date: new Date().toISOString().split('T')[0]
      };

      await discussionAPI.create(discussionData);
      setNewDiscussion({ Post: '', Course_Code: 'TECH-SUPPORT', User_ID: 16 });
      setShowDiscussionForm(false);
      await fetchDashboardData(); // Refresh discussions
    } catch (err) {
      console.error('Error creating discussion:', err);
      alert('Failed to create discussion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (discussionId, e) => {
    e.preventDefault();
    if (!newComment.Comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    setLoading(true);
    try {
      const commentData = {
        DISCUSSION_ID: discussionId,
        User_ID: currentUser.User_ID,
        Comment: newComment.Comment
      };

      await commentAPI.create(commentData);
      setNewComment({ Comment: '', DISCUSSION_ID: null });
      setShowCommentForm(null);
      await fetchDiscussionComments(discussionId); // Refresh comments
    } catch (err) {
      console.error('Error creating comment:', err);
      alert('Failed to post comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDiscussion = async (discussionId) => {
    if (!window.confirm('Are you sure you want to delete this discussion?')) return;

    setLoading(true);
    try {
      await discussionAPI.delete(discussionId);
      await fetchDashboardData(); // Refresh discussions
    } catch (err) {
      console.error('Error deleting discussion:', err);
      alert('Failed to delete discussion.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId, discussionId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    setLoading(true);
    try {
      await commentAPI.delete(commentId);
      await fetchDiscussionComments(discussionId); // Refresh comments
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment.');
    } finally {
      setLoading(false);
    }
  };

  // Profile handlers
  const handleUpdateProfile = async () => {
    try {
      await userAPI.update(currentUser.User_ID, {
        firstName: profile.First_Name,
        lastName: profile.Last_Name,
        email: profile.Email
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      // You'll need to implement changePassword in userService
      // await userAPI.changePassword(currentUser.User_ID, passwordData);
      alert('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Error changing password:', err);
      alert('Failed to change password. Please check your current password.');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/login';
    }
  };

  // Calculate stats
  const calculateStats = () => {
    const openTickets = tickets.filter(t => t.Status === 'open').length;
    const inProgressTickets = tickets.filter(t => t.Status === 'in-progress').length;
    const resolvedTickets = tickets.filter(t => t.Status === 'resolved').length;
    
    return [
      { label: 'Open Tickets', value: openTickets, change: `${openTickets} requiring attention`, icon: Headphones, color: 'bg-orange-500', trend: 'open' },
      { label: 'In Progress', value: inProgressTickets, change: 'Being worked on', icon: Clock, color: 'bg-blue-500', trend: 'progress' },
      { label: 'Resolved Today', value: resolvedTickets, change: '+8 from yesterday', icon: CheckCircle, color: 'bg-green-500', trend: 'resolved' },
      { label: 'System Uptime', value: '99.8%', change: '+0.2%', icon: Server, color: 'bg-purple-500', trend: 'up' }
    ];
  };

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.Problem_Title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = ticketFilter === 'all' || ticket.Status === ticketFilter;
    return matchesSearch && matchesFilter;
  });

  // Render functions
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {calculateStats().map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {tickets.filter(t => t.Status === 'open').length > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-orange-800 mb-1">Open Tickets Requiring Attention</h3>
              <p className="text-sm text-orange-700">
                {tickets.filter(t => t.Status === 'open').length} open ticket(s) need to be assigned or addressed
              </p>
              <button onClick={() => setActiveTab('tickets')} className="mt-2 text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                View Open Tickets <ArrowRight className="w-4 h-4" />
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
            {tickets.slice(0, 5).map(ticket => {
              const student = users.find(u => u.User_ID === ticket.S_User_ID);
              const assignedTo = users.find(u => u.User_ID === ticket.T_User_ID);
              return (
                <div key={ticket.Problem_ID} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => setSelectedTicket(ticket)}>
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    ticket.Status === 'open' ? 'bg-red-500' : ticket.Status === 'in-progress' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">{ticket.Problem_Title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {student ? `${student.First_Name} ${student.Last_Name}` : `Student ${ticket.S_User_ID}`} • {new Date(ticket.Create_Time).toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        ticket.Status === 'open' ? 'bg-orange-100 text-orange-700' :
                        ticket.Status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>{ticket.Status}</span>
                      <span className="text-xs text-gray-500">{ticket.Category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent User Issues</h3>
            <button onClick={() => setActiveTab('users')} className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {techSupportStudents.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-blue-500"></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">Problem #{item.Problem_ID}</p>
                  <p className="text-xs text-gray-600 mt-1 truncate">{item.St_Problem}</p>
                  {item.It_Solution && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-green-600">Solution:</p>
                      <p className="text-xs text-gray-600 truncate">{item.It_Solution}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Support Tickets</h2>
        <button 
          onClick={() => setShowTicketForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />Create Ticket
        </button>
      </div>

      {showTicketForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Create New Ticket</h3>
            <button
              onClick={() => setShowTicketForm(false)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleCreateTicket}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Problem Title *
                </label>
                <input
                  type="text"
                  value={newTicket.Problem_Title}
                  onChange={(e) => setNewTicket({...newTicket, Problem_Title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Brief description of the problem"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newTicket.Category}
                    onChange={(e) => setNewTicket({...newTicket, Category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Authentication">Authentication</option>
                    <option value="Content">Content</option>
                    <option value="Performance">Performance</option>
                    <option value="Database">Database</option>
                    <option value="Email">Email</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Security">Security</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign to Student
                  </label>
                  <select
                    value={newTicket.S_User_ID}
                    onChange={(e) => setNewTicket({...newTicket, S_User_ID: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select student</option>
                    {users.filter(u => u.Role_Type === 'Student').map(user => (
                      <option key={user.User_ID} value={user.User_ID}>
                        {user.First_Name} {user.Last_Name} ({user.Email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTicketForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Ticket'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {selectedTicket && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Ticket Details #{selectedTicket.Problem_ID}</h3>
            <button
              onClick={() => setSelectedTicket(null)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Problem Title</h4>
              <p className="text-gray-900">{selectedTicket.Problem_Title}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Category</h4>
                <p className="text-gray-900">{selectedTicket.Category}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Status</h4>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  selectedTicket.Status === 'open' ? 'bg-orange-100 text-orange-700' :
                  selectedTicket.Status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>{selectedTicket.Status}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Created</h4>
                <p className="text-gray-900">{new Date(selectedTicket.Create_Time).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAssignTicket(selectedTicket.Problem_ID, 16)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Assign to Me
              </button>
              <button
                onClick={() => handleUpdateTicketStatus(selectedTicket.Problem_ID, 'in-progress')}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Mark as In Progress
              </button>
              <button
                onClick={() => handleUpdateTicketStatus(selectedTicket.Problem_ID, 'resolved')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'open', 'in-progress', 'resolved'].map((filter) => (
              <button 
                key={filter} 
                onClick={() => setTicketFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  ticketFilter === filter ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Problem Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTickets.map((ticket) => {
              const assignedUser = users.find(u => u.User_ID === ticket.T_User_ID);
              const studentUser = users.find(u => u.User_ID === ticket.S_User_ID);
              return (
                <tr key={ticket.Problem_ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-600">#{ticket.Problem_ID}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{ticket.Problem_Title}</p>
                      {studentUser && (
                        <p className="text-sm text-gray-500">{studentUser.First_Name} {studentUser.Last_Name}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800">{ticket.Category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ticket.Status === 'open' ? 'bg-orange-100 text-orange-700' :
                      ticket.Status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>{ticket.Status === 'in-progress' ? 'In Progress' : ticket.Status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800">
                      {assignedUser ? `${assignedUser.First_Name} ${assignedUser.Last_Name}` : 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(ticket.Create_Time).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedTicket(ticket)}
                        className="p-2 hover:bg-gray-100 rounded-lg" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleAssignTicket(ticket.Problem_ID, 16)}
                        className="p-2 hover:bg-blue-100 rounded-lg"
                        title="Assign to Me"
                      >
                        <UserPlus className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleUpdateTicketStatus(ticket.Problem_ID, 'resolved')}
                        className="p-2 hover:bg-green-100 rounded-lg"
                        title="Mark Resolved"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
            <p className="text-sm text-green-700">Last checked: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">System Services Status</h3>
        <div className="space-y-4">
          {[
            { service: 'Web Application', status: 'operational', uptime: '99.9%', lastCheck: '2 min ago', responseTime: '145ms' },
            { service: 'API Server', status: 'operational', uptime: '99.8%', lastCheck: '2 min ago', responseTime: '89ms' },
            { service: 'Database (Primary)', status: 'operational', uptime: '100%', lastCheck: '1 min ago', responseTime: '12ms' },
            { service: 'Database (Replica)', status: 'operational', uptime: '99.7%', lastCheck: '1 min ago', responseTime: '15ms' },
            { service: 'File Storage', status: 'operational', uptime: '99.9%', lastCheck: '3 min ago', responseTime: '234ms' },
            { service: 'Email Service', status: 'degraded', uptime: '95.2%', lastCheck: '1 min ago', responseTime: '1200ms' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${
                  service.status === 'operational' ? 'bg-green-500' :
                  service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <h4 className="font-semibold text-gray-800">{service.service}</h4>
                  <p className="text-sm text-gray-600">
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
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { metric: 'CPU Usage', value: 45, unit: '%', status: 'good' },
          { metric: 'Memory Usage', value: 68, unit: '%', status: 'warning' },
          { metric: 'Disk Space', value: 72, unit: '%', status: 'warning' },
          { metric: 'Network Load', value: 35, unit: '%', status: 'good' },
          { metric: 'Active Users', value: 342, unit: '', status: 'good' },
          { metric: 'Database Connections', value: 85, unit: '', status: 'good' }
        ].map((metric, index) => (
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

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">User Management & Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Users', value: users.length, change: `${users.filter(u => u.Role_Type === 'Student').length} students`, icon: Users, color: 'bg-blue-100', iconColor: 'text-blue-600' },
          { label: 'Active Tickets', value: tickets.filter(t => t.Status === 'open' || t.Status === 'in-progress').length, change: 'Requiring attention', icon: Activity, color: 'bg-green-100', iconColor: 'text-green-600' },
          { label: 'Resolved Issues', value: techSupportStudents.filter(t => t.It_Solution).length, change: 'With solutions provided', icon: CheckCircle, color: 'bg-orange-100', iconColor: 'text-orange-600' }
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
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tech Support Student Issues</h3>
        <div className="space-y-4">
          {techSupportStudents.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">Problem #{item.Problem_ID}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Reported: {new Date(item.TimeStamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setShowSolutionForm(item.Problem_ID)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  {item.It_Solution ? 'Edit Solution' : 'Add Solution'}
                </button>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Problem Description:</p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded">{item.St_Problem}</p>
              </div>
              {item.It_Solution && (
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">IT Solution:</p>
                  <p className="text-gray-800 bg-green-50 p-3 rounded">{item.It_Solution}</p>
                </div>
              )}
              
              {showSolutionForm === item.Problem_ID && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <form onSubmit={(e) => handleAddSolution(item.Problem_ID, e)}>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Solution
                      </label>
                      <textarea
                        value={newSolution.It_Solution}
                        onChange={(e) => setNewSolution({...newSolution, It_Solution: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="3"
                        placeholder="Enter the solution for this problem..."
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowSolutionForm(null);
                          setNewSolution({ It_Solution: '', Problem_ID: null });
                        }}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save Solution
                      </button>
                    </div>
                  </form>
                </div>
              )}
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
        <button 
          onClick={() => setShowDiscussionForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />New Article
        </button>
      </div>

      {showDiscussionForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Create New Knowledge Base Article</h3>
            <button
              onClick={() => setShowDiscussionForm(false)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleCreateDiscussion}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Article Title/Problem *
                </label>
                <input
                  type="text"
                  value={newDiscussion.Post}
                  onChange={(e) => setNewDiscussion({...newDiscussion, Post: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., How to Reset User Password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Solution/Description *
                </label>
                <textarea
                  value={newDiscussion.Post}
                  onChange={(e) => setNewDiscussion({...newDiscussion, Post: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Detailed solution or description..."
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDiscussionForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Article'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search knowledge base..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full" 
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {discussions.map((discussion) => {
            const discussionComments = comments[discussion.DISCUSSION_ID] || [];
            const showComments = showCommentForm === discussion.DISCUSSION_ID;
            const isOwner = discussion.User_ID === currentUser.User_ID;

            return (
              <div key={discussion.DISCUSSION_ID} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{discussion.Post}</h4>
                      <p className="text-sm text-gray-600">
                        By: {discussion.First_Name} {discussion.Last_Name} • {discussion.Post_Date}
                      </p>
                    </div>
                    {isOwner && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingDiscussion(discussion.DISCUSSION_ID)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteDiscussion(discussion.DISCUSSION_ID)}
                          className="p-1 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <button
                      onClick={() => {
                        if (!showComments) {
                          fetchDiscussionComments(discussion.DISCUSSION_ID);
                        }
                        setShowCommentForm(showComments ? null : discussion.DISCUSSION_ID);
                      }}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {showComments ? 'Hide Comments' : `View Comments (${discussionComments.length})`}
                    </button>
                  </div>

                  {showComments && (
                    <>
                      <div className="space-y-3 mb-4">
                        {discussionComments.map((comment) => {
                          const isCommentOwner = comment.User_ID === currentUser.User_ID;
                          return (
                            <div key={comment.COMMENT_ID} className="pl-4 border-l-2 border-gray-200">
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <span className="font-medium text-sm text-gray-800">
                                    {comment.First_Name} {comment.Last_Name}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    {comment.Comment_Date}
                                  </span>
                                </div>
                                {isCommentOwner && (
                                  <button
                                    onClick={() => handleDeleteComment(comment.COMMENT_ID, discussion.DISCUSSION_ID)}
                                    className="p-1 hover:bg-red-50 rounded"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-600" />
                                  </button>
                                )}
                              </div>
                              <p className="text-gray-700 text-sm">{comment.Comment}</p>
                            </div>
                          );
                        })}
                        {discussionComments.length === 0 && (
                          <p className="text-gray-500 text-sm pl-4">No comments yet. Be the first to comment!</p>
                        )}
                      </div>

                      <div className="mt-4">
                        <form onSubmit={(e) => handleCreateComment(discussion.DISCUSSION_ID, e)}>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newComment.DISCUSSION_ID === discussion.DISCUSSION_ID ? newComment.Comment : ''}
                              onChange={(e) => setNewComment({ Comment: e.target.value, DISCUSSION_ID: discussion.DISCUSSION_ID })}
                              className="flex-1 p-2 border border-gray-300 rounded-lg"
                              placeholder="Add a comment or additional information..."
                              required
                            />
                            <button
                              type="submit"
                              disabled={loading}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                              {loading ? 'Posting...' : 'Post'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings & Configuration</h2>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading settings...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} />
                Profile Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={profile.First_Name}
                      onChange={e => setProfile({...profile, First_Name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={profile.Last_Name}
                      onChange={e => setProfile({...profile, Last_Name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={profile.Email}
                    onChange={e => setProfile({...profile, Email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <input 
                    type="text" 
                    value={profile.Role_Type}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 cursor-not-allowed" 
                    disabled
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">User ID</label>
                  <input 
                    type="text" 
                    value={currentUser.User_ID}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 cursor-not-allowed" 
                    disabled
                    readOnly
                  />
                </div>
                <button 
                  onClick={handleUpdateProfile}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Key size={20} />
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <input 
                    type="password" 
                    value={passwordData.currentPassword}
                    onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input 
                    type="password" 
                    value={passwordData.newPassword}
                    onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwordData.confirmPassword}
                    onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Confirm new password"
                  />
                </div>
                <button 
                  onClick={handleChangePassword}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {profile.First_Name?.charAt(0) || 'I'}{profile.Last_Name?.charAt(0) || 'T'}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{profile.First_Name} {profile.Last_Name}</h3>
                <p className="text-gray-600">IT Support Specialist</p>
                <p className="text-sm text-gray-500 mt-2">{profile.Email}</p>
                <p className="text-xs text-gray-400 mt-1">User ID: {currentUser.User_ID}</p>
                <div className="mt-4 space-y-2">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Support Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-800">Mar 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tickets Assigned</span>
                  <span className="font-semibold text-gray-800">
                    {tickets.filter(t => t.T_User_ID === currentUser.User_ID).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Resolved Today</span>
                  <span className="font-semibold text-gray-800">
                    {tickets.filter(t => 
                      t.T_User_ID === currentUser.User_ID && 
                      t.Status === 'resolved' &&
                      new Date(t.Create_Time).toDateString() === new Date().toDateString()
                    ).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Knowledge Articles</span>
                  <span className="font-semibold text-gray-800">
                    {discussions.filter(d => d.User_ID === currentUser.User_ID).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tickets', label: 'Support Tickets', icon: Headphones },
    { id: 'system', label: 'System Status', icon: Server },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'knowledge', label: 'Knowledge Base', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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
                <h1 className="font-bold text-gray-800">Erudite </h1>
                <p className="text-xs text-gray-500">IT Support Panel</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
              <div className="flex items-center gap-1 justify-center">
                {navItems.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {profile.First_Name?.charAt(0) || 'I'}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">{profile.First_Name} {profile.Last_Name}</p>
                      <p className="text-sm text-gray-500">{profile.Email}</p>
                    </div>
                    <button 
                      onClick={() => { setActiveTab('settings'); setProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" /><span>Profile Settings</span>
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /><span>Sign Out</span>
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

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
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

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'tickets' && 'Support Tickets'}
            {activeTab === 'system' && 'System Status & Health'}
            {activeTab === 'users' && 'User Management & Support'}
            {activeTab === 'knowledge' && 'Knowledge Base'}
            {activeTab === 'settings' && 'Settings & Configuration'}
          </h1>
          <p className="text-gray-600 mt-1">
            {activeTab === 'dashboard' && 'Monitor system health, tickets, and platform performance'}
            {activeTab === 'tickets' && 'Manage and resolve support tickets efficiently'}
            {activeTab === 'system' && 'Check the status of all platform services'}
            {activeTab === 'users' && 'Manage user accounts and resolve user issues'}
            {activeTab === 'knowledge' && 'Access technical documentation and guides'}
            {activeTab === 'settings' && 'Configure your profile and notification preferences'}
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle className="w-5 h-5 inline mr-2" />
            {error}
          </div>
        )}

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'tickets' && renderTickets()}
        {activeTab === 'system' && renderSystem()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'knowledge' && renderKnowledge()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}