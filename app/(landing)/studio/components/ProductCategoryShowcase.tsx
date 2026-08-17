"use client";

import React, { useState } from "react";
import { 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Shirt, 
  Activity, 
  Compass, 
  Feather,
  SlidersHorizontal
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface ProductVertical {
  id: string;
  name: string;
  short: string;
  icon: any;
  leadTime: string;
  capacity: string;
  moq: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
}

const PRODUCTS: ProductVertical[] = [
  {
    id: "hosiery",
    name: "Hosiery & Performance Socks",
    short: "Hosiery",
    icon: Feather,
    leadTime: "25 – 30 Days",
    capacity: "80 Million Pairs / Year",
    moq: "3,000 Pairs / Style",
    description: "State-of-the-art Italian Lonati & Sangiacomo automated knitting machines producing needle counts from 96N to 200N with Rosso auto-linking flat seams.",
    features: [
      "Graduated Arch Compression & Ankle Ribbing",
      "Merino Wool & Coolmax Thermoregulation",
      "Seamless Hand-Linked Toe Closure",
      "Anti-Slip Medical Grade Silicone Heel Grips"
    ],
    specs: [
      { label: "Needle Gauge", value: "96N, 120N, 144N, 168N, 200N" },
      { label: "Fibers", value: "Organic Cotton, Merino, Recycled Poly" },
      { label: "Testing", value: "Martindale Rub > 25,000 Cycles" }
    ],
  },
  {
    id: "seamless",
    name: "Seamless Engineered Activewear",
    short: "Seamless",
    icon: Activity,
    leadTime: "30 – 35 Days",
    capacity: "12 Million Units / Year",
    moq: "1,500 Units / Style",
    description: "Santoni seamless circular knitting machines delivering anatomically zoned ventilation, gradient compression, and zero chafing seams for performance training.",
    features: [
      "Body-Mapped 4-Way Kinetic Elasticity",
      "Micro-Perforated Sweat Evacuation Zones",
      "Antimicrobial Silver-Ion Odor Shield",
      "Recycled Nylon (Q-NOVA) & Spandex"
    ],
    specs: [
      { label: "Machine Diameters", value: "12\" to 20\" Santoni SM8" },
      { label: "Compression", value: "15-20 mmHg Targeted Grade" },
      { label: "Finishing", value: "Silicone Softening & Wick-Dry" }
    ],
  },
  {
    id: "denim",
    name: "Eco-Laser Denim & Bottoms",
    short: "Denim",
    icon: Compass,
    leadTime: "35 – 40 Days",
    capacity: "15 Million Units / Year",
    moq: "2,000 Units / Style",
    description: "Closed-loop denim manufacturing with Jeanologia laser scraping, e-Flow nano-bubble softening, and zero potassium permanganate spray treatments.",
    features: [
      "100% Waterless Laser Fading & Whiskering",
      "Ozone Atmospheric Wash Finishing",
      "DualFX & T400 High-Recovery Stretch Weaves",
      "Biodegradable Rivets & Pocket Linings"
    ],
    specs: [
      { label: "Fabric Weights", value: "9.5 oz to 14.5 oz Rigid & Stretch" },
      { label: "EIM Score", value: "Low Impact (Green Score < 25)" },
      { label: "Washing", value: "Jeanologia G2 Ozone Machines" }
    ],
  },
  {
    id: "knitwear",
    name: "Knitwear & Heavy French Terry",
    short: "Knitwear",
    icon: Shirt,
    leadTime: "25 – 35 Days",
    capacity: "35 Million Units / Year",
    moq: "1,500 Units / Style",
    description: "From 160 GSM single jersey t-shirts to 450 GSM ultra-heavyweight loopback fleece hoodies with carbon peach exterior hand-feel.",
    features: [
      "Low-Torque Knitting Engineering (Zero Side Twist)",
      "High-Density Plastisol & Puff Screen Printing",
      "Reactive Garment & Pigment Dye Washes",
      "Pre-Shrunk Compact Finishing (< 3% Residual)"
    ],
    specs: [
      { label: "Gauges", value: "20G, 24G, 28G, 32G Mayer & Cie" },
      { label: "Weight Range", value: "140 GSM to 480 GSM" },
      { label: "Yarn Quality", value: "100% Combed Compact Ring-Spun" }
    ],
  },
  {
    id: "yarns",
    name: "Integrated Spinning & Blended Yarns",
    short: "Yarn Spinning",
    icon: Layers,
    leadTime: "Immediate Greige Stock",
    capacity: "45,000 Metric Tons / Year",
    moq: "Bulk Mill Reservation",
    description: "In-house Rieter and Marzoli spinning lines producing high-regularity combed yarns, slub textures, melange tones, and recycled polyester blends.",
    features: [
      "Uster Evenness CV% in Global Top 5% Tier",
      "Siro Spun & Compact Low-Hairiness Index",
      "Organic GOTS Farm Traceable Cotton",
      "Zero Contamination Optical Sorters"
    ],
    specs: [
      { label: "Counts", value: "Ne 10/1 to Ne 80/1 Single & Double" },
      { label: "Specialty", value: "Slub, Core-Spun Spandex, Melange" },
      { label: "Spindles", value: "120,000+ Automated Spindles" }
    ],
  },
];

export default function ProductCategoryShowcase() {
  const [activeTab, setActiveTab] = useState<string>(PRODUCTS[0].id);
  const activeProduct = PRODUCTS.find((p) => p.id === activeTab) || PRODUCTS[0];

  return (
    <section id="our-products" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080D17] border-t border-white/10 text-stone-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Multi-Category Manufacturing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
              Our Vertically Integrated Product Lines
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              Complete end-to-end manufacturing across major apparel categories with in-house spinning, knitting, laser washing, and computerized sewing lines.
            </p>
          </div>

          <div className="font-mono text-xs text-cyan-300 bg-black/50 px-4 py-2 rounded-xl border border-white/10">
            Total Annual Capacity: 150M+ Finished Units
          </div>
        </div>

        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
          {PRODUCTS.map((prod) => {
            const isSelected = activeTab === prod.id;
            const Icon = prod.icon;
            return (
              <button
                key={prod.id}
                onClick={() => {
                  playTactileClick("switch");
                  setActiveTab(prod.id);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-xl shadow-cyan-950/60 scale-[1.02]"
                    : "text-stone-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{prod.short}</span>
              </button>
            );
          })}
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B1424]">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Category Vertical Overview
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold text-white font-sans">
                {activeProduct.name}
              </h3>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed pt-1">
                {activeProduct.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-mono uppercase text-stone-400 block font-bold">
                Engineering Highlights:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-200 bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
              {activeProduct.specs.map((sp, idx) => (
                <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">{sp.label}</span>
                  <span className="text-xs font-bold text-white block">{sp.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-black/50 border border-cyan-500/20 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-stone-400">Dedicated Capacity</span>
                <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                  {activeProduct.capacity}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 font-mono text-xs">
                <div>
                  <span className="text-stone-500 block">Avg Lead Time:</span>
                  <strong className="text-white">{activeProduct.leadTime}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Minimum Order:</span>
                  <strong className="text-amber-400">{activeProduct.moq}</strong>
                </div>
              </div>
            </div>

            <a
              href="#contact-us"
              onClick={() => playTactileClick("soft")}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60"
            >
              <span>Request Tech-Pack Spec & Swatches</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
