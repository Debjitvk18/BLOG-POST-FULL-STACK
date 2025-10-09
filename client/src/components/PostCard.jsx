import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

export default function PostCard({ post, onDelete, view = "grid" }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 flex ${
        view === "list" ? "flex-col sm:flex-row gap-0" : "flex-col"
      }`}
    >
      {post.image && (
        <div
          className={`${
            view === "list"
              ? "w-full sm:w-64 h-64 flex-shrink-0"
              : "w-full h-56"
          } overflow-hidden bg-slate-100`}
        >
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col p-6">
        <h2 className="font-bold text-xl mb-3 text-slate-900 line-clamp-2">
          {post.title}
        </h2>
        <p className="flex-1 mb-4 text-slate-600 leading-relaxed line-clamp-3">
          {post.content}
        </p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
          <Link
            to={`/edit/${post.id}`}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
          <button
            onClick={() => onDelete(post.id)}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
