"use client";

import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Magnet,
} from "lucide-react";
import { useCanvas } from "@/context/CanvasContext";

export default function CanvasControls() {
  const { zoomScale, setZoomScale } = useCanvas();
  const [gridMode, setGridMode] = useState("dots");
  const [snapEnabled, setSnapEnabled] = useState(true);

  const zoomPercent = Math.round(zoomScale * 100);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(2.0, Math.round((prev + 0.1) * 100) / 100));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(0.3, Math.round((prev - 0.1) * 100) / 100));
  };

  const handleFitScreen = () => {
    setZoomScale(0.72);
  };

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#141721]/90 backdrop-blur-md border border-[#262b38] rounded-2xl px-3 py-1.5 flex items-center space-x-2 shadow-2xl z-20 select-none">
      {/* Zoom Controls */}
      <div className="flex items-center space-x-1 bg-[#1a1e2b] rounded-xl p-1 border border-[#2b3144]">
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out (Ctrl -)"
          className="p-1 rounded-lg hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-200 transition"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        
        <span className="text-xs font-semibold text-zinc-200 font-mono px-2 min-w-[48px] text-center">
          {zoomPercent}%
        </span>

        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In (Ctrl +)"
          className="p-1 rounded-lg hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-200 transition"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Divider */}
      <div className="w-[1px] h-4 bg-[#2e3447]"></div>

      {/* Fit to Screen */}
      <button
        type="button"
        onClick={handleFitScreen}
        title="Fit Canvas to Screen (Shift + 1)"
        className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition flex items-center space-x-1"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>

      {/* Toggle Grid */}
      <button
        type="button"
        onClick={() => setGridMode((prev) => (prev === "dots" ? "off" : "dots"))}
        title={`Grid Mode: ${gridMode}`}
        className={`p-1.5 rounded-xl transition ${
          gridMode !== "off"
            ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
            : "hover:bg-zinc-800 text-zinc-400"
        }`}
      >
        <Grid className="w-3.5 h-3.5" />
      </button>

      {/* Toggle Snapping */}
      <button
        type="button"
        onClick={() => setSnapEnabled((prev) => !prev)}
        title={snapEnabled ? "Snap to objects: On" : "Snap to objects: Off"}
        className={`p-1.5 rounded-xl transition ${
          snapEnabled
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : "hover:bg-zinc-800 text-zinc-400"
        }`}
      >
        <Magnet className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
