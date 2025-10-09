import React from "react";
import { X, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostModal({ post, onClose, onDelete }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-black">{post.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="p-6">
          {post.image && (
            <div className="mb-6 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={`http://localhost:5000${post.image}`}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
          )}

          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <Link
              to={`/edit/${post.id}`}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              onClick={onClose}
            >
              <Edit className="w-5 h-5" />
              <span>Edit Post</span>
            </Link>
            <button
              onClick={() => {
                onDelete(post.id);
                onClose();
              }}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
