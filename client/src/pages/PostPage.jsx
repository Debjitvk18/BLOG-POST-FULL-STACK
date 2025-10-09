import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById } from "../api/api";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetchPostById(id);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt={post.title}
          className="w-full h-auto max-h-[600px] object-contain mb-6"
        />
      )}

      <p className="text-lg whitespace-pre-wrap">{post.content}</p>
    </div>
  );
}
