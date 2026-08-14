"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowUpRight, Sparkles, Check, Compass, ShieldCheck, Zap, Leaf } from "lucide-react";
import { playTactileClick } from "./SoundEffects";

interface ConceptSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONCEPTS_DETAIL = [
  {
    id: "heritage",
    num: "01",
    name: "Heritage & Craft",
    route: "/heritage",
    icon: Compass,
    targetAudience: "Luxury, Heritage, Boutique & Premium Streetwear Brands",
    palette: ["#142238 (Indigo)", "#C45525 (Terracotta)", "#F7F2EB (Jute Ecru)", "#D4B996 (Clay)"],
    typography: "Cormorant Garamond + Plus Jakarta Sans",
    signatureAnimation: "Real-time Canvas Loom Weaving Engine interlacing warp & weft threads row-by-row on load with cursor tension displacement.",
    badge: "Bengal Textile Legacy",
    color: "from-amber-600 to-red-600",
    borderGlow: "group-hover:border-amber-500/50",
  },
  {
    id: "precision",
    num: "02",
    name: "Precision & QC",
    route: "/precision",
    icon: ShieldCheck,
    targetAudience: "Department Stores, High-Volume Retailers & Strict Compliance Sourcing Heads",
    palette: ["#0D1721 (Slate)", "#00E5C8 (Laser Cyan)", "#F8FAFC (Lab White)", "#E5B94E (Metric Gold)"],
    typography: "Space Grotesk + JetBrains Mono + Inter",
    signatureAnimation: "Real-time Interactive Optical Laser Scanner HUD with live coordinate crosshairs, tolerance telemetry & AQL 1.5 pass status.",
    badge: "Zero-Defect Sourcing",
    color: "from-cyan-400 to-blue-500",
    borderGlow: "group-hover:border-cyan-400/50",
  },
  {
    id: "momentum",
    num: "03",
    name: "Momentum & Velocity",
    route: "/momentum",
    icon: Zap,
    targetAudience: "Fast-Fashion Leaders, Direct-to-Consumer (DTC) Brands & Trend Wholesalers",
    palette: ["#FF6B2B (Amber)", "#FF4625 (Signal Coral)", "#0B0F19 (Midnight)", "#FAF7F2 (Ivory)"],
    typography: "Archivo / Clash Display + Space Mono",
    signatureAnimation: "Kinetic Freight & Fabric Velocity Stream with live interactive 21-Day Fast-Track Lead-Time timeline accelerator.",
    badge: "21-Day Fast Track",
    color: "from-orange-500 to-amber-500",
    borderGlow: "group-hover:border-orange-500/50",
  },
  {
    id: "sustainable",
    num: "04",
    name: "Sustainable & ESG",
    route: "/sustainable",
    icon: Leaf,
    targetAudience: "Eco-Conscious Labels, Circular Fashion Brands & European ESG Mandate Buyers",
    palette: ["#2D5033 (Sage Leaf)", "#152819 (Forest)", "#FAF8F3 (Cotton Cream)", "#E5DDD0 (Sand)"],
    typography: "Fraunces + Outfit / Epilogue",
    signatureAnimation: "Generative Organic Cotton Boll & Floating Fiber Physics Particle Field with dynamic live water/carbon impact savings counter.",
    badge: "LEED Platinum & GOTS",
    color: "from-emerald-400 to-teal-600",
    borderGlow: "group-hover:border-emerald-500/50",
  },
];

export default function ConceptSwitcherModal({ isOpen, onClose }: ConceptSwitcherModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-stone-950 border border-white/15 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl overflow-y-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Creative Direction Comparison Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Select a Landing Page Concept
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Each direction presents a distinct creative angle, bespoke hero animation engine, custom color tokens, and tailored typography.
            </p>
          </div>

          <button
            onClick={() => {
              playTactileClick("soft");
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
            aria-label="Close matrix"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
          {CONCEPTS_DETAIL.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                href={c.route}
                onClick={() => {
                  playTactileClick("switch");
                  onClose();
                }}
                className={`group relative bg-stone-900/90 border border-white/10 ${c.borderGlow} rounded-2xl p-5 hover:bg-stone-900 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:scale-[1.01]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-400">{c.num}</span>
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                        {c.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-stone-300 border border-white/10">
                      {c.badge}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-stone-300 my-4">
                    <div>
                      <span className="text-stone-400 font-mono text-[10px] block uppercase">Target Buyer:</span>
                      <p className="font-medium text-stone-200">{c.targetAudience}</p>
                    </div>

                    <div>
                      <span className="text-stone-400 font-mono text-[10px] block uppercase">Signature Animation:</span>
                      <p className="text-stone-300 italic">{c.signatureAnimation}</p>
                    </div>

                    <div>
                      <span className="text-stone-400 font-mono text-[10px] block uppercase">Type Pairing:</span>
                      <p className="font-mono text-cyan-300 text-[11px]">{c.typography}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {c.palette.map((p, idx) => {
                      const hex = p.split(" ")[0];
                      return (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                          style={{ backgroundColor: hex }}
                          title={p}
                        />
                      );
                    })}
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Concept</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
