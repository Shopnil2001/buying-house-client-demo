"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface CameraState {
  posX: number;
  posY: number;
  posZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  progress: number;
}

export function useScrollCamera(containerRef: React.RefObject<HTMLElement>) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const cameraStateRef = useRef<CameraState>({
    posX: 0,
    posY: 0,
    posZ: 9.5,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    progress: 0,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    // Create GSAP ScrollTrigger timeline with pinning
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            cameraStateRef.current.progress = p;

            // Camera Keyframe Choreography:
            // 0.0 -> 0.35: Establishing wide view -> dolly in to center ribbon
            // 0.35 -> 0.70: Orbit around right flank to highlight woven texture
            // 0.70 -> 1.00: Macro zoom in with rack focus to the core thread knot
            if (p <= 0.35) {
              const t = p / 0.35;
              cameraStateRef.current.posX = gsap.utils.interpolate(0, 1.8, t);
              cameraStateRef.current.posY = gsap.utils.interpolate(0, -0.4, t);
              cameraStateRef.current.posZ = gsap.utils.interpolate(9.5, 6.8, t);
              cameraStateRef.current.targetX = gsap.utils.interpolate(0, 0.4, t);
            } else if (p <= 0.7) {
              const t = (p - 0.35) / 0.35;
              cameraStateRef.current.posX = gsap.utils.interpolate(1.8, -2.2, t);
              cameraStateRef.current.posY = gsap.utils.interpolate(-0.4, 0.8, t);
              cameraStateRef.current.posZ = gsap.utils.interpolate(6.8, 5.2, t);
              cameraStateRef.current.targetX = gsap.utils.interpolate(0.4, -0.6, t);
            } else {
              const t = (p - 0.7) / 0.3;
              cameraStateRef.current.posX = gsap.utils.interpolate(-2.2, 0.2, t);
              cameraStateRef.current.posY = gsap.utils.interpolate(0.8, -0.2, t);
              cameraStateRef.current.posZ = gsap.utils.interpolate(5.2, 4.0, t);
              cameraStateRef.current.targetX = gsap.utils.interpolate(-0.6, 0, t);
            }
          },
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);

  return { scrollProgress, cameraStateRef };
}
