"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useCanvas } from "@/context/CanvasContext";
import CanvasControls from "./CanvasControls";
import { Loader2 } from "lucide-react";

// Dynamically import KonvaStage to ensure client-only rendering with SSR disabled
const KonvaStage = dynamic(() => import("./KonvaStage"), {
  ssr: false,
  loading: () => (
    <div className="w-[864px] h-[576px] rounded-xl bg-[#12151f] border border-[#262c3e] flex flex-col items-center justify-center space-y-3 text-zinc-400">
      <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
      <span className="text-xs font-medium">Initializing Konva Canvas...</span>
    </div>
  ),
});

export default function CanvasArea() {
  const { zoomScale } = useCanvas();

  return (
    <main className="flex-1 h-full relative overflow-hidden bg-[#0c0e14] flex flex-col justify-center items-center select-none">
      {/* Canvas Grid Background */}
      <div className="absolute inset-0 canvas-grid-dots opacity-40 pointer-events-none"></div>

      {/* Top Left Dimension & Scale Info */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <div className="px-2.5 py-1 rounded-md bg-[#141721]/90 backdrop-blur border border-[#242938] text-[11px] font-mono text-zinc-400 shadow-md">
          Artboard 1 <span className="text-zinc-600">•</span> 1200 × 800 px
        </div>
      </div>

      {/* Konva Canvas Stage Container */}
      <div className="relative z-10 flex items-center justify-center p-4 overflow-auto max-w-full max-h-full">
        <KonvaStage width={1200} height={800} scale={zoomScale} />
      </div>

      {/* Floating Canvas Controls at bottom */}
      <CanvasControls />
    </main>
  );
}
