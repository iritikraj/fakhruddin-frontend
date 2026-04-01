// app/fakhruddin-international/page.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS & COLORS
// ─────────────────────────────────────────────────────────────
const PRIMARY     = "#A1997F";   // Grullo
const PALE_SILVER = "#C4C7B5";
const MSU_GREEN   = "#154741";
const CHINESE_BLACK = "#06191A";
const DEEP_AQUAMARINE = "#408174";
const WHITE = "#FFFFFF";

const HERO_IMAGE = "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Infiniti-Pool-Shot-with-Building_1_11.webp";
const UK_COVER   = "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/uk-cover.webp";
const UGANDA_COVER = "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Kampala_skyline.webp";

// 8 UK Projects
const UK_PROJECTS = [
  {
    id: 1,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/OvingtonSquare-Featured.webp",
    title: "Ovington Square",
    location: "Chelsea, London",
    type: "Residential",
    status: "Completed",
  },
  {
    id: 2,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dunstry-Farm.webp",
    title: "Dunstry Farm",
    location: "Somerset, England",
    type: "Estate",
    status: "Completed",
  },
  {
    id: 3,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/copenhagen-court-feature.webp",
    title: "Copenhagen Court",
    location: "Stratford, London",
    type: "Mixed-Use",
    status: "Completed",
  },
  {
    id: 4,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Innovation-Court-Front.webp",
    title: "Innovation Court",
    location: "Manchester",
    type: "Commercial",
    status: "Completed",
  },
  {
    id: 5,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/OvingtonSquare-Featured.webp",
    title: "Kensington Mews",
    location: "Kensington, London",
    type: "Residential",
    status: "Completed",
  },
  {
    id: 6,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dunstry-Farm.webp",
    title: "The Carriage Works",
    location: "Leeds, England",
    type: "Mixed-Use",
    status: "Completed",
  },
  {
    id: 7,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/copenhagen-court-feature.webp",
    title: "St. James Quarter",
    location: "Bristol, England",
    type: "Commercial",
    status: "Completed",
  },
  {
    id: 8,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Innovation-Court-Front.webp",
    title: "Regent Gardens",
    location: "Bath, England",
    type: "Residential",
    status: "Completed",
  },
];

// 12 African Projects
const AFRICAN_PROJECTS = [
  {
    id: 1,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/OvingtonSquare-Featured.webp",
    title: "Kampala Heights",
    location: "Kampala, Uganda",
    type: "Residential",
    status: "Ongoing",
  },
  {
    id: 2,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dunstry-Farm.webp",
    title: "Pearl Quarter",
    location: "Entebbe, Uganda",
    type: "Mixed-Use",
    status: "Upcoming",
  },
  {
    id: 3,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/copenhagen-court-feature.webp",
    title: "Garden City Residences",
    location: "Kampala, Uganda",
    type: "Residential",
    status: "Ongoing",
  },
  {
    id: 4,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Innovation-Court-Front.webp",
    title: "Nakasero Park",
    location: "Nakasero, Uganda",
    type: "Commercial",
    status: "Completed",
  },
  {
    id: 5,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/OvingtonSquare-Featured.webp",
    title: "Victoria Views",
    location: "Entebbe, Uganda",
    type: "Residential",
    status: "Ongoing",
  },
  {
    id: 6,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dunstry-Farm.webp",
    title: "Munyonyo Heights",
    location: "Munyonyo, Uganda",
    type: "Residential",
    status: "Upcoming",
  },
  {
    id: 7,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/copenhagen-court-feature.webp",
    title: "Kololo Gardens",
    location: "Kololo, Uganda",
    type: "Residential",
    status: "Ongoing",
  },
  {
    id: 8,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Innovation-Court-Front.webp",
    title: "Acacia Place",
    location: "Kampala, Uganda",
    type: "Commercial",
    status: "Completed",
  },
  {
    id: 9,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/OvingtonSquare-Featured.webp",
    title: "Jinja Waterfront",
    location: "Jinja, Uganda",
    type: "Mixed-Use",
    status: "Upcoming",
  },
  {
    id: 10,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dunstry-Farm.webp",
    title: "Bukoto Terrace",
    location: "Bukoto, Uganda",
    type: "Residential",
    status: "Ongoing",
  },
  {
    id: 11,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/copenhagen-court-feature.webp",
    title: "Ntinda Village",
    location: "Ntinda, Uganda",
    type: "Residential",
    status: "Completed",
  },
  {
    id: 12,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Innovation-Court-Front.webp",
    title: "Naguru Skyline",
    location: "Naguru, Uganda",
    type: "Commercial",
    status: "Upcoming",
  },
];

