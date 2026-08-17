"use client";

import React, { useState } from "react";
import StudioCinematicReveal from "./components/StudioCinematicReveal";
import LuxurySilkClothBanner from "./components/LuxurySilkClothBanner";
import PinboardGallery from "./components/PinboardGallery";
import ProductCategoryShowcase from "./components/ProductCategoryShowcase";
import FactsFigures from "./components/FactsFigures";
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Leaf, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  Phone, 
  Mail, 
  MapPin, 
  RotateCcw,
  Check,
  Send,
  Droplets,
  Sun
} from "lucide-react";
import { playTactileClick } from "@/components/SoundEffects";

const BRAND_PARTNERS = [
  { name: "NIKE", tag: "Athletic & Performance Socks" },
  { name: "ADIDAS", tag: "Seamless Activewear Program" },
  { name: "TARGET", tag: "Core Apparel & Hosiery Line" },
  { name: "PUMA", tag: "Compression & Sports Knits" },
  { name: "H&M", tag: "Organic Cotton Essentials" },
  { name: "UNIQLO", tag: "Functional Thermal Basics" },
  { name: "LEVI'S", tag: "Eco-Laser Washed Denim" },
  { name: "DECATHLON", tag: "Technical Sports Fleece" },
];

export default function StudioLandingPage() {
  const [revealKey, setRevealKey] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    brand: "",
    email: "",
    category: "Hosiery & Performance Socks",
    message: "",
  });

  const handleReplayIntro = () => {
    playTactileClick("switch");
    setRevealKey((prev) => prev + 1);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick("switch");
    setContactSubmitted(true);
  };

  return (
    <div className="bg-[#050912] text-stone-100 min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Bespoke After-Effects Level Cinematic Intro Reveal */}
      <StudioCinematicReveal key={revealKey} />

      {/* Floating Replay Intro Trigger */}
      <button
        onClick={handleReplayIntro}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-stone-950/90 hover:bg-stone-900 border border-cyan-500/40 text-cyan-300 hover:text-white font-mono text-[11px] backdrop-blur-md shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        title="Replay Studio Intro FX"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Replay Intro FX</span>
      </button>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#060B16] via-[#050912] to-[#060B16]">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-600/15 via-teal-500/10 to-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Threadworks Studio • Sourcing & Manufacturing Powerhouse</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight font-sans text-white leading-[1.03]">
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400">Global Scale</span> & Precision
            </h1>
            <p className="max-w-3xl mx-auto text-stone-300 text-sm sm:text-base md:text-xl font-light leading-relaxed">
              From automated spinning to world-class hosiery, seamless activewear, laser-washed denim, and circular knitwear. Delivering over 150 million finished garments annually across 40+ export destinations.
            </p>
          </div>

          {/* Micro Telemetry Bar */}
          <div className="glass-panel max-w-2xl mx-auto rounded-2xl p-4 flex flex-wrap items-center justify-around gap-4 text-xs font-mono border border-cyan-500/30 shadow-2xl bg-[#09111E]/90">
            <div className="text-center">
              <span className="text-stone-400 block text-[10px] uppercase">Annual Volume</span>
              <strong className="text-cyan-400 text-sm font-bold">150M+ Finished Units</strong>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
            <div className="text-center">
              <span className="text-stone-400 block text-[10px] uppercase">Compliance</span>
              <strong className="text-emerald-400 text-sm font-bold">5 LEED Platinum Facilities</strong>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
            <div className="text-center">
              <span className="text-stone-400 block text-[10px] uppercase">Speed-to-Market</span>
              <strong className="text-amber-400 text-sm font-bold">21–30 Days Lead Time</strong>
            </div>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#our-products"
              onClick={() => playTactileClick("switch")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-2xl shadow-cyan-950/70 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Product Verticals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#insights-pinboard"
              onClick={() => playTactileClick("soft")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>View R&D Pinboard Gallery</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT US */}
      <section id="about-us" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate Heritage & Manufacturing Presence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight leading-tight">
              A Complete <span className="text-cyan-400">Vertical Ecosystem</span> From Fiber to Retail Hanger
            </h2>

            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              With major industrial manufacturing campuses strategically situated in <strong>Gazipur</strong> and the <strong>Dhaka industrial corridor</strong>, our operations combine four decades of engineering expertise with Bangladesh's strategic duty-free export advantages.
            </p>

            <p className="text-stone-400 leading-relaxed text-sm">
              We manage the entire textile lifecycle under one roof: in-house yarn spinning, circular & seamless knitting, computerized laser denim processing, automated cutting, eco-dyeing with Zero Liquid Discharge (ZLD), and statistical AQL 1.5 quality audits.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xl font-bold text-cyan-400">Gazipur Hub</span>
                <p className="text-stone-400">Specialized multi-gauge knitting & laser finishing park</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xl font-bold text-emerald-400">Dhaka Central</span>
                <p className="text-stone-400">Merchandising, 3D CAD design & ISO 17025 testing labs</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 space-y-6 bg-[#0B1320]">
              <h3 className="text-xl font-bold text-white uppercase font-sans">
                Our Sourcing Advantage
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {[
                  "Duty-Free Market Access to EU (EBA), UK (DCTS), Canada & Japan",
                  "Consolidated Shipping Containers Direct from Chittagong Seaport",
                  "Dedicated 3D Virtual Tech-Pack Sampling in Under 48 Hours",
                  "Audited Living Wage & 100% Social Compliance Transparency",
                  "ZDHC Level 3 Certified Low-Impact Chemistry Dyeing"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 text-stone-200">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR FEATURES */}
      <section id="our-features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Competitive Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
            Six Pillars of Manufacturing Excellence
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Engineered to deliver exceptional product quality, rapid lead times, and verified ESG compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "End-to-End Vertical Integration",
              desc: "From spinning raw cotton bales to knitting, dyeing, finishing, and carton packaging—preventing supply chain bottlenecks.",
            },
            {
              num: "02",
              title: "3D CLO Digital Twin Prototyping",
              desc: "Virtual pattern simulation reduces sample iterations from weeks to 48 hours with zero physical fabric waste.",
            },
            {
              num: "03",
              title: "ISO 17025 In-House Testing Labs",
              desc: "Over 45 physical and chemical tests (Martindale, color fastness, bursting strength, delta-E) accredited to ASTM/AATCC.",
            },
            {
              num: "04",
              title: "Waterless Ozone & Laser Finishing",
              desc: "Jeanologia laser scrapers and G2 ozone machines eliminate toxic potassium permanganate and drastically cut water usage.",
            },
            {
              num: "05",
              title: "Zero Liquid Discharge (ZLD) Dyeing",
              desc: "Membrane bioreactors (MBR) and reverse osmosis recycle 95% of dyeing effluent directly back into processing vats.",
            },
            {
              num: "06",
              title: "Fast-Track 21-Day Execution",
              desc: "Pre-reserved greige yarn and dedicated quick-response lines allow 21-day turnaround for high-velocity trend drops.",
            },
          ].map((feat) => (
            <div
              key={feat.num}
              className="p-6 sm:p-8 rounded-3xl bg-[#0C1524] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 space-y-4 hover:shadow-xl hover:shadow-cyan-950/40"
            >
              <span className="font-mono text-2xl font-black text-cyan-400">{feat.num}</span>
              <h3 className="text-lg font-bold text-white font-sans">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: KEY FACTS & FIGURES */}
      <FactsFigures />

      {/* SECTION 5: OUR PRODUCTS */}
      <ProductCategoryShowcase />

      {/* SECTION 6: OUR PHILOSOPHY (LUXURY SILK CLOTH BANNER REVEAL) */}
      <section id="our-philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Core Values & Operating Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
            Woven with Purpose & Transparency
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Interact with our liquid silk surface below to explore our three guiding pillars: People, Planet, and Prosperity.
          </p>
        </div>

        {/* Liquid Silk Banner Simulation Component */}
        <LuxurySilkClothBanner />
      </section>

      {/* SECTION 7: INSIGHTS (PINBOARD GALLERY) */}
      <PinboardGallery />

      {/* SECTION 8: TRUSTED CUSTOMERS / GLOBAL BRAND PARTNERS */}
      <section id="trusted-customers" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070C15] border-t border-white/10 text-stone-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Global Client Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
              Trusted by World-Leading Apparel Brands
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              Delivering high-volume seasonal programs and quick-turn capsules to top retailers across Europe, North America, and Asia.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRAND_PARTNERS.map((brand, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0C1524] border border-white/10 hover:border-cyan-500/40 text-center space-y-2 transition-all hover:scale-105"
              >
                <div className="text-2xl font-black tracking-widest text-white uppercase font-space">
                  {brand.name}
                </div>
                <div className="text-[11px] font-mono text-cyan-400">
                  {brand.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center text-xs font-mono text-stone-400 max-w-2xl mx-auto">
            ✓ 100% Social Audited • BSCI Grade A • WRAP Gold • Sedex SMETA • FairWear Verified
          </div>
        </div>
      </section>

      {/* SECTION 9: SUSTAINABILITY & ESG */}
      <section id="sustainability" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>ESG Leadership & Green Mills</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight leading-tight">
              Benchmarking <span className="text-emerald-400">LEED Platinum</span> Manufacturing in South Asia
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Our Gazipur and Dhaka facilities adhere to the highest global standards set by the US Green Building Council (USGBC), incorporating rainwater harvesting, daylight harvesting skylights, and geothermal cooling systems.
            </p>

            <div className="space-y-3 font-mono text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Zero Liquid Discharge (ZLD) with 95.8% biological water recovery</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>15.8 MW rooftop solar generating 40%+ of plant power needs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Higg Index FEM Verified & ZDHC MRSL Conformance Level 3</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#09180E] border border-emerald-500/20 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Water Saved</span>
              <div className="text-3xl font-black text-white font-space">95.8%</div>
              <p className="text-xs text-stone-400">Recycled process water</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#09180E] border border-emerald-500/20 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Solar Microgrid</span>
              <div className="text-3xl font-black text-white font-space">15.8 MW</div>
              <p className="text-xs text-stone-400">Clean power generated</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#09180E] border border-emerald-500/20 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">GHG Reduction</span>
              <div className="text-3xl font-black text-white font-space">-42.8%</div>
              <p className="text-xs text-stone-400">Scope 1 & 2 carbon cut</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#09180E] border border-emerald-500/20 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Certification</span>
              <div className="text-2xl font-black text-white font-space">GOTS 7.0</div>
              <p className="text-xs text-stone-400">100% Organic cotton</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: CONTACT US / INQUIRY */}
      <section id="contact-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070D18] border-t border-white/10 text-stone-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Merchandising & Sourcing Desk</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight">
              Connect with Our Engineering Hub
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              Schedule a factory tour at our Gazipur campus, request 3D digital CLO sample files, or request physical fabric swatches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 bg-[#0A1424]">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white font-sans">
                    Bangladesh Headquarters & Mill
                  </h3>
                  <p className="text-xs text-stone-400 font-mono">
                    Threadworks Studio Manufacturing Operations
                  </p>
                </div>

                <div className="space-y-4 text-xs font-mono text-stone-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Manufacturing Facility:</strong>
                      <span>Soydana, Gazipur Sadar, Gazipur 1704, Bangladesh</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Corporate & Merchandising Office:</strong>
                      <span>Gulshan-2 Diplomatic Avenue, Dhaka 1212, Bangladesh</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>+880 2 988 4120 • +880 1711 000 000</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-cyan-300">sourcing@threadworksbd.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#0C1628]">
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    Inquiry Docket Logged
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
                    Thank you, {contactForm.name}. Our Dhaka senior merchandising director and technical lab lead will connect with {contactForm.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-stone-300 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marcus Lindqvist"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-stone-300 mb-1">Apparel Brand / Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nordic Activewear Ltd"
                        value={contactForm.brand}
                        onChange={(e) => setContactForm({ ...contactForm, brand: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-stone-300 mb-1">Official Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="sourcing@yourbrand.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-stone-300 mb-1">Product Vertical of Interest</label>
                      <select
                        value={contactForm.category}
                        onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                        className="w-full bg-black/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option>Hosiery & Performance Socks</option>
                        <option>Seamless Engineered Activewear</option>
                        <option>Eco-Laser Denim & Bottoms</option>
                        <option>Knitwear & Heavy French Terry</option>
                        <option>Integrated Spinning & Blended Yarns</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">Tech-Pack Details / Inquiry Notes</label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Requesting quotation and prototype timeline for 50,000 pairs 168N merino wool hiking socks with seamless toe closure."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/70 hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Inquiry to Threadworks Studio Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/90 text-stone-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-white text-sm">THREADWORKS STUDIO — ENTERPRISE APPAREL ATELIER</div>
            <p>Gazipur Manufacturing Campus • Dhaka Central Corporate Hub • ISO 9001 / 14001 / 45001 / 17025 Accredited</p>
          </div>

          <div className="flex items-center gap-4 text-cyan-400">
            <span>LEED PLATINUM • GOTS • OEKO-TEX 100 • HIGG FEM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
