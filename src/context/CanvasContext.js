"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "@/lib/api";

const CanvasContext = createContext(null);

export function CanvasProvider({ children }) {
  // Elements currently on the active canvas
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

  // Selected element ID on canvas
  const [selectedId, setSelectedId] = useState("rect-initial");
  
  // Active tool state
  const [activeTool, setActiveTool] = useState("select");

  // Viewport zoom scale
  const [zoomScale, setZoomScale] = useState(0.72);

  // Backend Canvas State
  const [currentCanvasId, setCurrentCanvasId] = useState(null);
  const [canvasTitle, setCanvasTitle] = useState("Modern SaaS Hero Banner");
  const [saveStatus, setSaveStatus] = useState("saved"); // "saved" | "saving" | "unsaved" | "error"
  const [isSaving, setIsSaving] = useState(false);
  const [canvasesList, setCanvasesList] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Mark changes as unsaved whenever elements or title change
  const markUnsaved = useCallback(() => {
    setSaveStatus("unsaved");
  }, []);

  // Fetch all saved canvases from backend
  const refreshCanvasesList = useCallback(async () => {
    try {
      const list = await api.listCanvases();
      setCanvasesList(list);
      return list;
    } catch (err) {
      console.warn("Could not fetch canvases list:", err.message);
      return [];
    }
  }, []);

  // Load a canvas by ID from backend
  const loadCanvas = useCallback(async (id) => {
    try {
      setSaveStatus("saving");
      const canvasDoc = await api.getCanvas(id);
      setCurrentCanvasId(canvasDoc._id || canvasDoc.id);
      setCanvasTitle(canvasDoc.title || "Untitled Canvas");
      
      const loadedElements = api.deserializeElements(canvasDoc.elements || []);
      setElements(loadedElements);
      setSelectedId(loadedElements[0]?.id || null);
      setSaveStatus("saved");
      setErrorMessage(null);
      setIsProjectModalOpen(false);
      return canvasDoc;
    } catch (err) {
      console.error("Failed to load canvas:", err);
      setSaveStatus("error");
      setErrorMessage(err.message);
      throw err;
    }
  }, []);

  // Save current canvas to backend (Create if new, Update if exists)
  const saveCanvas = useCallback(async (customTitle = null) => {
    setIsSaving(true);
    setSaveStatus("saving");
    setErrorMessage(null);
    const titleToSave = customTitle !== null ? customTitle : canvasTitle;

    try {
      if (currentCanvasId) {
        // Update existing canvas
        const updated = await api.updateCanvas(currentCanvasId, {
          title: titleToSave,
          elements,
        });
        setCanvasTitle(updated.title);
        setSaveStatus("saved");
      } else {
        // Create new canvas in MongoDB
        const created = await api.createCanvas({
          title: titleToSave,
          elements,
        });
        setCurrentCanvasId(created._id || created.id);
        setCanvasTitle(created.title);
        setSaveStatus("saved");
      }
      await refreshCanvasesList();
    } catch (err) {
      console.error("Failed to save canvas:", err);
      setSaveStatus("error");
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  }, [canvasTitle, currentCanvasId, elements, refreshCanvasesList]);

  // Create a brand new canvas
  const createNewCanvas = useCallback(async (newTitle = "New Design Project") => {
    setIsSaving(true);
    setSaveStatus("saving");
    try {
      const defaultInitialShape = [
        {
          id: `rect-${Date.now()}`,
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
      ];

      const created = await api.createCanvas({
        title: newTitle,
        elements: defaultInitialShape,
      });

      setCurrentCanvasId(created._id || created.id);
      setCanvasTitle(created.title);
      setElements(defaultInitialShape);
      setSelectedId(defaultInitialShape[0].id);
      setSaveStatus("saved");
      setIsProjectModalOpen(false);
      await refreshCanvasesList();
      return created;
    } catch (err) {
      console.error("Failed to create new canvas:", err);
      setSaveStatus("error");
      setErrorMessage(err.message);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [refreshCanvasesList]);

  // Delete a canvas
  const deleteCanvasDoc = useCallback(async (id) => {
    try {
      await api.deleteCanvas(id);
      const remainingList = await refreshCanvasesList();

      if (currentCanvasId === id) {
        if (remainingList.length > 0) {
          await loadCanvas(remainingList[0]._id || remainingList[0].id);
        } else {
          // No canvases left: create a fresh one
          await createNewCanvas("My First Canvas");
        }
      }
    } catch (err) {
      console.error("Failed to delete canvas:", err);
      setErrorMessage(err.message);
      throw err;
    }
  }, [currentCanvasId, refreshCanvasesList, loadCanvas, createNewCanvas]);

  // Initial load: fetch canvas list and load active canvas if available
  useEffect(() => {
    async function init() {
      try {
        const list = await refreshCanvasesList();
        if (list && list.length > 0) {
          // Load the latest canvas
          await loadCanvas(list[0]._id || list[0].id);
        } else {
          // Create initial starter canvas in backend
          await saveCanvas("Modern SaaS Hero Banner");
        }
      } catch (err) {
        console.warn("Backend not initialized or offline:", err.message);
      }
    }
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    markUnsaved();
    return newRect;
  }, [elements, markUnsaved]);

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
    markUnsaved();
    return newCircle;
  }, [elements, markUnsaved]);

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
    markUnsaved();
    return newText;
  }, [elements, markUnsaved]);

  // Update properties of a specific element
  const updateElement = useCallback((id, updates) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
    markUnsaved();
  }, [markUnsaved]);

  // Remove an element
  const deleteElement = useCallback((id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
    markUnsaved();
  }, [markUnsaved]);

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
    // Backend & Document CRUD
    currentCanvasId,
    canvasTitle,
    setCanvasTitle,
    saveStatus,
    setSaveStatus,
    isSaving,
    canvasesList,
    isProjectModalOpen,
    setIsProjectModalOpen,
    errorMessage,
    loadCanvas,
    saveCanvas,
    createNewCanvas,
    deleteCanvasDoc,
    refreshCanvasesList,
    // Elements CRUD
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
