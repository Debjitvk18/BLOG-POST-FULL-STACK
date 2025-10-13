const BASE_URL = "http://localhost:5000/api";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("token");
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const getJsonHeaders = () => ({
  "Content-Type": "application/json",
  ...getAuthHeaders(),
});

export const api = {
  async register(username, email, password) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: getJsonHeaders(),
      body: JSON.stringify({ username, email, password }),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) throw new Error(data.message || "Registration failed");
    return data;
  },

  async login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: getJsonHeaders(),
      body: JSON.stringify({ email, password }),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) throw new Error(data.message || "Login failed");
    if (data.token) setAuthToken(data.token);
    return data;
  },

  async logout() {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Logout failed");
    clearAuthToken();
  },

  async getPosts() {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers: getAuthHeaders(),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) throw new Error(data.message || "Failed to fetch posts");
    return data;
  },

  async getPaginatedPosts(page = 1) {
    const response = await fetch(`${BASE_URL}/posts/paginated?page=${page}`, {
      headers: getAuthHeaders(),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok)
      throw new Error(data.message || "Failed to fetch paginated posts");
    return data;
  },

  async getMyPosts(page = 1) {
    const response = await fetch(`${BASE_URL}/posts/my-posts?page=${page}`, {
      headers: getAuthHeaders(),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok)
      throw new Error(data.message || "Failed to fetch user's posts");
    return data;
  },

  // 🆕 NEW: Get other users' posts
  async getOtherPosts(page = 1) {
    const response = await fetch(`${BASE_URL}/posts/other-posts?page=${page}`, {
      headers: getAuthHeaders(),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok)
      throw new Error(data.message || "Failed to fetch other users' posts");
    return data;
  },

  async getPost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      headers: getAuthHeaders(),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) throw new Error(data.message || "Failed to fetch post");
    return data;
  },

  async createPost(title, content, image) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: getAuthHeaders(), // no need for Content-Type with FormData
      body: formData,
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) throw new Error(data.message || "Failed to create post");
    return data;
  },

  async updatePost(id, title, content, image) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: formData,
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) throw new Error(data.message || "Failed to update post");
    return data;
  },

  async deletePost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (!response.ok) throw new Error(data.message || "Failed to delete post");
    return true;
  },
};
