import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post, onDelete, view = "grid" }) {
  return (
    <div
      className={`border rounded p-4 shadow-md flex ${
        view === "list" ? "flex-col sm:flex-row gap-4" : "flex-col"
      }`}
    >
      {post.image && (
        <div
          className={`${
            view === "list"
              ? "w-full sm:w-48 h-48 flex-shrink-0"
              : "w-full h-48"
          } overflow-hidden rounded mb-2`}
        >
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <h2 className="font-bold text-lg mb-2">{post.title}</h2>
        <p className="flex-1 mb-2">{post.content}</p>
        <div className="flex justify-between items-center mt-auto">
          <Link
            to={`/edit/${post.id}`}
            className="text-blue-500 hover:underline"
          >
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
    </div>
  );
}
