"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AtmosphericWorldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    // Global ambient fiber motes drifting through the entire page space
    const particleCount = 65;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3 + 0.05,
        vy: -Math.random() * 0.35 - 0.1,
        radius: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.2;
        p.y += p.vy;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.fillStyle = `rgba(224, 178, 122, ${p.alpha})`;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Scroll-Linked Atmospheric Background Tint Interpolation across the whole page
    if (bgLayerRef.current) {
      const bg = bgLayerRef.current;

      const tints = [
        { progress: 0.0, color: "rgba(8, 14, 23, 1)" },       // Dark Indigo Hero
        { progress: 0.2, color: "rgba(10, 16, 26, 1)" },      // Visualizer
        { progress: 0.35, color: "rgba(18, 22, 32, 1)" },     // About Us (Warm Indigo)
        { progress: 0.5, color: "rgba(19, 21, 26, 1)" },      // Manufacturing Pillars
        { progress: 0.65, color: "rgba(14, 20, 30, 1)" },     // Facts & Figures
        { progress: 0.8, color: "rgba(9, 20, 14, 1)" },       // Sustainability (Forest Green)
        { progress: 1.0, color: "rgba(6, 10, 18, 1)" },       // Contact / Footer
      ];

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          // Interpolate background tone
          for (let i = 0; i < tints.length - 1; i++) {
            if (p >= tints[i].progress && p <= tints[i + 1].progress) {
              const localT = (p - tints[i].progress) / (tints[i + 1].progress - tints[i].progress);
              bg.style.backgroundColor = tints[i + 1].color;
              break;
            }
          }
        },
      });
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dynamic Interpolated Background Color Layer */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 transition-colors duration-1000 ease-out bg-[#080E17]"
      />

      {/* Persistent Film Grain Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Global Ambient Floating Fiber Motes Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Global Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70" />
    </div>
  );
}
