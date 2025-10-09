import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../models/postModel.js";

// Get all posts
export const fetchPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single post
export const fetchPost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new post
export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const post = await createPost(title, content, image);

    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Update post
export const editPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    const post = await updatePost(req.params.id, title, content, image);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete post
export const removePost = async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.json({ message: "✅ Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
