"use client";

import React from "react";
import Studio3DCard from "@/components/visualizer/Studio3DCard";
import { 
  Users, 
  Factory, 
  Sun, 
  Globe2, 
  Award, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react";

const FACTS = [
  {
    icon: Factory,
    figure: "150M+",
    unit: "Garment Units / Year",
    label: "Total Consolidated Output",
    subtext: "Vertically integrated spinning to finished packed cartons",
    glow: "gold" as const,
    color: "text-[#E0B27A]",
  },
  {
    icon: Users,
    figure: "30,000+",
    unit: "Skilled Associates",
    label: "Living Wage Workforce",
    subtext: "100% gender parity initiatives & onsite health clinics",
    glow: "terracotta" as const,
    color: "text-[#C26747]",
  },
  {
    icon: Sun,
    figure: "15.8 MW",
    unit: "Rooftop Solar Capacity",
    label: "Renewable Microgrid",
    subtext: "Offsetting over 22,000 metric tons of CO2 annually",
    glow: "sage" as const,
    color: "text-[#78A882]",
  },
  {
    icon: Award,
    figure: "5 Facilities",
    unit: "USGBC LEED Platinum",
    label: "Top-Tier Green Mills",
    subtext: "Zero Liquid Discharge & 95% biological water recycling",
    glow: "gold" as const,
    color: "text-[#E0B27A]",
  },
  {
    icon: Globe2,
    figure: "40+ Countries",
    unit: "Global Export Network",
    label: "Premier Brand Partners",
    subtext: "Direct container berths from Chittagong seaport",
    glow: "indigo" as const,
    color: "text-[#6B9BD2]",
  },
  {
    icon: ShieldCheck,
    figure: "99.8%",
    unit: "AQL 1.5 First-Pass Yield",
    label: "ISO 17025 Accredited",
    subtext: "Zero tolerance for critical functional defects",
    glow: "terracotta" as const,
    color: "text-[#C26747]",
  },
];

export default function FactsFigures() {
  return (
    <section id="key-facts" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-stone-100">
      <div className="space-y-14">
        {/* Eyebrow and Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#182335]/90 border border-amber-500/30 text-[#E0B27A] text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-xl">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Industrial Scale & Verified Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#FAF7F2] tracking-tight">
            Key Facts & Scale of Operations
          </h2>
          <p className="text-sm sm:text-base text-[#D6CFC7] font-sans max-w-xl mx-auto">
            Backed by massive infrastructure investments, audited compliance, and world-class production efficiency across Bangladesh.
          </p>
        </div>

        {/* 3D Glassmorphic Metric Monoliths */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACTS.map((f, i) => {
            const Icon = f.icon;
            return (
              <Studio3DCard key={i} glowColor={f.glow}>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shadow-inner">
                      <Icon className={`w-6 h-6 ${f.color}`} />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-white/5 text-[#A59E95] border border-white/5">
                      Metric #{i + 1}
                    </span>
                  </div>

                  <div>
                    <div className={`text-4xl sm:text-5xl font-serif font-bold ${f.color} tracking-tight`}>
                      {f.figure}
                    </div>
                    <div className="text-xs font-mono text-[#D6CFC7] font-semibold uppercase tracking-wider mt-1">
                      {f.unit}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-1">
                    <h4 className="text-base font-serif font-bold text-white leading-tight">
                      {f.label}
                    </h4>
                    <p className="text-xs text-[#A59E95] leading-relaxed font-sans">
                      {f.subtext}
                    </p>
                  </div>
                </div>
              </Studio3DCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
