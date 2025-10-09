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

// READ all posts
router.get("/", fetchPosts);

// READ single post
router.get("/:id", fetchPost);

// CREATE post (with image)
router.post("/", upload.single("image"), addPost);

// UPDATE post
router.put("/:id", upload.single("image"), editPost);

// DELETE post
router.delete("/:id", removePost);

export default router;
