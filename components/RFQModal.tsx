"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Shield, ArrowRight, Package, Calendar, Globe, Building2 } from "lucide-react";
import { playTactileClick } from "./SoundEffects";

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RFQModal({ isOpen, onClose }: RFQModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    brandName: "",
    contactEmail: "",
    country: "United States",
    garmentType: "Knitwear & Heavy Jersey",
    quantity: "25,000 pcs",
    targetLeadTime: "30-45 Days",
    preferredConcept: "Quality Inspection & Compliance (AQL 1.5)",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick("switch");
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-white/15 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={() => {
            playTactileClick("soft");
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-serif">
                Inquiry & Swatch Docket Generated
              </h3>
              <p className="text-sm text-stone-300 max-w-md mx-auto">
                Thank you for connecting with <span className="text-amber-400 font-semibold">THREADWORKS BD</span>. Our Dhaka merchandising team and technical lab lead will dispatch fabric swatches and cost breakdowns within 24 hours.
              </p>
            </div>

            <div className="bg-stone-950/80 rounded-2xl p-4 max-w-md mx-auto text-left border border-white/10 text-xs font-mono space-y-1.5 text-stone-300">
              <div className="flex justify-between text-stone-400">
                <span>DOCKET ID:</span>
                <span className="text-cyan-400">#TW-BD-2026-8841</span>
              </div>
              <div className="flex justify-between">
                <span>CATEGORY:</span>
                <span className="text-white">{formData.garmentType}</span>
              </div>
              <div className="flex justify-between">
                <span>EST. QUANTITY:</span>
                <span className="text-white">{formData.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>QC PROTOCOL:</span>
                <span className="text-amber-400">AQL 1.5 Major / 2.5 Minor</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
            >
              Return to Concept Gallery
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <Package className="w-3.5 h-3.5" />
                Global Buyer Sample Docket & Quotation
              </div>
              <h2 className="text-2xl font-bold text-white font-serif">
                Request Sourcing Docket & Digital Tech-Pack
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                Connect directly with our Dhaka central merchandising hub for factory allocations, fabric lab dips, and FOB pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Apparel Brand / Retailer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nordic Apparel Lab, UK"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Buyer Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sourcing@yourbrand.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Target Garment Category
                  </label>
                  <select
                    value={formData.garmentType}
                    onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                    className="w-full bg-stone-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Knitwear & Heavy Jersey (Hoodies, Tees)</option>
                    <option>Woven Shirting & Flannels</option>
                    <option>Denim & Indigo Washes (Laser distressed)</option>
                    <option>Outerwear & Padded Tech Jackets</option>
                    <option>Activewear & Recycled Poly Blends</option>
                    <option>Sustainable Organic & GOTS Cotton Line</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Estimated Production Volume (MOQ 1,500 pcs)
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-stone-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>1,500 – 5,000 pcs (Capsule Test)</option>
                    <option>5,000 – 25,000 pcs (Seasonal Drop)</option>
                    <option>25,000 – 100,000 pcs (Mainline Volume)</option>
                    <option>100,000+ pcs (Enterprise Program)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Design Direction Interested In
                </label>
                <select
                  value={formData.preferredConcept}
                  onChange={(e) => setFormData({ ...formData, preferredConcept: e.target.value })}
                  className="w-full bg-stone-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option>1. Heritage & Craftsmanship (Artisanal Weaves & Master Tailoring)</option>
                  <option>2. Precision & Quality Control (AQL 1.5 In-House Lab Testing)</option>
                  <option>3. Momentum & Speed-to-Market (21-Day Fast-Track Delivery)</option>
                  <option>4. Sustainable & Ethical Sourcing (GOTS / LEED Platinum Certified)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Specific Requirements or Tech-Pack Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Requesting 300 GSM French Terry lab dips in Pantone 19-4052 TCX Classic Blue, GOTS certified organic yarn."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-stone-400">
                  <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>BSCI, WRAP & OEKO-TEX Standard 100 Compliant Hub</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-orange-950/60 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
