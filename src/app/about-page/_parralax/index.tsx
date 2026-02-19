"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBackgroundUpdated() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Tie parallax to the main scroll container (body works, but we can refine if needed)
    const trigger = document.body; // or use a specific container if available

    // Animate each layer with different depth speeds
    bgRefs.current.forEach((el, i) => {
      if (!el) return;

      // Depth factor: higher index = closer / faster movement
      const depth = (i + 1) * 0.6;
      const startZ = -800 * depth;
      const endZ = 1000;
      const startScale = 0.3 + i * 0.1;
      const endScale = 2.5 - i * 0.2;

      // Subtle rotation per layer for 3D interest
      const startRotateY = i % 2 === 0 ? 15 : -15;
      const endRotateY = 0;

      gsap.fromTo(el,
        {
          z: startZ,
          scale: startScale,
          opacity: 0.1 + i * 0.15,
          rotateY: startRotateY,
          xPercent: -20 + i * 10, // slight horizontal offset for variety
        },
        {
          z: endZ,
          scale: endScale,
          opacity: 0.5 + i * 0.1,
          rotateY: endRotateY,
          xPercent: 20 - i * 10,
          ease: "power1.inOut", // smooth, refined easing
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2, // slightly slower scrub for more fluidity
          },
        }
      );
    });

    // Gentle camera tilt (like a subtle crane shot)
    gsap.to(containerRef.current, {
      rotateX: 2,
      rotateY: 1,
      rotateZ: 0.5,
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    // Floating light ray (a soft gradient that moves)
    const lightRay = document.createElement("div");
    lightRay.className = "absolute inset-0 pointer-events-none mix-blend-overlay";
    lightRay.style.background = "radial-gradient(circle at 30% 50%, rgba(255,245,235,0.15) 0%, transparent 70%)";
    containerRef.current?.appendChild(lightRay);

    gsap.to(lightRay, {
      backgroundPosition: "70% 50%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#fcf9f5] to-[#f5f1eb]"
      style={{
        perspective: "1800px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Layer 1 — Distant haze (slowest) */}
      <div
        ref={(el) => (bgRefs.current[0] = el)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[200vw] h-[200vh] bg-[#eae3db] opacity-30 blur-3xl" />
      </div>

      {/* Layer 2 — Soft architectural forms */}
      <div
        ref={(el) => (bgRefs.current[1] = el)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[160vw] h-[160vh] border-[60px] border-[#d6cfc4] opacity-20 rounded-full"
          style={{ transform: "rotate(30deg)" }}
        />
      </div>

      {/* Layer 3 — Floating panels */}
      <div
        ref={(el) => (bgRefs.current[2] = el)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[140vw] h-[140vh] bg-gradient-to-tr from-[#e3ddd4] to-transparent opacity-30"
          style={{ clipPath: "polygon(20% 10%, 90% 0%, 70% 90%, 10% 80%)" }}
        />
      </div>

      {/* Layer 4 — Linear elements (luxury lines) */}
      <div
        ref={(el) => (bgRefs.current[3] = el)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[120vw] h-[120vh] flex items-center justify-center">
          <div className="w-full h-px bg-[#c9bcaf] opacity-20 rotate-45" />
          <div className="w-full h-px bg-[#c9bcaf] opacity-20 -rotate-45 absolute" />
        </div>
      </div>

      {/* Layer 5 — Closer geometric shapes */}
      <div
        ref={(el) => (bgRefs.current[4] = el)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[100vw] h-[100vh] border-2 border-[#b7aa9a] opacity-15"
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
        />
      </div>

      {/* Layer 6 — Foreground details (fastest) */}
      <div
        ref={(el) => (bgRefs.current[5] = el)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[80vw] h-[80vh] relative">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-[#dad2c7]/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Vignette for depth and focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(250,245,240,0.7)_100%)]" />
    </div>
  );
}