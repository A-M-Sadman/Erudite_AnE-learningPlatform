// services/api.js - CORRECTED WITH .data
import api from './axiosInstance';

// User API with data transformation
export const userAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/users');
      console.log('Users API raw response:', response);
      
      // Check if response exists and has data
      if (!response || !Array.isArray(response.data)) {
        console.error('Users API did not return array:', response);
        return [];
      }
      
      // In userAPI.getAll:
      return response.data.map(user => ({
        User_ID: user.userId || user.User_ID,
        First_Name: user.firstName || user.First_Name || '',
        Last_Name: user.lastName || user.Last_Name || '',
        Email: user.email || user.Email || '',
        Role_Type: user.role || user.Role_Type || 'student',
        Password: '', // Add empty password field
        Contact_no: user.contact || user.Contact_No || user.Contact_no || '' // Get from contact field
      }));
    } catch (error) {
      console.error('Error in userAPI.getAll:', error);
      return [];
    }
  },
  
  get: (id) => api.get(`/users/${id}`).then(response => ({
    User_ID: response.data?.userId,
    First_Name: response.data?.firstName,
    Last_Name: response.data?.lastName,
    Email: response.data?.email,
    Role_Type: response.data?.role,
    Contact_no: response.data?.contact || ''
  })),
  
  create: (data) => {
    const formattedData = {
      firstName: data.First_Name,
      lastName: data.Last_Name,
      email: data.Email,
      password: data.Password,
      roleType: data.Role_Type,
      contact: data.Contact_no
    };
    return api.post('/users', formattedData);
  },
  
  update: (id, data) => {
    const formattedData = {
      firstName: data.First_Name,
      lastName: data.Last_Name,
      email: data.Email
    };
    return api.put(`/users/${id}`, formattedData);
  },
  
  delete: (id) => api.delete(`/users/${id}`)
};

// Course API with data transformation
export const courseAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/courses');
      console.log('Courses API raw response:', response);
      
      if (!response || !Array.isArray(response.data)) {
        console.error('Courses API did not return array:', response);
        return [];
      }
      
      return response.data.map(course => ({
        Course_Code: course.courseCode || course.Course_Code || '',
        Course_Title: course.title || course.Course_Title || '',
        Description: course.description || course.Description || '',
        Category: course.category || course.Category || '',
        Difficulty_Level: course.difficulty || course.Difficulty_Level || 'Beginner',
        I_USER_ID: course.iUserId || course.I_USER_ID || null, // Get I_USER_ID from backend
        A_USER_ID: 1 // Default admin ID
      }));
    } catch (error) {
      console.error('Error in courseAPI.getAll:', error);
      return [];
    }
  },
  
  get: (code) => api.get(`/courses/${code}`).then(response => ({
    Course_Code: response.data?.courseCode,
    Course_Title: response.data?.title,
    Description: response.data?.description,
    Category: response.data?.category,
    Difficulty_Level: response.data?.difficulty,
    I_USER_ID: response.data?.iUserId,
    A_USER_ID: response.data?.aUserId || 1
  })),
  
  // create: (data) => {
  //   const formattedData = {
  //     courseCode: data.Course_Code,
  //     title: data.Course_Title,
  //     description: data.Description,
  //     category: data.Category,
  //     difficulty: data.Difficulty_Level,
  //     iUserId: data.I_USER_ID,
  //     aUserId: data.A_USER_ID || 1
  //   };
  //   return api.post('/courses', formattedData);
  // },
  // In services/api.js - courseAPI.create
  create: (data) => {
    const formattedData = {
      courseCode: data.Course_Code || '',
      title: data.Course_Title || '',
      description: data.Description || '',
      category: data.Category || '',
      difficulty: data.Difficulty_Level || 'Beginner',
      iUserId: data.I_USER_ID || null,  // This might be undefined
      aUserId: data.A_USER_ID || 1
    };
    
    console.log('Sending course data to backend:', formattedData); // Add logging
    return api.post('/courses', formattedData);
  },
  
  update: (code, data) => {
    const formattedData = {
      title: data.Course_Title,
      description: data.Description,
      category: data.Category,
      difficulty: data.Difficulty_Level,
      iUserId: data.I_USER_ID
    };
    return api.put(`/courses/${code}`, formattedData);
  },
  
  delete: (code) => api.delete(`/courses/${code}`)
};

