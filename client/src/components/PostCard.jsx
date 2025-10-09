import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post, onDelete }) {
  return (
    <div className="border rounded p-4 shadow-md flex flex-col">
      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt={post.title}
          className="w-full h-48 object-cover mb-2 rounded"
        />
      )}
      <h2 className="font-bold text-lg mb-2">{post.title}</h2>
      <p className="flex-1 mb-2">{post.content}</p>
      <div className="flex justify-between items-center mt-auto">
        <Link to={`/edit/${post.id}`} className="text-blue-500 hover:underline">
          Edit
        </Link>
        <button
          onClick={() => onDelete(post.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
