"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Leaf, Compass, Feather } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

export default function StudioHeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePreset, setActivePreset] = useState<"silk" | "linen" | "indigo">("silk");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 750);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse interaction for organic wave distortion
    let mouseX = width * 0.5;
    let mouseY = height * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      targetMouseX = width * 0.5;
      targetMouseY = height * 0.5;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Floating natural cotton fluff particles
    const particleCount = 28;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3 + 0.1,
        vy: -Math.random() * 0.4 - 0.1,
        radius: Math.random() * 5 + 2,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.01;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Deep, soothing, warm textile background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (activePreset === "silk") {
        bgGrad.addColorStop(0, "#101928");
        bgGrad.addColorStop(0.5, "#152033");
        bgGrad.addColorStop(1, "#0C1320");
      } else if (activePreset === "linen") {
        bgGrad.addColorStop(0, "#1C1713");
        bgGrad.addColorStop(0.5, "#26201A");
        bgGrad.addColorStop(1, "#14100D");
      } else {
        bgGrad.addColorStop(0, "#0E1826");
        bgGrad.addColorStop(0.5, "#122033");
        bgGrad.addColorStop(1, "#09101A");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render flowing, organic fabric waves with soothing pastel tones
      const layers = activePreset === "silk" ? [
        {
          fill: "rgba(212, 175, 55, 0.08)",
          stroke: "rgba(212, 175, 55, 0.25)",
          speed: 0.8,
          amplitude: 45,
          freq: 0.0035,
          baseY: height * 0.58,
        },
        {
          fill: "rgba(194, 103, 71, 0.12)",
          stroke: "rgba(194, 103, 71, 0.3)",
          speed: 1.1,
          amplitude: 60,
          freq: 0.0028,
          baseY: height * 0.65,
        },
        {
          fill: "rgba(61, 90, 69, 0.15)",
          stroke: "rgba(100, 140, 110, 0.35)",
          speed: 0.6,
          amplitude: 50,
          freq: 0.004,
          baseY: height * 0.72,
        },
      ] : activePreset === "linen" ? [
        {
          fill: "rgba(212, 185, 150, 0.12)",
          stroke: "rgba(212, 185, 150, 0.3)",
          speed: 0.7,
          amplitude: 40,
          freq: 0.003,
          baseY: height * 0.6,
        },
        {
          fill: "rgba(180, 140, 100, 0.15)",
          stroke: "rgba(180, 140, 100, 0.35)",
          speed: 1.0,
          amplitude: 55,
          freq: 0.0025,
          baseY: height * 0.68,
        },
      ] : [
        {
          fill: "rgba(35, 60, 95, 0.25)",
          stroke: "rgba(60, 100, 150, 0.4)",
          speed: 0.9,
          amplitude: 50,
          freq: 0.0032,
          baseY: height * 0.62,
        },
        {
          fill: "rgba(200, 120, 90, 0.12)",
          stroke: "rgba(200, 120, 90, 0.3)",
          speed: 1.2,
          amplitude: 45,
          freq: 0.004,
          baseY: height * 0.7,
        },
      ];

      layers.forEach((layer) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 18) {
          // Gentle tactile mouse wave attraction
          const distToMouse = Math.abs(x - mouseX);
          const mouseLift = distToMouse < 220 
            ? Math.cos((distToMouse / 220) * (Math.PI / 2)) * 30 
            : 0;

          const y =
            layer.baseY +
            Math.sin(x * layer.freq + time * layer.speed) * layer.amplitude +
            Math.cos(x * layer.freq * 1.6 + time * 0.5) * (layer.amplitude * 0.35) -
            mouseLift;

          if (x === 0) ctx.lineTo(0, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = layer.fill;
        ctx.fill();

        ctx.strokeStyle = layer.stroke;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      });

      // Render floating organic cotton particles
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
        ctx.shadowColor = "rgba(245, 239, 235, 0.3)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Subtle warm radial sheen
      const sheenX = ((Math.sin(time * 0.5) + 1) / 2) * width;
      const sheen = ctx.createRadialGradient(sheenX, height * 0.45, 30, sheenX, height * 0.45, width * 0.4);
      sheen.addColorStop(0, "rgba(245, 235, 220, 0.05)");
      sheen.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activePreset]);

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-24">
      {/* Background Interactive Organic Cloth Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
      </div>

      {/* Gentle Radial Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0E1520] via-transparent to-[#0E1520]/80" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#182335]/90 border border-amber-500/30 text-amber-200 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-xl">
          <Feather className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Premier Bangladesh Sourcing & Manufacturing Atelier</span>
        </div>

        {/* Soothing Editorial Headline with Cormorant Garamond Serif */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-[#FAF7F2] tracking-tight leading-[1.05]">
            Crafted with <span className="italic font-normal text-[#E0B27A]">Tactile Mastery</span> & Sustainable Integrity
          </h1>
          <p className="max-w-2xl mx-auto text-[#D6CFC7] text-base sm:text-lg md:text-xl font-light leading-relaxed font-sans">
            A vertically integrated textile powerhouse bridging five centuries of Bengal craftsmanship with modern automated knitting, laser denim finishing, and certified LEED Platinum sustainability.
          </p>
        </div>

        {/* Preset Fabric Theme Toggle */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md text-xs font-mono">
          <span className="text-[#A59E95] px-2 text-[11px] uppercase">Drape Mood:</span>
          {(["silk", "linen", "indigo"] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => {
                playTactileClick("soft");
                setActivePreset(preset);
              }}
              className={`px-3 py-1.5 rounded-xl capitalize font-medium transition-all ${
                activePreset === preset
                  ? "bg-[#C26747] text-white shadow-md shadow-orange-950 font-bold"
                  : "text-[#D6CFC7] hover:text-white hover:bg-white/5"
              }`}
            >
              {preset} Weave
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#our-products"
            onClick={() => playTactileClick("soft")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C26747] via-[#D48259] to-[#C26747] hover:from-[#B55C3E] hover:to-[#B55C3E] text-white font-semibold text-sm shadow-xl shadow-orange-950/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Explore Product Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#insights-pinboard"
            onClick={() => playTactileClick("soft")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[#EFEBE4] hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Atelier Moodboard</span>
          </a>
        </div>

        {/* Soothing Key Credential Pills */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="space-y-0.5">
            <div className="font-serif text-2xl text-[#E0B27A] font-bold">150M+</div>
            <div className="text-[11px] text-[#A59E95] font-mono">Finished Units / Year</div>
          </div>
          <div className="space-y-0.5">
            <div className="font-serif text-2xl text-[#FAF7F2] font-bold">5 LEED Platinum</div>
            <div className="text-[11px] text-[#A59E95] font-mono">Zero-Discharge Facilities</div>
          </div>
          <div className="space-y-0.5">
            <div className="font-serif text-2xl text-[#E0B27A] font-bold">21 – 30 Days</div>
            <div className="text-[11px] text-[#A59E95] font-mono">Fast-Track Turnaround</div>
          </div>
          <div className="space-y-0.5">
            <div className="font-serif text-2xl text-[#FAF7F2] font-bold">100% GOTS</div>
            <div className="text-[11px] text-[#A59E95] font-mono">Traceable Organic Cotton</div>
          </div>
        </div>
      </div>
    </div>
  );
}
