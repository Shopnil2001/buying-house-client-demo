"use client";

import React, { useRef, useState } from "react";

interface Studio3DCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "gold" | "terracotta" | "sage" | "indigo";
  accentBorder?: boolean;
}

export default function Studio3DCard({
  children,
  className = "",
  glowColor = "gold",
  accentBorder = true,
}: Studio3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null!);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rY = ((x - centerX) / centerX) * 9;

    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  // Color glow tokens
  const glowGradients = {
    gold: "from-[#E0B27A]/25 via-[#D4AF37]/10 to-transparent",
    terracotta: "from-[#C26747]/25 via-[#D48259]/10 to-transparent",
    sage: "from-[#78A882]/25 via-[#4A6B53]/10 to-transparent",
    indigo: "from-[#6B9BD2]/25 via-[#1B2A4A]/10 to-transparent",
  };

  const borderGradients = {
    gold: "from-[#E0B27A]/40 via-white/10 to-transparent",
    terracotta: "from-[#C26747]/40 via-white/10 to-transparent",
    sage: "from-[#78A882]/40 via-white/10 to-transparent",
    indigo: "from-[#6B9BD2]/40 via-white/10 to-transparent",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative rounded-3xl p-[1px] bg-gradient-to-br ${
        accentBorder ? borderGradients[glowColor] : "from-white/15 to-transparent"
      } shadow-2xl transition-shadow duration-500 will-change-transform ${className}`}
    >
      {/* Ambient Behind-Card Radial Glow */}
      <div
        className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${
          glowGradients[glowColor]
        } blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Main Glassmorphic Card Body */}
      <div className="relative h-full w-full rounded-[23px] bg-[#0E1522]/85 backdrop-blur-2xl p-6 sm:p-8 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
        {/* Dynamic Pointer Gloss Reflection Sheen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />

        {/* Card Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
