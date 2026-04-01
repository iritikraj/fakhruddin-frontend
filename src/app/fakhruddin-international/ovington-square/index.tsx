// app/projects/oasis-high-park/page.tsx
"use client";

import { useRef, useState, useEffect } from "react";
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
const PRIMARY = "#A1997F";
const PALE_SILVER = "#C4C7B5";
const MSU_GREEN = "#154741";
const CHINESE_BLACK = "#06191A";
const DEEP_AQUAMARINE = "#408174";
const WHITE = "#FFFFFF";

// Hero Image
const HERO_IMAGE = "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/OvingtonSquare-Featured.webp";

// Amenities with icons
const AMENITIES = [
  { name: "Swimming Pool", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/dubai-world-trade-centre-icon-04.svg" },
  { name: "Fitness Center", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Marina-icon-05.svg" },
  { name: "Kids Play Area", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Mall-icon-09.svg" },
  { name: "Sauna & Steam", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/dubai-world-trade-centre-icon-04.svg" },
  { name: "Covered Parking", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Marina-icon-05.svg" },
  { name: "24/7 Security", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Mall-icon-09.svg" },
  { name: "Community Events", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/dubai-world-trade-centre-icon-04.svg" },
  { name: "Facial Recognition", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Dubai-Islands-Marina-icon-05.svg" },
];

// ─────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────
function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="8" height="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="14" y="4" width="6" height="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 12h2M8 15h2M17 10h2M17 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={PRIMARY} strokeWidth="1.5" fill="none"/>
      <path d="M8 12L11 15L16 9" stroke={PRIMARY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
    tl.fromTo(".hero-eyebrow", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-location", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");

    gsap.to(contentRef.current, {
      y: -60, opacity: 0, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.2 },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      <img src={HERO_IMAGE} alt="Oasis High Park" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${CHINESE_BLACK} 0%, ${CHINESE_BLACK}10 25%, transparent 100%)` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(110deg, ${CHINESE_BLACK} 0%, transparent 70%)` }} />

      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <span className="hero-eyebrow block text-[11px] tracking-[0.4em] uppercase mb-4 opacity-0 font-seitu" style={{ color: PRIMARY }}>
            Fakhruddin Properties
          </span>
          <h1 className="hero-title font-faculty text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-5 opacity-0">
            Ovington
            <br />
            <span style={{ color: PRIMARY }}>Square</span>
          </h1>
          <div className="hero-line w-20 h-[2px] mb-8 origin-left" style={{ background: PRIMARY, transform: "scaleX(0)" }} />
          <div className="hero-location opacity-0 flex items-center gap-2 text-white/70 text-lg">
              <LocationIcon />
              <a href="https://maps.app.goo.gl/wcbeMgH9gwLBxFjYA" target="_blank">
                <span className="font-seitu">Dubai Silicon Oasis, Dubai</span>
              </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-seitu">Scroll</span>
        <div className="w-[1px] h-12 animate-pulse" style={{ background: `linear-gradient(to bottom, ${PRIMARY}, transparent)` }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// GALLERY MODAL
// ─────────────────────────────────────────────────────────────
function GalleryModal({ images, currentIndex, onClose, onPrev, onNext }: { 
  images: string[]; 
  currentIndex: number; 
  onClose: () => void; 
  onPrev: () => void; 
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors">
        <CloseIcon />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 z-10 text-white/50 hover:text-white transition-all p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
      >
        <ArrowLeftIcon />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 z-10 text-white/50 hover:text-white transition-all p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
      >
        <ArrowRightIcon />
      </button>

      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm font-seitu">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROPERTY OVERVIEW SECTION - Redesigned with single image gallery
// ─────────────────────────────────────────────────────────────
function PropertyOverview() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".overview-content", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom-=80" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full py-24 overflow-hidden" style={{ background: WHITE }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="overview-content text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-faculty text-4xl md:text-5xl leading-[1.2] mb-6" style={{ color: CHINESE_BLACK }}>
            Project <span style={{ color: PRIMARY }}> Overview</span>
          </h2>
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: PRIMARY }} />
          
          <div className="space-y-4 text-base leading-relaxed font-seitu max-w-3xl mx-auto" style={{ color: "#4a5568" }}>
            <p>
              Copenhagen Court is a central Basingstoke residential address created for today's rental demand. Located close to the train station and town conveniences, the scheme offers modern one- and two-bedroom apartments suited to commuters and working professionals.
            </p>
            <p>
              The project is positioned for stable occupancy thanks to strong connectivity and local employment drivers. It's a straightforward, well-located built-to-rent asset that prioritises livability, ease of management, and long-term tenant appeal.
            </p>
          </div>
        </motion.div>
      </div>
    </section>    
  );
}

// ─────────────────────────────────────────────────────────────
// KEY INFO CARDS - Redesigned with modern layout
// ─────────────────────────────────────────────────────────────
function KeyInfoCards() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".info-card", { y: 40, opacity: 0, scale: 0.95 }, {
      y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: "back.out(0.3)",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=80" },
    });
  }, { scope: ref });

  const infoItems = [
    { 
      icon: <BuildingIcon />, 
      label: "Completion Status", 
      value: "Completed • 100% Let", 
      gradient: "from-emerald-500/20 to-emerald-600/10" 
    },
    { 
      icon: <CalendarIcon />, 
      label: "Completion Date", 
      value: "Completed", 
      gradient: "from-blue-500/20 to-blue-600/10" 
    },
    { 
      icon: <LocationIcon />, 
      label: "Lease / Sell", 
      value: "Build to Rent", 
      gradient: "from-amber-500/20 to-amber-600/10" 
    },
    { 
      icon: <BuildingIcon />, 
      label: "Inventory Types", 
      value: (
        <div className="space-y-1">
          <div>1 - 2 bedroom</div>
          <div>3 Bedroom Duplex Penthouse</div>
        </div>
      ), 
      gradient: "from-purple-500/20 to-purple-600/10" 
    },
  ];

  return (
    <section ref={ref} className="relative w-full py-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${PALE_SILVER} 0%, ${PALE_SILVER} 100%)` }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 20% 40%, ${WHITE} 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="info-card relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm"
              style={{ 
                background: `linear-gradient(135deg, ${CHINESE_BLACK}, ${DEEP_AQUAMARINE}88)`,
                border: `1px solid ${PRIMARY}20`,
                boxShadow: "0 20px 35px -15px rgba(0,0,0,0.1)"
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${PALE_SILVER}20`, color: PALE_SILVER }}>
                  {item.icon}
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase mb-2 font-seitu" style={{ color: PALE_SILVER }}>
                  {item.label}
                </div>
                <div className="font-faculty text-xl" style={{ color: PALE_SILVER }}>
                  {item.value}
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ background: PALE_SILVER }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
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
      <PropertyOverview />
      <KeyInfoCards />
      <Footer />
    </main>
  );
}