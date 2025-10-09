import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import { fetchPosts, deletePost } from "../api/api";
import ToggleView from "./ToggleView";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("grid");
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = async () => {
    try {
      const res = await fetchPosts(page, 6);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    try {
      await deletePost(id);

      // After deletion, reload posts
      const res = await fetchPosts(page, 6);
      const newPosts = res.data.posts;
      const newTotalPages = res.data.totalPages;

      // If page becomes empty and not the first page, go back one page
      if (newPosts.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        setPosts(newPosts);
        setTotalPages(newTotalPages);
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }
};


  const handleViewPost = (post) => setSelectedPost(post);
  const handleCloseModal = () => setSelectedPost(null);

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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
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
