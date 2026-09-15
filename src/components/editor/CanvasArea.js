"use client";

import React from "react";
import CanvasControls from "./CanvasControls";
import { Sparkles, ArrowRight, Zap, Star } from "lucide-react";

export default function CanvasArea() {
  return (
    <main className="flex-1 h-full relative overflow-hidden bg-[#0c0e14] flex flex-col justify-center items-center select-none">
      {/* Canvas Grid Background */}
      <div className="absolute inset-0 canvas-grid-dots opacity-40 pointer-events-none"></div>

      {/* Top Left Dimension & Scale Info */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <div className="px-2.5 py-1 rounded-md bg-[#141721]/80 backdrop-blur border border-[#242938] text-[11px] font-mono text-zinc-400">
          Artboard 1 <span className="text-zinc-600">•</span> 1200 × 800 px
        </div>
      </div>

      {/* Canvas Artboard Viewport */}
      <div className="relative w-[85%] max-w-[1000px] aspect-[16/10] bg-[#12151f] rounded-xl border border-[#262c3e] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden transition-all">
        {/* Artboard Content Mockup */}
        <div className="relative w-full h-full p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#12151f] via-[#151926] to-[#0e111a]">
          {/* Decorative Background Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Bar of Canvas Content */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight text-white">NovaPulse</span>
            </div>
            <div className="flex items-center space-x-4 text-xs font-medium text-zinc-400">
              <span className="text-zinc-200">Features</span>
              <span>Solutions</span>
              <span>Pricing</span>
              <button
                type="button"
                className="px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Center: Selected Element with Bounding Box & Transform Handles */}
          <div className="relative my-auto z-10 self-center text-center max-w-xl">
            {/* Selected Element Bounding Box */}
            <div className="relative p-4 border-2 border-indigo-500 rounded-lg group cursor-move">
              {/* Transform Handles: 4 Corners */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-sm shadow-sm"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-sm shadow-sm"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-sm shadow-sm"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-sm shadow-sm"></div>

              {/* Edge Handles */}
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-indigo-600 rounded-sm"></div>
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-indigo-600 rounded-sm"></div>
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-indigo-600 rounded-sm"></div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-indigo-600 rounded-sm"></div>

              {/* Rotation Handle */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full border border-white"></div>
                <div className="w-[1.5px] h-4.5 bg-indigo-500"></div>
              </div>

              {/* Tag / Size Badge */}
              <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-indigo-600 text-[10px] font-mono font-semibold text-white rounded shadow">
                Text Layer • 640 × 120
              </div>

              {/* Selected Layer Typography */}
              <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Next-Gen Cloud Canvas
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Design faster with modern modular workflows
              </h1>
            </div>

            {/* Subtitle & CTA button */}
            <p className="text-xs sm:text-sm text-zinc-400 mt-4 max-w-md mx-auto">
              Build high-performance graphics, vectors, and layouts with real-time feedback.
            </p>

            <div className="flex items-center justify-center space-x-3 mt-6">
              <div className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 cursor-pointer hover:bg-indigo-500 transition">
                <span>Start Designing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="px-5 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer hover:bg-zinc-700 transition">
                Explore Templates
              </div>
            </div>
          </div>

          {/* Bottom Card Mockups in Canvas */}
          <div className="grid grid-cols-3 gap-4 z-10 pt-4">
            <div className="p-3 rounded-xl bg-[#1a1f2e]/60 border border-[#2b3347]/50 backdrop-blur">
              <div className="text-[11px] font-semibold text-zinc-200">Vector Engine</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Pixel perfect paths</div>
            </div>
            <div className="p-3 rounded-xl bg-[#1a1f2e]/60 border border-[#2b3347]/50 backdrop-blur">
              <div className="text-[11px] font-semibold text-zinc-200">Live Components</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Reusable design tokens</div>
            </div>
            <div className="p-3 rounded-xl bg-[#1a1f2e]/60 border border-[#2b3347]/50 backdrop-blur">
              <div className="text-[11px] font-semibold text-zinc-200">Export Multi-Format</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">SVG, PNG & JSON</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Canvas Controls at bottom */}
      <CanvasControls />
    </main>
  );
}

