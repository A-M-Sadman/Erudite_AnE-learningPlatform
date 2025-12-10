import api from "./axiosInstance";

export const getContentsByCourse = (courseCode) =>
  api.get(`/content/course/${courseCode}`);

export const getContent = (id) => api.get(`/content/${id}`);

export const createContent = (data) => api.post("/content", data);

export const updateContent = (id, data) =>
  api.put(`/content/${id}`, data);

export const deleteContent = (id) =>
  api.delete(`/content/${id}`);
