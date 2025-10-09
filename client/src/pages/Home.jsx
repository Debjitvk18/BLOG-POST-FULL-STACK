import React from "react";
import PostList from "../components/PostList";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-900">All Posts</h1>
      <PostList />
    </div>
  );
}
