"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";
  delayMs?: number;
  durationMs?: number;
}

export function AnimateIn({
  children,
  className,
  variant = "fade-up",
  delayMs = 0,
  durationMs = 600,
}: AnimateInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getVariantStyles = () => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0 scale-100";
    }

    switch (variant) {
      case "fade-up":
        return "opacity-0 translate-y-8";
      case "fade-down":
        return "opacity-0 -translate-y-8";
      case "fade-left":
        return "opacity-0 translate-x-8";
      case "fade-right":
        return "opacity-0 -translate-x-8";
      case "zoom-in":
        return "opacity-0 scale-95";
      case "fade":
      default:
        return "opacity-0";
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn(
        "transition-all will-change-[transform,opacity]",
        getVariantStyles(),
        className
      )}
    >
      {children}
    </div>
  );
}
