// app/partner-as-agent/index.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const PRIMARY = "#A1997F";      // Grullo
const PALE_SILVER = "#C4C7B5";
const MSU_GREEN = "#154741";
const CHINESE_BLACK = "#06191A";
const DEEP_AQUAMARINE = "#408174";
const WHITE = "#FFFFFF";

const BG_IMAGE =
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Channel-Partner-Cover.webp";

const COUNTRY_CODES = [
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+966", flag: "🇸🇦", label: "SA" },
  { code: "+49", flag: "🇩🇪", label: "DE" },
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+86", flag: "🇨🇳", label: "CN" },
  { code: "+7", flag: "🇷🇺", label: "RU" },
];

// ─────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7L5.5 10.5L12 3.5" stroke={PRIMARY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="5" width="10" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Icons for Feature Cards
function UniqueProjectsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6L27 13L22 20L17 13L22 6Z" fill={PRIMARY} fillOpacity="0.15" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M14 22L22 17L30 22L22 27L14 22Z" fill={PRIMARY} fillOpacity="0.1" stroke={PRIMARY} strokeWidth="1.2"/>
      <rect x="19" y="26" width="6" height="12" fill={PRIMARY} fillOpacity="0.1" stroke={PRIMARY} strokeWidth="1.2"/>
    </svg>
  );
}

function EarlyAccessIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="12" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M22 16V22L26 26" stroke={PRIMARY} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 22H7M37 22H34" stroke={PRIMARY} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function DedicatedCoordinationIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="18" width="24" height="16" rx="2" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M16 14V18M28 14V18" stroke={PRIMARY} strokeWidth="1.2"/>
      <circle cx="22" cy="26" r="2" fill={PRIMARY}/>
    </svg>
  );
}

function ProvenLegacyIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6L25 13H32L27 18L30 26L22 21L14 26L17 18L12 13H19L22 6Z" fill={PRIMARY} fillOpacity="0.15" stroke={PRIMARY} strokeWidth="1.2"/>
    </svg>
  );
}

function PurposefulInnovationIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 10L34 22L22 34L10 22L22 10Z" stroke={PRIMARY} strokeWidth="1.2"/>
      <circle cx="22" cy="22" r="4" fill={PRIMARY} fillOpacity="0.2" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M22 14V18M22 26V30M14 22H18M26 22H30" stroke={PRIMARY} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function DefinedPortfolioIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="20" height="18" rx="2" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M16 20H28M16 24H24" stroke={PRIMARY} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function FocusedBrokerCircleIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="18" r="4" stroke={PRIMARY} strokeWidth="1.2"/>
      <circle cx="32" cy="26" r="4" stroke={PRIMARY} strokeWidth="1.2"/>
      <circle cx="12" cy="26" r="4" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M22 22L26 26M22 22L18 26" stroke={PRIMARY} strokeWidth="1.2"/>
    </svg>
  );
}

function ConsistentPipelineIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 30L22 14L30 30H14Z" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M20 22H24" stroke={PRIMARY} strokeWidth="1.2"/>
    </svg>
  );
}

function ShapingFutureIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 10L32 22L22 34L12 22L22 10Z" stroke={PRIMARY} strokeWidth="1.2"/>
      <circle cx="22" cy="22" r="3" fill={PRIMARY} fillOpacity="0.2" stroke={PRIMARY} strokeWidth="1.2"/>
    </svg>
  );
}

function StraightforwardCommissionsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="18" width="16" height="12" rx="1" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M22 30V34M18 14H26" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M22 14V18" stroke={PRIMARY} strokeWidth="1.2"/>
    </svg>
  );
}

function PromptDisbursementsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 26L22 18L30 26" stroke={PRIMARY} strokeWidth="1.2"/>
      <rect x="16" y="14" width="12" height="16" stroke={PRIMARY} strokeWidth="1.2"/>
    </svg>
  );
}

function BuyerReadyInventoryIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="16" width="16" height="14" rx="1" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M22 12V16M18 30V34H26V30" stroke={PRIMARY} strokeWidth="1.2"/>
    </svg>
  );
}

function SelectedLocationsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="8" stroke={PRIMARY} strokeWidth="1.2"/>
      <path d="M22 14V10M22 34V30M30 22H34M10 22H14" stroke={PRIMARY} strokeWidth="1.2"/>
      <circle cx="22" cy="22" r="2" fill={PRIMARY}/>
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
    tl.fromTo(".hero-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3");

    gsap.to(contentRef.current, {
      y: -60, opacity: 0, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.2 },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      <img
        src={BG_IMAGE}
        alt="Channel Partner Partnership"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${CHINESE_BLACK} 0%, ${CHINESE_BLACK}40 50%, transparent 100%)` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${CHINESE_BLACK}80 0%, transparent 70%)` }} />

      <div ref={contentRef} className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <h1 className="hero-title font-faculty text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-4 opacity-0">
            A Curated Partnership
            <br />
            <span style={{ color: PRIMARY }}>with Purpose</span>
          </h1>
          <div className="hero-line w-20 h-[2px] mb-6 origin-left" style={{ background: PRIMARY, transform: "scaleX(0)" }} />
          <p className="hero-sub text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl opacity-0 font-seitu">
            Strong collaborations are built on alignment and shared vision. Join a thoughtfully structured partnership designed to create meaningful value.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 right-12 z-20 flex flex-col items-center gap-2">
        <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-14 animate-pulse" style={{ background: `linear-gradient(to bottom, ${PRIMARY}, transparent)` }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURE GRID SECTION - "Designed for partners who demand more"
