"use client";

import React, { useState } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Sliders,
  Layers,
  Lock,
  RotateCw,
  CornerUpRight,
  Circle as CircleIcon,
  Type,
  Trash2,
  ChevronDown
} from "lucide-react";
import { useCanvas } from "@/context/CanvasContext";
import LayersPanel from "./LayersPanel";

export default function PropertiesPanel() {
  const [activeTab, setActiveTab] = useState("design");
  const { selectedElement, updateElement, deleteElement } = useCanvas();

  const handlePropChange = (key, value) => {
    if (!selectedElement) return;
    updateElement(selectedElement.id, { [key]: value });
  };

  const isCircle = selectedElement?.type === "circle";
  const isText = selectedElement?.type === "text";
  const isRect = selectedElement?.type === "rect";

  const elementWidth = isCircle
    ? (selectedElement.radius || 50) * 2
    : (selectedElement?.width || 200);
  const elementHeight = isCircle
    ? (selectedElement.radius || 50) * 2
    : isText
    ? (selectedElement?.fontSize || 32) * 1.5
    : (selectedElement?.height || 150);

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
      ) : !selectedElement ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-500 text-xs">
          <Sliders className="w-8 h-8 text-zinc-600 mb-2 stroke-[1.5]" />
          <p className="font-semibold text-zinc-400">No Element Selected</p>
          <p className="text-[11px] text-zinc-500 mt-1">
            Click on an element or use the toolbar to add shapes or text.
          </p>
        </div>
      ) : (
        /* Design Properties Inspector */
        <div className="flex-1 overflow-y-auto divide-y divide-[#242938] text-xs">
          {/* Section: Element Header & Actions */}
          <div className="p-3.5 flex items-center justify-between">
            <span className="font-semibold text-zinc-200 text-xs truncate">
              {selectedElement.name || (isText ? "Text Element" : isCircle ? "Circle" : "Rectangle")}
            </span>
            <button
              type="button"
              onClick={() => deleteElement(selectedElement.id)}
              title="Delete element"
              className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Section: Text Content (Only for Text elements) */}
          {isText && (
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center space-x-1">
                  <Type className="w-3 h-3 text-indigo-400" />
                  <span>Text Content</span>
                </span>
              </div>
              <textarea
                rows={3}
                value={selectedElement.text || ""}
                onChange={(e) => handlePropChange("text", e.target.value)}
                placeholder="Type your text here..."
                className="w-full bg-[#191d29] border border-[#262c3b] rounded-lg p-2.5 text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 resize-none font-sans leading-relaxed"
              />
            </div>
          )}

          {/* Section: Typography Settings (For Text elements) */}
          {isText && (
            <div className="p-3.5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                <span>Typography</span>
              </div>

              <div className="space-y-2">
                {/* Font Size & Weight */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2.5 py-1.5 focus-within:border-indigo-500">
                    <span className="text-zinc-500 font-mono text-[11px] w-8">Size</span>
                    <input
                      type="number"
                      min="8"
                      max="200"
                      value={selectedElement.fontSize || 32}
                      onChange={(e) => handlePropChange("fontSize", Math.max(8, Number(e.target.value)))}
                      className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-zinc-500 text-[10px] ml-0.5">px</span>
                  </div>

                  <select
                    value={selectedElement.fontStyle || "normal"}
                    onChange={(e) => handlePropChange("fontStyle", e.target.value)}
                    className="bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 text-zinc-200 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="normal" className="bg-[#141721]">Regular</option>
                    <option value="bold" className="bg-[#141721]">Bold</option>
                    <option value="italic" className="bg-[#141721]">Italic</option>
                    <option value="italic bold" className="bg-[#141721]">Bold Italic</option>
                  </select>
                </div>

                {/* Text Alignment */}
                <div className="grid grid-cols-3 gap-1 bg-[#191d29] p-1 rounded-lg border border-[#262c3b]">
                  <button
                    type="button"
                    onClick={() => handlePropChange("align", "left")}
                    title="Align Left"
                    className={`p-1.5 flex justify-center items-center rounded transition ${
                      (selectedElement.align || "left") === "left"
                        ? "bg-indigo-600/30 text-indigo-300"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePropChange("align", "center")}
                    title="Align Center"
                    className={`p-1.5 flex justify-center items-center rounded transition ${
                      selectedElement.align === "center"
                        ? "bg-indigo-600/30 text-indigo-300"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePropChange("align", "right")}
                    title="Align Right"
                    className={`p-1.5 flex justify-center items-center rounded transition ${
                      selectedElement.align === "right"
                        ? "bg-indigo-600/30 text-indigo-300"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section: Alignment */}
          <div className="p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Alignment</span>
            </div>
            <div className="grid grid-cols-6 gap-1 bg-[#191d29] p-1 rounded-lg border border-[#262c3b]">
              <button
                type="button"
                onClick={() => handlePropChange("x", isCircle ? selectedElement.radius : 0)}
                title="Align Left"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handlePropChange("x", isCircle ? 600 : Math.round((1200 - elementWidth) / 2))}
                title="Align Center Horizontal"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handlePropChange("x", isCircle ? 1200 - selectedElement.radius : 1200 - elementWidth)}
                title="Align Right"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handlePropChange("y", isCircle ? selectedElement.radius : 0)}
                title="Align Top"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignLeft className="w-3.5 h-3.5 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => handlePropChange("y", isCircle ? 400 : Math.round((800 - elementHeight) / 2))}
                title="Align Middle Vertical"
                className="p-1.5 flex justify-center items-center rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 transition"
              >
                <AlignCenter className="w-3.5 h-3.5 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => handlePropChange("y", isCircle ? 800 - selectedElement.radius : 800 - elementHeight)}
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
                  type="number"
                  value={Math.round(selectedElement.x ?? 0)}
                  onChange={(e) => handlePropChange("x", Number(e.target.value))}
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {/* Y position */}
              <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                <span className="text-zinc-500 font-mono text-[11px] w-4">Y</span>
                <input
                  type="number"
                  value={Math.round(selectedElement.y ?? 0)}
                  onChange={(e) => handlePropChange("y", Number(e.target.value))}
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {isCircle ? (
                /* Circle Radius */
                <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500 col-span-2">
                  <span className="text-zinc-500 font-mono text-[11px] w-12 flex items-center space-x-1">
                    <CircleIcon className="w-3 h-3 text-purple-400" />
                    <span>Rad</span>
                  </span>
                  <input
                    type="number"
                    value={Math.round(selectedElement.radius ?? 50)}
                    onChange={(e) => handlePropChange("radius", Math.max(5, Number(e.target.value)))}
                    className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-zinc-500 text-[10px] ml-0.5">px</span>
                </div>
              ) : isText ? (
                /* Text Box Width */
                <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                  <span className="text-zinc-500 font-mono text-[11px] w-4">W</span>
                  <input
                    type="number"
                    value={Math.round(selectedElement.width ?? 320)}
                    onChange={(e) => handlePropChange("width", Math.max(30, Number(e.target.value)))}
                    className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              ) : (
                <>
                  {/* Width */}
                  <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                    <span className="text-zinc-500 font-mono text-[11px] w-4">W</span>
                    <input
                      type="number"
                      value={Math.round(selectedElement.width ?? 100)}
                      onChange={(e) => handlePropChange("width", Math.max(10, Number(e.target.value)))}
                      className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>

                  {/* Height */}
                  <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                    <span className="text-zinc-500 font-mono text-[11px] w-4">H</span>
                    <input
                      type="number"
                      value={Math.round(selectedElement.height ?? 100)}
                      onChange={(e) => handlePropChange("height", Math.max(10, Number(e.target.value)))}
                      className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </>
              )}

              {/* Rotation */}
              <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                <RotateCw className="w-3 h-3 text-zinc-500 mr-1" />
                <input
                  type="number"
                  value={Math.round(selectedElement.rotation ?? 0)}
                  onChange={(e) => handlePropChange("rotation", Number(e.target.value))}
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-zinc-500 text-[10px] ml-0.5">°</span>
              </div>

              {/* Corner Radius (Only for Rectangles) */}
              {isRect && (
                <div className="flex items-center bg-[#191d29] border border-[#262c3b] rounded-lg px-2 py-1.5 focus-within:border-indigo-500">
                  <CornerUpRight className="w-3 h-3 text-zinc-500 mr-1" />
                  <input
                    type="number"
                    value={selectedElement.cornerRadius ?? 0}
                    onChange={(e) => handlePropChange("cornerRadius", Math.max(0, Number(e.target.value)))}
                    className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-zinc-500 text-[10px] ml-0.5">px</span>
                </div>
              )}
            </div>
          </div>

          {/* Section: Fill / Color */}
          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>{isText ? "Font Color" : "Fill"}</span>
            </div>

            <div className="flex items-center space-x-2 bg-[#191d29] border border-[#262c3b] rounded-lg p-1.5">
              <input
                type="color"
                value={selectedElement.fill || (isText ? "#ffffff" : "#6366f1")}
                onChange={(e) => handlePropChange("fill", e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={selectedElement.fill || (isText ? "#ffffff" : "#6366f1")}
                onChange={(e) => handlePropChange("fill", e.target.value)}
                className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none uppercase"
              />
            </div>
          </div>

          {/* Section: Stroke / Border (Only for shapes) */}
          {!isText && (
            <div className="p-3.5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                <span>Stroke</span>
              </div>

              <div className="flex items-center space-x-2 bg-[#191d29] border border-[#262c3b] rounded-lg p-1.5">
                <input
                  type="color"
                  value={selectedElement.stroke || "#818cf8"}
                  onChange={(e) => handlePropChange("stroke", e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={selectedElement.stroke || "#818cf8"}
                  onChange={(e) => handlePropChange("stroke", e.target.value)}
                  className="w-full bg-transparent text-zinc-200 font-mono text-xs focus:outline-none uppercase"
                />
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={selectedElement.strokeWidth ?? 2}
                  onChange={(e) => handlePropChange("strokeWidth", Number(e.target.value))}
                  className="w-12 bg-zinc-800/80 rounded px-1.5 py-0.5 text-zinc-300 font-mono text-[11px] text-right"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
