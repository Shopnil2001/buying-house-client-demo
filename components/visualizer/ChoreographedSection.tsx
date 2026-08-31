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
  | "organic-color-bleed"
  | "parallax-lag-scale"
  | "settle-land";

interface ChoreographedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  type: TransitionType;
  overlayColor?: string;
}

export default function ChoreographedSection({
  children,
  id,
  className = "",
  type,
  overlayColor,
}: ChoreographedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<HTMLDivElement>(null!);
  const overlayRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    if (!container || !content) return;

    const ctx = gsap.context(() => {
      switch (type) {
        // 1. Hero -> 3D Visualizer: Hero scales down and recedes into depth as camera pushes through
        case "hero-push-through": {
          gsap.to(content, {
            scale: 0.85,
            opacity: 0,
            y: -60,
            filter: "blur(10px)",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom 30%",
              scrub: 0.8,
            },
          });
          break;
        }

        // 2. 3D Visualizer -> Vertical Ecosystem: Horizontal slide & curtain wipe
        case "visualizer-horizontal-slide": {
          gsap.fromTo(
            content,
            {
              xPercent: -40,
              opacity: 0.2,
              filter: "blur(6px)",
            },
            {
              xPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 25%",
                scrub: 1,
              },
            }
          );
          break;
        }

        // 3. Vertical Ecosystem -> Six Pillars: Signature 3D Page-Turn / Book-Fold
        case "book-page-turn": {
          gsap.set(container, { perspective: 1600 });
          gsap.fromTo(
            content,
            {
              transformOrigin: "right center",
              rotateY: 45,
              opacity: 0.2,
              scale: 0.92,
              filter: "blur(4px)",
            },
            {
              rotateY: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "top 25%",
                scrub: 1.2,
              },
            }
          );
          break;
        }

        // 4. Six Pillars -> Key Facts & Scale: Depth Pass-Behind
        case "depth-pass-behind": {
          gsap.fromTo(
            content,
            {
              scale: 0.92,
              y: 80,
              opacity: 0.15,
              zIndex: 10,
            },
            {
              scale: 1.0,
              y: 0,
              opacity: 1,
              zIndex: 20,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 25%",
                scrub: 0.8,
              },
            }
          );
          break;
        }

        // 5. Key Facts -> Product Lines: Vertical Blind / Mask Wipe
        case "vertical-blind-wipe": {
          gsap.fromTo(
            content,
            {
              clipPath: "inset(100% 0% 0% 0%)",
              opacity: 0.3,
              y: 40,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              y: 0,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "top 25%",
                scrub: 1,
              },
            }
          );
          break;
        }

        // 6. Product Lines -> Core Values / Liquid Silk: Diagonal Shard Split Reveal
        case "diagonal-shard-split": {
          gsap.fromTo(
            content,
            {
              clipPath: "polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)",
              scale: 0.95,
              opacity: 0.2,
            },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "top 30%",
                scrub: 0.9,
              },
            }
          );
          break;
        }

        // 7. Core Values -> ESG / Green Mills: Organic Color-Bleed Transition
        case "organic-color-bleed": {
          if (overlay) {
            gsap.fromTo(
              overlay,
              {
                opacity: 0,
                scaleY: 0,
              },
              {
                opacity: 0.6,
                scaleY: 1,
                ease: "power1.inOut",
                scrollTrigger: {
                  trigger: container,
                  start: "top 90%",
                  end: "top 40%",
                  scrub: 1,
                },
              }
            );
          }
          gsap.fromTo(
            content,
            {
              opacity: 0.3,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "top 30%",
                scrub: 0.8,
              },
            }
          );
          break;
        }

        // 8. ESG -> Client Portfolio: Parallax Lag Scale
        case "parallax-lag-scale": {
          gsap.fromTo(
            content,
            {
              scale: 1.06,
              opacity: 0.25,
              y: 60,
            },
            {
              scale: 1.0,
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 30%",
                scrub: 1,
              },
            }
          );
          break;
        }

        // 9. Final Section -> Contact / Footer: Settle & Land
        case "settle-land": {
          gsap.fromTo(
            content,
            {
              opacity: 0.2,
              y: 70,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 35%",
                scrub: 1.2,
              },
            }
          );
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
      {/* Organic Color Bleed Gradient Overlay for ESG */}
      {type === "organic-color-bleed" && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-0 pointer-events-none origin-top bg-gradient-to-b from-[#182335] via-[#0D1E14] to-[#09140D]"
        />
      )}

      {/* Main Choreographed Section Content */}
      <div ref={contentRef} className="relative z-10 will-change-transform">
        {children}
      </div>
    </section>
  );
}
