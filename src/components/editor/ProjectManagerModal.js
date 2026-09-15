"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  FolderOpen,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useCanvas } from "@/context/CanvasContext";

export default function ProjectManagerModal() {
  const {
    canvasesList,
    currentCanvasId,
    loadCanvas,
    createNewCanvas,
    deleteCanvasDoc,
    isProjectModalOpen,
    setIsProjectModalOpen,
    refreshCanvasesList,
  } = useCanvas();

  const [searchQuery, setSearchQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  if (!isProjectModalOpen) return null;

  const filteredCanvases = canvasesList.filter((c) =>
    (c.title || "Untitled Canvas")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setIsCreating(true);
    try {
      await createNewCanvas(newTitle.trim());
      setNewTitle("");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this canvas?")) {
      setDeletingId(id);
      try {
        await deleteCanvasDoc(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#141722] border border-[#272d3e] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#242a3a] bg-[#11141e]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100">
                Canvas Projects
              </h2>
              <p className="text-xs text-zinc-400">
                Load, create, or manage your vector designs stored in MongoDB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsProjectModalOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & New Project Quick Form */}
        <div className="p-4 border-b border-[#242a3a] bg-[#161a26] flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1b2030] border border-[#2b3347] rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Create new canvas form */}
          <form
            onSubmit={handleCreate}
            className="flex items-center space-x-2 w-full sm:w-auto"
          >
            <input
              type="text"
              placeholder="New project title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full sm:w-48 bg-[#1b2030] border border-[#2b3347] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              disabled={isCreating || !newTitle.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </button>
          </form>
        </div>

        {/* Project List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 min-h-[260px]">
          {filteredCanvases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-500">
              <FolderOpen className="w-10 h-10 stroke-[1.5] text-zinc-600 mb-2" />
              <p className="font-semibold text-zinc-400 text-sm">
                No Canvas Projects Found
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {searchQuery
                  ? "Try searching with a different keyword."
                  : "Create a new project to get started."}
              </p>
            </div>
          ) : (
            filteredCanvases.map((canvas) => {
              const id = canvas._id || canvas.id;
              const isCurrent = id === currentCanvasId;
              const formattedDate = canvas.updatedAt
                ? new Date(canvas.updatedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Just now";

              return (
                <div
                  key={id}
                  onClick={() => loadCanvas(id)}
                  className={`group flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                    isCurrent
                      ? "bg-indigo-600/15 border-indigo-500/50 shadow-md shadow-indigo-500/10"
                      : "bg-[#191d2a] border-[#252b3d] hover:border-zinc-600 hover:bg-[#1f2434]"
                  }`}
                >
                  {/* Left Info */}
                  <div className="flex items-center space-x-3.5 truncate">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isCurrent
                          ? "bg-indigo-600 text-white"
                          : "bg-[#252b3d] text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      <Layers className="w-5 h-5" />
                    </div>

                    <div className="truncate">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-zinc-200 truncate">
                          {canvas.title || "Untitled Canvas"}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30 flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 text-[11px] text-zinc-500 mt-1">
                        <span className="font-mono">
                          {canvas.width || 1200} × {canvas.height || 800} px
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formattedDate}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-2 pl-3">
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, id)}
                      disabled={deletingId === id}
                      title="Delete canvas"
                      className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition opacity-80 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-[#242a3a] bg-[#11141e] flex items-center justify-between text-xs text-zinc-500">
          <span>{canvasesList.length} saved canvases in database</span>
          <button
            type="button"
            onClick={() => refreshCanvasesList()}
            className="hover:text-zinc-300 text-[11px] underline"
          >
            Refresh list
          </button>
        </div>
      </div>
    </div>
  );
}
