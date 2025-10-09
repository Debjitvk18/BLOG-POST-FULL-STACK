import express from "express";
import { upload } from "../middleware/upload.js";
import {
  fetchPosts,
  fetchPost,
  addPost,
  editPost,
  removePost,
} from "../controllers/postController.js";

const router = express.Router();

/**
 * GET /api/posts?page=1&limit=6
 * Fetch paginated posts
 */
router.get("/", fetchPosts);

/**
 * GET /api/posts/:id
 * Fetch single post by ID
 */
router.get("/:id", fetchPost);

/**
 * POST /api/posts
 * Create new post with optional image upload
 */
router.post("/", upload.single("image"), addPost);

/**
 * PUT /api/posts/:id
 * Update post with optional image upload
 */
router.put("/:id", upload.single("image"), editPost);

/**
 * DELETE /api/posts/:id
 * Delete a post by ID
 */
router.delete("/:id", removePost);

export default router;
