"use client";

import React from "react";
import { CanvasProvider } from "@/context/CanvasContext";
import EditorHeader from "./EditorHeader";
import Toolbar from "./Toolbar";
import CanvasArea from "./CanvasArea";
import PropertiesPanel from "./PropertiesPanel";

export default function CanvasEditorLayout() {
  return (
    <CanvasProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0f1117] text-zinc-100 antialiased select-none font-sans">
        {/* Top Header / Navigation Bar */}
        <EditorHeader />

        {/* Main Workspace Layout */}
        <div className="flex flex-1 h-[calc(100vh-3.5rem)] overflow-hidden">
          {/* Left Toolbar */}
          <Toolbar />

          {/* Central Canvas Viewport */}
          <CanvasArea />

          {/* Right Properties & Layers Panel */}
          <PropertiesPanel />
        </div>
      </div>
    </CanvasProvider>
  );
}
