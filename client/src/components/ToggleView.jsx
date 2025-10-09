import React from "react";

export default function ToggleView({ view, setView }) {
  return (
    <div className="mb-4">
      <button
        onClick={() => setView("grid")}
        className={`mr-2 px-2 py-1 ${
          view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Grid
      </button>
      <button
        onClick={() => setView("list")}
        className={`px-2 py-1 ${
          view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        List
      </button>
    </div>
  );
}
