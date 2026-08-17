"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Layers } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface CinematicRevealProps {
  onComplete?: () => void;
}

export default function StudioCinematicReveal({ onComplete }: CinematicRevealProps) {
  const [stage, setStage] = useState<"weaving" | "parting" | "done">("weaving");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    playTactileClick("switch");
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
    };
    window.addEventListener("resize", handleResize);

    const startTime = Date.now();

    const render = () => {
      ctx.fillStyle = "rgba(5, 9, 18, 0.96)";
      ctx.fillRect(0, 0, width, height);

      const elapsed = (Date.now() - startTime) * 0.001;
      const progress = Math.min(1, elapsed / 1.2);

      // Draw elegant expanding geometric textile prism
      const cx = width / 2;
      const cy = height / 2;
      const radius = 140 * progress;

      ctx.save();
      ctx.strokeStyle = "#00E5C8";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00E5C8";
      ctx.shadowBlur = 20;

      // Hexagonal loom matrix
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + elapsed;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Radiating golden threads
      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 - elapsed * 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * (radius * 1.5), cy + Math.sin(angle) * (radius * 1.5));
        ctx.stroke();
      }
      ctx.restore();

      if (progress >= 1) {
        setStage("parting");
        setTimeout(() => {
          setStage("done");
          if (onComplete) onComplete();
        }, 700);
      } else {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [onComplete]);

  if (stage === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden bg-black/95">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Elegant Vertical Split Curtains parting smoothly */}
      <div 
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#050912] border-b border-cyan-400/40 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "parting" ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div 
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#050912] border-t border-cyan-400/40 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "parting" ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Center Studio Emblem */}
      <div className={`relative z-10 text-center max-w-xl px-6 transition-all duration-500 ${
        stage === "parting" ? "opacity-0 scale-125 filter blur-xl" : "opacity-100 scale-100"
      }`}>
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-700 to-indigo-950 flex items-center justify-center shadow-[0_0_50px_rgba(0,229,200,0.5)] ring-2 ring-cyan-400/50 mb-4 animate-pulse">
          <span className="font-serif font-black text-white text-3xl tracking-tighter">TB</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
          THREADWORKS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400">STUDIO</span>
        </h1>

        <p className="text-xs sm:text-sm font-mono text-stone-300 tracking-widest uppercase mt-2">
          Enterprise Apparel Powerhouse • Dhaka & Gazipur
        </p>
      </div>
    </div>
  );
}
