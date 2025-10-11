import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth APIs
export const register = (data) => apiClient.post("/auth/register", data);
export const login = (data) => apiClient.post("/auth/login", data);
export const logout = (token) => apiClient.post("/auth/logout", {}, {
  headers: { Authorization: `Bearer ${token}` }
});

// Post APIs
export const fetchPosts = () => apiClient.get("/posts");
export const fetchPostsPaginated = (page) => apiClient.get(`/posts/paginated?page=${page}`);
export const fetchPost = (id) => apiClient.get(`/posts/${id}`);
export const createPost = (formData, token) => apiClient.post("/posts", formData, {
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
});
export const updatePost = (id, formData, token) => apiClient.put(`/posts/${id}`, formData, {
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
});
export const deletePost = (id, token) => apiClient.delete(`/posts/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});
