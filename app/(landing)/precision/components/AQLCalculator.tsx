"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, ShieldAlert, BarChart3, Info } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface AQLTier {
  minLot: number;
  maxLot: number;
  sampleSize: number;
  aql15MajorMax: number;
  aql25MinorMax: number;
}

const AQL_LEVEL_II_TABLE: AQLTier[] = [
  { minLot: 151, maxLot: 500, sampleSize: 50, aql15MajorMax: 2, aql25MinorMax: 3 },
  { minLot: 501, maxLot: 1200, sampleSize: 80, aql15MajorMax: 3, aql25MinorMax: 5 },
  { minLot: 1201, maxLot: 3200, sampleSize: 125, aql15MajorMax: 5, aql25MinorMax: 7 },
  { minLot: 3201, maxLot: 10000, sampleSize: 200, aql15MajorMax: 7, aql25MinorMax: 10 },
  { minLot: 10001, maxLot: 35000, sampleSize: 315, aql15MajorMax: 10, aql25MinorMax: 14 },
  { minLot: 35001, maxLot: 150000, sampleSize: 500, aql15MajorMax: 14, aql25MinorMax: 21 },
  { minLot: 150001, maxLot: 500000, sampleSize: 800, aql15MajorMax: 21, aql25MinorMax: 21 },
];

export default function AQLCalculator() {
  const [lotSize, setLotSize] = useState(25000);

  const matchedTier = AQL_LEVEL_II_TABLE.find(
    (t) => lotSize >= t.minLot && lotSize <= t.maxLot
  ) || AQL_LEVEL_II_TABLE[4];

  return (
    <section id="aql-calculator" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09111C] border-t border-cyan-500/20 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
              <Calculator className="w-3.5 h-3.5" />
              <span>Statistical Sampling Engine (ISO 2859-1 / ANSI ASQ Z1.4)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-bold text-white tracking-tight">
              Interactive AQL 1.5 / 2.5 Inspector Simulator
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Calculate exact inspection sample counts and maximum allowable defect limits for your shipment lot size before container sealing.
            </p>
          </div>

          <div className="font-mono text-xs text-cyan-300 bg-cyan-950/60 px-4 py-2 rounded-xl border border-cyan-500/30">
            Inspection Level: General Inspection Level II (Normal Single Sampling)
          </div>
        </div>

        {/* Interactive Calculator Slider Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 bg-[#0B1726] rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="text-slate-300">Total Purchase Order Volume:</span>
                <span className="text-2xl font-bold text-cyan-400">{lotSize.toLocaleString()} PCS</span>
              </div>

              <input
                type="range"
                min={500}
                max={150000}
                step={500}
                value={lotSize}
                onChange={(e) => {
                  playTactileClick("soft");
                  setLotSize(Number(e.target.value));
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>500 Pcs</span>
                <span>50,000 Pcs</span>
                <span>150,000 Pcs</span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono text-slate-400 py-1 mr-1">Presets:</span>
              {[2500, 10000, 25000, 50000, 100000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    playTactileClick("soft");
                    setLotSize(preset);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    lotSize === preset
                      ? "bg-cyan-500 text-slate-950 font-bold shadow"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {preset.toLocaleString()} pcs
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <Info className="w-4 h-4" />
                <span>Standard Protocol Guarantee:</span>
              </div>
              <p className="leading-relaxed">
                If defect count reaches or exceeds the threshold during pre-shipment inspection, 100% of the entire lot is pulled back to finishing lines for re-screening at vendor expense.
              </p>
            </div>
          </div>

          {/* Statistical Output Results Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0B1726] rounded-2xl p-6 border border-cyan-500/20 space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Random Sample Size</span>
              <div className="text-4xl font-space font-bold text-white">
                {matchedTier.sampleSize} <span className="text-sm font-mono text-cyan-400">Garments</span>
              </div>
              <p className="text-xs text-slate-400">Pulled randomly across size & color ratio cartons</p>
            </div>

            <div className="bg-[#0B1726] rounded-2xl p-6 border border-cyan-500/20 space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">AQL 1.5 Major Defect Limit</span>
              <div className="text-4xl font-space font-bold text-emerald-400">
                ≤ {matchedTier.aql15MajorMax} <span className="text-sm font-mono text-slate-400">Max Pass</span>
              </div>
              <p className="text-xs text-slate-400">Critical functional flaws (holes, open seams, wrong spec)</p>
            </div>

            <div className="bg-[#0B1726] rounded-2xl p-6 border border-cyan-500/20 space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">AQL 2.5 Minor Defect Limit</span>
              <div className="text-4xl font-space font-bold text-amber-400">
                ≤ {matchedTier.aql25MinorMax} <span className="text-sm font-mono text-slate-400">Max Pass</span>
              </div>
              <p className="text-xs text-slate-400">Minor cosmetic flaws (loose uncut threads, slight shade)</p>
            </div>

            <div className="bg-[#0B1726] rounded-2xl p-6 border border-cyan-500/20 space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Immediate Fail Trigger</span>
              <div className="text-4xl font-space font-bold text-rose-400">
                0 <span className="text-sm font-mono text-slate-400">Critical Tolerated</span>
              </div>
              <p className="text-xs text-slate-400">Zero tolerance for broken needle fragments or sharp metal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
