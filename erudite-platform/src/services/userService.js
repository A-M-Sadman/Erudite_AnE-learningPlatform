import api from "./axiosInstance";

export const getAllUsers = () => api.get("/users");

export const getUser = (id) => api.get(`/users/${id}`);

export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export const changePassword = (id, data) =>
  api.put(`/users/${id}/password`, data);
