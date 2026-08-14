"use client";

import React, { useState } from "react";
import { ZoomIn, Check, Info, Sparkles, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface Swatch {
  id: string;
  name: string;
  category: string;
  gsm: number;
  composition: string;
  weave: string;
  colorHex: string;
  texturePattern: string;
  description: string;
  certification: string;
}

const SWATCHES: Swatch[] = [
  {
    id: "indigo-selvedge",
    name: "Bengal Natural Indigo Selvedge",
    category: "Heritage Denim",
    gsm: 410,
    composition: "100% GOTS Ring-Spun Cotton",
    weave: "3x1 Right Hand Twill / Redline ID",
    colorHex: "#142542",
    texturePattern: "repeating-linear-gradient(45deg, #142542, #142542 3px, #0e1c33 3px, #0e1c33 6px)",
    description: "Deep fermentation-vat natural indigo dyed in traditional Narayanganj wash facilities. Rich fading characteristics with vintage handloom selvedge edge.",
    certification: "GOTS Organic & OEKO-TEX Standard 100",
  },
  {
    id: "raw-jute-linen",
    name: "Jute-Cotton Eco Twill",
    category: "Sustainable Hybrid",
    gsm: 280,
    composition: "60% Organic Cotton / 40% Fine Bengal Jute",
    weave: "2x2 Broken Twill",
    colorHex: "#C9AD8A",
    texturePattern: "repeating-linear-gradient(0deg, #c9ad8a, #c9ad8a 2px, #bfa07b 2px, #bfa07b 4px)",
    description: "Utilizes Golden Bengal Jute micro-fibers blended with combed cotton. High breathability, natural antibacterial properties, and distinct textured drape.",
    certification: "FairTrade Certified & Zero Chemical Finish",
  },
  {
    id: "dhaka-muslin-voile",
    name: "Dhaka 120s High-Count Voile",
    category: "Luxury Shirting",
    gsm: 85,
    composition: "100% Extra-Long Staple (ELS) Combed Cotton",
    weave: "Plain Muslin Weave (120/2 x 120/2)",
    colorHex: "#F2EBE1",
    texturePattern: "radial-gradient(circle, #f2ebe1 20%, #e8decb 80%)",
    description: "Inspired by historical Phuti Karpas muslin yarn spinning. Ultra-lightweight sheer finish with silky liquid drape suited for premium summer shirting.",
    certification: "BCI Cotton & ISO 9001 Certified Mill",
  },
  {
    id: "terracotta-french-terry",
    name: "Terracotta Slub French Terry",
    category: "Premium Heavyweight Knit",
    gsm: 360,
    composition: "100% Combed Compact Cotton",
    weave: "3-Thread Loopback Knit",
    colorHex: "#B8542F",
    texturePattern: "repeating-linear-gradient(-45deg, #b8542f, #b8542f 4px, #a24624 4px, #a24624 8px)",
    description: "Looped interior backing with pre-shrunk carbon peach finish on exterior. Low-torque knit engineering prevents torquing and shrinkage after heavy washes.",
    certification: "Sedex SMETA 4-Pillar Audited",
  },
];

export default function SwatchViewer() {
  const [selectedSwatch, setSelectedSwatch] = useState<Swatch>(SWATCHES[0]);
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <section id="swatch-explorer" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1019] border-t border-white/10 text-stone-100">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Tactile Fabric Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              Curated Swatches & Weaving Specifications
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              Explore our master mill yarn constructions. Each fabric swatch is pre-approved for immediate lab dips, prototype sampling, and bulk dyeing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Swatches available for international courier</span>
          </div>
        </div>

        {/* Interactive Swatch Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Swatch Selector Cards (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {SWATCHES.map((swatch) => {
              const isSelected = selectedSwatch.id === swatch.id;
              return (
                <button
                  key={swatch.id}
                  onClick={() => {
                    playTactileClick("soft");
                    setSelectedSwatch(swatch);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-white/10 border-amber-500 shadow-xl shadow-amber-950/40"
                      : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Swatch Pill Color Visual */}
                    <div
                      className="w-12 h-12 rounded-xl border border-white/20 shadow-md flex-shrink-0 relative overflow-hidden"
                      style={{ background: swatch.texturePattern }}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80 block">
                        {swatch.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {swatch.name}
                      </h4>
                      <p className="text-xs text-stone-400 font-mono">
                        {swatch.gsm} GSM • {swatch.weave.split("/")[0]}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-mono text-stone-400">View</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Magnification Loupe & Specs (Right 7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400">{selectedSwatch.category}</span>
                <h3 className="text-2xl font-serif font-bold text-white">{selectedSwatch.name}</h3>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 bg-black/50 p-1.5 rounded-xl border border-white/10 text-xs font-mono">
                <span className="text-stone-400 px-2 flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  Magnify:
                </span>
                {[1, 2, 4].map((z) => (
                  <button
                    key={z}
                    onClick={() => {
                      playTactileClick("soft");
                      setZoomLevel(z);
                    }}
                    className={`px-2 py-0.5 rounded ${
                      zoomLevel === z ? "bg-amber-600 text-white font-bold" : "text-stone-400 hover:text-white"
                    }`}
                  >
                    {z}x
                  </button>
                ))}
              </div>
            </div>

            {/* Magnified Swatch Texture Display */}
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 shadow-inner flex items-center justify-center group">
              <div
                className="absolute inset-0 transition-transform duration-500"
                style={{
                  background: selectedSwatch.texturePattern,
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
              />
              
              {/* Micro-weave grid overlay for magnification detail */}
              <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-stone-200">
                Micro-Structure Inspection: {selectedSwatch.weave}
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Weight</span>
                <span className="text-base font-bold text-white">{selectedSwatch.gsm} GSM</span>
              </div>

              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Composition</span>
                <span className="text-xs font-semibold text-stone-200 leading-tight block mt-0.5">
                  {selectedSwatch.composition}
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Compliance</span>
                <span className="text-xs font-semibold text-emerald-400 block mt-0.5">
                  {selectedSwatch.certification}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed italic bg-black/20 p-4 rounded-xl border border-white/5">
              "{selectedSwatch.description}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
