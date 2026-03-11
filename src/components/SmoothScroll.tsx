"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.08, // Friction. Lower = heavier/smoother (default is 0.1)
      wheelMultiplier: 1,
      autoRaf: false, // We will let GSAP drive the requestAnimationFrame
    });

    // 2. Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Connect Lenis's raf to GSAP's ticker
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // 4. Disable GSAP's lag smoothing. 
    // This is highly recommended by GSAP when using external smooth scrollers
    // to prevent jitter when the browser briefly lags.
    gsap.ticker.lagSmoothing(0);

    // 5. Cleanup on unmount
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  // No wrapper component needed anymore, just return the children!
  return <>{children}</>;
}