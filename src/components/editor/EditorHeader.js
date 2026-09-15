"use client";

import React from "react";
import {
  Undo2,
  Redo2,
  CloudCheck,
  Share2,
  Download,
  Play,
  Layers,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  FolderOpen
} from "lucide-react";

export default function EditorHeader() {
  return (
    <header className="h-14 bg-[#141721] border-b border-[#242938] px-4 flex items-center justify-between z-20 select-none">
      {/* Left Section: Brand, Project Name & Breadcrumb */}
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

        {/* Project Title & Status */}
        <div className="flex items-center space-x-2">
          <div className="group flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-zinc-800/60 transition cursor-pointer">
            <span className="text-xs font-semibold text-zinc-200">
              Modern SaaS Hero Banner
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 opacity-70 group-hover:opacity-100" />
          </div>

          <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Saved</span>
          </div>
        </div>
      </div>

      {/* Center Section: History Controls */}
      <div className="hidden md:flex items-center space-x-1 bg-[#1c202d] p-1 rounded-lg border border-[#2a3042]">
        <button
          type="button"
          title="Undo (Ctrl+Z)"
          className="p-1.5 rounded-md hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition disabled:opacity-40"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          title="Redo (Ctrl+Y)"
          className="p-1.5 rounded-md hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition disabled:opacity-40"
        >
          <Redo2 className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-zinc-700 mx-1"></div>
        <div className="text-xs text-zinc-400 px-2 font-mono">1200 × 800</div>
      </div>

      {/* Right Section: Actions & Export */}
      <div className="flex items-center space-x-2">
        {/* Preview Button */}
        <button
          type="button"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1c202d] hover:bg-[#252b3d] text-zinc-300 hover:text-white text-xs font-medium border border-[#2a3042] transition shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-current text-indigo-400" />
          <span className="hidden sm:inline">Preview</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1c202d] hover:bg-[#252b3d] text-zinc-300 hover:text-white text-xs font-medium border border-[#2a3042] transition shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* Primary Export Button */}
        <button
          type="button"
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-80" />
        </button>

        {/* User Avatar */}
        <div className="pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 border-2 border-[#141721] flex items-center justify-center text-[11px] font-bold text-white shadow">
            ND
          </div>
        </div>
      </div>
    </header>
  );
}
