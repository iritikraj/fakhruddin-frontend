"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────
// SHARED: Bullet Row
// ─────────────────────────────────────────────────────────────
function BulletRow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 py-4 border-b group cursor-default
        ${light ? "border-[#F9F8F6]/10" : "border-[#1A1A1A]/8"}`}
    >
      <div
        className={`w-2 h-2 rounded-full shrink-0 transition-all duration-500 group-hover:scale-150 group-hover:ring-4
          ${light ? "bg-[#A19585] group-hover:ring-[#A19585]/20" : "bg-[#A19585] group-hover:ring-[#A19585]/20"}`}
      />
      <span
        className={`text-sm md:text-[15px] font-light leading-relaxed tracking-wide transition-colors duration-400
          ${light ? "text-[#F9F8F6]/65 group-hover:text-[#F9F8F6]" : "text-[#1A1A1A]/65 group-hover:text-[#1A1A1A]"}`}
      >
        {text}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".hero-bg",
      { scale: 1.12, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.4, ease: "power2.inOut" }
    )
      .fromTo(".hero-eyebrow",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
        "-=1.6"
      )
      .fromTo(".hero-title-word",
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.055, duration: 1.4 },
        "-=0.9"
      )
      .fromTo(".hero-sub-line",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
        "-=0.7"
      )
      .fromTo(".hero-scroll-hint",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.3"
      );

    // Subtle continuous Ken Burns
    gsap.to(".hero-bg img", {
      scale: 1.07, duration: 18, ease: "none", yoyo: true, repeat: -1,
    });
  }, { scope: ref });

  const titleWords = ["Wellness", "+", "Sustainability", "+", "Smart", "Living"];

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#090C14] flex items-end"
    >
      {/* Background */}
      <div className="hero-bg absolute inset-0 z-10 opacity-0 will-change-transform">
        <img
          src="images/Intelligent-Living-Tech.webp"
          alt="WellTech Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C14] via-[#090C14]/60 to-[#090C14]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C14]/75 via-[#090C14]/20 to-transparent" />
      </div>

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#A19585 1px,transparent 1px),linear-gradient(to bottom,#A19585 1px,transparent 1px)",
          backgroundSize: "110px 110px",
        }}
      />

      {/* Content */}
      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-8 md:px-20 pb-20 md:pb-28">
        <div className="hero-eyebrow opacity-0 flex items-center gap-5 mb-7">
          <div className="w-10 h-[1px] bg-[#A19585]" />
          <p className="text-[9px] tracking-[0.6em] uppercase text-[#A19585] font-bold">
            The Science of Living Well
          </p>
        </div>

        {/* Title — word by word overflow reveal */}
        <h1 className="font-serif text-[11vw] md:text-[7.5vw] lg:text-[6.2vw] leading-[1] tracking-tighter text-[#F9F8F6] mb-10 flex flex-wrap gap-x-[0.25em]">
          {titleWords.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block align-bottom">
              <span
                className={`hero-title-word inline-block ${word === "+" ? "text-[#A19585] font-light italic" : ""}`}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="max-w-xl flex flex-col gap-4">
          <p className="hero-sub-line opacity-0 text-sm md:text-base text-[#F9F8F6]/55 font-light leading-[1.9]">
            WellTech is our integrated approach to future living — combining sustainability, intelligent infrastructure, and advanced wellness solutions into one seamless residential ecosystem.
          </p>
          <p className="hero-sub-line opacity-0 text-base md:text-lg text-[#F9F8F6] font-serif italic">
            It's not an add-on. It's built into how you live every day.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint opacity-0 absolute bottom-10 right-10 md:right-20 z-30 flex flex-col items-center gap-2">
        <div className="w-[1px] h-16 bg-[#F9F8F6]/15 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-[45%] bg-[#A19585]"
            style={{ animation: "scrollDrop 2.2s ease-in-out infinite" }}
          />
        </div>
        <p className="text-[7px] tracking-[0.4em] uppercase text-[#F9F8F6]/25 mt-1">Scroll</p>
      </div>

      <style>{`
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — SUSTAINABLE LIVING, BUILT IN  (light bg, image right)
// ─────────────────────────────────────────────────────────────
function SustainableLiving() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".sl-title-word", {
      y: "110%", opacity: 0, stagger: 0.06, duration: 1.2, ease: "power4.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });
    gsap.from(".sl-eyebrow", {
      x: -20, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });
    gsap.from(".sl-bullet", {
      x: -24, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".sl-bullets", start: "top 82%" },
    });
    gsap.from(".sl-footer-text", {
      y: 20, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".sl-footer-text", start: "top 92%" },
    });
    gsap.fromTo(".sl-img-wrap",
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "expo.inOut",
        scrollTrigger: { trigger: ".sl-img-wrap", start: "top 80%" },
      }
    );
    gsap.fromTo(".sl-img-wrap img", { scale: 1.2 }, {
      scale: 1, duration: 1.9, ease: "power2.out",
      scrollTrigger: { trigger: ".sl-img-wrap", start: "top 80%" },
    });
    gsap.from(".sl-divider", {
      scaleX: 0, transformOrigin: "left", duration: 1.8, ease: "expo.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 84%" },
    });
    gsap.from(".sl-watermark", {
      x: 80, opacity: 0, duration: 1.6, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, { scope: ref });

  const bullets = [
    "Energy-efficient infrastructure",
    "Smart water and air management",
    "Responsible material choices",
    "Intelligent resource optimisation",
  ];

  return (
    <section ref={ref} className="bg-[#F9F8F6] text-[#1A1A1A] py-28 md:py-44 overflow-hidden relative">

      {/* Watermark */}
      <div className="sl-watermark absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[22vw] leading-none text-[#1A1A1A]/[0.03] select-none pointer-events-none pr-6 z-0">
        01
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-20">
        <div className="sl-divider w-full h-[1px] bg-[#1A1A1A]/10 mb-16 md:mb-24" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* LEFT — Content */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            <div className="sl-eyebrow flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#A19585]" />
              <p className="text-[9px] tracking-[0.5em] uppercase text-[#A19585] font-bold">
                01 / Sustainability
              </p>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] tracking-tight leading-[1.05] mb-12 flex flex-wrap gap-x-[0.22em]">
              {["Sustainable", "Living,", "Built", "In"].map((w, i) => (
                <span key={i} className="overflow-hidden inline-block align-bottom">
                  <span className="sl-title-word inline-block">{w}</span>
                </span>
              ))}
            </h2>

            <div className="sl-bullets flex flex-col mb-10">
              {bullets.map((b, i) => (
                <div key={i} className="sl-bullet"><BulletRow text={b} /></div>
              ))}
            </div>

            <p className="sl-footer-text text-sm text-[#1A1A1A]/50 font-light italic leading-relaxed max-w-sm">
              Sustainability here works quietly in the background, enhancing both the planet and your lifestyle.
            </p>
          </div>

          {/* RIGHT — Image */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            {/* Offset accent border */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-[#A19585]/20 rounded-sm pointer-events-none z-0" />
            <div className="sl-img-wrap relative w-full aspect-[4/3] overflow-hidden rounded-sm z-10 bg-[#E8E4DF]">
              <img
                src="images/Pure-Water.webp"
                alt="Sustainable Living — Pure Water"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#A19585]/10 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — ADVANCED WELLNESS INTEGRATION  (dark bg, image left)
// ─────────────────────────────────────────────────────────────
function AdvancedWellness() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".aw-img-wrap",
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut",
        scrollTrigger: { trigger: ".aw-img-wrap", start: "top 80%" },
      }
    );
    gsap.fromTo(".aw-img-wrap img", { scale: 1.25 }, {
      scale: 1, duration: 2, ease: "power2.out",
      scrollTrigger: { trigger: ".aw-img-wrap", start: "top 80%" },
    });
    gsap.from(".aw-title-word", {
      y: "110%", opacity: 0, stagger: 0.07, duration: 1.3, ease: "power4.out",
      scrollTrigger: { trigger: ".aw-content", start: "top 78%" },
    });
    gsap.from(".aw-eyebrow", {
      x: 20, opacity: 0, duration: 1,
      scrollTrigger: { trigger: ".aw-content", start: "top 78%" },
    });
    gsap.from(".aw-bullet", {
      x: 28, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".aw-bullets", start: "top 80%" },
    });
    gsap.from(".aw-footer-text", {
      y: 20, opacity: 0, duration: 1,
      scrollTrigger: { trigger: ".aw-footer-text", start: "top 92%" },
    });
    gsap.from(".aw-accent-line", {
      scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "expo.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
    gsap.from(".aw-watermark", {
      x: -60, opacity: 0, duration: 1.5, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
  }, { scope: ref });

  const bullets = [
    "Cryotherapy Recovery Zones",
    "Hyperbaric Oxygen Therapy",
    "Infrared and Red-Light Therapy",
    "Hot and Cold Plunge Experiences",
    "Flotation Therapy Environments",
  ];

  return (
    <section ref={ref} className="bg-[#0D1120] text-[#F9F8F6] py-28 md:py-44 overflow-hidden relative">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#A19585 1px,transparent 1px),linear-gradient(to bottom,#A19585 1px,transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Watermark */}
      <div className="aw-watermark absolute left-0 top-1/2 -translate-y-1/2 font-serif text-[22vw] leading-none text-[#F9F8F6]/[0.025] select-none pointer-events-none pl-6 z-0">
        02
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* LEFT — Image */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="aw-accent-line absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#A19585] via-[#A19585]/30 to-transparent" />
            <div className="aw-img-wrap relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-[#1A1F2E]">
              <img
                src="images/Advanced-Wellness-Integration.webp"
                alt="Advanced Wellness Integration"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1120]/55 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#A19585]/8 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="aw-content lg:col-span-7 flex flex-col order-1 lg:order-2">
            <div className="aw-eyebrow flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#A19585]" />
              <p className="text-[9px] tracking-[0.5em] uppercase text-[#A19585] font-bold">
                02 / Advanced Wellness
              </p>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] tracking-tight leading-[1.05] mb-12 flex flex-wrap gap-x-[0.22em]">
              {["Advanced", "Wellness", "Integration"].map((w, i) => (
                <span key={i} className="overflow-hidden inline-block align-bottom">
                  <span className="aw-title-word inline-block">{w}</span>
                </span>
              ))}
            </h2>

            <div className="aw-bullets flex flex-col mb-10">
              {bullets.map((b, i) => (
                <div key={i} className="aw-bullet"><BulletRow text={b} light /></div>
              ))}
            </div>

            <p className="aw-footer-text text-sm text-[#F9F8F6]/40 font-light italic leading-relaxed max-w-md">
              These are not occasional amenities. They're part of everyday living.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — TWIN CARDS  (light bg)
// ─────────────────────────────────────────────────────────────
function TwinCards() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".tc-eyebrow", {
      y: 20, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
    gsap.from(".tc-card", {
      y: 70, opacity: 0, stagger: 0.2, duration: 1.4, ease: "power3.out",
      scrollTrigger: { trigger: ".tc-grid", start: "top 78%" },
    });
    gsap.from(".tc-bullet", {
      x: -18, opacity: 0, stagger: 0.06, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".tc-grid", start: "top 72%" },
    });
    gsap.from(".tc-divider", {
      scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "expo.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 84%" },
    });
    gsap.from(".tc-watermark", {
      scale: 0.8, opacity: 0, duration: 1.5,
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, { scope: ref });

  const cards = [
    {
      num: "03",
      label: "Intelligent Systems",
      title: "Intelligent Living Systems",
      subtitle: "Technology connects everything seamlessly:",
      bullets: [
        "AI-enabled home environments",
        "Predictive maintenance insights",
        "Wellness data integration",
        "Community connectivity platforms",
      ],
      footer: "The goal is simple: smarter living with less effort.",
      dark: false,
      img: "images/Airocide.webp",
    },
    {
      num: "04",
      label: "Indoor Environments",
      title: "Healthier Indoor Environments",
      subtitle: null,
      bullets: [
        "Enhanced air quality systems",
        "Mineralised and purified water solutions",
        "Climate-optimised interiors",
        "Natural light optimisation",
      ],
      footer: "Because wellness starts where you spend the most time.",
      dark: true,
      img: "images/indoor_herbs.webp",
    },
  ];

  return (
    <section ref={ref} className="bg-[#F9F8F6] py-28 md:py-44 overflow-hidden relative">

      {/* Watermark */}
      <div className="tc-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[26vw] leading-none text-[#1A1A1A]/[0.022] select-none pointer-events-none z-0">
        03
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-20">
        <div className="tc-divider w-full h-[1px] bg-[#1A1A1A]/10 mb-14 md:mb-20" />

        <div className="tc-eyebrow flex items-center gap-4 mb-14 md:mb-20">
          <div className="w-8 h-[1px] bg-[#A19585]" />
          <p className="text-[9px] tracking-[0.55em] uppercase text-[#A19585] font-bold">
            The Full System
          </p>
        </div>

        <div className="tc-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.map((card, ci) => (
            <div
              key={ci}
              className={`tc-card group relative overflow-hidden rounded-sm flex flex-col
                ${card.dark ? "bg-[#0D1120] text-[#F9F8F6]" : "bg-[#F0EDE8] text-[#1A1A1A]"}`}
            >
              {/* Top image strip */}
              <div className="relative w-full aspect-[16/7] overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className={`w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105
                    ${card.dark ? "opacity-55 mix-blend-luminosity" : "opacity-65 grayscale-[0.25]"}`}
                />
                <div
                  className={`absolute inset-0 ${card.dark
                    ? "bg-gradient-to-t from-[#0D1120] via-[#0D1120]/5 to-transparent"
                    : "bg-gradient-to-t from-[#F0EDE8] via-[#F0EDE8]/5 to-transparent"
                    }`}
                />
                {/* Number badge top-right */}
                <div className="absolute top-6 right-7">
                  <span className={`font-serif italic text-5xl select-none
                    ${card.dark ? "text-[#F9F8F6]/12" : "text-[#1A1A1A]/10"}`}>
                    {card.num}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-6 p-8 md:p-10 flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-[1px] bg-[#A19585]" />
                  <p className="text-[8px] tracking-[0.45em] uppercase font-bold text-[#A19585]">
                    {card.label}
                  </p>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl lg:text-[2.1rem] tracking-tight leading-[1.1]">
                  {card.title}
                </h3>

                {card.subtitle && (
                  <p className={`text-sm font-light italic ${card.dark ? "text-[#F9F8F6]/45" : "text-[#1A1A1A]/45"}`}>
                    {card.subtitle}
                  </p>
                )}

                <div className="flex flex-col">
                  {card.bullets.map((b, bi) => (
                    <div key={bi} className="tc-bullet">
                      <BulletRow text={b} light={card.dark} />
                    </div>
                  ))}
                </div>

                <p className={`text-sm font-light italic mt-auto pt-2 ${card.dark ? "text-[#F9F8F6]/38" : "text-[#1A1A1A]/48"}`}>
                  {card.footer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — WHY WELLTECH MATTERS  (dark CTA)
// ─────────────────────────────────────────────────────────────
function WhyWellTech() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".wwt-bg",
      { scale: 1.14, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 2.2, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      }
    );
    // Parallax scroll on bg
    gsap.to(".wwt-bg img", {
      y: "14%", ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom", end: "bottom top", scrub: true,
      },
    });
    gsap.from(".wwt-content", {
      y: 55, opacity: 0, stagger: 0.14, duration: 1.5, ease: "power3.out",
      scrollTrigger: { trigger: ".wwt-inner", start: "top 78%" },
    });
    gsap.from(".wwt-title-word", {
      y: "110%", opacity: 0, stagger: 0.07, duration: 1.4, ease: "power4.out",
      scrollTrigger: { trigger: ".wwt-inner", start: "top 80%" },
    });
    gsap.from(".wwt-ring", {
      scale: 0.4, opacity: 0, duration: 2.2, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
    gsap.from(".wwt-ring-2", {
      scale: 0.5, opacity: 0, duration: 2.4, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative bg-[#090C14] overflow-hidden py-40 md:py-56 text-[#F9F8F6]">

      {/* Parallax background */}
      <div className="wwt-bg absolute inset-0 z-0 opacity-0 overflow-hidden">
        <img
          src="images/Advanced-Wellness-Integration.webp"
          alt="Why WellTech"
          className="w-full h-full object-cover opacity-25 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C14] via-[#090C14]/65 to-[#090C14]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C14]/60 via-transparent to-[#090C14]/60" />
      </div>

      {/* Concentric decorative rings */}
      <div className="wwt-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] max-w-[950px] max-h-[950px] rounded-full border border-[#A19585]/10 pointer-events-none z-10" />
      <div className="wwt-ring-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52vw] h-[52vw] max-w-[660px] max-h-[660px] rounded-full border border-[#A19585]/6 pointer-events-none z-10" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right,#A19585 1px,transparent 1px),linear-gradient(to bottom,#A19585 1px,transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="wwt-inner relative z-20 max-w-[1000px] mx-auto px-8 md:px-20 text-center">

        <div className="wwt-content flex items-center justify-center gap-5 mb-10">
          <div className="w-10 h-[1px] bg-[#A19585]" />
          <p className="text-[9px] tracking-[0.6em] uppercase text-[#A19585] font-bold">
            The Philosophy
          </p>
          <div className="w-10 h-[1px] bg-[#A19585]" />
        </div>

        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.02] mb-10 flex flex-wrap justify-center gap-x-[0.25em]">
          {["Why", "WellTech", "Matters"].map((w, i) => (
            <span key={i} className="overflow-hidden inline-block align-bottom">
              <span className={`wwt-title-word inline-block ${i === 1 ? "italic text-[#A19585]" : ""}`}>
                {w}
              </span>
            </span>
          ))}
        </h2>

        <div className="wwt-content w-16 h-[1px] bg-[#A19585]/40 mx-auto mb-10" />

        <p className="wwt-content text-base md:text-lg text-[#F9F8F6]/52 font-light leading-[1.9] mb-6 max-w-2xl mx-auto">
          Modern living demands more than luxury. It requires balance — between comfort, sustainability, health, and technology.
        </p>

        <p className="wwt-content text-base md:text-xl text-[#F9F8F6] font-serif italic leading-relaxed">
          WellTech brings these elements together into one cohesive living philosophy.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────
export default function WellTechPage() {
  return (
    <main className="bg-black">
      <Navbar />
      
        <Hero />
        <SustainableLiving />
        <AdvancedWellness />
        <TwinCards />
        <WhyWellTech />
      
      <Footer />
    </main>
  );
}
