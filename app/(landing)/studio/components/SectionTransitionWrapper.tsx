"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: "curtain" | "zoom-depth" | "slide-split" | "silk-reveal";
  accentColor?: string;
}

export default function SectionTransitionWrapper({
  children,
  id,
  className = "",
  variant = "zoom-depth",
  accentColor = "#E0B27A",
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<HTMLDivElement>(null!);
  const curtainRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;
    const curtain = curtainRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      if (variant === "zoom-depth") {
        // Dramatic 3D depth zoom transition on enter and exit
        gsap.fromTo(
          content,
          {
            scale: 0.9,
            opacity: 0.15,
            y: 80,
            filter: "blur(8px)",
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 30%",
              scrub: 0.8,
            },
          }
        );

        // Scale down & blur slightly as it leaves viewport
        gsap.to(content, {
          scale: 0.94,
          opacity: 0.4,
          y: -40,
          filter: "blur(4px)",
          ease: "power1.in",
          scrollTrigger: {
            trigger: section,
            start: "bottom 60%",
            end: "bottom 10%",
            scrub: 0.8,
          },
        });
      } else if (variant === "curtain" && curtain) {
        // Silky wipe transition
        gsap.fromTo(
          curtain,
          { scaleY: 1 },
          {
            scaleY: 0,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      } else if (variant === "silk-reveal") {
        // Curved silk unveil
        gsap.fromTo(
          content,
          {
            clipPath: "polygon(0 15%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 0.2,
            y: 60,
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 35%",
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [variant]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full overflow-hidden transition-colors duration-500 ${className}`}
    >
      {/* Decorative Silk Seam Separator at top */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E0B27A]/30 to-transparent z-20 pointer-events-none" />

      {/* Curtain Layer for Curtain variant */}
      {variant === "curtain" && (
        <div
          ref={curtainRef}
          className="absolute inset-0 z-30 bg-[#0A121E] origin-top pointer-events-none border-b border-amber-500/30"
        />
      )}

      {/* Main Section Content Wrapper with 3D Depth Transforms */}
      <div ref={contentRef} className="relative z-10 will-change-transform">
        {children}
      </div>
    </section>
  );
}
