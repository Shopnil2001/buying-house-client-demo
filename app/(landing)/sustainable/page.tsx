"use client";

import React, { useState } from "react";
import CottonParticleHero from "./components/CottonParticleHero";
import ESGCalculator from "./components/ESGCalculator";
import SustainableCinematicReveal from "./components/SustainableCinematicReveal";
import { 
  Leaf, 
  Award, 
  Droplet, 
  Sun, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Recycle, 
  HeartHandshake,
  CheckCircle,
  FileCheck,
  RotateCcw
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

const LEED_FACILITIES = [
  {
    name: "Greenfield Eco-Knit Composite",
    location: "Gazipur, Bangladesh",
    rating: "LEED Platinum (104/110 Points)",
    highlight: "Highest rated green knitwear composite facility globally",
    features: ["50% Natural Daylight Skylights", "Rainwater Harvesting (40M Liters/yr)", "1.2 MW Solar Rooftop"],
  },
  {
    name: "Envoy Denim Eco Park",
    location: "Bhaluka, Mymensingh",
    rating: "LEED Platinum Certified",
    highlight: "First LEED Platinum denim manufacturing mill in the world",
    features: ["Zero Discharge Ozone Washing", "Thermal Recovery Boilers", "92% Water Recycling"],
  },
  {
    name: "Plummy Fashions Green Hub",
    location: "Narayanganj Basin",
    rating: "LEED Platinum (92 Points)",
    highlight: "Carbon neutral certified knit manufacturing center",
    features: ["Organic Garden Campus", "Geothermal Cooling Loops", "100% LED Sensor Lighting"],
  },
];

export default function SustainableLandingPage() {
  const [revealKey, setRevealKey] = useState(0);

  const handleReplayIntro = () => {
    playTactileClick("organic");
    setRevealKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#050C07] text-stone-100 min-h-screen relative">
      {/* Bespoke After-Effects Level Botanical Sprout & Bloom Reveal on Load */}
      <SustainableCinematicReveal key={revealKey} />

      {/* Floating Replay Intro Trigger */}
      <button
        onClick={handleReplayIntro}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-[#0E1F13]/90 hover:bg-[#142C1B] border border-emerald-500/40 text-emerald-300 hover:text-white font-mono text-[11px] backdrop-blur-md shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        title="Replay Botanical Bloom Intro"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Replay Bloom FX</span>
      </button>

      {/* 1. Bespoke Hero Animation */}
      <CottonParticleHero />

      {/* 2. Global LEED Leadership Narrative */}
      <section id="leed-showcase" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Global Green Factory Capital</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-white leading-tight">
              Home to the World’s Highest Density of <span className="italic text-emerald-300">LEED Platinum Mills</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
              Bangladesh is internationally recognized by the US Green Building Council (USGBC) as the premier destination for sustainable apparel production, housing over <strong>200+ certified green factories</strong> and 9 of the top 10 rated facilities worldwide.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed font-sans">
              <strong>THREADWORKS BD</strong> partners exclusively with top-tier LEED Platinum and Gold accredited spinning, dyeing, and garmenting units to ensure your brand's supply chain meets EU Corporate Sustainability Due Diligence Directives.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#0C1A0F] border border-emerald-500/20 space-y-1">
                <span className="font-fraunces text-2xl font-bold text-emerald-400">200+ Mills</span>
                <p className="text-xs text-stone-400 font-mono">LEED Certified Green Facilities in BD</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0C1A0F] border border-emerald-500/20 space-y-1">
                <span className="font-fraunces text-2xl font-bold text-white">9 of Top 10</span>
                <p className="text-xs text-stone-400 font-mono">World's highest scoring green garment mills</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {LEED_FACILITIES.map((facility, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#0B180E] border border-emerald-500/20 space-y-3 hover:border-emerald-400/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-fraunces text-lg font-bold text-white">{facility.name}</span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    {facility.rating}
                  </span>
                </div>
                <p className="text-xs text-emerald-400/90 font-mono">{facility.highlight}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {facility.features.map((feat, idx) => (
                    <span key={idx} className="text-[11px] font-mono bg-black/40 px-2.5 py-1 rounded-lg text-stone-300 border border-white/5">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive ESG Carbon/Water Calculator */}
      <ESGCalculator />

      {/* 4. Closed-Loop Dyeing & Ethical Worker Standards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase">
            <Recycle className="w-3.5 h-3.5" />
            <span>Circular Economy Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-white tracking-tight">
            Zero Liquid Discharge & Social Equity
          </h2>
          <p className="text-sm sm:text-base text-stone-400 font-sans">
            Responsible chemistry meets transparent living-wage audits. No shortcuts on human dignity or planetary ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#09150C] border border-emerald-500/20 space-y-4">
            <Droplet className="w-8 h-8 text-emerald-400" />
            <h3 className="text-xl font-fraunces font-bold text-white">Biological Effluent Treatment</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              95% of dyeing effluent is filtered through multi-stage membrane bioreactors (MBR) and reverse osmosis, returning crystal-clear water back to production vats.
            </p>
            <div className="text-xs font-mono text-emerald-400">ZDHC MRSL Conformance Level 3</div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#09150C] border border-emerald-500/20 space-y-4">
            <HeartHandshake className="w-8 h-8 text-emerald-400" />
            <h3 className="text-xl font-fraunces font-bold text-white">Living Wage & Gender Equality</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              Fair compensation programs, onsite daycare centers, clean drinking water dispensaries, and female leadership advancement programs across all partner factories.
            </p>
            <div className="text-xs font-mono text-emerald-400">BSCI A-Grade & FairWear Verified</div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#09150C] border border-emerald-500/20 space-y-4">
            <FileCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="text-xl font-fraunces font-bold text-white">GOTS Farm-to-Port Provenance</h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              Digital blockchain tracking of each cotton bale from certified non-GMO organic farms through ginning, spinning, dyeing, and export container loading.
            </p>
            <div className="text-xs font-mono text-emerald-400">Scope & Transaction Certificates</div>
          </div>
        </div>
      </section>

      {/* 5. Sustainable Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-emerald-500/20 bg-black/90 text-stone-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-white text-sm">THREADWORKS BD — SUSTAINABLE DIRECTION</div>
            <p>Eco-Apparel Hub • Gazipur Green Corridor • esg@threadworksbd.com</p>
          </div>

          <div className="flex items-center gap-4 text-emerald-400">
            <span>LEED PLATINUM & GOTS 7.0 CERTIFIED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
