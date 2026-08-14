"use client";

import React, { useState } from "react";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import RFQModal from "@/components/RFQModal";
import ConceptSwitcherModal from "@/components/ConceptSwitcherModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [conceptSwitcherOpen, setConceptSwitcherOpen] = useState(false);

  return (
    <html lang="en" className="scroll-smooth bg-stone-950 text-stone-100 antialiased">
      <head>
        <title>THREADWORKS BD — Premier Bangladesh Textile & Apparel Buying House</title>
        <meta 
          name="description" 
          content="Pitch & Concept Gallery for Bangladesh's premier textile buying house. Explore 4 distinct creative directions: Heritage, Precision QC, Fast-Track Momentum, and Sustainable Sourcing." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
        <GlobalNav
          onOpenRFQ={() => setRfqOpen(true)}
          onOpenConceptSwitcher={() => setConceptSwitcherOpen(true)}
        />
        
        {/* Main Content with top padding to clear fixed persistent header */}
        <main className="flex-1 pt-[88px]">
          {children}
        </main>

        {/* Global Modals */}
        <RFQModal
          isOpen={rfqOpen}
          onClose={() => setRfqOpen(false)}
        />

        <ConceptSwitcherModal
          isOpen={conceptSwitcherOpen}
          onClose={() => setConceptSwitcherOpen(false)}
        />
      </body>
    </html>
  );
}
