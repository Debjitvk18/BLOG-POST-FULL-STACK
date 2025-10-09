import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";
import { fetchPostById, updatePost } from "../api/api.js";

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

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm initialData={post} onSubmit={handleUpdate} />
    </div>
  );
}
