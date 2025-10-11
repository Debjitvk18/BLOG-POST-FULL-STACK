import express from "express";
import {
  fetchPosts,
  fetchPostsPaginated,
  fetchPost,
  addPost,
  editPost,
  removePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", fetchPosts);                     // All posts
router.get("/paginated", fetchPostsPaginated);  // Pagination (must be BEFORE :id)
router.get("/:id", fetchPost);                  // Single post

// Protected routes
router.post("/", verifyToken, upload.single("image"), addPost);
router.put("/:id", verifyToken, upload.single("image"), editPost);
router.delete("/:id", verifyToken, removePost);

export default router;
