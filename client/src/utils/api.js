const BASE_URL = 'http://localhost:5000/api';

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const api = {
  async register(username, email, password) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  async login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  async logout() {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Logout failed');

    clearAuthToken();
  },

  async getPosts() {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch posts');

    return response.json();
  },

  async getPaginatedPosts(page = 1) {
    const response = await fetch(`${BASE_URL}/posts/paginated?page=${page}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch posts');

    return response.json();
  },

  async getPost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch post');

    return response.json();
  },

  async createPost(title, content, image) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create post');
    }

    return response.json();
  },

  async updatePost(id, title, content, image) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update post');
    }

    return response.json();
  },

  async deletePost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Failed to delete post');

    return response.json();
  },
};
