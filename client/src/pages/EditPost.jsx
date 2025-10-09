import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { fetchPostById, updatePost } from "../api/api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetchPostById(id);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    loadPost();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updatePost(id, formData);
      navigate("/");
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  if (!post) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-slate-600 text-lg">Loading...</div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-slate-900 text-center">Edit Post</h1>
      <PostForm initialData={post} onSubmit={handleUpdate} />
    </div>
  );
}
