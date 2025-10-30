import React, { useState } from 'react';

import { 
  LayoutDashboard, Users, BookOpen, FileText, GraduationCap, 
  BarChart3, Settings, Search, Plus, Edit, Trash2, 
  Eye, Download, Mail, Calendar, TrendingUp, Award,
  Clock, CheckCircle, XCircle, MoreVertical, UserCheck,
  Menu, X, Bell, LogOut, MessageSquare, User, ChevronDown
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  // State variables - ALL inside the component
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // Moved inside

  // Sign out function - INSIDE the component
  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    // Call the onLogout prop if it exists
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/login';
    }
    
    console.log('Successfully signed out');
  };

  // Rest of your data arrays and functions...
  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Courses', value: '156', change: '+8%', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Total Enrollments', value: '8,924', change: '+23%', icon: GraduationCap, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$45,890', change: '+18%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', enrolled: 5, joined: '2024-01-15' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Instructor', status: 'Active', courses: 8, joined: '2023-11-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', status: 'Inactive', enrolled: 2, joined: '2024-03-10' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Instructor', status: 'Active', courses: 12, joined: '2023-08-05' },
    { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Student', status: 'Active', enrolled: 7, joined: '2024-02-22' }
  ];

  const courses = [
    { id: 1, title: 'Web Development Bootcamp', instructor: 'Sarah Wilson', students: 245, rating: 4.8, status: 'Active', category: 'Development', duration: '12 weeks', price: '$99' },
    { id: 2, title: 'Data Science with Python', instructor: 'Emily Brown', students: 189, rating: 4.9, status: 'Active', category: 'Data Science', duration: '10 weeks', price: '$129' },
    { id: 3, title: 'Digital Marketing Mastery', instructor: 'Sarah Wilson', students: 156, rating: 4.6, status: 'Active', category: 'Marketing', duration: '8 weeks', price: '$79' },
    { id: 4, title: 'Mobile App Development', instructor: 'Emily Brown', students: 92, rating: 4.7, status: 'Draft', category: 'Development', duration: '14 weeks', price: '$149' },
    { id: 5, title: 'Machine Learning Fundamentals', instructor: 'Sarah Wilson', students: 178, rating: 4.8, status: 'Active', category: 'Data Science', duration: '16 weeks', price: '$159' }
  ];

  const contentItems = [
    { id: 1, title: 'Introduction to HTML & CSS', course: 'Web Development Bootcamp', type: 'Video', size: '245 MB', uploadedBy: 'Sarah Wilson', uploadDate: '2024-01-15', status: 'Published' },
    { id: 2, title: 'JavaScript Basics - Part 1', course: 'Web Development Bootcamp', type: 'Video', size: '189 MB', uploadedBy: 'Sarah Wilson', uploadDate: '2024-01-16', status: 'Published' },
    { id: 3, title: 'Python Programming Guide', course: 'Data Science with Python', type: 'PDF', size: '12 MB', uploadedBy: 'Emily Brown', uploadDate: '2024-01-20', status: 'Published' },
    { id: 4, title: 'Data Visualization Assignment', course: 'Data Science with Python', type: 'Assignment', size: '2 MB', uploadedBy: 'Emily Brown', uploadDate: '2024-01-22', status: 'Published' },
    { id: 5, title: 'SEO Best Practices 2024', course: 'Digital Marketing Mastery', type: 'PDF', size: '8 MB', uploadedBy: 'Sarah Wilson', uploadDate: '2024-02-01', status: 'Published' },
    { id: 6, title: 'React Native Tutorial', course: 'Mobile App Development', type: 'Video', size: '320 MB', uploadedBy: 'Emily Brown', uploadDate: '2024-02-10', status: 'Draft' }
  ];

  const discussions = [
    { id: 1, title: 'How to implement async/await in JavaScript?', course: 'Web Development Bootcamp', author: 'John Doe', replies: 12, lastActivity: '2 hours ago', status: 'Active' },
    { id: 2, title: 'Understanding Pandas DataFrames', course: 'Data Science with Python', author: 'Mike Johnson', replies: 8, lastActivity: '5 hours ago', status: 'Active' },
    { id: 3, title: 'Best practices for SEO in 2024', course: 'Digital Marketing Mastery', author: 'David Lee', replies: 15, lastActivity: '1 day ago', status: 'Resolved' },
    { id: 4, title: 'React Hooks vs Class Components', course: 'Web Development Bootcamp', author: 'Sarah Wilson', replies: 23, lastActivity: '3 hours ago', status: 'Active' }
  ];

  const enrollments = [
    { id: 1, studentName: 'John Doe', studentId: 'STU001', course: 'Web Development Bootcamp', enrollDate: '2024-01-15', status: 'In Progress', progress: 65, certificateId: null },
    { id: 2, studentName: 'Mike Johnson', studentId: 'STU003', course: 'Data Science with Python', enrollDate: '2024-03-10', status: 'In Progress', progress: 42, certificateId: null },
    { id: 3, studentName: 'David Lee', studentId: 'STU005', course: 'Web Development Bootcamp', enrollDate: '2024-02-22', status: 'Completed', progress: 100, certificateId: 'CERT001' },
    { id: 4, studentName: 'John Doe', studentId: 'STU001', course: 'Digital Marketing Mastery', enrollDate: '2024-04-05', status: 'In Progress', progress: 28, certificateId: null },
    { id: 5, studentName: 'Emily Test', studentId: 'STU006', course: 'Machine Learning Fundamentals', enrollDate: '2024-01-10', status: 'Completed', progress: 100, certificateId: 'CERT002' }
  ];

  const certificates = [
    { id: 'CERT001', studentId: 'STU005', studentName: 'David Lee', courseId: 1, courseName: 'Web Development Bootcamp', issueDate: '2024-10-15', downloadCount: 3 },
    { id: 'CERT002', studentId: 'STU006', studentName: 'Emily Test', courseId: 5, courseName: 'Machine Learning Fundamentals', issueDate: '2024-09-20', downloadCount: 1 },
    { id: 'CERT003', studentId: 'STU001', studentName: 'John Doe', courseId: 3, courseName: 'Digital Marketing Mastery', issueDate: '2024-08-12', downloadCount: 5 }
  ];

  const quizzes = [
    { id: 1, title: 'JavaScript Fundamentals Quiz', courseId: 1, courseName: 'Web Development Bootcamp', questions: 20, totalMarks: 100, duration: '45 min', created: '2024-01-10', status: 'Active' },
    { id: 2, title: 'Python Basics Assessment', courseId: 2, courseName: 'Data Science with Python', questions: 15, totalMarks: 75, duration: '30 min', created: '2024-01-15', status: 'Active' },
    { id: 3, title: 'SEO Strategy Test', courseId: 3, courseName: 'Digital Marketing Mastery', questions: 25, totalMarks: 100, duration: '60 min', created: '2024-02-01', status: 'Active' },
    { id: 4, title: 'React Advanced Concepts', courseId: 1, courseName: 'Web Development Bootcamp', questions: 18, totalMarks: 90, duration: '40 min', created: '2024-02-20', status: 'Draft' }
  ];

  const quizScores = [
    { id: 1, quizId: 1, quizTitle: 'JavaScript Fundamentals Quiz', studentId: 'STU001', studentName: 'John Doe', score: 85, totalMarks: 100, percentage: 85, submittedDate: '2024-03-15', feedback: 'Excellent understanding of core concepts. Focus on async programming.' },
    { id: 2, quizId: 2, quizTitle: 'Python Basics Assessment', studentId: 'STU003', studentName: 'Mike Johnson', score: 68, totalMarks: 75, percentage: 90.6, submittedDate: '2024-03-18', feedback: 'Great work! Strong grasp of data structures and functions.' },
    { id: 3, quizId: 1, quizTitle: 'JavaScript Fundamentals Quiz', studentId: 'STU005', studentName: 'David Lee', score: 92, totalMarks: 100, percentage: 92, submittedDate: '2024-03-16', feedback: 'Outstanding performance! Ready for advanced topics.' },
    { id: 4, quizId: 3, quizTitle: 'SEO Strategy Test', studentId: 'STU001', studentName: 'John Doe', score: 78, totalMarks: 100, percentage: 78, submittedDate: '2024-03-20', feedback: 'Good understanding. Review keyword research techniques.' }
  ];

  const performanceReports = [
    { id: 1, studentId: 'STU001', studentName: 'John Doe', courseId: 1, courseName: 'Web Development Bootcamp', generatedDate: '2024-10-20', 
      strengths: ['HTML/CSS mastery', 'Problem-solving skills', 'Quick learner'],
      weaknesses: ['Async programming', 'State management', 'Testing practices'],
      recommendations: ['Practice more with Promises and async/await', 'Study Redux for state management', 'Complete testing tutorials'],
      overallScore: 85, aiInsight: 'Strong foundation with room for improvement in advanced topics.' },
    { id: 2, studentId: 'STU003', studentName: 'Mike Johnson', courseId: 2, courseName: 'Data Science with Python', generatedDate: '2024-10-18',
      strengths: ['Data manipulation', 'Statistical analysis', 'Data visualization'],
      weaknesses: ['Machine learning algorithms', 'Model optimization'],
      recommendations: ['Deep dive into scikit-learn', 'Practice hyperparameter tuning', 'Study ensemble methods'],
      overallScore: 78, aiInsight: 'Excellent analytical skills. Ready for advanced ML concepts.' }
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Enrolled in Web Development Bootcamp', time: '2 hours ago' },
    { user: 'Sarah Wilson', action: 'Created new course: Advanced React', time: '5 hours ago' },
    { user: 'Mike Johnson', action: 'Completed Python Basics course', time: '1 day ago' },
    { user: 'Emily Brown', action: 'Updated course content', time: '2 days ago' }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'enrollments', label: 'Enrollments', icon: UserCheck },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'quizzes', label: 'Quizzes', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800"><span className="font-medium">{activity.user}</span> {activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Top Performing Courses</h3>
          <div className="space-y-4">
            {courses.slice(0, 4).map((course, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">{course.title}</h4>
                  <p className="text-xs text-gray-500">{course.students} students enrolled</p>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">User Management</h2>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto">
          {['all', 'students', 'instructors', 'active', 'inactive'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Instructor' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.status === 'Active' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${
                      user.status === 'Active' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.role === 'Student' ? `${user.enrolled} courses` : `${user.courses} courses`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
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

  const renderCourses = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Course Management</h2>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto">
          {['All', 'Active', 'Draft', 'Development', 'Data Science', 'Marketing'].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{course.title}</p>
                      <p className="text-sm text-gray-500">ID: #{course.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800">{course.instructor}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {course.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-800">{course.students}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-800">{course.duration}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-800">{course.price}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-800">{course.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing {courses.length} of {courses.length} courses</p>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">AI-Powered Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Course Performance</h3>
            <p className="text-sm text-gray-600">AI analysis of completion rates and engagement patterns</p>
            <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">View Report →</button>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Student Progress</h3>
            <p className="text-sm text-gray-600">Predictive analytics for student success rates</p>
            <button className="mt-4 text-sm text-purple-600 font-medium hover:underline">View Report →</button>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <Award className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Assessment Insights</h3>
            <p className="text-sm text-gray-600">AI-driven performance monitoring and feedback</p>
            <button className="mt-4 text-sm text-green-600 font-medium hover:underline">View Report →</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Performance Reports</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
        <div className="space-y-4">
          {performanceReports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{report.studentName}</h4>
                  <p className="text-sm text-gray-600">{report.courseName}</p>
                  <p className="text-xs text-gray-500 mt-1">Generated: {report.generatedDate}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{report.overallScore}%</div>
                  <p className="text-xs text-gray-500">Overall Score</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-gray-700 italic">"{report.aiInsight}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h5 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Strengths
                  </h5>
                  <ul className="space-y-1">
                    {report.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600">•</span> {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-orange-700 mb-2 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Areas for Improvement
                  </h5>
                  <ul className="space-y-1">
                    {report.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-orange-600">•</span> {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="text-sm font-semibold text-purple-700 mb-2">AI Recommendations</h5>
                <ul className="space-y-1">
                  {report.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600">→</span> {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Platform Usage Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Chart visualization will be displayed here</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          {/* Main navbar row */}
          <div className="flex items-center justify-between">
            {/* Left Section - Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Erudite</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
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
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    A
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">Admin User</p>
                      <p className="text-sm text-gray-500">admin@erudite.com</p>
                    </div>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors">
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

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'courses' && 'Course Management'}
            {activeTab === 'content' && 'Content Management'}
            {activeTab === 'enrollments' && 'Enrollment & Progress Tracking'}
            {activeTab === 'certificates' && 'Certificate Management'}
            {activeTab === 'quizzes' && 'Quiz Management'}
            {activeTab === 'analytics' && 'Analytics & Reports'}
            {activeTab === 'settings' && 'System Settings'}
          </h1>
          <p className="text-gray-600 mt-1">
            {activeTab === 'dashboard' && 'Monitor your platform performance and activities'}
            {activeTab === 'users' && 'Manage students and instructors'}
            {activeTab === 'courses' && 'Oversee all courses and their status'}
            {activeTab === 'content' && 'Manage learning materials and resources'}
            {activeTab === 'enrollments' && 'Track student enrollments and course progress'}
            {activeTab === 'certificates' && 'Manage course completion certificates'}
            {activeTab === 'quizzes' && 'Create and manage quizzes and view scores'}
            {activeTab === 'analytics' && 'View AI-powered insights and reports'}
            {activeTab === 'settings' && 'Configure platform settings'}
          </p>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-bold text-gray-800">Content Library</h2>
                  <div className="flex gap-3">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search content..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                      <Plus className="w-4 h-4" />
                      Upload Content
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {['All', 'Videos', 'PDFs', 'Assignments', 'Published', 'Draft'].map((filter) => (
                    <button
                      key={filter}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              item.type === 'Video' ? 'bg-red-100' : 
                              item.type === 'PDF' ? 'bg-blue-100' : 'bg-green-100'
                            }`}>
                              {item.type === 'Video' && <FileText className="w-5 h-5 text-red-600" />}
                              {item.type === 'PDF' && <FileText className="w-5 h-5 text-blue-600" />}
                              {item.type === 'Assignment' && <FileText className="w-5 h-5 text-green-600" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{item.title}</p>
                              <p className="text-sm text-gray-500">ID: #{item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800">{item.course}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.type === 'Video' ? 'bg-red-100 text-red-700' :
                            item.type === 'PDF' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-800">{item.size}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800">{item.uploadedBy}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-800">{item.uploadDate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Published' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-600">Showing {contentItems.length} of {contentItems.length} items</p>
                <div className="flex gap-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Course Discussions</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" />
                    New Discussion
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {discussions.map((disc) => (
                  <div key={disc.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{disc.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {disc.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {disc.course}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {disc.replies} replies
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Last activity: {disc.lastActivity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          disc.status === 'Active' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {disc.status}
                        </span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

{activeTab === 'enrollments' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-800">Enrollment & Progress Tracking</h2>
                <div className="flex gap-3">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search enrollments..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                    <Plus className="w-4 h-4" />
                    New Enrollment
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mt-4 overflow-x-auto">
                {['All', 'In Progress', 'Completed', 'Dropped'].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrolled Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {enrollment.studentName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{enrollment.studentName}</p>
                            <p className="text-sm text-gray-500">{enrollment.studentId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-800">{enrollment.course}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-800">{enrollment.enrollDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div 
                              className={`h-2 rounded-full ${enrollment.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{enrollment.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          enrollment.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {enrollment.certificateId ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-medium">{enrollment.certificateId}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Not issued</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-blue-600" />
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

{activeTab === 'certificates' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:items-between gap-4">
                <h2 className="text-xl font-bold text-gray-800">Certificate Management</h2>
                <div className="flex gap-3">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search certificates..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                    <Download className="w-4 h-4" />
                    Export All
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-800">{cert.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{cert.studentName}</p>
                          <p className="text-sm text-gray-500">{cert.studentId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-800">{cert.courseName}</p>
                        <p className="text-xs text-gray-500">Course ID: {cert.courseId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-800">{cert.issueDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-800">{cert.downloadCount} times</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Mail className="w-4 h-4 text-green-600" />
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

        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-bold text-gray-800">Quizzes</h2>
                  <div className="flex gap-3">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search quizzes..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                      <Plus className="w-4 h-4" />
                      Create Quiz
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {['All', 'Active', 'Draft'].map((filter) => (
                    <button
                      key={filter}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quiz Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quizzes.map((quiz) => (
                      <tr key={quiz.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{quiz.title}</p>
                              <p className="text-sm text-gray-500">ID: #{quiz.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800">{quiz.courseName}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-800">{quiz.questions}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-800">{quiz.totalMarks}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-800">{quiz.duration}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-800">{quiz.created}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            quiz.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {quiz.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-bold text-gray-800">Quiz Scores & AI Feedback</h2>
                  <div className="flex gap-3">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search scores..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quiz</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI Feedback</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quizScores.map((score) => (
                      <tr key={score.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {score.studentName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{score.studentName}</p>
                              <p className="text-sm text-gray-500">{score.studentId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800">{score.quizTitle}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-800">{score.score}/{score.totalMarks}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                              <div 
                                className={`h-2 rounded-full ${
                                  score.percentage >= 90 ? 'bg-green-500' : 
                                  score.percentage >= 70 ? 'bg-blue-500' : 
                                  score.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${score.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{score.percentage.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-800">{score.submittedDate}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600 max-w-xs truncate">{score.feedback}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-blue-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">General Settings</h2>
                <p className="text-sm text-gray-600 mt-1">Configure basic platform settings</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                    <input type="text" defaultValue="Erudite" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                    <input type="email" defaultValue="support@erudite.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option>UTC</option>
                      <option>EST (UTC-5)</option>
                      <option>PST (UTC-8)</option>
                      <option>GMT</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform Description</label>
                  <textarea
                    rows="3"
                    defaultValue="An AI-powered learning management system for modern education"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Maintenance Mode</p>
                    <p className="text-sm text-gray-600">Temporarily disable platform access</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">AI Configuration</h2>
                <p className="text-sm text-gray-600 mt-1">Configure AI-powered features</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: 'AI-Powered Feedback', desc: 'Automatically generate quiz feedback', bg: 'from-blue-50 to-purple-50' },
                  { title: 'Performance Reports', desc: 'Generate AI insights for student progress', bg: 'from-green-50 to-blue-50' },
                  { title: 'Content Recommendations', desc: 'AI-based course suggestions', bg: 'from-purple-50 to-pink-50' }
                ].map((feature, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 bg-gradient-to-r ${feature.bg} rounded-lg`}>
                    <div>
                      <p className="font-medium text-gray-800">{feature.title}</p>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Email & Notifications</h2>
                <p className="text-sm text-gray-600 mt-1">Configure notification preferences</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: 'Course Enrollment Notifications', desc: 'Notify instructors of new enrollments' },
                  { title: 'Quiz Completion Emails', desc: 'Send results to students via email' },
                  { title: 'Certificate Notifications', desc: 'Alert students when certificates are ready' },
                  { title: 'Discussion Replies', desc: 'Notify users of discussion responses' }
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{notif.title}</p>
                      <p className="text-sm text-gray-600">{notif.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Security Settings</h2>
                <p className="text-sm text-gray-600 mt-1">Manage platform security options</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Minimum Length</label>
                    <input type="number" defaultValue="8" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input type="number" defaultValue="30" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Payment & Billing</h2>
                <p className="text-sm text-gray-600 mt-1">Configure payment settings</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>BDT - Bangladeshi Taka</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Gateway</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option>Stripe</option>
                      <option>PayPal</option>
                      <option>Square</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Automatic Invoicing</p>
                    <p className="text-sm text-gray-600">Generate invoices automatically on purchase</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}