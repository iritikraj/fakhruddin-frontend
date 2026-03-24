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
const AMENITIES = [
  "Master Bedroom Design Therapy",
  "Flotation Therapy",
  "Cryotherapy",
  "Sauna & Steam Rooms",
  "Sensory Quiet Sanctuary Room",
  "Lucid Bridge",
  "Neuroprogramming Area",
  "MIA Spa",
  "Infrared Sauna",
  "Beauty Salon",
  "5-star Pool",
  "Resident's Pool",
  "Lazy River",
  "Aqua Treading",
  "Garden Walkway",
  "Clubhouse Kitchen",
  "Jogging Track",
  "Pilates Room",
  "Yoga Golf Corner",
  "Main Fountain",
  "Cornhole Gaming",
  "Infinity Serenity Pool",
  "App Floors",
  "Footbath Area",
  "Surf Simulator",
  "Archery/Axe Throwing",
  "Outdoor Cinema Room",
  "Co-Working Space",
  "MKS Astronomy Wall",
  "Kids Play Area",
  "Rooftop Infinity Pool",
  "NBA-Style Slide",
  "Padel Court",
  "Badminton",
  "Squash Court",
  "BBQ Cabanas",
  "Outdoor Jacuzzi Hub",
  "Dr. Maria Therapy",
  "Blueberry And Vero Bella Pool",
  "Joao Rooftop",
  "Access Cabanas",
  "Sea Deck Cabana",
  "Salt Water Sensory Isolation Pod",
];

const FLOOR_PLANS = {
  Standard: [
    {
      img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-03.webp",
      type: "1 Bedroom",
      totalArea: "800 – 1,100 Sq.ft.",
      buaArea: "650 – 850 Sq.ft.",
    },
    {
      img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-04.webp",
      type: "2 Bedroom",
      totalArea: "1,200 – 1,600 Sq.ft.",
      buaArea: "1,000 – 1,350 Sq.ft.",
    },
  ],
  Terrace: [
    {
      img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-05.webp",
      type: "3 Bedroom Terrace",
      totalArea: "2,100 – 2,800 Sq.ft.",
      buaArea: "1,700 – 2,200 Sq.ft.",
    },
  ],
};

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

const NEARBY = [
  { label: "Jumeirah Beach", distance: "5 min" },
  { label: "Dubai Internet Marina", distance: "8 min" },
  { label: "Dubai Mall", distance: "15 min" },
  { label: "Downtown Dubai and DIFC", distance: "20 min" },
  { label: "Atlantis", distance: "22 min" },
  { label: "Dubai International Airport", distance: "35 min" },
];

