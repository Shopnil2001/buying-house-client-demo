"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Layers, 
  Send, 
  ShieldCheck, 
  Zap, 
  Leaf, 
  Compass, 
  ChevronRight,
  Menu,
  X,
  Factory
} from "lucide-react";
import { playTactileClick, toggleSound, getSoundState } from "./SoundEffects";

interface GlobalNavProps {
  onOpenRFQ: () => void;
  onOpenConceptSwitcher: () => void;
}

export const CONCEPTS = [
  {
    id: "studio",
    title: "Threadworks Studio",
    short: "Studio Atelier",
    path: "/studio",
    tagline: "Integrated Manufacturing Powerhouse",
    color: "from-cyan-500 via-teal-500 to-blue-600",
    badgeBg: "bg-cyan-950/60 border-cyan-400/40 text-cyan-300",
    icon: Factory,
    accent: "#00E5C8",
  },
  {
    id: "sustainable",
    title: "Sustainable & ESG",
    short: "Sustainable",
    path: "/sustainable",
    tagline: "LEED Platinum Zero-Discharge Mills",
    color: "from-emerald-400 to-teal-600",
    badgeBg: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
    icon: Leaf,
    accent: "#2D5033",
  },
  {
    id: "heritage",
    title: "Heritage & Craft",
    short: "Heritage",
    path: "/heritage",
    tagline: "500-Year Bengal Weaving Legacy",
    color: "from-amber-600 to-red-600",
    badgeBg: "bg-amber-950/60 border-amber-600/40 text-amber-300",
    icon: Compass,
    accent: "#C45525",
  },
  {
    id: "precision",
    title: "Precision & QC",
    short: "Precision",
    path: "/precision",
    tagline: "AQL 1.5 Optical Inspection Rigor",
    color: "from-cyan-400 to-blue-500",
    badgeBg: "bg-cyan-950/60 border-cyan-400/40 text-cyan-300",
    icon: ShieldCheck,
    accent: "#00E5C8",
  },
  {
    id: "momentum",
    title: "Momentum & Velocity",
    short: "Momentum",
    path: "/momentum",
    tagline: "21-Day Fast-Track Supply Chain",
    color: "from-orange-500 to-amber-500",
    badgeBg: "bg-orange-950/60 border-orange-500/40 text-orange-300",
    icon: Zap,
    accent: "#FF6B2B",
  },
];

export default function GlobalNav({ onOpenRFQ, onOpenConceptSwitcher }: GlobalNavProps) {
  const pathname = usePathname();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundEnabled(getSoundState());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundEnabled(newState);
    if (newState) playTactileClick("switch");
  };

  const currentConcept = CONCEPTS.find((c) => pathname.startsWith(c.path)) || CONCEPTS[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro banner */}
      <div className="bg-black/90 backdrop-blur-md text-stone-300 text-[11px] py-1 px-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-4xl truncate">
          <span className="inline-flex items-center gap-1 font-semibold text-white tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            Client Pitch Demo:
          </span>
          <span className="hidden sm:inline text-stone-400">
            Compare creative directions & Threadworks Studio multi-section showcase.
          </span>
          <span className="font-mono text-cyan-300 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/40 text-[10px]">
            Active: {currentConcept.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConceptSwitcher}
            className="hidden md:flex items-center gap-1 text-white hover:text-cyan-300 transition-colors font-medium text-[11px]"
            title="View side-by-side comparison"
          >
            <Layers className="w-3 h-3" />
            Concept Matrix
          </button>
          
          <div className="h-3 w-[1px] bg-white/20 hidden md:block" />

          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors"
            title={soundEnabled ? "Mute interactive audio feedback" : "Enable interactive audio feedback"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3 h-3 text-emerald-400" />
                <span className="hidden lg:inline text-[10px]">FX Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-stone-500" />
                <span className="hidden lg:inline text-[10px]">FX Muted</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Persistent Global Navbar */}
      <nav 
        className={`px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled 
            ? "bg-stone-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3" 
            : "bg-stone-950/70 backdrop-blur-md border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Buying House Brand Logo */}
          <Link
            href="/studio"
            onClick={() => playTactileClick("soft")}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 via-teal-700 to-indigo-950 flex items-center justify-center shadow-lg shadow-black/40 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif font-black text-white text-lg tracking-tighter">TB</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold tracking-tight text-base group-hover:text-cyan-200 transition-colors">
                  THREADWORKS
                </span>
                <span className="text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-mono">
                  STUDIO
                </span>
              </div>
              <p className="text-[10px] text-stone-400 tracking-wider uppercase font-medium">
                Gazipur • Dhaka • Chittagong
              </p>
            </div>
          </Link>

          {/* Navigation Pills (Desktop) */}
          <div className="hidden lg:flex items-center p-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-inner">
            {CONCEPTS.map((concept, index) => {
              const isActive = pathname.startsWith(concept.path);
              const Icon = concept.icon;
              return (
                <Link
                  key={concept.id}
                  href={concept.path}
                  onClick={() => playTactileClick("switch")}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-stone-400 hover:text-stone-200 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <div 
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${concept.color} opacity-90 shadow-lg shadow-black/50`}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-stone-400"}`} />
                  <span>{concept.short}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                playTactileClick("soft");
                onOpenConceptSwitcher();
              }}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 hover:text-white text-xs font-medium transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>All 5 Pages</span>
            </button>

            <button
              onClick={() => {
                playTactileClick("soft");
                onOpenRFQ();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-950/50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Request RFQ & Swatches</span>
              <span className="sm:hidden">RFQ</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-stone-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 space-y-2 bg-stone-950/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border">
            <p className="text-[11px] font-mono uppercase text-stone-400 tracking-wider mb-2">
              Select Creative Direction / Page:
            </p>
            {CONCEPTS.map((concept, index) => {
              const isActive = pathname.startsWith(concept.path);
              const Icon = concept.icon;
              return (
                <Link
                  key={concept.id}
                  href={concept.path}
                  onClick={() => {
                    playTactileClick("switch");
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${concept.color} text-white border-transparent shadow-lg`
                      : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {concept.title}
                      </div>
                      <div className="text-[11px] opacity-80">{concept.tagline}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConceptSwitcher();
                }}
                className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-semibold text-center flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                Compare All 5 Concept Pages
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
