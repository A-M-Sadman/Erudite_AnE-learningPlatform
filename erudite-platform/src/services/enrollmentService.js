import api from "./axiosInstance";

// enroll a student
export const enrollStudent = (data) => api.post("/enrollments", data);

// get enrollments for a student
export const getStudentEnrollments = (studentId) => api.get(`/enrollments/student/${studentId}`);

// get enrollments for a course
export const getCourseEnrollments = (courseCode) => api.get(`/enrollments/course/${courseCode}`);

// update progress
export const updateProgress = (data) => api.put("/enrollments/progress", data);

// delete enrollment - expects server endpoint: DELETE /enrollments?sUserId=...&courseCode=...
export const deleteEnrollment = ({ sUserId, courseCode }) => api.delete(`/enrollments`, { params: { sUserId, courseCode }});
