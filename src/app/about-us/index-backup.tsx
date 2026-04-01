"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Journey from "./_journey";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── LUXURY EASING ─────────────────────────────────────────
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const slowEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

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

const JOURNEY_DATA = [
  {
    year: "1963",
    title: "The Foundation",
    description: "Fakhruddin Holdings is established, laying the cornerstone of a legacy built on entrepreneurship, integrity, and community values.",
    image: "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "1975",
    title: "Expanding Horizons",
    description: "First international expansion, establishing presence beyond the UAE and beginning a journey of cross-border excellence.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "1983",
    title: "Architectural Innovation",
    description: "Pioneering new architectural approaches that blend modern design with timeless elegance and functionality.",
    image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2001",
    title: "A New Millennium",
    description: "Embracing sustainability as a core principle, introducing green building practices before they became industry standard.",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2015",
    title: "Wellness Revolution",
    description: "Launch of wellness-focused developments, prioritizing human-centric design and holistic living experiences.",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2026",
    title: "The Future Unfolds",
    description: "Leading the next generation of sustainable, AI-integrated communities that redefine urban living.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop"
  }
];

// ─── ANIMATED COUNTER ───────────────────────────────────────
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');
  const numericPart = parseFloat(value);

  useEffect(() => {
    if (!isInView || isNaN(numericPart)) return;
    const duration = 2000;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * numericPart);
      const formatted = value.startsWith('0') && current < 10 ? `0${current}` : String(current);
      setDisplay(formatted);
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [isInView, numericPart, value]);

  if (isNaN(numericPart)) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{display}</span>;
}

