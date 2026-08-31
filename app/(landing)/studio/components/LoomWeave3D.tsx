"use client";

import React, { useRef, useEffect } from "react";

export default function LoomWeave3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

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
    const warps = 24; // Vertical warp threads
    const wefts = 20; // Horizontal weft threads

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Dark luxurious backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#0B1320");
      bgGrad.addColorStop(0.5, "#0E1826");
      bgGrad.addColorStop(1, "#080E17");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Vertical Warp Threads (Bengal Indigo & Gold)
      const warpSpacing = width / (warps + 1);
      for (let i = 1; i <= warps; i++) {
        const baseX = i * warpSpacing;
        const isGold = i % 4 === 0;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = isGold
          ? "rgba(224, 178, 122, 0.6)"
          : "rgba(107, 155, 210, 0.4)";
        ctx.lineWidth = isGold ? 2.2 : 1.4;
        if (isGold) {
          ctx.shadowColor = "#D4AF37";
          ctx.shadowBlur = 8;
        }

        ctx.moveTo(baseX, 0);

        for (let y = 0; y <= height; y += 15) {
          // Dynamic wave undulation
          const distToMouse = Math.hypot(baseX - mouseX, y - mouseY);
          const mouseDeflect = distToMouse < 140
            ? Math.sin((distToMouse / 140) * Math.PI) * (mouseX - baseX) * 0.3
            : 0;

          const waveX =
            baseX +
            Math.sin(y * 0.015 + time * 1.5 + i * 0.3) * 6 +
            mouseDeflect;

          ctx.lineTo(waveX, y);
        }

        ctx.stroke();
        ctx.restore();
      }

      // Render Horizontal Weft Threads (Raw Silk & Terracotta)
      const weftSpacing = height / (wefts + 1);
      for (let j = 1; j <= wefts; j++) {
        const baseY = j * weftSpacing;
        const isTerracotta = j % 3 === 0;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = isTerracotta
          ? "rgba(194, 103, 71, 0.65)"
          : "rgba(245, 239, 235, 0.35)";
        ctx.lineWidth = isTerracotta ? 2 : 1.2;

        ctx.moveTo(0, baseY);

        for (let x = 0; x <= width; x += 15) {
          const distToMouse = Math.hypot(x - mouseX, baseY - mouseY);
          const mouseDeflect = distToMouse < 140
            ? Math.sin((distToMouse / 140) * Math.PI) * (mouseY - baseY) * 0.3
            : 0;

          const waveY =
            baseY +
            Math.cos(x * 0.015 + time * 1.2 + j * 0.4) * 5 +
            mouseDeflect;

          ctx.lineTo(x, waveY);
        }

        ctx.stroke();
        ctx.restore();
      }

      // Animated Golden Shuttle Passing horizontally
      const shuttleY = ((Math.sin(time * 0.8) + 1) / 2) * (height - 60) + 30;
      const shuttleX = ((Math.cos(time * 1.6) + 1) / 2) * (width - 80) + 40;

      ctx.save();
      ctx.fillStyle = "#E0B27A";
      ctx.shadowColor = "#D4AF37";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.ellipse(shuttleX, shuttleY, 24, 6, time * 2, 0, Math.PI * 2);
      ctx.fill();

      // Trailing thread glow
      ctx.strokeStyle = "rgba(224, 178, 122, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shuttleX - 40, shuttleY);
      ctx.lineTo(shuttleX, shuttleY);
      ctx.stroke();
      ctx.restore();

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
    <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/15 bg-[#080E17] shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />

      {/* Glassmorphic Overlay Badge */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-[#E0B27A] flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#E0B27A] animate-ping" />
        <span>Live Automated Loom Matrix (Hover to Deflect Threads)</span>
      </div>
    </div>
  );
}