// ─────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────
function GlobeIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="11" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="14" cy="14" rx="5" ry="11" stroke={color} strokeWidth="1.3"/>
      <path d="M3 14H25" stroke={color} strokeWidth="1.3"/>
      <path d="M5 8.5H23M5 19.5H23" stroke={color} strokeWidth="1.3"/>
    </svg>
  );
}

function LocationPinIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5z" stroke={color} strokeWidth="1.2"/>
      <circle cx="8" cy="6" r="1.5" stroke={color} strokeWidth="1.2"/>
    </svg>
  );
}

function BuildingIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="8" height="11" stroke={color} strokeWidth="1.2"/>
      <rect x="10" y="7" width="4" height="8" stroke={color} strokeWidth="1.2"/>
      <path d="M4 8H8M4 11H8" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M5 15V12H7V15" stroke={color} strokeWidth="1.2"/>
    </svg>
  );
}

function ArrowRightIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckmarkIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7L5.5 10.5L12 3.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="8" stroke={PRIMARY} strokeWidth="1.3"/>
      <circle cx="16" cy="16" r="3" fill={PRIMARY} fillOpacity="0.2" stroke={PRIMARY} strokeWidth="1.3"/>
      <path d="M22 22L32 32M28 28L31 25M25 30L28 27" stroke={PRIMARY} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function TrustIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L34 11V22C34 29 27 35 20 37C13 35 6 29 6 22V11L20 6Z" stroke={PRIMARY} strokeWidth="1.3"/>
      <path d="M13 21L18 26L27 15" stroke={PRIMARY} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LegacyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L23 13H31L25 18L28 26L20 21L12 26L15 18L9 13H17L20 6Z" fill={PRIMARY} fillOpacity="0.1" stroke={PRIMARY} strokeWidth="1.3"/>
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="10" r="4" stroke={PRIMARY} strokeWidth="1.3"/>
      <circle cx="8" cy="30" r="4" stroke={PRIMARY} strokeWidth="1.3"/>
      <circle cx="32" cy="30" r="4" stroke={PRIMARY} strokeWidth="1.3"/>
      <path d="M20 14L8 26M20 14L32 26M8 30H32" stroke={PRIMARY} strokeWidth="1.3"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".int-hero-eyebrow", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .fromTo(".int-hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.4")
      .fromTo(".int-hero-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(".int-hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".int-hero-stat", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out" }, "-=0.4");

    gsap.to(contentRef.current, {
      y: -60, opacity: 0, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.2 },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="Fakhruddin International"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${CHINESE_BLACK} 0%, ${CHINESE_BLACK}60 45%, transparent 100%)` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${CHINESE_BLACK}85 0%, transparent 65%)` }} />

      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <span className="int-hero-eyebrow block text-[10px] tracking-[0.45em] uppercase mb-5 opacity-0 font-seitu" style={{ color: PRIMARY }}>
            Global Real Estate Portfolio
          </span>
          <h1 className="int-hero-title font-faculty text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.05] mb-4 opacity-0">
            Fakhruddin
            <br />
            <span style={{ color: PRIMARY }}>International</span>
          </h1>
          <div className="int-hero-line w-16 h-[2px] mb-6 origin-left" style={{ background: PRIMARY, transform: "scaleX(0)" }} />
          <p className="int-hero-desc text-white/75 text-base md:text-lg leading-relaxed max-w-xl opacity-0 font-seitu">
            A legacy of landmark developments spanning continents — from the historic streets of London to the rising skylines of East Africa.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-10 mt-12">
          {[
            { value: "20+", label: "Years of Excellence" },
            { value: "2", label: "Continents" },
            { value: "20+", label: "Landmark Projects" },
          ].map((stat, i) => (
            <div key={i} className="int-hero-stat opacity-0">
              <div className="font-faculty text-3xl md:text-4xl text-white leading-none">{stat.value}</div>
              <div className="text-[11px] tracking-[0.3em] uppercase mt-1 font-seitu" style={{ color: PALE_SILVER }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-12 z-20 flex flex-col items-center gap-2">
        <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase font-seitu">Scroll</span>
        <div className="w-[1px] h-14 animate-pulse" style={{ background: `linear-gradient(to bottom, ${PRIMARY}, transparent)` }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// INTRO / PHILOSOPHY SECTION
// ─────────────────────────────────────────────────────────────
function IntroSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".intro-left", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top bottom-=100" } });
    gsap.fromTo(".intro-right", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top bottom-=100" } });
  }, { scope: ref });

  const pillars = [
    { icon: <TrustIcon />, title: "Trusted Legacy", desc: "Decades of delivering landmark properties built on precision and integrity." },
    { icon: <KeyIcon />, title: "Market Expertise", desc: "Deep understanding of diverse real estate markets from London to Kampala." },
    { icon: <NetworkIcon />, title: "Global Network", desc: "A curated network of partners, investors, and stakeholders across continents." },
    { icon: <LegacyIcon />, title: "Award-Winning Design", desc: "Architecturally distinguished projects that define their neighbourhoods." },
  ];

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden" style={{ background: WHITE }}>
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Text */}
          <div className="intro-left">
            <span className="block text-[10px] tracking-[0.45em] uppercase mb-5 font-seitu" style={{ color: PRIMARY }}>
              Our Global Vision
            </span>
            <h2 className="font-faculty text-4xl md:text-5xl leading-[1.15] mb-6" style={{ color: CHINESE_BLACK, fontWeight: 400 }}>
              Building Beyond
              <br />
              <span style={{ color: MSU_GREEN }}>Borders</span>
            </h2>
            <div className="w-12 h-[1px] mb-8" style={{ background: PRIMARY }} />
            <p className="font-seitu text-base leading-relaxed mb-5" style={{ color: CHINESE_BLACK }}>
              Fakhruddin International represents our commitment to delivering world-class real estate beyond the UAE. With completed projects across the United Kingdom and active developments in Uganda, we bring the same standard of excellence that defines our home market to every new geography.</p>
          </div>

          {/* Right - Pillar Cards */}
          <div className="intro-right grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, boxShadow: `0 24px 48px rgba(0,0,0,0.1), 0 0 0 1.5px ${PRIMARY}30` }}
                className="relative p-6 rounded-2xl cursor-pointer transition-shadow duration-300 group"
                style={{ background: WHITE, border: `1px solid ${PALE_SILVER}40`, boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="font-faculty text-lg mb-2" style={{ color: CHINESE_BLACK }}>{pillar.title}</h3>
                <p className="text-sm leading-relaxed font-seitu" style={{ color: CHINESE_BLACK }}>{pillar.desc}</p>
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] origin-left rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${PRIMARY}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT CARD (3D Flip / Hover)
// ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: typeof UK_PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);

  const statusColor = project.status === "Completed"
    ? MSU_GREEN
    : project.status === "Ongoing"
    ? DEEP_AQUAMARINE
    : PRIMARY;

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ perspective: "1000px", height: "380px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Card inner */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: hovered ? 8 : 0, rotateX: hovered ? -4 : 0, scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d", borderRadius: "16px", overflow: "hidden" }}
      >
        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: "transform 0.7s ease", transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${CHINESE_BLACK}F0 0%, ${CHINESE_BLACK}50 50%, ${CHINESE_BLACK}10 100%)`,
            opacity: hovered ? 1 : 0.75,
          }}
        />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div
            className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-seitu"
            style={{ background: `${statusColor}25`, border: `1px solid ${statusColor}60`, color: statusColor, backdropFilter: "blur(8px)" }}
          >
            {project.status}
          </div>
        </div>

        {/* Type badge top-left */}
        <div className="absolute top-4 left-4">
          <div
            className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-seitu"
            style={{ background: `${WHITE}12`, border: `1px solid ${WHITE}25`, color: WHITE, backdropFilter: "blur(8px)" }}
          >
            {project.type}
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-faculty text-2xl text-white mb-1">{project.title}</h3>
          <div className="flex items-center gap-1.5 mb-4">
            <LocationPinIcon color={PALE_SILVER} />
            <span className="text-[12px] font-seitu" style={{ color: PALE_SILVER }}>{project.location}</span>
          </div>

          {/* Hover-revealed CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-seitu"
            style={{ color: PRIMARY }}
          >
            <span>View Project</span>
            <ArrowRightIcon color={PRIMARY} />
          </motion.div>
        </div>

        {/* 3D shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `linear-gradient(135deg, ${WHITE}12 0%, transparent 60%)`,
            borderRadius: "16px",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// UK SECTION (Separate)
// ─────────────────────────────────────────────────────────────
function UKSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".uk-header", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: WHITE }}>
      {/* Cover image with parallax feel */}
      <div className="relative w-full overflow-hidden" style={{ height: "420px" }}>
        <motion.img
          src={UK_COVER}
          alt="United Kingdom"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${WHITE} 0%, transparent 60%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${WHITE}80 0%, transparent 50%)` }} />

        {/* Region label */}
        <div className="absolute left-12 bottom-10">
          <span className="uk-header block text-[10px] tracking-[0.45em] uppercase mb-3 font-seitu opacity-0" style={{ color: PRIMARY }}>
            International Portfolio
          </span>
          <h2 className="font-faculty text-5xl md:text-7xl" style={{ color: CHINESE_BLACK, fontWeight: 400 }}>
            United Kingdom
          </h2>
          <div className="w-12 h-[2px] mt-4" style={{ background: PRIMARY }} />
        </div>
      </div>

      {/* Description */}
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 pt-14 pb-8">
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed font-seitu" style={{ color: "#4a5568" }}>
            From the elegant streets of Chelsea to the regeneration corridors of Manchester, Fakhruddin's UK portfolio reflects an acute understanding of British real estate — blending heritage sensibility with contemporary design.
          </p>
        </div>
      </div>

      {/* Projects Grid - 8 projects */}
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UK_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// AFRICAN SECTION (Separate - Dark Background)
// ─────────────────────────────────────────────────────────────
function AfricanSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".africa-header", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: CHINESE_BLACK }}>
      {/* Cover image with parallax feel - no empty space */}
      <div className="relative w-full overflow-hidden" style={{ height: "420px" }}>
        <motion.img
          src={UGANDA_COVER}
          alt="Uganda"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${CHINESE_BLACK} 0%, transparent 60%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${CHINESE_BLACK}80 0%, transparent 50%)` }} />

        {/* Region label */}
        <div className="absolute left-12 bottom-10 right-12 text-right">
          <span className="africa-header block text-[10px] tracking-[0.45em] uppercase mb-3 font-seitu opacity-0" style={{ color: DEEP_AQUAMARINE }}>
            Emerging Markets
          </span>
          <h2 className="font-faculty text-5xl md:text-7xl" style={{ color: WHITE, fontWeight: 400 }}>
            Uganda
          </h2>
          <div className="w-12 h-[2px] mt-4" style={{ background: DEEP_AQUAMARINE, marginLeft: "auto", marginRight: "0" }} />
        </div>
      </div>

      {/* Description */}
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 pt-14 pb-8">
        <div className="max-w-2xl ml-auto text-right">
          <p className="text-base leading-relaxed font-seitu" style={{ color: PALE_SILVER }}>
            East Africa's fastest-growing cities are being transformed by bold, purposeful investment. Fakhruddin's Uganda portfolio captures this momentum — delivering residential and commercial developments that meet rising demand with lasting quality.
          </p>
        </div>
      </div>

      {/* Projects Grid - 12 projects */}
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AFRICAN_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// VISION CTA SECTION
// ─────────────────────────────────────────────────────────────
function VisionCTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".vision-content", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-32 overflow-hidden" style={{ background: WHITE }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <div className="vision-content opacity-0">
          <div className="flex items-center justify-center mb-8">
            <GlobeIcon color={MSU_GREEN} />
          </div>
          <span className="block text-[10px] tracking-[0.45em] uppercase mb-5 font-seitu" style={{ color: PRIMARY }}>
            Our International Commitment
          </span>
          <h2 className="font-faculty text-4xl md:text-6xl leading-[1.1] mb-8" style={{ color: CHINESE_BLACK, fontWeight: 400 }}>
            Where Vision Meets{" "}
            <span style={{ color: MSU_GREEN }}>Global Opportunity</span>
          </h2>
          <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: PRIMARY }} />
          <p className="font-seitu text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#718096" }}>
            Fakhruddin Properties continues to expand its international footprint, identifying high-potential markets and delivering developments that create enduring value for investors and communities alike.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 text-base tracking-[0.3em] uppercase font-seitu text-white"
              style={{ background: MSU_GREEN }}
              whileHover={{ scale: 1.03, background: PRIMARY }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Explore Projects
              <ArrowRightIcon color={WHITE} />
            </motion.a>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-base tracking-[0.3em] uppercase font-seitu"
              style={{ color: CHINESE_BLACK, border: `1.5px solid ${PALE_SILVER}` }}
              whileHover={{ scale: 1.03, borderColor: PRIMARY, color: PRIMARY }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Get In Touch
              <ArrowRightIcon />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────
export default function FakhruddinInternationalPage() {
  useEffect(() => {
    ScrollTrigger.refresh();
    const h = () => ScrollTrigger.refresh();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <main style={{ background: CHINESE_BLACK }}>
      <Navbar />
      <Hero />
      <IntroSection />
      
      <UKSection />
      <AfricanSection />
      
      <VisionCTA />
      <Footer />
    </main>
  );
}