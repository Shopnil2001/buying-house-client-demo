"use client";

import React, { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;
}

interface Stick {
  p0: Point;
  p1: Point;
  length: number;
}

export default function RealClothPhysicsEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeClothColor, setActiveClothColor] = useState<"silk" | "terracotta" | "sage">("silk");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initCloth();
    };
    window.addEventListener("resize", handleResize);

    // Verlet Physics Cloth Grid setup
    const cols = 28;
    const rows = 18;
    const spacingX = Math.min(48, width / (cols - 2));
    const spacingY = 24;
    const startX = (width - (cols - 1) * spacingX) / 2;
    const startY = 40;

    let points: Point[] = [];
    let sticks: Stick[] = [];

    const initCloth = () => {
      points = [];
      sticks = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = startX + x * spacingX;
          const py = startY + y * spacingY;
          // Pin top row at intervals
          const isPinned = y === 0 && (x % 3 === 0 || x === cols - 1);
          points.push({
            x: px,
            y: py,
            oldX: px + (Math.random() - 0.5) * 4,
            oldY: py + (Math.random() - 0.5) * 4,
            pinned: isPinned,
          });
        }
      }

      // Structural sticks (Horizontal & Vertical)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const index = y * cols + x;
          if (x < cols - 1) {
            sticks.push({
              p0: points[index],
              p1: points[index + 1],
              length: spacingX,
            });
          }
          if (y < rows - 1) {
            sticks.push({
              p0: points[index],
              p1: points[index + cols],
              length: spacingY,
            });
          }
        }
      }
    };

    initCloth();

    // Mouse Interaction (Wind & Drag)
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let isMouseDown = false;

    const onMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseDown = () => {
      isMouseDown = true;
    };
    const onMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Scroll wind injection (scrolling creates realistic aerodynamic wind gust)
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.4;
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.015;
      scrollVelocity *= 0.92; // Damping

      const gravity = 0.22;
      const friction = 0.985;
      const ambientWind = Math.sin(time * 1.5) * 0.35 + Math.cos(time * 0.8) * 0.2;
      const totalWindX = ambientWind + scrollVelocity * 0.15;
      const totalWindY = Math.abs(scrollVelocity) * 0.25;

      // 1. Update Points (Verlet Integration)
      points.forEach((p) => {
        if (p.pinned) return;

        const vx = (p.x - p.oldX) * friction;
        const vy = (p.y - p.oldY) * friction;

        p.oldX = p.x;
        p.oldY = p.y;

        p.x += vx + totalWindX;
        p.y += vy + gravity + totalWindY;

        // Mouse interaction: push cloth away or tear/drag on hover
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = isMouseDown ? 160 : 110;

        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * (isMouseDown ? 12 : 5);
          const mouseVx = mouseX - prevMouseX;
          const mouseVy = mouseY - prevMouseY;
          p.x += (dx / dist) * force + mouseVx * 0.2;
          p.y += (dy / dist) * force + mouseVy * 0.2;
        }
      });

      // 2. Satisfy Constraints (Relaxation Iterations)
      const iterations = 5;
      for (let iter = 0; iter < iterations; iter++) {
        sticks.forEach((s) => {
          const dx = s.p1.x - s.p0.x;
          const dy = s.p1.y - s.p0.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = (s.length - dist) / dist;

          const offsetX = dx * diff * 0.5;
          const offsetY = dy * diff * 0.5;

          if (!s.p0.pinned) {
            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
          }
          if (!s.p1.pinned) {
            s.p1.x += offsetX;
            s.p1.y += offsetY;
          }
        });
      }

      // 3. Render Realistic Silk Fabric Mesh with Dynamic Shading & Folds
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const p0 = points[y * cols + x];
          const p1 = points[y * cols + (x + 1)];
          const p2 = points[(y + 1) * cols + (x + 1)];
          const p3 = points[(y + 1) * cols + x];

          // Compute surface normal approximation for realistic silk specular lighting
          const v1x = p1.x - p0.x;
          const v1y = p1.y - p0.y;
          const v2x = p3.x - p0.x;
          const v2y = p3.y - p0.y;

          // Cross product Z component (shading intensity based on cloth fold curvature)
          const crossZ = v1x * v2y - v1y * v2x;
          const area = Math.abs(crossZ);
          const lightFactor = Math.max(0.2, Math.min(1.0, (area / (spacingX * spacingY)) * 0.8 + 0.2));

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();

          // Dynamic Satin Gradient
          const grad = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
          if (activeClothColor === "silk") {
            grad.addColorStop(0, `rgba(224, 178, 122, ${0.15 * lightFactor + 0.1})`);
            grad.addColorStop(0.5, `rgba(194, 103, 71, ${0.25 * lightFactor + 0.15})`);
            grad.addColorStop(1, `rgba(24, 35, 53, ${0.35 * lightFactor + 0.2})`);
          } else if (activeClothColor === "terracotta") {
            grad.addColorStop(0, `rgba(214, 130, 89, ${0.2 * lightFactor + 0.15})`);
            grad.addColorStop(1, `rgba(140, 50, 25, ${0.35 * lightFactor + 0.2})`);
          } else {
            grad.addColorStop(0, `rgba(120, 168, 130, ${0.2 * lightFactor + 0.15})`);
            grad.addColorStop(1, `rgba(25, 45, 30, ${0.35 * lightFactor + 0.2})`);
          }

          ctx.fillStyle = grad;
          ctx.fill();

          // Subtle woven thread lines
          ctx.strokeStyle = `rgba(224, 178, 122, ${0.08 * lightFactor})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw subtle top hanging bar
      ctx.save();
      ctx.strokeStyle = "rgba(224, 178, 122, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX - 20, startY);
      ctx.lineTo(startX + (cols - 1) * spacingX + 20, startY);
      ctx.stroke();

      // Draw golden pin rings
      for (let x = 0; x < cols; x++) {
        if (x % 3 === 0 || x === cols - 1) {
          ctx.fillStyle = "#E0B27A";
          ctx.shadowColor = "#D4AF37";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(startX + x * spacingX, startY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, [activeClothColor]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />
    </div>
  );
}
