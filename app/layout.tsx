"use client";

import React, { useState } from "react";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import RFQModal from "@/components/RFQModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rfqOpen, setRfqOpen] = useState(false);

  return (
    <html lang="en" className="scroll-smooth bg-[#080E17] text-[#FAF7F2] antialiased">
      <head>
        <title>THREADWORKS STUDIO — Premier Bangladesh Luxury Textile & Apparel Atelier</title>
        <meta 
          name="description" 
          content="Enterprise apparel manufacturing and sourcing powerhouse in Bangladesh. 5 LEED Platinum green facilities, 150M+ annual garment capacity, 3D CLO digital sampling, and direct container shipping from Chittagong." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-[#080E17] text-[#FAF7F2] flex flex-col font-sans selection:bg-[#C26747]/30 selection:text-amber-200">
        <GlobalNav onOpenRFQ={() => setRfqOpen(true)} />
        
        {/* Main Content with top padding to clear fixed persistent header */}
        <main className="flex-1 pt-[88px]">
          {children}
        </main>

        {/* Global RFQ & Sampling Modal */}
        <RFQModal
          isOpen={rfqOpen}
          onClose={() => setRfqOpen(false)}
        />
      </body>
    </html>
  );
}
