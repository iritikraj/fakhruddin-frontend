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
// CONSTANTS & DATA - Updated with Channel Partner color palette
// ─────────────────────────────────────────────────────────────
const PRIMARY = "#A1997F";      // Grullo
const PALE_SILVER = "#C4C7B5";
const MSU_GREEN = "#154741";
const CHINESE_BLACK = "#06191A";
const DEEP_AQUAMARINE = "#408174";
const WHITE = "#FFFFFF";

const SVG_ICONS = [
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/dubai-world-trade-centre-icon-04.svg",
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Marina-icon-05.svg",
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Mall-icon-09.svg",
];


// ─────────────────────────────────────────────────────────────
// GROUPED AMENITIES DATA (with all 53 items)
// ─────────────────────────────────────────────────────────────
const AMENITY_GROUPS = [
  {
    category: "Therapeutic & Recovery",
    items: [
      "Hyperbaric Oxygen Therapy",
      "Red Light Therapy",
      "Flotation Therapy",
      "Cryotherapy",
      "Himalayan Salt Brick Sauna",
      "Cold Plunge",
      "Hot Plunge",
      "Massage Beds",
      "Male Spa",
      "Steam Room",
      "Female Spa",
      "Nail Spa",
      "Meditation Zone",
      "Beauty Salon",
    ],
  },
  {
    category: "Water & Relaxation",
    items: [
      "Splash Pool",
      "Infinity Swimming Pool",
      "Aqua Gym",
      "Pool Side Deck",
      "Sunken Seaters",
      "Private Courtyard",
      "Rooftop Sea View Infinity Pool",
      "Open Shower",
      "Juice Bar",
      "Sun Deck Cabana",
    ],
  },
  {
    category: "Fitness & Recreation",
    items: [
      "Jogging Track",
      "Indoor Gym",
      "Outdoor Gym",
      "Mini Golf Course",
      "Wall Climbing",
      "Skating Loop",
      "Multi-Purpose Hall",
      "Boardwalk Bridge",
    ],
  },
  {
    category: "Nature & Outdoor",
    items: [
      "Bamboo Oxygen Park",
      "Meditation Pods",
      "Koi Pond",
      "Green Walkway",
      "Water Fountain",
      "Cabana Seating",
      "Green House Cafe",
      "Hydroponics",
      "BBQ Pits",
      "Outdoor Cinema",
      "Outdoor Party Deck",
    ],
  },
  {
    category: "Dining & Social",
    items: [
      "Grill Station",
      "Open Kitchen",
      "Working Pods",
      "Smart Robot Delivery System",
    ],
  },
  {
    category: "Kids & Family",
    items: [
      "Kids Adventure Wall",
      "Kids Play Area",
      "Kids Water Slide",
      "Kids Pool",
      "Sandpit Playground",
    ],
  },
];

const AMENITY_GALLERY = [
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-09.webp",
    label: "Infinity Serenity Pool",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-10.webp",
    label: "Landscaped Gardens",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-12.webp",
    label: "Sunset Deck",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-13.webp",
    label: "Rooftop View",
  },
];

// ─────────────────────────────────────────────────────────────
// EXTERIOR GALLERY DATA
// ─────────────────────────────────────────────────────────────
const EXTERIOR_GALLERY = [
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-03.webp",
    label: "Twin Tower Facade",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-04.webp",
    label: "Coastal Entrance",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-05.webp",
    label: "Ocean View Terrace",
  },
];

// ─────────────────────────────────────────────────────────────
// INTERIOR GALLERY DATA
// ─────────────────────────────────────────────────────────────
const INTERIOR_GALLERY = [
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-01.webp",
    label: "Living Room with Sea View",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-02.webp",
    label: "Master Bedroom",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-03.webp",
    label: "Bathroom with Ocean Views",
  },
];

const FLOOR_PLANS = [
  { type: "2 Bedroom", area: "1,450 – 1,550 sq.ft.", layout: "Type A", bedrooms: 2, bathrooms: 3 },
  { type: "3 Bedroom", area: "2,100 – 2,350 sq.ft.", layout: "Type B", bedrooms: 3, bathrooms: 4 },
];

const LOCATION_TABS = [
  {
    label: "Landmarks",
    icon: SVG_ICONS[0],
    items: [
      { place: "Dubai Marina Mall", time: "3 min" },
      { place: "JBR The Walk", time: "4 min" },
      { place: "Palm Jumeirah", time: "8 min" },
      { place: "Downtown Dubai & Burj Khalifa", time: "20 min" },
    ],
  },
  {
    label: "Transport",
    icon: SVG_ICONS[1],
    items: [
      { place: "Dubai Metro Station", time: "5 min" },
      { place: "Dubai International Airport", time: "30 min" },
      { place: "Al Maktoum Airport", time: "25 min" },
      { place: "Sheikh Zayed Road", time: "2 min" },
    ],
  },
  {
    label: "Amenities",
    icon: SVG_ICONS[2],
    items: [
      { place: "Dubai International Marina", time: "3 min" },
      { place: "Dubai Internet City", time: "5 min" },
      { place: "Downtown Dubai and DIFC", time: "5 min" },
      { place: "Dubai International Airport", time: "20 min" },
    ],
  },
];

