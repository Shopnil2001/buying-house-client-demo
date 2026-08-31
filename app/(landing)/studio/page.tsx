"use client";

import React, { useState } from "react";
import StudioCinematicReveal from "./components/StudioCinematicReveal";
import SmoothScrollProvider from "@/components/visualizer/SmoothScrollProvider";
import SpatialVisualizer from "@/components/visualizer/SpatialVisualizer";
import StudioHeroBanner from "./components/StudioHeroBanner";
import CinematicParallaxMarquee from "./components/CinematicParallaxMarquee";
import ScrollRevealSection from "./components/ScrollRevealSection";
import LuxurySilkClothBanner from "./components/LuxurySilkClothBanner";
import PinboardGallery from "./components/PinboardGallery";
import ProductCategoryShowcase from "./components/ProductCategoryShowcase";
import FactsFigures from "./components/FactsFigures";
import ESGBackgroundCottonCanvas from "./components/ESGBackgroundCottonCanvas";
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
  Sun,
  Feather
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
    <SmoothScrollProvider>
      <div className="bg-[#080E17] text-[#FAF7F2] min-h-screen relative selection:bg-[#C26747]/30 selection:text-amber-200 overflow-x-hidden">
        {/* 1. Bespoke After-Effects Level Cinematic Opening */}
        <StudioCinematicReveal key={revealKey} />

        {/* Floating Replay Intro Trigger */}
        <button
          onClick={handleReplayIntro}
          className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-[#121A28]/90 hover:bg-[#182335] border border-amber-500/30 text-amber-200 hover:text-white font-mono text-[11px] backdrop-blur-md shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          title="Replay Studio Intro FX"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Intro FX</span>
        </button>

        {/* SECTION 1: HERO BANNER (With Cinematic Parallax Macro Silk & Fluid Waves) */}
        <div className="relative z-10">
          <StudioHeroBanner />
        </div>

        {/* SECTION 2: 3D SPATIAL VISUALIZER HERO MOMENT (R3F + GSAP Pinned Scroll Choreography) */}
        <SpatialVisualizer />

        {/* DUAL-AXIS SCROLL-DRIVEN PARALLAX MARQUEE */}
        <CinematicParallaxMarquee />

        {/* SECTION 3: ABOUT US */}
        <section id="about-us" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <ScrollRevealSection direction="3d-tilt">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#142030]/90 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Corporate Heritage & Manufacturing Presence</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF7F2] tracking-tight leading-tight">
                  A Complete <span className="italic text-[#E0B27A]">Vertical Ecosystem</span> From Fiber to Retail Hanger
                </h2>

                <p className="text-[#D6CFC7] leading-relaxed text-sm sm:text-base font-sans">
                  With major industrial manufacturing campuses strategically situated in <strong>Gazipur</strong> and the <strong>Dhaka industrial corridor</strong>, our operations combine four decades of engineering expertise with Bangladesh's strategic duty-free export advantages.
                </p>

                <p className="text-[#A59E95] leading-relaxed text-sm font-sans">
                  We manage the entire textile lifecycle under one roof: in-house yarn spinning, circular & seamless knitting, computerized laser denim processing, automated cutting, eco-dyeing with Zero Liquid Discharge (ZLD), and statistical AQL 1.5 quality audits.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1">
                    <span className="text-xl font-serif font-bold text-[#E0B27A]">Gazipur Hub</span>
                    <p className="text-[#A59E95] font-sans">Specialized multi-gauge knitting & laser finishing park</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1">
                    <span className="text-xl font-serif font-bold text-[#78A882]">Dhaka Central</span>
                    <p className="text-[#A59E95] font-sans">Merchandising, 3D CAD design & ISO 17025 testing labs</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 bg-[#0E1624]/90 backdrop-blur-md shadow-2xl">
                  <h3 className="text-xl font-serif font-bold text-white">
                    Our Sourcing Advantage
                  </h3>

                  <div className="space-y-3 text-xs font-sans">
                    {[
                      "Duty-Free Market Access to EU (EBA), UK (DCTS), Canada & Japan",
                      "Consolidated Shipping Containers Direct from Chittagong Seaport",
                      "Dedicated 3D Virtual Tech-Pack Sampling in Under 48 Hours",
                      "Audited Living Wage & 100% Social Compliance Transparency",
                      "ZDHC Level 3 Certified Low-Impact Chemistry Dyeing"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-[#EFEBE4]">
                        <Check className="w-4 h-4 text-[#E0B27A] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </section>

        {/* SECTION 4: OUR FEATURES */}
        <section id="our-features" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <ScrollRevealSection direction="3d-tilt">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D6CFC7] text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-[#E0B27A]" />
                <span>Competitive Core Competencies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF7F2] tracking-tight">
                Six Pillars of Manufacturing Excellence
              </h2>
              <p className="text-sm sm:text-base text-[#D6CFC7]">
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
                  className="p-6 sm:p-8 rounded-3xl bg-[#0E1624]/90 border border-white/10 hover:border-[#E0B27A]/40 transition-all duration-300 space-y-4 shadow-lg hover:shadow-2xl backdrop-blur-md hover:scale-[1.02]"
                >
                  <span className="font-serif text-2xl font-bold text-[#E0B27A]">{feat.num}</span>
                  <h3 className="text-lg font-serif font-bold text-white">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A59E95] leading-relaxed font-sans">{feat.desc}</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </section>

        {/* SECTION 5: KEY FACTS & FIGURES */}
        <div className="relative z-10">
          <ScrollRevealSection direction="3d-tilt">
            <FactsFigures />
          </ScrollRevealSection>
        </div>

        {/* SECTION 6: OUR PRODUCTS */}
        <div className="relative z-10">
          <ScrollRevealSection direction="3d-tilt">
            <ProductCategoryShowcase />
          </ScrollRevealSection>
        </div>

        {/* SECTION 7: OUR PHILOSOPHY (LUXURY SILK CLOTH BANNER) */}
        <section id="our-philosophy" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 space-y-12">
          <ScrollRevealSection direction="3d-tilt">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#182335]/90 border border-amber-500/30 text-amber-200 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
                <Leaf className="w-3.5 h-3.5 text-[#78A882]" />
                <span>Core Values & Operating Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF7F2] tracking-tight">
                Woven with Purpose & Transparency
              </h2>
              <p className="text-sm sm:text-base text-[#D6CFC7]">
                Interact with our liquid silk surface below to explore our three guiding pillars: People, Planet, and Prosperity.
              </p>
            </div>

            <LuxurySilkClothBanner />
          </ScrollRevealSection>
        </section>

        {/* SECTION 8: INSIGHTS (PINBOARD GALLERY WITH REAL HIGH-RES ASSETS) */}
        <div className="relative z-10">
          <ScrollRevealSection direction="3d-tilt">
            <PinboardGallery />
          </ScrollRevealSection>
        </div>

        {/* SECTION 9: TRUSTED CUSTOMERS / GLOBAL BRAND PARTNERS */}
        <section id="trusted-customers" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 bg-[#080E17]/80 border-t border-white/10 text-stone-100 backdrop-blur-sm">
          <ScrollRevealSection direction="3d-tilt">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D6CFC7] text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                  <Globe2 className="w-3.5 h-3.5 text-[#E0B27A]" />
                  <span>Global Client Portfolio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF7F2] tracking-tight">
                  Trusted by World-Leading Apparel Brands
                </h2>
                <p className="text-sm sm:text-base text-[#D6CFC7]">
                  Delivering high-volume seasonal programs and quick-turn capsules to top retailers across Europe, North America, and Asia.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {BRAND_PARTNERS.map((brand, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#0E1624]/90 border border-white/10 hover:border-[#E0B27A]/40 text-center space-y-2 transition-all hover:scale-105 shadow-md backdrop-blur-md"
                  >
                    <div className="text-xl font-serif font-bold tracking-wider text-white uppercase">
                      {brand.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#E0B27A]">
                      {brand.tag}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center text-xs font-mono text-[#A59E95] max-w-2xl mx-auto backdrop-blur-md">
                ✓ 100% Social Audited • BSCI Grade A • WRAP Gold • Sedex SMETA • FairWear Verified
              </div>
            </div>
          </ScrollRevealSection>
        </section>

        {/* SECTION 10: SUSTAINABILITY & ESG (With Generative Floating Cotton Physics Canvas Background) */}
        <section id="sustainability" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 overflow-hidden rounded-3xl my-8 bg-[#09140D]/90 backdrop-blur-md shadow-2xl">
          {/* Generative Floating Cotton Background Animation */}
          <ESGBackgroundCottonCanvas />

          <ScrollRevealSection direction="3d-tilt" className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16241B]/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>ESG Leadership & Green Mills</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF7F2] tracking-tight leading-tight">
                  Benchmarking <span className="italic text-[#78A882]">LEED Platinum</span> Manufacturing in South Asia
                </h2>

                <p className="text-[#D6CFC7] text-sm sm:text-base leading-relaxed font-sans">
                  Our Gazipur and Dhaka facilities adhere to the highest global standards set by the US Green Building Council (USGBC), incorporating rainwater harvesting, daylight harvesting skylights, and geothermal cooling systems.
                </p>

                <div className="space-y-3 font-mono text-xs text-[#EFEBE4]">
                  <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <Droplets className="w-4 h-4 text-[#A8C2DC]" />
                    <span>Zero Liquid Discharge (ZLD) with 95.8% biological water recovery</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <Sun className="w-4 h-4 text-[#E0B27A]" />
                    <span>15.8 MW rooftop solar generating 40%+ of plant power needs</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#78A882]" />
                    <span>Higg Index FEM Verified & ZDHC MRSL Conformance Level 3</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#0D1D13]/90 border border-emerald-500/30 space-y-2 backdrop-blur-md shadow-xl">
                  <span className="text-xs font-mono text-[#78A882] font-bold uppercase">Water Saved</span>
                  <div className="text-3xl font-serif font-bold text-white">95.8%</div>
                  <p className="text-xs text-[#A59E95]">Recycled process water</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D1D13]/90 border border-emerald-500/30 space-y-2 backdrop-blur-md shadow-xl">
                  <span className="text-xs font-mono text-[#E0B27A] font-bold uppercase">Solar Microgrid</span>
                  <div className="text-3xl font-serif font-bold text-white">15.8 MW</div>
                  <p className="text-xs text-[#A59E95]">Clean power generated</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D1D13]/90 border border-emerald-500/30 space-y-2 backdrop-blur-md shadow-xl">
                  <span className="text-xs font-mono text-[#A8C2DC] font-bold uppercase">GHG Reduction</span>
                  <div className="text-3xl font-serif font-bold text-white">-42.8%</div>
                  <p className="text-xs text-[#A59E95]">Scope 1 & 2 carbon cut</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D1D13]/90 border border-emerald-500/30 space-y-2 backdrop-blur-md shadow-xl">
                  <span className="text-xs font-mono text-[#78A882] font-bold uppercase">Certification</span>
                  <div className="text-2xl font-serif font-bold text-white">GOTS 7.0</div>
                  <p className="text-xs text-[#A59E95]">100% Organic cotton</p>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </section>

        {/* SECTION 11: CONTACT US / INQUIRY */}
        <section id="contact-us" className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 bg-[#080E17]/80 border-t border-white/10 text-stone-100 backdrop-blur-sm">
          <ScrollRevealSection direction="3d-tilt">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142030]/90 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Merchandising & Sourcing Desk</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF7F2] tracking-tight">
                  Connect with Our Engineering Hub
                </h2>
                <p className="text-sm sm:text-base text-[#D6CFC7]">
                  Schedule a factory tour at our Gazipur campus, request 3D digital CLO sample files, or request physical fabric swatches.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 bg-[#0E1624]/90 backdrop-blur-md shadow-2xl">
                    <div className="space-y-1">
                      <h3 className="text-xl font-serif font-bold text-white">
                        Bangladesh Headquarters & Mill
                      </h3>
                      <p className="text-xs text-[#A59E95] font-mono">
                        Threadworks Studio Manufacturing Operations
                      </p>
                    </div>

                    <div className="space-y-4 text-xs font-mono text-[#D6CFC7]">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#E0B27A] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-sans">Manufacturing Facility:</strong>
                          <span>Soydana, Gazipur Sadar, Gazipur 1704, Bangladesh</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Building2 className="w-4 h-4 text-[#E0B27A] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-sans">Corporate & Merchandising Office:</strong>
                          <span>Gulshan-2 Diplomatic Avenue, Dhaka 1212, Bangladesh</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#E0B27A] flex-shrink-0" />
                        <span>+880 2 988 4120 • +880 1711 000 000</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#E0B27A] flex-shrink-0" />
                        <span className="text-[#E0B27A]">sourcing@threadworksbd.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0E1624]/90 backdrop-blur-md shadow-2xl">
                  {contactSubmitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#78A882] flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">
                        Inquiry Docket Logged
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D6CFC7] max-w-md mx-auto font-sans">
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
                          <label className="block text-xs font-mono text-[#D6CFC7] mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Marcus Lindqvist"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0B27A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#D6CFC7] mb-1">Apparel Brand / Company *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Nordic Activewear Ltd"
                            value={contactForm.brand}
                            onChange={(e) => setContactForm({ ...contactForm, brand: e.target.value })}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0B27A]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-[#D6CFC7] mb-1">Official Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="sourcing@yourbrand.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0B27A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#D6CFC7] mb-1">Product Vertical of Interest</label>
                          <select
                            value={contactForm.category}
                            onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                            className="w-full bg-[#080E17] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0B27A]"
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
                        <label className="block text-xs font-mono text-[#D6CFC7] mb-1">Tech-Pack Details / Inquiry Notes</label>
                        <textarea
                          rows={3}
                          placeholder="e.g., Requesting quotation and prototype timeline for 50,000 pairs 168N merino wool hiking socks with seamless toe closure."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E0B27A]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-[#C26747] hover:bg-[#B55C3E] text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-orange-950/40 hover:scale-[1.01] active:scale-95 transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>Dispatch Inquiry to Threadworks Studio Desk</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#060A12]/95 text-[#A59E95] text-xs font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-serif font-bold text-white text-sm">THREADWORKS STUDIO — ENTERPRISE APPAREL ATELIER</div>
              <p>Gazipur Manufacturing Campus • Dhaka Central Corporate Hub • ISO 9001 / 14001 / 45001 / 17025 Accredited</p>
            </div>

            <div className="flex items-center gap-4 text-[#E0B27A]">
              <span>LEED PLATINUM • GOTS • OEKO-TEX 100 • HIGG FEM</span>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