// Enrollment API with data transformation
export const enrollmentAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/enrollments');
      console.log('Enrollments API raw response:', response);
      
      if (!response || !Array.isArray(response.data)) {
        console.error('Enrollments API did not return array:', response);
        return [];
      }
      
      return response.data.map(enrollment => ({
        Enrollment_ID: enrollment.Enrollment_ID || enrollment.id || Math.random(),
        S_User_ID: enrollment.S_User_ID || enrollment.sUserId || '',
        Course_Code: enrollment.Course_Code || enrollment.courseCode || '',
        enrollment_Date: enrollment.Enrollment_Date || enrollment.enrollmentDate || new Date().toISOString().split('T')[0],
        Lessons_Completed: enrollment.Lessons_Completed || enrollment.lessonsCompleted || 0,
        Total_Lessons: enrollment.Total_Lessons || 10,
        Status: enrollment.Status || 'In Progress',
        First_Name: enrollment.First_Name || '',
        Last_Name: enrollment.Last_Name || '',
        Course_Title: enrollment.Course_Title || ''
      }));
    } catch (error) {
      console.error('Error in enrollmentAPI.getAll:', error);
      return [];
    }
  },
  
  create: (data) => {
    const formattedData = {
      sUserId: data.S_User_ID,
      courseCode: data.Course_Code,
      enrollmentDate: data.enrollment_Date
    };
    return api.post('/enrollments', formattedData);
  },
  update: (id, data) => {
    const formattedData = {
      Lessons_Completed: data.Lessons_Completed
    };

    console.log('📤 Updating enrollment:', id, formattedData);
    return api.put(`/enrollments/${data.S_User_ID}/${data.Course_Code}`, formattedData);
  },
  updateComposite: (sUserId, courseCode, data) => {
    const formattedData = {
    Lessons_Completed: data.Lessons_Completed,
    Completion_Status: data.Completion_Status,
    Total_Lessons: data.Total_Lessons
  };

    return api.put(`/enrollments/${sUserId}/${courseCode}`, formattedData);
  },
  delete: (sUserId, courseCode) => {
    return api.delete(`/enrollments/${sUserId}/${courseCode}`);
  }

};

// Content API with data transformation
export const contentAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/content');
      console.log('Content API raw response:', response);
      
      if (!response || !Array.isArray(response.data)) {
        console.error('Content API did not return array:', response);
        return [];
      }
      
      return response.data.map(content => ({
        ContentID: content.ContentID || content.contentId,
        Course_Code: content.Course_Code || content.courseCode || '',
        Title: content.Title || content.title || '',
        Description: content.Description || content.description || '',
        UploadDate: content.UploadDate || content.uploadDate || new Date().toISOString().split('T')[0],
        Video: content.Video || content.video || 0,
        Documentation: content.Documentation || content.documentation || 0,
        Presentation: content.Presentation || content.presentation || 0,
        Assignment: content.Assignment || content.assignment || 0,
        Course_Title: content.Course_Title || '',
        Content_Type: content.Video ? 'Video' : 
        content.Documentation ? 'Documentation' : 
        content.Presentation ? 'Presentation' : 'Assignment',
        Status: 'Published'
      }));
    } catch (error) {
      console.error('Error in contentAPI.getAll:', error);
      return [];
    }
  },
  
  create: (data) => {
    const formattedData = {
      courseCode: data.Course_Code,
      title: data.Title,
      description: data.Description,
      uploadDate: data.UploadDate || new Date().toISOString().split('T')[0],
      video: data.Content_Type === 'Video' ? 1 : 0,
      documentation: data.Content_Type === 'Documentation' ? 1 : 0,
      presentation: data.Content_Type === 'Presentation' ? 1 : 0,
      assignment: data.Content_Type === 'Assignment' ? 1 : 0
    };
    return api.post('/content', formattedData);
  },
  
  update: (id, data) => api.put(`/content/${id}`, { title: data.Title, description: data.Description }),
  delete: (id) => api.delete(`/content/${id}`)
};

