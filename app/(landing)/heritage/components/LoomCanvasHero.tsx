"use client";

import React, { useRef, useEffect, useState } from "react";
import { Sparkles, ArrowRight, MousePointer, RefreshCw, Award, Layers } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

export default function LoomCanvasHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [weavingProgress, setWeavingProgress] = useState(0);
  const [isWeavingComplete, setIsWeavingComplete] = useState(false);
  const [activePattern, setActivePattern] = useState<"plain" | "twill" | "jacquard">("jacquard");
  const [threadCount, setThreadCount] = useState(64);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Warp & Weft configuration
    const cols = threadCount;
    const rows = Math.floor(cols * (height / width));
    const cellW = width / cols;
    const cellH = height / rows;

    let mouseX = -1000;
    let mouseY = -1000;
    let mouseRadius = 90;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Initial weaving animation variables
    let currentRow = 0;
    let shuttleX = 0;
    let shuttleSpeed = width / 18;

    // Thread colors inspired by Bengal Indigo, Terracotta, and Raw Ecru Jute
    const indigoColor = "#142238";
    const terracottaColor = "#C45525";
    const ecruColor = "#F7F2EB";
    const goldColor = "#D4AF37";

    const render = () => {
      ctx.fillStyle = "#0D131F";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle background loom frame guides
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += cellW * 2) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 1. Draw Vertical Warp Threads (Bengal Indigo & Raw Ecru)
      for (let i = 0; i < cols; i++) {
        const x = i * cellW + cellW / 2;
        const isIndigo = i % 2 === 0;

        ctx.beginPath();
        ctx.strokeStyle = isIndigo ? "rgba(20, 34, 56, 0.9)" : "rgba(247, 242, 235, 0.4)";
        ctx.lineWidth = Math.max(1.2, cellW * 0.45);

        // Displace thread on mouse interaction
        const distToMouse = Math.abs(x - mouseX);
        let offsetX = 0;
        if (distToMouse < mouseRadius && mouseY > 0 && mouseY < height) {
          const force = (1 - distToMouse / mouseRadius) * 14;
          offsetX = (x < mouseX ? -force : force) * Math.sin((mouseY / height) * Math.PI);
        }

        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, height);
        ctx.stroke();
      }

      // 2. Draw Horizontal Weft Threads (Terracotta & Gold Shuttle Threads)
      const rowsToDraw = Math.min(rows, Math.floor(currentRow));
      for (let j = 0; j < rowsToDraw; j++) {
        const y = j * cellH + cellH / 2;
        const isTerracotta = j % 3 !== 0;

        ctx.beginPath();
        ctx.strokeStyle = isTerracotta ? "rgba(196, 85, 37, 0.85)" : "rgba(212, 175, 55, 0.9)";
        ctx.lineWidth = Math.max(1.2, cellH * 0.45);

        let offsetY = 0;
        const distToMouseY = Math.abs(y - mouseY);
        if (distToMouseY < mouseRadius && mouseX > 0 && mouseX < width) {
          const force = (1 - distToMouseY / mouseRadius) * 12;
          offsetY = (y < mouseY ? -force : force) * Math.sin((mouseX / width) * Math.PI);
        }

        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(width, y + offsetY);
        ctx.stroke();

        // Interlacing stitch nodes (Warp over Weft pattern)
        for (let i = 0; i < cols; i++) {
          const x = i * cellW + cellW / 2;
          let isOver = false;
          if (activePattern === "plain") {
            isOver = (i + j) % 2 === 0;
          } else if (activePattern === "twill") {
            isOver = (i + j * 2) % 3 === 0;
          } else {
            // Jacquard motif pattern
            const dx = i - cols / 2;
            const dy = j - rows / 2;
            isOver = Math.sin(dx * 0.3) * Math.cos(dy * 0.3) > 0;
          }

          if (isOver) {
            ctx.fillStyle = isTerracotta ? terracottaColor : goldColor;
            ctx.fillRect(x - cellW * 0.25, y - cellH * 0.25, cellW * 0.5, cellH * 0.5);
          }
        }
      }

      // 3. Draw Active Loom Shuttle flying across active row
      if (currentRow < rows) {
        const activeY = currentRow * cellH + cellH / 2;
        shuttleX += shuttleSpeed;
        if (shuttleX > width) {
          shuttleX = 0;
          currentRow += 1;
          setWeavingProgress(Math.round((currentRow / rows) * 100));
          if (currentRow >= rows) {
            setIsWeavingComplete(true);
          }
        }

        // Render Flying Wooden Shuttle
        ctx.save();
        ctx.fillStyle = "#E07A4B";
        ctx.shadowColor = "#FF6B2B";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.ellipse(shuttleX, activeY, 16, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Shuttle thread trail
        ctx.strokeStyle = "rgba(255, 200, 100, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, activeY);
        ctx.lineTo(shuttleX, activeY);
        ctx.stroke();
        ctx.restore();
      } else {
        // Floating ambient shimmer once weaving is complete
        const time = Date.now() * 0.002;
        const shimmerX = ((Math.sin(time) + 1) / 2) * width;
        const grad = ctx.createLinearGradient(shimmerX - 80, 0, shimmerX + 80, height);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.5, "rgba(212, 175, 55, 0.12)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activePattern, threadCount]);

  const restartWeave = () => {
    playTactileClick("shuttle");
    setIsWeavingComplete(false);
    setWeavingProgress(0);
    // Triggers re-render
    setThreadCount((prev) => (prev === 64 ? 65 : 64));
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B121E] via-[#0E1726] to-[#0A0F1A] px-4 sm:px-6 lg:px-8 py-16">
      {/* Background Loom Simulation Canvas */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-auto">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      </div>

      {/* Decorative Warm Vignette & Grain */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B121E] via-transparent to-[#0B121E]/80" />
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-70" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Heritage Label Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-200 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-top-4 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
          <span>Concept 01 — Bengal Craftsmanship & Heritage</span>
        </div>

        {/* Hero Main Headline with Cormorant Garamond Serif */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-stone-100 tracking-tight leading-[1.05]">
            Woven with <span className="italic font-normal text-amber-300">Five Centuries</span> of Bengal Mastery
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-300 font-light leading-relaxed">
            From legendary Dhaka Muslin to modern high-precision automated jacquard mills. Sourcing, manufacturing, and global apparel export crafted with unmatched artisanal fidelity.
          </p>
        </div>

        {/* Interactive Loom Controller Bar */}
        <div className="glass-panel max-w-xl mx-auto rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-stone-300 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="text-stone-400">Loom Engine:</span>
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              {(["plain", "twill", "jacquard"] as const).map((pat) => (
                <button
                  key={pat}
                  onClick={() => {
                    playTactileClick("shuttle");
                    setActivePattern(pat);
                  }}
                  className={`px-2.5 py-1 rounded capitalize transition-all ${
                    activePattern === pat
                      ? "bg-amber-600 text-white font-bold shadow"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  {pat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{weavingProgress}% Interlaced</span>
            </div>

            <button
              onClick={restartWeave}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors"
              title="Re-weave thread matrix"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#swatch-explorer"
            onClick={() => playTactileClick("soft")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-sm shadow-2xl shadow-amber-950/70 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Explore Tactile Swatches</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#mill-network"
            onClick={() => playTactileClick("soft")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>45+ Certified Mills</span>
          </a>
        </div>

        {/* Micro Credential Badges */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="space-y-0.5">
            <div className="font-serif text-2xl text-amber-300 font-bold">120s – 300s</div>
            <div className="text-[11px] text-stone-400 font-mono">Ultra-Fine Yarn Counts</div>
          </div>
          <div className="space-y-0.5">
            <div className="font-serif text-2xl text-stone-100 font-bold">1,400+</div>
            <div className="text-[11px] text-stone-400 font-mono">Shuttleless Airjet Looms</div>
          </div>
          <div className="space-y-0.5">
            <div className="font-serif text-2xl text-amber-300 font-bold">99.4%</div>
            <div className="text-[11px] text-stone-400 font-mono">Colorfastness Consistency</div>
          </div>
          <div className="space-y-0.5">
            <div className="font-serif text-2xl text-stone-100 font-bold">GOTS / BCI</div>
            <div className="text-[11px] text-stone-400 font-mono">Organic Traceable Cotton</div>
          </div>
        </div>
      </div>

      {/* Floating Canvas Drag Hint */}
      <div className="absolute bottom-4 right-6 hidden md:flex items-center gap-2 text-[11px] font-mono text-stone-400 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm pointer-events-none">
        <MousePointer className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        <span>Hover or drag canvas to displace warp threads</span>
      </div>
    </div>
  );
}
