"use client";

import React from "react";
import {
  Square,
  Circle,
  Type,
  Image as ImageIcon,
  Folder,
  Trash2
} from "lucide-react";
import { useCanvas } from "@/context/CanvasContext";

export default function LayersPanel() {
  const { elements, selectedId, selectElement, deleteElement } = useCanvas();

  const getLayerIcon = (type) => {
    switch (type) {
      case "text":
        return <Type className="w-3.5 h-3.5 text-blue-400" />;
      case "rect":
        return <Square className="w-3.5 h-3.5 text-indigo-400" />;
      case "circle":
        return <Circle className="w-3.5 h-3.5 text-purple-400" />;
      case "image":
        return <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />;
      case "group":
        return <Folder className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Square className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden text-xs select-none">
      {/* Search / Filter layer header */}
      <div className="p-3 border-b border-[#242938] flex items-center justify-between">
        <span className="font-semibold text-zinc-300">Canvas Layers</span>
        <span className="text-[11px] text-zinc-500 font-mono">
          {elements.length} items
        </span>
      </div>

      {/* Layer Tree List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        {elements.length === 0 ? (
          <div className="p-4 text-center text-zinc-500 text-xs">
            No layers yet. Click Rectangle on the toolbar to add.
          </div>
        ) : (
          elements.map((el) => {
            const isSelected = el.id === selectedId;
            return (
              <div
                key={el.id}
                onClick={() => selectElement(el.id)}
                className={`group flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition ${
                  isSelected
                    ? "bg-indigo-600/20 text-indigo-200 border border-indigo-500/40"
                    : "hover:bg-[#1f2433] text-zinc-300"
                }`}
              >
                {/* Left: Icon & Name */}
                <div className="flex items-center space-x-2 truncate">
                  <div className="flex-shrink-0">{getLayerIcon(el.type)}</div>
                  <span className="truncate font-medium text-xs">
                    {el.name || `${el.type} (${Math.round(el.width)}×${Math.round(el.height)})`}
                  </span>
                </div>

                {/* Right: Delete button on hover */}
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(el.id);
                    }}
                    title="Delete layer"
                    className="p-1 hover:text-red-400 rounded hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
