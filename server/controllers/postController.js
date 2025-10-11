import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsPaginated,
} from "../models/postModel.js";

// Fetch all posts (no pagination)
export const fetchPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};

// Fetch posts with pagination (6 posts per page)
export const fetchPostsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // page number from query string
    const limit = 6; // 6 posts per page

    const result = await getPostsPaginated(page, limit);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching paginated posts", error: err.message });
  }
};

// Fetch a single post by ID
export const fetchPost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err.message });
  }
};

// Create a new post
export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user_id = req.user.id; // from token

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = await createPost(user_id, title, content, image);
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
};

// Update an existing post
export const editPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || null;

    const post = await updatePost(req.params.id, title, content, image);
    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
};

// Delete a post
export const removePost = async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
};
