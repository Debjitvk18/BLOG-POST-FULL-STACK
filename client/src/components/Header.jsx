import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700">
      <div className="container mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <BookOpen className="w-7 h-7" />
              <span>My Blog</span>
            </Link>
          </h1>
          <nav className="flex gap-6">
            <Link
              to="/"
              className="text-slate-200 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Create Post
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
