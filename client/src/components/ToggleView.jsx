import React from "react";
import { Grid, List } from "lucide-react";

export default function ToggleView({ view, setView }) {
  return (
    <div className="mb-6 flex gap-3">
      <button
        onClick={() => setView("grid")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          view === "grid"
            ? "bg-slate-900 text-white shadow-md"
            : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
        }`}
      >
        <Grid className="w-4 h-4" />
        <span>Grid</span>
      </button>
      <button
        onClick={() => setView("list")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          view === "list"
            ? "bg-slate-900 text-white shadow-md"
            : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
        }`}
      >
        <List className="w-4 h-4" />
        <span>List</span>
      </button>
    </div>
  );
}
