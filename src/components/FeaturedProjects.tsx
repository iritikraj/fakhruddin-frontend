"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { num: "01", title: "Tréppan Living Privé", location: "Dubai Islands", type: "Ultra-Luxury Living", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/TL-PRIVE-GeneralView03.webp" },
  { num: "02", title: "Tréppan Serenique", location: "Dubai Islands", type: "Wellness Residences", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-03.webp" },
  { num: "03", title: "Tréppan Tower", location: "JVT", type: "Iconic High-Rise", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Tower-Banner.webp" },
  { num: "04", title: "Hatimi Residences", location: "Dubai Islands", type: "Sustainable Sanctuary", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-Render-1_4_11.webp" },
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Media Query: Only run horizontal scroll on Desktop (min-width: 1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const sections = gsap.utils.toArray(".project-panel");

      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          end: () => "+=" + (scrollWrapperRef.current?.offsetWidth || 0),
        },
      });

      // Parallax Images
      sections.forEach((section: any) => {
        const img = section.querySelector(".parallax-image");
        gsap.fromTo(img, { x: "10%" }, {
          x: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });

      // Progress Bar
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + (scrollWrapperRef.current?.offsetWidth || 0),
          scrub: true,
        }
      });
    });

    // Mobile specific reveal logic (Vertical)
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray(".project-panel").forEach((panel: any) => {
        gsap.from(panel.querySelector(".content-reveal"), {
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#F4F1EE] text-[#1A1A1A] relative">

      {/* 1. Header: Made Responsive */}
      <div className="relative lg:absolute top-12 lg:top-20 left-0 lg:left-20 z-40 px-8 lg:px-0 mb-12 lg:mb-0">
        <div className="space-y-4">
          <p className="text-[9px] tracking-[0.5em] lg:tracking-[0.7em] uppercase text-[#B69C6B] font-bold">The Curated Portfolio</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl tracking-tighter italic font-light">
            Featured <span className="not-italic text-[#1A1A1A]">Developments</span>
          </h2>
        </div>
      </div>

      {/* 2. Track: Dynamic width based on screen size */}
      <div
        ref={scrollWrapperRef}
        className="flex flex-col lg:flex-row h-auto lg:h-screen w-full lg:w-[400vw] items-center will-change-transform"
      >
        {projects.map((project, i) => (
          <div key={i} className="project-panel w-full lg:w-screen h-auto lg:h-full flex items-center justify-center relative px-6 md:px-20 py-16 lg:py-0">

            <div className="relative w-full max-w-[1400px] grid grid-cols-12 gap-6 lg:gap-8 items-center">

              {/* Image Frame */}
              <div className="col-span-12 lg:col-span-7 relative aspect-[16/10] lg:aspect-[16/10] overflow-hidden shadow-2xl group order-1 lg:order-1">
                <img
                  src={project.img}
                  alt={project.title}
                  className="parallax-image lg:absolute inset-0 w-full lg:w-[140%] h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>

              {/* Textual Content */}
              <div className="col-span-12 lg:col-span-5 content-reveal flex flex-col items-start lg:pl-12 space-y-6 lg:space-y-8 order-2 lg:order-2">
                <div className="flex items-end gap-4">
                  <span className="font-serif italic text-5xl lg:text-8xl text-[#B69C6B]/20 leading-none">
                    {project.num}
                  </span>
                  <div className="pb-2">
                    <p className="text-[8px] lg:text-[10px] tracking-[0.3em] lg:tracking-[0.4em] uppercase text-[#B69C6B] font-bold">
                      {project.location}
                    </p>
                    <p className="text-[8px] lg:text-[9px] text-[#1A1A1A]/40 uppercase tracking-widest">{project.type}</p>
                  </div>
                </div>

                <h3 className="font-serif text-3xl lg:text-6xl tracking-tight leading-[1.1]">
                  {project.title}
                </h3>

                <button className="group relative flex items-center gap-4 lg:gap-6 pt-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-[#1A1A1A]/10 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all duration-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#1A1A1A]/60 group-hover:text-[#1A1A1A]">
                    Explore View
                  </span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. Progress: Hidden on mobile for cleaner UI */}
      <div className="hidden lg:flex absolute bottom-12 left-20 items-end gap-12 z-40">
        <div className="flex flex-col gap-4">
          <div className="w-[300px] h-[1px] bg-[#1A1A1A]/10 overflow-hidden">
            <div className="progress-bar h-full bg-[#B69C6B] origin-left scale-x-0" />
          </div>
          <p className="text-[9px] tracking-[0.5em] uppercase text-[#1A1A1A]/40 font-bold">Project Index</p>
        </div>
      </div>

    </section>
  );
}