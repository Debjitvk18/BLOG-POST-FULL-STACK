import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import { fetchPosts, deletePost } from "../api/api";
import ToggleView from "./ToggleView";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("grid");
  const [selectedPost, setSelectedPost] = useState(null);

  const loadPosts = async () => {
    try {
      const res = await fetchPosts();
      // console.log(res.data)
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

  const handleViewPost = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
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
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-6"
        }
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onViewPost={handleViewPost}
            view={view}
          />
        ))}
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
