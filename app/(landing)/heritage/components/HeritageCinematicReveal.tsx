"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface CinematicRevealProps {
  onComplete?: () => void;
}

export default function HeritageCinematicReveal({ onComplete }: CinematicRevealProps) {
  const [stage, setStage] = useState<"drawing" | "parting" | "done">("drawing");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    playTactileClick("shuttle");
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

    // Embroidery / Golden Loom needle trajectory
    let progress = 0;
    const points: { x: number; y: number }[] = [];
    const sparkParticles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number; color: string }[] = [];

    // Create golden weaving curve
    for (let t = 0; t <= 1; t += 0.005) {
      const x = width * 0.1 + width * 0.8 * t;
      const y = height * 0.5 + Math.sin(t * Math.PI * 6) * 120 * (1 - t * 0.4);
      points.push({ x, y });
    }

    const startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark silk backdrop
      ctx.fillStyle = "rgba(11, 18, 30, 0.96)";
      ctx.fillRect(0, 0, width, height);

      progress = Math.min(1, (Date.now() - startTime) / 1200);

      // Draw historical Mughal Bengal tapestry filigree lines
      const activeIdx = Math.floor(progress * (points.length - 1));
      
      // Draw golden woven thread
      ctx.save();
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      for (let i = 0; i <= activeIdx; i++) {
        if (i === 0) ctx.moveTo(points[i].x, points[i].y);
        else ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // Parallel terracotta thread
      ctx.strokeStyle = "rgba(196, 85, 37, 0.8)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#C45525";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for (let i = 0; i <= activeIdx; i++) {
        const offset = Math.sin(i * 0.2) * 16;
        if (i === 0) ctx.moveTo(points[i].x, points[i].y + offset);
        else ctx.lineTo(points[i].x, points[i].y + offset);
      }
      ctx.stroke();
      ctx.restore();

      // Needle head / shuttle spark generator
      if (activeIdx < points.length - 1) {
        const currentPt = points[activeIdx];
        
        // Spawn sparks
        for (let s = 0; s < 3; s++) {
          sparkParticles.push({
            x: currentPt.x,
            y: currentPt.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 1,
            alpha: 1,
            size: Math.random() * 3 + 1,
            color: Math.random() > 0.5 ? "#FFD700" : "#E07A4B",
          });
        }

        // Draw glowing shuttle head
        ctx.save();
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(currentPt.x, currentPt.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render sparks
      for (let i = sparkParticles.length - 1; i >= 0; i--) {
        const p = sparkParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        if (p.alpha <= 0) {
          sparkParticles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (progress >= 1) {
        setStage("parting");
        setTimeout(() => {
          setStage("done");
          if (onComplete) onComplete();
        }, 800);
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
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Kinetic Split Curtains that slice open vertically */}
      <div 
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#0A0E17] border-b-2 border-amber-500/60 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "parting" ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div 
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#0A0E17] border-t-2 border-amber-500/60 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "parting" ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Center Cinematic Emblem Stamp */}
      <div className={`relative z-10 text-center transition-all duration-500 ${stage === "parting" ? "opacity-0 scale-125 filter blur-lg" : "opacity-100 scale-100"}`}>
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 via-rose-700 to-indigo-950 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.6)] ring-2 ring-amber-300/60 mb-4 animate-pulse">
          <span className="font-serif font-black text-white text-3xl tracking-tighter">TB</span>
        </div>
        <div className="font-serif text-2xl sm:text-3xl text-amber-200 tracking-widest uppercase font-light drop-shadow-lg">
          THREADWORKS HERITAGE
        </div>
        <p className="text-xs font-mono text-amber-400/80 tracking-widest uppercase mt-1">
          Crafting 500-Year Bengal Weaving Legacy
        </p>
      </div>
    </div>
  );
}
