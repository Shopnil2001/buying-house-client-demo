"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
}

export default function ScrollRevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransformStyle = () => {
    if (isVisible) {
      return "opacity-100 translate-y-0 translate-x-0 scale-100 blur-0";
    }

    switch (direction) {
      case "up":
        return "opacity-0 translate-y-12 scale-[0.98] blur-[2px]";
      case "left":
        return "opacity-0 -translate-x-12 blur-[2px]";
      case "right":
        return "opacity-0 translate-x-12 blur-[2px]";
      case "fade":
      default:
        return "opacity-0 scale-[0.98] blur-[4px]";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${getTransformStyle()} ${className}`}
    >
      {children}
    </div>
  );
}
