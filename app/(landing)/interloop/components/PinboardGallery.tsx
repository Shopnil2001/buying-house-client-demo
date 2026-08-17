"use client";

import React, { useState } from "react";
import { 
  Pin, 
  Sparkles, 
  ZoomIn, 
  X, 
  Tag, 
  Layers, 
  Camera, 
  CheckCircle2, 
  Scissors,
  Bookmark
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface PinItem {
  id: string;
  type: "polaroid" | "stickynote" | "swatch" | "techcard";
  title: string;
  category: "R&D Lab" | "Mill Floor" | "Sustainability" | "Design Mood";
  date: string;
  rotation: string; // e.g. "-rotate-3", "rotate-2"
  noteText?: string;
  imageBg: string;
  author: string;
  pinColor: string; // Tailwind color for pushpin
  tapePosition?: "top" | "corner" | "none";
}

const PIN_ITEMS: PinItem[] = [
  {
    id: "pin-1",
    type: "polaroid",
    title: "Gazipur Automated Circular Knitting Perch",
    category: "Mill Floor",
    date: "August 2026",
    rotation: "-rotate-2",
    noteText: "High-gauge 32-gauge knitting machines running 100% GOTS combed organic cotton at 450 RPM.",
    imageBg: "linear-gradient(135deg, #1A2B4C 0%, #0E1726 100%)",
    author: "Engr. Tanvir Ahmed (Production Lead)",
    pinColor: "bg-rose-500",
    tapePosition: "top",
  },
  {
    id: "pin-2",
    type: "stickynote",
    title: "ZLD Effluent Test - Batch #441",
    category: "Sustainability",
    date: "July 2026",
    rotation: "rotate-3",
    noteText: "COD < 30 ppm / BOD < 5 ppm after biological MBR filtration. 95.8% process water recycled back into reactive dye vats.",
    imageBg: "#FEF08A", // Post-it Yellow
    author: "Dr. Farzana Kabir (EHS Lead)",
    pinColor: "bg-amber-500",
    tapePosition: "corner",
  },
  {
    id: "pin-3",
    type: "polaroid",
    title: "3D CLO Digital Twin Sample Approval",
    category: "R&D Lab",
    date: "August 2026",
    rotation: "rotate-1",
    noteText: "Eliminated 3 physical prototype rounds for European retailer drop. Pattern graded directly to Gerber automated cutting.",
    imageBg: "linear-gradient(135deg, #0A1E24 0%, #003B46 100%)",
    author: "Nadia Rahman (3D CAD Lead)",
    pinColor: "bg-cyan-400",
    tapePosition: "none",
  },
  {
    id: "pin-4",
    type: "swatch",
    title: "Indigo Melange Ring-Spun French Terry",
    category: "Design Mood",
    date: "SS27 Capsule",
    rotation: "-rotate-3",
    noteText: "340 GSM • 95% Organic Cotton / 5% Elastane • Carbon Peached Exterior with Loopback Backing.",
    imageBg: "repeating-linear-gradient(45deg, #182B49, #182B49 4px, #122035 4px, #122035 8px)",
    author: "Atelier Fabric R&D",
    pinColor: "bg-emerald-500",
    tapePosition: "top",
  },
  {
    id: "pin-5",
    type: "stickynote",
    title: "Jeanologia Laser Finishing Specs",
    category: "R&D Lab",
    date: "August 2026",
    rotation: "-rotate-1",
    noteText: "Zero potassium permanganate (PP) spray. 100% waterless laser whispering and ozone fading on 13.5 oz denim.",
    imageBg: "#BBF7D0", // Soft Mint Green Sticky
    author: "Sourcing Tech Lead",
    pinColor: "bg-rose-400",
    tapePosition: "corner",
  },
  {
    id: "pin-6",
    type: "polaroid",
    title: "LEED Platinum Rooftop Solar Microgrid",
    category: "Sustainability",
    date: "June 2026",
    rotation: "rotate-2",
    noteText: "1.4 MW photovoltaic array on Gazipur facility rooftop offsetting 42.8% of daily spinning load.",
    imageBg: "linear-gradient(135deg, #152819 0%, #2D5033 100%)",
    author: "Green Council BD",
    pinColor: "bg-yellow-400",
    tapePosition: "top",
  },
  {
    id: "pin-7",
    type: "techcard",
    title: "Seamless Compression Mesh Mapping",
    category: "Mill Floor",
    date: "SS27 Active",
    rotation: "-rotate-2",
    noteText: "Santoni seamless knitting with multi-zone ribbing, sweat-wicking ventilation channels, and zero side seams.",
    imageBg: "linear-gradient(135deg, #2A1B0E 0%, #4A2800 100%)",
    author: "Performance Lab",
    pinColor: "bg-orange-500",
    tapePosition: "none",
  },
  {
    id: "pin-8",
    type: "stickynote",
    title: "AQL 1.5 Pre-Shipment FRI Sign-off",
    category: "R&D Lab",
    date: "Daily Log",
    rotation: "rotate-3",
    noteText: "Lot #8840 (45,000 pcs hoodies) inspected: 0 Critical, 1 Minor defect found against 315 sample size. PASSED.",
    imageBg: "#FBCFE8", // Pastel Rose Sticky Note
    author: "Independent QA Auditor",
    pinColor: "bg-purple-500",
    tapePosition: "corner",
  },
];

export default function PinboardGallery() {
  const [filter, setFilter] = useState<string>("All");
  const [activeModalItem, setActiveModalItem] = useState<PinItem | null>(null);

  const filteredItems = filter === "All" 
    ? PIN_ITEMS 
    : PIN_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="insights-pinboard" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111622] border-t border-white/10 text-stone-100 relative overflow-hidden">
      {/* Background subtle corkboard pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#d4af37 1px, #111622 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
        }}
      />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Atelier Moodboard & Factory Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
              Live R&D Pinboard & Factory Snaps
            </h2>
            <p className="text-sm sm:text-base text-stone-300">
              Explore real-time design swatches, laboratory test slips, factory floor snapshots, and technical production memos pinned straight from our Dhaka and Gazipur engineering facilities.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-white/10 text-xs font-mono">
            {["All", "R&D Lab", "Mill Floor", "Sustainability", "Design Mood"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playTactileClick("soft");
                  setFilter(cat);
                }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  filter === cat
                    ? "bg-amber-500 text-stone-950 font-bold shadow-lg"
                    : "text-stone-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pinboard Canvas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start pt-4">
          {filteredItems.map((item) => {
            const isSticky = item.type === "stickynote";
            const isPolaroid = item.type === "polaroid";
            const isSwatch = item.type === "swatch";

            return (
              <div
                key={item.id}
                onClick={() => {
                  playTactileClick("switch");
                  setActiveModalItem(item);
                }}
                className={`group cursor-pointer relative transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl ${item.rotation} ${
                  isSticky 
                    ? "p-5 rounded-sm shadow-xl text-stone-900 font-sans" 
                    : isPolaroid
                    ? "p-4 rounded-xl bg-stone-100 text-stone-900 shadow-2xl"
                    : "p-5 rounded-2xl bg-stone-900 border border-white/15 text-stone-100 shadow-2xl"
                }`}
                style={{
                  backgroundColor: isSticky ? item.imageBg : undefined,
                }}
              >
                {/* 3D Pushpin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full ${item.pinColor} border-2 border-white shadow-md ring-1 ring-black/30 flex items-center justify-center`}>
                    <div className="w-1 h-1 bg-white rounded-full opacity-80" />
                  </div>
                </div>

                {/* Scotch Masking Tape Strip */}
                {item.tapePosition === "top" && (
                  <div className="absolute -top-3 left-6 w-16 h-5 bg-amber-100/70 backdrop-blur-sm -rotate-6 border-t border-b border-amber-200/50 shadow-sm pointer-events-none z-10" />
                )}
                {item.tapePosition === "corner" && (
                  <div className="absolute -top-2 -right-2 w-12 h-4 bg-amber-100/70 backdrop-blur-sm rotate-45 border-t border-b border-amber-200/50 shadow-sm pointer-events-none z-10" />
                )}

                {/* Content based on type */}
                {isPolaroid && (
                  <div className="space-y-3">
                    {/* Polaroid Photo Frame */}
                    <div 
                      className="w-full h-40 rounded-lg overflow-hidden relative shadow-inner flex items-center justify-center text-white"
                      style={{ background: item.imageBg }}
                    >
                      <div className="text-center p-3">
                        <Camera className="w-6 h-6 mx-auto text-amber-300 opacity-80 mb-1" />
                        <span className="text-[11px] font-mono text-stone-300 uppercase block">{item.category}</span>
                        <span className="text-xs font-bold text-white leading-tight">{item.title}</span>
                      </div>

                      <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono text-stone-300">
                        {item.date}
                      </div>
                    </div>

                    {/* Polaroid Handwritten Caption */}
                    <div className="pt-1 space-y-1">
                      <h4 className="font-serif font-bold text-stone-900 text-sm leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-700 leading-snug line-clamp-2">
                        {item.noteText}
                      </p>
                      <span className="text-[10px] font-mono text-stone-500 block pt-1">
                        — {item.author}
                      </span>
                    </div>
                  </div>
                )}

                {isSticky && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-black/10">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-stone-800">
                        MEMO: {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-stone-600">{item.date}</span>
                    </div>

                    <h4 className="font-bold text-stone-950 text-sm leading-tight">
                      {item.title}
                    </h4>

                    <p className="text-xs text-stone-800 leading-relaxed italic font-serif">
                      "{item.noteText}"
                    </p>

                    <div className="text-[10px] font-mono text-stone-600 pt-2 text-right">
                      ✍️ {item.author}
                    </div>
                  </div>
                )}

                {isSwatch && (
                  <div className="space-y-3">
                    <div 
                      className="w-full h-32 rounded-xl border border-white/20 shadow-md relative overflow-hidden flex items-end p-2"
                      style={{ background: item.imageBg }}
                    >
                      <div className="bg-black/70 px-2 py-1 rounded text-[10px] font-mono text-amber-300">
                        Swatched in Dhaka Atelier
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 block">{item.category}</span>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-stone-400 line-clamp-2">{item.noteText}</p>
                    </div>
                  </div>
                )}

                {item.type === "techcard" && (
                  <div className="space-y-3">
                    <div 
                      className="w-full h-32 rounded-xl border border-orange-500/30 p-3 flex flex-col justify-between"
                      style={{ background: item.imageBg }}
                    >
                      <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">TECH-PACK SPEC</span>
                      <span className="text-xs font-bold text-white">{item.title}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{item.noteText}</p>
                    <span className="text-[10px] font-mono text-stone-500 block">— {item.author}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Zoom Inspector Modal */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="relative max-w-lg w-full bg-stone-900 border border-white/20 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase">
              <Tag className="w-3.5 h-3.5" />
              <span>{activeModalItem.category} • {activeModalItem.date}</span>
            </div>

            <h3 className="text-2xl font-bold text-white font-serif">
              {activeModalItem.title}
            </h3>

            <div 
              className="w-full h-48 rounded-2xl border border-white/15 shadow-inner flex items-center justify-center text-center p-4"
              style={{ background: activeModalItem.imageBg }}
            >
              <p className="text-sm font-mono text-white/90 bg-black/60 px-4 py-2 rounded-xl backdrop-blur-sm">
                Documented at Interloop BD Manufacturing Campus
              </p>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed">
              {activeModalItem.noteText}
            </p>

            <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs font-mono text-stone-400">
              <span>Author: <strong className="text-white">{activeModalItem.author}</strong></span>
              <span className="text-emerald-400">Verified Inspection Entry</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
