"use client";

import React, { useEffect, useRef, useState } from "react";
import { Leaf, Sun, Droplets, Sparkles } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface CinematicRevealProps {
  onComplete?: () => void;
}

export default function SustainableCinematicReveal({ onComplete }: CinematicRevealProps) {
  const [stage, setStage] = useState<"growing" | "blooming" | "done">("growing");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    playTactileClick("organic");
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
    const leafParticles: { x: number; y: number; vx: number; vy: number; alpha: number; scale: number; color: string }[] = [];

    const render = () => {
      ctx.fillStyle = "rgba(6, 16, 9, 0.95)";
      ctx.fillRect(0, 0, width, height);

      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / 1200);

      // 1. Draw procedural growing botanical vine
      const cx = width / 2;
      const cy = height;
      const targetY = height * 0.45;

      ctx.save();
      ctx.strokeStyle = "#43684B";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#00FF88";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(cx, cy);

      const currentY = cy - (cy - targetY) * progress;
      const wave = Math.sin(progress * Math.PI * 4) * 40;
      ctx.quadraticCurveTo(cx + wave, (cy + currentY) / 2, cx, currentY);
      ctx.stroke();

      // Branching side tendrils
      if (progress > 0.4) {
        ctx.strokeStyle = "#6B9B75";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, currentY + 60);
        ctx.quadraticCurveTo(cx - 70 * progress, currentY + 30, cx - 90 * progress, currentY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, currentY + 100);
        ctx.quadraticCurveTo(cx + 70 * progress, currentY + 60, cx + 90 * progress, currentY + 30);
        ctx.stroke();
      }

      // Sprouting organic flower particles at the blooming tip
      if (progress > 0.6) {
        for (let i = 0; i < 3; i++) {
          leafParticles.push({
            x: cx + (Math.random() - 0.5) * 30,
            y: currentY,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3 - 1,
            alpha: 1,
            scale: Math.random() * 8 + 4,
            color: Math.random() > 0.5 ? "#FAF8F3" : "#52B788",
          });
        }
      }
      ctx.restore();

      // Render blossoming particles
      for (let i = leafParticles.length - 1; i >= 0; i--) {
        const p = leafParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
        if (p.alpha <= 0) {
          leafParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.scale, p.scale * 0.6, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (progress >= 1) {
        setStage("blooming");
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

      {/* Organic Bloom Vignette */}
      <div 
        className={`absolute inset-0 bg-[#061209] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "blooming" ? "opacity-0 scale-125 filter blur-2xl" : "opacity-90 scale-100"
        }`}
      />

      {/* Central Botanical Badge */}
      <div className={`relative z-10 text-center transition-all duration-400 ${
        stage === "blooming" ? "opacity-0 scale-150 filter blur-lg" : "opacity-100 scale-100"
      }`}>
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-950/80 border border-emerald-400/60 flex items-center justify-center shadow-[0_0_50px_rgba(46,204,113,0.5)] mb-4">
          <Leaf className="w-10 h-10 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <div className="font-fraunces text-3xl sm:text-4xl text-emerald-200 tracking-wide">
          ORGANIC HARMONY
        </div>

        <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mt-1">
          100% GOTS & LEED PLATINUM ZERO-DISCHARGE
        </div>
      </div>
    </div>
  );
}
