"use client";

import React, { useEffect, useState } from "react";

export default function CinematicParallaxMarquee() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8 pointer-events-none select-none my-12 border-y border-white/5 bg-black/30 backdrop-blur-sm">
      {/* Track 1 (Moves Left on Scroll) */}
      <div
        className="flex whitespace-nowrap text-4xl sm:text-6xl md:text-7xl font-serif uppercase tracking-widest text-white/10 font-black will-change-transform transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${-scrollY * 0.35}px, 0, 0)`,
        }}
      >
        <span className="mr-8">THREADWORKS ATELIER</span>
        <span className="text-[#E0B27A]/20 mr-8">• 150M+ FINISHED UNITS</span>
        <span className="mr-8">• ZERO LIQUID DISCHARGE</span>
        <span className="text-[#78A882]/20 mr-8">• 5 LEED PLATINUM MILLS</span>
        <span className="mr-8">• AQL 1.5 ZERO DEFECT</span>
        <span className="text-[#C26747]/20 mr-8">• 21-DAY FAST TRACK</span>
        <span className="mr-8">THREADWORKS ATELIER</span>
        <span className="text-[#E0B27A]/20 mr-8">• 150M+ FINISHED UNITS</span>
      </div>

      {/* Track 2 (Moves Right on Scroll) */}
      <div
        className="flex whitespace-nowrap text-2xl sm:text-4xl md:text-5xl font-mono uppercase tracking-widest text-[#E0B27A]/15 font-light will-change-transform transition-transform duration-100 ease-out mt-3"
        style={{
          transform: `translate3d(${scrollY * 0.25 - 600}px, 0, 0)`,
        }}
      >
        <span className="mr-6">GAZIPUR KNITTING PARK</span>
        <span className="text-white/10 mr-6">✦ DHAKA MERCHANDISING HUB</span>
        <span className="mr-6">✦ 3D CLO DIGITAL TWIN</span>
        <span className="text-white/10 mr-6">✦ 100% GOTS ORGANIC COTTON</span>
        <span className="mr-6">✦ ITALIAN LONATI KNITTING</span>
        <span className="text-white/10 mr-6">✦ JEANOLOGIA LASER DENIM</span>
      </div>
    </div>
  );
}
