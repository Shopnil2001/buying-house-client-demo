"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-in fade-in duration-500 min-h-screen">
      {children}
    </div>
  );
}
