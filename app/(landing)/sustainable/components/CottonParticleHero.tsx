"use client";

import React, { useRef, useEffect, useState } from "react";
import { Leaf, Droplets, Sun, ShieldCheck, ArrowRight, Sparkles, Wind, TreePine } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface FiberParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  drift: number;
  rotation: number;
  vRot: number;
}

export default function CottonParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bollOpenProgress, setBollOpenProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize 60 floating organic cotton seed fiber particles
    const particleCount = 55;
    const particles: FiberParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        vx: (Math.random() - 0.5) * 0.4 + 0.2,
        vy: (Math.random() - 0.5) * 0.3 - 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        drift: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let startTime = Date.now();

    const render = () => {
      ctx.fillStyle = "#0A140E";
      ctx.fillRect(0, 0, width, height);

      // Ambient organic green glow
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.4,
        width * 0.6
      );
      grad.addColorStop(0, "rgba(45, 80, 51, 0.25)");
      grad.addColorStop(0.5, "rgba(21, 40, 25, 0.12)");
      grad.addColorStop(1, "rgba(10, 20, 14, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const elapsed = (Date.now() - startTime) * 0.001;

      // Draw floating cotton particles
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(elapsed + p.drift) * 0.3;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap around edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Repel gently from cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (1 - dist / 100) * 1.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Render soft cotton tuft
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `rgba(250, 248, 243, ${p.alpha})`;
        ctx.shadowColor = "rgba(250, 248, 243, 0.4)";
        ctx.shadowBlur = 8;

        // Organic cotton petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 2, p.radius, 0, 0, Math.PI * 2);
        ctx.fill();

        // Secondary tuft
        ctx.beginPath();
        ctx.ellipse(p.radius * 0.8, -p.radius * 0.4, p.radius * 1.2, p.radius * 0.8, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative min-h-[94vh] flex items-center justify-center bg-[#08120B] text-stone-100 overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
      {/* Generative Floating Cotton Physics Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
      </div>

      {/* Gentle Radial Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08120B] via-transparent to-[#08120B]/90" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Concept Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-xl">
          <Leaf className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "10s" }} />
          <span>Concept 04 — Sustainable & Ethical Sourcing</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-fraunces font-normal text-stone-100 tracking-tight leading-[1.05]">
            Rooted in <span className="italic text-emerald-300 font-light">Zero-Discharge</span> Green Manufacturing
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base md:text-lg font-light leading-relaxed font-sans">
            Bangladesh leads the world with over 200+ USGBC LEED Platinum certified garment mills. Sourcing certified 100% GOTS organic cotton, closed-loop water recycling, and transparent fair-wage factories.
          </p>
        </div>

        {/* ESG Live Impact Ticker Bar */}
        <div className="glass-panel max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 border border-emerald-500/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left shadow-2xl bg-[#0F1E14]/90">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <Droplets className="w-3.5 h-3.5" />
              <span>Water Recycled</span>
            </div>
            <div className="text-2xl sm:text-3xl font-fraunces font-bold text-white">95.4%</div>
            <p className="text-[10px] text-stone-400 font-mono">Zero Liquid Discharge (ZLD)</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
              <Sun className="w-3.5 h-3.5" />
              <span>Solar Energy</span>
            </div>
            <div className="text-2xl sm:text-3xl font-fraunces font-bold text-white">78.2%</div>
            <p className="text-[10px] text-stone-400 font-mono">Rooftop Photovoltaic Microgrid</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <TreePine className="w-3.5 h-3.5" />
              <span>Carbon Offsets</span>
            </div>
            <div className="text-2xl sm:text-3xl font-fraunces font-bold text-white">-42.8%</div>
            <p className="text-[10px] text-stone-400 font-mono">vs Conventional Processing</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-teal-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Worker Welfare</span>
            </div>
            <div className="text-2xl sm:text-3xl font-fraunces font-bold text-white">100%</div>
            <p className="text-[10px] text-stone-400 font-mono">Living Wage & Gender Equity</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#esg-calculator"
            onClick={() => playTactileClick("organic")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-2xl shadow-emerald-950/70 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Calculate ESG Water & Carbon Savings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#leed-showcase"
            onClick={() => playTactileClick("soft")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-emerald-200 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2"
          >
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Tour LEED Platinum Facilities</span>
          </a>
        </div>
      </div>
    </div>
  );
}
