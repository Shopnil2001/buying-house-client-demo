"use client";

import React, { useState } from "react";
import LogisticsStreamHero from "./components/LogisticsStreamHero";
import CapacityAllocator from "./components/CapacityAllocator";
import MomentumCinematicReveal from "./components/MomentumCinematicReveal";
import { 
  Zap, 
  Plane, 
  Ship, 
  Clock, 
  Layers, 
  TrendingUp, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Globe2,
  Box,
  RotateCcw
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

const TRANSIT_ROUTES = [
  {
    destination: "Rotterdam & Hamburg (EU Hub)",
    mode: "Ocean Feeder to Mother Vessel",
    leadTime: "21 – 24 Days",
    frequency: "3 Sailings / Week (Maersk / MSC / Hapag-Lloyd)",
    origin: "Chittagong Port (CGP)",
  },
  {
    destination: "London Heathrow & Frankfurt (DAC Airfreight)",
    mode: "Direct Chartered Air Cargo",
    leadTime: "48 – 72 Hours",
    frequency: "Daily Flights (Biman / Qatar / Emirates)",
    origin: "Dhaka Airport (DAC)",
  },
  {
    destination: "Los Angeles & Long Beach (US West Coast)",
    mode: "Direct Pacific Express Transit",
    leadTime: "26 – 28 Days",
    frequency: "Bi-Weekly Priority Allocation",
    origin: "Chittagong → Singapore Hub",
  },
  {
    destination: "New York & Savannah (US East Coast)",
    mode: "Suez / Direct Atlantic Routing",
    leadTime: "28 – 32 Days",
    frequency: "Weekly Dedicated Container Blocks",
    origin: "Chittagong → Colombo Hub",
  },
];

export default function MomentumLandingPage() {
  const [revealKey, setRevealKey] = useState(0);

  const handleReplayIntro = () => {
    playTactileClick("switch");
    setRevealKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#05080E] text-stone-100 min-h-screen relative">
      {/* Bespoke After-Effects Level Hyperspace Velocity Reveal on Load */}
      <MomentumCinematicReveal key={revealKey} />

      {/* Floating Replay Intro Trigger */}
      <button
        onClick={handleReplayIntro}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-orange-500/40 text-orange-300 hover:text-white font-mono text-[11px] backdrop-blur-md shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        title="Replay Hyperspace Velocity Intro"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Replay Velocity FX</span>
      </button>

      {/* 1. Bespoke Hero Animation */}
      <LogisticsStreamHero />

      {/* 2. Rapid 3D Digital Prototyping Pipeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-orange-500/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-300 text-xs font-mono uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Digital Tech-Pack Prototyping</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-sans leading-tight">
              48-Hour Virtual Samples via <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">CLO3D & Browzwear</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Eliminate physical sample courier cycles that stall design approvals for weeks. Our Dhaka 3D CAD pattern engineers drape your exact fabric physics, tension maps, and print placements on calibrated virtual avatars within 48 hours.
            </p>

            <div className="space-y-3 font-mono text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Zero physical prototype waste; instant colorway iteration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Accurate fabric drape simulation based on calibrated tensile bending modulus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Direct export to computerized Gerber & Lectra automated cutting tables</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-orange-500/30 space-y-6 bg-[#0E1524]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase text-orange-400 font-bold">
                  Conventional vs Threadworks BD Lead Time
                </span>
                <Clock className="w-4 h-4 text-orange-400" />
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-stone-400 mb-1">
                    <span>Conventional Overseas Sourcing:</span>
                    <span className="text-rose-400 font-bold">75 – 90 Days</span>
                  </div>
                  <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500/70 w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-200 mb-1">
                    <span>Threadworks Fast-Track Program:</span>
                    <span className="text-emerald-400 font-bold">21 – 28 Days (-68% Duration)</span>
                  </div>
                  <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 w-1/3" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-stone-400 space-y-1">
                <div className="text-white font-bold">How we achieve 21-day turnaround:</div>
                <p>Greige yarn is reserved in bulk; dyeing commences the instant digital 3D tech-pack is approved, cutting 3 weeks off yarn spinning delays.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Real-Time Capacity Allocator */}
      <CapacityAllocator />

      {/* 4. Global Multimodal Logistics Matrix */}
      <section id="global-transit" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-orange-500/20">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-300 text-xs font-mono uppercase">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Export Connectivity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
            Chittagong Port & Air Cargo Corridors
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Guaranteed container vessel allocations and priority green-channel customs handling across major European and North American ports of entry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRANSIT_ROUTES.map((route, i) => (
            <div key={i} className="p-6 sm:p-8 rounded-3xl bg-[#090E18] border border-orange-500/20 space-y-4 hover:border-orange-400/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-orange-400 uppercase">{route.origin}</span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-orange-950 text-orange-300 border border-orange-500/30">
                  {route.leadTime}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">{route.destination}</h3>
              
              <div className="text-xs font-mono text-stone-300 space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-stone-500">Logistics Mode:</span>
                  <span>{route.mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Departure Frequency:</span>
                  <span className="text-orange-300">{route.frequency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Momentum Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20 bg-black/90 text-stone-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-white text-sm">THREADWORKS BD — MOMENTUM DIRECTION</div>
            <p>Air & Sea Logistics Logistics Center • Chittagong Port Access Road • dispatch@threadworksbd.com</p>
          </div>

          <div className="flex items-center gap-4 text-orange-400">
            <span>21-DAY FAST-TRACK CERTIFIED PROGRAM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
