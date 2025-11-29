const API_BASE = 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// User API calls
export const userAPI = {
  getAll: () => apiCall('/users'),
  create: (userData) => apiCall('/users', { method: 'POST', body: JSON.stringify(userData) }),
  update: (id, userData) => apiCall(`/users/${id}`, { method: 'PUT', body: JSON.stringify(userData) }),
  delete: (id) => apiCall(`/users/${id}`, { method: 'DELETE' }),
};

// Course API calls
export const courseAPI = {
  getAll: () => apiCall('/courses'),
  create: (courseData) => apiCall('/courses', { method: 'POST', body: JSON.stringify(courseData) }),
  update: (id, courseData) => apiCall(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(courseData) }),
  delete: (id) => apiCall(`/courses/${id}`, { method: 'DELETE' }),
};

// Enrollment API calls
export const enrollmentAPI = {
  getAll: () => apiCall('/enrollments'),
  create: (enrollmentData) => apiCall('/enrollments', { method: 'POST', body: JSON.stringify(enrollmentData) }),
  update: (id, enrollmentData) => apiCall(`/enrollments/${id}`, { method: 'PUT', body: JSON.stringify(enrollmentData) }),
  delete: (id) => apiCall(`/enrollments/${id}`, { method: 'DELETE' }),
};

// Content API calls
export const contentAPI = {
  getAll: () => apiCall('/content'),
  create: (contentData) => apiCall('/content', { method: 'POST', body: JSON.stringify(contentData) }),
  update: (id, contentData) => apiCall(`/content/${id}`, { method: 'PUT', body: JSON.stringify(contentData) }),
  delete: (id) => apiCall(`/content/${id}`, { method: 'DELETE' }),
};

// Quiz API calls
export const quizAPI = {
  getAll: () => apiCall('/quizzes'),
  create: (quizData) => apiCall('/quizzes', { method: 'POST', body: JSON.stringify(quizData) }),
  update: (id, quizData) => apiCall(`/quizzes/${id}`, { method: 'PUT', body: JSON.stringify(quizData) }),
  delete: (id) => apiCall(`/quizzes/${id}`, { method: 'DELETE' }),
};

// Discussion API calls
export const discussionAPI = {
  getAll: () => apiCall('/discussions'),
  create: (discussionData) => apiCall('/discussions', { method: 'POST', body: JSON.stringify(discussionData) }),
  update: (id, discussionData) => apiCall(`/discussions/${id}`, { method: 'PUT', body: JSON.stringify(discussionData) }),
  delete: (id) => apiCall(`/discussions/${id}`, { method: 'DELETE' }),
};