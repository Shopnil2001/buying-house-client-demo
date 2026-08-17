"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ScrollFabricSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
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

    // Mouse interaction for cloth deformation
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Scroll tracking
    let targetScrollNorm = 0;
    let currentScrollNorm = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollNorm = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const deltaY = window.scrollY - lastScrollY;
      scrollVelocity = deltaY * 0.05;
      lastScrollY = window.scrollY;
      setScrollProgress(targetScrollNorm);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Ribbon Node Physics Simulation
    const nodeCount = 45;
    const nodes: { x: number; y: number; vx: number; vy: number; width: number; angle: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (i / (nodeCount - 1)) * width,
        y: height * 0.5,
        vx: 0,
        vy: 0,
        width: 80,
        angle: 0,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.018;
      // Smooth interpolation for scroll
      currentScrollNorm += (targetScrollNorm - currentScrollNorm) * 0.08;
      scrollVelocity *= 0.92;

      // Check if user is in the Philosophy Section (~45% to ~65% scroll)
      const isInPhilosophyZone = currentScrollNorm > 0.42 && currentScrollNorm < 0.68;
      const unfurlBlend = isInPhilosophyZone 
        ? Math.sin(((currentScrollNorm - 0.42) / 0.26) * Math.PI) 
        : 0;

      // Calculate path points along the screen
      for (let i = 0; i < nodeCount; i++) {
        const t = i / (nodeCount - 1);
        const node = nodes[i];

        // Base wave trajectory modulated by scroll depth
        const baseScrollOffset = currentScrollNorm * Math.PI * 4;
        const waveX = Math.sin(t * 5 + time + baseScrollOffset) * (width * 0.06);
        const waveY = Math.cos(t * 4 + time * 1.4 + baseScrollOffset) * (height * 0.22);
        
        // Standard wandering trajectory
        let targetX = t * width + waveX;
        let targetY = height * (0.35 + Math.sin(currentScrollNorm * Math.PI * 2 + t * 3) * 0.28) + waveY;

        // When in Philosophy Section: unfurl into a wide horizontal woven banner across center
        if (unfurlBlend > 0.01) {
          const bannerY = height * 0.5 + Math.sin(t * Math.PI * 2 + time * 0.5) * (15 * (1 - unfurlBlend));
          targetX = t * width;
          targetY = targetY * (1 - unfurlBlend) + bannerY * unfurlBlend;
          node.width = 70 * (1 - unfurlBlend) + (height * 0.32) * unfurlBlend;
        } else {
          node.width = 65 + Math.sin(t * 6 + time) * 25;
        }

        // Mouse elastic repulsion
        const dx = targetX - mouseX;
        const dy = targetY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) {
          const repForce = (1 - dist / 140) * 45;
          targetX += (dx / dist) * repForce;
          targetY += (dy / dist) * repForce;
        }

        // Spring easing towards target
        node.x += (targetX - node.x) * 0.12;
        node.y += (targetY - node.y) * 0.12;
        node.angle = Math.sin(t * 8 + time * 2 + currentScrollNorm * 8);
      }

      // Draw the 3D Silky Woven Fabric Ribbon with Top and Bottom Edges
      const topPoints: { x: number; y: number }[] = [];
      const bottomPoints: { x: number; y: number }[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        // Normal vector perpendicular to trajectory
        let nx = 0;
        let ny = 1;
        if (i < nodeCount - 1) {
          const next = nodes[i + 1];
          const segDx = next.x - n.x;
          const segDy = next.y - n.y;
          const len = Math.sqrt(segDx * segDx + segDy * segDy) || 1;
          nx = -segDy / len;
          ny = segDx / len;
        }

        // 3D twist thickness perspective
        const twistFactor = Math.cos(n.angle);
        const halfW = (n.width / 2) * twistFactor;

        topPoints.push({ x: n.x + nx * halfW, y: n.y + ny * halfW });
        bottomPoints.push({ x: n.x - nx * halfW, y: n.y - ny * halfW });
      }

      // Render Fabric Ribbon Body with Silk Gradient & Sheen
      ctx.save();
      for (let i = 0; i < nodeCount - 1; i++) {
        const p1Top = topPoints[i];
        const p2Top = topPoints[i + 1];
        const p1Bot = bottomPoints[i];
        const p2Bot = bottomPoints[i + 1];

        // Gradient based on 3D twist & scroll
        const twist = Math.sin(nodes[i].angle);
        const isBackside = twist < 0;

        const grad = ctx.createLinearGradient(p1Top.x, p1Top.y, p1Bot.x, p1Bot.y);
        if (!isBackside) {
          // Lustrous Deep Emerald / Cyan / Amber Silk Front
          grad.addColorStop(0, "rgba(0, 229, 200, 0.45)");
          grad.addColorStop(0.5, "rgba(255, 107, 43, 0.55)");
          grad.addColorStop(1, "rgba(20, 35, 60, 0.65)");
        } else {
          // Muted Satin Backside
          grad.addColorStop(0, "rgba(10, 20, 35, 0.7)");
          grad.addColorStop(0.5, "rgba(40, 60, 80, 0.55)");
          grad.addColorStop(1, "rgba(212, 175, 55, 0.4)");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p1Top.x, p1Top.y);
        ctx.lineTo(p2Top.x, p2Top.y);
        ctx.lineTo(p2Bot.x, p2Bot.y);
        ctx.lineTo(p1Bot.x, p1Bot.y);
        ctx.closePath();
        ctx.fill();

        // Draw micro-woven warp thread lines along the ribbon
        ctx.strokeStyle = isBackside ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((p1Top.x + p1Bot.x) / 2, (p1Top.y + p1Bot.y) / 2);
        ctx.lineTo((p2Top.x + p2Bot.x) / 2, (p2Top.y + p2Bot.y) / 2);
        ctx.stroke();
      }

      // Render glowing selvedge edge lines
      ctx.strokeStyle = "rgba(0, 229, 200, 0.75)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00E5C8";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let i = 0; i < topPoints.length; i++) {
        if (i === 0) ctx.moveTo(topPoints[i].x, topPoints[i].y);
        else ctx.lineTo(topPoints[i].x, topPoints[i].y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 107, 43, 0.75)";
      ctx.shadowColor = "#FF6B2B";
      ctx.beginPath();
      for (let i = 0; i < bottomPoints.length; i++) {
        if (i === 0) ctx.moveTo(bottomPoints[i].x, bottomPoints[i].y);
        else ctx.lineTo(bottomPoints[i].x, bottomPoints[i].y);
      }
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-60 mix-blend-screen" />
    </div>
  );
}
