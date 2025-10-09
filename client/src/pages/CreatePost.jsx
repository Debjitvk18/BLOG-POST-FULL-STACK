import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { createPost } from "../api/api";

export default function CreatePost() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createPost(formData);
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-slate-900 text-center">Create New Post</h1>
      <PostForm onSubmit={handleCreate} />
    </div>
  );
}
