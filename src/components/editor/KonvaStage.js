"use client";

import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Transformer, Text, Group, Circle } from "react-konva";
import { useCanvas } from "@/context/CanvasContext";

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;

function RectangleElement({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        {...shapeProps}
        draggable={shapeProps.draggable !== false}
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onTap={(e) => {
          e.cancelBubble = true;
          onSelect();
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
          onSelect();
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: Math.round(e.target.x()),
            y: Math.round(e.target.y()),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: Math.round(node.x()),
            y: Math.round(node.y()),
            width: Math.max(10, Math.round(node.width() * scaleX)),
            height: Math.max(10, Math.round(node.height() * scaleY)),
            rotation: Math.round(node.rotation()),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 15 || Math.abs(newBox.height) < 15) {
              return oldBox;
            }
            return newBox;
          }}
          anchorSize={9}
          anchorCornerRadius={2}
          anchorFill="#ffffff"
          anchorStroke="#6366f1"
          anchorStrokeWidth={2}
          borderStroke="#6366f1"
          borderStrokeWidth={1.5}
          borderDash={[4, 4]}
          rotateAnchorOffset={24}
        />
      )}
    </>
  );
}

function CircleElement({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Circle
        ref={shapeRef}
        {...shapeProps}
        draggable={shapeProps.draggable !== false}
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onTap={(e) => {
          e.cancelBubble = true;
          onSelect();
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
          onSelect();
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: Math.round(e.target.x()),
            y: Math.round(e.target.y()),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: Math.round(node.x()),
            y: Math.round(node.y()),
            radius: Math.max(10, Math.round(node.radius() * scaleX)),
            rotation: Math.round(node.rotation()),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
          keepRatio={true}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 15 || Math.abs(newBox.height) < 15) {
              return oldBox;
            }
            return newBox;
          }}
          anchorSize={9}
          anchorCornerRadius={2}
          anchorFill="#ffffff"
          anchorStroke="#a855f7"
          anchorStrokeWidth={2}
          borderStroke="#a855f7"
          borderStrokeWidth={1.5}
          borderDash={[4, 4]}
          rotateAnchorOffset={24}
        />
      )}
    </>
  );
}

function TextElement({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onStartEditing,
}) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleDblClick = (e) => {
    e.cancelBubble = true;
    const node = shapeRef.current;
    if (node && onStartEditing) {
      onStartEditing(shapeProps, node);
    }
  };

  return (
    <>
      <Text
        ref={shapeRef}
        {...shapeProps}
        draggable={shapeProps.draggable !== false}
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onTap={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onDblClick={handleDblClick}
        onDblTap={handleDblClick}
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
          onSelect();
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: Math.round(e.target.x()),
            y: Math.round(e.target.y()),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: Math.round(node.x()),
            y: Math.round(node.y()),
            width: Math.max(50, Math.round(node.width() * scaleX)),
            rotation: Math.round(node.rotation()),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={["middle-left", "middle-right", "top-left", "top-right", "bottom-left", "bottom-right"]}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 30 || Math.abs(newBox.height) < 15) {
              return oldBox;
            }
            return newBox;
          }}
          anchorSize={9}
          anchorCornerRadius={2}
          anchorFill="#ffffff"
          anchorStroke="#3b82f6"
          anchorStrokeWidth={2}
          borderStroke="#3b82f6"
          borderStrokeWidth={1.5}
          borderDash={[4, 4]}
          rotateAnchorOffset={24}
        />
      )}
    </>
  );
}

export default function KonvaStage({
  width = CANVAS_WIDTH,
  height = CANVAS_HEIGHT,
  scale = 1,
}) {
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const [editingText, setEditingText] = useState(null); // { id, text, x, y, width, fontSize, ... }

  const {
    elements,
    selectedId,
    selectElement,
    deselectAll,
    updateElement,
  } = useCanvas();

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

  const startTextEditing = (shapeProps, node) => {
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
              text="• Click to select, drag to move, double-click text to edit"
              fontSize={13}
              fontFamily="sans-serif"
              fill="#334155"
            />
          </Group>

          {/* Dynamic Canvas Elements */}
          {elements.map((el) => {
            if (el.type === "rect") {
              return (
                <RectangleElement
                  key={el.id}
                  shapeProps={el}
                  isSelected={el.id === selectedId}
                  onSelect={() => selectElement(el.id)}
                  onChange={(newAttrs) => updateElement(el.id, newAttrs)}
                />
              );
            }
            if (el.type === "circle") {
              return (
                <CircleElement
                  key={el.id}
                  shapeProps={el}
                  isSelected={el.id === selectedId}
                  onSelect={() => selectElement(el.id)}
                  onChange={(newAttrs) => updateElement(el.id, newAttrs)}
                />
              );
            }
            if (el.type === "text") {
              // If currently editing inline, hide the canvas text node so textarea is visible
              if (editingText && editingText.id === el.id) {
                return null;
              }
              return (
                <TextElement
                  key={el.id}
                  shapeProps={el}
                  isSelected={el.id === selectedId}
                  onSelect={() => selectElement(el.id)}
                  onChange={(newAttrs) => updateElement(el.id, newAttrs)}
                  onStartEditing={startTextEditing}
                />
              );
            }
            return null;
          })}
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
            fontWeight: editingText.fontStyle === "bold" ? "bold" : "normal",
            color: editingText.fill || "#ffffff",
            textAlign: editingText.align || "left",
            lineHeight: 1.2,
            background: "rgba(18, 21, 31, 0.95)",
            border: "1.5px solid #3b82f6",
            borderRadius: "6px",
            padding: `${4 * scale}px`,
            margin: 0,
            outline: "none",
            resize: "none",
            transformOrigin: "top left",
            transform: editingText.rotation ? `rotate(${editingText.rotation}deg)` : "none",
            zIndex: 30,
          }}
        />
      )}
    </div>
  );
}
