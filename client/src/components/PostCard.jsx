import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

export default function PostCard({ post, onDelete, view = "grid" }) {
  return (
    <Link to={`/post/${post.id}`}>
      <div
        className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 flex cursor-pointer ${
          view === "list" ? "flex-col sm:flex-row gap-0" : "flex-col"
        }`}
      >
        {post.image && (
          <div
            className={`${
              view === "list"
                ? "w-full sm:w-64 h-64 flex-shrink-0"
                : "w-full h-56"
            } overflow-hidden bg-gray-100`}
          >
            <img
              src={`http://localhost:5000${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex-1">
            <h2 className="font-bold text-xl mb-3 text-black line-clamp-2 hover:text-gray-700 transition-colors">
              {post.title}
            </h2>
            <p className="mb-4 text-gray-600 leading-relaxed line-clamp-3">
              {post.content}
            </p>
          </div>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
            <Link
              to={`/edit/${post.id}`}
              className="flex items-center gap-2 text-black hover:text-gray-600 font-medium transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(post.id);
              }}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
