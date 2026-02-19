"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const bgRefs = useRef([]);

  useEffect(() => {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // 2. GSAP Context & Timeline
    const ctx = gsap.context(() => {
      // Set the Knight to the Right side of the screen immediately
      gsap.set(knightRef.current, { x: "25vw" });

      // Set initial state for sections (hide all except the first)
      sectionRefs.current.forEach((sec, i) => {
        if (i !== 0) gsap.set(sec, { opacity: 0, y: "50vh", x: "50vw" }); // Prepare off-screen
      });

      // --- PARALLAX BACKGROUND TWEENS ---
      gsap.to(bgRefs.current[0], { y: "-30vh", ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=4000", scrub: true } });
      gsap.to(bgRefs.current[1], { y: "25vh", ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=4000", scrub: true } });
      gsap.to(bgRefs.current[2], { y: "-20vh", ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=4000", scrub: true } });
      gsap.to(bgRefs.current[3], { y: "30vh", ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=4000", scrub: true } });

      // --- MAIN PINNED TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", // Adjust this value to make the scroll longer/shorter
          scrub: 1,
          pin: true,     // Pin the entire container
        },
      });

      // SECTION 1 to 2
      tl.add("step1")
        .to(sectionRefs.current[0], { x: "-50vw", y: "-50vh", opacity: 0, duration: 2, ease: "power2.inOut" }, "step1")
        .to(knightRef.current, { x: "-25vw", duration: 2.5, ease: "power2.inOut" }, "step1")
        .fromTo(sectionRefs.current[1],
          { x: "50vw", y: "50vh", opacity: 0 },
          { x: "0vw", y: "0vh", opacity: 1, duration: 2, ease: "power2.out" }, "step1+=0.5")
        .to({}, { duration: 0.5 }); // Reading pause

      // SECTION 2 to 3
      tl.add("step2")
        .to(sectionRefs.current[1], { x: "50vw", y: "-50vh", opacity: 0, duration: 2, ease: "power2.inOut" }, "step2")
        .to(knightRef.current, { x: "25vw", duration: 2.5, ease: "power2.inOut" }, "step2")
        .fromTo(sectionRefs.current[2],
          { x: "-50vw", y: "50vh", opacity: 0 },
          { x: "0vw", y: "0vh", opacity: 1, duration: 2, ease: "power2.out" }, "step2+=0.5")
        .to({}, { duration: 0.5 }); // Reading pause

      // SECTION 3 to 4
      tl.add("step3")
        .to(sectionRefs.current[2], { x: "-50vw", y: "-50vh", opacity: 0, duration: 2, ease: "power2.inOut" }, "step3")
        .to(knightRef.current, { x: "-25vw", duration: 2.5, ease: "power2.inOut" }, "step3")
        .fromTo(sectionRefs.current[3],
          { x: "50vw", y: "50vh", opacity: 0 },
          { x: "0vw", y: "0vh", opacity: 1, duration: 2, ease: "power2.out" }, "step3+=0.5")
        .to({}, { duration: 0.5 }); // End pause

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#faf9f8]">

      {/* --- PARALLAX BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          ref={el => bgRefs.current[0] = el}
          className="absolute top-[-20%] left-[-20%] w-[120vw] h-[140vh] bg-[#f5f2ec] opacity-60"
          style={{ clipPath: "polygon(0 0, 100% 15%, 80% 100%, 0 85%)" }}
        />
        <div
          ref={el => bgRefs.current[1] = el}
          className="absolute top-[10%] right-[-20%] w-[110vw] h-[130vh] bg-[#fdfdfc] shadow-[0_0_50px_rgba(0,0,0,0.02)]"
          style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 80%)" }}
        />
        <div
          ref={el => bgRefs.current[2] = el}
          className="absolute bottom-[-30%] left-[5%] w-[120vw] h-[120vh] bg-[#f3efe8] opacity-50"
          style={{ clipPath: "polygon(0 20%, 80% 0, 100% 80%, 20% 100%)" }}
        />
        <div
          ref={el => bgRefs.current[3] = el}
          className="absolute top-[30%] left-[20%] w-[80vw] h-[80vh] bg-[#ffffff] opacity-40 shadow-xl"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
      </div>

      {/* --- THE TRAVELING KNIGHT --- */}
      <div
        ref={knightRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] md:w-[25vw] h-[70vh] z-20 pointer-events-none drop-shadow-2xl"
      >
        <Image
          src="/images/knight.png"
          alt="Knight"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* --- TEXT SECTIONS --- */}
      {/* Instead of 200vh tall scrolling divs, we stack them perfectly in the center absolute to the pinned container */}
      {sections.map((section, i) => (
        <div
          key={section.id}
          ref={(el) => (sectionRefs.current[i] = el)}
          // Width is restricted to 50% to ensure it never overlaps with the knight occupying the left/right 25% bounds
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[50%] flex flex-col items-center justify-center px-6 z-10"
        >
          <div className="max-w-2xl text-center">
            <span className="block text-[#8b847a] tracking-[0.2em] text-2xl font-semibold mb-6 uppercase">
              {section.title}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#33312f] mb-8 uppercase">
              {section.subtitle}
            </h2>
            <p
              className="text-base md:text-lg text-[#5a5651] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.text }}
            />
          </div>
        </div>
      ))}

    </div>
  );
}