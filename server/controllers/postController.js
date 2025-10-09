import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../models/postModel.js";
import pool from "../config/db.js";

// Get all posts
export const fetchPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;     // current page
    const limit = parseInt(req.query.limit) || 6;   // posts per page
    const offset = (page - 1) * limit;

    // Get paginated posts
    const { rows: posts } = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    // Get total number of posts
    const { rows: totalRows } = await pool.query("SELECT COUNT(*) FROM posts");
    const total = parseInt(totalRows[0].count);

    res.json({
      posts,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
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

    // Fetch the existing post
    const existingPost = await getPostById(req.params.id);
    if (!existingPost)
      return res.status(404).json({ message: "Post not found" });

    // Only update image if new file is uploaded
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : existingPost.image;

    const updatedPost = await updatePost(req.params.id, title, content, image);
    res.json(updatedPost);
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
