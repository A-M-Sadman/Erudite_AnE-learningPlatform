import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, FileText, GraduationCap, 
  BarChart3, Settings, Search, Plus, Edit, Trash2, 
  Eye, Download, TrendingUp, Award,
  UserCheck, MessageSquare, User, ChevronDown,
  Save, X as CloseIcon, Video, Presentation, FileCheck,
  MessageCircle, LogOut, Menu, X, Bell, Star
} from 'lucide-react';
import { 
  userAPI, 
  courseAPI, 
  enrollmentAPI, 
  contentAPI, 
  quizAPI, 
  discussionAPI,
  // techSupportAPI,
  evaluationAPI,
  commentAPI
} from '../services/api';

export default function AdminDashboard({ onLogout }) {
  // State variables - ALL inside the component
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // CRUD State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTable, setCurrentTable] = useState('');

  // Data states
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [content, setContent] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [ratings, setRatings] = useState([]);
  
  const [comments, setComments] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [replyText, setReplyText] = useState('');

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [viewType, setViewType] = useState('');

  // Fetch data function - INSIDE the component
  const fetchData = async (table, id = null) => {
    console.log(`=== FETCHING ${table.toUpperCase()} ===`);
    try {
      let response;
      switch(table) {
        case 'users':
          response = await userAPI.getAll();
          console.log('First user object:', response[0]);
          console.log('User keys:', response[0] ? Object.keys(response[0]) : 'No user');
          console.log('User has Contact_no?', response[0]?.Contact_no);
          setUsers(Array.isArray(response) ? response : []);
          break;

        case 'courses':
          response = await courseAPI.getAll();
          console.log('First course object:', response[0]);
          console.log('Course has I_USER_ID?', response[0]?.I_USER_ID);
          setCourses(Array.isArray(response) ? response : []);
          break;
        case 'enrollments':
          response = await enrollmentAPI.getAll();
          console.log('Enrollments raw response:', response);
          setEnrollments(Array.isArray(response) ? response : []);
          break;
        case 'content':
          response = await contentAPI.getAll();
          console.log('Content raw response:', response);
          setContent(Array.isArray(response) ? response : []);
          break;
        case 'quizzes':
          response = await quizAPI.getAll();
          console.log('Quizzes raw response:', response);
          setQuizzes(Array.isArray(response) ? response : []);
          break;
        case 'discussions':
          response = await discussionAPI.getAll();
          console.log('Discussions raw response:', response);
          setDiscussions(Array.isArray(response) ? response : []);
          break;
        case 'comments':
          response = await commentAPI.getAll(id);  // 'id' should be passed as parameter
          setComments(Array.isArray(response) ? response : []);
          break;
        case 'certificates':
          response = await evaluationAPI.getAllCertificates();
          console.log('Certificates raw response:', response);
          setCertificates(Array.isArray(response) ? response : []);
          break;
        case 'ratings':
          response = await evaluationAPI.getAllRatings();
          console.log('Ratings raw response:', response);
          setRatings(Array.isArray(response) ? response : []);
          break;
        default:
          console.warn(`Unknown table: ${table}`);
      }
    } catch (error) {
      console.error(`❌ Error fetching ${table}:`, error);
      console.error('Error response:', error.response?.data);
      console.error('Error message:', error.message);
      // Set empty arrays on error
      switch(table) {
        case 'users': setUsers([]); break;
        case 'courses': setCourses([]); break;
        case 'enrollments': setEnrollments([]); break;
        case 'content': setContent([]); break;
        case 'quizzes': setQuizzes([]); break;
        case 'discussions': setDiscussions([]); break;
        case 'certificates': setCertificates([]); break;
        case 'ratings': setRatings([]); break;
      }
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData('users');
    fetchData('courses');
    fetchData('enrollments');
    fetchData('content');
    fetchData('quizzes');
    fetchData('discussions');
    fetchData('certificates');  
    fetchData('ratings');       
  }, []);

  // Update your handleCreate function to use fetchData
  const handleCreate = async (table, data) => {
    try {
      switch(table) {
        case 'users':
          await userAPI.create(data);
          break;
        case 'courses':
          await courseAPI.create(data);
          break;
        case 'enrollments':
          await enrollmentAPI.create(data);
          break;
        case 'content':
          await contentAPI.create(data);
          break;
        case 'quizzes':
          await quizAPI.create(data);
          break;
        case 'discussions':
          await discussionAPI.create(data);
          break;
        case 'certificates':
          await evaluationAPI.createCertificate(data);
          break;
        case 'ratings':
          await evaluationAPI.createEvaluation(data);
          break;
        default:
          break;
      }
      
      // Refresh data after creation
      await fetchData(table);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Create error:', error);
      alert('Error creating record');
    }
  };

  // Make sure handleEdit and handleDelete functions are properly defined
  const handleEdit = async (table, data) => {
    try {
      switch(table) {
        case 'users':
          await userAPI.update(data.User_ID, data);
          break;
        case 'courses':
          await courseAPI.update(data.Course_Code, data);
          break;
        case 'enrollments':
          await enrollmentAPI.update(data.Enrollment_ID, data); 
          break;
        case 'content':
          await contentAPI.update(data.ContentID, data);
          break;
        case 'quizzes':
          await quizAPI.update(data.Quiz_No, data);
          break;
        case 'discussions':
          await discussionAPI.update(data.DISCUSSION_ID, data);
          break;
        case 'certificates':
          await evaluationAPI.updateCertificate(data.Certificate_ID, data);
          break;
        case 'ratings':
          await evaluationAPI.updateEvaluation(data.S_User_ID, data);
          break;
        default:
          break;
      }
      
      await fetchData(table);
      setShowEditModal(false);
    } catch (error) {
      console.error('Edit error:', error);
      alert('Error updating record');
    }
  };

const handleDelete = async (table, item) => {
  if (!window.confirm('Are you sure you want to delete this record?')) return;

  try {
    switch (table) {
      case 'users':
        await userAPI.delete(item.User_ID);
        break;

      case 'courses':
        await courseAPI.delete(item.Course_Code);
        break;

      case 'enrollments':
        await enrollmentAPI.delete(
          item.S_User_ID,
          item.Course_Code
        );
        break;

      case 'content':
        await contentAPI.delete(item.Content_ID);
        break;

      case 'quizzes':
        await quizAPI.delete(item.Quiz_ID);
        break;

      case 'discussions':
        await discussionAPI.delete(item.Discussion_ID);
        break;

      case 'certificates':
        await evaluationAPI.deleteCertificate(item.Certificate_ID);
        break;

      case 'ratings':
        await evaluationAPI.deleteEvaluation(item.Rating_ID);
        break;

      default:
        return;
    }

    await fetchData(table);
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting record');
  }
};


  // Search and Filter
  const filteredData = (data, searchFields) => {
    if (!searchTerm) return data;
    return data.filter(item =>
      searchFields.some(field =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // view functions:
  const handleView = (table, record) => {
    setViewType(table);
    setViewData(record);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setViewData(null);
    setViewType('');
  };

  // Add these after your other handlers (around line 185, before CreateEditModal):

  // Handle reply button click
  const handleReplyClick = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowReplyModal(true);
    setReplyText('');
    
    console.log('🔍 Loading comments for discussion:', discussion.DISCUSSION_ID);
    
    // Load comments for this discussion
    fetchComments(discussion.DISCUSSION_ID);
  };

  // Handle posting a reply
  const handlePostReply = async () => {
    if (!replyText.trim() || !selectedDiscussion) return;
    
    try {
      const replyData = {
        DISCUSSION_ID: selectedDiscussion.DISCUSSION_ID,
        User_ID: selectedDiscussion.User_ID,  // Use discussion author's ID
        Comment: replyText
      };
      
      await commentAPI.create(replyData);
      
      // Refresh comments
      await fetchComments(selectedDiscussion.DISCUSSION_ID);
      
      // Close modal and reset
      setShowReplyModal(false);
      setReplyText('');
      setSelectedDiscussion(null);
      
      alert('Reply posted successfully!');
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('Error posting reply');
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentAPI.delete(commentId);
        
        // Refresh comments
        if (selectedDiscussion) {
          await fetchComments(selectedDiscussion.DISCUSSION_ID);
        }
        
        alert('Comment deleted successfully!');
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Error deleting comment');
      }
    }
  };

  // Separate function to fetch comments
  const fetchComments = async (discussionId) => {
    try {
      console.log('📞 Fetching comments API for discussionId:', discussionId);
      const response = await commentAPI.getAll(discussionId);
      console.log('📥 Comments API response:', response);
      setComments(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('❌ Error fetching comments:', error);
      setComments([]);
    }
  };

  // Modal Components
  const CreateEditModal = ({ isEdit, table, record, onSave, onClose }) => {
    const [formData, setFormData] = useState(
      record || {
        First_Name: "",
        Last_Name: "",
        Email: "",
        Password: "",
        Contact_no: "",
        Role_Type: "", // DEFAULT VALUE
      }
    );  

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(table, formData);
    };

    const renderFormFields = () => {
      switch(table) {
        case 'users':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" value={formData.First_Name || ''} onChange={e => setFormData({...formData, First_Name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" value={formData.Last_Name || ''} onChange={e => setFormData({...formData, Last_Name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" value={formData.Email || ''} onChange={e => setFormData({...formData, Email: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" value={formData.Password || ''} onChange={e => setFormData({...formData, Password: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact No</label>
                <input type="text" value={formData.Contact_no || ''} onChange={e => setFormData({...formData, Contact_no: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select value={formData.Role_Type || ''} onChange={e => setFormData({...formData, Role_Type: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          );
        case 'courses':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Code</label>
                <input type="text" value={formData.Course_Code || ''} onChange={e => setFormData({...formData, Course_Code: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input type="text" value={formData.Course_Title || ''} onChange={e => setFormData({...formData, Course_Title: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={formData.Description || ''} onChange={e => setFormData({...formData, Description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" value={formData.Category || ''} onChange={e => setFormData({...formData, Category: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <select value={formData.I_USER_ID || ''} onChange={e => setFormData({...formData, I_USER_ID: e.target.value ? parseInt(e.target.value) : null})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required>
                  <option value="">Select Instructor</option>
                  {users
                  .filter(user => user.Role_Type === "Instructor")
                  .map(user => (
                    <option key={user.User_ID} value={user.User_ID}>
                      {user.First_Name} {user.Last_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                <select value={formData.Difficulty_Level || ''} onChange={e => setFormData({...formData, Difficulty_Level: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required>
                  <option value="">Select Difficulty</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          );
        case 'enrollments':
          return (
            <div className="space-y-4">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Enrollment_ID</label>
                <input type="number" value={formData.Enrollment_ID || 0} onChange={e => setFormData({...formData, Enrollment_ID: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Student ID</label>
                <select value={formData.S_User_ID || ''} onChange={e => setFormData({...formData, S_User_ID: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Student</option>
                  {users
                  .filter(user => user.Role_Type === "Student")
                  .map(user => (
                    <option key={user.User_ID} value={user.User_ID}>
                      {user.First_Name} {user.Last_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Code</label>
                <select value={formData.Course_Code || ''} onChange={e => setFormData({...formData, Course_Code: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Course Code</option>
                  {courses.map(course => (
                    <option key={course.Course_Code} value={course.Course_Code}>{course.Course_Code}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
                <input type="date" value={formData.enrollment_Date ? formData.enrollment_Date.split('T')[0] : ''} onChange={e => setFormData({...formData, enrollment_Date: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lessons Completed</label>
                <input type="number" value={formData.Lessons_Completed || 0} onChange={e => setFormData({...formData, Lessons_Completed: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Lessons</label>
                <input type="number" value={formData.Total_Lessons || 0} onChange={e => setFormData({...formData, Total_Lessons: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select value={formData.Status || ''} onChange={e => setFormData({...formData, Status: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Status</option>
                  <option value="Beginner">Completed</option>
                  <option value="Intermediate">In Progress</option>
                  <option value="Advanced">Dropped</option>
                </select>
              </div>
            </div>
          );
        case 'content':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" value={formData.Title || ''} onChange={e => setFormData({...formData, Title: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={formData.Description || ''} onChange={e => setFormData({...formData, Description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <select value={formData.Course_Code || ''} onChange={e => setFormData({...formData, Course_Code: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.Course_Code} value={course.Course_Code}>{course.Course_Title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content Type</label>
                <select value={formData.Content_Type || ''} onChange={e => setFormData({...formData, Content_Type: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="Video">Video</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Presentation">Presentation</option>
                  <option value="Assignment">Assignment</option>
                </select>
              </div>
            </div>
          );
        case 'quizzes':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Quiz No</label>
                <input type="number" value={formData.Quiz_No || ''} onChange={e => setFormData({...formData, Quiz_No: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Set No</label>
                <input type="number" value={formData.Set_No || ''} onChange={e => setFormData({...formData, Set_No: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quiz Title</label>
                <input type="text" value={formData.Quiz_Title || ''} onChange={e => setFormData({...formData, Quiz_Title: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <select value={formData.Course_Code || ''} onChange={e => setFormData({...formData, Course_Code: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.Course_Code} value={course.Course_Code}>{course.Course_Title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Questions</label>
                <input type="number" value={formData.Total_Questions || 0} onChange={e => setFormData({...formData, Total_Questions: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                <input type="number" value={formData.Total_Marks || 0} onChange={e => setFormData({...formData, Total_Marks: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input type="text" value={formData.Duration || ''} onChange={e => setFormData({...formData, Duration: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g., 45 min" />
              </div>
            </div>
          );
        case 'discussions':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Post Content</label>
                <textarea value={formData.Post || ''} onChange={e => setFormData({...formData, Post: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" rows="4" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <select value={formData.Course_Code || ''} onChange={e => setFormData({...formData, Course_Code: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.Course_Code} value={course.Course_Code}>{course.Course_Title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User</label>
                <select value={formData.User_ID || ''} onChange={e => setFormData({...formData, User_ID: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.User_ID} value={user.User_ID}>{user.First_Name} {user.Last_Name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select value={formData.Status || ''} onChange={e => setFormData({...formData, Status: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="Active">Active</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          );
        // Add to CreateEditModal's renderFormFields function
        case 'certificates':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Student</label>
                <select value={formData.S_User_ID || ''} onChange={e => setFormData({...formData, S_User_ID: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Student</option>
                  {users
                  .filter(user => user.Role_Type === "Student")
                  .map(user => (
                    <option key={user.User_ID} value={user.User_ID}>
                      {user.First_Name} {user.Last_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <select value={formData.Course_Code || ''} onChange={e => setFormData({...formData, Course_Code: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.Course_Code} value={course.Course_Code}>{course.Course_Title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                <input type="date" value={formData.Issue_Date || ''} onChange={e => setFormData({...formData, Issue_Date: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
            </div>
          );

        case 'ratings':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Student</label>
                <select value={formData.S_User_ID || ''} onChange={e => setFormData({...formData, S_User_ID: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Student</option>
                  {users
                  .filter(user => user.Role_Type === "Student")
                  .map(user => (
                    <option key={user.User_ID} value={user.User_ID}>
                      {user.First_Name} {user.Last_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <select value={formData.I_USER_ID || ''} onChange={e => setFormData({...formData, I_USER_ID: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Instructor</option>
                  {users
                  .filter(user => user.Role_Type === "Instructor")
                  .map(user => (
                    <option key={user.User_ID} value={user.User_ID}>
                      {user.First_Name} {user.Last_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <select value={formData.Course_Code || ''} onChange={e => setFormData({...formData, Course_Code: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.Course_Code} value={course.Course_Code}>{course.Course_Title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Rating (1-5)</label>
                <select value={formData.Course_Rating || ''} onChange={e => setFormData({...formData, Course_Rating: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Student Grade (%)</label>
                <input type="number" min="0" max="100" step="0.1" value={formData.Student_Grade || ''} onChange={e => setFormData({...formData, Student_Grade: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor Review</label>
                <textarea value={formData.Instructor_Review || ''} onChange={e => setFormData({...formData, Instructor_Review: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" rows="3" />
              </div>
            </div>
          );  
        default:
          return <div>Form for {table}</div>;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{isEdit ? 'Edit' : 'Create'} {table}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {renderFormFields()}
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                <Save className="w-4 h-4 inline mr-2" />
                {isEdit ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Table Components
  const renderUsersTable = () => (
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => { setCurrentTable('users'); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData(users, ['First_Name', 'Last_Name', 'Email', 'Role_Type']).map((user) => (
              <tr key={user.User_ID} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">#{user.User_ID}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.First_Name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.First_Name} {user.Last_Name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.Email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.Role_Type === 'instructor' ? 'bg-purple-100 text-purple-700' : 
                    user.Role_Type === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.Role_Type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.Contact_no}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleView('users', user)}  // Change 'users' to appropriate type
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => { setSelectedRecord(user); setCurrentTable('users'); setShowEditModal(true); }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleDelete('users', user.User_ID)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
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

  const renderCoursesTable = () => (
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => { setCurrentTable('courses'); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData(courses, ['Course_Title', 'Category', 'Difficulty_Level']).map((course) => (
              <tr key={course.Course_Code} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{course.Course_Code}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{course.Course_Title}</p>
                      <p className="text-sm text-gray-500">{course.Description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {course.Category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{course.Difficulty_Level}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{course.I_USER_ID}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleView('courses', course)}  
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => { setSelectedRecord(course); setCurrentTable('courses'); setShowEditModal(true); }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleDelete('courses', course.Course_Code)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
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

  const renderEnrollmentsTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Enrollment Management</h2>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search enrollments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => { setCurrentTable('enrollments'); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Enrollment
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollment ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollment Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData(enrollments, ['Course_Code', 'Status']).map((enrollment) => {
              const student = users.find(u => u.User_ID === enrollment.S_User_ID);
              const course = courses.find(c => c.Course_Code === enrollment.Course_Code);
              const progress = ((enrollment.Lessons_Completed / enrollment.Total_Lessons) * 100).toFixed(1);
              
              return (
                <tr key={enrollment.Enrollment_ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">#{enrollment.Enrollment_ID}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student?.First_Name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{student?.First_Name} {student?.Last_Name}</p>
                        <p className="text-sm text-gray-500">ID: {enrollment.S_User_ID}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{course?.Course_Title}</p>
                    <p className="text-sm text-gray-500">{enrollment.Course_Code}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{enrollment.enrollment_Date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${
                            progress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{progress}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{enrollment.Lessons_Completed}/{enrollment.Total_Lessons} lessons</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      enrollment.Status === 'Completed' ? 'bg-green-100 text-green-700' :
                      enrollment.Status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {enrollment.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView('enrollments', enrollment)}  
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => { setSelectedRecord(enrollment); setCurrentTable('enrollments'); setShowEditModal(true); }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete('enrollments', enrollment)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
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

  const renderContentTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Content Management</h2>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => { setCurrentTable('content'); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Content
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData(content, ['Title', 'Content_Type', 'Course_Code']).map((item) => {
              const course = courses.find(c => c.Course_Code === item.Course_Code);
              const getTypeIcon = (type) => {
                switch(type) {
                  case 'Video': return <Video className="w-4 h-4 text-red-500" />;
                  case 'Documentation': return <FileText className="w-4 h-4 text-blue-500" />;
                  case 'Presentation': return <Presentation className="w-4 h-4 text-purple-500" />;
                  case 'Assignment': return <FileCheck className="w-4 h-4 text-green-500" />;
                  default: return <FileText className="w-4 h-4 text-gray-500" />;
                }
              };

              return (
                <tr key={item.ContentID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">#{item.ContentID}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        item.Content_Type === 'Video' ? 'bg-red-100' :
                        item.Content_Type === 'Documentation' ? 'bg-blue-100' :
                        item.Content_Type === 'Presentation' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        {getTypeIcon(item.Content_Type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.Title}</p>
                        <p className="text-sm text-gray-500">{item.Description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">{course?.Course_Title}</p>
                    <p className="text-xs text-gray-500">{item.Course_Code}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.Content_Type === 'Video' ? 'bg-red-100 text-red-700' :
                      item.Content_Type === 'Documentation' ? 'bg-blue-100 text-blue-700' :
                      item.Content_Type === 'Presentation' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.Content_Type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{item.UploadDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.Status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView('content', item)}  
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => { setSelectedRecord(item); setCurrentTable('content'); setShowEditModal(true); }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete('content', item.ContentID)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-green-600" />
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

  const renderQuizzesTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Quiz Management</h2>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => { setCurrentTable('quizzes'); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quiz No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData(quizzes, ['Quiz_Title', 'Course_Code', 'Status']).map((quiz) => {
              const course = courses.find(c => c.Course_Code === quiz.Course_Code);
              // const questionCount = quizQuestions.filter(q => q.Quiz_No === quiz.Quiz_No).length;
              const questionCount = quiz.Total_Questions || 0;
              
              return (
                <tr key={`${quiz.Quiz_No}-${quiz.Set_No}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">#{quiz.Quiz_No}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{quiz.Quiz_Title}</p>
                        <p className="text-sm text-gray-500">Set: {quiz.Set_No}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">{course?.Course_Title}</p>
                    <p className="text-xs text-gray-500">{quiz.Course_Code}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{questionCount}/{quiz.Total_Questions}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{quiz.Total_Marks}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{quiz.Duration}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      quiz.Status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {quiz.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView('quizzes', quiz)} 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => { setSelectedRecord(quiz); setCurrentTable('quizzes'); setShowEditModal(true); }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete('quizzes', quiz.Quiz_No)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Plus className="w-4 h-4 text-green-600" />
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

  const renderDiscussionsTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Discussion Management</h2>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => { setCurrentTable('discussions'); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Discussion
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discussion ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Post</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Post Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Replies</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData(discussions, ['Post', 'Course_Code', 'Status']).map((discussion) => {
              const course = courses.find(c => c.Course_Code === discussion.Course_Code);
              const author = users.find(u => u.User_ID === discussion.User_ID);
              // const replyCount = comments.filter(c => c.DISCUSSION_ID === discussion.DISCUSSION_ID).length;
              const replyCount = discussion.Reply_Count || 0;
              
              return (
                <tr key={discussion.DISCUSSION_ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">#{discussion.DISCUSSION_ID}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-2">{discussion.Post}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">{course?.Course_Title}</p>
                    <p className="text-xs text-gray-500">{discussion.Course_Code}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {author?.First_Name?.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-800">{author?.First_Name} {author?.Last_Name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{discussion.Post_Date}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{replyCount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      discussion.Status === 'Active' ? 'bg-blue-100 text-blue-700' :
                      discussion.Status === 'Resolved' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {discussion.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView('discussions', discussion)}  
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => { setSelectedRecord(discussion); setCurrentTable('discussions'); setShowEditModal(true); }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete('discussions', discussion.DISCUSSION_ID)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      <button 
                        onClick={() => handleReplyClick(discussion)}  // This should be defined now
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                        title="View/Add Comments"
                      >
                        <MessageSquare className="w-4 h-4 text-green-600" />
                        {discussion.Reply_Count > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {discussion.Reply_Count}
                          </span>
                        )}
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

  const renderCertificatesTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Certificate Management</h2>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => { setCurrentTable('certificates'); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Issue Certificate
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cert ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData(certificates, ['Student_Name', 'Course_Title', 'Course_Code']).map((cert) => (
              <tr key={cert.Certificate_ID} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">#{cert.Certificate_ID}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {cert.Student_Name?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{cert.Student_Name}</p>
                      <p className="text-sm text-gray-500">ID: {cert.S_User_ID}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">{cert.Course_Title}</p>
                  <p className="text-sm text-gray-500">{cert.Course_Code}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{cert.Issue_Date}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Issued
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-green-600" />
                    </button>
                    <button 
                      onClick={() => handleDelete('certificates', cert.Certificate_ID)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
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

  const renderRatingsTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Course Ratings & Reviews</h2>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search ratings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => { setCurrentTable('ratings'); setShowCreateModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Rating
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Review</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData(ratings, ['Student_Name', 'Instructor_Name', 'Course_Title', 'Instructor_Review']).map((evaluationItem) => (
              <tr key={`${evaluationItem.S_User_ID}-${evaluationItem.Course_Code}`} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {evaluationItem.Student_Name?.charAt(0) || 'S'}
                    </div>
                    <span className="text-sm text-gray-800">{evaluationItem.Student_Name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {evaluationItem.Instructor_Name?.charAt(0) || 'I'}
                    </div>
                    <span className="text-sm text-gray-800">{evaluationItem.Instructor_Name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800">{evaluationItem.Course_Title}</p>
                  <p className="text-xs text-gray-500">{evaluationItem.Course_Code}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < evaluationItem.Course_Rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                    <span className="ml-1 text-sm font-medium text-gray-700">{evaluationItem.Course_Rating}/5</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    parseFloat(evaluationItem.Student_Grade) >= 90 ? 'bg-green-100 text-green-700' :
                    parseFloat(evaluationItem.Student_Grade) >= 80 ? 'bg-blue-100 text-blue-700' :
                    parseFloat(evaluationItem.Student_Grade) >= 70 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {evaluationItem.Student_Grade}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">{evaluationItem.Instructor_Review || 'No review'}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleDelete('ratings', evaluationItem.S_User_ID)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
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

  const renderEvaluations = () => (
    <div className="space-y-6">
      {renderCertificatesTable()}
      {renderRatingsTable()}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Existing stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Certificates Issued</p>
              <h3 className="text-2xl font-bold text-gray-800">{certificates.length}</h3>
            </div>
            <div className="bg-indigo-500 p-3 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Course Rating</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {ratings.length > 0 
                  ? (ratings.reduce((sum, r) => sum + (parseFloat(r.Course_Rating) || 0), 0) / ratings.length).toFixed(1)
                  : '0.0'
                }/5
              </h3>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI-Powered Analytics</h2>
            <p className="text-gray-600 mt-1">Real-time insights and performance metrics</p>
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Course Completion Rate', value: '78%', change: '+5%', icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Avg. Quiz Score', value: '84%', change: '+2%', icon: Award, color: 'bg-blue-500' },
          { label: 'Student Engagement', value: '92%', change: '+8%', icon: Users, color: 'bg-purple-500' },
          { label: 'Instructor Activity', value: '86%', change: '+3%', icon: UserCheck, color: 'bg-orange-500' }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <h3 className="text-2xl font-bold text-gray-800">{metric.value}</h3>
                <p className="text-sm text-green-600 mt-1">{metric.change} from last period</p>
              </div>
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Course Performance Insights
          </h3>
          <div className="space-y-4">
            {[
              { course: 'Web Development Bootcamp', completion: 85, engagement: 92, recommendation: 'High performing course' },
              { course: 'Data Science with Python', completion: 78, engagement: 88, recommendation: 'Consider adding more practical exercises' },
              { course: 'Digital Marketing Mastery', completion: 65, engagement: 75, recommendation: 'Review content difficulty' }
            ].map((insight, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{insight.course}</h4>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">{insight.completion}% Completion</p>
                    <p className="text-xs text-gray-500">{insight.engagement}% Engagement</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">{insight.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Student Progress Analytics
          </h3>
          <div className="space-y-4">
            {[
              { category: 'At Risk Students', count: 8, trend: 'Decreasing', color: 'bg-red-100 text-red-700' },
              { category: 'On Track Students', count: 45, trend: 'Increasing', color: 'bg-green-100 text-green-700' },
              { category: 'Ahead of Schedule', count: 12, trend: 'Stable', color: 'bg-blue-100 text-blue-700' }
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{stat.category}</p>
                  <p className="text-sm text-gray-600">{stat.trend}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-800">{stat.count}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${stat.color}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Usage */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Platform Usage Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Daily Active Users', value: '342', change: '+12%' },
            { label: 'Weekly Course Completions', value: '28', change: '+8%' },
            { label: 'Monthly Quiz Attempts', value: '156', change: '+15%' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-sm text-green-600 font-medium">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          AI Recommendations
        </h3>
        <div className="space-y-3">
          {[
            'Consider adding more interactive content to "Digital Marketing Mastery" based on engagement metrics',
            'Students are struggling with JavaScript concepts - recommend additional practice materials',
            'High demand for Data Science courses detected - consider creating advanced modules',
            'Weekend engagement is 40% higher - optimize content scheduling'
          ].map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-100">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700 flex-1">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const renderSettings = () => (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Profile Settings
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4">
                A
              </div>
              <h3 className="text-xl font-bold text-gray-800">Admin User</h3>
              <p className="text-gray-600">Administrator</p>
              <p className="text-sm text-gray-500 mt-2">admin@erudite.com</p>
              <button className="mt-4 w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Change Photo
              </button>
            </div>

            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Quick Stats</h4>
              <div className="space-y-2">
                {[
                  { label: 'Member Since', value: 'Jan 2024' },
                  { label: 'Last Login', value: '2 hours ago' },
                  { label: 'Total Actions', value: '1,245' },
                  { label: 'System Usage', value: 'Daily' }
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{stat.label}</span>
                    <span className="font-semibold text-gray-800">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="User" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                defaultValue="admin@erudite.com" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
              <textarea 
                rows="3"
                defaultValue="Platform administrator responsible for managing the Erudite e-learning system."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 123-4567" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+6 (Bangladesh Time)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-green-600" />
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Email Notifications', desc: 'Receive important updates via email', enabled: true },
            { label: 'Push Notifications', desc: 'Get real-time alerts on your device', enabled: true },
            { label: 'SMS Alerts', desc: 'Critical alerts via text message', enabled: false },
            { label: 'Weekly Reports', desc: 'Receive weekly platform analytics', enabled: true }
          ].map((pref, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">{pref.label}</p>
                <p className="text-sm text-gray-600">{pref.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={pref.enabled} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-600" />
          System Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Default Language</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Bengali</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Items Per Page</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  // Rest of the component remains the same...
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'enrollments', label: 'Enrollments', icon: UserCheck },
    { id: 'quizzes', label: 'Quizzes', icon: FileText },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'evaluations', label: 'Evaluations', icon: Award }, 
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - Same as before */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Erudite</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
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
                    A
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

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

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'courses' && 'Course Management'}
            {activeTab === 'content' && 'Content Management'}
            {activeTab === 'enrollments' && 'Enrollment Management'}
            {activeTab === 'quizzes' && 'Quiz Management'}
            {activeTab === 'discussions' && 'Discussion Management'}
            {activeTab === 'evaluations' && "Evaluations & Certifications"}
            {activeTab === 'analytics' && 'Analytics & Reports'}
            {activeTab === 'settings' && 'System Settings'}
          </h1>
        </div>

        {activeTab === 'users' && renderUsersTable()}
        {activeTab === 'courses' && renderCoursesTable()}
        {activeTab === 'enrollments' && renderEnrollmentsTable()}
        {activeTab === 'content' && renderContentTable()}
        {activeTab === 'quizzes' && renderQuizzesTable()}
        {activeTab === 'discussions' && renderDiscussionsTable()}
        {activeTab === 'evaluations' && renderEvaluations()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Users</p>
                    <h3 className="text-2xl font-bold text-gray-800">{users.length}</h3>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Courses</p>
                    <h3 className="text-2xl font-bold text-gray-800">{courses.length}</h3>
                  </div>
                  <div className="bg-green-500 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Enrollments</p>
                    <h3 className="text-2xl font-bold text-gray-800">{enrollments.length}</h3>
                  </div>
                  <div className="bg-purple-500 p-3 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Active Content</p>
                    <h3 className="text-2xl font-bold text-gray-800">{content.length}</h3>
                  </div>
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {enrollments.slice(0, 3).map((enrollment) => {
                    const student = users.find(u => u.User_ID === enrollment.S_User_ID);
                    const course = courses.find(c => c.Course_Code === enrollment.Course_Code);
                    return (
                      <div key={enrollment.Enrollment_ID} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">{student?.First_Name} {student?.Last_Name}</span> enrolled in <span className="font-medium">{course?.Course_Title}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{enrollment.enrollment_Date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Quizzes</span>
                    <span className="font-semibold text-gray-800">{quizzes.filter(q => q.Status === 'Active').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Discussions</span>
                    <span className="font-semibold text-gray-800">{discussions.filter(d => d.Status === 'Active').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Published Content</span>
                    <span className="font-semibold text-gray-800">{content.filter(c => c.Status === 'Published').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed Enrollments</span>
                    <span className="font-semibold text-gray-800">{enrollments.filter(e => e.Status === 'Completed').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateEditModal
          isEdit={false}
          table={currentTable}
          onSave={handleCreate}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      
      {viewModalOpen && (
        <ViewModal 
          type={viewType} 
          data={viewData} 
          onClose={handleCloseViewModal} 
        />
      )}

      {showEditModal && selectedRecord && (
        <CreateEditModal
          isEdit={true}
          table={currentTable}
          record={selectedRecord}
          onSave={handleEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showReplyModal && selectedDiscussion && (
        <ReplyModal
          discussion={selectedDiscussion}
          comments={comments}
          onClose={() => {
            setShowReplyModal(false);
            setSelectedDiscussion(null);
            setReplyText('');
          }}
          onPostReply={handlePostReply}
          replyText={replyText}
          setReplyText={setReplyText}
          onDeleteComment={handleDeleteComment}
          users={users}  // Add this
        />
      )}
    </div>
  );
}

const ViewModal = ({ type, data, onClose }) => {
  const renderViewContent = () => {
    if (!data) return <div>No data to display</div>;
    
    switch(type) {
      case 'users':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {data.First_Name?.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{data.First_Name} {data.Last_Name}</h3>
                <p className="text-gray-600">User ID: #{data.User_ID}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{data.Email}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{data.Contact_no || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Role</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  data.Role_Type === 'instructor' ? 'bg-purple-100 text-purple-700' : 
                  data.Role_Type === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {data.Role_Type}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-medium">#{data.User_ID}</p>
              </div>
            </div>
          </div>
        );
      
      case 'courses':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{data.Course_Title}</h3>
                <p className="text-gray-600">{data.Course_Code}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-gray-800">{data.Description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium">{data.Category}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    data.Difficulty_Level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    data.Difficulty_Level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {data.Difficulty_Level}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Instructor ID</p>
                  <p className="font-medium">{data.I_USER_ID || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Admin ID</p>
                  <p className="font-medium">{data.A_USER_ID || 1}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'enrollments':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Enrollment Details</h3>
                <p className="text-gray-600">ID: #{data.Enrollment_ID}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                data.Status === 'Completed' ? 'bg-green-100 text-green-700' :
                data.Status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {data.Status || 'In Progress'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Student</p>
                <p className="font-medium">{data.First_Name} {data.Last_Name}</p>
                <p className="text-xs text-gray-500">ID: {data.S_User_ID}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-medium">{data.Course_Title}</p>
                <p className="text-xs text-gray-500">{data.Course_Code}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Enrollment Date</p>
                <p className="font-medium">{data.enrollment_Date}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Progress</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${((data.Lessons_Completed || 0) / (data.Total_Lessons || 10)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {((data.Lessons_Completed || 0) / (data.Total_Lessons || 10) * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {data.Lessons_Completed || 0}/{data.Total_Lessons || 10} lessons
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'content':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-lg ${
                data.Content_Type === 'Video' ? 'bg-red-100' :
                data.Content_Type === 'Documentation' ? 'bg-blue-100' :
                data.Content_Type === 'Presentation' ? 'bg-purple-100' : 'bg-green-100'
              }`}>
                {data.Content_Type === 'Video' ? <Video className="w-8 h-8 text-red-600" /> :
                 data.Content_Type === 'Documentation' ? <FileText className="w-8 h-8 text-blue-600" /> :
                 data.Content_Type === 'Presentation' ? <Presentation className="w-8 h-8 text-purple-600" /> :
                 <FileCheck className="w-8 h-8 text-green-600" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{data.Title}</h3>
                <p className="text-gray-600">Content ID: #{data.ContentID}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-gray-800">{data.Description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-medium">{data.Course_Title || data.Course_Code}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Type</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    data.Content_Type === 'Video' ? 'bg-red-100 text-red-700' :
                    data.Content_Type === 'Documentation' ? 'bg-blue-100 text-blue-700' :
                    data.Content_Type === 'Presentation' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {data.Content_Type}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Upload Date</p>
                  <p className="font-medium">{data.UploadDate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    data.Status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {data.Status || 'Published'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Content Format</p>
                <div className="flex gap-3">
                  <span className={`px-2 py-1 rounded text-xs ${data.Video ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                    Video: {data.Video ? 'Yes' : 'No'}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${data.Documentation ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    Docs: {data.Documentation ? 'Yes' : 'No'}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${data.Presentation ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                    Slides: {data.Presentation ? 'Yes' : 'No'}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${data.Assignment ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    Assignment: {data.Assignment ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'quizzes':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{data.Quiz_Title}</h3>
                <p className="text-gray-600">Quiz #{data.Quiz_No} • Set {data.Set_No || 1}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-medium">{data.Course_Title || data.Course_Code}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Status</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  data.Status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {data.Status || 'Active'}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Total Questions</p>
                <p className="font-medium">{data.Total_Questions || 5}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Total Marks</p>
                <p className="font-medium">{data.Total_Marks || 50}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{data.Duration || '45 min'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Quiz ID</p>
                <p className="font-medium">#{data.Quiz_No}</p>
              </div>
            </div>
          </div>
        );
      
      case 'discussions':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Discussion #{data.DISCUSSION_ID}</h3>
                <p className="text-gray-600">Posted: {data.Post_Date}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Post Content</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800">{data.Post}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Author</p>
                  <p className="font-medium">{data.First_Name} {data.Last_Name}</p>
                  <p className="text-xs text-gray-500">User ID: {data.User_ID}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-medium">{data.Course_Title || data.Course_Code}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    data.Status === 'Active' ? 'bg-blue-100 text-blue-700' :
                    data.Status === 'Resolved' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {data.Status || 'Active'}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Replies</p>
                  <p className="font-medium">{data.Reply_Count || 0}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4">
            <pre className="text-sm bg-gray-50 p-3 rounded overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {type.charAt(0).toUpperCase() + type.slice(1)} Details
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {renderViewContent()}
        
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this modal component after your other modals in AdminDashboard.js
// Update ReplyModal to accept users as prop:
const ReplyModal = ({ 
  discussion, 
  comments, 
  onClose, 
  onPostReply, 
  replyText, 
  setReplyText, 
  onDeleteComment,
  users  // Add this
}) => {
  const [newReply, setNewReply] = useState(replyText);
  const author = users?.find(u => u.User_ID === discussion.User_ID);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostReply();  // Changed from onPostReply(newReply)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Discussion Replies</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Original Discussion */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {author?.First_Name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{author?.First_Name} {author?.Last_Name}</p>
              <p className="text-sm text-gray-500">{discussion.Post_Date}</p>
            </div>
          </div>
          <p className="text-gray-700">{discussion.Post}</p>
        </div>

        {/* Replies Section */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">
            Replies ({comments.length})
          </h4>
          
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No replies yet. Be the first to reply!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => {
                const commentAuthor = users?.find(u => u.User_ID === comment.User_ID);
                return (
                  <div key={comment.COMMENT_ID} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {commentAuthor?.First_Name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {commentAuthor?.First_Name} {commentAuthor?.Last_Name}
                          </p>
                          <p className="text-xs text-gray-500">{comment.Comment_Date}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => onDeleteComment(comment.COMMENT_ID)}
                        className="p-1 hover:bg-red-50 rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-700">{comment.Comment}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Reply Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add your reply
            </label>
            <textarea
              value={newReply}
              onChange={(e) => {
                setNewReply(e.target.value);
                setReplyText(e.target.value);  // Update parent state too
              }}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Type your reply here..."
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              disabled={!newReply.trim()}
            >
              Post Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};