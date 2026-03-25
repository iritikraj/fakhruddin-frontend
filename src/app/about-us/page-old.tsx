"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const AWARD_CARDS = [
  {
    id: 1,
    tag: "Initiative", 
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/Our-Story-02.jpg",
    title: "Dubai Land Department \u2013 SHE Pioneers Initiative",    
    desc: "Participation and sponsorship of the SHE Pioneers programme by Dubai Land Department, supporting women's growing impact in real estate and initiatives promoting inclusivity and industry advancement.",
  },
  {
    id: 2,
    tag: "2024",
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/Our-Story-04.jpg",
    title: "Gulf Business \u2013 Sustainable Project of the Year",    
    desc: "Awarded by Gulf Business at the Game Changer: UAE Real Estate Outlook for Treppan Tower (Jumeirah Village Triangle), recognising excellence in sustainable development and forward-thinking residential design.",
  },
  {
    id: 3,
    tag: "Jan\u2013Mar 2024",
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/Our-Story-06.jpg",
    title: "REM Times Industry Feature",
    desc: "Recognised by REM Times with an editorial cover for pioneering sustainability-focused developments, AI-enabled living infrastructure, and progressive real estate initiatives.",
  },
  {
    id: 4,
    tag: "Leadership Insight",
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/Our-Story-07.jpg",
    title: "Gulf Business Feature",
    desc: "Our CEO, Yousuf Fakhruddin featured in Gulf Business discussing integrated urban ecosystems, sustainable city planning, and forward-looking real estate innovation shaping future communities.",
  },
  {
    id: 5,
    tag: "2025",
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/Our-Story-08.jpg",
    title: "Forbes Middle East \u2013 Most Impactful Real Estate Leaders",
    desc: "Our CEO, Yousuf Fakhruddin, recognised by Forbes Middle East among Most Impactful Real Estate Leaders for his leadership impact, innovation-driven developments, and contributions shaping modern real estate towards sustainability and wellness.",
  },
];

const AWARDS_YEARS = [
  {
    year: "2025",
    awards: ["Gulf Business — Game Changer Award", "Climate Control — Rain Resilience Award", "Forbes ME — Most Impactful Real Estate Leaders"],
  },
  {
    year: "2024",
    awards: ["Green Developer of the Year", "Pillars of Real Estate Awards", "Sustainable Project of the Year — Tréppan Tower", "Best Sustainable Residential Development in Dubai", "Gold — Best Sustainability Initiative of the Year", "Best Single Apartment / Condominium in Dubai", "Gulf Business — Sustainable Project of the Year", "Asia One — UAE's Greatest Brands", "Asia One — UAE's Greatest Leaders"],
  },
  {
    year: "2023",
    awards: ["Green Building Award", "Key Contributor to the Real Estate Industry Award", "ADDA Rise High Awards", "DLD — SHE Pioneers Initiative"],
  },
  {
    year: "2022",
    awards: ["Green Building Product of the Year", "Climate Control Award", "Gulf Business Sustainability Company"],
  },
];

