import api from "./axiosInstance";

export const createDiscussion = (data) => api.post("/discussion", data);
export const getDiscussion = (id) => api.get(`/discussion/${id}`);
export const getAllDiscussions = () => api.get("/discussion"); // expects GET /discussion to list all
export const addComment = (discussionId, data) => api.post(`/discussion/${discussionId}/comments`, data);
export const getComments = (discussionId) => api.get(`/discussion/${discussionId}/comments`);

// delete discussion - expects server endpoint DELETE /discussion/:id
export const deleteDiscussion = (discussionId) => api.delete(`/discussion/${discussionId}`);
export const updateDiscussion = (discussionId, data) => api.put(`/discussion/${discussionId}`, data);
