"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade" | "3d-tilt";
}

export default function ScrollRevealSection({
  children,
  className = "",
  delay = 0,
  direction = "3d-tilt",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Scroll parallax depth listener
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top < viewH && rect.bottom > 0) {
        const offset = ((rect.top + rect.height / 2) / viewH - 0.5) * -20;
        setParallaxY(offset);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getTransformStyle = () => {
    if (isVisible) {
      return "opacity-100 translate-y-0 translate-x-0 scale-100 blur-0 rotate-0";
    }

    switch (direction) {
      case "3d-tilt":
        return "opacity-0 translate-y-16 scale-[0.96] blur-[3px] [transform:perspective(1200px)_rotateX(8deg)]";
      case "up":
        return "opacity-0 translate-y-16 scale-[0.98] blur-[2px]";
      case "left":
        return "opacity-0 -translate-x-16 blur-[2px]";
      case "right":
        return "opacity-0 translate-x-16 blur-[2px]";
      case "fade":
      default:
        return "opacity-0 scale-[0.98] blur-[4px]";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isVisible
          ? `translate3d(0, ${parallaxY}px, 0)`
          : undefined,
      }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${getTransformStyle()} ${className}`}
    >
      {children}
    </div>
  );
}
