"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type TransitionType =
  | "hero-push-through"
  | "visualizer-horizontal-slide"
  | "book-page-turn"
  | "depth-pass-behind"
  | "vertical-blind-wipe"
  | "diagonal-shard-split"
  | "corkboard-tilt-drop"
  | "organic-color-bleed"
  | "magnetic-grid-expand"
  | "telemetry-settle-land";

interface ChoreographedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  type: TransitionType;
}

export default function ChoreographedSection({
  children,
  id,
  className = "",
  type,
}: ChoreographedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<HTMLDivElement>(null!);
  const fxLayerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const content = contentRef.current;
    const fx = fxLayerRef.current;
    if (!container || !content) return;

    const ctx = gsap.context(() => {
      switch (type) {
        // 1. HERO -> 3D VISUALIZER: Dramatic Camera Push-Through
        case "hero-push-through": {
          gsap.set(container, { perspective: 1200 });
          gsap.to(content, {
            scale: 0.65,
            opacity: 0,
            y: -160,
            rotateX: 16,
            filter: "blur(18px) brightness(1.5)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom 15%",
              scrub: 0.8,
            },
          });
          break;
        }

        // 2. 3D VISUALIZER -> ABOUT US: Bold Horizontal Curtain Slide with Laser Seam
        case "visualizer-horizontal-slide": {
          gsap.fromTo(
            content,
            {
              xPercent: -100,
              opacity: 0,
              filter: "blur(12px)",
              scale: 0.9,
            },
            {
              xPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 95%",
                end: "top 25%",
                scrub: 0.9,
              },
            }
          );
          if (fx) {
            gsap.fromTo(
              fx,
              { xPercent: -100, opacity: 1 },
              {
                xPercent: 100,
                opacity: 0,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 95%",
                  end: "top 25%",
                  scrub: 0.9,
                },
              }
            );
          }
          break;
        }

        // 3. ABOUT US -> SIX PILLARS: Dramatic 3D Book Page-Turn
        case "book-page-turn": {
          gsap.set(container, { perspective: 1800 });
          gsap.fromTo(
            content,
            {
              transformOrigin: "right center",
              rotateY: 65,
              opacity: 0,
              scale: 0.85,
              filter: "blur(10px)",
              boxShadow: "-40px 0 60px rgba(0,0,0,0.8)",
            },
            {
              rotateY: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 90%",
                end: "top 20%",
                scrub: 1.1,
              },
            }
          );
          break;
        }

        // 4. SIX PILLARS -> KEY FACTS: Multi-Plane Depth Pass-Behind
        case "depth-pass-behind": {
          gsap.set(container, { perspective: 1400 });
          gsap.fromTo(
            content,
            {
              scale: 0.8,
              y: 200,
              rotateX: -12,
              opacity: 0,
              filter: "blur(14px)",
            },
            {
              scale: 1,
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 90%",
                end: "top 25%",
                scrub: 0.9,
              },
            }
          );
          break;
        }

        // 5. KEY FACTS -> PRODUCT LINES: High-Contrast Venetian Blind Reveal
        case "vertical-blind-wipe": {
          gsap.fromTo(
            content,
            {
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
              scale: 0.92,
              opacity: 0.1,
              y: 80,
            },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
              scale: 1,
              opacity: 1,
              y: 0,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: container,
                start: "top 88%",
                end: "top 20%",
                scrub: 1,
              },
            }
          );
          break;
        }

        // 6. PRODUCT LINES -> CORE VALUES: Diagonal Shard Split Slicing
        case "diagonal-shard-split": {
          gsap.fromTo(
            content,
            {
              clipPath: "polygon(0 40%, 100% 0%, 100% 60%, 0% 100%)",
              scale: 0.88,
              opacity: 0,
              rotateZ: -2,
            },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
              scale: 1,
              opacity: 1,
              rotateZ: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 22%",
                scrub: 1,
              },
            }
          );
          break;
        }

        // 7. CORE VALUES -> INSIGHTS PINBOARD: 3D Pendulum Tilt-Drop
        case "corkboard-tilt-drop": {
          gsap.set(container, { perspective: 1500 });
          gsap.fromTo(
            content,
            {
              rotateX: -40,
              y: -140,
              opacity: 0,
              scale: 0.88,
              transformOrigin: "top center",
            },
            {
              rotateX: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "elastic.out(1, 0.75)",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 25%",
                scrub: 1.2,
              },
            }
          );
          break;
        }

        // 8. INSIGHTS -> SUSTAINABILITY ESG: Expanding Bio-Wave Organic Bleed
        case "organic-color-bleed": {
          if (fx) {
            gsap.fromTo(
              fx,
              {
                scale: 0.2,
                opacity: 0,
                borderRadius: "50%",
              },
              {
                scale: 2.2,
                opacity: 0.7,
                borderRadius: "0%",
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: container,
                  start: "top 95%",
                  end: "top 30%",
                  scrub: 1,
                },
              }
            );
          }
          gsap.fromTo(
            content,
            {
              scale: 0.9,
              opacity: 0,
              y: 90,
              filter: "blur(10px)",
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 25%",
                scrub: 0.9,
              },
            }
          );
          break;
        }

        // 9. SUSTAINABILITY -> CLIENT PORTFOLIO: Magnetic Grid Expansion
        case "magnetic-grid-expand": {
          gsap.fromTo(
            content,
            {
              scale: 1.15,
              opacity: 0,
              y: 100,
              letterSpacing: "-2px",
              filter: "blur(12px)",
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              letterSpacing: "0px",
              filter: "blur(0px)",
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 90%",
                end: "top 25%",
                scrub: 1,
              },
            }
          );
          break;
        }

        // 10. CLIENT PORTFOLIO -> CONTACT DISPATCH DESK: Telemetry Settle & Laser Sweep
        case "telemetry-settle-land": {
          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: 120,
              scale: 0.92,
              filter: "blur(14px)",
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              ease: "power4.out",
              scrollTrigger: {
                trigger: container,
                start: "top 88%",
                end: "top 30%",
                scrub: 1.3,
              },
            }
          );
          if (fx) {
            gsap.fromTo(
              fx,
              { top: "0%", opacity: 1 },
              {
                top: "100%",
                opacity: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: container,
                  start: "top 80%",
                  end: "top 30%",
                  scrub: 1.2,
                },
              }
            );
          }
          break;
        }
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [type]);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative w-full overflow-hidden will-change-transform ${className}`}
    >
      {/* Laser Light Seam FX for Horizontal Slide */}
      {type === "visualizer-horizontal-slide" && (
        <div
          ref={fxLayerRef}
          className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-[#E0B27A] to-transparent z-30 pointer-events-none shadow-[0_0_40px_#E0B27A]"
        />
      )}

      {/* Organic Forest Bio-Wave FX for ESG */}
      {type === "organic-color-bleed" && (
        <div
          ref={fxLayerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-0 pointer-events-none bg-gradient-to-br from-[#123620] via-[#0A2214] to-transparent blur-3xl opacity-0"
        />
      )}

      {/* Telemetry Laser Scanner Beam for Contact */}
      {type === "telemetry-settle-land" && (
        <div
          ref={fxLayerRef}
          className="absolute inset-x-0 h-[2px] z-30 pointer-events-none bg-gradient-to-r from-transparent via-[#E0B27A] to-transparent shadow-[0_0_20px_#E0B27A]"
        />
      )}

      {/* Main Section Content Wrapper */}
      <div ref={contentRef} className="relative z-10 will-change-transform">
        {children}
      </div>
    </section>
  );
}
