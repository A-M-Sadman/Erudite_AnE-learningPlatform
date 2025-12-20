import api from "./axiosInstance";

export const createTicket = (data) =>
  api.post("/support/create", data);

export const getStudentTickets = (id) =>
  api.get(`/support/student/${id}`);

export const getTicket = (problemId) =>
  api.get(`/support/${problemId}`);

export const addSolution = (problemId, data) =>
  api.post(`/support/${problemId}/solution`, data);

// Add these to your techSupportService.js
export const getAllTickets = () => api.get("/support/tickets");
export const getTicketById = (problemId) => api.get(`/support/tickets/${problemId}`);
export const updateTicket = (problemId, data) => api.put(`/support/tickets/${problemId}`, data);
export const assignTicket = (problemId, userId) => api.post(`/support/tickets/${problemId}/assign`, { userId });