"use client";

import React, { useState, useEffect } from "react";
import {
  Undo2,
  Redo2,
  Share2,
  Download,
  Play,
  ChevronDown,
  Sparkles,
  Save,
  FolderOpen,
  Check,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useCanvas } from "@/context/CanvasContext";
import ProjectManagerModal from "./ProjectManagerModal";

export default function EditorHeader() {
  const {
    canvasTitle,
    setCanvasTitle,
    saveStatus,
    isSaving,
    saveCanvas,
    setIsProjectModalOpen,
    canvasesList,
  } = useCanvas();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [localTitle, setLocalTitle] = useState(canvasTitle);

  useEffect(() => {
    setLocalTitle(canvasTitle);
  }, [canvasTitle]);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (localTitle.trim() && localTitle !== canvasTitle) {
      setCanvasTitle(localTitle.trim());
      saveCanvas(localTitle.trim());
    }
  };

  // Keyboard shortcut: Ctrl+S to save
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveCanvas();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveCanvas]);

  return (
    <>
      <header className="h-14 bg-[#141721] border-b border-[#242938] px-4 flex items-center justify-between z-20 select-none">
        {/* Left Section: Brand, Project Name & Projects Modal Trigger */}
        <div className="flex items-center space-x-3">
          {/* App Logo */}
          <div className="flex items-center space-x-2.5 pr-2 border-r border-[#242938]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent hidden sm:inline-block">
              CanvasStudio
            </span>
          </div>

          {/* Project Switcher & Title */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(true)}
              title="Open Project Manager"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a1e2b] hover:bg-[#23293a] text-zinc-300 hover:text-white border border-[#293043] transition text-xs font-semibold"
            >
              <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Projects</span>
              <span className="px-1.5 py-0.2 bg-zinc-800 text-[10px] text-zinc-400 rounded-full font-mono">
                {canvasesList.length}
              </span>
            </button>

            {/* Editable Title Input */}
            {isEditingTitle ? (
              <input
                type="text"
                autoFocus
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleTitleSubmit();
                  if (e.key === "Escape") {
                    setLocalTitle(canvasTitle);
                    setIsEditingTitle(false);
                  }
                }}
                className="bg-[#1a1e2b] border border-indigo-500 text-xs font-semibold text-zinc-100 px-2 py-1 rounded-md focus:outline-none max-w-[200px]"
              />
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                title="Click to rename canvas"
                className="group flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-zinc-800/60 transition cursor-pointer max-w-[220px]"
              >
                <span className="text-xs font-semibold text-zinc-200 truncate">
                  {canvasTitle}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 opacity-60 group-hover:opacity-100 flex-shrink-0" />
              </div>
            )}

            {/* Save Status Badge */}
            <div
              onClick={() => saveStatus === "unsaved" && saveCanvas()}
              className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition cursor-pointer ${
                saveStatus === "saving"
                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                  : saveStatus === "saved"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : saveStatus === "unsaved"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              {saveStatus === "saving" && (
                <>
                  <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                  <span>Saving...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Saved</span>
                </>
              )}
              {saveStatus === "unsaved" && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Unsaved changes</span>
                </>
              )}
              {saveStatus === "error" && (
                <>
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  <span>Save error</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Center Section: History & Dimensions */}
        <div className="hidden lg:flex items-center space-x-1 bg-[#1c202d] p-1 rounded-lg border border-[#2a3042]">
          <button
            type="button"
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-md hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-md hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-zinc-700 mx-1"></div>
          <div className="text-xs text-zinc-400 px-2 font-mono">1200 × 800</div>
        </div>

        {/* Right Section: Actions & Save Button */}
        <div className="flex items-center space-x-2">
          {/* Explicit Save Button */}
          <button
            type="button"
            onClick={() => saveCanvas()}
            disabled={isSaving}
            title="Save to MongoDB (Ctrl+S)"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1c202d] hover:bg-[#252b3d] text-zinc-200 hover:text-white text-xs font-semibold border border-[#2a3042] transition shadow-sm"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            ) : (
              <Save className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span>Save</span>
          </button>

          {/* Preview Button */}
          <button
            type="button"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1c202d] hover:bg-[#252b3d] text-zinc-300 hover:text-white text-xs font-medium border border-[#2a3042] transition shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current text-indigo-400" />
            <span>Preview</span>
          </button>

          {/* Primary Export Button */}
          <button
            type="button"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* User Avatar */}
          <div className="pl-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 border-2 border-[#141721] flex items-center justify-center text-[11px] font-bold text-white shadow">
              ND
            </div>
          </div>
        </div>
      </header>

      {/* Project Manager Modal */}
      <ProjectManagerModal />
    </>
  );
}
