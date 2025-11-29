import React, { useState } from 'react';
import { 
  Home, BookOpen, FileText, Award, MessageSquare, User, Bell, 
  Search, ChevronDown, LogOut, Play, Clock, CheckCircle, 
  TrendingUp, Target, Calendar, Download, Upload, Eye,
  BarChart3, Settings, Menu, X, Star, AlertCircle, Book,
  Video, FileCheck, ArrowRight, Filter, Grid, List, Send,
  GraduationCap
} from 'lucide-react';

export default function StudentDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    }
  };

  // Mock data - keeping it brief for space
  const studentStats = [
    { label: 'Enrolled Courses', value: '5', icon: BookOpen, color: 'bg-blue-500', change: '+2 this month' },
    { label: 'Completed', value: '2', icon: CheckCircle, color: 'bg-green-500', change: '40% completion' },
    { label: 'Certificates', value: '2', icon: Award, color: 'bg-purple-500', change: '2 earned' },
    { label: 'Learning Hours', value: '48', icon: Clock, color: 'bg-orange-500', change: '12h this week' }
  ];

  const enrolledCourses = [
    { id: 1, title: 'Web Development Bootcamp', instructor: 'Sarah Wilson', progress: 65, totalLessons: 45, completedLessons: 29, thumbnail: '🌐', category: 'Development', rating: 4.8, nextLesson: 'JavaScript Advanced Concepts', duration: '12 weeks', enrolled: '2024-01-15' },
    { id: 2, title: 'Data Science with Python', instructor: 'Emily Brown', progress: 42, totalLessons: 38, completedLessons: 16, thumbnail: '📊', category: 'Data Science', rating: 4.9, nextLesson: 'Pandas DataFrames', duration: '10 weeks', enrolled: '2024-02-01' },
    { id: 3, title: 'Digital Marketing Mastery', instructor: 'Sarah Wilson', progress: 28, totalLessons: 32, completedLessons: 9, thumbnail: '📱', category: 'Marketing', rating: 4.6, nextLesson: 'SEO Fundamentals', duration: '8 weeks', enrolled: '2024-03-10' },
    { id: 4, title: 'Machine Learning Fundamentals', instructor: 'David Chen', progress: 100, totalLessons: 42, completedLessons: 42, thumbnail: '🤖', category: 'AI/ML', rating: 4.8, nextLesson: 'Completed', duration: '16 weeks', enrolled: '2023-11-01', completed: true, certificateId: 'CERT001' },
    { id: 5, title: 'UI/UX Design Principles', instructor: 'Lisa Anderson', progress: 100, totalLessons: 28, completedLessons: 28, thumbnail: '🎨', category: 'Design', rating: 4.7, nextLesson: 'Completed', duration: '6 weeks', enrolled: '2023-12-15', completed: true, certificateId: 'CERT002' }
  ];

  const courseLessons = [
    { id: 1, title: 'Introduction to Web Development', type: 'video', duration: '15:30', completed: true },
    { id: 2, title: 'HTML Basics', type: 'video', duration: '22:15', completed: true },
    { id: 3, title: 'CSS Fundamentals', type: 'video', duration: '28:45', completed: true },
    { id: 4, title: 'HTML & CSS Quiz', type: 'quiz', duration: '20 min', completed: true, score: 85 },
    { id: 5, title: 'JavaScript Introduction', type: 'video', duration: '25:00', completed: false, current: true },
    { id: 6, title: 'JavaScript Variables & Data Types', type: 'reading', duration: '10 min', completed: false },
    { id: 7, title: 'Functions and Scope', type: 'video', duration: '30:20', completed: false },
    { id: 8, title: 'JavaScript Assignment', type: 'assignment', duration: '2 days', completed: false }
  ];

  const upcomingQuizzes = [
    { id: 1, title: 'JavaScript Fundamentals Quiz', course: 'Web Development Bootcamp', dueDate: '2024-11-05', totalMarks: 100, duration: '45 min' },
    { id: 2, title: 'Python Basics Assessment', course: 'Data Science with Python', dueDate: '2024-11-08', totalMarks: 75, duration: '30 min' },
    { id: 3, title: 'SEO Strategy Test', course: 'Digital Marketing Mastery', dueDate: '2024-11-12', totalMarks: 100, duration: '60 min' }
  ];

  const completedQuizzes = [
    { id: 1, title: 'HTML & CSS Quiz', course: 'Web Development Bootcamp', score: 85, totalMarks: 100, submittedDate: '2024-10-15', feedback: 'Great work! Strong understanding of layout concepts.' },
    { id: 2, title: 'Introduction to Programming', course: 'Data Science with Python', score: 92, totalMarks: 100, submittedDate: '2024-10-20', feedback: 'Excellent performance! Keep up the good work.' }
  ];

  const certificates = [
    { id: 'CERT001', courseId: 4, courseName: 'Machine Learning Fundamentals', instructor: 'David Chen', issueDate: '2024-03-15', completionDate: '2024-03-10', grade: 'A', skills: ['Python', 'Machine Learning', 'Data Analysis', 'Model Training'] },
    { id: 'CERT002', courseId: 5, courseName: 'UI/UX Design Principles', instructor: 'Lisa Anderson', issueDate: '2024-02-20', completionDate: '2024-02-18', grade: 'A+', skills: ['UI Design', 'UX Research', 'Prototyping', 'User Testing'] }
  ];

  const discussions = [
    { id: 1, title: 'How to implement async/await in JavaScript?', course: 'Web Development Bootcamp', author: 'You', replies: 5, lastActivity: '2 hours ago', hasNewReplies: true },
    { id: 2, title: 'Best practices for data cleaning in Pandas', course: 'Data Science with Python', author: 'Mike Johnson', replies: 8, lastActivity: '1 day ago', hasNewReplies: false },
    { id: 3, title: 'Question about SEO keywords', course: 'Digital Marketing Mastery', author: 'You', replies: 3, lastActivity: '3 days ago', hasNewReplies: true }
  ];

  const recentActivity = [
    { action: 'Completed lesson', detail: 'CSS Fundamentals', course: 'Web Development Bootcamp', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
    { action: 'Scored 85%', detail: 'HTML & CSS Quiz', course: 'Web Development Bootcamp', time: '1 day ago', icon: Star, color: 'text-yellow-600' },
    { action: 'Started lesson', detail: 'JavaScript Introduction', course: 'Web Development Bootcamp', time: '2 days ago', icon: Play, color: 'text-blue-600' },
    { action: 'New certificate earned', detail: 'Machine Learning Fundamentals', course: 'AI/ML', time: '1 week ago', icon: Award, color: 'text-purple-600' }
  ];

  const learningStats = { totalHours: 48, thisWeek: 12, averageScore: 88, streak: 7, weeklyGoal: 15, weeklyProgress: 80 };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: FileText },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Render functions would be too long - creating simplified versions
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Continue Learning</h3>
        <p className="text-gray-600">Your enrolled courses and progress will appear here</p>
        <button onClick={() => setActiveTab('courses')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          View My Courses
        </button>
      </div>
    </div>
  );

  const renderMyCourses = () => (
    <div className="space-y-6">
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">{course.thumbnail}</div>
            <h3 className="font-bold text-gray-800 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
            <button 
              onClick={() => { setSelectedCourse(course); setActiveTab('course-player'); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <Play className="w-5 h-5" />
              {course.completed ? 'Review Course' : 'Continue Learning'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuizzes = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Quizzes</h2>
        {upcomingQuizzes.map((quiz) => (
          <div key={quiz.id} className="flex items-center justify-between p-4 border-b last:border-0">
            <div>
              <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
              <p className="text-sm text-gray-600">{quiz.course} • Due: {quiz.dueDate}</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Start Quiz</button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Completed Quizzes</h2>
        {completedQuizzes.map((quiz) => (
          <div key={quiz.id} className="flex items-center justify-between p-4 border-b last:border-0">
            <div>
              <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
              <p className="text-sm text-gray-600">Score: {quiz.score}/{quiz.totalMarks} ({((quiz.score/quiz.totalMarks)*100).toFixed(0)}%)</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${quiz.score >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {quiz.score >= 80 ? 'Passed' : 'Review'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certificates.map((cert) => (
        <div key={cert.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-12 h-12 text-purple-600" />
            <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-purple-600">Grade: {cert.grade}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.courseName}</h3>
          <p className="text-sm text-gray-600 mb-4">Instructor: {cert.instructor}</p>
          <p className="text-xs text-gray-500 mb-4">Issued: {cert.issueDate}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {cert.skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-white text-xs font-medium text-gray-700 rounded">{skill}</span>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
        </div>
      ))}
    </div>
  );

  const renderDiscussions = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Course Discussions</h2>
      {discussions.map((disc) => (
        <div key={disc.id} className="p-4 border-b last:border-0 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">{disc.title}</h3>
              <p className="text-sm text-gray-600">{disc.course} • {disc.author}</p>
              <p className="text-xs text-gray-500 mt-1">{disc.replies} replies • {disc.lastActivity}</p>
            </div>
            {disc.hasNewReplies && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">New</span>
            )}
          </div>
        </div>
      ))}
      <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
        <Send className="w-4 h-4" />
        Start New Discussion
      </button>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            JS
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">John Smith</h2>
            <p className="text-gray-600">student@erudite.com</p>
            <p className="text-sm text-gray-500 mt-2">Joined: January 2024</p>
            <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">5</p>
          <p className="text-sm text-gray-600">Courses Enrolled</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">2</p>
          <p className="text-sm text-gray-600">Certificates Earned</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">48h</p>
          <p className="text-sm text-gray-600">Learning Time</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Erudite</h1>
                <p className="text-xs text-gray-500">Student Portal</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative hidden sm:block">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    S
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">John Smith</p>
                      <p className="text-sm text-gray-500">student@erudite.com</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50"
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
                    onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'courses' && 'My Courses'}
            {activeTab === 'quizzes' && 'Quizzes & Assessments'}
            {activeTab === 'certificates' && 'My Certificates'}
            {activeTab === 'discussions' && 'Discussions'}
            {activeTab === 'profile' && 'My Profile'}
          </h1>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'courses' && renderMyCourses()}
        {activeTab === 'quizzes' && renderQuizzes()}
        {activeTab === 'certificates' && renderCertificates()}
        {activeTab === 'discussions' && renderDiscussions()}
        {activeTab === 'profile' && renderProfile()}
      </div>
    </div>
  );
}