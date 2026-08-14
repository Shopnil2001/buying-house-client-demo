"use client";

import React, { useState } from "react";
import LoomCanvasHero from "./components/LoomCanvasHero";
import SwatchViewer from "./components/SwatchViewer";
import HeritageCinematicReveal from "./components/HeritageCinematicReveal";
import { 
  History, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Factory, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Quote, 
  Feather,
  RotateCcw
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

export default function HeritageLandingPage() {
  const [revealKey, setRevealKey] = useState(0);

  const handleReplayIntro = () => {
    playTactileClick("shuttle");
    setRevealKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#0A0E17] text-stone-100 min-h-screen relative">
      {/* Bespoke After-Effects Level Cinematic Thread Reveal on Load */}
      <HeritageCinematicReveal key={revealKey} />

      {/* Floating Replay Intro Trigger */}
      <button
        onClick={handleReplayIntro}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 text-amber-300 hover:text-white font-mono text-[11px] backdrop-blur-md shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        title="Replay Cinematic Thread Weave Intro"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Replay Intro FX</span>
      </button>

      {/* 1. Bespoke Hero Animation */}
      <LoomCanvasHero />

      {/* 2. Bengal Textile Heritage Narrative */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              <span>Historical Provenance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white leading-tight">
              The Living Lineage of <span className="italic text-amber-300">Bengal Weaving</span>
            </h2>

            <p className="text-stone-300 leading-relaxed text-base sm:text-lg">
              Long before industrial mills emerged, the river basins of the Meghna and Shitalakshya in Bengal produced <em>Dhaka Muslin</em>—so sheer it could pass through a signet ring, spun from indigenous wild <em>Phuti Karpas</em> cotton.
            </p>

            <p className="text-stone-400 leading-relaxed text-sm sm:text-base">
              Today, <strong>THREADWORKS BD</strong> merges this five-century-old artisanal legacy with modern computerized Dornier and Toyota airjet weaving looms. We provide international fashion houses with garments possessing rare tactile depth, authentic yarn-dyed nuance, and certified social ethics.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-serif text-2xl font-bold text-amber-400">16th Century</span>
                <p className="text-xs text-stone-400">Mughal imperial court patronage in Dhaka & Sonargaon</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-serif text-2xl font-bold text-white">45+ Mills</span>
                <p className="text-xs text-stone-400">GOTS & Sedex certified partner clusters across Gazipur & Narayanganj</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-stone-900 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-amber-400 tracking-widest">
                  Artisanal Mastery Meets Modern Scale
                </span>
                <Feather className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-4 text-sm text-stone-300">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold">
                    01
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Yarn-Dyed Indigo & Plant Fermentation</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Traditional continuous rope dyeing combined with eco-enzymatic stone washing for rich character.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold">
                    02
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Master Handloom & Shuttleless Fusion</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Translating complex heritage Jamdani motifs onto high-speed 24-shaft electronic jacquards.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold">
                    03
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Full Traceability & Fair Worker Compensation</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Living wage compliance, audited fire safety, and fair-trade weaving guild incentives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Swatch & Fabric Specs Library */}
      <SwatchViewer />

      {/* 4. Mill & Cluster Network Map */}
      <section id="mill-network" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5 text-amber-400" />
            <span>Manufacturing Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white">
            Bangladesh Production Clusters
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Strategic factory distribution across key industrial zones in Bangladesh, ensuring specialized technical capability per category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">ZONE 01</span>
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Narayanganj & Dhaka</h3>
            <p className="text-xs text-stone-400 font-mono">Riverbank Textile Heritage Hub</p>
            <p className="text-sm text-stone-300 leading-relaxed">
              Specialized in high-gauge circular knitting, yarn-dyed stripes, organic cotton washes, and artisanal hand-embellished capsules.
            </p>
            <div className="pt-2 text-xs font-mono text-amber-300/90 space-y-1">
              <div>• 18 Partner Knit & Dyeing Units</div>
              <div>• Capacity: 3.8M Garments / Month</div>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">ZONE 02</span>
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Gazipur & Ashulia</h3>
            <p className="text-xs text-stone-400 font-mono">Modern High-Volume Woven & Denim Hub</p>
            <p className="text-sm text-stone-300 leading-relaxed">
              Equipped with automated laser finishing, Jeanologia ozone washing, high-speed shirting lines, and heavy-gauge outerwear factories.
            </p>
            <div className="pt-2 text-xs font-mono text-amber-300/90 space-y-1">
              <div>• 21 Heavy Woven & Denim Mills</div>
              <div>• Capacity: 5.2M Garments / Month</div>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">ZONE 03</span>
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Chittagong Port Hub</h3>
            <p className="text-xs text-stone-400 font-mono">Seaport Export Logistics & EPZ</p>
            <p className="text-sm text-stone-300 leading-relaxed">
              Direct seaport-adjacent bonded warehouses for immediate ocean container consolidation, customs clearance, and global dispatch.
            </p>
            <div className="pt-2 text-xs font-mono text-amber-300/90 space-y-1">
              <div>• 6 EPZ Units & Consolidated Depot</div>
              <div>• Direct Mother Vessel feeder links</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Luxury Brand Endorsements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-r from-stone-950 via-[#101726] to-stone-950">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Quote className="w-10 h-10 text-amber-400 mx-auto opacity-70" />
            <p className="text-lg sm:text-2xl font-serif italic text-stone-200 leading-relaxed">
              "Threadworks BD unlocked a level of fabric hand-feel and intricate yarn-dyed texture we previously assumed could only be sourced from small boutique European mills, but at reliable export volumes."
            </p>
            <div className="space-y-1">
              <div className="font-bold text-white text-base">Head of Sourcing & Product Development</div>
              <div className="text-xs font-mono text-amber-400">Scandinavian Contemporary Menswear Brand (Stockholm)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Heritage Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/80 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-white text-sm">THREADWORKS BD — HERITAGE DIRECTION</div>
            <p>Gulshan-2 Diplomatic Zone, Dhaka 1212, Bangladesh • Contact: heritage@threadworksbd.com</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-stone-500 font-mono">BSCI • WRAP • OEKO-TEX 100 • GOTS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
