"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Type,
  Square,
  Circle,
  Image as ImageIcon,
  Folder,
  ChevronDown,
  ChevronRight,
  GripVertical
} from "lucide-react";

export default function LayersPanel() {
  const [layers, setLayers] = useState([
    {
      id: "1",
      name: "Hero Title Heading",
      type: "text",
      visible: true,
      locked: false,
      selected: true,
    },
    {
      id: "2",
      name: "Primary CTA Button",
      type: "group",
      visible: true,
      locked: false,
      selected: false,
    },
    {
      id: "3",
      name: "Product Mockup Card",
      type: "rect",
      visible: true,
      locked: false,
      selected: false,
    },
    {
      id: "4",
      name: "Gradient Backdrop Blur",
      type: "circle",
      visible: true,
      locked: true,
      selected: false,
    },
    {
      id: "5",
      name: "Brand Logo SVG",
      type: "image",
      visible: true,
      locked: false,
      selected: false,
    },
  ]);

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
          {layers.length} items
        </span>
      </div>

      {/* Layer Tree List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition ${
              layer.selected
                ? "bg-indigo-600/20 text-indigo-200 border border-indigo-500/40"
                : "hover:bg-[#1f2433] text-zinc-300"
            }`}
          >
            {/* Left: Drag grip & Icon & Name */}
            <div className="flex items-center space-x-2 truncate">
              <GripVertical className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
              <div className="flex-shrink-0">{getLayerIcon(layer.type)}</div>
              <span className="truncate font-medium text-xs">{layer.name}</span>
            </div>

            {/* Right: Visibility & Lock toggles */}
            <div className="flex items-center space-x-1 opacity-60 group-hover:opacity-100 transition">
              <button
                type="button"
                className="p-1 hover:text-white rounded hover:bg-zinc-700/50"
              >
                {layer.visible ? (
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-zinc-600" />
                )}
              </button>
              <button
                type="button"
                className="p-1 hover:text-white rounded hover:bg-zinc-700/50"
              >
                {layer.locked ? (
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
