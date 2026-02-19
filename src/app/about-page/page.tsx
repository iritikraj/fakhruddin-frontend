"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ParallaxBackgroundUpdated from "./_parralax";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "who-we-are",
    title: "WHO WE ARE",
    subtitle: "Ethmar International Holding",
    text: `Ethmar International Holding was established as a strategic investment house rooted in Abu Dhabi, designed for those who understand that true value is deliberate - never accidental. <br/><br/> We operate across markets, sectors, and asset classes with one clear ambition: to shape capital into something that endures. Our investment decisions are guided not only by opportunity, but by discernment, clarity, and a deep respect for the responsibility that comes with deploying capital at scale. <br/><br/> Drawing from the UAE’s legacy of ambition, stability, and strategic leadership, Ethmar extends its reach into both emerging and established markets. We curate a portfolio that balances momentum with permanence, growth with resilience, and innovation with discipline – positioning capital to perform across cycle, not just moments.`,
  },
  {
    id: "purpose",
    title: "PURPOSE",
    subtitle: "",
    text: `To cultivate lasting value from Abu Dhabi by aligning with businesses and platforms capable of shaping sustainable economic progress across global markets. <br/><br/> Our approach aligns with Abu Dhabi's long-term vision, reflecting a commitment to sustainable growth, strategic leadership, and meaningful impact beyond borders.`,
  },
  {
    id: "promise",
    title: "PROMISE",
    subtitle: "",
    text: `To cultivate lasting value from Abu Dhabi by aligning with businesses and platforms capable of shaping sustainable economic progress across global markets. <br/><br/> Our approach aligns with Abu Dhabi's long-term vision, reflecting a commitment to sustainable growth, strategic leadership, and meaningful impact beyond borders.`,
  },
  {
    id: "stand-for",
    title: "WHAT WE STAND FOR",
    subtitle: "",
    text: `At Ethmar, principles are not statements on paper. They are reflected in how we choose opportunities, how we build partnerships, and how we measure success.`,
  }
];

export default function KnightScrollExperience() {
  const containerRef = useRef(null);
  const knightRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Timeline for the entire scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smoothly ties animation to scroll
      },
    });

    // --- SECTION 1 to 2 TRANSITION ---
    // Knight: Starts Right (25vw) -> Moves to Bottom Left (-25vw)
    // Text 1: Disappears Top Right
    // Text 2: Appears from Bottom Left -> Settles Center
    tl.to(sectionRefs.current[0], { x: "100%", y: "-100%", opacity: 0, duration: 2 }, 0)
      .fromTo(knightRef.current,
        { x: "25vw", y: "0vh" }, // <-- CHANGED: Knight now starts on the right side
        { x: "-25vw", y: "0vh", duration: 2 }, 0) // Knight moves left to accommodate text 2
      .fromTo(sectionRefs.current[1],
        { x: "-100%", y: "100%", opacity: 0 },
        { x: "0%", y: "0%", opacity: 1, duration: 2 }, 0);

    // --- SECTION 2 to 3 TRANSITION ---
    // Knight: Left -> Bottom Right (45 deg diagonal) -> Settles Right of Center
    // Text 2: Disappears Top Left
    // Text 3: Appears from Bottom Right -> Settles Center
    tl.to(sectionRefs.current[1], { x: "-100%", y: "-100%", opacity: 0, duration: 2 }, 2)
      .to(knightRef.current, {
        x: "25vw", // Move to the right side
        y: "0vh",
        duration: 2
      }, 2)
      .fromTo(sectionRefs.current[2],
        { x: "100%", y: "100%", opacity: 0 },
        { x: "0%", y: "0%", opacity: 1, duration: 2 }, 2);

    // --- SECTION 3 to 4 TRANSITION ---
    // Knight: Moves back toward center/exit
    tl.to(sectionRefs.current[2], { x: "100%", y: "-100%", opacity: 0, duration: 2 }, 4)
      .to(knightRef.current, { x: "0vw", y: "20vh", opacity: 0.5, duration: 2 }, 4)
      .fromTo(sectionRefs.current[3],
        { x: "0%", y: "100%", opacity: 0 },
        { x: "0%", y: "0%", opacity: 1, duration: 2 }, 4);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Background stays fixed */}
      {/* <ParallaxBackground /> */}
      <ParallaxBackgroundUpdated />

      {/* The Traveling Knight */}
      <div
        ref={knightRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[60vh] z-20 pointer-events-none"
      >
        <Image
          src="/images/knight.png"
          alt="Knight"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Sections - Each is H-SCREEN to provide scroll depth */}
      {sections.map((section, i) => (
        <section
          key={section.id}
          className="relative h-[200vh] w-full flex items-center justify-center overflow-hidden"
        >
          <div
            ref={(el) => (sectionRefs.current[i] = el)}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center px-6 z-10"
            style={{ opacity: i === 0 ? 1 : 0 }} // Only first section visible initially
          >
            <div className="max-w-2xl text-center">
              <span className="block text-[#8b847a] tracking-[0.2em] text-2xl font-semibold mb-6 uppercase">
                {section.title}
              </span>
              <h2 className="text-4xl md:text-6xl text-[#33312f] mb-8 uppercase">
                {section.subtitle}
              </h2>
              <p
                className="text-lg text-[#5a5651] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.text }}
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}