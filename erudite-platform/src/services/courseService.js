import api from "./axiosInstance";

export const getCourses = () => api.get("/courses");

export const getCourse = (code) => api.get(`/courses/${code}`);

export const createCourse = (data) => api.post("/courses", data);

export const updateCourse = (code, data) =>
  api.put(`/courses/${code}`, data);

export const deleteCourse = (code) =>
  api.delete(`/courses/${code}`);

export const addPrerequisite = (code, prerequisite) =>
  api.post(`/courses/${code}/prerequisites`, { prerequisite });
