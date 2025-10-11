import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../models/postModel.js";

export const fetchPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
};

export const fetchPost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: err.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user_id = req.user.id; // from token

    // if file uploaded, get its path
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = await createPost(user_id, title, content, image);
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating post", error: err.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image || null;

    const post = await updatePost(req.params.id, title, content, image);
    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating post", error: err.message });
  }
};

export const removePost = async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: err.message });
  }
};
