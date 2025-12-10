import api from "./axiosInstance";

export const register = (data) => api.post("/auth/register", data);

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

export const logout = () => localStorage.removeItem("token");
