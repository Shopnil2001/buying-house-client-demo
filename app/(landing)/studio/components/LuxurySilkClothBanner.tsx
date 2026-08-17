"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Leaf, Shield, Heart } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

export default function LuxurySilkClothBanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePhilosophy, setActivePhilosophy] = useState<number>(0);

  const PHILOSOPHIES = [
    {
      title: "People & Worker Dignity",
      tag: "Living Wage & Social Equity",
      desc: "Fair compensation (+18.5% over statutory minimum), onsite healthcare clinics, subsidized childcare, and women empowerment programs across all partner manufacturing units.",
      stat: "30,000+ Skilled Associates",
      icon: Heart,
    },
    {
      title: "Planet & Zero-Discharge",
      tag: "Closed-Loop Circularity",
      desc: "15.8 MW rooftop solar microgrids and biological Zero Liquid Discharge (ZLD) effluent treatment recycling 95.8% of dyeing water back to production vats.",
      stat: "5 LEED Platinum Facilities",
      icon: Leaf,
    },
    {
      title: "Prosperity & Quality Rigor",
      tag: "AQL 1.5 Precision Standard",
      desc: "Statistical zero-defect inspection, in-house ISO 17025 testing laboratories, and 48-hour 3D CLO digital avatar sign-offs for premier global fashion houses.",
      stat: "99.8% On-Time Global Dispatch",
      icon: Shield,
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse wave ripple
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Multi-layer Satin / Silk Wave Mesh
    const cols = 40;
    const rows = 20;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Dark luxurious backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#08101C");
      bgGrad.addColorStop(0.5, "#0A1526");
      bgGrad.addColorStop(1, "#070E18");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle horizontal woven guide lines
      ctx.strokeStyle = "rgba(0, 229, 200, 0.04)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render 3 overlapping fluid silk waves
      const waves = [
        {
          color: "rgba(0, 229, 200, 0.18)",
          stroke: "rgba(0, 229, 200, 0.4)",
          speed: 1.2,
          amplitude: 45,
          freq: 0.006,
          yOffset: height * 0.55,
        },
        {
          color: "rgba(212, 175, 55, 0.12)",
          stroke: "rgba(212, 175, 55, 0.35)",
          speed: 0.9,
          amplitude: 35,
          freq: 0.008,
          yOffset: height * 0.5,
        },
        {
          color: "rgba(255, 107, 43, 0.15)",
          stroke: "rgba(255, 107, 43, 0.4)",
          speed: 1.5,
          amplitude: 40,
          freq: 0.005,
          yOffset: height * 0.6,
        },
      ];

      waves.forEach((w) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 15) {
          // Distance to mouse for gentle tactile elevation
          const distToMouse = Math.abs(x - mouseX);
          const mouseLift = distToMouse < 180 ? Math.cos((distToMouse / 180) * (Math.PI / 2)) * 25 : 0;

          const y =
            w.yOffset +
            Math.sin(x * w.freq + time * w.speed) * w.amplitude +
            Math.cos(x * w.freq * 1.5 + time * 0.7) * (w.amplitude * 0.4) -
            mouseLift;

          if (x === 0) ctx.lineTo(0, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = w.color;
        ctx.fill();

        ctx.strokeStyle = w.stroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      });

      // Ambient Silk Sheen Light Sweep
      const sheenX = ((Math.sin(time * 0.8) + 1) / 2) * width;
      const sheenGrad = ctx.createRadialGradient(sheenX, height * 0.5, 20, sheenX, height * 0.5, 220);
      sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
      sheenGrad.addColorStop(0.5, "rgba(0, 229, 200, 0.04)");
      sheenGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#09111E] shadow-2xl">
      {/* Interactive Silk Fluid Canvas Simulation */}
      <div className="relative h-80 sm:h-96 w-full cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#09111E] via-transparent to-transparent" />

        {/* Center Banner Text Container */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-cyan-300 font-mono text-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Liquid Silk Surface</span>
            </div>
            <span className="font-mono text-[11px] text-stone-400">
              Hover to gently ripple fabric wave
            </span>
          </div>

          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
              {PHILOSOPHIES[activePhilosophy].tag}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight leading-tight">
              {PHILOSOPHIES[activePhilosophy].title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
              {PHILOSOPHIES[activePhilosophy].desc}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tab Switcher along bottom of banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-white/10 bg-black/40 backdrop-blur-md">
        {PHILOSOPHIES.map((item, idx) => {
          const isSelected = activePhilosophy === idx;
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                playTactileClick("soft");
                setActivePhilosophy(idx);
              }}
              className={`p-4 sm:p-5 text-left transition-all flex items-start gap-3.5 border-b sm:border-b-0 sm:border-r last:border-r-0 border-white/10 ${
                isSelected
                  ? "bg-white/10 text-white"
                  : "text-stone-400 hover:text-stone-200 hover:bg-white/5"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950"
                    : "bg-white/5 text-stone-400"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-xs sm:text-sm text-white font-sans">{item.title}</div>
                <div className="font-mono text-[11px] text-cyan-400 font-semibold">{item.stat}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
