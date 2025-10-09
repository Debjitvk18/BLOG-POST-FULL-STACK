import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EditPost from "./pages/EditPost.jsx";
import Header from "./components/Header.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostList from "./components/PostList.jsx";
import PostPage from "./pages/PostPage.jsx"; // new full-page post view

export default function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Home or main feed */}
          <Route path="/" element={<Home />} />

          {/* Post list page if needed */}
          <Route path="/posts" element={<PostList />} />

          {/* Create and edit posts */}
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />

          {/* Full page single post view */}
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}