// ─────────────────────────────────────────────────────────────
// HUBSPOT MODAL
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
    // Load HubSpot script if not present
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
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 bg-[#1b2946] w-full max-w-lg rounded-sm overflow-hidden shadow-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
              <h3 className="text-white text-xl" style={{ fontWeight: 300, letterSpacing: "0.02em" }}>
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>
            {/* Form container */}
            <div className="px-8 py-6" id={containerId} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// LIGHTBOX
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white/50 hover:text-white text-4xl z-10"
      >
        ×
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 text-white/40 hover:text-white text-4xl z-10 transition-colors"
      >
        ‹
      </button>
      <motion.img
        key={index}
        src={images[index]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 text-white/40 hover:text-white text-4xl z-10 transition-colors"
      >
        ›
      </button>
      <div className="absolute bottom-6 text-white/30 text-xs tracking-[0.25em] uppercase">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
function Hero({ onBrochure, onInterest }: { onBrochure: () => void; onInterest: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
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
    tl.to(videoRef.current, { scale: 1.3, opacity: 0.4, ease: "power2.inOut" })
      .to(contentRef.current, { opacity: 0, y: -80, ease: "power2.inOut" }, 0);

    gsap.fromTo(logoRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, delay: 0.3, ease: "power3.out" }
    );
    gsap.fromTo(lineRef.current,
      { width: 0, opacity: 0 },
      { width: 60, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
    );
    gsap.fromTo(".hero-btns",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power3.out" }
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 z-20 w-full h-[2px] bg-gradient-to-r from-[#A19585] via-[#A19585]/50 to-transparent" />

      <div ref={contentRef} className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <img
          ref={logoRef}
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-serenique-logo.png"
          alt="Tréppan Serenique"
          className="h-24 md:h-32 lg:h-40 object-contain mb-8 opacity-0"
        />

        <div ref={lineRef} className="w-14 h-[1px] bg-[#A19585] mb-6 opacity-0" />

        <p className="hero-subtitle text-white/60 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 opacity-0">
          Serenity by the Sea · Dubai
        </p>

        <p className="hero-subtitle text-white/40 text-xs tracking-[0.25em] uppercase mb-10 opacity-0">
          Starting From AED 2.9M
        </p>

        <div className="hero-btns flex gap-4 opacity-0">
          <button
            onClick={onBrochure}
            className="group relative inline-flex items-center gap-3 bg-[#A19585] text-white text-xs tracking-[0.3em] uppercase px-8 py-4 overflow-hidden hover:bg-[#8e7d6d] transition-colors duration-400"
          >
            <span>Download Brochure</span>
            <div className="w-4 h-[1px] bg-white/60 group-hover:w-8 transition-all duration-400" />
          </button>
          <button
            onClick={onInterest}
            className="group inline-flex items-center gap-3 border border-white/30 text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:border-[#A19585] hover:bg-white/5 transition-all duration-400"
          >
            <span>Express Interest</span>
            <div className="w-4 h-[1px] bg-[#A19585]/50 group-hover:w-8 transition-all duration-400" />
          </button>
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
// OVERVIEW
// ─────────────────────────────────────────────────────────────
function Overview({ onBrochure }: { onBrochure: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(imageRef.current, {
      y: "20%",
      ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
    });
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: 80 },
      {
        opacity: 1, x: 0, duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=100", end: "top center", scrub: 1 },
      }
    );
    gsap.fromTo(".overview-stat",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".overview-stats", start: "top bottom-=80", end: "top center", scrub: 1 },
      }
    );
  }, { scope: ref });

  return (
    <section id="overview" ref={ref} className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Left parallax image */}
      <div ref={imageRef} className="absolute left-0 top-0 w-full md:w-1/2 h-[130%]">
        <img
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Wideup-lady.webp"
          alt="Tréppan Serenique Overview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
      </div>

      {/* Watermark */}
      <div className="absolute bottom-10 left-4 pointer-events-none select-none z-0">
        <span className="text-[18vw] leading-none text-black/[0.04]" style={{ fontWeight: 300, letterSpacing: "-0.04em" }}>
          2026
        </span>
      </div>

      <div ref={contentRef} className="relative z-10 min-h-screen flex items-center justify-end px-6 md:px-16 lg:px-24">
        <div className="w-full md:w-[55%] lg:w-[50%] py-24 md:py-32">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-6">Overview</span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1b2946] leading-tight mb-8" style={{ fontWeight: 300 }}>
            A Sanctuary of<br />
            <span className="text-[#A19585] italic">Serenity by the Sea.</span>
          </h2>

          <div className="w-16 h-[2px] bg-[#A19585] mb-8" />

          <div className="space-y-4 text-[#1b2946]/65 text-[15px] leading-relaxed mb-10">
            <p>
              Discover serenity inspired by Tréppan Serenique, where the future of home comes with ample leisure, the feeling of being transformed by its beachside location by a luxury resort lifestyle offered by its resort amenities with 53+ resort-style amenities and a healing ocean environment. This has been crafted to become the most wellness-advanced and amenities-laden development in Dubai.
            </p>
            <ul className="space-y-2 mt-4">
              {[
                "Multiple bedroom configurations",
                "Resort-style amenities",
                "Up to 53+ resort-style amenities",
                "Intelligent smart homes",
                "Steps away from the Beach",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#1b2946]/65 text-sm">
                  <div className="w-4 h-[1px] bg-[#A19585] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="overview-stats grid grid-cols-2 gap-6 border-t border-black/8 pt-8 mb-8">
            {[
              { v: "53+", l: "Resort-Style Amenities" },
              { v: "AED 2.9M", l: "Starting Price" },
              { v: "G+18", l: "Floors" },
              { v: "100%", l: "Wellness Focused" },
            ].map((s, i) => (
              <div key={i} className="overview-stat group">
                <div className="text-3xl md:text-4xl text-[#A19585] group-hover:scale-105 transition-transform duration-300" style={{ fontWeight: 300 }}>
                  {s.v}
                </div>
                <div className="text-[#1b2946]/50 text-xs tracking-[0.25em] uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <button
            onClick={onBrochure}
            className="group inline-flex items-center gap-4 bg-[#1b2946] text-white text-xs tracking-[0.35em] uppercase px-10 py-5 hover:bg-[#A19585] transition-colors duration-400"
          >
            <span>Download Brochure</span>
            <div className="w-6 h-[1px] bg-white/50 group-hover:w-10 transition-all duration-400" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// AMENITIES GALLERY (full-width image strip)
// ─────────────────────────────────────────────────────────────
function AmenitiesGallery() {
  const ref = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryImages = [
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-09.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-10.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-10.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-12.webp",
  ];

  useGSAP(() => {
    gsap.fromTo(".amenities-gallery-img",
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
      }
    );
    gsap.fromTo(".gallery-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full bg-[#0d0d1a] py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 mb-14">
        <div className="gallery-heading">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Amenities</span>
          <h2 className="text-4xl md:text-5xl text-white leading-tight" style={{ fontWeight: 300 }}>
            Podium Infinity Pool
          </h2>
        </div>
      </div>

      {/* Image strip */}
      <div className="flex gap-2 px-6 md:px-16 lg:px-24 overflow-x-auto scrollbar-hide pb-4">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="amenities-gallery-img relative flex-shrink-0 w-[60vw] md:w-[35vw] lg:w-[28vw] h-64 md:h-80 lg:h-96 overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={img}
              alt={`Amenity ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
              <div className="w-12 h-12 border border-white/50 flex items-center justify-center text-white text-xl">
                +
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2 justify-center mt-8">
        {galleryImages.map((_, i) => (
          <div key={i} className={`w-6 h-[2px] ${i === 0 ? "bg-[#A19585]" : "bg-white/20"}`} />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
            onNext={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// EXPLORE GALLERY (Tabbed Interior / Exterior)
// ─────────────────────────────────────────────────────────────
function ExploreGallery() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"Exterior" | "Interior">("Exterior");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const images = GALLERY_IMAGES[activeTab];

  useEffect(() => {
    setCarouselIndex(0);
  }, [activeTab]);

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
    <section ref={ref} className="relative w-full bg-white py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Heading */}
        <div className="explore-heading text-center mb-14">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Explore</span>
          <h2 className="text-4xl md:text-5xl text-[#1b2946] leading-tight mb-6" style={{ fontWeight: 300 }}>
            Explore Tréppan Serenique Residences
          </h2>
          {/* Tabs */}
          <div className="inline-flex border border-[#1b2946]/10 mt-2">
            {(["Exterior", "Interior"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-3 text-xs tracking-[0.3em] uppercase transition-all duration-300 ${
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

        {/* Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Main large image */}
            <div
              className="relative w-full h-72 md:h-[500px] overflow-hidden cursor-pointer group mb-4"
              onClick={() => setLightboxIndex(carouselIndex)}
            >
              <img
                src={images[carouselIndex]}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                <div className="w-14 h-14 border border-white/60 flex items-center justify-center text-white text-2xl">
                  ↗
                </div>
              </div>
              {/* Nav arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); setCarouselIndex((carouselIndex - 1 + images.length) % images.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white flex items-center justify-center hover:bg-[#A19585] transition-colors duration-300"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCarouselIndex((carouselIndex + 1) % images.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white flex items-center justify-center hover:bg-[#A19585] transition-colors duration-300"
              >
                ›
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`relative flex-shrink-0 w-24 h-16 md:w-36 md:h-24 overflow-hidden cursor-pointer transition-all duration-300 ${
                    i === carouselIndex ? "ring-2 ring-[#A19585]" : "opacity-60 hover:opacity-90"
                  }`}
                  onClick={() => setCarouselIndex(i)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Banner */}
      <div
        className="relative mt-20 mx-6 md:mx-16 lg:mx-24 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #1b2946 60%, #2a3a5c)`,
        }}
      >
        <div className="relative z-10 px-10 py-14 md:py-20 text-center">
          <h3 className="text-2xl md:text-3xl text-white mb-4" style={{ fontWeight: 300 }}>
            Ready to Experience Tréppan Serenique?
          </h3>
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-8">
            From the rolling surf of 53+ resort-style amenities to nearby fine dining, cultural venues and schools and Dubai's world-class city conveniences, Tréppan is your coastal sanctuary.
          </p>
          <a
            href="#request-callback"
            className="inline-flex items-center gap-3 bg-[#A19585] text-white text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-[#8e7d6d] transition-colors duration-400"
          >
            Get in Touch
          </a>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 border border-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border border-white/5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
            onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURES & AMENITIES
// ─────────────────────────────────────────────────────────────
function FeaturesAmenities() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".amenity-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, stagger: 0.03, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".amenity-grid", start: "top bottom-=80" },
      }
    );
    gsap.fromTo(".features-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
      }
    );
    gsap.fromTo(".feature-icon-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".feature-icons", start: "top bottom-=80" },
      }
    );
  }, { scope: ref });

  const iconFeatures = [
    {
      label: "Wellness Living",
      svg: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.2">
          <circle cx="24" cy="24" r="18" strokeOpacity="0.5" />
          <path d="M24 12c0 6-8 8-8 14s8 8 8 8 8-2 8-8-8-8-8-14z" />
          <circle cx="24" cy="26" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Smart Homes",
      svg: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.2">
          <path d="M8 20L24 8l16 12v22H8V20z" />
          <rect x="18" y="30" width="12" height="12" />
          <path d="M16 20h16M20 16h8" strokeOpacity="0.5" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Beachfront Living",
      svg: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.2">
          <path d="M4 36c5-8 10-4 15-8s10-12 15-8" />
          <path d="M4 40c5-6 10-2 15-6s10-10 15-6" strokeOpacity="0.5" />
          <circle cx="34" cy="16" r="6" />
          <path d="M34 10V6M40 16h4M34 22v4M28 16h-4" strokeOpacity="0.7" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full py-28 overflow-hidden"
      style={{
        backgroundImage: `url(https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/young-woman-s-hand-reaching-for-the-sun-during-bea-2025-07-01-00-29-40-utc-1_11zon.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#100F2B]/88" />

      {/* Animated rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 border border-[#A19585]/8 rounded-full animate-ping" style={{ animationDuration: "6s" }} />
          <div className="absolute inset-[15%] border border-[#A19585]/12 rounded-full animate-spin" style={{ animationDuration: "15s" }} />
          <div className="absolute inset-[30%] border border-[#A19585]/15 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Heading */}
        <div className="features-heading text-center mb-16">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Features & Amenities</span>
          <h2 className="text-4xl md:text-5xl text-white leading-tight" style={{ fontWeight: 300 }}>
            53+ Resort-Style<br />
            <span className="text-[#A19585] italic">Amenities Await.</span>
          </h2>
          <div className="w-14 h-[2px] bg-[#A19585] mx-auto mt-6" />
        </div>

        {/* Icon feature highlights */}
        <div className="feature-icons grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {iconFeatures.map((f, i) => (
            <div
              key={i}
              className="feature-icon-card group bg-white/5 border border-white/8 px-8 py-10 text-center hover:border-[#A19585]/40 hover:bg-white/8 transition-all duration-500"
            >
              <div className="text-[#A19585] flex justify-center mb-5 group-hover:scale-110 transition-transform duration-400">
                {f.svg}
              </div>
              <div className="w-8 h-[1px] bg-[#A19585]/40 mx-auto mb-4" />
              <p className="text-white/70 text-sm tracking-[0.2em] uppercase">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Amenity list */}
        <div className="amenity-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-0">
          {AMENITIES.map((item, i) => (
            <div key={i} className="amenity-item flex items-center gap-2 py-2.5 border-b border-white/5 group hover:border-[#A19585]/30 transition-colors duration-300 cursor-default">
              <div className="w-3 h-[1px] bg-[#A19585]/50 flex-shrink-0 group-hover:w-5 transition-all duration-300" />
              <span className="text-white/50 text-xs leading-snug group-hover:text-white/80 transition-colors duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FLOOR PLANS
// ─────────────────────────────────────────────────────────────
function FloorPlans() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"Standard" | "Terrace">("Standard");
  const [planIndex, setPlanIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const plans = FLOOR_PLANS[activeTab];
  const currentPlan = plans[planIndex];

  useEffect(() => {
    setPlanIndex(0);
  }, [activeTab]);

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
        {/* Heading */}
        <div className="floor-heading text-center mb-6">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Floor Plans</span>
          <h2 className="text-4xl md:text-5xl text-[#1b2946] leading-tight mb-4" style={{ fontWeight: 300 }}>
            Discover the Floor Plans
          </h2>
          <p className="text-[#1b2946]/50 text-sm max-w-2xl mx-auto">
            Meticulously designed spaces to meet 2-3 bedrooms needs, with each room maximising the panoramic views for the residents to dig.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-[#1b2946]/10">
            {(["Standard", "Terrace"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-3 text-xs tracking-[0.3em] uppercase transition-all duration-300 ${
                  activeTab === tab ? "bg-[#1b2946] text-white" : "text-[#1b2946]/50 hover:text-[#1b2946]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="floor-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Left: image gallery */}
            <div>
              <div
                className="relative w-full h-72 md:h-96 overflow-hidden cursor-pointer group bg-[#1b2946]/5"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={currentPlan.img}
                  alt="Floor Plan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <div className="w-12 h-12 border border-white/60 flex items-center justify-center text-white text-xl">↗</div>
                </div>
                {/* Arrows */}
                {plans.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPlanIndex((planIndex - 1 + plans.length) % plans.length); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 text-white flex items-center justify-center hover:bg-[#A19585] transition-colors duration-300"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPlanIndex((planIndex + 1) % plans.length); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 text-white flex items-center justify-center hover:bg-[#A19585] transition-colors duration-300"
                    >
                      ›
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {plans.map((_, i) => (
                    <div key={i} className={`w-4 h-[2px] transition-all duration-300 ${i === planIndex ? "bg-[#A19585]" : "bg-white/40"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: plan details */}
            <div className="flex flex-col justify-center">
              <h3 className="text-[#1b2946] text-2xl mb-6" style={{ fontWeight: 300 }}>{currentPlan.type}</h3>
              <div className="w-10 h-[2px] bg-[#A19585] mb-8" />

              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-[#1b2946]/8">
                    <td className="text-[#1b2946]/50 text-xs tracking-[0.2em] uppercase py-4 pr-4">Type</td>
                    <td className="text-[#1b2946] text-right py-4 font-light">{currentPlan.type}</td>
                  </tr>
                  <tr className="border-b border-[#1b2946]/8">
                    <td className="text-[#1b2946]/50 text-xs tracking-[0.2em] uppercase py-4 pr-4">Total Area</td>
                    <td className="text-[#A19585] text-right py-4" style={{ fontWeight: 300 }}>{currentPlan.totalArea}</td>
                  </tr>
                  <tr className="border-b border-[#1b2946]/8">
                    <td className="text-[#1b2946]/50 text-xs tracking-[0.2em] uppercase py-4 pr-4">BUA Area</td>
                    <td className="text-[#A19585] text-right py-4" style={{ fontWeight: 300 }}>{currentPlan.buaArea}</td>
                  </tr>
                </tbody>
              </table>

              <button className="mt-8 group inline-flex items-center gap-4 border border-[#1b2946]/20 text-[#1b2946] text-xs tracking-[0.3em] uppercase px-8 py-4 hover:border-[#A19585] hover:text-[#A19585] transition-all duration-400 w-fit">
                <span>Download Floor Plan</span>
                <div className="w-5 h-[1px] bg-[#A19585]/50 group-hover:w-8 transition-all duration-400" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={plans.map((p) => p.img)}
            index={planIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setPlanIndex((planIndex - 1 + plans.length) % plans.length)}
            onNext={() => setPlanIndex((planIndex + 1) % plans.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// LOCATION
// ─────────────────────────────────────────────────────────────
function Location() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".location-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=150" },
      }
    );
    gsap.fromTo(".location-map",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
      }
    );
    gsap.fromTo(".nearby-item",
      { opacity: 0, x: 20 },
      {
        opacity: 1, x: 0, stagger: 0.08, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".nearby-list", start: "top bottom-=60" },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full bg-white py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Heading */}
        <div className="location-heading text-center mb-16">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Location</span>
          <h2 className="text-4xl md:text-5xl text-[#1b2946] leading-tight mb-4" style={{ fontWeight: 300 }}>
            A Rare Harmony of<br />
            <span className="text-[#A19585] italic">Coastal Calm and City Pulse.</span>
          </h2>
          <p className="text-[#1b2946]/50 text-sm max-w-2xl mx-auto">
            Tréppan Serenique sits on the Dubaithe Isle at Sea, allowing a vibrant lifestyle along with nearby fine dining, cultural venues and restaurants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div className="location-map relative w-full h-80 md:h-[450px] overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Treppan+Serenique+Dubai&output=embed&z=14"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tréppan Serenique Location"
              className="w-full h-full"
            />
            <div className="absolute bottom-4 left-4">
              <a
                href="https://maps.app.goo.gl/5447LSgHiupmCYU77"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1b2946] text-white text-xs tracking-[0.25em] uppercase px-6 py-3 hover:bg-[#A19585] transition-colors duration-400"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Nearby */}
          <div>
            <div className="grid grid-cols-2 gap-1 mb-6">
              {[
                { label: "Landmark", color: "bg-[#1b2946]" },
                { label: "Services", color: "bg-[#A19585]" },
                { label: "Leisure", color: "bg-[#c4b8aa]" },
              ].map((tag) => (
                <button key={tag.label} className={`${tag.color} text-white text-[10px] tracking-[0.2em] uppercase px-4 py-2 hover:opacity-80 transition-opacity duration-300`}>
                  {tag.label}
                </button>
              ))}
            </div>

            <div className="nearby-list space-y-0 border-t border-[#1b2946]/8">
              {NEARBY.map((item, i) => (
                <div key={i} className="nearby-item flex items-center justify-between py-4 border-b border-[#1b2946]/8 hover:pl-2 transition-all duration-300 cursor-default group">
                  <span className="text-[#1b2946]/70 text-sm group-hover:text-[#1b2946] transition-colors duration-300">{item.label}</span>
                  <span className="text-[#A19585] text-xs tracking-[0.2em]">{item.distance}</span>
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
// REQUEST CALLBACK (inline HubSpot form)
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
        backgroundImage: `url(https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/young-woman-s-hand-reaching-for-the-sun-during-bea-2025-07-01-00-29-40-utc-1_11zon.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#0a0a18]/90" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 callback-content">
        <div className="text-center mb-12">
          <span className="text-[#A19585] text-xs tracking-[0.35em] uppercase block mb-4">Connect With Us</span>
          <h2 className="text-3xl md:text-4xl text-white leading-tight" style={{ fontWeight: 300 }}>
            Request Call Back
          </h2>
          <div className="w-12 h-[2px] bg-[#A19585] mx-auto mt-6" />
        </div>

        {/* HubSpot Form */}
        <div
          id="inline-hubspot-form-container"
          className="hubspot-form-dark"
        />

        <style>{`
          #inline-hubspot-form-container .hs-form-field label {
            color: rgba(255,255,255,0.6) !important;
            font-size: 12px !important;
            letter-spacing: 0.2em !important;
            text-transform: uppercase !important;
          }
          #inline-hubspot-form-container .hs-input {
            background: rgba(255,255,255,0.08) !important;
            border: 1px solid rgba(255,255,255,0.15) !important;
            color: white !important;
            border-radius: 0 !important;
            padding: 12px 16px !important;
          }
          #inline-hubspot-form-container .hs-input:focus {
            border-color: #A19585 !important;
            outline: none !important;
          }
          #inline-hubspot-form-container .hs-button {
            background: #A19585 !important;
            border: none !important;
            border-radius: 0 !important;
            color: white !important;
            letter-spacing: 0.3em !important;
            text-transform: uppercase !important;
            padding: 16px 40px !important;
            font-size: 11px !important;
            cursor: pointer !important;
          }
          #inline-hubspot-form-container .hs-button:hover {
            background: #8e7d6d !important;
          }
          #inline-hubspot-form-container .hs-error-msgs {
            color: #f87171 !important;
            font-size: 11px !important;
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

      <Hero
        onBrochure={() => setBrochureOpen(true)}
        onInterest={() => setInterestOpen(true)}
      />

      <Overview onBrochure={() => setBrochureOpen(true)} />

      <AmenitiesGallery />

      <ExploreGallery />

      <FeaturesAmenities />

      <FloorPlans />

      <Location />

      <RequestCallback />

      <Footer />

      {/* Download Brochure Modal */}
      <HubSpotModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        title="Download Brochure"
        formId="1b0b460a-dd56-417f-a0c2-061a6ce3f3bc"
        containerId="hubspot-brochure-form"
      />

      {/* Express Interest Modal */}
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