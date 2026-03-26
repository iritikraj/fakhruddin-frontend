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
// CONSTANTS & DATA
// ─────────────────────────────────────────────────────────────
const BRAND = "#A19585";
const DARK = "#0a0f1e";
const NAVY = "#1b2946";

const SVG_ICONS = [
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/dubai-world-trade-centre-icon-04.svg",
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Marina-icon-05.svg",
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Mall-icon-09.svg",
];

// ── Grouped amenity categories ──
const AMENITY_GROUPS = [
  {
    category: "Therapeutic & Recovery",
    items: [
      "Hyperbaric Oxygen Therapy",
      "Red Light Therapy",
      "Flotation Therapy",
      "Cryotherapy",
      "Himalayan Salt Brick Sauna",
      "Meditation Pods",
      "ProSCAN Therapy",
      "Physio Body Design Therapy",
      "Neurosport Conic Dream",
      "Atmospharium",
      "Sensory Suite",
    ],
  },
  {
    category: "Water & Relaxation",
    items: [
      "Infinity Serenity Pool",
      "Podium Infinity Pool",
      "E-Golf Pool",
      "Swimming Pool",
      "Aqua Pool",
      "Hot Jacuzzi",
      "MykSpa",
      "Myk Sauna",
      "Well Spa",
      "Aesthetics Zone",
      "Beauty Salon",
    ],
  },
  {
    category: "Fitness & Recreation",
    items: [
      "Aqua Gym",
      "Morning Yoga",
      "Lucid Bridge",
      "Lounge Velocity",
      "NBA Acres Walk",
      "Mini Golf Course",
      "Blading Rail Velis La Pool",
      "Croquet Bowl",
      "Sky Barbican",
    ],
  },
  {
    category: "Nature & Outdoor",
    items: [
      "Bamboo Oxygen Park",
      "Koi Pond",
      "Green House Cafe",
      "Outdoor Kitchen Bars",
      "Open Kitchen",
      "BBQ Pits",
      "Sea Deck Cabana",
      "Piano Fountain",
      "Connecting Bridges",
    ],
  },
  {
    category: "Dining & Social",
    items: [
      "James Kitchen",
      "McCall Cuisine",
      "Floaters Mart",
      "Cinema Amenities Wall",
      "App Fibre",
      "Concierge Desk",
    ],
  },
  {
    category: "Kids & Family",
    items: [
      "Kids Play Areas",
      "Kids Mini Slide",
      "Junior Indoor Swimming",
      "App Fibre",
    ],
  },
];

const AMENITY_GALLERY = [
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-09.webp", label: "Podium Infinity Pool" },
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-10.webp", label: "Landscaped Gardens" },
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-10.webp", label: "Coastal Terrace" },
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-12.webp", label: "Sunset Deck" },
];

const EXTERIOR_GALLERY = [
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-03.webp", label: "Seaside Facade" },
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-04.webp", label: "Architectural Crown" },
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-05.webp", label: "Waterfront View" },
];

const INTERIOR_GALLERY = [
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-01.webp", label: "Living Sanctuary" },
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-02.webp", label: "Master Suite" },
  { src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-03.webp", label: "Chef's Kitchen" },
];

const FLOOR_PLANS = [
  { type: "TYPE A", bedroom: "2 Bedroom", totalArea: "1,450 – 1,550", priceFrom: "AED 2.9M" },
  { type: "TYPE B", bedroom: "3 Bedroom", totalArea: "2,100 – 2,350", priceFrom: "AED 4.2M" },
  { type: "TYPE C", bedroom: "4 Bedroom Duplex", totalArea: "3,400 – 3,800", priceFrom: "AED 7.5M" },
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
      { place: "Sheikh Zayed Road", time: "2 min" },
      { place: "Al Maktoum Airport", time: "25 min" },
      { place: "Dubai Int'l Airport", time: "30 min" },
    ],
  },
  {
    label: "Amenities",
    icon: SVG_ICONS[2],
    items: [
      { place: "Dubai International Marina", time: "3 min" },
      { place: "Dubai Internet City", time: "5 min" },
      { place: "Downtown Dubai & DIFC", time: "5 min" },
      { place: "Global Village", time: "25 min" },
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
      <path d="M2 7L5.5 10.5L12 3.5" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
// HUBSPOT LOADER HOOK
// ─────────────────────────────────────────────────────────────
function useHubspotForm(containerId: string, formId: string) {
  useEffect(() => {
    let attempts = 0;
    const tryLoad = () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          region: "na1",
          portalId: "49053274",
          formId,
          target: `#${containerId}`,
        });
      } else if (attempts < 20) {
        attempts++;
        setTimeout(tryLoad, 300);
      }
    };
    tryLoad();
  }, [containerId, formId]);
}

