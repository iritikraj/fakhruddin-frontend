"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TransitionLink } from "@/components/TransitionLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.4,
        pin: true,
        anticipatePin: 1,
      }
    });

    // 1a. Golden halo blooms first — a radial light behind the logo
    tl.fromTo(".logo-halo",
      { opacity: 0, scale: 0.4, filter: "blur(40px)" },
      { opacity: 1, scale: 1.15, filter: "blur(28px)", duration: 2, ease: "power2.out" },
      0
    );

    // 1b. Decorative lines sweep outward (letterbox cinematic bars)
    tl.fromTo(".deco-line-left",
      { scaleX: 0, transformOrigin: "right center" },
      { scaleX: 1, duration: 1.8, ease: "expo.out" },
      0.2
    );
    tl.fromTo(".deco-line-right",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.8, ease: "expo.out" },
      0.2
    );

    // 1c. Tagline rises and letter-spacing blooms — slow, regal
    tl.fromTo(".intro-subtitle",
      { opacity: 0, y: 18, letterSpacing: "0.1em", filter: "blur(6px)" },
      { opacity: 1, y: 0, letterSpacing: "0.72em", filter: "blur(0px)", duration: 2.6, ease: "power3.out" },
      0.3
    );

    // 1d. Logo itself: emerges from a brilliant overexposed white bloom down to crisp
    // — starts as a pure white overexposed glare, sharpens to natural
    tl.fromTo(".intro-logo",
      {
        opacity: 0,
        scale: 1.22,
        filter: "blur(18px) brightness(3.5) saturate(0)",
        y: 28,
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(1) saturate(1)",
        y: 0,
        duration: 3.0,
        ease: "power4.out",
      },
      0.55
    );

    // 1e. Halo settles & softens behind the sharp logo
    tl.to(".logo-halo",
      { scale: 1, filter: "blur(22px)", opacity: 0.65, duration: 2, ease: "power2.out" },
      2.2
    );

    // 1f. Fine ornament lines fade in beneath the logo
    tl.fromTo(".logo-ornament",
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 1.4, ease: "expo.out" },
      1.8
    );

    tl.fromTo(turbRef.current,
      { attr: { baseFrequency: 0.04 } },
      { attr: { baseFrequency: 0.0001 }, duration: 3.8, ease: "power2.inOut" },
      0.6
    );

    tl.fromTo(dispRef.current,
      { attr: { scale: 150 } },
      { attr: { scale: 0 }, duration: 3.8, ease: "power2.inOut" },
      0.6
    );

    tl.fromTo(".pdp-hero-image",
      { scale: 1.32 },
      { scale: 1, duration: 4.2, ease: "power2.inOut" },
      0.2
    );

    tl.fromTo(".dark-overlay",
      { opacity: 0.92 },
      { opacity: 0.22, duration: 3.2, ease: "power2.inOut" },
      0.9
    );

    // 3a. Ornament lines retract first — like a closing ceremony
    tl.to(".logo-ornament",
      { scaleX: 0, opacity: 0, duration: 0.8, ease: "power2.in" },
      2.0
    );
    tl.to(".deco-line-left",
      { scaleX: 0, transformOrigin: "right center", duration: 0.9, ease: "power2.in" },
      2.1
    );
    tl.to(".deco-line-right",
      { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power2.in" },
      2.1
    );

    // 3b. Subtitle fades first — wisp of smoke dissolving
    tl.to(".intro-subtitle",
      {
        opacity: 0,
        y: -10,
        letterSpacing: "1.2em",
        filter: "blur(8px)",
        duration: 1.2,
        ease: "power3.in"
      },
      2.15
    );

    // 3c. Halo supernovas — blooms brilliant then collapses
    tl.to(".logo-halo",
      { scale: 1.8, opacity: 1, filter: "blur(50px)", duration: 0.6, ease: "power2.in" },
      2.4
    );
    tl.to(".logo-halo",
      { scale: 0.2, opacity: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
      3.0
    );

    // 3d. Logo ascends and dissolves into pure overexposed brilliance — the reverse of entry
    tl.to(".intro-logo",
      {
        opacity: 0,
        scale: 0.88,
        y: -36,
        filter: "blur(14px) brightness(2.8) saturate(0.2)",
        duration: 1.6,
        ease: "power3.in"
      },
      2.5
    );

    // 3e. The veil — a radial golden fade sweeps the entire intro layer away
    tl.to(".intro-layer",
      { opacity: 0, duration: 0.4, ease: "power1.in" },
      3.8
    );

    tl.fromTo(".pdp-final-content",
      { y: 52, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.18, duration: 2.2, ease: "power4.out" },
      3.2
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-[#0A0A0A] overflow-hidden select-none">

      {/* SVG FILTER DEFINITION */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="liquid-glass" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="150"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* 1. THE LIQUID GLASS LAYER (Z-10) */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-[#0A0A0A]">
        <img
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Treppan-Living-PRIVE-GeneralView.webp"
          className="pdp-hero-image absolute inset-0 w-full h-full object-cover origin-center will-change-transform"
          alt="Luxury Architecture"
          style={{ filter: "url(#liquid-glass)" }}
        />
        <div className="dark-overlay absolute inset-0 bg-[#050505] mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. INTRO LAYER (Z-20) */}
      <div className="intro-layer absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none">

        {/* Golden halo behind the logo */}
        <div
          className="logo-halo absolute opacity-0 will-change-transform"
          style={{
            width: "clamp(320px, 55vw, 700px)",
            height: "clamp(120px, 20vw, 260px)",
            background: "radial-gradient(ellipse at center, rgba(157,126,68,0.55) 0%, rgba(157,126,68,0.18) 45%, transparent 72%)",
            borderRadius: "50%",
          }}
        />

        {/* Tagline */}
        <div className="intro-subtitle flex items-center gap-6 mb-8 opacity-0 will-change-[letter-spacing,opacity,filter]">
          <div className="w-8 md:w-12 h-px bg-[#9D7E44]" />
          <p className="text-[9px] uppercase text-[#9D7E44] font-bold tracking-[0.2em]">The Art of Longevity</p>
          <div className="w-8 md:w-12 h-px bg-[#9D7E44]" />
        </div>

        {/* Logo */}
        <div
          className="intro-logo will-change-transform opacity-0 relative"
          style={{ width: "clamp(220px, 48vw, 580px)" }}
        >
          <img
            src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/FP-Logo-Light.png"
            alt="Fakhruddin"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Bottom ornament line beneath logo */}
        <div
          className="logo-ornament mt-7 opacity-0"
          style={{
            width: "clamp(60px, 12vw, 180px)",
            height: "1px",
            background: "linear-gradient(to right, transparent, #9D7E44 50%, transparent)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* 3. FINAL CONTENT LAYER (Z-30) */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-16 lg:p-20 text-[#F9F8F6] pointer-events-none">

        <div className="max-w-[1500px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 items-end gap-8 md:gap-16">

          {/* Left Title Block */}
          <div className="md:col-span-8">
            <div className="pdp-final-content opacity-0 mb-4 md:mb-6 flex items-center gap-4">
              <div className="w-8 h-[2px] bg-[#9D7E44]" />
              <p className="text-[9px] tracking-[0.5em] uppercase text-[#F9F8F6] font-bold">Dubai Islands</p>
            </div>

            {/* WRAPPER: Handles the GSAP opacity, blur, and slide-up animations */}
            <div className="pdp-final-content opacity-0">
              <img
                src={'https://projects.fakhruddinproperties.com/treppan-living-prive-svg2.svg'}
                alt="Tréppan Living Privé"
                // IMAGE: Handles the pure white conversion safely hidden from GSAP
                className="w-72 md:w-96 h-auto object-contain drop-shadow-2xl brightness-0 invert"
              />
            </div>
          </div>

          {/* Right CTA Block */}
          <div className="md:col-span-4 flex flex-col md:items-end gap-6 md:gap-8 pb-2 md:pb-4 pointer-events-auto">
            {/* Added opacity-0 here */}
            <p className="pdp-final-content opacity-0 text-xs md:text-sm text-[#F9F8F6]/60 leading-[2] font-light tracking-wide max-w-sm text-left md:text-right">
              The first carbon-neutral longevity living project in the region, designed to elevate how you live, breathe, and recover.
            </p>

            {/* Added opacity-0 here */}
            <div className="pdp-final-content opacity-0 w-full md:w-auto">
              <TransitionLink
                href="/treppan-living"
                className="text-sm tracking-widest uppercase hover:text-gray-400 transition-colors"
                data-cursor="Explore"
              >
                View Residences
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}