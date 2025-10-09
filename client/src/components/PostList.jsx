import React, { useState, useEffect } from "react";
import PostCard from "./PostCard.jsx";
import { fetchPosts, deletePost } from "../api/api.js";
import ToggleView from "./ToggleView.jsx";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("grid");

  const loadPosts = async () => {
    try {
      const res = await fetchPosts();
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        setPosts(posts.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Error deleting post:", err);
      }
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <ToggleView view={view} setView={setView} />
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
