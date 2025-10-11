import express from "express";
import { fetchPosts, fetchPost, addPost, editPost, removePost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", fetchPosts);
router.get("/:id", fetchPost);

// Protected routes
router.post("/", verifyToken, upload.single("image"), addPost);
router.put("/:id", verifyToken, upload.single("image"), editPost);
router.delete("/:id", verifyToken, removePost);

export default router;
