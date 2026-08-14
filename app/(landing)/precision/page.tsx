"use client";

import React, { useState } from "react";
import QCScannerHero from "./components/QCScannerHero";
import AQLCalculator from "./components/AQLCalculator";
import PrecisionCinematicReveal from "./components/PrecisionCinematicReveal";
import { 
  ShieldCheck, 
  FlaskConical, 
  CheckCircle, 
  Layers, 
  Microscope, 
  FileCheck2, 
  Cpu, 
  Sparkles,
  ArrowRight,
  ClipboardList,
  RotateCcw
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

const SEVEN_GATES = [
  {
    step: "01",
    title: "Raw Yarn & Fiber Purity Analysis",
    subtitle: "Uster Evenness & Tensile Rating",
    desc: "Every yarn cone tested for count regularity (Ne), hairiness index, and single-yarn strength before knitting or warping commences.",
  },
  {
    step: "02",
    title: "4-Point Greige Fabric Inspection",
    subtitle: "ASTM D5430 Standard",
    desc: "100% of knitted and woven fabric rolls run through illuminated inspection perches to flag slubs, holes, and barre marks before wet processing.",
  },
  {
    step: "03",
    title: "Lab Dip Spectrophotometry",
    subtitle: "Delta-E (ΔE) < 0.8 Tolerance",
    desc: "Color evaluation under D65, CWF, TL84, and Horizon light sources using Datacolor spectrophotometers for zero metamerism.",
  },
  {
    step: "04",
    title: "Pre-Production (PP) Size-Set Fit Lock",
    subtitle: "100% Pattern Grading Audit",
    desc: "Full size range (XS–3XL) cut and sewn to verify seam tension, shrinkage allowances, and buyer tech-pack measurement specs.",
  },
  {
    step: "05",
    title: "Inline 100% Work-in-Progress (WIP) Audits",
    subtitle: "Traffic Light Station Checks",
    desc: "Stationed roving QC inspectors check sewing lines every 2 hours: SPI (Stitches Per Inch), collar symmetry, and seam strength.",
  },
  {
    step: "06",
    title: "9-Point Needle Detector Verification",
    subtitle: "Ferrous Sensitivity 0.8mm",
    desc: "Every finished unit passes dual-probe conveyor metal detectors to ensure zero broken needle fragments in exported cartons.",
  },
  {
    step: "07",
    title: "Final Random Inspection (FRI) AQL 1.5",
    subtitle: "Pre-Shipment Container Seal",
    desc: "Independent quality auditor inspects finished packed cartons. Barcode compliance, carton burst strength, and moisture content (<12%).",
  },
];

export default function PrecisionLandingPage() {
  const [revealKey, setRevealKey] = useState(0);

  const handleReplayIntro = () => {
    playTactileClick("laser");
    setRevealKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#060B12] text-slate-100 min-h-screen relative">
      {/* Bespoke After-Effects Level Hologram Scanner Reveal on Load */}
      <PrecisionCinematicReveal key={revealKey} />

      {/* Floating Replay Intro Trigger */}
      <button
        onClick={handleReplayIntro}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 hover:text-white font-mono text-[11px] backdrop-blur-md shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        title="Replay Hologram Scanner Calibration Intro"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Replay Laser Boot FX</span>
      </button>

      {/* 1. Bespoke Hero QC Scanner */}
      <QCScannerHero />

      {/* 2. Seven Stage Quality Gate Framework */}
      <section id="seven-stage-gate" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/20">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Inspection Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-bold text-white tracking-tight">
            The 7-Stage Quality Gate Framework
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A zero-compromise sequence from raw yarn receipt to carton sealing. No garment moves to the next phase without passing its preceding quality gate.
          </p>
        </div>

        {/* 7-Gate Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEVEN_GATES.map((gate, idx) => (
            <div
              key={gate.step}
              className={`p-6 sm:p-8 rounded-3xl bg-[#0A1422] border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 space-y-4 hover:shadow-xl hover:shadow-cyan-950/50 ${
                idx === 6 ? "md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#0A1422] via-[#0E2036] to-[#0A1422] border-cyan-500/40" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-cyan-400">{gate.step}</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {gate.subtitle}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white font-space">
                {gate.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                {gate.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive AQL Calculator */}
      <AQLCalculator />

      {/* 4. Laboratory Accreditations & Compliance Vault */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Accredited Physical & Chemical Testing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-space font-bold text-white leading-tight">
              In-House Certified <span className="text-cyan-400">Testing Laboratories</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Our centralized testing laboratory in Dhaka is ISO/IEC 17025 accredited, performing over 45 chemical and physical tests according to ISO, AATCC, ASTM, and BS EN international standards.
            </p>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>Martindale Abrasion & Pilling Resistance (ISO 12945-2)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>Color Fastness to Washing, Rubbing & Perspiration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>Formaldehyde, Phthalate & Heavy Metal Chemical Screening</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { code: "ISO 17025", title: "General Lab Competence", body: "Accredited for chemical & physical textile testing" },
              { code: "OEKO-TEX", title: "Standard 100 Class I", body: "Certified free from harmful carcinogenic substances" },
              { code: "WRAP GOLD", title: "Social Compliance", body: "12 Principles of ethical manufacturing and fair wages" },
              { code: "BSCI GRADE A", title: "European Audit", body: "Top-tier social audit rating across partner factories" },
              { code: "SEDEX SMETA", title: "4-Pillar Audits", body: "Labor, Health, Safety, Environment & Business Ethics" },
              { code: "HOHENSTEIN", title: "Fit & UV Shield", body: "Certified UPF 50+ ultraviolet sun protection" },
            ].map((cert) => (
              <div key={cert.code} className="p-5 rounded-2xl bg-[#0A1422] border border-cyan-500/20 space-y-2">
                <div className="font-mono text-sm font-bold text-cyan-400">{cert.code}</div>
                <div className="text-xs font-bold text-white">{cert.title}</div>
                <p className="text-[11px] text-slate-400 leading-normal">{cert.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Precision Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20 bg-slate-950 text-slate-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-white text-sm">THREADWORKS BD — PRECISION QC DIRECTION</div>
            <p>ISO 17025 Quality Laboratory • Tejgaon I/A, Dhaka 1208 • qc-lab@threadworksbd.com</p>
          </div>

          <div className="flex items-center gap-4 text-cyan-400">
            <span>AQL 1.5 MAJOR / 2.5 MINOR ACCREDITED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
