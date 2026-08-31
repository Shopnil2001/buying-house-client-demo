"use client";

import React, { useEffect, useRef, useState } from "react";

interface Keyframe3D {
  rotX: number;
  rotY: number;
  rotZ: number;
  camZ: number;
  posX: number;
  posY: number;
  scale: number;
  morphProgress: number; // 0: Silk Torus, 1: Unfurled Grid, 2: Yarn Helix, 3: Organic Leaf
  colorA: string;
  colorB: string;
}

export default function SplineScroll3DScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState("01 HERO ATELIER");

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

    // Track scroll with smooth lerp
    let targetScroll = 0;
    let currentScroll = 0;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 3D Keyframes across the 10 sections
    const keyframes: { at: number; stage: string; data: Keyframe3D }[] = [
      {
        at: 0.0,
        stage: "01 HERO ATELIER",
        data: {
          rotX: 0.25,
          rotY: 0.4,
          rotZ: 0.1,
          camZ: 380,
          posX: 220,
          posY: -20,
          scale: 1.1,
          morphProgress: 0,
          colorA: "rgba(224, 178, 122, 0.85)", // Gold
          colorB: "rgba(194, 103, 71, 0.8)",   // Terracotta
        },
      },
      {
        at: 0.15,
        stage: "02 ABOUT VERTICAL ECOSYSTEM",
        data: {
          rotX: 0.85,
          rotY: 1.6,
          rotZ: 0.4,
          camZ: 280, // Zoom in
          posX: -240, // Move to left
          posY: 40,
          scale: 1.35,
          morphProgress: 0.4,
          colorA: "rgba(212, 175, 55, 0.9)",
          colorB: "rgba(18, 32, 51, 0.9)",
        },
      },
      {
        at: 0.32,
        stage: "03 MANUFACTURING PILLARS",
        data: {
          rotX: 1.2,
          rotY: 2.8,
          rotZ: 0.8,
          camZ: 420,
          posX: 260,
          posY: -30,
          scale: 1.2,
          morphProgress: 1.0, // Unfurled 3D grid
          colorA: "rgba(224, 178, 122, 0.85)",
          colorB: "rgba(194, 103, 71, 0.85)",
        },
      },
      {
        at: 0.48,
        stage: "04 FACTS & SCALE METRICS",
        data: {
          rotX: 0.4,
          rotY: 4.2,
          rotZ: 0.2,
          camZ: 480,
          posX: 0, // Center top-down
          posY: 100,
          scale: 1.4,
          morphProgress: 2.0, // Spinning Yarn Helix
          colorA: "rgba(120, 168, 130, 0.85)", // Sage
          colorB: "rgba(224, 178, 122, 0.85)",
        },
      },
      {
        at: 0.65,
        stage: "05 PRODUCT VERTICALS",
        data: {
          rotX: 0.6,
          rotY: 5.6,
          rotZ: 0.3,
          camZ: 320,
          posX: -280,
          posY: -40,
          scale: 1.3,
          morphProgress: 0.2,
          colorA: "rgba(194, 103, 71, 0.9)",
          colorB: "rgba(224, 178, 122, 0.85)",
        },
      },
      {
        at: 0.80,
        stage: "06 PHILOSOPHY & PINBOARD",
        data: {
          rotX: 0.3,
          rotY: 6.8,
          rotZ: 0.1,
          camZ: 400,
          posX: 240,
          posY: 30,
          scale: 1.15,
          morphProgress: 0.8,
          colorA: "rgba(224, 178, 122, 0.85)",
          colorB: "rgba(24, 35, 53, 0.9)",
        },
      },
      {
        at: 1.0,
        stage: "07 ESG GREEN MILLS & CONTACT",
        data: {
          rotX: 0.5,
          rotY: 8.2,
          rotZ: 0.4,
          camZ: 350,
          posX: 0,
          posY: 60,
          scale: 1.25,
          morphProgress: 3.0, // Organic leaf / botanical
          colorA: "rgba(120, 168, 130, 0.95)",
          colorB: "rgba(224, 178, 122, 0.85)",
        },
      },
    ];

    // Lerp helper
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Project 3D coordinate to 2D screen with FOV
    const project = (
      x: number,
      y: number,
      z: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      camZ: number,
      offsetX: number,
      offsetY: number,
      scaleFactor: number
    ): { px: number; py: number; pz: number; scale: number } => {
      // Rotate Z
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const x0 = x * cosZ - y * sinZ;
      const y0 = x * sinZ + y * cosZ;

      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x0 * cosY + z * sinY;
      const z1 = -x0 * sinY + z * cosY;

      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y0 * cosX - z1 * sinX;
      const z2 = y0 * sinX + z1 * cosX;

      const fov = 500;
      const scale = (fov / (fov + z2 + camZ)) * scaleFactor;
      const px = width / 2 + offsetX + x1 * scale;
      const py = height / 2 + offsetY + y2 * scale;

      return { px, py, pz: z2, scale };
    };

    // 3D Floating Silk Motes in ambient space
    const particlesCount = 70;
    const particles: { x: number; y: number; z: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: (Math.random() - 0.5) * 800,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.015;

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      setScrollProgress(currentScroll);

      // Find current keyframe segment
      let kfIndex = 0;
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (currentScroll >= keyframes[i].at && currentScroll <= keyframes[i + 1].at) {
          kfIndex = i;
          break;
        }
      }

      const k1 = keyframes[kfIndex];
      const k2 = keyframes[kfIndex + 1] || keyframes[keyframes.length - 1];
      const segmentT = Math.max(0, Math.min(1, (currentScroll - k1.at) / (k2.at - k1.at || 1)));

      setActiveStage(k1.stage);

      // Interpolate 3D camera & transforms
      const rotX = lerp(k1.data.rotX, k2.data.rotX, segmentT) + mouseY * 0.15;
      const rotY = lerp(k1.data.rotY, k2.data.rotY, segmentT) + mouseX * 0.2 + time * 0.2;
      const rotZ = lerp(k1.data.rotZ, k2.data.rotZ, segmentT);
      const camZ = lerp(k1.data.camZ, k2.data.camZ, segmentT);
      const posX = lerp(k1.data.posX, k2.data.posX, segmentT) + mouseX * 25;
      const posY = lerp(k1.data.posY, k2.data.posY, segmentT) + mouseY * 25;
      const scaleFactor = lerp(k1.data.scale, k2.data.scale, segmentT);
      const morph = lerp(k1.data.morphProgress, k2.data.morphProgress, segmentT);

      // Ambient radial lighting behind 3D object
      const lightX = width / 2 + posX;
      const lightY = height / 2 + posY;
      const glowGrad = ctx.createRadialGradient(lightX, lightY, 40, lightX, lightY, 450);
      glowGrad.addColorStop(0, "rgba(224, 178, 122, 0.12)");
      glowGrad.addColorStop(0.5, "rgba(24, 35, 53, 0.2)");
      glowGrad.addColorStop(1, "rgba(8, 14, 23, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw 3D floating ambient motes
      particles.forEach((p) => {
        p.y += Math.sin(time + p.x * 0.01) * 0.4;
        const pt = project(p.x, p.y, p.z, rotX * 0.5, rotY * 0.5, rotZ * 0.5, camZ, posX * 0.5, posY * 0.5, scaleFactor);
        ctx.save();
        ctx.fillStyle = `rgba(224, 178, 122, ${p.alpha * pt.scale})`;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, p.radius * pt.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 3D Parametric Spline Silk Mesh Rendering
      const segments = 100;
      const ribbonWidth = 32;
      const ribbonPoints: {
        top: { px: number; py: number; pz: number };
        bot: { px: number; py: number; pz: number };
        depth: number;
      }[] = [];

      for (let i = 0; i <= segments; i++) {
        const u = (i / segments) * Math.PI * 4;

        // Parametric morphing formulas
        // Base Torus Knot
        const rTorus = 120 + Math.cos(3 * u) * 45;
        const xTorus = rTorus * Math.cos(2 * u);
        const yTorus = rTorus * Math.sin(2 * u);
        const zTorus = Math.sin(3 * u) * 90;

        // Unfurled Ribbon Wave
        const xGrid = (i / segments - 0.5) * 380;
        const yGrid = Math.sin(u * 2 + time * 1.5) * 50;
        const zGrid = Math.cos(u * 2 + time) * 60;

        // Yarn Helix Spool
        const xHelix = Math.cos(u * 3) * 90;
        const yHelix = (i / segments - 0.5) * 360;
        const zHelix = Math.sin(u * 3) * 90;

        // Blend between geometries based on morph value
        let x = xTorus;
        let y = yTorus;
        let z = zTorus;

        if (morph <= 1.0) {
          x = lerp(xTorus, xGrid, morph);
          y = lerp(yTorus, yGrid, morph);
          z = lerp(zTorus, zGrid, morph);
        } else if (morph <= 2.0) {
          x = lerp(xGrid, xHelix, morph - 1.0);
          y = lerp(yGrid, yHelix, morph - 1.0);
          z = lerp(zGrid, zHelix, morph - 1.0);
        } else {
          x = lerp(xHelix, xTorus * 1.2, morph - 2.0);
          y = lerp(yHelix, yTorus * 0.8, morph - 2.0);
          z = lerp(zHelix, zTorus * 1.4, morph - 2.0);
        }

        // Normal displacement for 3D ribbon width
        const nx = Math.cos(2 * u) * Math.cos(time + u);
        const ny = Math.sin(2 * u) * Math.cos(time + u);
        const nz = Math.sin(time + u);

        const ptTop = project(
          x + nx * ribbonWidth,
          y + ny * ribbonWidth,
          z + nz * ribbonWidth,
          rotX,
          rotY,
          rotZ,
          camZ,
          posX,
          posY,
          scaleFactor
        );

        const ptBot = project(
          x - nx * ribbonWidth,
          y - ny * ribbonWidth,
          z - nz * ribbonWidth,
          rotX,
          rotY,
          rotZ,
          camZ,
          posX,
          posY,
          scaleFactor
        );

        ribbonPoints.push({
          top: ptTop,
          bot: ptBot,
          depth: (ptTop.pz + ptBot.pz) / 2,
        });
      }

      // Draw quads with 3D depth sorting and satin sheen
      for (let i = 0; i < ribbonPoints.length - 1; i++) {
        const p1 = ribbonPoints[i];
        const p2 = ribbonPoints[i + 1];

        const normDepth = Math.max(0, Math.min(1, (p1.depth + 200) / 400));

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.top.px, p1.top.py);
        ctx.lineTo(p2.top.px, p2.top.py);
        ctx.lineTo(p2.bot.px, p2.bot.py);
        ctx.lineTo(p1.bot.px, p1.bot.py);
        ctx.closePath();

        const grad = ctx.createLinearGradient(
          p1.top.px,
          p1.top.py,
          p2.bot.px,
          p2.bot.py
        );
        grad.addColorStop(0, `rgba(224, 178, 122, ${0.4 + normDepth * 0.5})`);
        grad.addColorStop(0.5, `rgba(194, 103, 71, ${0.5 + normDepth * 0.4})`);
        grad.addColorStop(1, `rgba(18, 32, 51, ${0.6 + normDepth * 0.3})`);

        ctx.fillStyle = grad;
        ctx.shadowColor = "#E0B27A";
        ctx.shadowBlur = normDepth * 14;
        ctx.fill();

        ctx.strokeStyle = `rgba(224, 178, 122, ${0.25 + normDepth * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Fixed Full-Viewport 3D Background Engine */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Sticky Spline 3D Camera Telemetry HUD along the top-right */}
      <div className="fixed top-20 right-6 z-40 hidden xl:flex flex-col items-end gap-1.5 font-mono text-[10px] text-[#A59E95] pointer-events-none">
        <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E0B27A] animate-ping" />
          <span className="text-[#FAF7F2] font-bold">SPLINE 3D SCROLL VIEWPORT</span>
          <span className="text-[#E0B27A]">{(scrollProgress * 100).toFixed(0)}%</span>
        </div>
        <div className="bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/5 text-[9px] text-[#E0B27A]">
          CAMERA: {activeStage}
        </div>
      </div>
    </>
  );
}
