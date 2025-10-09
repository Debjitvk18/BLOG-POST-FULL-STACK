import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">My Blog</Link>
        </h1>
        <nav>
          <Link to="/" className="mr-4 hover:underline">
            Home
          </Link>
          <Link to="/create" className="hover:underline">
            Create Post
          </Link>
        </nav>
      </div>
    </header>
  );
}
