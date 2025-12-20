import React, { useState, useEffect, useCallback } from 'react';
import {
  Home, BookOpen, FileText, Award, MessageSquare, User, Bell,
  Search, ChevronDown, LogOut, Play, Clock, CheckCircle,
  TrendingUp, Target, Calendar, Download, Upload, Eye,
  BarChart3, Settings, Menu, X, Star, AlertCircle, Book,
  Video, FileCheck, ArrowRight, Filter, Grid, List, Send,
  GraduationCap, Plus, Edit, Trash2, ChevronRight, Loader,
  MessageCircle, ThumbsUp, MoreVertical, Lock
} from 'lucide-react';
import {
  courseAPI, enrollmentAPI, contentAPI, quizAPI,
  discussionAPI, commentAPI, evaluationAPI
} from '../services/api';
import authService from '../services/authService';
import discussionService from '../services/discussionService';

export default function StudentDashboard({ onLogout, studentId }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseContents, setShowCourseContents] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Data states
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [contents, setContents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [comments, setComments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  
  // Form states
  const [newDiscussion, setNewDiscussion] = useState({ Post: '', Course_Code: '' });
  const [newComment, setNewComment] = useState({ Comment: '', DISCUSSION_ID: null });
  const [replyComment, setReplyComment] = useState({ Comment: '', Parent_ID: null });
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(null); // discussion ID or null
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  
  // User info (mock for now - you should get this from auth context)
  const currentStudent = {
    User_ID: studentId || 3,
    First_Name: 'Abdullah',
    Last_Name: 'Sadman',
    Email: 'student@erudite.com',
    Role_Type: 'Student'
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [studentId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch student's enrollments
      const enrollmentsData = await enrollmentAPI.getAll();
      setEnrollments(enrollmentsData.filter(e => e.S_User_ID === currentStudent.User_ID));

      // Fetch all courses to get details
      const coursesData = await courseAPI.getAll();
      setCourses(coursesData);

      // Fetch student's quizzes
      const quizzesData = await quizAPI.getAll();
      setQuizzes(quizzesData);

      // Fetch all discussions
      const discussionsData = await discussionAPI.getAll();
      setDiscussions(discussionsData);

      // Fetch certificates
      const certificatesData = await evaluationAPI.getAllCertificates();
      setCertificates(certificatesData.filter(c => c.S_User_ID === currentStudent.User_ID));

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseContents = async (courseCode) => {
    setLoading(true);
    try {
      const contentsData = await contentAPI.getAll();
      const courseContents = contentsData.filter(content => 
        content.Course_Code === courseCode
      );
      setContents(courseContents);
      setShowCourseContents(true);
    } catch (err) {
      console.error('Error fetching course contents:', err);
      setError('Failed to load course contents.');
    } finally {
      setLoading(false);
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

  // Handle creating new discussion
  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    if (!newDiscussion.Post.trim() || !newDiscussion.Course_Code) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const discussionData = {
        Post: newDiscussion.Post,
        Course_Code: newDiscussion.Course_Code,
        User_ID: currentStudent.User_ID,
        Post_Date: new Date().toISOString().split('T')[0]
      };

      await discussionAPI.create(discussionData);
      setNewDiscussion({ Post: '', Course_Code: '' });
      setShowDiscussionForm(false);
      await fetchDashboardData(); // Refresh discussions
    } catch (err) {
      console.error('Error creating discussion:', err);
      alert('Failed to create discussion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle creating new comment
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
        User_ID: currentStudent.User_ID,
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

  // Handle updating a discussion
  const handleUpdateDiscussion = async (discussionId, updatedPost) => {
    setLoading(true);
    try {
      await discussionAPI.update(discussionId, { Post: updatedPost });
      setEditingDiscussion(null);
      await fetchDashboardData(); // Refresh discussions
    } catch (err) {
      console.error('Error updating discussion:', err);
      alert('Failed to update discussion.');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a discussion
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

  // Handle deleting a comment
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

  // Handle continue learning button
  const handleContinueLearning = (course) => {
    setSelectedCourse(course);
    fetchCourseContents(course.Course_Code);
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('token');
    if (onLogout) {
      onLogout();
    }
  };

  // Calculate student stats
  const calculateStats = () => {
    const enrolledCourses = enrollments.length;
    const completedCourses = certificates.length;
    const totalLessons = enrollments.reduce((sum, enrollment) => 
      sum + (enrollment.Lessons_Completed || 0), 0
    );
    const learningHours = Math.floor(totalLessons * 0.5); // Assuming 0.5 hour per lesson

    return [
      { label: 'Enrolled Courses', value: enrolledCourses, icon: BookOpen, color: 'bg-blue-500', change: `${enrolledCourses} total` },
      { label: 'Completed', value: completedCourses, icon: CheckCircle, color: 'bg-green-500', change: `${Math.round((completedCourses / enrolledCourses) * 100) || 0}% completion` },
      { label: 'Certificates', value: completedCourses, icon: Award, color: 'bg-purple-500', change: `${completedCourses} earned` },
      { label: 'Learning Hours', value: learningHours, icon: Clock, color: 'bg-orange-500', change: 'Estimated from completed lessons' }
    ];
  };

  // Render functions
  const renderDashboard = () => (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          <AlertCircle className="w-5 h-5 inline mr-2" />
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculateStats().map((stat, index) => (
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

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            {enrollments.slice(0, 3).map((enrollment, index) => {
              const course = courses.find(c => c.Course_Code === enrollment.Course_Code);
              return (
                <div key={index} className="flex items-center justify-between p-4 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">{course?.Course_Title || enrollment.Course_Code}</h3>
                      <p className="text-sm text-gray-600">
                        Progress: {enrollment.Lessons_Completed || 0} lessons completed
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleContinueLearning(course || enrollment)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Continue
                  </button>
                </div>
              );
            })}
            {enrollments.length === 0 && (
              <p className="text-gray-500 text-center py-4">No enrolled courses yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );

  const renderMyCourses = () => (
    <div className="space-y-6">
      {showCourseContents && selectedCourse ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{selectedCourse.Course_Title || selectedCourse.Course_Code} - Contents</h2>
              <p className="text-gray-600">All learning materials for this course</p>
            </div>
            <button
              onClick={() => setShowCourseContents(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Upload Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map((content) => (
                    <tr key={content.ContentID} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{content.Title}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          content.Content_Type === 'Video' ? 'bg-blue-100 text-blue-700' :
                          content.Content_Type === 'Documentation' ? 'bg-green-100 text-green-700' :
                          content.Content_Type === 'Presentation' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {content.Content_Type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                        {content.Description || 'No description'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {content.UploadDate || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Published
                        </span>
                      </td>
                    </tr>
                  ))}
                  {contents.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        No content available for this course yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">My Enrolled Courses</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {enrollments.map((enrollment) => {
                const course = courses.find(c => c.Course_Code === enrollment.Course_Code);
                if (!course) return null;

                const progress = enrollment.Lessons_Completed || 0;
                const totalLessons = enrollment.Total_Lessons || 10;
                const progressPercent = Math.round((progress / totalLessons) * 100);

                return (
                  <div key={`${enrollment.S_User_ID}-${enrollment.Course_Code}`} 
                       className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                    <div className="text-5xl mb-4">
                      {course.Category?.includes('Development') ? '🌐' :
                       course.Category?.includes('Data') ? '📊' :
                       course.Category?.includes('Design') ? '🎨' : '📚'}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{course.Course_Title}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Category: {course.Category || 'General'} • {course.Difficulty_Level || 'Beginner'}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {progress} of {totalLessons} lessons completed
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleContinueLearning(course)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        <Play className="w-5 h-5" />
                        Continue Learning
                      </button>
                    </div>
                  </div>
                );
              })}
              
              {enrollments.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No courses enrolled yet</h3>
                  <p className="text-gray-500 mt-2">Browse courses to start learning!</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderQuizzes = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Quizzes</h2>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={`${quiz.Quiz_No}-${quiz.Set_No}`} className="flex items-center justify-between p-4 border-b last:border-0">
              <div>
                <h3 className="font-semibold text-gray-800">{quiz.Quiz_Title}</h3>
                <p className="text-sm text-gray-600">
                  Course: {quiz.Course_Code} • Marks: {quiz.Total_Marks || 'N/A'}
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Start Quiz
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No quizzes available</p>
        )}
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certificates.map((cert) => (
        <div key={cert.Certificate_ID} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-12 h-12 text-purple-600" />
            <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-purple-600">
              Certificate
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.Course_Title || cert.Course_Code}</h3>
          <p className="text-sm text-gray-600 mb-4">Issued: {cert.Issue_Date || 'N/A'}</p>
          <p className="text-xs text-gray-500 mb-4">Certificate ID: {cert.Certificate_ID}</p>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
        </div>
      ))}
      {certificates.length === 0 && (
        <div className="col-span-2 text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No certificates yet</h3>
          <p className="text-gray-500 mt-2">Complete courses to earn certificates!</p>
        </div>
      )}
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Course Discussions</h2>
          <button
            onClick={() => setShowDiscussionForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Discussion
          </button>
        </div>

        {showDiscussionForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Create New Discussion</h3>
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
                    Select Course
                  </label>
                  <select
                    value={newDiscussion.Course_Code}
                    onChange={(e) => setNewDiscussion({...newDiscussion, Course_Code: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map(course => (
                      <option key={course.Course_Code} value={course.Course_Code}>
                        {course.Course_Title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discussion Topic
                  </label>
                  <textarea
                    value={newDiscussion.Post}
                    onChange={(e) => setNewDiscussion({...newDiscussion, Post: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows="3"
                    placeholder="What would you like to discuss?"
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
                    {loading ? 'Posting...' : 'Post Discussion'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {loading && discussions.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : discussions.length > 0 ? (
          discussions.map((discussion) => {
            const isOwner = discussion.User_ID === currentStudent.User_ID;
            const discussionComments = comments[discussion.DISCUSSION_ID] || [];
            const showComments = showCommentForm === discussion.DISCUSSION_ID;

            return (
              <div key={discussion.DISCUSSION_ID} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {editingDiscussion === discussion.DISCUSSION_ID ? (
                        <div className="space-y-2">
                          <textarea
                            defaultValue={discussion.Post}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="2"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateDiscussion(discussion.DISCUSSION_ID, document.querySelector('textarea').value)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingDiscussion(null)}
                              className="px-3 py-1 border border-gray-300 rounded text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold text-gray-800 mb-1">{discussion.Post}</h3>
                          <p className="text-sm text-gray-600">
                            {discussion.First_Name} {discussion.Last_Name} • {discussion.Course_Code} • {discussion.Post_Date}
                          </p>
                        </>
                      )}
                    </div>
                    {isOwner && !editingDiscussion && (
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
                      <MessageCircle className="w-4 h-4" />
                      {showComments ? 'Hide Comments' : `View Comments (${discussionComments.length})`}
                    </button>
                  </div>

                  {showComments && (
                    <>
                      <div className="space-y-4 mb-6">
                        {discussionComments.map((comment) => {
                          const isCommentOwner = comment.User_ID === currentStudent.User_ID;
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
                              placeholder="Add a comment..."
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
          })
        ) : (
          <p className="text-gray-500 text-center py-4">No discussions yet. Start the first one!</p>
        )}
      </div>
    </div>
  );

  const renderProfile = () => {
    const studentEnrollments = enrollments.filter(e => e.S_User_ID === currentStudent.User_ID);
    const studentCertificates = certificates.filter(c => c.S_User_ID === currentStudent.User_ID);
    
    // Calculate quick stats
    const totalCourses = studentEnrollments.length;
    const completedCourses = studentCertificates.length;
    const inProgressCourses = totalCourses - completedCourses;
    const totalLearningHours = Math.floor(
      studentEnrollments.reduce((sum, e) => sum + (e.Lessons_Completed || 0), 0) * 0.5
    );
    const averageProgress = totalCourses > 0 
      ? Math.round(studentEnrollments.reduce((sum, e) => {
          const progress = e.Lessons_Completed || 0;
          const total = e.Total_Lessons || 1;
          return sum + (progress / total) * 100;
        }, 0) / totalCourses)
      : 0;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

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
                        defaultValue={currentStudent?.First_Name || ''} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        onChange={e => {
                          // You can add state for studentProfile if needed
                          console.log('First name changed:', e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue={currentStudent?.Last_Name || ''} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        onChange={e => {
                          console.log('Last name changed:', e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue={currentStudent?.Email || ''} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      onChange={e => {
                        console.log('Email changed:', e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                    <input 
                      type="text" 
                      value={currentStudent?.User_ID || ''} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 cursor-not-allowed" 
                      disabled
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                    <textarea 
                      rows="4" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      defaultValue="Passionate learner focused on developing new skills and knowledge."
                      onChange={e => {
                        console.log('Bio changed:', e.target.value);
                      }}
                      placeholder="Tell us about your learning goals and interests..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Learning Interests</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {['Web Development', 'Data Science', 'Machine Learning', 'UI/UX Design', 'Digital Marketing'].map((interest, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Add a new interest..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          console.log('New interest:', e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                  <button 
                    onClick={() => {
                      // Handle profile update
                      alert('Profile updated! (This would call your API in production)');
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lock size={20} />
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      // Handle password change
                      alert('Password changed! (This would call your API in production)');
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {currentStudent?.First_Name?.charAt(0) || 'S'}{currentStudent?.Last_Name?.charAt(0) || 'T'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{currentStudent?.First_Name} {currentStudent?.Last_Name}</h3>
                  <p className="text-gray-600">Student</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {currentStudent?.Email || 'student@erudite.com'}
                  </p>
                  <div className="mt-4 space-y-2">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Upload Photo
                    </button>
                    <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                      View Public Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold text-gray-800">
                      {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Courses</span>
                    <span className="font-semibold text-gray-800">
                      {totalCourses} {inProgressCourses > 0 && `(${inProgressCourses} in progress)`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Certificates</span>
                    <span className="font-semibold text-gray-800">{completedCourses} earned</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Learning Hours</span>
                    <span className="font-semibold text-gray-800">{totalLearningHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Progress</span>
                    <span className="font-semibold text-gray-800">{averageProgress}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-800 mb-4">Learning Goals</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complete 5 courses this semester</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Earn 3 new certificates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Learn machine learning fundamentals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Build 2 portfolio projects</span>
                  </div>
                  <div className="pt-2">
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Add a new goal..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          console.log('New goal:', e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: FileText },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

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
                <h1 className="font-bold text-gray-800">Erudite LMS</h1>
                <p className="text-xs text-gray-500">Student Portal</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setShowCourseContents(false);
                    setShowDiscussionForm(false);
                    setShowCommentForm(null);
                  }}
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
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {currentStudent.First_Name?.[0]}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">{currentStudent.First_Name} {currentStudent.Last_Name}</p>
                      <p className="text-sm text-gray-500">{currentStudent.Email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTab('profile');
                        setProfileDropdownOpen(false);
                      }}
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
                    onClick={() => { 
                      setActiveTab(item.id); 
                      setMobileMenuOpen(false);
                      setShowCourseContents(false);
                    }}
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
            {activeTab === 'courses' && (showCourseContents ? 'Course Contents' : 'My Courses')}
            {activeTab === 'quizzes' && 'Quizzes & Assessments'}
            {activeTab === 'certificates' && 'My Certificates'}
            {activeTab === 'discussions' && 'Discussions'}
            {activeTab === 'profile' && 'My Profile'}
          </h1>
          {activeTab === 'dashboard' && (
            <p className="text-gray-600 mt-1">Welcome back, {currentStudent.First_Name}!</p>
          )}
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