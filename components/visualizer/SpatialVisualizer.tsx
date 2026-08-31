"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Sparkles, Compass, ShieldCheck, Layers, ArrowDown } from "lucide-react";
import { useScrollCamera } from "./useScrollCamera";

// Lazy-load the R3F Canvas component without SSR
const SpatialVisualizerScene = dynamic(
  () => import("./SpatialVisualizerScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#080E17]">
        <div className="flex items-center gap-3 text-xs font-mono text-[#E0B27A]">
          <div className="w-4 h-4 border-2 border-[#E0B27A] border-t-transparent rounded-full animate-spin" />
          <span>Calibrating 3D Optical Matrix...</span>
        </div>
      </div>
    ),
  }
);

export default function SpatialVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { scrollProgress, cameraStateRef } = useScrollCamera(containerRef);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 2, y: y * 2 });
  };

  // Determine active stage based on scrollProgress
  const isStage1 = scrollProgress < 0.35;
  const isStage2 = scrollProgress >= 0.35 && scrollProgress < 0.7;
  const isStage3 = scrollProgress >= 0.7;

  return (
    <div
      ref={containerRef}
      id="spline-3d-visualizer"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#070D16] overflow-hidden select-none border-t border-b border-white/10"
    >
      {/* 1. Desktop & Tablet: Full 3D React Three Fiber Scene */}
      <div className="hidden md:block absolute inset-0 z-0">
        <SpatialVisualizerScene
          scrollProgress={scrollProgress}
          cameraStateRef={cameraStateRef}
          mousePos={mousePos}
        />
      </div>

      {/* 2. Mobile Fallback (below md): High-Res Macro Image with Ambient Glow */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="/images/silk_macro.jpg"
          alt="3D Silk Ribbon Visualizer Fallback"
          fill
          className="object-cover opacity-35 filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D16] via-transparent to-[#070D16]" />
      </div>

      {/* 3. Top HUD Status Bar */}
      <div className="absolute top-8 inset-x-0 z-20 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121A28]/90 border border-amber-500/30 text-amber-200 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-xl">
          <Compass className="w-3.5 h-3.5 text-[#E0B27A] animate-spin" style={{ animationDuration: "12s" }} />
          <span>Spatial 3D Textile Choreography</span>
        </div>

        {/* Live Scroll Progress Pill */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[#D6CFC7] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E0B27A] animate-ping" />
            <span className="text-[#A59E95] uppercase">Focal Matrix:</span>
            <span className="text-white font-bold">{(scrollProgress * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* 4. Timed Editorial Text Checkpoints (Pinned Choreography) */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center pointer-events-none">
        {/* Checkpoint 1 (0% -> 35%) */}
        <div
          className={`absolute left-6 sm:left-12 max-w-xl space-y-4 transition-all duration-700 ease-out ${
            isStage1
              ? "opacity-100 translate-y-0 scale-100 blur-0"
              : "opacity-0 -translate-y-8 scale-95 blur-sm pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#E0B27A] uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / TACTILE MOLECULAR WEAVE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight leading-[1.08]">
            The Living Architecture of <span className="italic text-[#E0B27A]">Bengal Silk</span>
          </h2>

          <p className="text-sm sm:text-base text-[#D6CFC7] leading-relaxed font-sans max-w-md">
            Before a single thread touches the automated Italian loom, our engineers model parametric fiber tension in virtual 3D space, eliminating structural shrinkage and torque.
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs font-mono">
            <div>
              <span className="text-[#A59E95] block text-[10px] uppercase">Sampling Speed:</span>
              <strong className="text-white text-sm font-bold">48-Hr 3D Digital Avatars</strong>
            </div>
            <div className="h-6 w-[1px] bg-white/15" />
            <div>
              <span className="text-[#A59E95] block text-[10px] uppercase">Material Purity:</span>
              <strong className="text-[#E0B27A] text-sm font-bold">100% GOTS Organic</strong>
            </div>
          </div>
        </div>

        {/* Checkpoint 2 (35% -> 70%) */}
        <div
          className={`absolute right-6 sm:right-12 max-w-xl text-right space-y-4 transition-all duration-700 ease-out ${
            isStage2
              ? "opacity-100 translate-y-0 scale-100 blur-0"
              : "opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-end gap-2 text-xs font-mono text-[#E0B27A] uppercase tracking-widest font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#78A882]" />
            <span>02 / MICROSCOPIC PRECISION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight leading-[1.08]">
            Zero-Defect <span className="italic text-[#78A882]">Optical Tolerance</span>
          </h2>

          <p className="text-sm sm:text-base text-[#D6CFC7] leading-relaxed font-sans max-w-md ml-auto">
            Camera dollying through warp and weft intersections with statistical AQL 1.5 rigor. In-house ISO 17025 testing guarantees colorfastness to 4.5+ delta grade.
          </p>

          <div className="pt-2 flex items-center justify-end gap-6 text-xs font-mono">
            <div>
              <span className="text-[#A59E95] block text-[10px] uppercase">First-Pass Yield:</span>
              <strong className="text-[#78A882] text-sm font-bold">99.8% AQL Compliance</strong>
            </div>
            <div className="h-6 w-[1px] bg-white/15" />
            <div>
              <span className="text-[#A59E95] block text-[10px] uppercase">Dyeing Chemistry:</span>
              <strong className="text-white text-sm font-bold">ZDHC Level 3 ZLD</strong>
            </div>
          </div>
        </div>

        {/* Checkpoint 3 (70% -> 100%) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 text-center max-w-2xl space-y-4 transition-all duration-700 ease-out ${
            isStage3
              ? "opacity-100 translate-y-0 scale-100 blur-0"
              : "opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E0B27A] uppercase tracking-widest font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>03 / INDUSTRIAL SCALE ATELIER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight leading-[1.08]">
            150 Million Garments for <span className="italic text-[#E0B27A]">Global Leaders</span>
          </h2>

          <p className="text-sm sm:text-base text-[#D6CFC7] leading-relaxed font-sans max-w-lg mx-auto">
            Vertically integrated across 5 LEED Platinum industrial campuses in Gazipur and Dhaka, powering seasonal programs for Nike, Adidas, Target, and Levi's.
          </p>

          <div className="pt-3 flex items-center justify-center gap-8 text-xs font-mono">
            <div>
              <span className="text-[#A59E95] block text-[10px] uppercase">Solar Power:</span>
              <strong className="text-[#78A882] text-base font-bold">15.8 MW Microgrid</strong>
            </div>
            <div className="h-6 w-[1px] bg-white/15" />
            <div>
              <span className="text-[#A59E95] block text-[10px] uppercase">Fast-Track Turn:</span>
              <strong className="text-[#C26747] text-base font-bold">21–30 Days Lead</strong>
            </div>
            <div className="h-6 w-[1px] bg-white/15" />
            <div>
              <span className="text-[#A59E95] block text-[10px] uppercase">Associates:</span>
              <strong className="text-white text-base font-bold">30,000+ Skilled</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Scroll Indicator */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center items-center pointer-events-none">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#A59E95] bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          <ArrowDown className="w-3.5 h-3.5 text-[#E0B27A] animate-bounce" />
          <span>Scroll to traverse 3D spatial thread matrix</span>
        </div>
      </div>
    </div>
  );
}
