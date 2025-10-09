import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";
import { createPost } from "../api/api.js";

export default function CreatePost() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createPost(formData);
      navigate("/"); // Go back to home after creation
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <PostForm onSubmit={handleCreate} />
    </div>
  );
}
