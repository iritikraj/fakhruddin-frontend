"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function PremiumHero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const flowerRef = useRef(null);
  const archRef = useRef(null);
  const buildingRef = useRef(null);

  useGSAP(() => {
    // --- 1. INITIAL LOAD REVEAL (Corrected Sequence) ---
    const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. FIRST: Fade in the background video to establish the scene
    introTl.fromTo(flowerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.inOut" }
    )
      // 2. Text reveals alongside the video
      .fromTo(textRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
        "-=1.5" // Syncs with the video fade
      )
      // 3. SECOND: The Arch (building) slides up into the frame
      .fromTo(archRef.current,
        { y: "100%" },
        { y: "0%", duration: 2.5, ease: "expo.out" },
        "-=0.8" // Overlaps slightly with the end of the video fade for fluidity
      );

    // --- 2. SCROLL SEQUENCE (Unchanged) ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=350%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Phase 1: Expand the arch to full screen
    scrollTl.to(archRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.inOut",
      duration: 1
    }, 0)
      .to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0)
      .to(flowerRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 0.8)

      // Phase 2: The Vertical Pan (with mobile safeguard)
      .to(buildingRef.current, {
        y: () => {
          const img: any = buildingRef.current;
          if (!img || !img.naturalWidth) return 0;

          const expandedHeight = (img.naturalHeight / img.naturalWidth) * window.innerWidth;

          if (expandedHeight <= window.innerHeight) {
            return 0;
          }

          return window.innerHeight - expandedHeight;
        },
        ease: "none",
        duration: 2.5
      }, 1);

  }, { scope: containerRef });

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center"
      >
        {/* Z-INDEX 10: Background Video */}
        <div
          ref={flowerRef}
          className="absolute z-10 w-screen h-screen opacity-0"
        >
          <video
            src="/Treppan-Living-PRIVE-Video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90 mix-blend-multiply"
          />
        </div>

        {/* Z-INDEX 20: Foreground Typography */}
        <div ref={textRef} className="absolute z-20 w-full text-center pointer-events-none">
          {/* Add your typography back in here when ready */}
        </div>

        {/* Z-INDEX 30: The Mask and Building */}
        <div
          ref={archRef}
          data-cursor="Discover"
          className="absolute z-30 bottom-0 overflow-hidden flex justify-center items-start w-[85vw] md:w-[35vw] h-[60vh] md:h-[70vh] rounded-t-[250px] md:rounded-t-[500px]"
          style={{
            willChange: "width, height, border-radius, transform"
          }}
        >
          <img
            ref={buildingRef}
            src="/GeneralView05-Bluehour.jpg"
            alt="Fakhruddin Building"
            className="absolute top-0 w-full h-auto object-cover origin-top"
          />
        </div>
      </section>
    </>
  );
}