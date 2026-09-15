"use client";

import React, { useState } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AlignVerticalSpaceAround,
  AlignHorizontalSpaceAround,
  Layers,
  Sliders,
  Sparkles,
  Lock,
  Unlock,
  RotateCw,
  CornerUpRight,
  Eye,
  Plus,
  Trash2,
  Palette,
  ChevronDown
} from "lucide-react";
import LayersPanel from "./LayersPanel";

export default function PropertiesPanel() {
  const [activeTab, setActiveTab] = useState("design"); // "design" | "layers"

  return (
    <aside className="w-80 bg-[#141721] border-l border-[#242938] flex flex-col h-full select-none z-10">
      {/* Top Sidebar Tab Switcher */}
      <div className="flex border-b border-[#242938] p-1 bg-[#10131c]">
        <button
          type="button"
          onClick={() => setActiveTab("design")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition flex items-center justify-center space-x-1.5 ${
            activeTab === "design"
              ? "bg-[#1c202e] text-zinc-100 shadow-sm border border-[#2b3245]"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Design</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("layers")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition flex items-center justify-center space-x-1.5 ${
            activeTab === "layers"
              ? "bg-[#1c202e] text-zinc-100 shadow-sm border border-[#2b3245]"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layers</span>
        </button>
      </div>

      {activeTab === "layers" ? (
        <LayersPanel />
      ) : (
        /* Design Properties Inspector */
        <div className="flex-1 overflow-y-auto divide-y divide-[#242938] text-xs">
          {/* Section: Alignment */}
          <div className="p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Alignment</span>
            </div>
            <div className="grid grid-cols-6 gap-1 bg-[#191d29] p-1 rounded-lg border border-[#262c3b]">
              <button
                type="button"
                title="Align Left"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Align Center Horizontal"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Align Right"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Align Top"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignLeft className="w-3.5 h-3.5 rotate-90" />
              </button>
              <button
                type="button"
                title="Align Middle Vertical"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignCenter className="w-3.5 h-3.5 rotate-90" />
              </button>
              <button
                type="button"
                title="Align Bottom"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignRight className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          </div>

          {/* Section: Position & Dimensions (Transform) */}
          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Layout & Transform</span>
              <button
                type="button"
                title="Constrain proportions"
                className="text-zinc-400 hover:text-zinc-200"
              >
                <Lock className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* X position */}
              <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                <span className="text-zinc-500 font-mono text-[11px] w-4">X</span>
                <input
                  type="text"
                  defaultValue="180"
                  readOnly
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right"
                />
              </div>

              {/* Y position */}
              <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                <span className="text-zinc-500 font-mono text-[11px] w-4">Y</span>
                <input
                  type="text"
                  defaultValue="240"
                  readOnly
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right"
                />
              </div>

              {/* Width */}
              <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                <span className="text-zinc-500 font-mono text-[11px] w-4">W</span>
                <input
                  type="text"
                  defaultValue="640"
                  readOnly
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right"
                />
              </div>

              {/* Height */}
              <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                <span className="text-zinc-500 font-mono text-[11px] w-4">H</span>
                <input
                  type="text"
                  defaultValue="120"
                  readOnly
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right"
                />
              </div>

              {/* Rotation */}
              <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                <RotateCw className="w-3 h-3 text-zinc-500 mr-1" />
                <input
                  type="text"
                  defaultValue="0°"
                  readOnly
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right"
                />
              </div>

              {/* Corner Radius */}
              <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                <CornerUpRight className="w-3 h-3 text-zinc-500 mr-1" />
                <input
                  type="text"
                  defaultValue="12px"
                  readOnly
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right"
                />
              </div>
            </div>
          </div>

          {/* Section: Typography */}
          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Typography</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between bg-[#191d29] border border-[#262c3b] rounded-lg px-2.5 py-1.5">
                <span className="text-zinc-200 font-medium truncate">Inter</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between bg-[#191d29] border border-[#262c3b] rounded-lg px-2.5 py-1.5">
                  <span className="text-zinc-300">Bold (700)</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </div>
                <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2.5 py-1.5">
                  <span className="text-zinc-500 font-mono text-[11px]">Size</span>
                  <input
                    type="text"
                    defaultValue="48px"
                    readOnly
                    className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Fill */}
          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Fill</span>
              <button
                type="button"
                className="text-zinc-400 hover:text-zinc-200 p-0.5 rounded hover:bg-zinc-800"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-[#191d29] border border-[#262c3b] rounded-lg p-1.5">
              <div className="w-6 h-6 rounded-md bg-indigo-500 border border-white/20 shadow-inner flex-shrink-0"></div>
              <input
                type="text"
                defaultValue="#6366F1"
                readOnly
                className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none uppercase"
              />
              <span className="text-zinc-400 font-mono text-[11px] pr-1">100%</span>
            </div>
          </div>

          {/* Section: Stroke / Border */}
          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Stroke</span>
              <button
                type="button"
                className="text-zinc-400 hover:text-zinc-200 p-0.5 rounded hover:bg-zinc-800"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-[#191d29] border border-[#262c3b] rounded-lg p-1.5">
              <div className="w-6 h-6 rounded-md border-2 border-indigo-400 bg-transparent flex-shrink-0"></div>
              <input
                type="text"
                defaultValue="#818CF8"
                readOnly
                className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none uppercase"
              />
              <span className="text-zinc-400 font-mono text-[11px] pr-1">2px</span>
            </div>
          </div>

          {/* Section: Effects & Opacity */}
          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Effects</span>
              <button
                type="button"
                className="text-zinc-400 hover:text-zinc-200 p-0.5 rounded hover:bg-zinc-800"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between bg-[#191d29] border border-[#262c3b] rounded-lg px-2.5 py-1.5">
                <span className="text-zinc-300">Drop Shadow</span>
                <span className="text-[11px] text-zinc-500 font-mono">0 8 24 #000</span>
              </div>
              <div className="flex items-center justify-between bg-[#191d29] border border-[#262c3b] rounded-lg px-2.5 py-1.5">
                <span className="text-zinc-300">Layer Opacity</span>
                <span className="text-[11px] text-zinc-400 font-mono">100%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
