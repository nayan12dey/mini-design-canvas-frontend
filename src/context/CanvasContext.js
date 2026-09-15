"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const CanvasContext = createContext(null);

export function CanvasProvider({ children }) {
  // Elements on the Konva canvas
  const [elements, setElements] = useState([
    {
      id: "rect-initial",
      type: "rect",
      name: "Rectangle 1",
      x: 460,
      y: 280,
      width: 280,
      height: 180,
      fill: "#6366f1",
      stroke: "#818cf8",
      strokeWidth: 2,
      cornerRadius: 12,
      rotation: 0,
      opacity: 1,
      draggable: true,
    },
  ]);

  // Selected element ID
  const [selectedId, setSelectedId] = useState("rect-initial");
  
  // Active tool state
  const [activeTool, setActiveTool] = useState("select");

  // Zoom scale for viewport
  const [zoomScale, setZoomScale] = useState(0.72);

  // Add a new Rectangle to canvas state
  const addRectangle = useCallback((customProps = {}) => {
    const rectCount = elements.filter((e) => e.type === "rect").length + 1;
    const newRect = {
      id: `rect-${Date.now()}`,
      type: "rect",
      name: `Rectangle ${rectCount}`,
      x: 350 + (elements.length * 30) % 300,
      y: 200 + (elements.length * 30) % 200,
      width: 240,
      height: 160,
      fill: "#6366f1",
      stroke: "#818cf8",
      strokeWidth: 2,
      cornerRadius: 8,
      rotation: 0,
      opacity: 1,
      draggable: true,
      ...customProps,
    };

    setElements((prev) => [...prev, newRect]);
    setSelectedId(newRect.id);
    setActiveTool("select");
    return newRect;
  }, [elements]);

  // Add a new Circle to canvas state
  const addCircle = useCallback((customProps = {}) => {
    const circleCount = elements.filter((e) => e.type === "circle").length + 1;
    const newCircle = {
      id: `circle-${Date.now()}`,
      type: "circle",
      name: `Circle ${circleCount}`,
      x: 420 + (elements.length * 30) % 300,
      y: 280 + (elements.length * 30) % 200,
      radius: 80,
      fill: "#a855f7",
      stroke: "#c084fc",
      strokeWidth: 2,
      rotation: 0,
      opacity: 1,
      draggable: true,
      ...customProps,
    };

    setElements((prev) => [...prev, newCircle]);
    setSelectedId(newCircle.id);
    setActiveTool("select");
    return newCircle;
  }, [elements]);

  // Add a new Text element to canvas state
  const addText = useCallback((customProps = {}) => {
    const textCount = elements.filter((e) => e.type === "text").length + 1;
    const newText = {
      id: `text-${Date.now()}`,
      type: "text",
      name: `Text ${textCount}`,
      text: "Design your canvas",
      x: 380 + (elements.length * 30) % 300,
      y: 220 + (elements.length * 30) % 200,
      fontSize: 32,
      fontFamily: "sans-serif",
      fontStyle: "bold",
      fill: "#ffffff",
      align: "left",
      width: 340,
      rotation: 0,
      opacity: 1,
      draggable: true,
      ...customProps,
    };

    setElements((prev) => [...prev, newText]);
    setSelectedId(newText.id);
    setActiveTool("select");
    return newText;
  }, [elements]);

  // Update properties of a specific element
  const updateElement = useCallback((id, updates) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  }, []);

  // Remove an element
  const deleteElement = useCallback((id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  // Select an element
  const selectElement = useCallback((id) => {
    setSelectedId(id);
  }, []);

  // Deselect all
  const deselectAll = useCallback(() => {
    setSelectedId(null);
  }, []);

  const selectedElement = elements.find((el) => el.id === selectedId) || null;

  const value = {
    elements,
    setElements,
    selectedId,
    selectedElement,
    activeTool,
    setActiveTool,
    zoomScale,
    setZoomScale,
    addRectangle,
    addCircle,
    addText,
    updateElement,
    deleteElement,
    selectElement,
    deselectAll,
  };

  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
}
