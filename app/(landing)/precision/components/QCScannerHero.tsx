"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, 
  Crosshair, 
  Scan, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Maximize2,
  FileCheck,
  Cpu
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

type InspectionMode = "flawless" | "slub_defect" | "shade_variation" | "density_deviation";

export default function QCScannerHero() {
  const [mousePos, setMousePos] = useState({ x: 420, y: 260 });
  const [scanActive, setScanActive] = useState(true);
  const [mode, setMode] = useState<InspectionMode>("flawless");
  const [sampledCount, setSampledCount] = useState(1280);
  const [defectCount, setDefectCount] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(10);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleModeSwitch = (newMode: InspectionMode) => {
    playTactileClick("laser");
    setMode(newMode);
    if (newMode === "flawless") {
      setDefectCount(0);
    } else {
      setDefectCount(1);
    }
  };

  return (
    <div className="relative min-h-[94vh] flex items-center justify-center bg-[#070D14] text-slate-100 overflow-hidden px-4 sm:px-6 lg:px-8 py-16 tech-grid">
      {/* Laser Cyan Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8">
        {/* Top Concept Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-lg shadow-cyan-950/50">
            <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Concept 02 — Precision & Quality Control</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>AQL 1.5 ACTIVE CALIBRATION</span>
            </span>
            <span className="text-slate-600">•</span>
            <span>ISO 17025 ACCREDITED LABS</span>
          </div>
        </div>

        {/* Hero Title and Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-space font-bold tracking-tight text-white uppercase leading-[1.05]">
            Zero-Defect <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Optical Rigor</span> & Audit Compliance
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed font-sans">
            Eliminate overseas sourcing risk. Every lot tested against AQL 1.5 Major / 2.5 Minor standards with spectrophotometric color matching, tensile burst tests, and 7-stage quality gates.
          </p>
        </div>

        {/* Bespoke Interactive Optical QC Inspection Scanner HUD */}
        <div 
          ref={containerRef}
          className="relative rounded-3xl bg-[#0B1522] border border-cyan-500/30 p-4 sm:p-6 shadow-2xl overflow-hidden group cursor-crosshair"
        >
          {/* Top HUD Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
                <Scan className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
                <span>SPECTRAL SCANNER: 450nm – 700nm</span>
              </div>
              <span className="hidden md:inline text-slate-400">
                COORD: X:{Math.round(mousePos.x)} | Y:{Math.round(mousePos.y)}
              </span>
            </div>

            {/* Test Condition Switcher */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase px-2">Simulate:</span>
              <button
                onClick={() => handleModeSwitch("flawless")}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  mode === "flawless" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Zero-Flaw Sample
              </button>
              <button
                onClick={() => handleModeSwitch("slub_defect")}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  mode === "slub_defect" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Slub Flaw
              </button>
              <button
                onClick={() => handleModeSwitch("shade_variation")}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  mode === "shade_variation" ? "bg-rose-500 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Delta-E Delta
              </button>
            </div>
          </div>

          {/* Scanner Viewport with Laser Grid & Fabric Swatch */}
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/20 my-4 flex items-center justify-center">
            {/* High-Tech Fabric Texture Canvas Stand-in */}
            <div 
              className="absolute inset-0 bg-[#0E1B2C] opacity-90"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(0, 229, 200, 0.08) 1px, transparent 1px),
                  linear-gradient(rgba(0, 229, 200, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: `${zoomLevel * 3}px ${zoomLevel * 3}px`,
              }}
            />

            {/* Sweep Laser Beam Effect */}
            {scanActive && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00E5C8] animate-scanline" />
              </div>
            )}

            {/* Interactive Target Crosshair Tracking Cursor */}
            <div 
              className="absolute pointer-events-none transition-transform duration-75 ease-out"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-16 h-16 rounded-full border border-cyan-400/80 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,200,0.3)]">
                <Crosshair className="w-6 h-6 text-cyan-300 animate-spin" style={{ animationDuration: "12s" }} />
              </div>
              <div className="absolute top-16 left-6 bg-slate-950/90 text-[10px] font-mono px-2 py-1 rounded border border-cyan-400/40 text-cyan-300 whitespace-nowrap shadow-xl">
                FOV: 50x Magnification • {mode === "flawless" ? "SURFACE CLEAN" : "ANOMALY FLAGGED"}
              </div>
            </div>

            {/* Defect Marker if in defect mode */}
            {mode !== "flawless" && (
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl bg-rose-950/80 border border-rose-500 text-rose-300 font-mono text-xs flex items-center gap-2 shadow-2xl animate-bounce">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>
                  {mode === "slub_defect" ? "THICK SLUB ANOMALY > 0.4mm REJECTED" : "COLOR DEVIATION ΔE = 1.42 (TOLERANCE < 0.8)"}
                </span>
              </div>
            )}

            {/* Live Spec Telemetry HUD Card (Pinned to Top Right of Viewport) */}
            <div className="absolute top-4 right-4 max-w-xs w-full bg-slate-900/90 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-4 font-mono text-xs space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-cyan-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  LIVE PARAMETERS
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
                  {mode === "flawless" ? "100% PASS" : "REJECT FLAGGED"}
                </span>
              </div>

              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Fabric Density:</span>
                  <span className={mode === "flawless" ? "text-cyan-300" : "text-amber-400"}>
                    {mode === "flawless" ? "312 GSM (±1.1%)" : "284 GSM (-8.4%) [REJECT]"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Color Fastness:</span>
                  <span className="text-cyan-300">Grade 4.8 / 5.0 (ISO 105)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tensile Burst:</span>
                  <span className="text-cyan-300">482 N (ASTM D5034)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shrinkage (Wash):</span>
                  <span className="text-cyan-300">-1.2% Warp / -0.9% Weft</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 font-bold">
                  <span className="text-slate-400">AQL 1.5 Status:</span>
                  <span className={mode === "flawless" ? "text-emerald-400" : "text-rose-400"}>
                    {mode === "flawless" ? "ACCEPTED (0 DEFECTS)" : "QUARANTINED FOR RE-AUDIT"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span>UNITS SAMPLED: <strong className="text-white">1,280 PCS</strong></span>
              <span>DEFECTS LOGGED: <strong className={defectCount === 0 ? "text-emerald-400" : "text-rose-400"}>{defectCount}</strong></span>
              <span>CONFIDENCE INTERVAL: <strong className="text-cyan-400">99.8%</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500">OPTICAL RESOLUTION: 4K TELECENTRIC</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#seven-stage-gate"
            onClick={() => playTactileClick("laser")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-950/80 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Review 7-Stage Quality Gate</span>
            <FileCheck className="w-4 h-4" />
          </a>

          <a
            href="#aql-calculator"
            onClick={() => playTactileClick("soft")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-cyan-500/30 text-cyan-200 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Open AQL 1.5 / 2.5 Sampling Tool</span>
          </a>
        </div>
      </div>
    </div>
  );
}
