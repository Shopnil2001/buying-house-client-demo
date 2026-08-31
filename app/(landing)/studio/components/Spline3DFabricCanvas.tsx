"use client";

import React, { useRef, useEffect, useState } from "react";
import { Sparkles, Eye, RotateCw, Layers, Compass } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

type Visual3DMode = "silk_knot" | "yarn_helix" | "liquid_cloth";

export default function Spline3DFabricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<Visual3DMode>("silk_knot");
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);

  // References for mouse drag rotation (Spline 3D Orbit feel)
  const rotationRef = useRef({ x: 0.35, y: 0.65 });
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse drag handlers for full 3D orbital rotation
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      rotationRef.current.y += dx * 0.008;
      rotationRef.current.x += dy * 0.008;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const canvasEl = canvas;
    canvasEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 3D Point projection math
    const project = (
      x: number,
      y: number,
      z: number,
      rotX: number,
      rotY: number
    ): { px: number; py: number; pz: number } => {
      // Rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Perspective projection
      const fov = 420;
      const scale = fov / (fov + z2 + 300);
      const px = width / 2 + x1 * scale;
      const py = height / 2 + y2 * scale;

      return { px, py, pz: z2 };
    };

    // 3D Ambient floating dust / silk fibers
    const fiberParticles: { x: number; y: number; z: number; speed: number }[] = [];
    for (let i = 0; i < 60; i++) {
      fiberParticles.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        z: (Math.random() - 0.5) * 500,
        speed: Math.random() * 0.01 + 0.005,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.014;

      if (autoRotate && !isDraggingRef.current) {
        rotationRef.current.y += 0.006;
        rotationRef.current.x = 0.25 + Math.sin(time * 0.5) * 0.12;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // Background volumetric lighting caustics
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        40,
        width / 2,
        height / 2,
        width * 0.45
      );
      bgGrad.addColorStop(0, "rgba(224, 178, 122, 0.08)");
      bgGrad.addColorStop(0.5, "rgba(24, 35, 53, 0.35)");
      bgGrad.addColorStop(1, "rgba(10, 16, 26, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw 3D Floating Silk Fibers
      fiberParticles.forEach((p) => {
        p.y += Math.sin(time + p.x) * 0.3;
        const pt = project(p.x, p.y, p.z, rotX, rotY);
        const alpha = Math.max(0.1, Math.min(0.6, (pt.pz + 250) / 500));
        ctx.fillStyle = `rgba(224, 178, 122, ${alpha})`;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3D Geometry Rendering based on Mode
      if (mode === "silk_knot") {
        // Parametric 3D Trefoil Torus Knot Ribbon (Silk Sculpture)
        const segments = 120;
        const ribbonWidth = 28;
        const ribbonPoints: {
          top: { px: number; py: number; pz: number };
          bot: { px: number; py: number; pz: number };
          depth: number;
        }[] = [];

        for (let i = 0; i <= segments; i++) {
          const u = (i / segments) * Math.PI * 4;
          // Trefoil knot equations
          const r = 100 + Math.cos(3 * u) * 45;
          const x = r * Math.cos(2 * u) * 1.3;
          const y = r * Math.sin(2 * u) * 1.3;
          const z = Math.sin(3 * u) * 90;

          // Normal displacement for ribbon width
          const nx = Math.cos(2 * u) * Math.cos(time + u);
          const ny = Math.sin(2 * u) * Math.cos(time + u);
          const nz = Math.sin(time + u);

          const ptTop = project(
            x + nx * ribbonWidth,
            y + ny * ribbonWidth,
            z + nz * ribbonWidth,
            rotX,
            rotY
          );
          const ptBot = project(
            x - nx * ribbonWidth,
            y - ny * ribbonWidth,
            z - nz * ribbonWidth,
            rotX,
            rotY
          );

          ribbonPoints.push({
            top: ptTop,
            bot: ptBot,
            depth: (ptTop.pz + ptBot.pz) / 2,
          });
        }

        // Draw quads with depth shading
        for (let i = 0; i < ribbonPoints.length - 1; i++) {
          const p1 = ribbonPoints[i];
          const p2 = ribbonPoints[i + 1];

          const normDepth = Math.max(0, Math.min(1, (p1.depth + 180) / 360));

          // Silk Satin Gradient (Terracotta -> Gold -> Soft Indigo)
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p1.top.px, p1.top.py);
          ctx.lineTo(p2.top.px, p2.top.py);
          ctx.lineTo(p2.bot.px, p2.bot.py);
          ctx.lineTo(p1.bot.px, p1.bot.py);
          ctx.closePath();

          if (!wireframe) {
            const grad = ctx.createLinearGradient(
              p1.top.px,
              p1.top.py,
              p2.bot.px,
              p2.bot.py
            );
            grad.addColorStop(
              0,
              `rgba(224, 178, 122, ${0.4 + normDepth * 0.5})`
            );
            grad.addColorStop(
              0.5,
              `rgba(194, 103, 71, ${0.5 + normDepth * 0.4})`
            );
            grad.addColorStop(
              1,
              `rgba(24, 35, 53, ${0.6 + normDepth * 0.3})`
            );
            ctx.fillStyle = grad;
            ctx.shadowColor = "#E0B27A";
            ctx.shadowBlur = normDepth * 15;
            ctx.fill();
          }

          ctx.strokeStyle = `rgba(224, 178, 122, ${0.3 + normDepth * 0.6})`;
          ctx.lineWidth = wireframe ? 1.5 : 1;
          ctx.stroke();
          ctx.restore();
        }
      } else if (mode === "yarn_helix") {
        // 3D Multi-Strand Spinning Yarn Spool Helix
        const strands = 4;
        const pointsPerStrand = 90;

        for (let s = 0; s < strands; s++) {
          const strandOffset = (s / strands) * Math.PI * 2;
          const color =
            s % 2 === 0 ? "rgba(224, 178, 122, 0.85)" : "rgba(194, 103, 71, 0.85)";

          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.shadowColor = color;
          ctx.shadowBlur = 12;
          ctx.beginPath();

          for (let i = 0; i <= pointsPerStrand; i++) {
            const t = (i / pointsPerStrand) * Math.PI * 6;
            const radius = 90 + Math.sin(t * 0.5 + time) * 15;
            const x = Math.cos(t + strandOffset + time * 1.5) * radius;
            const y = (i / pointsPerStrand - 0.5) * 320;
            const z = Math.sin(t + strandOffset + time * 1.5) * radius;

            const pt = project(x, y, z, rotX, rotY);
            if (i === 0) ctx.moveTo(pt.px, pt.py);
            else ctx.lineTo(pt.px, pt.py);
          }
          ctx.stroke();
          ctx.restore();
        }
      } else {
        // 3D Liquid Cloth Grid Wave
        const gridW = 16;
        const gridH = 16;
        const spacing = 22;

        for (let ix = 0; ix < gridW - 1; ix++) {
          for (let iy = 0; iy < gridH - 1; iy++) {
            const x1 = (ix - gridW / 2) * spacing;
            const y1 = (iy - gridH / 2) * spacing;
            const z1 =
              Math.sin(ix * 0.5 + time * 2) * 35 +
              Math.cos(iy * 0.5 + time * 1.5) * 35;

            const x2 = (ix + 1 - gridW / 2) * spacing;
            const y2 = (iy - gridH / 2) * spacing;
            const z2 =
              Math.sin((ix + 1) * 0.5 + time * 2) * 35 +
              Math.cos(iy * 0.5 + time * 1.5) * 35;

            const x3 = (ix + 1 - gridW / 2) * spacing;
            const y3 = (iy + 1 - gridH / 2) * spacing;
            const z3 =
              Math.sin((ix + 1) * 0.5 + time * 2) * 35 +
              Math.cos((iy + 1) * 0.5 + time * 1.5) * 35;

            const x4 = (ix - gridW / 2) * spacing;
            const y4 = (iy + 1 - gridH / 2) * spacing;
            const z4 =
              Math.sin(ix * 0.5 + time * 2) * 35 +
              Math.cos((iy + 1) * 0.5 + time * 1.5) * 35;

            const p1 = project(x1, y1, z1, rotX, rotY);
            const p2 = project(x2, y2, z2, rotX, rotY);
            const p3 = project(x3, y3, z3, rotX, rotY);
            const p4 = project(x4, y4, z4, rotX, rotY);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.lineTo(p3.px, p3.py);
            ctx.lineTo(p4.px, p4.py);
            ctx.closePath();

            if (!wireframe) {
              ctx.fillStyle = "rgba(24, 35, 53, 0.45)";
              ctx.fill();
            }

            ctx.strokeStyle = "rgba(224, 178, 122, 0.5)";
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvasEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mode, autoRotate, wireframe]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0C1320] shadow-2xl p-4 sm:p-6 space-y-4">
      {/* Top Spline 3D Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#E0B27A]">
          <Compass className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "12s" }} />
          <span className="font-bold uppercase tracking-wider">Spatial 3D Textile Morph Engine</span>
        </div>

        {/* 3D Geometry Mode Switcher */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
          {(["silk_knot", "yarn_helix", "liquid_cloth"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                playTactileClick("switch");
                setMode(m);
              }}
              className={`px-3 py-1 rounded-lg capitalize transition-all text-[11px] ${
                mode === m
                  ? "bg-[#C26747] text-white font-bold shadow"
                  : "text-[#A59E95] hover:text-white"
              }`}
            >
              {m.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Orbit / Wireframe Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playTactileClick("soft");
              setAutoRotate(!autoRotate);
            }}
            className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 transition-all ${
              autoRotate
                ? "bg-white/10 border-amber-500/40 text-amber-300"
                : "bg-black/30 border-white/10 text-[#A59E95]"
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span>{autoRotate ? "Auto Orbit ON" : "Paused"}</span>
          </button>

          <button
            onClick={() => {
              playTactileClick("soft");
              setWireframe(!wireframe);
            }}
            className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 transition-all ${
              wireframe
                ? "bg-white/10 border-amber-500/40 text-amber-300"
                : "bg-black/30 border-white/10 text-[#A59E95]"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Wireframe</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL / Canvas Viewport */}
      <div className="relative h-96 sm:h-[440px] w-full rounded-2xl overflow-hidden bg-[#080E17] border border-white/5 cursor-grab active:cursor-grabbing flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Ambient Holographic Ring Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-60" />

        {/* Drag Hint */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-[#D6CFC7] pointer-events-none flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Click & Drag to Orbit in 3D Space</span>
        </div>
      </div>
    </div>
  );
}
