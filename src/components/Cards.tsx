"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const masterpieces = [
  {
    tagline: "Reimagining Horizons",
    title: "Tréppan Living Privé",
    location: "Dubai Islands",
    img: "https://serenique.fakhruddinproperties.com/aminities-5.webp",
  },
  {
    tagline: "Inspiring Life Within",
    title: "Tréppan Serenique Residences",
    location: "Dubai Islands",
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-03.webp",
  },
  {
    tagline: "Redefining Perspectives",
    title: "Tréppan Tower",
    location: "JVT",
    img: "https://serenique.fakhruddinproperties.com/aminities-3.webp",
  },
  {
    tagline: "A Retreat Within The City",
    title: "Hatimi Residences",
    location: "Dubai Islands",
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-Render-1_4_11.webp",
  },
];

export default function Masterpieces() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const panels: any = gsap.utils.toArray(".stack-panel");
    const contents: any = gsap.utils.toArray(".stack-content");

    // We pin the entire container for 400% of its height to allow time to scroll through 4 cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 1.2, // Smooth lag for a heavy, expensive feel
        pin: true,
      },
    });

    // Animate the intro text fading out slightly as the first card locks in
    tl.to(".intro-header", { opacity: 0.2, filter: "blur(4px)", duration: 0.5 }, 0);

    // Loop through the panels (skipping the first one, since it's already visible)
    panels.forEach((panel: any, i: any) => {
      if (i === 0) return;

      // 1. Slide the new panel up from the bottom
      tl.fromTo(
        panel,
        { yPercent: 100, boxShadow: "0px -20px 50px rgba(0,0,0,0)" },
        {
          yPercent: 0,
          boxShadow: "0px -30px 60px rgba(0,0,0,0.4)", // Drops a shadow on the card below it
          duration: 1,
          ease: "power2.inOut"
        },
        "+=0.2" // Tiny pause between panel reveals
      );

      // 2. Push the previous panel backward (Scale down + Dim)
      tl.to(
        panels[i - 1],
        {
          scale: 0.92,
          filter: "brightness(0.4)",
          duration: 1,
          ease: "power2.inOut"
        },
        "<" // Sync this perfectly with the slide-up animation above
      );

      // 3. Stagger the typography reveal on the new card
      tl.fromTo(
        contents[i].querySelectorAll(".reveal-text"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
        "-=0.4" // Start revealing text right before the card finishes sliding into place
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#F9F8F6] flex flex-col">
      <div className="w-full h-screen overflow-hidden flex items-center justify-center relative">
        <div className="relative w-full md:w-[85vw] lg:w-[75vw] h-[75vh] md:h-[80vh] mt-32 md:mt-16 z-10">

          {masterpieces.map((project, i) => (
            <div
              key={i}
              className="stack-panel absolute inset-0 w-full h-full overflow-hidden rounded-sm will-change-transform bg-[#1A1A1A]"
              // Give the first panel a lower z-index so subsequent panels stack on top of it properly
              style={{ zIndex: i + 10 }}
            >
              {/* The Background Image */}
              <img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover origin-bottom grayscale-[0.1]"
              />

              {/* Luxury Gradient Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/30 to-transparent" />

              {/* The Content (Title, Location, CTA) */}
              <div className="stack-content absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-12 md:pb-16 z-20">

                <div className="overflow-hidden mb-4">
                  <p className="reveal-text text-[10px] tracking-[0.4em] uppercase text-[#9D7E44] font-bold">
                    {project.location}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">

                  <div className="max-w-3xl">
                    <div className="overflow-hidden mb-2">
                      <h3 className="reveal-text font-serif text-3xl md:text-4xl text-[#F9F8F6]/80 italic font-light">
                        {project.tagline}
                      </h3>
                    </div>
                    <div className="overflow-hidden">
                      <h2 className="reveal-text font-serif text-4xl md:text-6xl lg:text-[5rem] leading-[0.9] tracking-tighter text-[#F9F8F6]">
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  <div className="overflow-hidden pb-2">
                    <button className="reveal-text group relative inline-flex items-center gap-6 text-[10px] tracking-[0.4em] uppercase text-[#F9F8F6] font-medium">
                      <span className="relative z-10 group-hover:text-[#9D7E44] transition-colors duration-500">
                        Discover Project
                      </span>
                      <div className="relative w-16 h-[1px] bg-[#F9F8F6]/30 overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-full bg-[#9D7E44] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      </div>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}