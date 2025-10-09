import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";

export default function PostForm({ initialData, onSubmit }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(null); // new image file
  const [preview, setPreview] = useState(initialData?.image || null); // for existing or new image preview

  // Update preview if a new image is selected
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      // Clean up the object URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image); // only append if a new image is selected
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200"
    >
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Content
        </label>
        <textarea
          placeholder="Write your post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
          rows={8}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Image
        </label>
        {preview && (
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={preview.startsWith("http") ? preview : `http://localhost:5000${preview}`}
              alt="Post"
              className="w-full h-auto max-h-64 object-contain"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border border-slate-300 p-3 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-3 rounded-lg hover:from-slate-800 hover:to-slate-950 transition-all font-semibold shadow-md hover:shadow-lg"
      >
        Submit Post
      </button>
    </form>
  );
}
