"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Layers, RotateCcw, Box } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface CinematicRevealProps {
  onComplete?: () => void;
}

export default function InterloopCinematicReveal({ onComplete }: CinematicRevealProps) {
  const [stage, setStage] = useState<"weaving" | "unfurling" | "done">("weaving");
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
    
    // Ribbon spline wave points
    const ribbons: { color: string; offset: number; width: number; speed: number }[] = [
      { color: "#00E5C8", offset: 0, width: 30, speed: 2 },
      { color: "#FF6B2B", offset: Math.PI / 3, width: 24, speed: 2.2 },
      { color: "#D4AF37", offset: Math.PI * 0.7, width: 28, speed: 1.8 },
      { color: "#2D5033", offset: Math.PI, width: 22, speed: 2.5 },
    ];

    const render = () => {
      ctx.fillStyle = "rgba(8, 12, 20, 0.96)";
      ctx.fillRect(0, 0, width, height);

      const elapsed = (Date.now() - startTime) * 0.001;
      const progress = Math.min(1, elapsed / 1.3);

      // Draw multi-layer 3D kinetic fabric ribbons twisting in center
      ribbons.forEach((ribbon) => {
        ctx.save();
        ctx.strokeStyle = ribbon.color;
        ctx.fillStyle = ribbon.color;
        ctx.globalAlpha = 0.85;
        ctx.shadowColor = ribbon.color;
        ctx.shadowBlur = 18;
        ctx.lineWidth = ribbon.width * (1 - progress * 0.3);

        ctx.beginPath();
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = t * width;
          const wave1 = Math.sin(t * 8 + elapsed * ribbon.speed + ribbon.offset) * (140 * progress);
          const wave2 = Math.cos(t * 5 + elapsed * 1.5) * (60 * (1 - progress));
          const y = height / 2 + wave1 + wave2;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      if (progress >= 1) {
        setStage("unfurling");
        setTimeout(() => {
          setStage("done");
          if (onComplete) onComplete();
        }, 750);
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

      {/* Kinetic Vertical & Horizontal Split Doors parting with cubic ease */}
      <div 
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#080E18] border-b border-cyan-400/50 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "unfurling" ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div 
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#080E18] border-t border-cyan-400/50 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "unfurling" ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Center Cinematic Title Seal */}
      <div className={`relative z-10 text-center max-w-xl px-6 transition-all duration-500 ${
        stage === "unfurling" ? "opacity-0 scale-125 filter blur-xl" : "opacity-100 scale-100"
      }`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span>Integrated Textile Powerhouse</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-sans drop-shadow-[0_0_35px_rgba(0,229,200,0.6)]">
          INTERLOOP <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-orange-500">BANGLADESH</span>
        </h1>

        <p className="text-xs sm:text-sm font-mono text-stone-300 tracking-wider uppercase mt-3">
          Multi-Category Apparel • Hosiery • Seamless • Denim • Circular Mills
        </p>
      </div>
    </div>
  );
}