// Quiz API with data transformation
export const quizAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/quiz');
      console.log('Quiz API raw response:', response);
      
      if (!response || !Array.isArray(response.data)) {
        console.error('Quiz API did not return array:', response);
        return [];
      }
      
      return response.data.map(quiz => ({
        Quiz_No: quiz.Quiz_No || quiz.quizNo || Math.random(),
        Set_No: quiz.Set_No || quiz.setNo || 1,
        Quiz_Title: quiz.Quiz_Title || quiz.quizTitle || 'Untitled Quiz',
        Course_Code: quiz.Course_Code || quiz.courseCode || '',
        Total_Questions: quiz.Total_Questions || 5,
        Total_Marks: quiz.Total_Marks || 50,
        Duration: quiz.Duration || '45 min',
        Status: quiz.Status || 'Active',
        Course_Title: quiz.Course_Title || ''
      }));
    } catch (error) {
      console.error('Error in quizAPI.getAll:', error);
      return [];
    }
  },
  
  create: (data) => {
    const formattedData = {
      quizNo: data.Quiz_No,
      setNo: data.Set_No || 1,
      quizTitle: data.Quiz_Title,
      courseCode: data.Course_Code
    };
    return api.post('/quiz', formattedData);
  },
  
  // In services/api.js - quizAPI.update
  update: (id, data) => {
    const formattedData = {
      quizTitle: data.Quiz_Title,
      courseCode: data.Course_Code
    };
    
    console.log('📤 Updating quiz:', formattedData);
    return api.put(`/quiz/${id}`, formattedData);
  },
  delete: (id) => {
    console.log('📞 Deleting quiz ID:', id);
    
    // Check if id is valid
    if (!id) {
      console.error('❌ No quiz ID provided for deletion');
      return Promise.reject(new Error('Quiz ID is required'));
    }
    
    return api.delete(`/quiz/${id}`);
  },
};

// Discussion API with data transformation
export const discussionAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/discussion');
      console.log('Discussion API raw response:', response);
      
      if (!response || !Array.isArray(response.data)) {
        console.error('Discussion API did not return array:', response);
        return [];
      }
      
      return response.data.map(discussion => ({
        DISCUSSION_ID: discussion.Discussion_ID || discussion.discussionId,
        Post: discussion.Post || discussion.post || '',
        Post_Date: discussion.Post_Date || discussion.postDate || new Date().toISOString().split('T')[0],
        Course_Code: discussion.Course_Code || discussion.courseCode || 'CS101',
        User_ID: discussion.User_ID || discussion.userId || 3,
        Status: discussion.Status || 'Active',
        First_Name: discussion.First_Name || 'Unknown',
        Last_Name: discussion.Last_Name || 'User',
        Course_Title: discussion.Course_Title || 'Introduction to Programming',
        Reply_Count: discussion.Reply_Count || 0
      }));
    } catch (error) {
      console.error('Error in discussionAPI.getAll:', error);
      return [];
    }
  },
  
  create: (data) => {
    const formattedData = {
      post: data.Post,
      postDate: data.Post_Date || new Date().toISOString().split('T')[0],
      courseCode: data.Course_Code,
      userId: data.User_ID
    };
    return api.post('/discussion', formattedData);
  },
  
  update: (id, data) => {
    const formattedData = {
      post: data.Post
  }; 
  return api.put(`/discussion/${id}`, formattedData);
  },
  delete: (id) => api.delete(`/discussion/${id}`)
};