// ─────────────────────────────────────────────────────────────
// HERO SECTION (unchanged)
// ─────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    tl.to(contentRef.current, { opacity: 0, y: -80, ease: "power2.inOut" }, 0);

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
      <video
        ref={videoRef}
        src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Serenique-Project.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent" />

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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.92] opacity-0"
            style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
          >
            Beyond Today,<br />
            <span className="text-[#A19585]">by Design.</span>
          </h1>
          <div ref={lineRef} className="w-24 h-[2px] bg-[#A19585] mt-8 mb-6 opacity-0" />          

          <div className="flex gap-8 mt-8 flex-wrap">
            {["Our Story", "Our Journey", "Philosophy", "Team", "Awards"].map((item, i) => (
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

      <div className="absolute bottom-10 right-12 z-20 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#A19585] to-transparent animate-pulse" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// OUR STORY (FULL WIDTH - DIFFERENT LAYOUT)
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

    // Content slide in - now from left instead of right
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: -80 },
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
      {/* Full-bleed parallax image - right half (swapped from left to right) */}
      <div ref={imageRef} className="absolute right-0 top-0 w-full md:w-1/2 h-[130%]">
        <img
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/3.jpg"
          alt="Our Story"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability - now on the left side */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white md:via-transparent md:to-white" />
        {/* Mobile Overlay */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-b from-[#F5F2EE]/30 via-[#F5F2EE]/20 to-[#F5F2EE]/60" />
      </div>

      {/* Oversized year watermark - now on the right side */}
      <div className="hidden md:block absolute bottom-10 right-4 md:right-8 pointer-events-none select-none z-0">
        <span
          className="text-[18vw] leading-none text-black/[0.15]"
          style={{ fontWeight: 300, letterSpacing: "-0.04em" }}
        >
          1963
        </span>
      </div>

      {/* Content — left side (swapped from right to left) */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex items-center justify-start px-6 md:px-16 lg:px-24">
        <div className="w-full md:w-[55%] lg:w-[50%] py-24 md:py-32">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-6">Our Story</span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1b2946] leading-tight mb-8" style={{ fontWeight: 300 }}>
            A Vision<br />
            <span className="text-[#A19585]">Built to Endure.</span>
          </h2>

          <div className="w-16 h-[2px] bg-[#A19585] mb-8" />

          <div className="space-y-5 text-[#FFFFFF] md:text-[#1b2946]/70 text-base leading-relaxed mb-12">
            <p>
              It began as a vision in 2003 - a quiet pursuit to reimagine what real estate could mean for the people who live within it. Born from the enduring legacy of Fakhruddin Holdings, founded in 1963, Fakhruddin Properties carries forward a tradition rooted in entrepreneurship, integrity, and a deep sense of community, now, has grown into one of the Middle East's most forward thinking property developers.
            </p>            
            <p className="italic text-[#FFFFFF] md:text-[#1b2946]/50">
              This is not just our story. It is the quiet unfolding of a vision — one built to endure.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 border-t border-black/8 pt-8">
            {[
              { prefix:"", v: "60", postfix:"+", l: "Years of Legacy" },
              { prefix:"", v: "20", postfix:"+", l: "Industry Awards" },
              { prefix:"", v: "60", postfix:"%", l: "Carbon Footprint Reduced" },
              { prefix:"AED", v: "120", postfix:"M", l: "Invested in Wellness Living" },
            ].map((s, i) => (
              <div
                key={i}
                ref={(el) => { statsRef.current[i] = el; }}
                className="group"
              >
                <div
                  className="text-3xl md:text-4xl text-[#FFFFFF] md:text-[#A19585] group-hover:scale-105 transition-transform duration-300"
                  style={{ fontWeight: 300 }}
                >
                  {s.prefix} <AnimatedCounter value={s.v} />{s.postfix}
                </div>
                <div className="text-[#FFFFFF] md:text-[#1b2946]/50 text-xs tracking-[0.25em] uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────
// MANAGEMENT TEAM (ROUND IMAGES)
// ─────────────────────────────────────────────────────────────
function ManagementTeam() {
  const ref = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(() => {
    gsap.fromTo(".team-heading",
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
    gsap.fromTo(".team-card",
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 1.2, ease: "back.out(1.2)",
        scrollTrigger: { trigger: ".team-cards-wrap", start: "top bottom-=80" },
      }
    );
  }, { scope: ref });

  const leaders = [
    {
      name: "Yousuf Fakhruddin",
      role: "Chief Executive Officer",
      img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Yousuf-Fakhruddin-CEO.webp",
      bio: "Visionary leader driving innovation and sustainable growth across the Middle East's real estate landscape.",
      linkedIn: "https://www.linkedin.com/in/yusuffakhruddin/"
    },
    {
      name: "Fatema Yousuf Fakhruddin",
      role: "Chief Operating Officer",
      img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Fatema-Fakhruddin-COO.webp",
      bio: "Operational excellence leader ensuring seamless execution of visionary projects with precision.",
      linkedIn: "#"
    },
  ];

  return (
    <section id="team" ref={ref} className="relative w-full bg-white overflow-hidden py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="team-heading text-center mb-16 md:mb-20">
          <span className="text-[#A19585] text-xs tracking-[0.4em] uppercase block mb-4">Leadership</span>
          <h2 className="text-[#1b2946] text-4xl md:text-5xl lg:text-6xl leading-tight">
            The Minds Behind<br />
            <span className="text-[#A19585]">the Vision.</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#A19585] mx-auto mt-6" />
        </div>

        <div className="team-cards-wrap grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              className="team-card relative"
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F9F8F6] to-white shadow-xl">
                {/* Image Container - Circular with elegant framing */}
                <div className="relative pt-8 px-8">
                  <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[360px] mx-auto ring-4 ring-[#A19585]/20 group-hover:ring-[#A19585]/40 transition-all duration-500">
                    <img
                      src={leader.img}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Decorative gold ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#A19585]/0 group-hover:border-[#A19585]/30 transition-all duration-500" />
                  </div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-12 left-8 w-12 h-12 border-l-2 border-t-2 border-[#A19585]/20" />
                  <div className="absolute top-12 right-8 w-12 h-12 border-r-2 border-t-2 border-[#A19585]/20" />
                </div>

                {/* Content */}
                <div className="text-center p-8 pt-4">
                  <h3 className="text-2xl md:text-3xl text-[#1b2946] mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-[#A19585] text-sm tracking-[0.2em] uppercase mb-4">
                    {leader.role}
                  </p>                 
                  
                  {/* Social/Contact Icons */}
                  <div className="flex justify-center gap-4 mt-6">
                    <motion.a
                      href={leader.linkedIn}
                      target="_blank"
                      className="w-8 h-8 rounded-full bg-[#1b2946]/5 flex items-center justify-center text-[#1b2946]/40 hover:bg-[#0077B5] hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
                      </svg>
                    </motion.a>                    
                  </div>
                </div>

                {/* Bottom decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A19585] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// AWARDS (ELEGANT TIMELINE STYLE)
// ─────────────────────────────────────────────────────────────
function AwardsSection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header entrance
    gsap.fromTo(
      ".awards-header",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );

    if (!trackRef.current || !ref.current) return;

    // totalWidth must be read after layout — trackRef.scrollWidth is the full
    // scrollable width; window.innerWidth is what's visible.
    const getDistance = () =>
      trackRef.current!.scrollWidth - window.innerWidth;

    // Pin the section; on each scrub tick manually set x on the track.
    // This avoids the containerAnimation / .bind crash entirely.
    ScrollTrigger.create({
      id: "awardsHScroll",
      trigger: ref.current,
      start: "top top",
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(trackRef.current, {
          x: -getDistance() * self.progress,
        });
      },
    });

    // Pills: set hidden upfront, reveal when card is roughly centred.
    // We check manually inside the main onUpdate via a simple IntersectionObserver
    // on the cards — no containerAnimation needed.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pills = entry.target.querySelectorAll(".award-pill");
            gsap.to(pills, {
              y: 0,
              opacity: 1,
              stagger: 0.07,
              duration: 0.55,
              ease: "power2.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    gsap.utils.toArray<HTMLElement>(".year-panel").forEach((panel) => {
      gsap.set(panel.querySelectorAll(".award-pill"), { y: 20, opacity: 0 });
      observer.observe(panel);
    });

    return () => observer.disconnect();
  }, { scope: ref });

  return (
    <section
      id="awards"
      ref={ref}      
      className="relative w-full bg-[#F5F2EE]"
    >
      {/* ── Fixed Header ─────────────────────────────────────── */}
      <div className="awards-header pt-24 pb-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-[2px] bg-[#A19585]" />
          <span className="text-[#A19585] text-xs tracking-[0.4em] uppercase">Recognition</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1b2946] leading-tight">
            Industry Recognition,<br />
            <span className="text-[#A19585]">Year by Year.</span>
          </h2>
          {/* Scroll hint */}
          <div className="flex items-center gap-3 text-[#A19585]/70 text-xs tracking-widest uppercase pb-1 select-none">
            <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
              <path d="M0 5H30M26 1L30 5L26 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Scroll to explore
          </div>
        </div>
        <div className="w-16 h-[2px] bg-[#A19585] mt-6" />
      </div>

      {/* ── Horizontal Track ─────────────────────────────────── */}
      <div
        ref={trackRef}
        className="flex will-change-transform pb-24"
        style={{ width: "max-content" }}
      >
          {/* Leading spacer */}
          <div className="w-6 md:w-16 lg:w-24 flex-shrink-0" />

          {AWARDS_YEARS.map((yr, i) => (
            <div
              key={i}
              className="year-panel flex-shrink-0 w-[82vw] md:w-[55vw] lg:w-[42vw] max-w-[560px] mr-6 md:mr-10"
            >
              {/* Card shell */}
              <div className="relative h-full rounded-2xl border border-[#A19585]/20 bg-white/60 backdrop-blur-sm overflow-hidden group hover:border-[#A19585]/50 transition-colors duration-500">

                {/* Year badge — large watermark + label */}
                <div className="px-8 pt-8 pb-6 border-b border-[#A19585]/10 flex items-end justify-between">
                  <span
                    className="font-marcellus text-[5rem] leading-none text-[#1b2946]/8 select-none pointer-events-none absolute -right-3 -top-3"
                    aria-hidden
                  >
                    {yr.year}
                  </span>
                  <div>
                    <p className="text-[#A19585] text-[10px] tracking-[0.35em] uppercase mb-1">
                      {yr.awards.length} Award{yr.awards.length > 1 ? "s" : ""}
                    </p>
                    <span className="font-marcellus text-5xl text-[#1b2946]">{yr.year}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#A19585]/30 flex items-center justify-center group-hover:bg-[#A19585]/10 transition-colors duration-300">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="#A19585" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Awards list */}
                <div className="px-8 py-6 flex flex-wrap gap-2">
                  {yr.awards.map((award, ai) => (
                    <div
                      key={ai}
                      className="award-pill group/pill flex items-center gap-2 px-4 py-2 rounded-full border border-[#A19585]/25 bg-[#F5F2EE]/80 hover:bg-[#1b2946] hover:border-[#1b2946] transition-all duration-300 cursor-default"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#A19585] group-hover/pill:bg-white transition-colors duration-300 flex-shrink-0" />
                      <span className="text-[#1b2946]/75 text-base leading-snug group-hover/pill:text-white transition-colors duration-300">
                        {award}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A19585] group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </div>
          ))}

          {/* Trailing spacer */}
          <div className="w-6 md:w-16 lg:w-24 flex-shrink-0" />
        </div>

      {/* ── Progress dots ────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        {AWARDS_YEARS.map((_, i) => (
          <div
            key={i}
            className="progress-dot w-1.5 h-1.5 rounded-full bg-[#A19585]/30"
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CLOSING CTA
// ─────────────────────────────────────────────────────────────
function Closing() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
      <img
        ref={imageRef}
        src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/bg@2x1.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/35 to-white/30" />

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A19585] via-[#A19585]/50 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="closing-left">
            <span className="text-[#A19585] text-xs tracking-[0.4em] uppercase block mb-6">Begin Here</span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-[#1b2946] leading-tight mb-6"
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

          <div className="closing-right flex flex-col gap-4 lg:items-end">
            <Link
              href="/projects"
              className="group relative w-full lg:w-auto inline-flex items-center justify-between gap-8 bg-[#100F2B] text-white text-xs tracking-[0.4em] uppercase px-10 py-6 overflow-hidden hover:bg-[#1a1940] transition-colors duration-400"
            >
              <span className="relative z-10">Explore Projects</span>
              <div className="w-8 h-[1px] bg-[#A19585] group-hover:w-14 transition-all duration-400" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A19585] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>

            <Link
              href="/treppan-living"
              className="group w-full lg:w-auto inline-flex items-center justify-between gap-8 border border-[#1b2946]/15 text-[#1b2946]/60 text-xs tracking-[0.4em] uppercase px-10 py-6 hover:border-[#A19585] hover:text-[#1b2946] transition-all duration-400"
            >
              <span>Discover Tréppan Living</span>
              <div className="w-6 h-[1px] bg-[#A19585]/50 group-hover:w-10 transition-all duration-400" />
            </Link>

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
    <main className="bg-black">
      <Navbar />

      <motion.div
        initial={{ y: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.4, ease: customEase, delay: 0.2 }}
        className="fixed inset-0 z-50 bg-black pointer-events-none flex items-center justify-center"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
        >
          <span className="text-gray-400 text-xs tracking-widest">FP</span>
        </motion.div>
      </motion.div>

      <Hero />
      <OurStory />
      <Journey />
      <ManagementTeam />
      <AwardsSection />
      <Closing />
      <Footer />
    </main>
  );
}