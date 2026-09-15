"use client";

import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Transformer, Text, Group, Circle } from "react-konva";
import { useCanvas } from "@/context/CanvasContext";

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;

export default function KonvaStage({
  width = CANVAS_WIDTH,
  height = CANVAS_HEIGHT,
  scale = 1,
}) {
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const containerRef = useRef(null);
  const [editingText, setEditingText] = useState(null);

  const {
    elements,
    selectedId,
    selectElement,
    deselectAll,
    updateElement,
  } = useCanvas();

  const selectedElement = elements.find((el) => el.id === selectedId) || null;

  // Sync Transformer with selected node
  useEffect(() => {
    if (!transformerRef.current || !stageRef.current) return;

    if (selectedId && !editingText) {
      const selectedNode = stageRef.current.findOne("#" + selectedId);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        
        // Configure transformer based on element type
        if (selectedElement?.type === "circle") {
          transformerRef.current.enabledAnchors([
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]);
          transformerRef.current.keepRatio(true);
          transformerRef.current.anchorStroke("#a855f7");
          transformerRef.current.borderStroke("#a855f7");
        } else if (selectedElement?.type === "text") {
          transformerRef.current.enabledAnchors([
            "middle-left",
            "middle-right",
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]);
          transformerRef.current.keepRatio(false);
          transformerRef.current.anchorStroke("#3b82f6");
          transformerRef.current.borderStroke("#3b82f6");
        } else {
          // Rectangle or standard
          transformerRef.current.enabledAnchors([
            "top-left",
            "top-center",
            "top-right",
            "middle-right",
            "bottom-right",
            "bottom-center",
            "bottom-left",
            "middle-left",
          ]);
          transformerRef.current.keepRatio(false);
          transformerRef.current.anchorStroke("#6366f1");
          transformerRef.current.borderStroke("#6366f1");
        }

        transformerRef.current.getLayer()?.batchDraw();
      } else {
        transformerRef.current.nodes([]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId, elements, editingText, selectedElement?.type]);

  const handleStageClick = (e) => {
    // If inline editing text, finish it
    if (editingText) {
      finishTextEditing();
    }
    // If clicking on empty stage area or background rect, deselect all
    if (e.target === stageRef.current || e.target.name() === "canvas-bg") {
      deselectAll();
    }
  };

  const startTextEditing = (shapeProps) => {
    setEditingText({
      id: shapeProps.id,
      text: shapeProps.text,
      x: shapeProps.x,
      y: shapeProps.y,
      width: shapeProps.width || 320,
      fontSize: shapeProps.fontSize || 32,
      fontFamily: shapeProps.fontFamily || "sans-serif",
      fontStyle: shapeProps.fontStyle || "normal",
      fill: shapeProps.fill || "#ffffff",
      align: shapeProps.align || "left",
      rotation: shapeProps.rotation || 0,
    });
  };

  const finishTextEditing = () => {
    if (editingText) {
      updateElement(editingText.id, { text: editingText.text });
      setEditingText(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-[#262c3e] transition-all"
      style={{
        width: width * scale,
        height: height * scale,
      }}
    >
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        scaleX={scale}
        scaleY={scale}
        onClick={handleStageClick}
        onTap={handleStageClick}
        className="bg-[#12151f]"
      >
        <Layer>
          {/* Canvas Background Surface */}
          <Rect
            name="canvas-bg"
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#12151f"
          />

          {/* Decorative Background Accents */}
          <Circle
            x={1050}
            y={150}
            radius={160}
            fill="rgba(99, 102, 241, 0.08)"
            listening={false}
          />
          <Circle
            x={150}
            y={680}
            radius={180}
            fill="rgba(168, 85, 247, 0.08)"
            listening={false}
          />

          {/* Canvas Guide / Title Overlay (Non-interactive) */}
          <Group x={50} y={40} listening={false}>
            <Text
              text="Canvas Artboard"
              fontSize={14}
              fontFamily="sans-serif"
              fontStyle="bold"
              fill="#475569"
            />
            <Text
              x={130}
              text="• Click to select, drag to move, double-click text to edit, use inspector to tune"
              fontSize={13}
              fontFamily="sans-serif"
              fill="#334155"
            />
          </Group>

          {/* Dynamic Canvas Elements */}
          {elements.map((el) => {
            if (el.type === "rect") {
              return (
                <Rect
                  key={el.id}
                  id={el.id}
                  name={el.id}
                  {...el}
                  draggable={el.draggable !== false}
                  onClick={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onTap={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onMouseEnter={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = "move";
                  }}
                  onMouseLeave={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = "default";
                  }}
                  onDragStart={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onDragEnd={(e) => {
                    updateElement(el.id, {
                      x: Math.round(e.target.x()),
                      y: Math.round(e.target.y()),
                    });
                  }}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);

                    updateElement(el.id, {
                      x: Math.round(node.x()),
                      y: Math.round(node.y()),
                      width: Math.max(10, Math.round(node.width() * scaleX)),
                      height: Math.max(10, Math.round(node.height() * scaleY)),
                      rotation: Math.round(node.rotation()),
                    });
                  }}
                />
              );
            }

            if (el.type === "circle") {
              return (
                <Circle
                  key={el.id}
                  id={el.id}
                  name={el.id}
                  {...el}
                  draggable={el.draggable !== false}
                  onClick={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onTap={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onMouseEnter={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = "move";
                  }}
                  onMouseLeave={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = "default";
                  }}
                  onDragStart={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onDragEnd={(e) => {
                    updateElement(el.id, {
                      x: Math.round(e.target.x()),
                      y: Math.round(e.target.y()),
                    });
                  }}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    const scaleX = node.scaleX();

                    node.scaleX(1);
                    node.scaleY(1);

                    updateElement(el.id, {
                      x: Math.round(node.x()),
                      y: Math.round(node.y()),
                      radius: Math.max(10, Math.round(node.radius() * scaleX)),
                      rotation: Math.round(node.rotation()),
                    });
                  }}
                />
              );
            }

            if (el.type === "text") {
              if (editingText && editingText.id === el.id) {
                return null;
              }
              return (
                <Text
                  key={el.id}
                  id={el.id}
                  name={el.id}
                  {...el}
                  draggable={el.draggable !== false}
                  onClick={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onTap={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onDblClick={(e) => {
                    e.cancelBubble = true;
                    startTextEditing(el);
                  }}
                  onDblTap={(e) => {
                    e.cancelBubble = true;
                    startTextEditing(el);
                  }}
                  onMouseEnter={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = "move";
                  }}
                  onMouseLeave={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = "default";
                  }}
                  onDragStart={(e) => {
                    e.cancelBubble = true;
                    selectElement(el.id);
                  }}
                  onDragEnd={(e) => {
                    updateElement(el.id, {
                      x: Math.round(e.target.x()),
                      y: Math.round(e.target.y()),
                    });
                  }}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);

                    updateElement(el.id, {
                      x: Math.round(node.x()),
                      y: Math.round(node.y()),
                      width: Math.max(40, Math.round(node.width() * scaleX)),
                      fontSize: Math.max(10, Math.round((el.fontSize || 32) * scaleY)),
                      rotation: Math.round(node.rotation()),
                    });
                  }}
                />
              );
            }

            return null;
          })}

          {/* Unified Global Transformer */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (Math.abs(newBox.width) < 15 || Math.abs(newBox.height) < 15) {
                return oldBox;
              }
              return newBox;
            }}
            anchorSize={9}
            anchorCornerRadius={2}
            anchorFill="#ffffff"
            anchorStrokeWidth={2}
            borderStrokeWidth={1.5}
            borderDash={[4, 4]}
            rotateAnchorOffset={24}
          />
        </Layer>
      </Stage>

      {/* Floating Inline HTML Textarea Overlay for Text Editing */}
      {editingText && (
        <textarea
          autoFocus
          value={editingText.text}
          onChange={(e) =>
            setEditingText((prev) => ({ ...prev, text: e.target.value }))
          }
          onBlur={finishTextEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              finishTextEditing();
            } else if (e.key === "Escape") {
              finishTextEditing();
            }
          }}
          style={{
            position: "absolute",
            top: editingText.y * scale,
            left: editingText.x * scale,
            width: (editingText.width || 320) * scale,
            fontSize: (editingText.fontSize || 32) * scale,
            fontFamily: editingText.fontFamily || "sans-serif",
            fontWeight: editingText.fontStyle?.includes("bold") ? "bold" : "normal",
            fontStyle: editingText.fontStyle?.includes("italic") ? "italic" : "normal",
            color: editingText.fill || "#ffffff",
            textAlign: editingText.align || "left",
            lineHeight: 1.2,
            background: "rgba(18, 21, 31, 0.95)",
            border: "1.5px solid #3b82f6",
            borderRadius: "6px",
            padding: "4px",
            margin: 0,
            outline: "none",
            resize: "none",
            boxSizing: "border-box",
            transformOrigin: "top left",
            transform: editingText.rotation ? `rotate(${editingText.rotation}deg)` : "none",
            zIndex: 30,
          }}
        />
      )}
    </div>
  );
}
