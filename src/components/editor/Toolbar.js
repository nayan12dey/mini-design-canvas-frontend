"use client";

import React, { useState } from "react";
import {
  MousePointer2,
  Hand,
  Square,
  Circle,
  Triangle,
  Type,
  PenTool,
  Image as ImageIcon,
  Eraser,
  Minus,
  ArrowUpRight,
  Star,
  Sparkles,
  Layers,
  Palette
} from "lucide-react";

export default function Toolbar() {
  const [activeTool, setActiveTool] = useState("select");

  const primaryTools = [
    { id: "select", name: "Select Tool", icon: MousePointer2, shortcut: "V" },
    { id: "hand", name: "Pan Tool", icon: Hand, shortcut: "H" },
  ];

  const shapeTools = [
    { id: "rect", name: "Rectangle", icon: Square, shortcut: "R" },
    { id: "circle", name: "Circle / Ellipse", icon: Circle, shortcut: "O" },
    { id: "triangle", name: "Triangle", icon: Triangle, shortcut: "Y" },
    { id: "line", name: "Line", icon: Minus, shortcut: "L" },
    { id: "arrow", name: "Arrow", icon: ArrowUpRight, shortcut: "A" },
    { id: "star", name: "Star", icon: Star, shortcut: "S" },
  ];

  const contentTools = [
    { id: "text", name: "Text", icon: Type, shortcut: "T" },
    { id: "draw", name: "Pen / Pencil", icon: PenTool, shortcut: "P" },
    { id: "image", name: "Upload Image", icon: ImageIcon, shortcut: "I" },
    { id: "eraser", name: "Eraser", icon: Eraser, shortcut: "E" },
  ];

  return (
    <aside className="w-16 bg-[#141721] border-r border-[#242938] flex flex-col items-center py-3.5 justify-between select-none z-10">
      {/* Top Tool Groups */}
      <div className="flex flex-col items-center space-y-4 w-full px-2">
        {/* Selection & Pan */}
        <div className="flex flex-col items-center space-y-1 w-full">
          {primaryTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                title={`${tool.name} (${tool.shortcut})`}
                className={`relative group w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/40"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-[#1f2433]"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
                
                {/* Tooltip */}
                <div className="absolute left-14 ml-2 px-2.5 py-1 bg-zinc-900 text-zinc-200 text-xs font-medium rounded-md shadow-xl border border-zinc-700/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center space-x-2">
                  <span>{tool.name}</span>
                  <kbd className="px-1.5 py-0.5 bg-zinc-800 text-[10px] text-zinc-400 rounded border border-zinc-700">
                    {tool.shortcut}
                  </kbd>
                </div>
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="w-8 h-[1px] bg-[#242938]"></div>

        {/* Shapes Group */}
        <div className="flex flex-col items-center space-y-1 w-full">
          {shapeTools.slice(0, 3).map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                title={`${tool.name} (${tool.shortcut})`}
                className={`relative group w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/40"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-[#1f2433]"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
                <div className="absolute left-14 ml-2 px-2.5 py-1 bg-zinc-900 text-zinc-200 text-xs font-medium rounded-md shadow-xl border border-zinc-700/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center space-x-2">
                  <span>{tool.name}</span>
                  <kbd className="px-1.5 py-0.5 bg-zinc-800 text-[10px] text-zinc-400 rounded border border-zinc-700">
                    {tool.shortcut}
                  </kbd>
                </div>
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="w-8 h-[1px] bg-[#242938]"></div>

        {/* Content & Media Tools */}
        <div className="flex flex-col items-center space-y-1 w-full">
          {contentTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                title={`${tool.name} (${tool.shortcut})`}
                className={`relative group w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/40"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-[#1f2433]"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
                <div className="absolute left-14 ml-2 px-2.5 py-1 bg-zinc-900 text-zinc-200 text-xs font-medium rounded-md shadow-xl border border-zinc-700/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center space-x-2">
                  <span>{tool.name}</span>
                  <kbd className="px-1.5 py-0.5 bg-zinc-800 text-[10px] text-zinc-400 rounded border border-zinc-700">
                    {tool.shortcut}
                  </kbd>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Color Swatches / Status */}
      <div className="flex flex-col items-center space-y-2 pt-2 border-t border-[#242938] w-full px-2">
        <div
          title="Active Fill Color"
          className="w-7 h-7 rounded-lg bg-indigo-500 border-2 border-white/20 shadow cursor-pointer hover:scale-110 transition"
        ></div>
        <div
          title="Active Stroke Color"
          className="w-5 h-5 rounded-md border-2 border-indigo-400 bg-transparent cursor-pointer hover:scale-110 transition"
        ></div>
      </div>
    </aside>
  );
}
