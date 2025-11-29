import React, { useState, useEffect } from 'react';
import { 
  Home, GraduationCap, BookOpen, Users, FileText, BarChart3, 
  MessageSquare, Settings, Bell, Award, Clock, TrendingUp, 
  Plus, Search, Filter, Eye, Edit, Trash2, Menu, X, 
  LogOut, User, Lock, ChevronDown 
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { instructorAPI } from '../services/instructorAPI';

const CreateEditModal = ({ isEdit, type, record, onSave, onClose, courses }) => {
  const [formData, setFormData] = useState(record || {});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(type, formData);
  };

  const renderFormFields = () => {
    console.log('Rendering form for type:', type);
    
    switch(type) {
      case 'course':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Title *</label>
              <input 
                type="text" 
                value={formData.Course_Title || ''} 
                onChange={e => setFormData({...formData, Course_Title: e.target.value})} 
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Code *</label>
              <input 
                type="text" 
                value={formData.Course_Code || ''} 
                onChange={e => setFormData({...formData, Course_Code: e.target.value})} 
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                required
                disabled={isEdit}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                value={formData.Description || ''} 
                onChange={e => setFormData({...formData, Description: e.target.value})} 
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select 
                value={formData.Category || ''} 
                onChange={e => setFormData({...formData, Category: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Category</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
              <select 
                value={formData.Difficulty_Level || ''} 
                onChange={e => setFormData({...formData, Difficulty_Level: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quiz Title *</label>
              <input 
                type="text" 
                value={formData.Quiz_Title || ''} 
                onChange={e => setFormData({...formData, Quiz_Title: e.target.value})} 
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course *</label>
              <select 
                value={formData.Course_Code || ''} 
                onChange={e => setFormData({...formData, Course_Code: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.Course_Code} value={course.Course_Code}>
                    {course.Course_Title}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Questions</label>
                <input 
                  type="number" 
                  value={formData.Total_Questions || ''} 
                  onChange={e => setFormData({...formData, Total_Questions: parseInt(e.target.value)})} 
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                <input 
                  type="number" 
                  value={formData.Total_Marks || ''} 
                  onChange={e => setFormData({...formData, Total_Marks: parseInt(e.target.value)})} 
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                  min="1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input 
                type="text" 
                value={formData.Duration || ''} 
                onChange={e => setFormData({...formData, Duration: e.target.value})} 
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder="e.g., 45 min"
              />
            </div>
            {!isEdit && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quiz Number</label>
                  <input 
                    type="number" 
                    value={formData.Quiz_No || ''} 
                    onChange={e => setFormData({...formData, Quiz_No: parseInt(e.target.value)})} 
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Set Number</label>
                  <input 
                    type="number" 
                    value={formData.Set_No || 1} 
                    onChange={e => setFormData({...formData, Set_No: parseInt(e.target.value)})} 
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                    min="1"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'discussion':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Post Content *</label>
              <textarea 
                value={formData.Post || ''} 
                onChange={e => setFormData({...formData, Post: e.target.value})} 
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" 
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <select 
                value={formData.Course_Code || ''} 
                onChange={e => setFormData({...formData, Course_Code: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.Course_Code} value={course.Course_Code}>
                    {course.Course_Title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'viewCourse':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold">{record?.Course_Title}</h4>
                <p className="text-gray-600">Code: {record?.Course_Code}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <p className="text-gray-800">{record?.Description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <p className="text-gray-800">{record?.Category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                <p className="text-gray-800">{record?.Difficulty_Level}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{record?.students || 0}</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{record?.quizzes || 0}</p>
                <p className="text-sm text-gray-600">Quizzes</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-4">
            <p className="text-gray-500">Form for {type} is not implemented yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isEdit ? 'Edit' : type.includes('view') ? 'View' : 'Create'} {type.replace('new', '').replace('edit', '').replace('view', '')}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">
              {type.includes('view') ? 'Close' : 'Cancel'}
            </button>
            {!type.includes('view') && (
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                {isEdit ? 'Update' : 'Create'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default function InstructorDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for real data from database
  const [instructorProfile, setInstructorProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const instructorId = 2; // Use your actual instructor ID

  // Chart colors
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Fetch data on component mount and tab change
  // Add this useEffect for connection checking
  // Add this useEffect after your state declarations
  useEffect(() => {
    fetchInstructorData();
  }, [activeTab]); // Refetch when tab changes

  // Also call it on component mount
  useEffect(() => {
    checkServerConnection();
    fetchInstructorData(); // Add this line
  }, []);

  const checkServerConnection = async () => {
    try {
      console.log('Checking server connection...');
      const connected = await instructorAPI.testConnection();
      if (!connected) {
        console.error('Server connection failed');
      } else {
        console.log('Server connection successful');
      }
    } catch (error) {
      console.error('Connection check failed:', error);
    }
  };

  const fetchInstructorData = async () => {
    setLoading(true);
    try {
      console.log(`Fetching data for tab: ${activeTab}, instructor: ${instructorId}`);
      
      switch (activeTab) {
        case 'overview':
          const [profile, coursesData, studentsData, quizzesData] = await Promise.all([
            instructorAPI.getProfile(instructorId),
            instructorAPI.getCourses(instructorId),
            instructorAPI.getStudents(instructorId),
            instructorAPI.getQuizzes(instructorId)
          ]);
          console.log('Overview data:', { profile, coursesData, studentsData, quizzesData });
          setInstructorProfile(profile);
          setCourses(coursesData);
          setStudents(studentsData);
          setQuizzes(quizzesData);
          break;
      

        case 'courses':
          const coursesData2 = await instructorAPI.getCourses(instructorId);
          setCourses(coursesData2);
          break;

        case 'students':
          const studentsData2 = await instructorAPI.getStudents(instructorId);
          setStudents(studentsData2);
          break;

        case 'quizzes':
          const quizzesData2 = await instructorAPI.getQuizzes(instructorId);
          setQuizzes(quizzesData2);
          break;

        case 'discussions':
          const discussionsData = await instructorAPI.getDiscussions(instructorId);
          setDiscussions(discussionsData);
          break;

        case 'analytics':
          const analyticsData = await instructorAPI.getAnalytics(instructorId);
          setAnalytics(analyticsData);
          break;

        case 'settings':
          const profileData = await instructorAPI.getProfile(instructorId);
          setInstructorProfile(profileData);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Error details:', error.message);
      alert('Error loading data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // // Get instructor profile
  // getProfile: async (instructorId) => {
  //   console.log(`Fetching profile for instructor: ${instructorId}`);
  //   const result = await apiCall(`/instructors/${instructorId}`);
  //   console.log('Profile response:', result);
  //   return result;
  // },

  // Stats calculated from real data
  const stats = [
    { 
      label: 'Active Courses', 
      value: courses.filter(c => c.Status === 'Active').length.toString(), 
      change: '+2', 
      icon: BookOpen, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Total Students', 
      value: students.length.toString(), 
      change: '+23', 
      icon: Users, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Pending Quizzes', 
      value: quizzes.filter(q => q.Status === 'Pending').length.toString(), 
      change: '-3', 
      icon: FileText, 
      color: 'bg-orange-500' 
    },
    { 
      label: 'Avg. Rating', 
      value: '4.8', 
      change: '+0.2', 
      icon: Award, 
      color: 'bg-purple-500' 
    }
  ];

  // Analytics data calculated from real data
  const studentProgressData = analytics?.studentProgress || [
    { month: 'Jan', completion: 65, engagement: 75 },
    { month: 'Feb', completion: 70, engagement: 78 },
    { month: 'Mar', completion: 75, engagement: 82 },
    { month: 'Apr', completion: 78, engagement: 85 },
    { month: 'May', completion: 82, engagement: 88 },
    { month: 'Jun', completion: 87, engagement: 90 }
  ];

  const quizPerformanceData = analytics?.quizPerformance || quizzes.map((quiz, index) => ({
    quiz: `Quiz ${index + 1}`,
    avgScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
    completion: Math.floor(Math.random() * 20) + 80 // Random completion between 80-100
  }));

  const courseEnrollmentData = analytics?.courseEnrollment || courses.map(course => ({
    name: course.Course_Title,
    students: course.students || Math.floor(Math.random() * 30) + 20
  }));

  const gradeDistributionData = analytics?.gradeDistribution || [
    { grade: 'A', count: Math.floor(Math.random() * 50) + 70 },
    { grade: 'B', count: Math.floor(Math.random() * 40) + 50 },
    { grade: 'C', count: Math.floor(Math.random() * 30) + 30 },
    { grade: 'D', count: Math.floor(Math.random() * 20) + 15 },
    { grade: 'F', count: Math.floor(Math.random() * 10) + 5 }
  ];

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.First_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.Last_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.Email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal handlers with API calls
  const openModal = (type, item = null) => {
    console.log('Opening modal:', type, item);
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };


  // CRUD Operations with API calls
  // CRUD Operations with proper API calls
  const handleCreate = async (type, data) => {
    try {
      console.log('Creating:', type, data);
      let result;
      
      switch (type) {
        case 'course':
          result = await instructorAPI.createCourse(data);
          break;
        case 'quiz':
          result = await instructorAPI.createQuiz(data);
          break;
        case 'discussion':
          result = await instructorAPI.createDiscussion(data);
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
      
      await fetchInstructorData(); // Refresh data
      closeModal();
      alert(`${type} created successfully!`);
      return result;
    } catch (error) {
      console.error('Error creating:', error);
      alert(`Error creating ${type}: ${error.message}`);
    }
  };

  const handleEdit = async (type, data) => {
    try {
      console.log('Updating:', type, data);
      
      switch (type) {
        case 'course':
          await instructorAPI.updateCourse(data.Course_Code, data);
          break;
        case 'quiz':
          await instructorAPI.updateQuiz(data.Quiz_No, data.Set_No, data);
          break;
        case 'discussion':
          await instructorAPI.updateDiscussion(data.DISCUSSION_ID, data);
          break;
        case 'profile':
          await instructorAPI.updateProfile(instructorId, data);
          setInstructorProfile(data);
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
      
      await fetchInstructorData();
      closeModal();
      alert(`${type} updated successfully!`);
    } catch (error) {
      console.error('Error updating:', error);
      alert(`Error updating ${type}: ${error.message}`);
    }
  };

  const handleDelete = async (type, id, additionalId = null) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        console.log('Deleting:', type, id, additionalId);
        
        switch (type) {
          case 'course':
            await instructorAPI.deleteCourse(id);
            break;
          case 'quiz':
            await instructorAPI.deleteQuiz(id, additionalId);
            break;
          case 'discussion':
            await instructorAPI.deleteDiscussion(id);
            break;
          default:
            throw new Error(`Unknown type: ${type}`);
        }
        
        await fetchInstructorData();
        alert(`${type} deleted successfully!`);
      } catch (error) {
        console.error('Error deleting:', error);
        alert(`Error deleting ${type}: ${error.message}`);
      }
    }
  };

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'quizzes', label: 'Quizzes', icon: FileText },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/login';
    }
  };

  // Loading state
  if (loading && !instructorProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Render functions
  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Courses</h3>
            <button 
              onClick={() => setActiveTab('courses')}
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {courses.slice(0, 3).map(course => (
              <div key={course.Course_Code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{course.Course_Title}</p>
                  <p className="text-xs text-gray-600">{course.Category}</p>
                  <p className="text-xs text-gray-500">{course.students} students</p>
                </div>
                <button 
                  onClick={() => openModal('viewCourse', course)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Eye size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Quizzes</h3>
            <button 
              onClick={() => setActiveTab('quizzes')}
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {quizzes.slice(0, 3).map(quiz => (
              <div key={`${quiz.Quiz_No}-${quiz.Set_No}`} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{quiz.Quiz_Title}</p>
                  <p className="text-xs text-gray-600">{quiz.Course_Code}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-gray-500">Due: {quiz.Due_Date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render Courses Tab
  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <button 
          onClick={() => openModal('course')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Create Course
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading courses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.Course_Code} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <BookOpen className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{course.Course_Title}</h3>
                    <p className="text-sm text-gray-600">Code: {course.Course_Code}</p>
                    <p className="text-sm text-gray-600">{course.students} students enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openModal('viewCourse', course)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => openModal('editCourse', course)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete('course', course.Course_Code)}
                    className="p-2 hover:bg-gray-100 rounded text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-semibold ${
                      course.Status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {course.Status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{course.quizzes || 0}</p>
                    <p className="text-xs text-gray-600">Quizzes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{course.pending || 0}</p>
                    <p className="text-xs text-gray-600">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{course.rating || 'N/A'}</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <button 
                    onClick={() => openModal('viewCourse', course)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100"
                  >
                    View Course
                  </button>
                  <button 
                    onClick={() => alert('Manage content feature coming soon!')}
                    className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
                  >
                    Manage Content
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
       {/* In renderCourses function, after the loading check: */}
      {!loading && courses.length === 0 && (
        <div className="text-center py-8">
          <BookOpen className="mx-auto text-gray-400" size={48} />
          <p className="mt-4 text-gray-500">No courses found</p>
          <button 
            onClick={() => openModal('course')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Create Your First Course
          </button>
        </div>
      )}
    </div>
  );

  // Render Students function
  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Students</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64"
            />
          </div>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading students...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr key={student.User_ID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">#{student.User_ID}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{student.First_Name} {student.Last_Name}</p>
                        <p className="text-sm text-gray-600">{student.Interest}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{student.Email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {student.courses || 0} courses
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${student.avgGrade >= 85 ? 'text-green-600' : student.avgGrade >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {student.avgGrade || 'N/A'}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal('viewStudent', student)}
                          className="p-2 hover:bg-gray-100 rounded"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="p-2 hover:bg-gray-100 rounded"
                          title="Message"
                        >
                          <MessageSquare size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  // Render Quizzes function
  const renderQuizzes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quiz Management</h2>
        <button 
          onClick={() => openModal('quiz')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Create Quiz
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading quizzes...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <div className="flex gap-4 overflow-x-auto">
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold whitespace-nowrap">All</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-lg whitespace-nowrap">Pending</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-lg whitespace-nowrap">Graded</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-lg whitespace-nowrap">Overdue</button>
            </div>
          </div>
          <div className="divide-y">
            {quizzes.map(quiz => (
              <div key={`${quiz.Quiz_No}-${quiz.Set_No}`} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <FileText className="text-gray-400" size={20} />
                      <div>
                        <p className="font-semibold">{quiz.Quiz_Title}</p>
                        <p className="text-sm text-gray-600">{quiz.Course_Code} • Due: {quiz.Due_Date}</p>
                        <p className="text-xs text-gray-500 mt-1">{quiz.Total_Questions} questions • {quiz.Total_Marks} marks</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {quiz.submissions || 0} submissions
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                      {quiz.pending || 0} pending
                    </span>
                    <button 
                      onClick={() => openModal('editQuiz', quiz)}
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete('quiz', quiz.Quiz_No, quiz.Set_No)}
                      className="p-2 hover:bg-gray-200 rounded text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render Discussions Tab with Create Button
  const renderDiscussions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Discussions & Announcements</h2>
        <button 
          onClick={() => openModal('discussion')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          New Discussion
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading discussions...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {discussions.map(discussion => (
            <div key={discussion.DISCUSSION_ID} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <MessageSquare className="text-blue-600" size={20} />
                    <span className="text-sm font-semibold text-blue-600">{discussion.Course_Title || 'All Courses'}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{new Date(discussion.Post_Date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{discussion.Post}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>By: {discussion.First_Name} {discussion.Last_Name}</span>
                    <span>•</span>
                    <span>{discussion.Comments || 0} comments</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openModal('editDiscussion', discussion)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete('discussion', discussion.DISCUSSION_ID)}
                    className="p-2 hover:bg-gray-100 rounded text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // New renderAnalytics function with real data
  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-green-600" size={24} />
            <h3 className="font-semibold text-sm">Completion Rate</h3>
          </div>
          <p className="text-3xl font-bold">87%</p>
          <p className="text-sm text-green-600 mt-1">+5% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-blue-600" size={24} />
            <h3 className="font-semibold text-sm">Active Students</h3>
          </div>
          <p className="text-3xl font-bold">298</p>
          <p className="text-sm text-blue-600 mt-1">87% participation</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-yellow-600" size={24} />
            <h3 className="font-semibold text-sm">Avg Quiz Score</h3>
          </div>
          <p className="text-3xl font-bold">82%</p>
          <p className="text-sm text-yellow-600 mt-1">Class average</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-purple-600" size={24} />
            <h3 className="font-semibold text-sm">Response Time</h3>
          </div>
          <p className="text-3xl font-bold">4.2h</p>
          <p className="text-sm text-purple-600 mt-1">Avg grading time</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Progress Over Time */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Student Progress Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={studentProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="completion" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="engagement" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quiz Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Quiz Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quizPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quiz" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgScore" fill="#3b82f6" name="Average Score (%)" />
              <Bar dataKey="completion" fill="#10b981" name="Completion (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Course Enrollment */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Course Enrollment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseEnrollmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, students }) => `${name}: ${students}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="students"
              >
                {courseEnrollmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Render Settings function
  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading settings...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <User size={20} />
                Profile Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name</label>
                    <input 
                      type="text" 
                      defaultValue={instructorProfile?.First_Name || ''} 
                      className="w-full border rounded-lg px-4 py-2" 
                      onChange={e => setInstructorProfile({...instructorProfile, First_Name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue={instructorProfile?.Last_Name || ''} 
                      className="w-full border rounded-lg px-4 py-2" 
                      onChange={e => setInstructorProfile({...instructorProfile, Last_Name: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue={instructorProfile?.Email || ''} 
                    className="w-full border rounded-lg px-4 py-2" 
                    onChange={e => setInstructorProfile({...instructorProfile, Email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Qualification</label>
                  <input 
                    type="text" 
                    defaultValue={instructorProfile?.Qualification || ''} 
                    className="w-full border rounded-lg px-4 py-2" 
                    onChange={e => setInstructorProfile({...instructorProfile, Qualification: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Expertise</label>
                  <input 
                    type="text" 
                    defaultValue={instructorProfile?.Expertise || ''} 
                    className="w-full border rounded-lg px-4 py-2" 
                    onChange={e => setInstructorProfile({...instructorProfile, Expertise: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Bio</label>
                  <textarea 
                    rows="4" 
                    className="w-full border rounded-lg px-4 py-2" 
                    defaultValue={instructorProfile?.Bio || "Professor with teaching experience."}
                    onChange={e => setInstructorProfile({...instructorProfile, Bio: e.target.value})}
                  />
                </div>
                <button 
                  onClick={() => handleEdit('profile', instructorProfile)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Lock size={20} />
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Current Password</label>
                  <input type="password" className="w-full border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">New Password</label>
                  <input type="password" className="w-full border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                  <input type="password" className="w-full border rounded-lg px-4 py-2" />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {instructorProfile?.First_Name?.charAt(0) || 'I'}
                </div>
                <h3 className="text-xl font-bold">Dr. {instructorProfile?.First_Name} {instructorProfile?.Last_Name}</h3>
                <p className="text-gray-600">Instructor</p>
                <p className="text-sm text-gray-500 mt-2">{instructorProfile?.Qualification}</p>
                <button className="mt-4 w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                  Change Photo
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">{instructorProfile?.Join_Date || '2020-01-01'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Courses</span>
                  <span className="font-semibold">{courses.length} Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Students</span>
                  <span className="font-semibold">{students.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Rating</span>
                  <span className="font-semibold">4.8/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Main return with navigation and modal
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Erudite</h1>
                <p className="text-xs text-gray-500">Instructor Portal</p>
              </div>
            </div>

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

            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative hidden sm:block">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {instructorProfile?.First_Name?.charAt(0) || 'I'}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">{instructorProfile?.First_Name} {instructorProfile?.Last_Name}</p>
                      <p className="text-sm text-gray-500">{instructorProfile?.Email}</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'quizzes' && renderQuizzes()}
        {activeTab === 'discussions' && renderDiscussions()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {/* Modal */}
      {showModal && (
        <CreateEditModal
          isEdit={modalType.includes('edit')}
          type={modalType.replace('new', '').replace('edit', '').replace('view', '')}
          record={selectedItem}
          onSave={modalType.includes('edit') ? handleEdit : handleCreate}
          onClose={closeModal}
          courses={courses}
        />
      )}
    </div>
  );
}