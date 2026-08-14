"use client";

import React, { useEffect, useRef, useState } from "react";
import { Zap, Gauge, Flame } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface CinematicRevealProps {
  onComplete?: () => void;
}

export default function MomentumCinematicReveal({ onComplete }: CinematicRevealProps) {
  const [stage, setStage] = useState<"hyperspace" | "boom" | "done">("hyperspace");
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

    // 3D Hyperspace light streak particles
    const starCount = 180;
    const stars: { x: number; y: number; z: number; pz: number; color: string }[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: width,
        color: Math.random() > 0.4 ? "#FF6B2B" : "#FFA94D",
      });
    }

    const startTime = Date.now();
    let speed = 25;

    const render = () => {
      ctx.fillStyle = "rgba(7, 11, 19, 0.35)";
      ctx.fillRect(0, 0, width, height);

      const elapsed = Date.now() - startTime;
      speed += 1.5;

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 250 / star.pz;
        const prevX = star.x * pk + cx;
        const prevY = star.y * pk + cy;
        star.pz = star.z;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min(6, (1 - star.z / width) * 5 + 1);
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      });

      if (elapsed > 1100) {
        setStage("boom");
        setTimeout(() => {
          setStage("done");
          if (onComplete) onComplete();
        }, 600);
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

      {/* Kinetic Diagonal Slit Shutters parting aggressively */}
      <div 
        className={`absolute inset-0 bg-[#060A12] transition-all duration-700 ease-[cubic-bezier(0.9,0,0.1,1)] ${
          stage === "boom" ? "scale-150 opacity-0 filter blur-2xl" : "scale-100 opacity-90"
        }`}
      />

      {/* High-Velocity Speed Headline */}
      <div className={`relative z-10 text-center transition-all duration-300 ${
        stage === "boom" ? "scale-175 opacity-0 filter blur-xl" : "scale-100 opacity-100"
      }`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600/30 border border-orange-500 text-orange-300 text-xs font-mono uppercase tracking-widest mb-4 animate-pulse">
          <Flame className="w-4 h-4 text-orange-400" />
          <span>VELOCITY ACCELERATION ENGAGED</span>
        </div>

        <div className="text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-tighter italic drop-shadow-[0_0_40px_rgba(255,107,43,0.8)]">
          FAST-TRACK 21
        </div>

        <div className="font-mono text-sm text-amber-300 uppercase tracking-widest mt-2">
          CONCEPT → PORT IN 21 DAYS
        </div>
      </div>
    </div>
  );
}