// ─────────────────────────────────────────────────────────────
// HUBSPOT MODAL
// ─────────────────────────────────────────────────────────────
function HubspotModal({ title, containerId, formId, onClose }: { title: string; containerId: string; formId: string; onClose: () => void }) {
  useHubspotForm(containerId, formId);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        <div className="relative overflow-hidden" style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(145deg, rgba(27,41,70,0.95) 0%, rgba(10,15,30,0.98) 100%)", boxShadow: `0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px ${BRAND}25, inset 0 1px 0 rgba(255,255,255,0.07)` }}>
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)` }} />
          <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${BRAND}30, transparent 70%)` }} />
          <div className="relative px-8 pt-10 pb-10">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: BRAND }}>Tréppan Serenique</p>
                <h3 className="text-white text-2xl md:text-3xl" style={{ fontWeight: 300 }}>{title}</h3>
              </div>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-all flex-shrink-0 mt-2" style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)" }}>
                <CloseIcon color="rgba(255,255,255,0.6)" />
              </button>
            </div>
            <div className="w-12 h-[1px] my-6" style={{ background: BRAND }} />
            <div id={containerId} className="hubspot-modal-form" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// FULL-SCREEN IMAGE SLIDER (reusable — used for Amenity, Exterior, Interior)
// ─────────────────────────────────────────────────────────────
interface SlideItem { src: string; label: string; }

