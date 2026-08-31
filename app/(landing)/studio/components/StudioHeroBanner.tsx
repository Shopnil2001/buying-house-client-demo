"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Leaf, Compass, Feather, Play, Layers } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

export default function StudioHeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activePreset, setActivePreset] = useState<"silk" | "linen" | "indigo">("silk");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Floating natural cotton fibers
    const particleCount = 35;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 + 0.1,
        vy: -Math.random() * 0.4 - 0.15,
        radius: Math.random() * 4 + 2,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      // Render floating golden fiber motes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.fillStyle = `rgba(245, 239, 235, ${p.alpha})`;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Flowing silk waves
      const waves = [
        {
          fill: "rgba(224, 178, 122, 0.1)",
          stroke: "rgba(224, 178, 122, 0.35)",
          speed: 0.8,
          amplitude: 45,
          freq: 0.003,
          baseY: height * 0.65,
        },
        {
          fill: "rgba(194, 103, 71, 0.14)",
          stroke: "rgba(194, 103, 71, 0.4)",
          speed: 1.1,
          amplitude: 55,
          freq: 0.0025,
          baseY: height * 0.72,
        },
      ];

      waves.forEach((w) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 18) {
          const y =
            w.baseY +
            Math.sin(x * w.freq + time * w.speed) * w.amplitude +
            Math.cos(x * w.freq * 1.5 + time * 0.6) * (w.amplitude * 0.3);

          if (x === 0) ctx.lineTo(0, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = w.fill;
        ctx.fill();

        ctx.strokeStyle = w.stroke;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse Parallax movement tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 30, y: y * 30 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-24 bg-[#080E17]"
    >
      {/* 1. Cinematic Background Layer with Parallax Macro Silk Image */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out scale-110 opacity-30"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 0)`,
        }}
      >
        <Image
          src="/images/silk_macro.jpg"
          alt="Luxury Bengal Silk Macro"
          fill
          priority
          className="object-cover object-center filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080E17] via-[#080E17]/70 to-[#080E17]/80" />
      </div>

      {/* 2. Interactive Fluid Waves & Floating Fibers Canvas */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* 3. Hero Editorial Content (Midground with Parallax) */}
      <div 
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0)`,
        }}
      >
        {/* Subtle Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#142030]/90 border border-amber-500/30 text-amber-200 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "10s" }} />
          <span>Premier Bangladesh Sourcing & Manufacturing Atelier</span>
        </div>

        {/* Editorial Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-[#FAF7F2] tracking-tight leading-[1.03]">
            Crafted with <span className="italic text-[#E0B27A]">Tactile Mastery</span> & Cinematic Precision
          </h1>
          <p className="max-w-2xl mx-auto text-[#D6CFC7] text-base sm:text-lg md:text-xl font-light leading-relaxed font-sans">
            A vertically integrated textile powerhouse bridging five centuries of Bengal craftsmanship with modern automated knitting, laser denim finishing, and certified LEED Platinum sustainability.
          </p>
        </div>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#spline-3d-visualizer"
            onClick={() => playTactileClick("switch")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C26747] via-[#D48259] to-[#C26747] hover:from-[#B55C3E] hover:to-[#B55C3E] text-white font-semibold text-sm shadow-2xl shadow-orange-950/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch 3D Spatial Visualizer</span>
          </a>

          <a
            href="#our-products"
            onClick={() => playTactileClick("soft")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[#FAF7F2] hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3D Glassmorphic Telemetry Cards */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1 shadow-lg hover:scale-105 transition-transform">
            <div className="font-serif text-2xl sm:text-3xl text-[#E0B27A] font-bold">150M+</div>
            <div className="text-[11px] text-[#A59E95] font-mono">Finished Units / Year</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1 shadow-lg hover:scale-105 transition-transform">
            <div className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-bold">5 LEED Platinum</div>
            <div className="text-[11px] text-[#A59E95] font-mono">Zero-Discharge Facilities</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1 shadow-lg hover:scale-105 transition-transform">
            <div className="font-serif text-2xl sm:text-3xl text-[#E0B27A] font-bold">21 – 30 Days</div>
            <div className="text-[11px] text-[#A59E95] font-mono">Fast-Track Turnaround</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1 shadow-lg hover:scale-105 transition-transform">
            <div className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-bold">100% GOTS</div>
            <div className="text-[11px] text-[#A59E95] font-mono">Traceable Organic Cotton</div>
          </div>
        </div>
      </div>
    </div>
  );
}
