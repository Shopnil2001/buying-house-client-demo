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

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.012;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Soft, calming warm charcoal/indigo satin backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#121A28");
      bgGrad.addColorStop(0.5, "#182335");
      bgGrad.addColorStop(1, "#0F1622");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle horizontal weaving warp lines
      ctx.strokeStyle = "rgba(245, 239, 235, 0.04)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Warm soothing textile waves (Terracotta, Raw Gold, Sage)
      const waves = [
        {
          color: "rgba(224, 178, 122, 0.12)",
          stroke: "rgba(224, 178, 122, 0.35)",
          speed: 0.9,
          amplitude: 35,
          freq: 0.004,
          yOffset: height * 0.52,
        },
        {
          color: "rgba(194, 103, 71, 0.14)",
          stroke: "rgba(194, 103, 71, 0.35)",
          speed: 1.1,
          amplitude: 45,
          freq: 0.003,
          yOffset: height * 0.6,
        },
        {
          color: "rgba(61, 90, 69, 0.18)",
          stroke: "rgba(100, 145, 110, 0.4)",
          speed: 0.7,
          amplitude: 40,
          freq: 0.005,
          yOffset: height * 0.68,
        },
      ];

      waves.forEach((w) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 15) {
          const distToMouse = Math.abs(x - mouseX);
          const mouseLift = distToMouse < 200 ? Math.cos((distToMouse / 200) * (Math.PI / 2)) * 24 : 0;

          const y =
            w.yOffset +
            Math.sin(x * w.freq + time * w.speed) * w.amplitude +
            Math.cos(x * w.freq * 1.5 + time * 0.6) * (w.amplitude * 0.35) -
            mouseLift;

          if (x === 0) ctx.lineTo(0, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = w.color;
        ctx.fill();

        ctx.strokeStyle = w.stroke;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();
      });

      // Warm satin sheen light sweep
      const sheenX = ((Math.sin(time * 0.6) + 1) / 2) * width;
      const sheenGrad = ctx.createRadialGradient(sheenX, height * 0.5, 20, sheenX, height * 0.5, 240);
      sheenGrad.addColorStop(0, "rgba(255, 245, 230, 0.06)");
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
    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121A28] shadow-2xl">
      {/* Interactive Silk Fluid Canvas Simulation */}
      <div className="relative h-80 sm:h-96 w-full cursor-pointer">
        <canvas ref={canvasRef} className="w-full h-full" />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#121A28] via-transparent to-transparent" />

        {/* Center Banner Text Container */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-amber-300 font-mono text-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Liquid Silk Surface</span>
            </div>
            <span className="font-mono text-[11px] text-[#A59E95]">
              Hover to gently ripple fabric wave
            </span>
          </div>

          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-[#E0B27A] uppercase tracking-widest block font-bold">
              {PHILOSOPHIES[activePhilosophy].tag}
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-light text-white tracking-tight leading-tight">
              {PHILOSOPHIES[activePhilosophy].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#D6CFC7] leading-relaxed max-w-xl font-sans">
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
                  : "text-[#A59E95] hover:text-stone-200 hover:bg-white/5"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#C26747] text-white shadow-md shadow-orange-950"
                    : "bg-white/5 text-[#A59E95]"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="font-serif font-bold text-sm sm:text-base text-white">{item.title}</div>
                <div className="font-mono text-[11px] text-[#E0B27A] font-semibold">{item.stat}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
