import api from "./axiosInstance";

const instructorAPI = {
  // Get instructor profile
  getProfile: (instructorId) => api.get(`/instructors/${instructorId}`).then(res => res.data),

  // Get all courses of the instructor
  getCourses: (instructorId) => api.get(`/instructors/${instructorId}/courses`).then(res => res.data),

  // Get all students under the instructor
  getStudents: (instructorId) => api.get(`/instructors/${instructorId}/students`).then(res => res.data),

  // Get all quizzes of the instructor
  getQuizzes: (instructorId) => api.get(`/instructors/${instructorId}/quizzes`).then(res => res.data),

  // Get all discussions under the instructor
  getDiscussions: (instructorId) => api.get(`/instructors/${instructorId}/discussions`).then(res => res.data),

  // Get analytics data
  getAnalytics: (instructorId) => api.get(`/instructors/${instructorId}/analytics`).then(res => res.data),

  getByCourse: (courseCode) => api.get(`/content/course/${courseCode}`).then(res =>
        res.data.map(item => ({
        ContentID: item.ContentID,
        Title: item.Title,
        Description: item.Description,
        UploadDate: item.UploadDate,
        Content_Type: item.Video ? 'Video'
            : item.Documentation ? 'Documentation'
            : item.Presentation ? 'Presentation'
            : 'Assignment'
        }))
    ),

    // Add this function to instructorAPI.js
    getDiscussionComments: async (discussionId) => {
    console.log(`Fetching comments for discussion: ${discussionId}`);
    try {
        // Adjust the endpoint based on your backend API
        const response = await fetch(`/api/discussions/${discussionId}/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        
        if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.statusText}`);
        }
        
        const comments = await response.json();
        console.log('Comments response:', comments);
        return comments;
    } catch (error) {
        console.error('Error fetching discussion comments:', error);
        throw error;
    }
    },

    // Add to instructorAPI.js
    getAllUsers: async () => {
    console.log('Fetching all users');
    try {
        const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        
        if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
    },

    postReply: async (replyData) => {
    console.log('Posting reply:', replyData);
    try {
        const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData)
        });
        
        if (!response.ok) {
        throw new Error(`Failed to post reply: ${response.statusText}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error posting reply:', error);
        throw error;
    }
    },

    deleteComment: async (commentId) => {
    console.log(`Deleting comment: ${commentId}`);
    try {
        const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        
        if (!response.ok) {
        throw new Error(`Failed to delete comment: ${response.statusText}`);
        }
        
        return { success: true };
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
    },

  // Test server connection
  testConnection: async () => {
    try {
      const response = await api.get('/ping'); // optional endpoint just to check server
      return response.status === 200;
    } catch {
      return false;
    }
  },

  // Example CRUD methods for courses/quizzes/discussions if needed
  createCourse: (data) => {
    const payload = {
        Course_Code: data.Course_Code,
        Course_Title: data.Course_Title,
        Description: data.Description || '',
        I_User_ID: data.I_User_ID
    };

    console.log("🚀 FINAL CREATE COURSE PAYLOAD:", payload);

    return api.post('/courses', payload).then(res => res.data);
    },

  updateCourse: (id, data) => api.put(`/courses/${id}`, data).then(res => res.data),
  deleteCourse: (id) => api.delete(`/courses/${id}`).then(res => res.data),

  createQuiz: (data) => api.post('/quizzes', data).then(res => res.data),
  updateQuiz: (quizNo, setNo, data) => api.put(`/quizzes/${quizNo}/${setNo}`, data).then(res => res.data),
  deleteQuiz: (quizNo, setNo) => api.delete(`/quizzes/${quizNo}/${setNo}`).then(res => res.data),

  createDiscussion: (data) => api.post('/discussion', data).then(res => res.data),
  updateDiscussion: (id, data) => api.put(`/discussion/${id}`, data).then(res => res.data),
  deleteDiscussion: (id) => api.delete(`/discussion/${id}`).then(res => res.data)
};

export default instructorAPI;