function FullSlider({
  slides,
  sectionLabel,
  title,
  description,
  height = "75vh",
  autoInterval = 5000,
}: {
  slides: SlideItem[];
  sectionLabel?: string;
  title?: string;
  description?: string;
  height?: string;
  autoInterval?: number;
}) {
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
      setCurrent((p) => (p + 1) % slides.length);
    }, autoInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides.length, autoInterval]);

  const goNext = () => navigate((current + 1) % slides.length, 1);
  const goPrev = () => navigate((current - 1 + slides.length) % slides.length, -1);

  return (
    <div className="w-full">
      {/* Optional title block above slider */}
      {(title || sectionLabel) && (
        <div className="text-center py-14 px-6" style={{ background: "#fff" }}>
          {sectionLabel && (
            <span className="block text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: BRAND }}>{sectionLabel}</span>
          )}
          {title && (
            <h2 className="text-4xl md:text-5xl mb-3" style={{ fontWeight: 300, color: NAVY }}>{title}</h2>
          )}
          {description && (
            <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(27,41,70,0.5)", lineHeight: 1.7 }}>{description}</p>
          )}
        </div>
      )}

      {/* Slider */}
      <div className="relative w-full overflow-hidden" style={{ height }}>
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
              src={slides[current].src}
              alt={slides[current].label}
              className="w-full h-full object-cover"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.88) 0%, rgba(5,8,20,0.08) 55%, transparent 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(5,8,20,0.35), transparent 50%)" }} />

        {/* Bottom-left: label + arrows */}
        <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 z-10">
          <AnimatePresence mode="wait">
            <motion.h3
              key={current}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-white text-3xl md:text-4xl lg:text-5xl mb-6"
              style={{ fontWeight: 300 }}
            >
              {slides[current].label}
            </motion.h3>
          </AnimatePresence>

          <div className="flex gap-3">
            <button
              onClick={goPrev}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)", borderRadius: 0 }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BRAND; el.style.background = `${BRAND}20`; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.25)"; el.style.background = "transparent"; }}
            >
              <ArrowLeft size={18} color="currentColor" />
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)", borderRadius: 0 }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BRAND; el.style.background = `${BRAND}20`; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.25)"; el.style.background = "transparent"; }}
            >
              <ArrowRight size={18} color="currentColor" />
            </button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-10 right-8 md:right-16 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i, i > current ? 1 : -1)}
              className="h-[2px] transition-all duration-500"
              style={{ width: i === current ? 40 : 14, background: i === current ? BRAND : "rgba(255,255,255,0.3)", borderRadius: 2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
function Hero({ onDownload, onInterest }: { onDownload: () => void; onInterest: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(videoRef.current, { scale: 1.3, opacity: 0.3, ease: "power2.inOut", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.5 } });
    gsap.to(contentRef.current, { opacity: 0, y: -80, ease: "power2.inOut", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.5 } });
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(".hero-logo", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
      .fromTo(".hero-tag", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.7")
      .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .fromTo(".hero-price", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-btns", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      <video ref={videoRef} src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Serenique-Project.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.9) 0%, rgba(5,8,20,0.4) 50%, rgba(5,8,20,0.2) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,8,20,0.65) 0%, transparent 60%)" }} />
      <div className="absolute top-0 left-0 w-full h-[2px] z-20" style={{ background: `linear-gradient(90deg, ${BRAND}, ${BRAND}60, transparent)` }} />
      <div ref={contentRef} className="relative z-10 h-full flex items-end px-8 md:px-16 lg:px-24 pb-24">
        <div className="max-w-2xl">
          <img src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-serenique-logo.png" alt="Tréppan Serenique" className="hero-logo w-60 md:w-72 mb-5 opacity-0" />
          <p className="hero-tag text-xs tracking-[0.35em] uppercase opacity-0 mb-4" style={{ color: BRAND }}>A Rare Harmony of Coastal Calm &amp; City Pulse</p>
          <div className="hero-line w-20 h-[2px] mb-7 origin-left" style={{ background: BRAND, transform: "scaleX(0)" }} />
          <div className="hero-price opacity-0 mb-8">
            <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-1">Starting from</p>
            <p className="text-white text-4xl md:text-5xl" style={{ fontWeight: 200, letterSpacing: "-0.02em" }}>AED <span style={{ color: BRAND }}>2.9M</span></p>
          </div>
          <div className="hero-btns opacity-0 flex flex-wrap gap-4">
            <button onClick={onDownload} className="inline-flex items-center gap-4 text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400" style={{ background: BRAND, color: DARK }}>
              Download Brochure
            </button>
            <button onClick={onInterest} className="inline-flex items-center gap-4 border text-white text-xs tracking-[0.35em] uppercase px-8 py-4 hover:border-[#A19585] hover:text-[#A19585] transition-all duration-400" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
              Express Interest
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-12 z-20 flex flex-col items-center gap-2">
        <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-14 animate-pulse" style={{ background: `linear-gradient(to bottom, ${BRAND}, transparent)` }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// OVERVIEW
// ─────────────────────────────────────────────────────────────
function Overview({ onDownload, onInterest }: { onDownload: () => void; onInterest: () => void }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".ov-image-wrap", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.8, ease: "power4.inOut", scrollTrigger: { trigger: ref.current, start: "top bottom-=120" } });
    gsap.fromTo(".ov-stat", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "back.out(1.4)", scrollTrigger: { trigger: ref.current, start: "top bottom-=80" } });
    gsap.fromTo(".ov-text", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.3, scrollTrigger: { trigger: ref.current, start: "top bottom-=80" } });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: "#f7f6f4" }}>
      <div className="ov-image-wrap absolute left-0 top-0 w-full md:w-[52%] h-full" style={{ minHeight: 700 }}>
        <img src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Wideup-lady.webp" alt="Tréppan Serenique" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to right, transparent 55%, #f7f6f4 100%)" }} />
        <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to bottom, transparent 55%, #f7f6f4 100%)" }} />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden">
        <span style={{ fontWeight: 200, color: "rgba(27,41,70,0.035)", letterSpacing: "-0.05em", fontSize: "22vw", lineHeight: 1 }}>SEA</span>
      </div>
      <div className="relative z-10 flex items-center justify-end px-6 md:px-16 lg:px-24" style={{ minHeight: 700 }}>
        <div className="ov-text w-full md:w-[54%] lg:w-[48%] py-24">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-5" style={{ color: BRAND }}>Overview</span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.08] mb-6" style={{ fontWeight: 300, color: NAVY }}>
            A Sanctuary of<br /><span className="italic" style={{ color: BRAND }}>Serenity by the Sea</span>
          </h2>
          <div className="w-14 h-[2px] mb-7" style={{ background: BRAND }} />
          <div className="space-y-4 text-sm leading-relaxed mb-10" style={{ color: "rgba(27,41,70,0.6)" }}>
            <p>Discover coastal living at Tréppan Serenique — where the ocean breeze meets architectural brilliance. An exclusive collection crafted for those who seek the finest in resort-style living.</p>
            <p>Set against Dubai's breathtaking coastline, each residence has been meticulously designed to blend timeless elegance with modern wellness — redefining what luxury truly means.</p>
          </div>
          <ul className="space-y-2.5 mb-10">
            {["53+ resort-style amenities unlike any other", "100 metres from the beach", "AI-enabled wellness infrastructure", "Premium handover 2026"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(27,41,70,0.65)" }}>
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: `${BRAND}18`, borderRadius: 6 }}>
                  <CheckIcon />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-4 gap-4 border-t pt-8 mb-10" style={{ borderColor: "rgba(27,41,70,0.08)" }}>
            {[{ v: "53+", l: "Amenities" }, { v: "G+22", l: "Floors" }, { v: "100m", l: "From Beach" }, { v: "2026", l: "Handover" }].map((s, i) => (
              <div key={i} className="ov-stat text-center">
                <div className="text-2xl md:text-3xl mb-1" style={{ fontWeight: 300, color: BRAND }}>{s.v}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(27,41,70,0.4)" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={onDownload} className="text-white text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400" style={{ background: NAVY }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = BRAND; el.style.color = DARK; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY; el.style.color = "#fff"; }}>Download Brochure</button>
            <button onClick={onInterest} className="text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400" style={{ border: `1px solid rgba(27,41,70,0.2)`, color: "rgba(27,41,70,0.5)" }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BRAND; el.style.color = NAVY; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(27,41,70,0.2)"; el.style.color = "rgba(27,41,70,0.5)"; }}>Express Interest</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// AMENITY GALLERY (full-width slider #1)
// ─────────────────────────────────────────────────────────────
function AmenityGallery() {
  return <FullSlider slides={AMENITY_GALLERY} height="75vh" autoInterval={5000} />;
}

// ─────────────────────────────────────────────────────────────
// EXPLORE GALLERY — two separate full-width sliders
// ─────────────────────────────────────────────────────────────
function ExploreGallery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".expl-intro", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="w-full overflow-hidden" style={{ background: "#fff" }}>
      {/* Section header */}
      <div className="expl-intro text-center pt-24 pb-6 px-6">
        <span className="block text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: BRAND }}>Tréppan Serenique</span>
        <h2 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 300, color: NAVY }}>
          Explore the Residences
        </h2>
        <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(27,41,70,0.5)", lineHeight: 1.7 }}>
          From sculpted facades kissed by sea air to interiors designed for deep rest — every detail speaks of elevated coastal living.
        </p>
      </div>

      {/* Exterior Slider */}
      <FullSlider
        slides={EXTERIOR_GALLERY}
        sectionLabel="Architecture"
        title="Exterior"
        description="Bold architectural expression meets the coastal horizon — a silhouette crafted to become an icon on Dubai's skyline."
        height="70vh"
        autoInterval={5500}
      />

      {/* Interior Slider */}
      <FullSlider
        slides={INTERIOR_GALLERY}
        sectionLabel="Interiors"
        title="Interior"
        description="Every surface, material and proportion is chosen to cultivate calm — spaces that breathe as naturally as the sea breeze outside."
        height="70vh"
        autoInterval={6000}
      />

      {/* CTA band */}
      <div className="relative overflow-hidden" style={{ borderRadius: 0 }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d1a36 35%, #1a1640 65%, #0f1929 100%)` }} />
        <div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(ellipse at 70% 50%, ${BRAND}50, transparent 60%)` }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${BRAND}80, transparent)` }} />
        <div className="relative z-10 text-center py-16 px-8">
          <span className="block text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: BRAND }}>Discover More</span>
          <h3 className="text-white text-2xl md:text-4xl mb-4" style={{ fontWeight: 300 }}>Ready to Experience Tréppan Serenique?</h3>
          <p className="text-sm max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Our dedicated team will walk you through every detail — floor plans, pricing, and investment potential.</p>
          <button className="text-xs tracking-[0.35em] uppercase px-10 py-4 transition-all duration-300" style={{ background: BRAND, color: DARK }}>Schedule a Visit</button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURES & AMENITIES — grouped category cards
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
        <div className="absolute inset-0" style={{ background: "rgba(5,8,20,0.92)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,8,20,0.4) 0%, transparent 15%, transparent 85%, rgba(5,8,20,0.4) 100%)" }} />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <span className="block text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: BRAND }}>Features &amp; Amenities</span>
          <h2 className="text-4xl md:text-5xl text-white" style={{ fontWeight: 300 }}>
            53+ Resort-Style
            <br /><span className="italic" style={{ color: BRAND }}>Experiences Await</span>
          </h2>
          <div className="w-14 h-[1px] mx-auto mt-6" style={{ background: BRAND }} />
        </div>

        {/* 2-column grid of category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {AMENITY_GROUPS.map((group, gi) => (
            <div
              key={gi}
              className="am-group-card opacity-0 relative overflow-hidden transition-all duration-400"
              style={{
                background: "linear-gradient(135deg, rgba(27,41,70,0.55) 0%, rgba(10,15,30,0.7) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                backdropFilter: "blur(12px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${BRAND}40`;
                el.style.boxShadow = `0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px ${BRAND}25, inset 0 1px 0 rgba(255,255,255,0.08)`;
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Subtle corner glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${BRAND}18, transparent 70%)` }} />

              {/* Card header */}
              <div className="px-7 pt-7 pb-5">
                <h3 className="text-white text-lg mb-2" style={{ fontWeight: 300, letterSpacing: "0.02em" }}>{group.category}</h3>
                <div className="w-8 h-[1px]" style={{ background: BRAND }} />
              </div>

              {/* Items — 2-column list */}
              <div className="px-7 pb-7 grid grid-cols-2 gap-x-6 gap-y-0">
                {group.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-3 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(161,149,133,0.12)", borderRadius: 6 }}>
                      <img
                        src={SVG_ICONS[ii % SVG_ICONS.length]}
                        alt=""
                        className="w-4 h-4 object-contain"
                        style={{ filter: "brightness(0) invert(1) opacity(0.65)" }}
                      />
                    </div>
                    <span className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
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
// FLOOR PLANS — no tabs, 3D table, no carousel
// ─────────────────────────────────────────────────────────────
function FloorPlans({ onDownload }: { onDownload: () => void }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".fp-row", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
    gsap.fromTo(".fp-hd", { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "#f7f6f4" }}>
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `radial-gradient(circle at 80% 20%, ${BRAND}15 0%, transparent 50%)` }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="fp-hd text-center mb-16">
          <span className="block text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: BRAND }}>Discover</span>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 300, color: NAVY }}>The Floor Plans</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(27,41,70,0.45)", lineHeight: 1.7 }}>
            Each residence is a testament to architectural precision — maximising space, natural light, and sweeping coastal panoramas.
          </p>
        </div>

        {/* 3D Table */}
        <div
          className="overflow-hidden"
          style={{
            borderRadius: 20,
            boxShadow: `0 40px 100px rgba(27,41,70,0.15), 0 10px 40px rgba(27,41,70,0.08), 0 0 0 1px rgba(27,41,70,0.06)`,
            transform: "perspective(1000px) rotateX(1.5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-4 px-8 py-5"
            style={{ background: NAVY }}
          >
            {["Unit Type", "Bedrooms", "Total Area (sq.ft.)", "Starting Price"].map((h, i) => (
              <div key={i} className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>{h}</div>
            ))}
          </div>

          {/* Table rows */}
          {FLOOR_PLANS.map((plan, i) => (
            <div
              key={i}
              className="fp-row grid grid-cols-4 px-8 py-6 opacity-0 transition-all duration-300"
              style={{
                background: i % 2 === 0 ? "#ffffff" : "#f9f8f6",
                borderTop: "1px solid rgba(27,41,70,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${BRAND}10`;
                el.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = i % 2 === 0 ? "#ffffff" : "#f9f8f6";
                el.style.transform = "translateX(0)";
              }}
            >
              {/* Type */}
              <div className="flex items-center">
                <span className="inline-block text-xs tracking-[0.2em] uppercase px-3 py-1.5" style={{ background: `${BRAND}15`, color: BRAND, borderRadius: 6, fontWeight: 500 }}>
                  {plan.type}
                </span>
              </div>
              {/* Bedroom */}
              <div className="flex items-center">
                <span className="text-base font-medium" style={{ color: NAVY, fontWeight: 400 }}>{plan.bedroom}</span>
              </div>
              {/* Area */}
              <div className="flex items-center">
                <div>
                  <span className="text-lg" style={{ fontWeight: 300, color: NAVY }}>{plan.totalArea}</span>
                  <span className="text-xs ml-1" style={{ color: "rgba(27,41,70,0.4)" }}>sq.ft.</span>
                </div>
              </div>
              {/* Price */}
              <div className="flex items-center">
                <span className="text-xl" style={{ fontWeight: 300, color: BRAND }}>{plan.priceFrom}</span>
              </div>
            </div>
          ))}

          {/* Table footer */}
          <div className="px-8 py-4" style={{ background: "rgba(27,41,70,0.03)", borderTop: "1px solid rgba(27,41,70,0.06)" }}>
            <p className="text-xs" style={{ color: "rgba(27,41,70,0.35)" }}>* Prices are indicative and subject to change. For the most current pricing, please contact our sales team.</p>
          </div>
        </div>

        {/* Download Brochure */}
        <div className="flex flex-col items-center mt-10 gap-3">
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-4 text-white text-xs tracking-[0.35em] uppercase px-10 py-4 transition-all duration-400"
            style={{ background: NAVY }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = BRAND; el.style.color = DARK; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY; el.style.color = "#fff"; }}
          >
            Download Floor Plan PDF
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v9M4.5 7.5 8 11l3.5-3.5M2 13h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="text-xs" style={{ color: "rgba(27,41,70,0.35)" }}>Detailed floor plans &amp; specifications available in brochure</p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// LOCATION — full-width map with overlaid tab panel
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
      {/* Section title above */}
      <div className="loc-title text-center py-16 px-6" style={{ background: "#fff" }}>
        <span className="block text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: BRAND }}>Location</span>
        <h2 className="text-4xl md:text-5xl" style={{ fontWeight: 300, color: NAVY }}>
          A Rare Harmony of Coastal Calm
          <br /><span className="italic" style={{ color: BRAND }}>&amp; City Pulse</span>
        </h2>
        <p className="text-sm mt-4 max-w-2xl mx-auto" style={{ color: "rgba(27,41,70,0.45)", lineHeight: 1.7 }}>
          Positioned where Dubai's coast meets the city — Tréppan Serenique offers unmatched connectivity without sacrificing your tranquil retreat.
        </p>
      </div>

      {/* Full-width map container */}
      <div className="relative w-full" style={{ height: "65vh", minHeight: 500 }}>
        {/* Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.15!2d55.147!3d25.092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6cc69c999921%3A0x0!2sTréppan+Serenique!5e0!3m2!1sen!2sae!4v1"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tréppan Serenique Location"
        />

        {/* Left overlay panel */}
        <div className="loc-panel absolute left-0 top-0 bottom-0 z-20 flex flex-col" style={{ width: "min(420px, 90vw)" }}>
          {/* Semi-transparent bg */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(5,8,20,0.94) 0%, rgba(5,8,20,0.88) 75%, transparent 100%)",
              backdropFilter: "blur(0px)",
            }}
          />

          <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.45em] uppercase mb-1" style={{ color: BRAND }}>Connectivity</p>
              <h3 className="text-white text-xl" style={{ fontWeight: 300 }}>Distances from Property</h3>
              <div className="w-8 h-[1px] mt-3" style={{ background: BRAND }} />
            </div>

            {/* Tab headers — styled like a table header */}
            <div
              className="flex"
              style={{
                borderRadius: "12px 12px 0 0",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "none",
              }}
            >
              {LOCATION_TABS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="flex-1 flex flex-col items-center gap-1.5 px-3 py-3 transition-all duration-300"
                  style={{
                    background: activeTab === i
                      ? `linear-gradient(135deg, ${BRAND}cc, ${BRAND}99)`
                      : "rgba(27,41,70,0.6)",
                    borderRight: i < LOCATION_TABS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  <img src={t.icon} alt="" className="w-5 h-5 object-contain" style={{ filter: activeTab === i ? "brightness(0)" : "brightness(0) invert(0.7)" }} />
                  <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: activeTab === i ? DARK : "rgba(255,255,255,0.5)", fontWeight: activeTab === i ? 600 : 400 }}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Table body */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                background: "rgba(5,8,20,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                backdropFilter: "blur(10px)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center justify-between px-5 py-4 transition-all duration-200 cursor-default"
                      style={{ borderBottom: i < tab.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${BRAND}12`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: `${BRAND}18`, borderRadius: 8 }}>
                          <img src={tab.icon} alt="" className="w-4 h-4 object-contain" style={{ filter: "sepia(1) saturate(0.9) brightness(0.85)" }} />
                        </div>
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 400 }}>{item.place}</span>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1.5 flex-shrink-0" style={{ background: `${BRAND}22`, color: BRAND, borderRadius: 7 }}>
                        {item.time}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Directions button */}
            <a
              href="https://maps.app.goo.gl/5447LSgHiupmCYU77"
              target="_blank" rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-3 text-xs tracking-[0.25em] uppercase py-3.5 transition-all duration-300"
              style={{ background: BRAND, color: DARK, borderRadius: 10 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1a4 4 0 1 1 0 8A4 4 0 0 1 7 1Zm0 0v13M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Get Directions
            </a>
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
        // Select / custom element
        <div className="relative">
          <label
            className="absolute left-0 text-xs tracking-wide transition-all duration-250 pointer-events-none"
            style={{
              top: active ? "-16px" : "14px",
              fontSize: active ? "9px" : "13px",
              letterSpacing: active ? "0.2em" : "0.05em",
              color: active ? BRAND : "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}
          >
            {label}{required && <span style={{ color: BRAND }}>*</span>}
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
              color: active ? BRAND : "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}
          >
            {label}{required && <span style={{ color: BRAND }}>*</span>}
          </label>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            className="w-full bg-transparent text-white text-sm pb-3 pt-3 outline-none"
            style={{ borderBottom: `1px solid ${active ? BRAND : "rgba(255,255,255,0.15)"}`, transition: "border-color 0.25s" }}
          />
        </div>
      )}
      {/* Bottom border active glow */}
      {!children && (
        <div
          className="absolute bottom-0 left-0 h-[1px] transition-all duration-300"
          style={{ width: active ? "100%" : "0%", background: BRAND, opacity: focused ? 0.6 : 0 }}
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
          color: active ? BRAND : "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
        }}
      >
        {label}{required && <span style={{ color: BRAND }}>*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent text-white text-sm pb-3 pt-3 outline-none appearance-none cursor-pointer"
        style={{ borderBottom: `1px solid ${active ? BRAND : "rgba(255,255,255,0.15)"}`, transition: "border-color 0.25s", color: value ? "white" : "transparent" }}
      >
        <option value="" disabled style={{ background: DARK }} />
        {options.map((o) => <option key={o} value={o} style={{ background: DARK }}>{o}</option>)}
      </select>
      {/* Chevron */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// REQUEST CALL BACK — left: content, right: custom form
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
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,8,20,0.92) 0%, rgba(10,20,50,0.88) 100%)" }} />
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse" style={{ background: BRAND }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-10 animate-pulse" style={{ background: BRAND, animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — content */}
          <div ref={leftRef} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: `${BRAND}40`, background: `${BRAND}15` }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: BRAND }} />
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: BRAND }}>Priority Access</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight" style={{ fontWeight: 300 }}>
              Ready to Begin Your
              <br />
              <span className="relative inline-block mt-2" style={{ color: BRAND }}>
                Serenique Journey?
                <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 200 4" fill="none">
                  <path d="M0 2 L200 2" stroke={BRAND} strokeWidth="2" strokeDasharray="6 6" />
                </svg>
              </span>
            </h2>

            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Let our dedicated property consultants guide you through the most advanced wellness-centric living community in Dubai. Get exclusive access to floor plans, pricing, and investment opportunities.
            </p>

            <div className="rcb-benefits grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((b, i) => (
                <div key={i} className="rcb-benefit flex items-center gap-3 group cursor-default">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: `${BRAND}20`, boxShadow: `0 0 0 1px ${BRAND}40` }}>
                    <CheckIcon />
                  </div>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — custom form */}
          <div ref={rightRef}>
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 28,
                border: `1px solid ${BRAND}30`,
                background: "linear-gradient(145deg, rgba(27,41,70,0.85) 0%, rgba(15,25,45,0.95) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${BRAND}20 inset, 0 0 20px ${BRAND}15`,
              }}
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)` }} />
              <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full pointer-events-none opacity-10" style={{ background: `radial-gradient(circle, ${BRAND}, transparent 70%)` }} />

              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/15 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/15 rounded-br-2xl pointer-events-none" />

              {/* Card header */}
              <div className="relative px-8 pt-8 pb-5 border-b border-white/10">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: BRAND }}>Tréppan Serenique</p>
                <h3 className="text-white text-xl" style={{ fontWeight: 300 }}>Schedule a Consultation</h3>
              </div>

              {/* Form */}
              <div className="relative px-8 py-8">
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${BRAND}25`, border: `1px solid ${BRAND}50` }}>
                      <CheckIcon />
                    </div>
                    <h4 className="text-white text-xl mb-2" style={{ fontWeight: 300 }}>Thank You!</h4>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Our team will reach out within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                      <FloatField label="Full Name" value={form.name} onChange={(v) => set("name", v)} required />
                      <FloatField label="Email Address" type="email" value={form.email} onChange={(v) => set("email", v)} required />
                    </div>

                    {/* Row 2: Mobile (with country code) */}
                    <div>
                      <div className="relative flex gap-3 items-end" style={{ borderBottom: `1px solid ${form.mobile || form.countryCode !== "+971" ? BRAND : "rgba(255,255,255,0.15)"}`, paddingBottom: 12 }}>
                        <label className="absolute -top-4 left-0 text-[9px] tracking-[0.2em] uppercase" style={{ color: BRAND }}>Mobile Number<span style={{ color: BRAND }}>*</span></label>
                        {/* Country code dropdown */}
                        <div className="relative flex-shrink-0">
                          <select
                            value={form.countryCode}
                            onChange={(e) => set("countryCode", e.target.value)}
                            className="bg-transparent text-white text-sm outline-none appearance-none cursor-pointer pr-5"
                            style={{ color: "white" }}
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code} style={{ background: DARK }}>{c.flag} {c.code}</option>
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

                    {/* Row 3: Property + Residence Type */}
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

                    {/* Row 4: Are you a */}
                    <div className="grid grid-cols-2 gap-x-8">
                      <FloatSelect
                        label="Are you a"
                        value={form.buyerType}
                        onChange={(v) => set("buyerType", v)}
                        options={["Buyer", "Broker"]}
                        required
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full text-xs tracking-[0.35em] uppercase py-4 transition-all duration-300"
                        style={{ background: BRAND, color: DARK, borderRadius: 10, fontWeight: 600 }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                      >
                        Submit Enquiry
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Footer note */}
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
export default function TreppanSereniqueePage() {
  const [modal, setModal] = useState<"brochure" | "interest" | null>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    const h = () => ScrollTrigger.refresh();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    if (!(window as any).hbspt) {
      const s = document.createElement("script");
      s.src = "//js.hsforms.net/forms/embed/v2.js";
      s.charset = "utf-8";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  const openDownload = useCallback(() => setModal("brochure"), []);
  const openInterest = useCallback(() => setModal("interest"), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar />
      <Hero onDownload={openDownload} onInterest={openInterest} />
      <Overview onDownload={openDownload} onInterest={openInterest} />
      <AmenityGallery />
      <ExploreGallery />
      <FeaturesAmenities />
      <FloorPlans onDownload={openDownload} />
      <Location />
      <RequestCallBack />
      <Footer />

      <AnimatePresence>
        {modal === "brochure" && (
          <HubspotModal title="Download Brochure" containerId="hs-brochure" formId="1b0b460a-dd56-417f-a0c2-061a6ce3f3bc" onClose={closeModal} />
        )}
        {modal === "interest" && (
          <HubspotModal title="Talk to Our Property Consultant" containerId="hs-interest" formId="1b0b460a-dd56-417f-a0c2-061a6ce3f3bc" onClose={closeModal} />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hubspot-modal-form .hs-form fieldset { max-width: 100% !important; }
        .hubspot-modal-form .hs-form .hs-form-field { margin-bottom: 18px !important; }
        .hubspot-modal-form .hs-form label { color: rgba(255,255,255,0.4) !important; font-size: 10px !important; letter-spacing: 0.28em !important; text-transform: uppercase !important; margin-bottom: 7px !important; display: block !important; }
        .hubspot-modal-form .hs-form .hs-input { width: 100% !important; background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 12px !important; color: #fff !important; padding: 13px 16px !important; font-size: 14px !important; outline: none !important; transition: border-color 0.3s, background 0.3s !important; }
        .hubspot-modal-form .hs-form .hs-input:focus { border-color: #A19585 !important; background: rgba(161,149,133,0.08) !important; }
        .hubspot-modal-form .hs-form .hs-button { background: #A19585 !important; color: #0a0f1e !important; border: none !important; border-radius: 12px !important; padding: 14px 40px !important; text-transform: uppercase !important; letter-spacing: 0.3em !important; font-size: 11px !important; font-weight: 600 !important; cursor: pointer !important; margin-top: 8px !important; transition: background 0.3s !important; }
        .hubspot-modal-form .hs-form .hs-button:hover { background: #b5a898 !important; }
        .hubspot-modal-form .hs-form select.hs-input { appearance: auto !important; }
        .hubspot-modal-form .hs-error-msgs { color: #e57373 !important; font-size: 11px !important; margin-top: 4px !important; list-style: none !important; padding: 0 !important; }
        .hubspot-modal-form .hs-form .hs-form-booleancheckbox label { font-size: 12px !important; text-transform: none !important; letter-spacing: 0 !important; color: rgba(255,255,255,0.38) !important; }
        .hubspot-modal-form .hs-form .inputs-list { list-style: none !important; padding: 0 !important; }
      `}</style>
    </main>
  );
}