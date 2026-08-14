"use client";

import React, { useState } from "react";
import { Droplets, CloudRain, Sun, TreePine, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

export default function ESGCalculator() {
  const [orderQuantity, setOrderQuantity] = useState(20000);
  const [cottonType, setCottonType] = useState<"gots_organic" | "recycled_cotton" | "regenerative">("gots_organic");

  // Environmental savings multipliers per unit vs conventional virgin cotton
  const multipliers = {
    gots_organic: { waterLiters: 1980, co2Kg: 2.1, chemicalGrams: 320 },
    recycled_cotton: { waterLiters: 2650, co2Kg: 3.4, chemicalGrams: 410 },
    regenerative: { waterLiters: 2200, co2Kg: 2.9, chemicalGrams: 380 },
  };

  const current = multipliers[cottonType];
  const totalWaterSaved = (orderQuantity * current.waterLiters).toLocaleString();
  const totalCO2Saved = ((orderQuantity * current.co2Kg) / 1000).toFixed(1);
  const totalChemicalSaved = ((orderQuantity * current.chemicalGrams) / 1000).toFixed(1);

  return (
    <section id="esg-calculator" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#061009] border-t border-emerald-500/20 text-stone-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
              <Droplets className="w-3.5 h-3.5" />
              <span>ESG Impact & LCA Scope-3 Reduction Modeler</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-white tracking-tight">
              Calculate Your Order's Environmental Footprint Reduction
            </h2>
            <p className="text-sm sm:text-base text-stone-400 font-sans">
              Provide verifiable Scope-3 lifecycle assessment data directly for your brand's European Corporate Sustainability Due Diligence Directive (CSDDD) reporting.
            </p>
          </div>

          <div className="font-mono text-xs text-emerald-300 bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-500/30">
            Methodology: Higg MSI & ISO 14040 Verified LCA
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-6 bg-[#0B1A0F] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="text-stone-300">Production Order Volume:</span>
                <span className="text-2xl font-bold text-emerald-400">{orderQuantity.toLocaleString()} Units</span>
              </div>

              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={orderQuantity}
                onChange={(e) => {
                  playTactileClick("soft");
                  setOrderQuantity(Number(e.target.value));
                }}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-stone-500">
                <span>1,000 Pcs</span>
                <span>50,000 Pcs</span>
                <span>100,000 Pcs</span>
              </div>
            </div>

            {/* Fiber Selector */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-stone-400 block uppercase">Select Sustainable Fiber Category:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "gots_organic", label: "100% GOTS Organic" },
                  { id: "recycled_cotton", label: "Pre-Consumer Recycled" },
                  { id: "regenerative", label: "Regenerative Cotton" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      playTactileClick("organic");
                      setCottonType(f.id as any);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition-all ${
                      cottonType === f.id
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                        : "bg-white/5 text-stone-300 hover:bg-white/10"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-stone-300 space-y-1 font-mono">
              <div className="text-emerald-400 font-bold">Certification Guarantee:</div>
              <p className="font-sans">
                Full Transaction Certificate (TC) issued under GOTS Version 7.0 and GRS (Global Recycled Standard) with raw farm ginning coordinates.
              </p>
            </div>
          </div>

          {/* Metric Outputs */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0B1A0F] rounded-2xl p-6 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <Droplets className="w-4 h-4" />
                <span>Water Consumption Avoided</span>
              </div>
              <div className="text-3xl sm:text-4xl font-fraunces font-bold text-white">
                {totalWaterSaved} <span className="text-sm font-mono text-emerald-400">Liters</span>
              </div>
              <p className="text-xs text-stone-400">Equivalent to {Math.round(orderQuantity * current.waterLiters / 150000)} Olympic swimming pools</p>
            </div>

            <div className="bg-[#0B1A0F] rounded-2xl p-6 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-teal-400">
                <TreePine className="w-4 h-4" />
                <span>Greenhouse Gas Prevented</span>
              </div>
              <div className="text-3xl sm:text-4xl font-fraunces font-bold text-white">
                {totalCO2Saved} <span className="text-sm font-mono text-teal-400">Tonnes CO₂e</span>
              </div>
              <p className="text-xs text-stone-400">Avoided through zero synthetic fertilizers and rooftop solar</p>
            </div>

            <div className="bg-[#0B1A0F] rounded-2xl p-6 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                <Sun className="w-4 h-4" />
                <span>Pesticide & Chemical Load</span>
              </div>
              <div className="text-3xl sm:text-4xl font-fraunces font-bold text-white">
                {totalChemicalSaved} <span className="text-sm font-mono text-amber-400">Kg Toxic Free</span>
              </div>
              <p className="text-xs text-stone-400">100% ZDHC MRSL Conformance Level 3</p>
            </div>

            <div className="bg-[#0B1A0F] rounded-2xl p-6 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fair Living Wage Premium</span>
              </div>
              <div className="text-3xl sm:text-4xl font-fraunces font-bold text-white">
                +18.5% <span className="text-sm font-mono text-emerald-400">Over Min.</span>
              </div>
              <p className="text-xs text-stone-400">Direct childcare, health insurance & provident fund coverage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
