"use client";

import React, { useState } from "react";
import { Factory, Calendar, Clock, Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

interface ProductionLine {
  id: string;
  unitName: string;
  location: string;
  category: string;
  monthlyCapacity: string;
  currentUtilization: number;
  availableSlot: string;
  moq: string;
}

const FACTORY_LINES: ProductionLine[] = [
  {
    id: "knit-01",
    unitName: "Apex Circular Knit Hub (Unit 4)",
    location: "Gazipur Industrial Zone",
    category: "Heavyweight Fleece & Hoodies",
    monthlyCapacity: "450,000 Pcs",
    currentUtilization: 82,
    availableSlot: "Next Slot: 14 Days",
    moq: "2,000 Pcs",
  },
  {
    id: "woven-02",
    unitName: "Bengal Precision Shirting (Unit 2)",
    location: "Ashulia Cluster",
    category: "Formal & Casual Woven Tops",
    monthlyCapacity: "320,000 Pcs",
    currentUtilization: 70,
    availableSlot: "Next Slot: Immediate (7 Days)",
    moq: "1,500 Pcs",
  },
  {
    id: "denim-03",
    unitName: "Eco-Laser Denim Washing Line",
    location: "Narayanganj Basin",
    category: "Jeanologia Laser Washed Denim",
    monthlyCapacity: "550,000 Pcs",
    currentUtilization: 88,
    availableSlot: "Next Slot: 21 Days",
    moq: "2,500 Pcs",
  },
  {
    id: "outerwear-04",
    unitName: "Technical Outerwear & Padding",
    location: "Chittagong EPZ",
    category: "Seam-Sealed Puffer & Shells",
    monthlyCapacity: "180,000 Pcs",
    currentUtilization: 65,
    availableSlot: "Next Slot: Immediate (5 Days)",
    moq: "1,000 Pcs",
  },
];

export default function CapacityAllocator() {
  const [selectedLine, setSelectedLine] = useState<string>(FACTORY_LINES[0].id);

  return (
    <section id="capacity-allocator" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070B12] border-t border-orange-500/20 text-stone-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400">
              <Zap className="w-3.5 h-3.5" />
              <span>Real-Time Production Slot Allocation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
              Live Factory Capacity Availability
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              Direct visibility into floor line utilization across our partner manufacturing plants. Lock dedicated lines for seasonal capsules with zero middleman overhead.
            </p>
          </div>

          <div className="font-mono text-xs text-orange-300 bg-orange-950/60 px-4 py-2 rounded-xl border border-orange-500/30">
            Total Consolidated Monthly Capacity: 12.4M Garment Units
          </div>
        </div>

        {/* Live Line Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FACTORY_LINES.map((line) => {
            const isSelected = selectedLine === line.id;
            return (
              <div
                key={line.id}
                onClick={() => {
                  playTactileClick("switch");
                  setSelectedLine(line.id);
                }}
                className={`cursor-pointer p-6 sm:p-8 rounded-3xl border transition-all duration-300 space-y-5 ${
                  isSelected
                    ? "bg-[#111A2E] border-orange-500 shadow-2xl shadow-orange-950/50"
                    : "bg-[#0A101C] border-white/10 hover:border-white/20 hover:bg-[#0D1524]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-orange-400 uppercase font-bold tracking-wider">
                    {line.category}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/50 text-emerald-400 border border-emerald-500/30">
                    {line.availableSlot}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{line.unitName}</h3>
                  <p className="text-xs text-stone-400 font-mono">{line.location}</p>
                </div>

                {/* Utilization Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Line Utilization:</span>
                    <span className="text-white font-bold">{line.currentUtilization}% Allocated</span>
                  </div>
                  <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                      style={{ width: `${line.currentUtilization}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>Monthly Output: <strong className="text-white">{line.monthlyCapacity}</strong></span>
                  <span>MOQ: <strong className="text-orange-400">{line.moq}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
