"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Send, 
  Compass, 
  Layers, 
  Building2, 
  Zap, 
  TrendingUp, 
  SlidersHorizontal, 
  Leaf, 
  Camera, 
  Mail, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { playTactileClick, toggleSound, getSoundState } from "./SoundEffects";

interface GlobalNavProps {
  onOpenRFQ: () => void;
}

const SECTION_LINKS = [
  { name: "3D Spatial", href: "#spline-3d-visualizer", icon: Compass },
  { name: "Ecosystem", href: "#about-us", icon: Building2 },
  { name: "Six Pillars", href: "#our-features", icon: Zap },
  { name: "Key Facts", href: "#key-facts", icon: TrendingUp },
  { name: "Products", href: "#our-products", icon: SlidersHorizontal },
  { name: "Philosophy", href: "#our-philosophy", icon: Leaf },
  { name: "Insights", href: "#insights", icon: Camera },
  { name: "ESG & Green Mills", href: "#sustainability", icon: ShieldCheck },
  { name: "Inquire Desk", href: "#contact-us", icon: Mail },
];

export default function GlobalNav({ onOpenRFQ }: GlobalNavProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setSoundEnabled(getSoundState());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple Scrollspy
      const scrollPos = window.scrollY + 200;
      for (let i = SECTION_LINKS.length - 1; i >= 0; i--) {
        const id = SECTION_LINKS[i].href.replace("#", "");
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTION_LINKS[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundEnabled(newState);
    if (newState) playTactileClick("switch");
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playTactileClick("soft");
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Editorial Telemetry Strip */}
      <div className="bg-[#060A12]/95 backdrop-blur-md text-[#A59E95] text-[11px] py-1 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between font-mono">
        <div className="flex items-center gap-3 truncate">
          <span className="inline-flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0B27A] animate-ping" />
            THREADWORKS ATELIER
          </span>
          <span className="hidden md:inline text-[#78A882]">
            • 5 LEED PLATINUM GREEN MILLS
          </span>
          <span className="hidden lg:inline text-[#D6CFC7]">
            • 150M+ ANNUAL FINISHED UNITS
          </span>
          <span className="hidden sm:inline text-[#E0B27A]">
            • 48-HR 3D VIRTUAL SAMPLING
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[10px] text-[#A59E95] hidden sm:block">
            ISO 17025 • GOTS 7.0 • OEKO-TEX
          </div>

          <div className="h-3 w-[1px] bg-white/20 hidden sm:block" />

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-1.5 text-[#D6CFC7] hover:text-white transition-colors"
            title={soundEnabled ? "Mute interactive sound feedback" : "Enable interactive sound feedback"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#E0B27A]" />
                <span className="text-[10px] font-mono">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#A59E95]" />
                <span className="text-[10px] font-mono">Sound OFF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={`px-4 sm:px-8 transition-all duration-300 ${
          scrolled
            ? "bg-[#080E17]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3"
            : "bg-[#080E17]/70 backdrop-blur-md border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => {
              playTactileClick("soft");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C26747] via-[#913E24] to-[#142030] flex items-center justify-center shadow-lg shadow-orange-950/50 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif font-black text-[#FAF7F2] text-xl tracking-tighter">TW</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-serif font-bold tracking-tight text-lg group-hover:text-[#E0B27A] transition-colors">
                  THREADWORKS
                </span>
                <span className="text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#182335] text-[#E0B27A] border border-amber-500/30 font-mono">
                  STUDIO
                </span>
              </div>
              <p className="text-[10px] text-[#A59E95] tracking-wider uppercase font-mono">
                Gazipur • Dhaka • Chittagong
              </p>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden xl:flex items-center p-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-xl shadow-inner">
            {SECTION_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#C26747] via-[#D48259] to-[#C26747] text-white font-bold shadow-md shadow-orange-950/60"
                      : "text-[#D6CFC7] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Action Desk CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playTactileClick("soft");
                onOpenRFQ();
              }}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C26747] via-[#D48259] to-[#C26747] hover:from-[#B55C3E] hover:to-[#B55C3E] text-white text-xs font-semibold uppercase tracking-wider shadow-xl shadow-orange-950/60 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Inquire Tech-Pack</span>
              <span className="sm:hidden">RFQ</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle section navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Section Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-white/10 space-y-1.5 bg-[#0A121E]/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-white/10">
            <p className="text-[11px] font-mono uppercase text-[#A59E95] tracking-wider mb-2">
              Explore Threadworks Studio Sections:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SECTION_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isActive
                        ? "bg-[#C26747] text-white border-transparent shadow-lg font-bold"
                        : "bg-black/40 border-white/10 text-[#D6CFC7] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#E0B27A]" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRFQ();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C26747] via-[#D48259] to-[#C26747] text-white text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xl shadow-orange-950/60"
              >
                <Send className="w-4 h-4" />
                <span>Launch RFQ & Swatch Docket</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
