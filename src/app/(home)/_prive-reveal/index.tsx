"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PriveReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      }
    });

    // 1. The SVG Path Morph (From a small slit to a wide cinematic frame)
    // We animate the 'd' attribute of the path to create that "Omniyat slice"
    tl.to(".mask-path", {
      attr: {
        d: "M-500,-500 L2420,-500 L2420,1580 L1100,1580 L960,1100 L820,1580 L-500,1580 Z"
      },
      ease: "none",
      duration: 2
    })
      .to(".mask-path", {
        attr: {
          d: "M-500,-500 L2420,-500 L2420,1580 L2420,1580 L960,1580 L-500,1580 L-500,1580 Z"
        },
        ease: "power2.in",
        duration: 1
      });

    // 2. Image Scaling (The "Breathe")
    tl.fromTo(".hero-img",
      { scale: 1.2 },
      { scale: 1, duration: 3, ease: "none" },
      0
    );

    // 3. Content Reveal (Fade and Slide Up)
    tl.fromTo(".bespoke-content",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      "-=1.5"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F9F8F6] overflow-hidden">
      {/* BACKGROUND CONTENT (Visible before the mask opens) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-[10px] tracking-[0.8em] uppercase text-[#B69C6B] mb-4">Established 1963</p>
        <h2 className="font-serif text-4xl md:text-6xl opacity-10 uppercase tracking-tighter">Fakhruddin</h2>
      </div>

      {/* THE IMAGE LAYER */}
      <div className="absolute inset-0 z-10">
        <img
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Treppan-Living-PRIVE-GeneralView.webp"
          className="hero-img w-full h-full object-cover"
          alt="Luxury Development"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* THE SVG MASK (The "Curtain") */}
      {/* This SVG sits on top of the image and "cuts" a hole in itself */}
      <svg
        ref={svgRef}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 z-20 w-full h-full pointer-events-none"
      >
        <defs>
          {/* Define the background image as a pattern */}
          <pattern
            id="sandPattern"
            patternUnits="userSpaceOnUse"
            width="1920"
            height="1080"
          >
            <image
              href="/images/sand-background.webp"
              width="1920"
              height="1080"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          
          <mask id="omniyat-mask">
            {/* White reveals, Black hides. We move the white part. */}
            <rect width="100%" height="100%" fill="white" />
            <path
              className="mask-path"
              fill="black"
              d="M960,540 L960,540 L960,540 L960,540 Z" // Starting point: invisible dot
            />
          </mask>
        </defs>
        {/* This rect covers the image until the mask carves a hole - NOW USING THE SAND BACKGROUND IMAGE */}
        <rect width="100%" height="100%" fill="url(#sandPattern)" mask="url(#omniyat-mask)" />
      </svg>

      {/* THE OVERLAY CONTENT */}
      <div className="bespoke-content absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white px-8">
        <div className="max-w-2xl space-y-8">
          <img
            src="https://projects.fakhruddinproperties.com/treppan-living-prive-svg2.svg"
            className="h-12 md:h-36 mx-auto brightness-0 invert"
            alt="Logo"
          />
          <div className="w-12 h-[1px] bg-[#B69C6B] mx-auto" />
          <p className="text-xl md:text-2xl leading-relaxed font-light">
            Imagined by legacy and crafted for the future, our architectural brilliance celebrates your unique individuality.
          </p>
        </div>
      </div>
    </section>
  );
}