// Evaluation API with data transformation
export const evaluationAPI = {
  // Certificates
  getAllCertificates: async () => {
    try {
      const response = await api.get('/evaluation/certificates');
      console.log('Certificates API raw response:', response);
      
      if (!response || !Array.isArray(response.data)) {
        console.error('Certificates API did not return array:', response);
        return [];
      }
      
      return response.data.map(cert => ({
        Certificate_ID: cert.Certificate_ID,
        S_User_ID: cert.S_User_ID,
        Course_Code: cert.Course_Code,
        Issue_Date: cert.Issue_Date,
        Student_Name: cert.Student_Name || `Student ${cert.S_User_ID}`,
        Course_Title: cert.Course_Title || cert.Course_Code
      }));
    } catch (error) {
      console.error('Error in evaluationAPI.getAllCertificates:', error);
      return [];
    }
  },
  
  // Course Evaluations - FIXED: changed 'eval' to 'evaluationItem' (or any other name)
  getAllRatings: async () => {
    try {
      const response = await api.get('/evaluation/evaluations');
      console.log('Evaluations API raw response:', response);
      
      if (!response || !Array.isArray(response.data)) {
        console.error('Evaluations API did not return array:', response);
        return [];
      }
      
      return response.data.map(evaluationItem => ({  // Changed 'eval' to 'evaluationItem'
        S_User_ID: evaluationItem.S_User_ID,
        I_USER_ID: evaluationItem.I_USER_ID,
        Course_Code: evaluationItem.Course_Code,
        Course_Rating: evaluationItem.Course_Rating || 0,
        Instructor_Review: evaluationItem.Instructor_Review || '',
        Student_Grade: evaluationItem.Student_Grade || '',
        Student_Name: evaluationItem.Student_Name || `Student ${evaluationItem.S_User_ID}`,
        Instructor_Name: evaluationItem.Instructor_Name || `Instructor ${evaluationItem.I_USER_ID}`,
        Course_Title: evaluationItem.Course_Title || evaluationItem.Course_Code,
        // Create a unique ID for frontend use
        Evaluation_ID: `${evaluationItem.S_User_ID}-${evaluationItem.Course_Code}`
      }));
    } catch (error) {
      console.error('Error in evaluationAPI.getAllEvaluations:', error);
      return [];
    }
  },
  
  createCertificate: (data) => {
    const formattedData = {
      sUserId: data.S_User_ID,
      courseCode: data.Course_Code,
      issueDate: data.Issue_Date
    };
    return api.post('/evaluation/certificates', formattedData);
  },
  
  createEvaluation: (data) => {
    const formattedData = {
      sUserId: data.S_User_ID,
      iUserId: data.I_USER_ID,
      courseCode: data.Course_Code,
      courseRating: data.Course_Rating,
      instructorReview: data.Instructor_Review,
      studentGrade: data.Student_Grade
    };
    return api.post('/evaluation/evaluations', formattedData);
  },
  
  deleteCertificate: (id) => api.delete(`/evaluation/certificates/${id}`),
  
  deleteEvaluation: (sUserId, iUserId, courseCode) =>
    api.delete(`/evaluation/evaluations/${sUserId}/${iUserId}/${courseCode}`)
};

// services/api.js - Add these functions:

// Comment API
export const commentAPI = {
  getAll: async (discussionId = null) => {
    try {
      const url = discussionId ? `/comments?discussionId=${discussionId}` : '/comments';
      const response = await api.get(url);
      console.log('Comments API raw response:', response);
      
      if (!response || !Array.isArray(response.data)) {
        console.error('Comments API did not return array:', response);
        return [];
      }
      
      return response.data.map(comment => ({
        COMMENT_ID: comment.COMMENT_ID || comment.Comment_ID || comment.commentId,
        DISCUSSION_ID: comment.DISCUSSION_ID || comment.Discussion_ID || comment.discussionId,
        User_ID: comment.User_ID || comment.userId,
        Comment: comment.COMMENT || comment.Comment || comment.comment,
        Comment_Date: comment.COMMENT_DATE || comment.Comment_Date || comment.commentDate || new Date().toISOString().split('T')[0],
        First_Name: comment.First_Name || comment.firstName || '',
        Last_Name: comment.Last_Name || comment.lastName || ''
      }));
    } catch (error) {
      console.error('Error in commentAPI.getAll:', error);
      return [];
    }
  },

  create: (data) => {
    const formattedData = {
      discussionId: data.DISCUSSION_ID,
      userId: data.User_ID,
      comment: data.Comment
    };
    
    console.log('📤 Comment API sending:', formattedData);
    return api.post('/comments', formattedData);
  },
  
  update: (id, data) => {
    return api.put(`/comments/${id}`, { comment: data.Comment });
  },
  
  delete: (id) => api.delete(`/comments/${id}`)
};

// Also add commentAPI to your export
export default {
  userAPI,
  courseAPI,
  enrollmentAPI,
  contentAPI,
  quizAPI,
  discussionAPI,
  commentAPI,  // Add this
  evaluationAPI
};