import api from "./axiosInstance";

export const createTicket = (data) =>
  api.post("/support/create", data);

export const getStudentTickets = (id) =>
  api.get(`/support/student/${id}`);

export const getTicket = (problemId) =>
  api.get(`/support/${problemId}`);

export const addSolution = (problemId, data) =>
  api.post(`/support/${problemId}/solution`, data);
