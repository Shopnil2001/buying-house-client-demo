"use client";

import React from "react";
import { 
  Users, 
  Factory, 
  Sun, 
  Globe2, 
  Award, 
  TrendingUp, 
  Zap, 
  ShieldCheck 
} from "lucide-react";

const FACTS = [
  {
    icon: Factory,
    figure: "150M+",
    unit: "Garment Units / Year",
    label: "Total Consolidated Apparel & Hosiery Output",
    subtext: "Vertically integrated spinning to finished packed cartons",
    color: "text-cyan-400",
  },
  {
    icon: Users,
    figure: "30,000+",
    unit: "Skilled Associates",
    label: "Workforce with Living Wage Compliance",
    subtext: "100% gender parity initiatives & onsite health clinics",
    color: "text-amber-400",
  },
  {
    icon: Sun,
    figure: "15.8 MW",
    unit: "Rooftop Solar Capacity",
    label: "Renewable Energy Generation Across Facilities",
    subtext: "Offsetting over 22,000 metric tons of CO2 annually",
    color: "text-emerald-400",
  },
  {
    icon: Award,
    figure: "5 Facilities",
    unit: "USGBC LEED Platinum",
    label: "Top-Tier Green Certified Factories in Bangladesh",
    subtext: "Zero Liquid Discharge & 95% biological water recycling",
    color: "text-teal-400",
  },
  {
    icon: Globe2,
    figure: "40+ Countries",
    unit: "Global Export Network",
    label: "Serving Premier Brands in EU, US, UK & Asia",
    subtext: "Direct container berths from Chittagong seaport",
    color: "text-blue-400",
  },
  {
    icon: ShieldCheck,
    figure: "99.8%",
    unit: "First-Time AQL 1.5 Pass Rate",
    label: "In-House ISO 17025 Accredited Testing Rigor",
    subtext: "Zero tolerance for critical functional defects",
    color: "text-orange-400",
  },
];

export default function FactsFigures() {
  return (
    <section id="key-facts" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070B13] border-t border-white/10 text-stone-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono uppercase tracking-widest">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Industrial Scale & Verified Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
            Key Facts & Scale of Operations
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Backed by massive infrastructure investments, audited compliance, and world-class production efficiency across Bangladesh.
          </p>
        </div>

        {/* 6 Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACTS.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-3xl bg-[#0C1422] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 space-y-4 hover:shadow-xl hover:shadow-cyan-950/40"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-stone-400 border border-white/5">
                    Metric #{i + 1}
                  </span>
                </div>

                <div>
                  <div className={`text-3xl sm:text-4xl font-black font-space ${f.color}`}>
                    {f.figure}
                  </div>
                  <div className="text-xs font-mono text-stone-300 font-bold uppercase tracking-wider mt-0.5">
                    {f.unit}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {f.label}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {f.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
