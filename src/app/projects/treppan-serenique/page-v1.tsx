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
// DATA
// ─────────────────────────────────────────────────────────────

// Amenities data with SVG icons
const AMENITIES_CATEGORIES = [
  {
    title: "Therapeutic & Recovery",
    items: [
      { name: "Hyperbaric Oxygen Therapy", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Red Light Therapy", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Flotation Therapy", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
      { name: "Cryotherapy", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Himalayan Salt Brick Sauna", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Meditation Pods", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
    ]
  },
  {
    title: "Water & Relaxation",
    items: [
      { name: "Infinity Swimming Pool", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Splash Pool", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Aqua Gym", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
      { name: "Cold Plunge", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Hot Plunge", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Jacuzzi", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
    ]
  },
  {
    title: "Fitness & Recreation",
    items: [
      { name: "Indoor Gym", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Outdoor Gym", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Mini Golf Course", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
      { name: "Wall Climbing", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Jogging Track", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Padel Court", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
    ]
  },
  {
    title: "Nature & Outdoor",
    items: [
      { name: "Bamboo Oxygen Park", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Koi Pond", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "BBQ Pits", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
      { name: "Outdoor Cinema", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Green House Cafe", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Boardwalk Bridge", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
    ]
  },
  {
    title: "Wellness & Spa",
    items: [
      { name: "Massage Beds", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
      { name: "Male / Female Spa", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Steam Room", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
      { name: "Beauty Salon", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
      { name: "Nail Spa", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
      { name: "Meditation Zone", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
    ]
  },
];

// Auto-slideshow images for Amenities Gallery
const AMENITY_SLIDES = [
  { image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-09.webp", name: "Infinity Swimming Pool" },
  { image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-10.webp", name: "Bamboo Oxygen Park" },
  { image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-12.webp", name: "Rooftop Lounge" },
  { image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-03.webp", name: "Private Courtyard" },
  { image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-04.webp", name: "Aqua Gym" },
];

const GALLERY_IMAGES = {
  Exterior: [
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-03.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-04.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-05.webp",
  ],
  Interior: [
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-01.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-02.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-03.webp",
  ],
};

const FLOOR_PLANS = [
  {
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Even-Floor-Tower-AB_Tower-A-02.webp",
    type: "2 Bedroom",
    totalArea: "980 - 1,483 sq. ft.",
    buaArea: "820 - 1,250 sq. ft.",
  },
  {
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Even-Floor-Tower-AB_Tower-A-06.webp",
    type: "2 Bedroom (Premium)",
    totalArea: "1,200 - 1,450 sq. ft.",
    buaArea: "1,000 - 1,200 sq. ft.",
  },
  {
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/10-12-floor-Tower-A-B_Tower-A-04.webp",
    type: "3 Bedroom",
    totalArea: "1,808 - 1,902 sq. ft.",
    buaArea: "1,550 - 1,650 sq. ft.",
  },
  {
    img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/10-12-floor-Tower-A-B_Tower-B-04.webp",
    type: "3 Bedroom (Terrace)",
    totalArea: "2,100 - 2,400 sq. ft.",
    buaArea: "1,800 - 2,050 sq. ft.",
  },
];

const LOCATION_TABS = [
  { id: "landmark", label: "Landmarks", color: "#1b2946" },
  { id: "amenities", label: "Amenities", color: "#A19585" },
  { id: "transport", label: "Transport", color: "#c4b8aa" },
];

const LOCATION_DATA = {
  landmark: [
    { name: "Dubai Islands Beach", time: "90 sec", distance: "500m", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
    { name: "Dubai Islands Marina", time: "4 min", distance: "2.1km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
    { name: "Waterfront Market", time: "2 min", distance: "500m", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
    { name: "Golf Course & Country Club", time: "5 min", distance: "3km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
  ],
  amenities: [
    { name: "Water Sports & Scuba Diving", time: "2 min", distance: "500m", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
    { name: "Centara Mirage Beach Resort", time: "3 min", distance: "1.2km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
    { name: "Dubai Islands Mall", time: "5 min", distance: "3km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
    { name: "Fine Dining Restaurants", time: "4 min", distance: "2.5km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
  ],
  transport: [
    { name: "Gold Souq Metro Station", time: "12 min", distance: "7.6km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
    { name: "Jumeirah Street (D94)", time: "15 min", distance: "11.6km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg" },
    { name: "Sheikh Zayed Road (E11)", time: "17 min", distance: "15.5km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg" },
    { name: "Dubai International Airport", time: "23 min", distance: "21km", icon: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg" },
  ],
};

// ─────────────────────────────────────────────────────────────
// HUBSPOT MODAL (Enhanced)
// ─────────────────────────────────────────────────────────────
interface HubSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formId: string;
  containerId: string;
}

function HubSpotModal({ isOpen, onClose, title, formId, containerId }: HubSpotModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).hbspt) {
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = "";
        (window as any).hbspt.forms.create({
          region: "na1",
          portalId: "49053274",
          formId,
          target: `#${containerId}`,
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [isOpen, formId, containerId]);

  useEffect(() => {
    if (!isOpen) return;
    if (!(window as any).hbspt) {
      const script = document.createElement("script");
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.charset = "utf-8";
      script.type = "text/javascript";
      document.head.appendChild(script);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background: "linear-gradient(145deg, #1b2946 0%, #0f192f 100%)",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/15">
              <h3 className="text-white text-xl tracking-wide" style={{ fontWeight: 300, letterSpacing: "0.02em" }}>
                {title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            {/* Form container with enhanced styling */}
            <div className="px-8 py-8" id={containerId} />
            <style jsx>{`
              :global(#${containerId} .hs-form-field label) {
                color: rgba(255,255,255,0.5) !important;
                font-size: 11px !important;
                letter-spacing: 0.2em !important;
                text-transform: uppercase !important;
                margin-bottom: 8px !important;
                display: block !important;
              }
              :global(#${containerId} .hs-input) {
                background: rgba(255,255,255,0.08) !important;
                border: 1px solid rgba(255,255,255,0.15) !important;
                border-radius: 12px !important;
                color: white !important;
                padding: 14px 18px !important;
                width: 100% !important;
                transition: all 0.3s ease !important;
              }
              :global(#${containerId} .hs-input:focus) {
                border-color: #A19585 !important;
                background: rgba(255,255,255,0.12) !important;
                outline: none !important;
                box-shadow: 0 0 0 3px rgba(161,149,133,0.2) !important;
              }
              :global(#${containerId} .hs-button) {
                background: linear-gradient(135deg, #A19585 0%, #8e7d6d 100%) !important;
                border: none !important;
                border-radius: 40px !important;
                color: white !important;
                letter-spacing: 0.2em !important;
                text-transform: uppercase !important;
                padding: 14px 28px !important;
                font-size: 11px !important;
                font-weight: 500 !important;
                cursor: pointer !important;
                width: 100% !important;
                transition: all 0.3s ease !important;
                margin-top: 8px !important;
              }
              :global(#${containerId} .hs-button:hover) {
                transform: translateY(-2px) !important;
                box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3) !important;
              }
              :global(#${containerId} .hs-error-msgs) {
                color: #f87171 !important;
                font-size: 11px !important;
                margin-top: 4px !important;
              }
              :global(#${containerId} .hs-form-field) {
                margin-bottom: 20px !important;
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// LIGHTBOX (Enhanced)
// ─────────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}
function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white/60 hover:text-white text-4xl z-10 transition-all duration-300 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
      >
        ×
      </button>
      <button
        onClick={onPrev}
        className="absolute left-6 md:left-12 text-white/50 hover:text-white text-5xl z-10 transition-all duration-300 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
      >
        ‹
      </button>
      <motion.img
        key={index}
        src={images[index]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <button
        onClick={onNext}
        className="absolute right-6 md:right-12 text-white/50 hover:text-white text-5xl z-10 transition-all duration-300 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
      >
        ›
      </button>
      <div className="absolute bottom-8 text-white/40 text-xs tracking-[0.25em] uppercase bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO (Left-aligned)
// ─────────────────────────────────────────────────────────────
function Hero({ onBrochure, onInterest }: { onBrochure: () => void; onInterest: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    tl.to(videoRef.current, { scale: 1.2, opacity: 0.5, ease: "power2.inOut" })
      .to(contentRef.current, { opacity: 0, y: -60, ease: "power2.inOut" }, 0);

    gsap.fromTo(".hero-title-line", 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(".hero-subtitle", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(".hero-btns", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
    );
    gsap.fromTo(".hero-line", 
      { width: 0, opacity: 0 },
      { width: 80, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      <div ref={contentRef} className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24 pb-24">
        <div className="max-w-3xl">
          <img
            src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-serenique-logo.png"
            alt="Tréppan Serenique"
            className="h-20 md:h-28 object-contain mb-6 opacity-90"
          />
          <div className="hero-line w-0 h-[2px] bg-[#A19585] mb-6" />
          <p className="hero-subtitle text-[#A19585] text-xs sm:text-sm tracking-[0.3em] mb-4 uppercase opacity-0">
            UAE's First Longevity Living Community
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] opacity-0" style={{ fontWeight: 300 }}>
            <span className="hero-title-line block">Experience The</span>
            <span className="hero-title-line block text-[#A19585]">UAE's First Longevity</span>
            <span className="hero-title-line block">Living Community</span>
          </h1>
          <div className="hero-btns flex gap-5 mt-10 opacity-0">
            <button
              onClick={onBrochure}
              className="group relative inline-flex items-center gap-4 bg-[#A19585] text-white text-xs tracking-[0.3em] uppercase px-8 py-4 overflow-hidden hover:bg-[#8e7d6d] transition-all duration-400"
            >
              <span>Download Brochure</span>
              <div className="w-6 h-[1px] bg-white/60 group-hover:w-10 transition-all duration-400" />
            </button>
            <button
              onClick={onInterest}
              className="group inline-flex items-center gap-4 border border-white/30 text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:border-[#A19585] hover:bg-white/5 transition-all duration-400"
            >
              <span>Express Interest</span>
              <div className="w-6 h-[1px] bg-[#A19585]/50 group-hover:w-10 transition-all duration-400" />
            </button>
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
// OVERVIEW (New Layout)
// ─────────────────────────────────────────────────────────────
function Overview({ onBrochure }: { onBrochure: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=100", end: "top center", scrub: 1 },
      }
    );
    gsap.fromTo(".overview-feature",
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".overview-features", start: "top bottom-=80" },
      }
    );
  }, { scope: ref });

  const features = [
    "Perpetual Island Escape",
    "Resort-Style Indulgence",
    "Rejuvenation & Cellular Renewal",
    "Pure Air, Elevated Health",
    "Vitalising Water at Home",
    "Views That Restore the Mind",
    "Intelligent Living, Lower Impact",
  ];

  return (
    <section ref={ref} className="relative w-full bg-white py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A19585]/30 to-transparent" />
      
      <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-6">Overview</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1b2946] leading-tight mb-6" style={{ fontWeight: 300 }}>
              A Sanctuary of<br />
              <span className="text-[#A19585]">Serenity by the Sea</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#A19585] mb-6" />
            <p className="text-[#1b2946]/65 text-base leading-relaxed mb-8">
              Welcome home to perpetual holidays at Tréppan Serenique Residences. Created with a singular purpose, this address reimagines home as a sanctuary for longevity, balance, and inspired island living. Designed for those who seek more than luxury, Serenique is a place where life unfolds with intention and ease, nurturing physical vitality, mental clarity, and emotional harmony.
            </p>
            <button
              onClick={onBrochure}
              className="group inline-flex items-center gap-4 bg-[#1b2946] text-white text-xs tracking-[0.35em] uppercase px-10 py-5 hover:bg-[#A19585] transition-all duration-400"
            >
              <span>Download Brochure</span>
              <div className="w-6 h-[1px] bg-white/50 group-hover:w-10 transition-all duration-400" />
            </button>
          </div>

          {/* Right Features Grid */}
          <div className="overview-features grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="overview-feature group flex items-center gap-3 p-4 border-l-2 border-[#A19585]/30 hover:border-[#A19585] transition-all duration-300">
                <div className="w-1 h-1 bg-[#A19585] rounded-full group-hover:scale-150 transition-transform duration-300" />
                <span className="text-[#1b2946]/60 text-sm group-hover:text-[#1b2946] transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-[#1b2946]/10">
          {[
            { v: "53+", l: "Resort-Style Amenities" },
            { v: "AED 2.9M", l: "Starting Price" },
            { v: "G+18", l: "Floors" },
            { v: "100%", l: "Wellness Focused" },
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-4xl text-[#A19585] group-hover:scale-105 transition-transform duration-300" style={{ fontWeight: 300 }}>
                {s.v}
              </div>
              <div className="text-[#1b2946]/50 text-[10px] tracking-[0.25em] uppercase mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// AMENITIES GALLERY (Auto-slideshow with name + arrows)
// ─────────────────────────────────────────────────────────────
function AmenitiesGallery() {
  const ref = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % AMENITY_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + AMENITY_SLIDES.length) % AMENITY_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  useGSAP(() => {
    gsap.fromTo(".gallery-heading", 
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={AMENITY_SLIDES[currentIndex].image}
            alt={AMENITY_SLIDES[currentIndex].name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-16 lg:p-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[#A19585] text-xs tracking-[0.3em] uppercase mb-3"
            >
              Featured Amenity
            </motion.p>
            <motion.h2
              key={currentIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
              style={{ fontWeight: 300 }}
            >
              {AMENITY_SLIDES[currentIndex].name}
            </motion.h2>
            <div className="w-12 h-[2px] bg-[#A19585] mt-4" />
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => { prevSlide(); setIsPlaying(false); }}
              className="group w-14 h-14 flex items-center justify-center border border-white/30 hover:border-[#A19585] hover:bg-[#A19585]/20 transition-all duration-300"
              aria-label="Previous"
            >
              <span className="text-white text-2xl group-hover:text-[#A19585] transition-colors">←</span>
            </button>
            <button
              onClick={() => { nextSlide(); setIsPlaying(false); }}
              className="group w-14 h-14 flex items-center justify-center border border-white/30 hover:border-[#A19585] hover:bg-[#A19585]/20 transition-all duration-300"
              aria-label="Next"
            >
              <span className="text-white text-2xl group-hover:text-[#A19585] transition-colors">→</span>
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-3 mt-8">
          {AMENITY_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); setIsPlaying(false); }}
              className={`transition-all duration-300 ${i === currentIndex ? "w-8 bg-[#A19585]" : "w-4 bg-white/40 hover:bg-white/60"}`}
              style={{ height: "2px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// EXPLORE GALLERY (3D card, thumbnail-less, popup)
// ─────────────────────────────────────────────────────────────
function ExploreGallery() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"Exterior" | "Interior">("Exterior");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = GALLERY_IMAGES[activeTab];

  useEffect(() => {
    setGalleryIndex(0);
  }, [activeTab]);

  const openLightbox = () => setLightboxIndex(galleryIndex);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev! + 1) % images.length);
  const prevImage = () => setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
  const nextGallery = () => setGalleryIndex((prev) => (prev + 1) % images.length);
  const prevGallery = () => setGalleryIndex((prev) => (prev - 1 + images.length) % images.length);

  useGSAP(() => {
    gsap.fromTo(".explore-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full bg-[#f8f7f5] py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Heading */}
        <div className="explore-heading text-center mb-16">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Explore</span>
          <h2 className="text-4xl md:text-5xl text-[#1b2946] leading-tight mb-6" style={{ fontWeight: 300 }}>
            Explore Tréppan Serenique Residences
          </h2>
          {/* Tabs */}
          <div className="inline-flex border border-[#1b2946]/10 rounded-full overflow-hidden">
            {(["Exterior", "Interior"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-xs tracking-[0.3em] uppercase transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#1b2946] text-white"
                    : "text-[#1b2946]/50 hover:text-[#1b2946]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Card Image Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + galleryIndex}
            initial={{ opacity: 0, rotateY: 5, scale: 0.98 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -5, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            <div
              className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              onClick={openLightbox}
            >
              <img
                src={images[galleryIndex]}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 flex gap-2">
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-xs tracking-[0.2em] uppercase">
                    {activeTab} · {galleryIndex + 1}/{images.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevGallery(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#A19585] transition-all duration-300 hover:scale-110"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextGallery(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#A19585] transition-all duration-300 hover:scale-110"
            >
              →
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Banner with Gradient */}
      <div className="relative mt-20 mx-6 md:mx-16 lg:mx-24 overflow-hidden rounded-3xl">
        <div
          className="relative z-10 px-10 py-16 md:py-24 text-center"
          style={{
            background: "linear-gradient(135deg, #1b2946 0%, #2a3a5c 50%, #1b2946 100%)",
            boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 border border-white/10 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-96 h-96 border border-white/10 rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>
          <h3 className="text-2xl md:text-4xl text-white mb-4" style={{ fontWeight: 300 }}>
            Ready to Experience Tréppan Serenique?
          </h3>
          <p className="text-white/60 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Step into a world built for wellbeing and future-ready living. From biohacking therapies to AI-enabled smart homes and 53+ resort-style amenities, Tréppan Serenique transforms everyday life into a symphony of ease, renewal, and health-centred journey.
          </p>
          <a
            href="#request-callback"
            className="inline-flex items-center gap-3 bg-[#A19585] text-white text-xs tracking-[0.3em] uppercase px-10 py-4 rounded-full hover:bg-[#8e7d6d] hover:scale-105 transition-all duration-400 shadow-lg"
          >
            Book a Meeting
          </a>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURES & AMENITIES (Categorized with SVG icons)
// ─────────────────────────────────────────────────────────────
function FeaturesAmenities() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".amenities-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
    gsap.fromTo(".amenity-category",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".amenities-grid", start: "top bottom-=100" },
      }
    );
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative w-full py-28 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0a0a18 0%, #12122a 100%)",
      }}
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 border border-[#A19585]/10 rounded-full animate-ping" style={{ animationDuration: "6s" }} />
          <div className="absolute inset-[15%] border border-[#A19585]/15 rounded-full animate-spin" style={{ animationDuration: "15s" }} />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Heading */}
        <div className="amenities-heading text-center mb-16">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Features & Amenities</span>
          <h2 className="text-4xl md:text-5xl text-white leading-tight" style={{ fontWeight: 300 }}>
            53+ Resort-Style<br />
            <span className="text-[#A19585]">Experiences Await</span>
          </h2>
          <div className="w-14 h-[2px] bg-[#A19585] mx-auto mt-6" />
        </div>

        {/* Amenities Grid - Categorized */}
        <div className="amenities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {AMENITIES_CATEGORIES.map((category, idx) => (
            <div key={idx} className="amenity-category group">
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-[#A19585]/40 transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-[#A19585] text-sm tracking-[0.2em] uppercase mb-4 font-medium">
                  {category.title}
                </h3>
                <div className="w-10 h-[1px] bg-[#A19585]/50 mb-5" />
                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 group/item hover:pl-2 transition-all duration-300">
                      <img src={item.icon} alt="" className="w-5 h-5 opacity-60 group-hover/item:opacity-100 transition-opacity duration-300" />
                      <span className="text-white/60 text-xs leading-relaxed group-hover/item:text-white/90 transition-colors duration-300">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FLOOR PLANS (Enhanced)
// ─────────────────────────────────────────────────────────────
function FloorPlans() {
  const ref = useRef<HTMLElement>(null);
  const [planIndex, setPlanIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const currentPlan = FLOOR_PLANS[planIndex];

  const nextPlan = () => setPlanIndex((prev) => (prev + 1) % FLOOR_PLANS.length);
  const prevPlan = () => setPlanIndex((prev) => (prev - 1 + FLOOR_PLANS.length) % FLOOR_PLANS.length);

  useGSAP(() => {
    gsap.fromTo(".floor-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
    gsap.fromTo(".floor-content",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full bg-[#f8f7f5] py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="floor-heading text-center mb-16">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Floor Plans</span>
          <h2 className="text-4xl md:text-5xl text-[#1b2946] leading-tight" style={{ fontWeight: 300 }}>
            Discover the Floor Plans
          </h2>
          <p className="text-[#1b2946]/50 text-sm max-w-2xl mx-auto mt-4">
            Tréppan Serenique offers a curated collection of 2- and 3-bedroom residences designed for expansive living.
          </p>
        </div>

        <div className="floor-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with 3D effect */}
          <div
            className="relative group cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" style={{ transformStyle: "preserve-3d" }}>
              <img
                src={currentPlan.img}
                alt={currentPlan.type}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-[10px] tracking-[0.2em] uppercase">Click to enlarge</span>
              </div>
            </div>
            {/* Navigation Arrows */}
            {FLOOR_PLANS.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevPlan(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1b2946] hover:bg-[#A19585] hover:text-white transition-all duration-300 shadow-md"
                >
                  ←
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextPlan(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1b2946] hover:bg-[#A19585] hover:text-white transition-all duration-300 shadow-md"
                >
                  →
                </button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {FLOOR_PLANS.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setPlanIndex(i); }}
                  className={`transition-all duration-300 ${i === planIndex ? "w-6 bg-[#A19585]" : "w-2 bg-white/60"}`}
                  style={{ height: "2px" }}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h3 className="text-[#1b2946] text-2xl md:text-3xl mb-4" style={{ fontWeight: 300 }}>{currentPlan.type}</h3>
            <div className="w-12 h-[2px] bg-[#A19585] mb-8" />
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#1b2946]/10">
                <span className="text-[#1b2946]/50 text-xs tracking-[0.2em] uppercase">Type</span>
                <span className="text-[#1b2946] font-light">{currentPlan.type}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#1b2946]/10">
                <span className="text-[#1b2946]/50 text-xs tracking-[0.2em] uppercase">Total Area</span>
                <span className="text-[#A19585]" style={{ fontWeight: 300 }}>{currentPlan.totalArea}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#1b2946]/10">
                <span className="text-[#1b2946]/50 text-xs tracking-[0.2em] uppercase">BUA Area</span>
                <span className="text-[#A19585]" style={{ fontWeight: 300 }}>{currentPlan.buaArea}</span>
              </div>
            </div>
            <button className="mt-10 group inline-flex items-center gap-4 border border-[#1b2946]/20 text-[#1b2946] text-xs tracking-[0.3em] uppercase px-8 py-4 rounded-full hover:border-[#A19585] hover:text-[#A19585] hover:bg-white transition-all duration-400 w-fit">
              <span>Download Floor Plan</span>
              <div className="w-5 h-[1px] bg-[#A19585]/50 group-hover:w-8 transition-all duration-400" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={FLOOR_PLANS.map((p) => p.img)}
            index={planIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={prevPlan}
            onNext={nextPlan}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// LOCATION (Enhanced with icons and 3D tabs)
// ─────────────────────────────────────────────────────────────
function Location() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"landmark" | "amenities" | "transport">("landmark");

  const currentData = LOCATION_DATA[activeTab];
  const activeColor = LOCATION_TABS.find(t => t.id === activeTab)?.color || "#1b2946";

  useGSAP(() => {
    gsap.fromTo(".location-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
    gsap.fromTo(".location-item",
      { opacity: 0, x: 20 },
      {
        opacity: 1, x: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".location-list", start: "top bottom-=80" },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full bg-white py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="location-heading text-center mb-16">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Location</span>
          <h2 className="text-4xl md:text-5xl text-[#1b2946] leading-tight" style={{ fontWeight: 300 }}>
            A Rare Harmony of<br />
            <span className="text-[#A19585]">Coastal Calm and City Pulse.</span>
          </h2>
          <p className="text-[#1b2946]/50 text-sm max-w-2xl mx-auto mt-4">
            Perched just moments from Dubai Islands shores, the Twin Towers echo nature's rhythms while offering seamless access to key city destinations and attractions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="relative w-full h-80 md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
            <iframe
              src="https://maps.google.com/maps?q=Treppan+Serenique+Dubai&output=embed&z=14"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Tréppan Serenique Location"
              className="w-full h-full"
            />
            <div className="absolute bottom-4 left-4">
              <a
                href="https://maps.app.goo.gl/5447LSgHiupmCYU77"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1b2946] text-white text-xs tracking-[0.25em] uppercase px-6 py-3 rounded-full hover:bg-[#A19585] transition-all duration-400 shadow-lg"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Side - Tabs with 3D effect */}
          <div>
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-8">
              {LOCATION_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`relative px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-xl ${
                    activeTab === tab.id
                      ? "text-white shadow-lg"
                      : "text-[#1b2946]/50 hover:text-[#1b2946]"
                  }`}
                  style={{
                    background: activeTab === tab.id ? tab.color : "transparent",
                    boxShadow: activeTab === tab.id ? "0 10px 20px -5px rgba(0,0,0,0.2)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Location Items */}
            <div className="location-list space-y-3">
              {currentData.map((item, i) => (
                <div
                  key={i}
                  className="location-item group flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:translate-x-1 cursor-default"
                  style={{
                    background: "linear-gradient(145deg, #f9f9f9 0%, #ffffff 100%)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <img src={item.icon} alt="" className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div>
                      <p className="text-[#1b2946] text-sm font-medium group-hover:text-[#A19585] transition-colors duration-300">
                        {item.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#A19585] text-xs tracking-[0.1em] font-medium bg-[#A19585]/10 px-3 py-1 rounded-full">
                      {item.time}
                    </span>
                    <span className="text-[#1b2946]/40 text-xs">
                      {item.distance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// REQUEST CALLBACK (Enhanced Form)
// ─────────────────────────────────────────────────────────────
function RequestCallback() {
  const ref = useRef<HTMLElement>(null);
  const formLoaded = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !formLoaded.current) {
          formLoaded.current = true;
          const loadForm = () => {
            if ((window as any).hbspt) {
              (window as any).hbspt.forms.create({
                region: "na1",
                portalId: "49053274",
                formId: "09a128eb-2ba8-4163-b316-9d7e8d6a07cb",
                target: "#inline-hubspot-form-container",
              });
            }
          };
          if (!(window as any).hbspt) {
            const script = document.createElement("script");
            script.src = "//js.hsforms.net/forms/embed/v2.js";
            script.charset = "utf-8";
            script.onload = loadForm;
            document.head.appendChild(script);
          } else {
            loadForm();
          }
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".callback-content",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
  }, { scope: ref });

  return (
    <section
      id="request-callback"
      ref={ref}
      className="relative w-full py-28 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0a0a18 0%, #12122a 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(161,149,133,0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 callback-content">
        <div className="text-center mb-12">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Connect With Us</span>
          <h2 className="text-3xl md:text-5xl text-white leading-tight" style={{ fontWeight: 300 }}>
            Request Call Back
          </h2>
          <div className="w-12 h-[2px] bg-[#A19585] mx-auto mt-6" />
          <p className="text-white/40 text-sm mt-4">Our property consultants will reach out to you shortly</p>
        </div>

        {/* Enhanced Form Container */}
        <div
          id="inline-hubspot-form-container"
          className="hubspot-form-enhanced"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "32px",
            padding: "32px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        />

        <style>{`
          #inline-hubspot-form-container .hs-form-field {
            margin-bottom: 24px !important;
          }
          #inline-hubspot-form-container .hs-form-field label {
            color: rgba(255,255,255,0.5) !important;
            font-size: 11px !important;
            letter-spacing: 0.2em !important;
            text-transform: uppercase !important;
            margin-bottom: 8px !important;
            display: block !important;
          }
          #inline-hubspot-form-container .hs-input {
            background: rgba(255,255,255,0.08) !important;
            border: 1px solid rgba(255,255,255,0.15) !important;
            border-radius: 16px !important;
            color: white !important;
            padding: 14px 20px !important;
            width: 100% !important;
            transition: all 0.3s ease !important;
          }
          #inline-hubspot-form-container .hs-input:focus {
            border-color: #A19585 !important;
            background: rgba(255,255,255,0.12) !important;
            outline: none !important;
            box-shadow: 0 0 0 4px rgba(161,149,133,0.2) !important;
          }
          #inline-hubspot-form-container .hs-button {
            background: linear-gradient(135deg, #A19585 0%, #8e7d6d 100%) !important;
            border: none !important;
            border-radius: 40px !important;
            color: white !important;
            letter-spacing: 0.2em !important;
            text-transform: uppercase !important;
            padding: 14px 32px !important;
            font-size: 11px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            width: 100% !important;
            transition: all 0.3s ease !important;
            margin-top: 8px !important;
          }
          #inline-hubspot-form-container .hs-button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 15px 30px -10px rgba(0,0,0,0.4) !important;
          }
          #inline-hubspot-form-container .hs-error-msgs {
            color: #f87171 !important;
            font-size: 11px !important;
            margin-top: 6px !important;
          }
        `}</style>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────
export default function TreppanSereniquePage() {
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar />
      <Hero onBrochure={() => setBrochureOpen(true)} onInterest={() => setInterestOpen(true)} />
      <Overview onBrochure={() => setBrochureOpen(true)} />
      <AmenitiesGallery />
      <ExploreGallery />
      <FeaturesAmenities />
      <FloorPlans />
      <Location />
      <RequestCallback />
      <Footer />

      <HubSpotModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        title="Download Brochure"
        formId="1b0b460a-dd56-417f-a0c2-061a6ce3f3bc"
        containerId="hubspot-brochure-form"
      />
      <HubSpotModal
        isOpen={interestOpen}
        onClose={() => setInterestOpen(false)}
        title="Talk to Our Property Consultant"
        formId="1b0b460a-dd56-417f-a0c2-061a6ce3f3bc"
        containerId="hubspot-interest-form"
      />
    </main>
  );
}