// ─────────────────────────────────────────────────────────────
function FeatureGrid() {
  const ref = useRef<HTMLElement>(null);

  const features = [
    { icon: <UniqueProjectsIcon />, title: "Unique Projects", desc: "Thoughtfully designed developments with innovative amenities and AI-enabled infrastructure." },
    { icon: <EarlyAccessIcon />, title: "Early Access", desc: "Priority access to projects before launch with exclusive opportunities." },
    { icon: <DedicatedCoordinationIcon />, title: "Dedicated Coordination", desc: "Clear communication channels for efficient, responsive processes." },
    { icon: <ProvenLegacyIcon />, title: "Proven Legacy", desc: "Decades of experience building trust and long-term value." },
    { icon: <PurposefulInnovationIcon />, title: "Purposeful Innovation", desc: "Thoughtful amenities and smart technology integration." },
  ];

  useGSAP(() => {
    gsap.fromTo(".feature-card", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden" style={{ background: WHITE }}>
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <span className="block text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: PRIMARY }}>Exclusive Benefits</span>
          <h2 className="font-faculty text-4xl md:text-5xl" style={{ color: MSU_GREEN, fontWeight: 400 }}>
            Designed for partners
            <br />
            <span style={{ color: PRIMARY }}>who demand more</span>
          </h2>
          <div className="w-14 h-[1px] mx-auto mt-6" style={{ background: PRIMARY }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="feature-card group relative overflow-hidden p-6 rounded-2xl transition-all duration-500 cursor-pointer"
              style={{
                background: WHITE,
                border: `1px solid ${PALE_SILVER}40`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: `0 20px 40px rgba(0,0,0,0.1), 0 0 0 2px ${PRIMARY}20`,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <motion.div 
                className="mb-5"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.2 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-faculty text-xl mb-3 transition-colors duration-300 group-hover:text-[#408174]" style={{ color: DEEP_AQUAMARINE }}>{feature.title}</h3>
              <p className="text-base leading-relaxed transition-colors duration-300 group-hover:text-gray-700" style={{ color: "#4a5568" }}>{feature.desc}</p>
              <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#A1997F] to-transparent"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// BROKERAGE PARTNERSHIP SECTION
// ─────────────────────────────────────────────────────────────
function BrokeragePartnership() {
  const ref = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const pillars = [
    { icon: <DefinedPortfolioIcon />, title: "Defined Portfolio", desc: "Thoughtfully planned projects with practical layouts and strong appeal." },
    { icon: <FocusedBrokerCircleIcon />, title: "Focused Broker Circle", desc: "Carefully managed network ensuring fair opportunity for every partner." },
    { icon: <ConsistentPipelineIcon />, title: "Consistent Pipeline", desc: "New developments across strategic locations for ongoing engagement." },
    { icon: <ShapingFutureIcon />, title: "Shaping the Future", desc: "Wellness-led design and sustainable practices redefining modern living." },
  ];

  useGSAP(() => {
    gsap.fromTo(leftRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top bottom-=100" } });
    gsap.fromTo(rightRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top bottom-=100" } });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${CHINESE_BLACK} 0%, #0A2A2B 100%)` }}>
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={leftRef}>
            <span className="text-[10px] tracking-[0.45em] uppercase block mb-4" style={{ color: PRIMARY }}>A More Structured Way to Partner</span>
            <h2 className="font-faculty text-2xl md:text-4xl text-white leading-tight mb-6" style={{ fontWeight: 400 }}>
              Looking for a more reliable <br />
              <span style={{ color: PRIMARY }}>brokerage partnership?</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              Join a network built around clarity, structured collaboration, and projects designed to support confident selling.
            </p>
          </div>

          <div ref={rightRef} className="space-y-5">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx} 
                className="group flex gap-5 p-5 rounded-xl transition-all duration-300 cursor-pointer"
                style={{ borderBottom: `1px solid ${PRIMARY}20` }}
                whileHover={{ 
                  x: 10, 
                  background: "rgba(255,255,255,0.05)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {pillar.icon}
                </motion.div>
                <div>
                  <h4 className="font-faculty text-lg mb-1 transition-colors duration-300 group-hover:text-[#A1997F]" style={{ color: PRIMARY }}>{pillar.title}</h4>
                  <p className="text-white/60 text-sm">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// WHAT THIS MEANS FOR YOU - BENEFITS SECTION (New Layout)
// ─────────────────────────────────────────────────────────────
function BenefitsSection() {
  const ref = useRef<HTMLElement>(null);

  const benefits = [
    { icon: <StraightforwardCommissionsIcon />, title: "Straightforward Commissions", desc: "Clear commission structures with defined terms and no unexpected conditions." },
    { icon: <PromptDisbursementsIcon />, title: "Prompt Disbursements", desc: "Payments processed promptly, reducing follow-ups and maintaining steady cash flow." },
    { icon: <BuyerReadyInventoryIcon />, title: "Buyer-Ready Inventory", desc: "Well-designed homes in prime locations with flexible post-handover options." },
    { icon: <SelectedLocationsIcon />, title: "Carefully Selected Locations", desc: "Projects in locations with proven demand and future growth potential." },
  ];

  useGSAP(() => {
    gsap.fromTo(".benefit-item", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${WHITE} 0%, #F9F9F7 100%)` }}>
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="font-faculty text-4xl md:text-5xl" style={{ color: MSU_GREEN, fontWeight: 400 }}>
            What This <span style={{ color: PRIMARY }}>Means for You</span>
          </h2>
          <div className="w-14 h-[1px] mx-auto mt-6" style={{ background: PRIMARY }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="benefit-item group relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="relative p-8 rounded-2xl transition-all duration-500 cursor-pointer"
                style={{
                  background: WHITE,
                  border: `1px solid ${PALE_SILVER}30`,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
                }}
                whileHover={{
                  boxShadow: `0 25px 45px rgba(0,0,0,0.1), 0 0 0 2px ${PRIMARY}30`,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Animated background gradient */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${PRIMARY}08, transparent 70%)`,
                  }}
                  initial={false}
                  whileHover={{ opacity: 1 }}
                />
                
                <div className="relative z-10 flex items-start gap-6">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-faculty text-xl mb-3 transition-colors duration-300 group-hover:text-[#408174]" style={{ color: DEEP_AQUAMARINE }}>
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {benefit.desc}
                    </p>
                    <motion.div 
                      className="mt-4 w-8 h-[2px] bg-[#A1997F] transition-all duration-300 group-hover:w-12"
                      initial={false}
                      whileHover={{ width: 48 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CONNECT FORM SECTION (Visible directly without popup)
// ─────────────────────────────────────────────────────────────
function ConnectFormSection() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    countryCode: "+971",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<Record<string, boolean>>({});

  const handleFocus = (field: string) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field: string) => setFocused({ ...focused, [field]: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connect Form submitted:", form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", mobile: "", companyName: "", countryCode: "+971" });
    }, 3000);
  };

  useGSAP(() => {
    gsap.fromTo(".form-container", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${MSU_GREEN} 0%, ${DEEP_AQUAMARINE} 100%)` }}>
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <motion.div
          className="form-container relative overflow-hidden rounded-3xl"
          style={{
            background: WHITE,
            boxShadow: `0 40px 80px rgba(0,0,0,0.1), 0 0 0 1px ${PRIMARY}20`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)` }} />
          
          <div className="relative px-8 md:px-12 pt-12 pb-10">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-faculty text-3xl md:text-4xl mb-3" style={{ color: MSU_GREEN }}>
                Connect with <span style={{ color: PRIMARY }}>Fakhruddin Properties</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Share your details, and our team will reach out with partnership information.
              </p>
              <div className="w-12 h-[1px] mx-auto mt-5" style={{ background: PRIMARY }} />
            </motion.div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${PRIMARY}15`, border: `1px solid ${PRIMARY}` }}>
                  <CheckIcon />
                </div>
                <h4 className="text-2xl mb-2 font-faculty" style={{ color: MSU_GREEN }}>Thank You!</h4>
                <p className="text-gray-500">Our team will reach out shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field - Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                      className="w-full bg-transparent text-gray-800 text-sm pb-3 pt-3 outline-none"
                      style={{ borderBottom: `1px solid ${focused.name || form.name ? PRIMARY : "#E2E8F0"}`, transition: "border-color 0.25s" }}
                      required
                    />
                    <label
                      className="absolute left-0 transition-all duration-250 pointer-events-none"
                      style={{
                        top: focused.name || form.name ? "-16px" : "14px",
                        fontSize: focused.name || form.name ? "9px" : "13px",
                        letterSpacing: focused.name || form.name ? "0.2em" : "0.05em",
                        color: focused.name || form.name ? PRIMARY : "#94A3B8",
                        textTransform: "uppercase",
                      }}
                    >
                      Full Name <span style={{ color: PRIMARY }}>*</span>
                    </label>
                  </div>

                  {/* Email Field - Floating Label */}
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      className="w-full bg-transparent text-gray-800 text-sm pb-3 pt-3 outline-none"
                      style={{ borderBottom: `1px solid ${focused.email || form.email ? PRIMARY : "#E2E8F0"}`, transition: "border-color 0.25s" }}
                      required
                    />
                    <label
                      className="absolute left-0 transition-all duration-250 pointer-events-none"
                      style={{
                        top: focused.email || form.email ? "-16px" : "14px",
                        fontSize: focused.email || form.email ? "9px" : "13px",
                        letterSpacing: focused.email || form.email ? "0.2em" : "0.05em",
                        color: focused.email || form.email ? PRIMARY : "#94A3B8",
                        textTransform: "uppercase",
                      }}
                    >
                      Email Address <span style={{ color: PRIMARY }}>*</span>
                    </label>
                  </div>
                </div>

                {/* Mobile with Country Code - Fixed Floating Label */}
                <div>
                  <div className="relative flex gap-3 items-end" style={{ borderBottom: `1px solid ${form.mobile || form.countryCode !== "+971" ? PRIMARY : "#E2E8F0"}`, paddingBottom: 12 }}>
                    <label className="absolute -top-4 left-0 text-[9px] tracking-[0.2em] uppercase" style={{ color: PRIMARY }}>
                      Mobile Number<span style={{ color: PRIMARY }}>*</span>
                    </label>
                    <div className="relative flex-shrink-0 pt-2">
                      <select
                        value={form.countryCode}
                        onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                        className="bg-transparent text-gray-800 text-sm outline-none appearance-none cursor-pointer pr-5"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94A3B8" }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                    <div className="w-[1px] self-stretch" style={{ background: "#E2E8F0" }} />
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      placeholder="50 000 0000"
                      className="flex-1 bg-transparent text-gray-800 text-sm outline-none pt-2"
                      required
                    />
                  </div>
                </div>

                {/* Company Name Field - Floating Label */}
                <div className="relative">
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    onFocus={() => handleFocus("companyName")}
                    onBlur={() => handleBlur("companyName")}
                    className="w-full bg-transparent text-gray-800 text-sm pb-3 pt-3 outline-none"
                    style={{ borderBottom: `1px solid ${focused.companyName || form.companyName ? PRIMARY : "#E2E8F0"}`, transition: "border-color 0.25s" }}
                    required
                  />
                  <label
                    className="absolute left-0 transition-all duration-250 pointer-events-none"
                    style={{
                      top: focused.companyName || form.companyName ? "-16px" : "14px",
                      fontSize: focused.companyName || form.companyName ? "9px" : "13px",
                      letterSpacing: focused.companyName || form.companyName ? "0.2em" : "0.05em",
                      color: focused.companyName || form.companyName ? PRIMARY : "#94A3B8",
                      textTransform: "uppercase",
                    }}
                  >
                    Company Name <span style={{ color: PRIMARY }}>*</span>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full mt-8 text-white text-sm tracking-[0.35em] uppercase py-4 transition-all duration-300"
                  style={{ background: MSU_GREEN, borderRadius: 12, fontWeight: 600 }}
                  whileHover={{ scale: 1.02, background: PRIMARY }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Enquiry
                </motion.button>

                <div className="flex items-center justify-center gap-2 text-[10px] pt-4" style={{ color: "#94A3B8" }}>
                  <LockIcon />
                  <span>Your information is protected</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>Response within 24h</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────
export default function ChannelPartnerPage() {
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
      <FeatureGrid />
      <BrokeragePartnership />
      <BenefitsSection />
      <ConnectFormSection />
      <Footer />
    </main>
  );
}