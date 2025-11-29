const API_BASE_URL = 'http://localhost:5000/api';

// Instructor-specific API calls
export const instructorAPI = {
  // Get instructor profile
//   getProfile: async (instructorId) => {
//     const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}`);
//     if (!response.ok) throw new Error('Failed to fetch profile');
//     return response.json();
//   },
  // Get instructor profile
  getProfile: async (instructorId) => {
    console.log(`Fetching profile for instructor: ${instructorId}`);
    const result = await fetch(`/instructors/${instructorId}`);
    console.log('Profile response:', result);
    return result;
  },

  // Update instructor profile
  updateProfile: async (instructorId, data) => {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  // Get instructor's courses
  getCourses: async (instructorId) => {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}/courses`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  },

  // Create new course
  createCourse: async (courseData) => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });
    if (!response.ok) throw new Error('Failed to create course');
    return response.json();
  },

  // Update course
  updateCourse: async (courseCode, courseData) => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseCode}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });
    if (!response.ok) throw new Error('Failed to update course');
    return response.json();
  },

  // Delete course
  deleteCourse: async (courseCode) => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseCode}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete course');
    return response.json();
  },

  // Get instructor's students
  getStudents: async (instructorId) => {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}/students`);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  // Get quizzes
  getQuizzes: async (instructorId) => {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}/quizzes`);
    if (!response.ok) throw new Error('Failed to fetch quizzes');
    return response.json();
  },

  // Create quiz
  createQuiz: async (quizData) => {
    const response = await fetch(`${API_BASE_URL}/quizzes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData)
    });
    if (!response.ok) throw new Error('Failed to create quiz');
    return response.json();
  },

  // Update quiz
  updateQuiz: async (quizNo, setNo, quizData) => {
    const response = await fetch(`${API_BASE_URL}/quizzes/${quizNo}/${setNo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData)
    });
    if (!response.ok) throw new Error('Failed to update quiz');
    return response.json();
  },

  // Delete quiz
  deleteQuiz: async (quizNo, setNo) => {
    const response = await fetch(`${API_BASE_URL}/quizzes/${quizNo}/${setNo}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete quiz');
    return response.json();
  },

  // Get discussions
  getDiscussions: async (instructorId) => {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}/discussions`);
    if (!response.ok) throw new Error('Failed to fetch discussions');
    return response.json();
  },

  // Create discussion
  createDiscussion: async (discussionData) => {
    const response = await fetch(`${API_BASE_URL}/discussions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discussionData)
    });
    if (!response.ok) throw new Error('Failed to create discussion');
    return response.json();
  },

  // Update discussion
  updateDiscussion: async (discussionId, discussionData) => {
    const response = await fetch(`${API_BASE_URL}/discussions/${discussionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discussionData)
    });
    if (!response.ok) throw new Error('Failed to update discussion');
    return response.json();
  },

  // Delete discussion
  deleteDiscussion: async (discussionId) => {
    const response = await fetch(`${API_BASE_URL}/discussions/${discussionId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete discussion');
    return response.json();
  },

  // Get analytics data
  getAnalytics: async (instructorId) => {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}/analytics`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  }
};