const BG_IMAGE =
  "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/young-woman-s-hand-reaching-for-the-sun-during-bea-2025-07-01-00-29-40-utc-1_11zon.webp";

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
// SVG ARROW ICONS (no character icons)
// ─────────────────────────────────────────────────────────────
function ArrowLeft({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 15L7.5 10L12.5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 5L12.5 10L7.5 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9V3H9M15 3H21V9M21 15V21H15M9 21H3V15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L16 16M16 2L2 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

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

// ─────────────────────────────────────────────────────────────
// CUSTOM FORM MODAL (for Download Brochure and Express Interest)
// ─────────────────────────────────────────────────────────────
function CustomFormModal({
  title,
  onClose,
  type,
}: {
  title: string;
  onClose: () => void;
  type: "brochure" | "interest";
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+971",
    userType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<Record<string, boolean>>({});

  const handleFocus = (field: string) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field: string) => setFocused({ ...focused, [field]: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${title} Form submitted:`, form);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setForm({ name: "", email: "", mobile: "", countryCode: "+971", userType: "" });
    }, 2000);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      style={{ background: "rgba(5,8,20,0.85)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 28,
            border: `1px solid ${PRIMARY}30`,
            background: "linear-gradient(145deg, rgba(27,41,70,0.95) 0%, rgba(10,15,30,0.98) 100%)",
            boxShadow: `0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px ${PRIMARY}25, inset 0 1px 0 rgba(255,255,255,0.07)`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)` }} />
          <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${PRIMARY}30, transparent 70%)` }} />

          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/15 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/15 rounded-br-2xl pointer-events-none" />

          <div className="relative px-8 pt-10 pb-10">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: PRIMARY }}>Tréppan Tower</p>
                <h3 className="font-marcellus font-light text-white text-2xl md:text-3xl" style={{ fontWeight: 300 }}>{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-all text-xl flex-shrink-0 mt-2"
                style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)" }}
              >
                ×
              </button>
            </div>
            <div className="w-12 h-[1px] my-6" style={{ background: PRIMARY }} />

            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${PRIMARY}25`, border: `1px solid ${PRIMARY}50` }}>
                  <CheckIcon />
                </div>
                <h4 className="text-white text-xl mb-2" style={{ fontWeight: 300 }}>Thank You!</h4>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    className="w-full bg-transparent text-white text-sm pb-3 pt-3 outline-none"
                    style={{ borderBottom: `1px solid ${focused.name || form.name ? PRIMARY : "rgba(255,255,255,0.15)"}`, transition: "border-color 0.25s" }}
                    required
                  />
                  <label
                    className="absolute left-0 transition-all duration-250 pointer-events-none"
                    style={{
                      top: focused.name || form.name ? "-16px" : "14px",
                      fontSize: focused.name || form.name ? "9px" : "13px",
                      letterSpacing: focused.name || form.name ? "0.2em" : "0.05em",
                      color: focused.name || form.name ? PRIMARY : "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    Full Name <span style={{ color: PRIMARY }}>*</span>
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    className="w-full bg-transparent text-white text-sm pb-3 pt-3 outline-none"
                    style={{ borderBottom: `1px solid ${focused.email || form.email ? PRIMARY : "rgba(255,255,255,0.15)"}`, transition: "border-color 0.25s" }}
                    required
                  />
                  <label
                    className="absolute left-0 transition-all duration-250 pointer-events-none"
                    style={{
                      top: focused.email || form.email ? "-16px" : "14px",
                      fontSize: focused.email || form.email ? "9px" : "13px",
                      letterSpacing: focused.email || form.email ? "0.2em" : "0.05em",
                      color: focused.email || form.email ? PRIMARY : "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    Email Address <span style={{ color: PRIMARY }}>*</span>
                  </label>
                </div>

                {/* Mobile with Country Code */}
                <div>
                  <div className="relative flex gap-3 items-end" style={{ borderBottom: `1px solid ${form.mobile || form.countryCode !== "+971" ? PRIMARY : "rgba(255,255,255,0.15)"}`, paddingBottom: 12 }}>
                    <label className="absolute -top-4 left-0 text-[9px] tracking-[0.2em] uppercase" style={{ color: PRIMARY }}>Mobile Number<span style={{ color: PRIMARY }}>*</span></label>
                    <div className="relative flex-shrink-0">
                      <select
                        value={form.countryCode}
                        onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                        className="bg-transparent text-white text-sm outline-none appearance-none cursor-pointer pr-5"
                        style={{ color: "white" }}
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code} style={{ background: CHINESE_BLACK }}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                    <div className="w-[1px] self-stretch" style={{ background: "rgba(255,255,255,0.15)" }} />
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      placeholder="50 000 0000"
                      className="flex-1 bg-transparent text-white text-sm outline-none"
                      style={{ color: "white" }}
                      required
                    />
                  </div>
                </div>

                {/* Are you a dropdown (only for brochure form) */}
                {type === "brochure" && (
                  <div className="relative">
                    <select
                      value={form.userType}
                      onChange={(e) => setForm({ ...form, userType: e.target.value })}
                      onFocus={() => handleFocus("userType")}
                      onBlur={() => handleBlur("userType")}
                      className="w-full bg-transparent text-white text-sm pb-3 pt-3 outline-none appearance-none cursor-pointer pr-5"
                      style={{ borderBottom: `1px solid ${focused.userType || form.userType ? PRIMARY : "rgba(255,255,255,0.15)"}`, transition: "border-color 0.25s" }}
                      required
                    >
                      <option value="" disabled style={{ background: CHINESE_BLACK }} />
                      <option value="Buyer" style={{ background: CHINESE_BLACK }}>Buyer</option>
                      <option value="Broker" style={{ background: CHINESE_BLACK }}>Broker</option>
                    </select>
                    <label
                      className="absolute left-0 transition-all duration-250 pointer-events-none"
                      style={{
                        top: focused.userType || form.userType ? "-16px" : "14px",
                        fontSize: focused.userType || form.userType ? "9px" : "13px",
                        letterSpacing: focused.userType || form.userType ? "0.2em" : "0.05em",
                        color: focused.userType || form.userType ? PRIMARY : "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                      }}
                    >
                      Are you a <span style={{ color: PRIMARY }}>*</span>
                    </label>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-6 text-xs tracking-[0.35em] uppercase py-4 transition-all duration-300 hover:opacity-90"
                  style={{ background: PRIMARY, color: CHINESE_BLACK, borderRadius: 10, fontWeight: 600 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  Submit
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-2 text-[10px] mt-6 pt-4 border-t border-white/10" style={{ color: "rgba(255,255,255,0.3)" }}>
              <LockIcon />
              <span>Your information is protected</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Response within 24h</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO — left aligned, video BG, scroll parallax
// ─────────────────────────────────────────────────────────────
function Hero({ onDownload, onInterest }: { onDownload: () => void; onInterest: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(videoRef.current, {
      scale: 1.3, opacity: 0.3, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.5 },
    });
    gsap.to(contentRef.current, {
      opacity: 0, y: -80, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.5 },
    });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(".hero-logo", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
      .fromTo(".hero-tag", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.7")
      .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .fromTo(".hero-btns", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Tower-2.mp4"
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.9) 0%, rgba(5,8,20,0.4) 50%, rgba(5,8,20,0.2) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,8,20,0.65) 0%, transparent 60%)" }} />

      <div className="absolute top-0 left-0 w-full h-[2px] z-20" style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY}60, transparent)` }} />

      <div ref={contentRef} className="relative z-10 h-full flex items-end px-8 md:px-16 lg:px-24 pb-24">
        <div className="max-w-2xl">
          <img
            src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-tower-logo.png"
            alt="Tréppan Tower"
            className="hero-logo w-60 md:w-72 mb-5 opacity-0"
          />
          <p className="hero-tag text-xs tracking-[0.35em] uppercase opacity-0 mb-4" style={{ color: PRIMARY }}>
            Step Inside A Tranquil Retreat in the Heart of JVT
          </p>
          <div
            className="hero-line w-20 h-[2px] mb-7 origin-left"
            style={{ background: PRIMARY, transform: "scaleX(0)" }}
          />
          <div className="hero-btns opacity-0 flex flex-wrap gap-4">
            <button
              onClick={onDownload}
              className="group inline-flex items-center gap-4 text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400"
              style={{ background: PRIMARY, color: CHINESE_BLACK }}
            >
              Download Brochure
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={CHINESE_BLACK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={onInterest}
              className="group inline-flex items-center gap-4 border text-white text-xs tracking-[0.35em] uppercase px-8 py-4 hover:border-[#A1997F] hover:text-[#A1997F] transition-all duration-400"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              Express Interest
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
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
// OVERVIEW — asymmetric full-bleed layout (removed right border/line)
// ─────────────────────────────────────────────────────────────
function Overview({ onDownload, onInterest }: { onDownload: () => void; onInterest: () => void }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".ov-image-wrap", { clipPath: "inset(0 100% 0 0)" }, {
      clipPath: "inset(0 0% 0 0)", duration: 1.8, ease: "power4.inOut",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=120" },
    });
    gsap.fromTo(".ov-stat", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "back.out(1.4)",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
    gsap.fromTo(".ov-text", { x: 60, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.3,
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  return (        
    <section ref={ref} className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: WHITE }}>
      {/* Full-bleed parallax image - LEFT half */}
      <div className="ov-image-wrap absolute left-0 top-0 w-full md:w-1/2 h-full">
        <img
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Tower.webp"
          alt="Tréppan Tower"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability - on the right side */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white md:via-transparent md:to-white" />
        {/* Mobile Overlay */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-b from-[#F5F2EE]/30 via-[#F5F2EE]/20 to-[#F5F2EE]/60" />
      </div>

      {/* Content — RIGHT side (since image is on left) */}
      <div className="relative z-10 min-h-screen flex items-center justify-end px-6 md:px-16 lg:px-24">
        <div className="w-full md:w-[55%] lg:w-[50%] py-24 md:py-32">
          <span className="text-xs tracking-[0.35em] uppercase block mb-6" style={{ color: PRIMARY }}>Overview</span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8" style={{ fontWeight: 300, color: CHINESE_BLACK }}>
            A Sanctuary of<br />
            <span style={{ color: PRIMARY }}>Serenity by the Sea</span>
          </h2>

          <div className="w-16 h-[2px] mb-8" style={{ backgroundColor: PRIMARY }} />

          <div className="space-y-5 text-base leading-relaxed mb-12" style={{ color: `${CHINESE_BLACK}B3` }}>
            <p>
              Discover coastal living at Tréppan Tower — where the ocean breeze meets architectural brilliance.
              An exclusive collection crafted for those who seek the finest in resort-style living.
            </p>
            <p>
              Set against Dubai's breathtaking coastline, each residence has been meticulously designed to blend timeless
              elegance with modern wellness — redefining what luxury truly means.
            </p>
          </div>

          <ul className="space-y-2.5 mb-10">
            {[
              "Perpetual Island Escape & Resort Indulgence",
              "Cellular Renewal & Vitalising Water",
              "Pure Air & Views That Restore",
              "Intelligent Living, Lower Impact",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-base" style={{ color: `${CHINESE_BLACK}B3` }}>
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: `${PRIMARY}18`, borderRadius: 6 }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: PRIMARY }} />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-4 gap-4 border-t pt-8 mb-10" style={{ borderColor: `${CHINESE_BLACK}14` }}>
            {[
              { v: "53+", l: "Amenities" },
              { v: "G+22", l: "Floors" },
              { v: "100m", l: "From Beach" },
              { v: "2026", l: "Handover" },
            ].map((s, i) => (
              <div key={i} className="ov-stat text-center">
                <div className="text-2xl md:text-3xl mb-1" style={{ fontWeight: 300, color: PRIMARY }}>{s.v}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${CHINESE_BLACK}B3` }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onDownload}
              className="text-white text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400"
              style={{ background: CHINESE_BLACK }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PRIMARY; (e.currentTarget as HTMLElement).style.color = CHINESE_BLACK; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = CHINESE_BLACK; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            >
              Download Brochure
            </button>
            
            <button
              onClick={onInterest}
              className="text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400 border hover:border-[#A1997F] hover:text-[#1b2946]"
              style={{ borderColor: `${CHINESE_BLACK}33`, color: `${CHINESE_BLACK}80` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = PRIMARY; (e.currentTarget as HTMLElement).style.color = CHINESE_BLACK; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${CHINESE_BLACK}33`; (e.currentTarget as HTMLElement).style.color = `${CHINESE_BLACK}80`; }}
            >
              Express Interest
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// AMENITY GALLERY — cinematic full-width Ken Burns
// ─────────────────────────────────────────────────────────────
function AmenityGallery() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback((nextIdx: number, d: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDir(d);
    setCurrent(nextIdx);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDir(1);
      setCurrent((p) => (p + 1) % AMENITY_GALLERY.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goNext = () => navigate((current + 1) % AMENITY_GALLERY.length, 1);
  const goPrev = () => navigate((current - 1 + AMENITY_GALLERY.length) % AMENITY_GALLERY.length, -1);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          className="absolute inset-0"
          initial={{ opacity: 0, x: dir * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -80 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={AMENITY_GALLERY[current].src}
            alt={AMENITY_GALLERY[current].label}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.88) 0%, rgba(5,8,20,0.1) 55%, transparent 100%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(5,8,20,0.4), transparent 50%)" }} />

      <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 z-10 flex items-end gap-8">
        <div>
          <AnimatePresence mode="wait">
            <motion.h3
              key={current}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="font-marcellus font-light text-white text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 300 }}
            >
              {AMENITY_GALLERY[current].label}
            </motion.h3>
          </AnimatePresence>

          <div className="flex gap-2 mt-8">
            <button
              onClick={goPrev}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:border-[#A1997F] hover:text-[#A1997F]"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)" }}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:border-[#A1997F] hover:text-[#A1997F]"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)" }}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-8 md:right-16 z-10 flex items-center gap-2">
        {AMENITY_GALLERY.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i, i > current ? 1 : -1)}
            className="h-[2px] transition-all duration-500"
            style={{ width: i === current ? 40 : 14, background: i === current ? PRIMARY : "rgba(255,255,255,0.3)", borderRadius: 2 }}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// EXTERIOR GALLERY — full-width slider
// ─────────────────────────────────────────────────────────────
function ExteriorGallery() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback((nextIdx: number, d: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDir(d);
    setCurrent(nextIdx);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDir(1);
      setCurrent((p) => (p + 1) % EXTERIOR_GALLERY.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goNext = () => navigate((current + 1) % EXTERIOR_GALLERY.length, 1);
  const goPrev = () => navigate((current - 1 + EXTERIOR_GALLERY.length) % EXTERIOR_GALLERY.length, -1);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          className="absolute inset-0"
          initial={{ opacity: 0, x: dir * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -80 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={EXTERIOR_GALLERY[current].src}
            alt={EXTERIOR_GALLERY[current].label}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.85) 0%, rgba(5,8,20,0.1) 55%, transparent 100%)" }} />

      <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 z-10 flex items-end gap-8">
        <div>
          <div className="mb-2">
            <span className="text-[10px] tracking-[0.45em] uppercase" style={{ color: PRIMARY }}>Exterior</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.h3
              key={current}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="font-marcellus font-light text-white text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 300 }}
            >
              {EXTERIOR_GALLERY[current].label}
            </motion.h3>
          </AnimatePresence>

          <div className="flex gap-2 mt-8">
            <button
              onClick={goPrev}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:border-[#A1997F] hover:text-[#A1997F]"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)" }}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:border-[#A1997F] hover:text-[#A1997F]"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)" }}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-8 md:right-16 z-10 flex items-center gap-2">
        {EXTERIOR_GALLERY.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i, i > current ? 1 : -1)}
            className="h-[2px] transition-all duration-500"
            style={{ width: i === current ? 40 : 14, background: i === current ? PRIMARY : "rgba(255,255,255,0.3)", borderRadius: 2 }}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// INTERIOR GALLERY — full-width slider
// ─────────────────────────────────────────────────────────────
function InteriorGallery() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback((nextIdx: number, d: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDir(d);
    setCurrent(nextIdx);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDir(1);
      setCurrent((p) => (p + 1) % INTERIOR_GALLERY.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goNext = () => navigate((current + 1) % INTERIOR_GALLERY.length, 1);
  const goPrev = () => navigate((current - 1 + INTERIOR_GALLERY.length) % INTERIOR_GALLERY.length, -1);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          className="absolute inset-0"
          initial={{ opacity: 0, x: dir * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -80 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={INTERIOR_GALLERY[current].src}
            alt={INTERIOR_GALLERY[current].label}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.85) 0%, rgba(5,8,20,0.1) 55%, transparent 100%)" }} />

      <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 z-10 flex items-end gap-8">
        <div>
          <div className="mb-2">
            <span className="text-[10px] tracking-[0.45em] uppercase" style={{ color: PRIMARY }}>Interior</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.h3
              key={current}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="font-marcellus font-light text-white text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 300 }}
            >
              {INTERIOR_GALLERY[current].label}
            </motion.h3>
          </AnimatePresence>

          <div className="flex gap-2 mt-8">
            <button
              onClick={goPrev}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:border-[#A1997F] hover:text-[#A1997F]"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)" }}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:border-[#A1997F] hover:text-[#A1997F]"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)" }}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-8 md:right-16 z-10 flex items-center gap-2">
        {INTERIOR_GALLERY.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i, i > current ? 1 : -1)}
            className="h-[2px] transition-all duration-500"
            style={{ width: i === current ? 40 : 14, background: i === current ? PRIMARY : "rgba(255,255,255,0.3)", borderRadius: 2 }}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURES & AMENITIES — grouped categories with SVG icons (all 53 items)
// ─────────────────────────────────────────────────────────────
function FeaturesAmenities() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".am-group-card", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=60" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={BG_IMAGE} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `${CHINESE_BLACK}EA` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${PRIMARY}33 0%, transparent 15%, transparent 85%, ${PRIMARY}33 100%)` }} />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <span className="block text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: PRIMARY }}>Features &amp; Amenities</span>
          <h2 className="font-marcellus font-light text-4xl md:text-5xl text-white" style={{ fontWeight: 300 }}>
            53+ Resort-Style
            <br /><span style={{ color: PRIMARY }}>Experiences Await</span>
          </h2>
          <div className="w-14 h-[1px] mx-auto mt-6" style={{ background: PRIMARY }} />
        </div>

        {/* 2-column grid of category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {AMENITY_GROUPS.map((group, gi) => (
            <div
              key={gi}
              className="am-group-card opacity-0 relative overflow-hidden transition-all duration-400"
              style={{
                background: `linear-gradient(135deg, ${MSU_GREEN}8C 0%, ${CHINESE_BLACK}CC 100%)`,
                border: `1px solid ${PRIMARY}20`,
                borderRadius: 16,
                backdropFilter: "blur(12px)",
                boxShadow: `0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 ${PRIMARY}10`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${PRIMARY}60`;
                el.style.boxShadow = `0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px ${PRIMARY}40, inset 0 1px 0 ${PRIMARY}20`;
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${PRIMARY}20`;
                el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 ${PRIMARY}10`;
                el.style.transform = "translateY(0)";
              }}
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${PRIMARY}25, transparent 70%)` }} />

              <div className="px-7 pt-7 pb-5">
                <h3 className="font-marcellus font-light text-white text-lg mb-2" style={{ fontWeight: 300, letterSpacing: "0.02em" }}>{group.category}</h3>
                <div className="w-8 h-[1px]" style={{ background: PRIMARY }} />
              </div>

              <div className="px-7 pb-7 grid grid-cols-2 gap-x-6 gap-y-0">
                {group.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-3 py-2.5 border-b" style={{ borderColor: `${PRIMARY}15` }}>
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ background: `${PRIMARY}20`, borderRadius: 6 }}>
                      <img
                        src={SVG_ICONS[ii % SVG_ICONS.length]}
                        alt=""
                        className="w-4 h-4 object-contain"
                        style={{ filter: "brightness(0) invert(1) opacity(0.85)" }}
                      />
                    </div>
                    <span className="text-sm md:text-base leading-snug" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FLOOR PLANS — 3D table design with download button
// ─────────────────────────────────────────────────────────────
function FloorPlans({ onDownload }: { onDownload: () => void }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".fp-card", { y: 40, opacity: 0, rotateX: 5 }, {
      y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "#f7f6f4" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-14">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-4" style={{ color: PRIMARY }}>Discover</span>
          <h2 className="font-marcellus font-light text-4xl md:text-5xl" style={{ fontWeight: 300, color: CHINESE_BLACK }}>
            The Floor Plans
          </h2>
          <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: `${CHINESE_BLACK}73` }}>
            Thoughtfully crafted residences that maximise space, natural light, and coastal panoramas.
          </p>
        </div>

        <div className="fp-card max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              transform: "perspective(1000px) rotateX(2deg)",
              boxShadow: `0 40px 60px rgba(27,41,70,0.2), 0 0 0 1px rgba(27,41,70,0.08)`,
            }}
          >
            <div
              className="grid grid-cols-3 gap-4 p-5"
              style={{ background: `linear-gradient(135deg, ${CHINESE_BLACK} 0%, #0f1a32 100%)` }}
            >
              <div className="text-white/60 text-[10px] tracking-[0.2em] uppercase">Unit Type</div>
              <div className="text-white/60 text-[10px] tracking-[0.2em] uppercase">Total Units</div>
              <div className="text-white/60 text-[10px] tracking-[0.2em] uppercase">Total Area</div>
            </div>

            {FLOOR_PLANS.map((plan, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 gap-4 p-5 transition-all duration-300 cursor-default border-t border-black/5"
                style={{ background: idx % 2 === 0 ? "white" : "#faf9f7" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${PRIMARY}08`;
                  el.style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = idx % 2 === 0 ? "white" : "#faf9f7";
                  el.style.transform = "scale(1)";
                }}
              >
                <div>
                  <div className="text-sm md:text-lg font-light" style={{ color: CHINESE_BLACK }}>{plan.type}</div>                  
                </div>
                <div className="text-sm md:text-lg font-light" style={{ color: CHINESE_BLACK }}>{plan.bedrooms} BR</div>
                <div>
                  <div className="text-sm md:text-lg font-light" style={{ color: CHINESE_BLACK }}>{plan.area}</div>                  
                </div>
              </div>
            ))}

            <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rotate-45 translate-x-8 -translate-y-8" style={{ background: `${PRIMARY}20` }} />
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={onDownload}
              className="group inline-flex items-center gap-4 text-white text-xs tracking-[0.35em] uppercase px-10 py-5 transition-all duration-400 hover:gap-6"
              style={{ background: CHINESE_BLACK }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PRIMARY; (e.currentTarget as HTMLElement).style.color = CHINESE_BLACK; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = CHINESE_BLACK; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            >
              Download Floor Plan PDF
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V16M12 16L9 13M12 16L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 21H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// LOCATION — full-width map with overlay tabs
// ─────────────────────────────────────────────────────────────
function Location() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const tab = LOCATION_TABS[activeTab];

  useGSAP(() => {
    gsap.fromTo(".loc-panel", { x: -60, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1.4, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
    });
    gsap.fromTo(".loc-title", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: "#fff" }}>
      <div className="loc-title text-center py-16 px-6" style={{ background: "#fff" }}>
        <span className="block text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: PRIMARY }}>Location</span>
        <h2 className="font-marcellus font-light text-4xl md:text-5xl" style={{ fontWeight: 300, color: CHINESE_BLACK }}>
          A Rare Harmony of Coastal Calm
          <br /><span style={{ color: PRIMARY }}>&amp; City Pulse</span>
        </h2>
        <p className="text-sm mt-4 max-w-2xl mx-auto" style={{ color: `${CHINESE_BLACK}73`, lineHeight: 1.7 }}>
          Positioned where Dubai's coast meets the city — Tréppan Tower offers unmatched connectivity without sacrificing your tranquil retreat.
        </p>
      </div>

      <div className="relative w-full" style={{ height: "65vh", minHeight: 550 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.984652142226!2d55.171316711158696!3d25.03320983823036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d005f01e39d%3A0x3bec9fb8339333a5!2sTreppan%20Tower!5e1!3m2!1sen!2sin!4v1764673157392!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, position: "absolute", top: 0, left: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tréppan Tower Location"
        />

        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: "linear-gradient(to left, rgba(5,8,20,0.4) 20%, rgba(5,8,20,0.5) 30%, transparent 70%)" }} 
        />
        <div className="absolute right-0 top-0 h-full flex items-center z-10 pointer-events-none">
          <div className="loc-card w-full md:w-[420px] lg:w-[480px] px-6 md:px-12 pointer-events-auto">
            <div className="mt-1 mb-6">
              <p className="text-[10px] tracking-[0.45em] uppercase mb-1" style={{ color: PRIMARY }}>Connectivity</p>
              <h3 className="font-marcellus font-light text-white text-xl" style={{ fontWeight: 300 }}>Distances from Property</h3>
              <div className="w-8 h-[1px] mt-3" style={{ background: PRIMARY }} />
            </div>
            
            <div
              className="backdrop-blur-xl rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #408174 0%, #06191A 100%)",
                border: `1px solid ${PRIMARY}40`,
                boxShadow: `0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px ${PRIMARY}25 inset`,
              }}
            >
              <div className="flex border-b border-white/15">
                {LOCATION_TABS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-4 text-center transition-all duration-300 ${
                      activeTab === i ? "border-b-2" : ""
                    }`}
                    style={{
                      borderBottomColor: activeTab === i ? PRIMARY : "transparent",
                      color: activeTab === i ? PRIMARY : "rgba(255,255,255,0.55)",
                    }}
                  >
                    <span className="text-xs tracking-[0.2em] uppercase">{t.label}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 space-y-3"
                >
                  {tab.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-3 border-b border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={tab.icon}
                          alt=""
                          className="w-5 h-5 object-contain"
                          style={{ filter: "brightness(0) invert(1) opacity(0.7)" }}
                        />
                        <span className="text-white/85 text-sm">{item.place}</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: PRIMARY }}>{item.time}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="p-4 border-t border-white/10 text-center">
                <a
                  href="https://maps.app.goo.gl/5447LSgHiupmCYU77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:gap-3 group"
                  style={{ color: PRIMARY }}
                >
                  Get Directions
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={PRIMARY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FLOATING LABEL FIELD
// ─────────────────────────────────────────────────────────────
function FloatField({
  label, type = "text", value, onChange, children, required = false,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void; children?: React.ReactNode; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      {children ? (
        <div className="relative">
          <label
            className="absolute left-0 text-xs tracking-wide transition-all duration-250 pointer-events-none"
            style={{
              top: active ? "-16px" : "14px",
              fontSize: active ? "9px" : "13px",
              letterSpacing: active ? "0.2em" : "0.05em",
              color: active ? PRIMARY : "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}
          >
            {label}{required && <span style={{ color: PRIMARY }}>*</span>}
          </label>
          {children}
        </div>
      ) : (
        <div className="relative">
          <label
            className="absolute left-0 transition-all duration-250 pointer-events-none"
            style={{
              top: active ? "-16px" : "14px",
              fontSize: active ? "9px" : "13px",
              letterSpacing: active ? "0.2em" : "0.05em",
              color: active ? PRIMARY : "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}
          >
            {label}{required && <span style={{ color: PRIMARY }}>*</span>}
          </label>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            className="w-full bg-transparent text-white text-sm pb-3 pt-3 outline-none"
            style={{ borderBottom: `1px solid ${active ? PRIMARY : "rgba(255,255,255,0.15)"}`, transition: "border-color 0.25s" }}
          />
        </div>
      )}
      {!children && (
        <div
          className="absolute bottom-0 left-0 h-[1px] transition-all duration-300"
          style={{ width: active ? "100%" : "0%", background: PRIMARY, opacity: focused ? 0.6 : 0 }}
        />
      )}
    </div>
  );
}

function FloatSelect({ label, value, onChange, options, required = false }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className="absolute left-0 transition-all duration-250 pointer-events-none z-10"
        style={{
          top: active ? "-16px" : "14px",
          fontSize: active ? "9px" : "13px",
          letterSpacing: active ? "0.2em" : "0.05em",
          color: active ? PRIMARY : "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
        }}
      >
        {label}{required && <span style={{ color: PRIMARY }}>*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent text-white text-sm pb-3 pt-3 outline-none appearance-none cursor-pointer pr-5"
        style={{ borderBottom: `1px solid ${active ? PRIMARY : "rgba(255,255,255,0.15)"}`, transition: "border-color 0.25s", color: value ? "white" : "transparent" }}
      >
        <option value="" disabled style={{ background: CHINESE_BLACK }} />
        {options.map((o) => <option key={o} value={o} style={{ background: CHINESE_BLACK, color: '#FFF' }}>{o}</option>)}
      </select>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// REQUEST CALL BACK — custom form with floating labels
// ─────────────────────────────────────────────────────────────
function RequestCallBack() {
  const ref = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "", email: "", mobile: "", countryCode: "+971",
    property: "", residenceType: "", buyerType: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  useGSAP(() => {
    gsap.fromTo(leftRef.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top bottom-=100" } });
    gsap.fromTo(rightRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2, scrollTrigger: { trigger: ref.current, start: "top bottom-=100" } });
    gsap.fromTo(".rcb-benefit", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".rcb-benefits", start: "top bottom-=80" } });
  }, { scope: ref });

  const benefits = [
    "Response within 24 hours",
    "Personalised property consultation",
    "Exclusive project insights",
    "Tailored investment options",
  ];

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={BG_IMAGE} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" 
          style={{ background: `linear-gradient(135deg, ${CHINESE_BLACK}CC 0%, ${MSU_GREEN}CC 35%, ${PRIMARY}CC 70%, ${WHITE}B3 100%)` }} />

        <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse" style={{ background: PRIMARY }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-10 animate-pulse" style={{ background: PRIMARY, animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div ref={leftRef} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: `${PRIMARY}40`, background: `${PRIMARY}15` }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: PRIMARY }} />
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: PRIMARY }}>Priority Access</span>
            </div>

            <h2 className="font-marcellus font-light text-4xl md:text-5xl lg:text-6xl text-white leading-tight" style={{ fontWeight: 300 }}>
              Ready to Begin Your
              <br />
              <span className="relative inline-block mt-2" style={{ color: PRIMARY }}>
                Serenique Journey?
                <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 200 4" fill="none">
                  <path d="M0 2 L200 2" stroke={PRIMARY} strokeWidth="2" strokeDasharray="6 6" />
                </svg>
              </span>
            </h2>

            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Let our dedicated property consultants guide you through the most advanced wellness-centric living community in Dubai. Get exclusive access to floor plans, pricing, and investment opportunities.
            </p>

            <div className="rcb-benefits grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((b, i) => (
                <div key={i} className="rcb-benefit flex items-center gap-3 group cursor-default">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: `${PRIMARY}20`, boxShadow: `0 0 0 1px ${PRIMARY}40` }}>
                    <CheckIcon />
                  </div>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef}>
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 28,
                border: `1px solid ${PRIMARY}30`,
                background: `linear-gradient(145deg, ${MSU_GREEN}E6 0%, ${DEEP_AQUAMARINE}CC 100%)`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${PRIMARY}20 inset, 0 0 20px ${PRIMARY}15`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)` }} />
              <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full pointer-events-none opacity-10" style={{ background: `radial-gradient(circle, ${PRIMARY}, transparent 70%)` }} />

              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/15 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/15 rounded-br-2xl pointer-events-none" />

              <div className="relative px-8 pt-8 pb-5 border-b border-white/10">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: PRIMARY }}>Tréppan Tower</p>
                <h3 className="font-marcellus font-light text-white text-xl" style={{ fontWeight: 300 }}>Schedule a Consultation</h3>
              </div>

              <div className="relative px-8 py-8">
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${PRIMARY}25`, border: `1px solid ${PRIMARY}50` }}>
                      <CheckIcon />
                    </div>
                    <h4 className="text-white text-xl mb-2" style={{ fontWeight: 300 }}>Thank You!</h4>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Our team will reach out within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                      <FloatField label="Full Name" value={form.name} onChange={(v) => set("name", v)} required />
                      <FloatField label="Email Address" type="email" value={form.email} onChange={(v) => set("email", v)} required />
                    </div>

                    <div>
                      <div className="relative flex gap-3 items-end" style={{ borderBottom: `1px solid ${form.mobile || form.countryCode !== "+971" ? PRIMARY : "rgba(255,255,255,0.15)"}`, paddingBottom: 12 }}>
                        <label className="absolute -top-4 left-0 text-[9px] tracking-[0.2em] uppercase" style={{ color: PRIMARY }}>Mobile Number<span style={{ color: PRIMARY }}>*</span></label>
                        <div className="relative flex-shrink-0">
                          <select
                            value={form.countryCode}
                            onChange={(e) => set("countryCode", e.target.value)}
                            className="bg-transparent text-white text-sm outline-none appearance-none cursor-pointer pr-5"
                            style={{ color: "white" }}
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code} style={{ background: CHINESE_BLACK }}>{c.flag} {c.code}</option>
                            ))}
                          </select>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        </div>
                        <div className="w-[1px] self-stretch" style={{ background: "rgba(255,255,255,0.15)" }} />
                        <input
                          type="tel"
                          value={form.mobile}
                          onChange={(e) => set("mobile", e.target.value)}
                          placeholder="50 000 0000"
                          className="flex-1 bg-transparent text-white text-sm outline-none"
                          style={{ color: "white" }}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                      <FloatSelect
                        label="Interested Property"
                        value={form.property}
                        onChange={(v) => set("property", v)}
                        options={["Treppan Living Prive", "Treppan Tower"]}
                        required
                      />
                      <FloatSelect
                        label="Residence Type"
                        value={form.residenceType}
                        onChange={(v) => set("residenceType", v)}
                        options={["1 BR", "2 BR", "3 BR"]}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-x-8">
                      <FloatSelect
                        label="Are you a"
                        value={form.buyerType}
                        onChange={(v) => set("buyerType", v)}
                        options={["Buyer", "Broker"]}
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full text-xs tracking-[0.35em] uppercase py-4 transition-all duration-300"
                        style={{ background: CHINESE_BLACK, color: PALE_SILVER, borderRadius: 10, fontWeight: 600 }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                      >
                        Submit Enquiry
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="relative px-8 pb-6 pt-2 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <LockIcon />
                  <span>Your information is protected</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Response within 24h</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const [modal, setModal] = useState<"brochure" | "interest" | null>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    const h = () => ScrollTrigger.refresh();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const openBrochure = useCallback(() => setModal("brochure"), []);
  const openInterest = useCallback(() => setModal("interest"), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <main style={{ backgroundColor: CHINESE_BLACK }}>
      <Navbar />
      <Hero onDownload={openBrochure} onInterest={openInterest} />
      <Overview onDownload={openBrochure} onInterest={openInterest} />
      <AmenityGallery />
      
      <div className="relative">
        <div className="absolute top-20 left-0 right-0 z-10 text-center">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-2" style={{ color: PRIMARY }}>Architectural Elegance</span>
          <h2 className="font-marcellus font-light text-3xl md:text-4xl text-white" style={{ fontWeight: 300 }}>Exterior <span style={{ color: PRIMARY }}>Design</span></h2>
          <div className="w-12 h-[2px] mx-auto mt-4" style={{ background: PRIMARY }} />
        </div>
        <ExteriorGallery />
      </div>
      
      <div className="relative">
        <div className="absolute top-20 left-0 right-0 z-10 text-center">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-2" style={{ color: PRIMARY }}>Luxurious Living</span>
          <h2 className="font-marcellus font-light text-3xl md:text-4xl text-white" style={{ fontWeight: 300 }}>Interior <span style={{ color: PRIMARY }}>Spaces</span></h2>
          <div className="w-12 h-[2px] mx-auto mt-4" style={{ background: PRIMARY }} />
        </div>
        <InteriorGallery />
      </div>
      
      <FeaturesAmenities />
      <FloorPlans onDownload={openBrochure} />
      <Location />
      <RequestCallBack />
      <Footer />

      <AnimatePresence>
        {modal === "brochure" && (
          <CustomFormModal
            title="Download Brochure"
            type="brochure"
            onClose={closeModal}
          />
        )}
        {modal === "interest" && (
          <CustomFormModal
            title="Express Interest"
            type="interest"
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </main>
  );
}