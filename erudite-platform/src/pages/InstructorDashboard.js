import React, { useState, useEffect } from 'react';
import { 
  Home, GraduationCap, BookOpen, Users, FileText, BarChart3, 
  MessageSquare, Settings, Bell, Award, Clock, TrendingUp, 
  Plus, Search, Filter, Eye, Edit, Trash2, Menu, X, 
  LogOut, User, Lock, ChevronDown, Video, FileCheck, MessageCircle, Presentation
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import instructorAPI from '../services/instructorAPI';
import {contentAPI, commentAPI} from '../services/api';


// ==================== MODAL COMPONENTS ====================

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
            {isEdit ? 'Edit' : 'Create'} {type}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewModal = ({ type, data, onClose, courses }) => {
  const renderViewContent = () => {
    if (!data) return <div>No data to display</div>;
    
    switch(type) {
      case 'course':
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
                <p className="text-gray-800">{data.Description || 'No description available'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium">{data.Category || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    data.Difficulty_Level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    data.Difficulty_Level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {data.Difficulty_Level || 'Not specified'}
                  </span>
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
                  <p className="text-sm text-gray-600">Students Enrolled</p>
                  <p className="font-medium">{data.students || 0}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{data.students || 0}</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{data.quizzes || 0}</p>
                  <p className="text-sm text-gray-600">Quizzes</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{data.rating || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'student':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {data.First_Name?.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{data.First_Name} {data.Last_Name}</h3>
                <p className="text-gray-600">Student ID: #{data.User_ID}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{data.Email || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{data.Contact_no || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Interest</p>
                <p className="font-medium">{data.Interest || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Enrolled Courses</p>
                <p className="font-medium">{data.courses || 0}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Average Grade</p>
                <span className={`font-bold ${data.avgGrade >= 85 ? 'text-green-600' : data.avgGrade >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {data.avgGrade || 'N/A'}%
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-medium">#{data.User_ID}</p>
              </div>
            </div>
          </div>
        );
      
      case 'quiz':
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
                <p className="font-medium">{courses.find(c => c.Course_Code === data.Course_Code)?.Course_Title || data.Course_Code}</p>
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
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-medium">{data.Due_Date || 'Not set'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                <p className="text-sm text-gray-600">Submissions</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {data.submissions || 0} total
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                    {data.pending || 0} pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'discussion':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Discussion #{data.DISCUSSION_ID}</h3>
                <p className="text-gray-600">Posted: {new Date(data.Post_Date).toLocaleDateString()}</p>
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
                  <p className="font-medium">{courses.find(c => c.Course_Code === data.Course_Code)?.Course_Title || data.Course_Code || 'All Courses'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Comments</p>
                  <p className="font-medium">{data.Comments || 0}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Discussion ID</p>
                  <p className="font-medium">#{data.DISCUSSION_ID}</p>
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

// ==================== CONTENT MANAGEMENT PAGE ====================

const ContentManagementPage = ({ course, onBack, instructorId }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    fetchCourseContents();
  }, [course]);

  const fetchCourseContents = async () => {
    if (!course?.Course_Code) return;
    
    setLoading(true);
    try {
      const contentsData = await contentAPI.getByCourse(course.Course_Code);
      setContents(contentsData);
    } catch (error) {
      console.error('Error fetching contents:', error);
      alert(`Error loading contents: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleContentAction = (action, content = null) => {
    setModalType(action);
    setSelectedContent(content);
    setShowContentModal(true);
  };

  const renderContentModal = () => {
    if (!showContentModal) return null;

    if (modalType === 'view') {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Content Details</h3>
              <button onClick={() => setShowContentModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            {selectedContent && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${
                    selectedContent.Content_Type === 'Video' ? 'bg-red-100' :
                    selectedContent.Content_Type === 'Documentation' ? 'bg-blue-100' :
                    selectedContent.Content_Type === 'Presentation' ? 'bg-purple-100' : 'bg-green-100'
                  }`}>
                    {selectedContent.Content_Type === 'Video' ? <Video className="w-8 h-8 text-red-600" /> :
                     selectedContent.Content_Type === 'Documentation' ? <FileText className="w-8 h-8 text-blue-600" /> :
                     selectedContent.Content_Type === 'Presentation' ? <Presentation className="w-8 h-8 text-purple-600" /> :
                     <FileCheck className="w-8 h-8 text-green-600" />}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{selectedContent.Title}</h4>
                    <p className="text-gray-600">ID: #{selectedContent.Content_ID}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <p className="text-gray-800">{selectedContent.Description || 'No description'}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="block text-sm text-gray-600">Type</label>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedContent.Content_Type === 'Video' ? 'bg-red-100 text-red-700' :
                        selectedContent.Content_Type === 'Documentation' ? 'bg-blue-100 text-blue-700' :
                        selectedContent.Content_Type === 'Presentation' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {selectedContent.Content_Type}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="block text-sm text-gray-600">Status</label>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedContent.Status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {selectedContent.Status || 'Draft'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="block text-sm text-gray-600">Upload Date</label>
                      <p className="font-medium">{new Date(selectedContent.UploadDate).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="block text-sm text-gray-600">Order</label>
                      <p className="font-medium">{selectedContent.Content_Order || 1}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm text-gray-600 mb-2">Content Details</label>
                    <div className="flex gap-3">
                      <span className={`px-2 py-1 rounded text-xs ${selectedContent.Video ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                        Video: {selectedContent.Video ? 'Yes' : 'No'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${selectedContent.Documentation ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        Docs: {selectedContent.Documentation ? 'Yes' : 'No'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${selectedContent.Presentation ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                        Slides: {selectedContent.Presentation ? 'Yes' : 'No'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${selectedContent.Assignment ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        Assignment: {selectedContent.Assignment ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button onClick={() => setShowContentModal(false)} className="px-4 py-2 border rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
              <div>
                <h1 className="font-bold text-gray-800">Content Management</h1>
                <p className="text-sm text-gray-600">{course?.Course_Title} ({course?.Course_Code})</p>
              </div>
            </div>
            <button 
              onClick={() => handleContentAction('create')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Content
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Course Content</h2>
              <p className="text-gray-600">Manage all learning materials for this course</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search content..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
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
              <p className="mt-2 text-gray-600">Loading content...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contents.map(content => (
                      <tr key={content.Content_ID} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800">#{content.Content_ID}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold">{content.Title}</p>
                            <p className="text-xs text-gray-600 truncate max-w-xs">{content.Description}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            content.Content_Type === 'Video' ? 'bg-red-100 text-red-700' :
                            content.Content_Type === 'Documentation' ? 'bg-blue-100 text-blue-700' :
                            content.Content_Type === 'Presentation' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {content.Content_Type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            content.Status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {content.Status || 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {new Date(content.UploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">{content.Content_Order || 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleContentAction('view', content)}
                              className="p-2 hover:bg-gray-100 rounded"
                              title="View"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => handleContentAction('edit', content)}
                              className="p-2 hover:bg-gray-100 rounded"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleContentAction('delete', content)}
                              className="p-2 hover:bg-gray-100 rounded text-red-600"
                              title="Delete"
                            >
                              <Trash2 size={18} />
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

          {!loading && contents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <FileText className="mx-auto text-gray-400" size={48} />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">No content yet</h3>
              <p className="mt-2 text-gray-600">Add your first learning material to this course</p>
              <button 
                onClick={() => handleContentAction('create')}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Content
              </button>
            </div>
          )}
        </div>
      </main>

      {renderContentModal()}
    </div>
  );
};

// ==================== MAIN DASHBOARD COMPONENT ====================

export default function InstructorDashboard({ onLogout }) {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showContentPage, setShowContentPage] = useState(false);

  // Add to existing state declarations
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [discussionComments, setDiscussionComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [allUsers, setAllUsers] = useState([]); // For finding discussion authors

  // Data states
  const [instructorProfile, setInstructorProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const instructorId = 11;

  // Chart colors
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

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

  // Effects
  useEffect(() => {
    checkServerConnection();
    fetchInstructorData();
  }, []);

  useEffect(() => {
    fetchInstructorData();
  }, [activeTab]);

  const checkServerConnection = async () => {
    try {
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
    if (!instructorId || showContentPage) return;

    setLoading(true);
    try {
      switch (activeTab) {
        case 'overview': {
          const [profile, coursesData, studentsData, quizzesData] = await Promise.all([
            instructorAPI.getProfile(instructorId),
            instructorAPI.getCourses(instructorId),
            instructorAPI.getStudents(instructorId),
            instructorAPI.getQuizzes(instructorId)
          ]);
          setInstructorProfile(profile);
          setCourses(coursesData);
          setStudents(studentsData);
          setQuizzes(quizzesData);
          break;
        }
        case 'courses': {
          const coursesData = await instructorAPI.getCourses(instructorId);
          setCourses(coursesData);
          break;
        }
        case 'students': {
          const studentsData = await instructorAPI.getStudents(instructorId);
          setStudents(studentsData);
          break;
        }
        case 'quizzes': {
          const quizzesData = await instructorAPI.getQuizzes(instructorId);
          setQuizzes(quizzesData);
          break;
        }
        case 'discussions': {
          const discussionsData = await instructorAPI.getDiscussions(instructorId);
          setDiscussions(discussionsData);
          if (activeTab === 'discussions') {
            await fetchAllUsers();
          }
          break;
        }
        case 'analytics': {
          const analyticsData = await instructorAPI.getAnalytics(instructorId);
          setAnalytics(analyticsData);
          break;
        }
        case 'settings': {
          const profileData = await instructorAPI.getProfile(instructorId);
          setInstructorProfile(profileData);
          break;
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(`Error loading data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Stats
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

  // Modal handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const openViewModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowViewModal(false);
    setSelectedItem(null);
  };

  const handleManageContent = (course) => {
    setSelectedCourse(course);
    setShowContentPage(true);
  };

  const handleBackFromContent = () => {
    setShowContentPage(false);
    setSelectedCourse(null);
  };

  const ReplyModal = ({ 
  discussion, 
  comments, 
  onClose, 
  onPostReply, 
  replyText, 
  setReplyText 
  }) => {
  // Calculate the actual count from discussion object or comments array
  const replyCount = discussion?.comments || discussion?.replies || discussion?.Replies || comments.length;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Discussion Replies ({replyCount})</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Original Discussion */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">{discussion?.Post || 'No content'}</p>
        </div>

        {/* Replies Section */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">
            Replies ({comments.length})
          </h4>
          
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No replies yet.</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-gray-700">{comment.Comment}</p>
                  <p className="text-xs text-gray-500 mt-2">{comment.Comment_Date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Reply Form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          onPostReply();
        }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add your reply
            </label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Type your reply here..."
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Post Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

    // Add these API functions
    const fetchDiscussionComments = async (discussionId) => {
    console.log('Fetching comments for discussion:', discussionId);
    
    // Use mock data immediately
    const mockComments = [
        {
        COMMENT_ID: 1,
        DISCUSSION_ID: discussionId,
        User_ID: 12,
        Comment: "This is a great question! I was wondering about this too.",
        Comment_Date: "2024-01-15T10:30:00Z"
        },
        {
        COMMENT_ID: 2,
        DISCUSSION_ID: discussionId,
        User_ID: instructorId, // Your instructor ID
        Comment: "This is my reply as an instructor. Let me clarify this concept...",
        Comment_Date: "2024-01-16T14:20:00Z"
        },
        {
        COMMENT_ID: 3,
        DISCUSSION_ID: discussionId,
        User_ID: 13,
        Comment: "Thanks for the explanation! It makes sense now.",
        Comment_Date: "2024-01-17T09:15:00Z"
        }
    ];
    
    setDiscussionComments(mockComments);
    console.log('Using mock comments:', mockComments);
    
    // DON'T call the API yet - comment it out
    // try {
    //   const comments = await instructorAPI.getDiscussionComments(discussionId);
    //   setDiscussionComments(comments);
    // } catch (error) {
    //   console.error('Error fetching comments:', error);
    //   setDiscussionComments([]);
    // }
    };

    
    const fetchAllUsers = async () => {
    try {
        // You'll need to create this API endpoint
        const users = await instructorAPI.getAllUsers();
        setAllUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    };

    // const openReplyModal = async (discussion) => {
    // setSelectedDiscussion(discussion);
    // await fetchDiscussionComments(discussion.DISCUSSION_ID);
    // setShowReplyModal(true);
    // };
    const openReplyModal = async (discussion) => {
    console.log('Opening reply modal for discussion:', discussion);
    setSelectedDiscussion(discussion);
    await fetchDiscussionComments(discussion.DISCUSSION_ID);
    setShowReplyModal(true);
    console.log('showReplyModal should be true now');
    };

    const closeReplyModal = () => {
    setShowReplyModal(false);
    setSelectedDiscussion(null);
    setDiscussionComments([]);
    setReplyText('');
    };

    const handlePostReply = async () => {
    try {
        // API call to post reply
        await instructorAPI.postReply({
        DISCUSSION_ID: selectedDiscussion.DISCUSSION_ID,
        User_ID: instructorId, // Current instructor
        Comment: replyText,
        Comment_Date: new Date().toISOString()
        });
        
        // Refresh comments
        await fetchDiscussionComments(selectedDiscussion.DISCUSSION_ID);
        setReplyText('');
    } catch (error) {
        console.error('Error posting reply:', error);
    }
    };

    const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
        try {
        await instructorAPI.deleteComment(commentId);
        // Refresh comments
        await fetchDiscussionComments(selectedDiscussion.DISCUSSION_ID);
        } catch (error) {
        console.error('Error deleting comment:', error);
        }
    }
    };

  // CRUD Operations
  const handleCreate = async (type, data) => {
    try {
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
      await fetchInstructorData();
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

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/login';
    }
  };

  // Filter students
  const filteredStudents = students.filter(student =>
    student.First_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.Last_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.Email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Analytics data
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
    avgScore: Math.floor(Math.random() * 30) + 70,
    completion: Math.floor(Math.random() * 20) + 80
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

  // Render Content Page
  if (showContentPage && selectedCourse) {
    return (
      <ContentManagementPage 
        course={selectedCourse}
        onBack={handleBackFromContent}
        instructorId={instructorId}
      />
    );
  }

  // Render functions
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
                  onClick={() => openViewModal('course', course)}
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
                    onClick={() => openViewModal('course', course)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => openModal('course', course)}
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
                    onClick={() => openViewModal('course', course)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100"
                  >
                    View Course
                  </button>
                  <button 
                    onClick={() => handleManageContent(course)}
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
                          onClick={() => openViewModal('student', student)}
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
                      onClick={() => openViewModal('quiz', quiz)}
                      className="p-2 hover:bg-gray-200 rounded"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => openModal('quiz', quiz)}
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
                    {/* Update this line to show actual count */}
                    <span>{discussion.comments || discussion.replies || discussion.Replies || 0} comments</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openViewModal('discussion', discussion)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => openModal('discussion', discussion)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  {/* View Replies Button */}
                  <button 
                    onClick={() => openReplyModal(discussion)}
                    className="p-2 hover:bg-gray-100 rounded text-blue-600 flex items-center gap-1"
                    title="View Replies"
                  >
                    <MessageSquare size={18} />
                    <span className="text-xs font-medium">
                    ({discussion.comments || discussion.replies || discussion.Replies || 0})
                    </span>
                  </button>
                
                  <button 
                    onClick={() => handleDelete('discussion', discussion.DISCUSSION_ID)}
                    className="p-2 hover:bg-gray-100 rounded text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Conditionally show Edit/Delete only for instructor's posts */}
                  {discussion.User_ID === instructorId && (
                  <>
                    <button 
                    onClick={() => openModal('discussion', discussion)}
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
                  </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

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

  // Main return
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

      {/* Modals */}
      {showModal && (
        <CreateEditModal
          isEdit={modalType.includes('edit')}
          type={modalType.replace('new', '').replace('edit', '')}
          record={selectedItem}
          onSave={modalType.includes('edit') ? handleEdit : handleCreate}
          onClose={closeModal}
          courses={courses}
        />
      )}

      {showViewModal && (
        <ViewModal
          type={modalType}
          data={selectedItem}
          onClose={closeModal}
          courses={courses}
        />
      )}

      {/* Add Reply Modal */}
      {showReplyModal && selectedDiscussion && (
        <ReplyModal
            discussion={selectedDiscussion}
            comments={discussionComments}
            users={allUsers}
            onClose={closeReplyModal}
            onPostReply={handlePostReply}
            replyText={replyText}
            setReplyText={setReplyText}
            onDeleteComment={handleDeleteComment}
            currentUserID={instructorId}
            isInstructor={true}
        />
      )}
    </div>
  );
}