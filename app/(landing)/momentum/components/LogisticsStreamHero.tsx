"use client";

import React, { useState } from "react";
import { 
  Zap, 
  Plane, 
  Ship, 
  Clock, 
  ArrowRight, 
  Gauge, 
  TrendingUp, 
  Box, 
  Sparkles,
  Sliders
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

type LeadTimeOption = 21 | 28 | 45;

export default function LogisticsStreamHero() {
  const [targetDays, setTargetDays] = useState<LeadTimeOption>(21);

  const handleSpeedChange = (days: LeadTimeOption) => {
    playTactileClick("switch");
    setTargetDays(days);
  };

  return (
    <div className="relative min-h-[94vh] flex items-center justify-center bg-[#080C14] text-stone-100 overflow-hidden px-4 sm:px-6 lg:px-8 py-16 kinetic-stripes">
      {/* High-energy background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-600/20 via-amber-500/15 to-rose-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Kinetic Horizontal Motion Stream (Infinite Marquee Vectors) */}
      <div className="absolute inset-0 pointer-events-none opacity-25 flex flex-col justify-around overflow-hidden">
        {/* Stream Row 1: Shipping Vessels & Ports */}
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 font-mono text-xs text-orange-400">
              <span className="flex items-center gap-1.5"><Ship className="w-4 h-4" /> CHITTAGONG → ROTTERDAM: 21 DAYS</span>
              <span className="text-stone-600">┈┈┈┈┈┈</span>
              <span className="flex items-center gap-1.5"><Plane className="w-4 h-4" /> DHAKA (DAC) → HEATHROW (LHR): 48 HOURS</span>
              <span className="text-stone-600">┈┈┈┈┈┈</span>
              <span className="flex items-center gap-1.5"><Box className="w-4 h-4" /> 40FT HC CONTAINER #TW-8821 SEALED</span>
              <span className="text-stone-600">┈┈┈┈┈┈</span>
            </div>
          ))}
        </div>

        {/* Stream Row 2: Production Velocity */}
        <div className="flex gap-8 whitespace-nowrap animate-marqueeReverse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 font-mono text-xs text-amber-300">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> 3D CLO DIGITAL FIT: 24-HOUR APPROVAL</span>
              <span className="text-stone-600">┈┈┈┈┈┈</span>
              <span className="flex items-center gap-1.5"><Gauge className="w-4 h-4" /> 12.4M MONTHLY PCS CONSOLIDATED OUTPUT</span>
              <span className="text-stone-600">┈┈┈┈┈┈</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> 99.8% ON-TIME MOTHER VESSEL DISPATCH</span>
              <span className="text-stone-600">┈┈┈┈┈┈</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8 text-center">
        {/* Concept Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-xl">
          <Zap className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
          <span>Concept 03 — Momentum & Speed-to-Market</span>
        </div>

        {/* Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-sans leading-[1.02]">
            Concept to Port in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-500">{targetDays} Days</span>
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Eliminate supply chain drag. Pre-reserved greige yarn, 48-hour 3D CLO digital prototyping, and synchronized seaport berths get your trend collections to market before the curve peaks.
          </p>
        </div>

        {/* Interactive Fast-Track Lead-Time Accelerator Bar */}
        <div className="glass-panel max-w-3xl mx-auto rounded-3xl p-6 sm:p-8 border border-orange-500/30 text-left space-y-6 shadow-2xl bg-[#0F1626]/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase text-orange-400 flex items-center gap-1.5">
                <Gauge className="w-4 h-4" />
                Agile Production Velocity Tier
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {targetDays === 21 && "Fast-Track Capsule (21 Days)"}
                {targetDays === 28 && "Expedited Volume Program (28 Days)"}
                {targetDays === 45 && "Standard Mainline Volume (45 Days)"}
              </h3>
            </div>

            {/* Speed Tier Buttons */}
            <div className="flex items-center gap-1 bg-black/60 p-1.5 rounded-2xl border border-white/10">
              {([21, 28, 45] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => handleSpeedChange(d)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                    targetDays === d
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Milestone Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-orange-400 font-bold">
                {targetDays === 21 ? "DAY 01 – 02" : targetDays === 28 ? "DAY 01 – 03" : "DAY 01 – 07"}
              </div>
              <div className="text-sm font-bold text-white">3D Digital Avatar</div>
              <p className="text-xs text-stone-400">Virtual sample fit sign-off via CLO3D without physical shipping lag.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-orange-400 font-bold">
                {targetDays === 21 ? "DAY 03 – 07" : targetDays === 28 ? "DAY 04 – 10" : "DAY 08 – 20"}
              </div>
              <div className="text-sm font-bold text-white">Pre-Staged Greige</div>
              <p className="text-xs text-stone-400">Rapid dye lots triggered from stock reserved yarns in Narayanganj.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-orange-400 font-bold">
                {targetDays === 21 ? "DAY 08 – 17" : targetDays === 28 ? "DAY 11 – 22" : "DAY 21 – 38"}
              </div>
              <div className="text-sm font-bold text-white">Automated Cut & Sew</div>
              <p className="text-xs text-stone-400">Computerized Gerber cutting and synchronized 40-line sewing output.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-emerald-400 font-bold">
                {targetDays === 21 ? "DAY 18 – 21" : targetDays === 28 ? "DAY 23 – 28" : "DAY 39 – 45"}
              </div>
              <div className="text-sm font-bold text-white">Chittagong Vessel</div>
              <p className="text-xs text-stone-400">Green-channel customs bonded dispatch straight to container berths.</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#capacity-allocator"
            onClick={() => playTactileClick("switch")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-orange-950/70 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Book Dedicated Factory Lines</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#global-transit"
            onClick={() => playTactileClick("soft")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-orange-500/30 text-orange-200 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2"
          >
            <Plane className="w-4 h-4 text-orange-400" />
            <span>View Air & Sea Transit Schedules</span>
          </a>
        </div>
      </div>
    </div>
  );
}