// ─────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll-driven zoom + fade (same as WellTech)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    tl.to(imageRef.current, { scale: 1.4, opacity: 0.3, ease: "power2.inOut" })
      .to(contentRef.current, { opacity: 0, y: -80, ease: "power2.inOut" }, 0);

    // Entrance
    gsap.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, delay: 0.2, ease: "power3.out" }
    );
    gsap.fromTo(lineRef.current,
      { width: 0, opacity: 0 },
      { width: 96, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      <img
        ref={imageRef}
        src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/LakeCentralHQ.jpg"
        alt="About Us Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Progress bar top */}
      <div className="absolute top-0 left-0 z-20 w-full h-[2px] bg-white/10">
        <div className="h-full bg-[#A19585]" style={{ width: "100%" }} />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-end px-8 md:px-16 lg:px-24 pb-24"
      >
        <div className="max-w-3xl">
          <p ref={subtitleRef} className="text-[#A19585] text-xs sm:text-sm tracking-[0.3em] mb-4 uppercase opacity-0">
            About Us
          </p>
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.92] opacity-0 font-marcellus font-light"
            style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
          >
            Beyond Today,<br />
            <span className="text-[#A19585]">by Design.</span>
          </h1>
          <div ref={lineRef} className="w-24 h-[2px] bg-[#A19585] mt-8 mb-6 opacity-0" />
          <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
            Born from a 60-year legacy of entrepreneurship. Built on the belief that
            architecture should enhance life — not merely contain it.
          </p>

          {/* Anchor links */}
          <div className="flex gap-8 mt-8 flex-wrap">
            {["Our Story", "Philosophy", "Team", "Awards"].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white/40 text-xs tracking-[0.35em] uppercase hover:text-[#A19585] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-12 z-20 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#A19585] to-transparent animate-pulse" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// OUR STORY
// ─────────────────────────────────────────────────────────────
function OurStory() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Parallax image
    gsap.to(imageRef.current, {
      y: "25%",
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Content slide in
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: 80 },
      {
        opacity: 1, x: 0, duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=100", end: "top center", scrub: 1 },
      }
    );

    // Stats stagger
    gsap.fromTo(statsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ref.current, start: "top center", end: "center center", scrub: 1 },
      }
    );
  }, { scope: ref });

  return (
    <section id="our-story" ref={ref} className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Full-bleed parallax image - left half */}
      <div ref={imageRef} className="absolute left-0 top-0 w-full md:w-1/2 h-[130%]">
        <img
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/3.jpg"
          alt="Our Story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white md:via-transparent md:to-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
      </div>

      {/* Oversized year watermark */}
      <div className="absolute bottom-10 left-4 md:left-8 pointer-events-none select-none z-0">
        <span
          className="text-[18vw] leading-none text-black/[0.04]"
          style={{ fontWeight: 300, letterSpacing: "-0.04em" }}
        >
          1963
        </span>
      </div>

      {/* Content — right side */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex items-center justify-end px-6 md:px-16 lg:px-24">
        <div className="w-full md:w-[55%] lg:w-[50%] py-24 md:py-32">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-6">Our Story</span>

          <h2 className="font-marcellus font-light text-4xl md:text-5xl lg:text-6xl text-[#1b2946] leading-tight mb-8" style={{ fontWeight: 300 }}>
            A Vision<br />
            <span className="text-[#A19585]">Built to Endure.</span>
          </h2>

          <div className="w-16 h-[2px] bg-[#A19585] mb-8" />

          <div className="space-y-5 text-[#1b2946]/65 text-[15px] leading-relaxed mb-12">
            <p>
              It began as a vision in 2003 — a quiet pursuit to reimagine what real estate could mean for the people who live within it. Born from the enduring legacy of Fakhruddin Holdings, founded in 1963, Fakhruddin Properties carries forward a tradition rooted in entrepreneurship, integrity, and a deep sense of community.
            </p>
            <p>
              What started as structures soon became stories of trust, of purpose, of homes that nurture as much as they impress. Every space we build is shaped by a belief that architecture should do more than occupy land — it should enhance life, foster connection, and leave the world a little better than it was found.
            </p>
            <p>
              Today, with a presence spanning the UAE, the UK, and Uganda, Fakhruddin Properties continues to evolve — guided by the same principles that began it all: innovation grounded in responsibility, sustainability shaped by soul, and design that places people at its heart.
            </p>
            <p className="italic text-[#1b2946]/40">
              This is not just our story. It is the quiet unfolding of a vision — one built to endure.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 border-t border-black/8 pt-8">
            {[
              { v: "60+", l: "Years of Legacy" },
              { v: "20+", l: "Industry Awards" },
              { v: "60%", l: "Carbon Footprint Reduced" },
              { v: "AED 120M", l: "Invested in Wellness Living" },
            ].map((s, i) => (
              <div
                key={i}
                ref={(el) => { statsRef.current[i] = el; }}
                className="group"
              >
                <div
                  className="text-3xl md:text-4xl text-[#A19585] group-hover:scale-105 transition-transform duration-300"
                  style={{ fontWeight: 300 }}
                >
                  {s.v}
                </div>
                <div className="text-[#1b2946]/50 text-xs tracking-[0.25em] uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PHILOSOPHY SECTION
// ─────────────────────────────────────────────────────────────
function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(imageRef.current, {
      scale: 1.15,
      opacity: 0.6,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150", end: "top center", scrub: 1 },
      }
    );

    // Pillar cards stagger
    gsap.fromTo(".ph-pillar",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ph-pillars", start: "top bottom-=100", end: "top center", scrub: 1 },
      }
    );
  }, { scope: ref });

  const pillars = [
    {
      n: "01",
      title: "Human-First Residences",
      body: "Every line we draw begins with a question: how will people live here? Our residential communities are designed for movement, wellness, and moments of meaning.",
    },
    {
      n: "02",
      title: "Design with Purpose",
      body: "Our developments blend place-making, environmental integrity, and social responsibility — leaving a legacy that is both lived in and looked up to.",
    },
    {
      n: "03",
      title: "Design that Moves You",
      body: "We design spaces that respond to the rhythms of everyday life. Every curve, material, and corridor is guided by one question: how will this make someone feel?",
    },
  ];

  return (
    <section id="philosophy" ref={ref} className="relative w-full min-h-screen bg-[#100F2B] overflow-hidden">
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%]">
        <img
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/LakeCentralHQ.jpg"
          alt="Philosophy"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#100F2B]/70 via-[#100F2B]/50 to-[#100F2B]" />
      </div>

      {/* Animated rings (same as WellTech) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
          <div className="absolute inset-0 border border-[#A19585]/10 rounded-full animate-ping" style={{ animationDuration: "5s" }} />
          <div className="absolute inset-[12%] border border-[#A19585]/15 rounded-full animate-spin" style={{ animationDuration: "12s" }} />
          <div className="absolute inset-[25%] border border-[#A19585]/20 rounded-full animate-pulse" />
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-32">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#A19585]" />
            <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase">The Fakhruddin Philosophy</span>
          </div>
          <h2
            className="font-marcellus font-light text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
            style={{ fontWeight: 300 }}
          >
            Multidisciplinary<br />
            <span className="text-[#A19585]">by Design.</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg mt-6 leading-relaxed">
            Our strength lies not just in what we build, but in how we think together.
            Architects, engineers, designers, technologists, and sustainability visionaries
            unite under one purpose — to craft living spaces that feel as intelligent as they look.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="ph-pillars grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/5">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="ph-pillar group relative bg-[#100F2B] p-8 md:p-10 hover:bg-white/5 transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#A19585] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              <div className="text-[#A19585]/30 text-5xl mb-6 group-hover:text-[#A19585]/60 transition-colors duration-400" style={{ fontWeight: 300 }}>
                {p.n}
              </div>
              <h3 className="text-white text-xl md:text-2xl mb-4 group-hover:text-[#A19585] transition-colors duration-400" style={{ fontWeight: 300 }}>
                {p.title}
              </h3>
              <div className="w-8 h-[1px] bg-[#A19585]/40 group-hover:w-14 transition-all duration-500 mb-4" />
              <p className="text-white/45 text-sm leading-relaxed group-hover:text-white/65 transition-colors duration-400">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mt-16 border-l-2 border-[#A19585]/40 pl-6 max-w-2xl">
          <p className="text-white/35 text-base md:text-lg italic leading-relaxed" style={{ fontWeight: 300 }}>
            It is in this harmony of disciplines that we create places with quiet permanence
            — spaces that breathe, move, and belong.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// MANAGEMENT TEAM — Editorial split: left text column, right staggered portraits
// Name + role always visible. No hover required to see identity.
// ─────────────────────────────────────────────────────────────
function ManagementTeam() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".team-heading",
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
    // Left column text lines stagger
    gsap.fromTo(".team-left-line",
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".team-left", start: "top bottom-=120" },
      }
    );
    // Portrait cards cascade in
    gsap.fromTo(".team-portrait",
      { y: 70, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.18, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: ".team-right", start: "top bottom-=80" },
      }
    );
    // Stats
    gsap.fromTo(".team-stat",
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".team-stats", start: "top bottom-=100" },
      }
    );
  }, { scope: ref });

  const leaders = [
    {
      name: "Yousuf Fakhruddin",
      nameLines: ["Yousuf", "Fakhruddin"],
      role: "Chief Executive Officer",
      img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Yousuf-Fakhruddin-CEO.webp",
      index: "01",
    },
    {
      name: "Fatema Yousuf Fakhruddin",
      nameLines: ["Fatema Yousuf", "Fakhruddin"],
      role: "Chief Operating Officer",
      img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Fatema-Fakhruddin-COO.webp",
      index: "02",
    },
  ];

  return (
    <section id="team" ref={ref} className="relative w-full bg-white overflow-hidden">

      {/* ── TOP BAND: dark header strip ── */}
      <div className="bg-[#ffffff] px-6 md:px-16 lg:px-24 pt-12 md:pt-20">
        <div className="team-heading max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#A19585] text-xs tracking-[0.4em] uppercase block mb-5">Management Team</span>
            <h2 className="font-marcellus font-light text-[#1b2946] text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ fontWeight: 300 }}>
              The Team Behind<br />
              <span className="text-[#A19585]">the Scenes.</span>
            </h2>
          </div>
          <p className="text-[#1b2946]/50 text-sm max-w-xs leading-relaxed pb-4">
            Visionaries who have turned a 60-year legacy into a living philosophy.
          </p>
        </div>
      </div>
      

      {/* ── MAIN LAYOUT: left meta column + right staggered portraits ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* LEFT COLUMN — index numbers + labels, vertically centred */}
          <div className="team-left hidden lg:flex lg:col-span-3 flex-col justify-center gap-12 py-20 border-r border-black/6 pr-10">
            {leaders.map((l, i) => (
              <div key={i} className="team-left-line flex flex-col gap-3">
                {/* Big index */}
                <span
                  className="text-[5rem] leading-none text-[#A19585]/15 select-none"
                  style={{ fontWeight: 300 }}
                >
                  {l.index}
                </span>
                {/* Divider */}
                <div className="w-10 h-[1px] bg-[#A19585]/40" />
                {/* Name stacked */}
                <div>
                  {l.nameLines.map((line, li) => (
                    <p
                      key={li}
                      className="text-[#1b2946] text-xl leading-snug"
                      style={{ fontWeight: 300 }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <p className="text-[#A19585] text-[9px] tracking-[0.45em] uppercase">
                  {l.role}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT — staggered offset portraits, no grid box, pure editorial */}
          <div className="team-right lg:col-span-9 lg:pl-12 flex flex-col md:flex-row gap-0 items-end py-0 md:py-12">
            {leaders.map((l, i) => (
              <div
                key={i}
                className="team-portrait group relative flex-1 cursor-default"
                style={{
                  /* Second card is offset upward to break the grid */
                  marginTop: i === 1 ? "0" : "0",
                  zIndex: i === 0 ? 2 : 1,
                }}
              >
                {/* Portrait image — tall, slight overlap via negative margin on desktop */}
                <div
                  className={`relative overflow-hidden bg-[#1a1a2e] ${i === 0 ? "md:-mr-6 mr-0" : ""}`}
                  style={{
                    aspectRatio: "1/1",
                    marginTop: i === 1 ? "48px" : "0",
                  }}
                >
                  <img
                    src={l.img}
                    alt={l.name}
                    className="w-full h-full object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.04]"
                  />
                  {/* Permanent gradient — name always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Hover accent top */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#A19585] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  {/* Name + role ALWAYS at bottom — no hover required */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    {/* Animated accent line */}
                    <div className="w-6 h-[1px] bg-[#A19585] group-hover:w-12 transition-all duration-500 mb-4" />
                    <h3
                      className="text-white leading-tight mb-1"
                      style={{
                        fontWeight: 300,
                        letterSpacing: "-0.01em",
                        fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
                      }}
                    >
                      {l.name}
                    </h3>
                    <p className="text-[#A19585] text-[9px] tracking-[0.45em] uppercase">
                      {l.role}
                    </p>
                  </div>

                  {/* Mobile: show index badge */}
                  <div className="absolute top-5 left-5 lg:hidden">
                    <span className="text-white/25 text-xs tracking-[0.3em]">{l.index}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS BAND ── */}
      <div className="team-stats grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-black/6 border-t border-black/6">
        {[
          { v: "20+",      l: "Years of Purposeful Development" },
          { v: "60%",      l: "Carbon Footprint Reduced Across Projects" },
          { v: "AED 120M", l: "Invested in Wellness-Focused Living" },
        ].map((s, i) => (
          <div
            key={i}
            className="team-stat group bg-white hover:bg-[#F9F8F6] transition-colors duration-400 px-10 py-10"
          >
            <div
              className="text-3xl md:text-4xl text-[#A19585] group-hover:scale-105 transition-transform duration-300 mb-2"
              style={{ fontWeight: 300 }}
            >
              {s.v}
            </div>
            <div className="text-[#1b2946]/45 text-xs tracking-[0.25em] uppercase leading-relaxed">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// AWARD POPUP — image left, content right (per screenshot)
// ─────────────────────────────────────────────────────────────
interface AwardPopupProps {
  award: typeof AWARD_CARDS[0] | null;
  onClose: () => void;
}

function AwardPopup({ award, onClose }: AwardPopupProps) {
  if (!award) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal — image LEFT, content RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl bg-white overflow-hidden flex flex-col md:flex-row"
          style={{ minHeight: "340px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left — square image 1:1 */}
          <div className="relative w-full md:w-[50%] flex-shrink-0 aspect-square md:aspect-auto overflow-hidden bg-[#100F2B]">
            <img
              src={award.img}
              alt={award.title}
              className="w-full h-full object-cover"
            />
            {/* Year badge bottom-left over image */}            
          </div>

          {/* Right — content */}
          <div className="flex flex-col justify-between p-7 md:p-8 flex-1">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#A19585]" />

            <div>
              <div className="bg-[#A08040]/15 backdrop-blur-sm px-3 py-1.5 mb-4 w-fit border border-[#A08040]/40 rounded-full">
                <span className="text-[#A19585] tracking-[0.2em] uppercase text-sm">
                  {award.tag}
                </span>
              </div>
              <h3
                className="text-[#1b2946] text-xl md:text-2xl leading-tight mb-4"
                style={{ fontWeight: 300 }}
              >
                {award.title}
              </h3>
              <div className="w-8 h-[2px] bg-[#A19585] mb-5" />
              <p className="text-[#1b2946]/70 text-md leading-relaxed">
                {award.desc}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="mt-8 w-full py-3.5 border border-[#1b2946]/12 text-[#1b2946]/40 text-[9px] tracking-[0.4em] uppercase hover:bg-[#100F2B] hover:text-white hover:border-[#100F2B] transition-all duration-400"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// AWARDS — Framer-motion infinite marquee (like CommunitiesSection)
// ─────────────────────────────────────────────────────────────
function Awards() {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedAward, setSelectedAward] = useState<typeof AWARD_CARDS[0] | null>(null);

  // Quadruple cards for seamless infinite loop
  const infiniteCards = [...AWARD_CARDS, ...AWARD_CARDS, ...AWARD_CARDS, ...AWARD_CARDS];

  useGSAP(() => {
    gsap.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
    gsap.fromTo(".awards-year-col",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".awards-year-grid", start: "top bottom-=100" },
      }
    );
  }, { scope: ref });

  return (
    <section id="awards" ref={ref} className="relative w-full bg-[#100F2B] overflow-hidden py-24 md:py-36">

      {/* Background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A19585] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A19585] rounded-full blur-[120px]" />
      </div>

      {/* ── Header ── */}
      <div ref={titleRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-[2px] bg-[#A19585]" />
              <span className="text-[#A19585] text-xs tracking-[0.4em] uppercase">Awards & Recognition</span>
            </div>
            <h2
              className="font-marcellus font-light text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
              style={{ fontWeight: 300 }}
            >
              Industry Recognition,<br />
              <span className="text-[#A19585]">Year by Year.</span>
            </h2>
          </div>
          <p className="text-white/35 text-sm max-w-xs leading-relaxed">
            Click any award card to view details.
          </p>
        </div>
      </div>

      {/* ── Infinite Marquee (CommunitiesSection pattern) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="relative z-10 w-full py-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              // ── MARQUEE SPEED ──────────────────────────────────────────
              // Increase the number to make it slower, decrease to speed it up.
              // On hover the duration jumps to 200 (effectively paused).
              // Normal scroll speed: 70 seconds for one full loop.
              // ──────────────────────────────────────────────────────────
              duration: isHovered ? 300 : 200,
              ease: "linear",
            },
          }}
          className="flex gap-5 w-max px-4"
        >
          {infiniteCards.map((award, index) => (
            <div
              key={`award-${award.id}-${index}`}
              className="w-[400px] md:w-[400px] flex-shrink-0 cursor-pointer"
              onClick={() => setSelectedAward(award)}
            >
              {/* Card — square 1:1 ratio, image only */}
              <div className="group relative aspect-square overflow-hidden bg-[#1a1940]">
                <img
                  src={award.img}
                  alt={award.title}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Click hint bottom */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="w-5 h-[1px] bg-[#A19585] group-hover:w-10 transition-all duration-400 mb-3" />
                  <p className="text-white/0 group-hover:text-white/50 text-[10px] tracking-[0.3em] uppercase transition-all duration-400">
                    View Details
                  </p>
                </div>

                {/* Tap ripple indicator */}
                <div className="absolute top-4 right-4 w-7 h-7 border border-white/20 flex items-center justify-center group-hover:border-[#A19585] transition-colors duration-400">
                  <span className="text-white/40 group-hover:text-[#A19585] text-xs transition-colors duration-400">+</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#100F2B] to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#100F2B] to-transparent pointer-events-none z-20" />
      </motion.div>

      {/* ── Awards by Year (list) ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 mt-20">
        <div className="w-full h-[1px] bg-white/8 mb-14" />
        <div className="awards-year-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {AWARDS_YEARS.map((yr, i) => (
            <div key={i} className="awards-year-col">
              <div className="text-[#A19585]/50 text-[4rem] leading-none mb-4 select-none" style={{ fontWeight: 300 }}>
                {yr.year}
              </div>
              <div className="w-full h-[2px] bg-white/10 mb-4" />
              <ul className="space-y-0">
                {yr.awards.map((award, ai) => (
                  <li
                    key={ai}
                    className="text-white/45 text-[14px] leading-relaxed py-2.5 border-b border-white/5 hover:text-white/75 hover:pl-2 transition-all duration-300 cursor-default"
                  >
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Award Popup */}
      <AnimatePresence>
        {selectedAward && (
          <AwardPopup award={selectedAward} onClose={() => setSelectedAward(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CLOSING CTA — two-column: content left, CTAs right
// ─────────────────────────────────────────────────────────────
function Closing() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(imageRef.current, {
      scale: 1.1,
      ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
    });
    gsap.fromTo(".closing-left",
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
    gsap.fromTo(".closing-right",
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full bg-white overflow-hidden">
      {/* Subtle background texture */}
      <img
        ref={imageRef}
        src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/bg@2x1.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
      {/* Left-to-right gradient to keep layout clean */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/35 to-white/30" />


      {/* Accent top border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A19585] via-[#A19585]/50 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — headline + body */}
          <div className="closing-left">
            <span className="text-[#A19585] text-xs tracking-[0.4em] uppercase block mb-6">Begin Here</span>
            <h2
              className="font-marcellus font-light text-4xl md:text-5xl lg:text-6xl text-[#1b2946] leading-tight mb-6"
              style={{ fontWeight: 300 }}
            >
              This is not<br />
              <span className="text-[#A19585]">just our story.</span>
            </h2>
            <div className="w-14 h-[2px] bg-[#A19585] mb-6" />
            <p className="text-[#1b2946]/50 text-base leading-relaxed max-w-md">
              It is the quiet unfolding of a vision — one built to endure.
              Explore our projects, discover our philosophy, or connect with our team.
            </p>
          </div>

          {/* RIGHT — CTA stack */}
          <div className="closing-right flex flex-col gap-4 lg:items-end">
            {/* Primary CTA */}
            <Link
              href="/projects"
              className="group relative w-full lg:w-auto inline-flex items-center justify-between gap-8 bg-[#100F2B] text-white text-xs tracking-[0.4em] uppercase px-10 py-6 overflow-hidden hover:bg-[#1a1940] transition-colors duration-400"
            >
              <span className="relative z-10">Explore Projects</span>
              <div className="w-8 h-[1px] bg-[#A19585] group-hover:w-14 transition-all duration-400" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A19585] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/treppan-living"
              className="group w-full lg:w-auto inline-flex items-center justify-between gap-8 border border-[#1b2946]/15 text-[#1b2946]/60 text-xs tracking-[0.4em] uppercase px-10 py-6 hover:border-[#A19585] hover:text-[#1b2946] transition-all duration-400"
            >
              <span>Discover Tréppan Living</span>
              <div className="w-6 h-[1px] bg-[#A19585]/50 group-hover:w-10 transition-all duration-400" />
            </Link>

            {/* Tertiary — contact */}
            <Link
              href="/contact"
              className="group w-full lg:w-auto inline-flex items-center justify-between gap-8 text-[#1b2946]/50 text-xs tracking-[0.4em] uppercase px-10 py-4 hover:text-[#A19585] transition-colors duration-400"
            >
              <span>Get in Touch</span>
              <span className="text-[#A19585]/40 group-hover:text-[#A19585] transition-colors duration-400">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────
export default function AboutPage() {
  useEffect(() => {
    ScrollTrigger.refresh();
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <OurStory />
      <Philosophy />
      <ManagementTeam />
      <Awards />
      <Closing />
      <Footer />
    </main>
  );
}