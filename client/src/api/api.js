import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000/api/posts' });


// GET all posts
export const fetchPosts = () => API.get('/');


// GET post by id
export const fetchPostById = (id) => API.get(`/${id}`);


// CREATE post
export const createPost = (formData) => API.post('/', formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});


// UPDATE post
export const updatePost = (id, formData) => API.put(`/${id}`, formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});


// DELETE post
export const deletePost = (id) => API.delete(`/${id}`);