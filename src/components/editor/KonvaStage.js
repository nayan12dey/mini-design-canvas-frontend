"use client";

import React, { useRef } from "react";
import { Stage, Layer, Rect, Circle, Text, Group, Star } from "react-konva";

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;

export default function KonvaStage({
  width = CANVAS_WIDTH,
  height = CANVAS_HEIGHT,
  scale = 1,
}) {
  const stageRef = useRef(null);

  return (
    <div
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
        className="bg-[#12151f]"
      >
        <Layer>
          {/* Canvas Background */}
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#12151f"
          />

          {/* Decorative Glow Elements */}
          <Circle
            x={1000}
            y={120}
            radius={180}
            fill="rgba(99, 102, 241, 0.12)"
          />
          <Circle
            x={160}
            y={680}
            radius={180}
            fill="rgba(168, 85, 247, 0.12)"
          />

          {/* Brand Logo & Top Navigation Group */}
          <Group x={60} y={50}>
            {/* Logo Mark */}
            <Rect
              x={0}
              y={0}
              width={36}
              height={36}
              cornerRadius={8}
              fill="#6366f1"
            />
            <Text
              x={10}
              y={8}
              text="⚡"
              fontSize={18}
              fill="#ffffff"
            />
            <Text
              x={48}
              y={8}
              text="NovaPulse Studio"
              fontSize={18}
              fontFamily="sans-serif"
              fontStyle="bold"
              fill="#ffffff"
            />

            {/* Nav Links */}
            <Text
              x={800}
              y={10}
              text="Features"
              fontSize={14}
              fontFamily="sans-serif"
              fill="#e2e8f0"
            />
            <Text
              x={890}
              y={10}
              text="Templates"
              fontSize={14}
              fontFamily="sans-serif"
              fill="#94a3b8"
            />
            <Text
              x={990}
              y={10}
              text="Pricing"
              fontSize={14}
              fontFamily="sans-serif"
              fill="#94a3b8"
            />
          </Group>

          {/* Hero Banner Section */}
          <Group x={120} y={220}>
            {/* Tag / Badge */}
            <Rect
              x={320}
              y={0}
              width={320}
              height={34}
              cornerRadius={17}
              fill="rgba(99, 102, 241, 0.15)"
              stroke="rgba(99, 102, 241, 0.35)"
              strokeWidth={1}
            />
            <Text
              x={340}
              y={10}
              text="✨  Interactive Konva 1200×800 Canvas"
              fontSize={13}
              fontFamily="sans-serif"
              fontStyle="bold"
              fill="#818cf8"
            />

            {/* Main Headline */}
            <Text
              x={80}
              y={60}
              text="Vector Design on the Modern Web"
              fontSize={46}
              fontFamily="sans-serif"
              fontStyle="bold"
              fill="#ffffff"
              width={800}
              align="center"
            />

            {/* Subtitle */}
            <Text
              x={180}
              y={140}
              text="High performance 2D graphics engine powered by React Konva and HTML5 Canvas."
              fontSize={16}
              fontFamily="sans-serif"
              fill="#94a3b8"
              width={600}
              align="center"
              lineHeight={1.4}
            />

            {/* CTA Button */}
            <Group x={380} y={210}>
              <Rect
                x={0}
                y={0}
                width={200}
                height={50}
                cornerRadius={12}
                fill="#6366f1"
                shadowColor="#6366f1"
                shadowBlur={20}
                shadowOpacity={0.4}
                shadowOffsetY={6}
              />
              <Text
                x={0}
                y={17}
                width={200}
                text="Start Designing  →"
                fontSize={15}
                fontFamily="sans-serif"
                fontStyle="bold"
                fill="#ffffff"
                align="center"
              />
            </Group>
          </Group>

          {/* Sample Interactive Shape Elements */}
          <Group x={120} y={580}>
            {/* Card 1 */}
            <Group x={0} y={0}>
              <Rect
                x={0}
                y={0}
                width={280}
                height={120}
                cornerRadius={14}
                fill="#181d2a"
                stroke="#2a3349"
                strokeWidth={1}
              />
              <Rect
                x={20}
                y={20}
                width={28}
                height={28}
                cornerRadius={6}
                fill="#3b82f6"
              />
              <Text
                x={60}
                y={24}
                text="Stage & Layer Setup"
                fontSize={14}
                fontFamily="sans-serif"
                fontStyle="bold"
                fill="#f1f5f9"
              />
              <Text
                x={20}
                y={65}
                text="1200×800 Canvas resolution mounted into Konva viewport"
                fontSize={12}
                fontFamily="sans-serif"
                fill="#64748b"
                width={240}
              />
            </Group>

            {/* Card 2 */}
            <Group x={340} y={0}>
              <Rect
                x={0}
                y={0}
                width={280}
                height={120}
                cornerRadius={14}
                fill="#181d2a"
                stroke="#2a3349"
                strokeWidth={1}
              />
              <Circle
                x={34}
                y={34}
                radius={14}
                fill="#a855f7"
              />
              <Text
                x={60}
                y={24}
                text="High FPS Rendering"
                fontSize={14}
                fontFamily="sans-serif"
                fontStyle="bold"
                fill="#f1f5f9"
              />
              <Text
                x={20}
                y={65}
                text="Hardware-accelerated HTML5 2D canvas pipeline"
                fontSize={12}
                fontFamily="sans-serif"
                fill="#64748b"
                width={240}
              />
            </Group>

            {/* Card 3 */}
            <Group x={680} y={0}>
              <Rect
                x={0}
                y={0}
                width={280}
                height={120}
                cornerRadius={14}
                fill="#181d2a"
                stroke="#2a3349"
                strokeWidth={1}
              />
              <Star
                x={34}
                y={34}
                numPoints={5}
                innerRadius={7}
                outerRadius={15}
                fill="#f59e0b"
              />
              <Text
                x={60}
                y={24}
                text="Modular Geometry"
                fontSize={14}
                fontFamily="sans-serif"
                fontStyle="bold"
                fill="#f1f5f9"
              />
              <Text
                x={20}
                y={65}
                text="Ready for node transformations, dragging & export"
                fontSize={12}
                fontFamily="sans-serif"
                fill="#64748b"
                width={240}
              />
            </Group>
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}
