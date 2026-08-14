"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Crosshair, Cpu, Scan, CheckCircle2 } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface CinematicRevealProps {
  onComplete?: () => void;
}

export default function PrecisionCinematicReveal({ onComplete }: CinematicRevealProps) {
  const [stage, setStage] = useState<"scanning" | "slicing" | "done">("scanning");
  const [calibPercent, setCalibPercent] = useState(0);

  useEffect(() => {
    playTactileClick("laser");

    const interval = setInterval(() => {
      setCalibPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage("slicing");
          setTimeout(() => {
            setStage("done");
            if (onComplete) onComplete();
          }, 700);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (stage === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden bg-black/95">
      {/* 4K Technical Grid with radial pulse */}
      <div className="absolute inset-0 tech-grid opacity-40 animate-pulseSlow" />

      {/* Laser Slicing Curtains (Left & Right parting horizontally) */}
      <div 
        className={`absolute inset-y-0 left-0 w-1/2 bg-[#050C14] border-r border-cyan-400/80 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "slicing" ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      <div 
        className={`absolute inset-y-0 right-0 w-1/2 bg-[#050C14] border-l border-cyan-400/80 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === "slicing" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Center Laser Scanner Target HUD */}
      <div className={`relative z-10 flex flex-col items-center max-w-lg w-full p-8 text-center transition-all duration-400 ${
        stage === "slicing" ? "opacity-0 scale-150 filter blur-xl" : "opacity-100 scale-100"
      }`}>
        {/* Hologram Reticle */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-dashed border-cyan-300 animate-spin" style={{ animationDuration: "10s" }} />
          <div className="absolute inset-6 rounded-full border-2 border-cyan-500 shadow-[0_0_30px_#00E5C8]" />
          <Crosshair className="w-12 h-12 text-cyan-300 animate-spin" style={{ animationDuration: "4s" }} />
        </div>

        <div className="space-y-2 font-mono text-center w-full">
          <div className="text-[11px] text-cyan-400 tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <Scan className="w-3.5 h-3.5" />
            <span>OPTICAL QC SYSTEM BOOT</span>
          </div>

          <div className="text-3xl sm:text-4xl font-space font-black text-white tracking-tight">
            CALIBRATING AQL 1.5
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-cyan-500/40 my-3">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 transition-all duration-75 shadow-[0_0_15px_#00E5C8]"
              style={{ width: `${calibPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-400">
            <span>DELTA-E SPECTRAL LOCK: PASS</span>
            <span className="text-cyan-300 font-bold">{calibPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
