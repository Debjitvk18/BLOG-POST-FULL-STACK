import React from "react";
import PostList from "../components/PostList.jsx";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <PostList />
    </div>
  );
}
