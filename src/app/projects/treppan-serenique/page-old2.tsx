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
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Boardwalk-Bridge.svg",
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_Beauty-Salon.svg",
  "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/Icons_png_BBQ-Pits.svg",
];

const AMENITIES = [
  "Hyperbaric Oxygen Therapy",
  "Red Light Therapy",
  "Flotation Therapy",
  "Cryotherapy",
  "Himalayan Salt Brick Sauna",
  "Meditation Pods",
  "Bamboo Oxygen Park",
  "Koi Pond",
  "Aqua Gym",
  "Mini Golf Course",
  "Green House Cafe",
  "BBQ Pits",
  "Physio Body Design Therapy",
  "ProSCAN Therapy",
  "Neurosport Conic Dream",
  "Lucid Bridge",
  "Hot Jacuzzi",
  "Atmospharium",
  "MykSpa",
  "Myk Sauna",
  "Sensory Suite",
  "Well Spa",
  "Aesthetics Zone",
  "Beauty Salon",
  "E-Golf Pool",
  "Swimming Pool",
  "Aqua Pool",
  "Lounge Velocity",
  "James Kitchen",
  "McCall Cuisine",
  "Piano Fountain",
  "Connecting Bridges",
  "Concierge Desk",
  "Infinity Serenity Pool",
  "App Fibre",
  "Floaters Mart",
  "Sky Barbican",
  "Outdoor Kitchen Bars",
  "Open Kitchen",
  "Morning Yoga",
  "Cinema Amenities Wall",
  "Kids Play Areas",
  "NBA Acres Walk",
  "Kids Mini Slide",
  "Blading Rail Velis La Pool",
  "Croquet Bowl",
  "Sea Deck Cabana",
  "Junior Indoor Swimming",
  "Podium Infinity Pool",
];

const AMENITY_GALLERY = [
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-09.webp",
    label: "Podium Infinity Pool",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-10.webp",
    label: "Landscaped Gardens",
  },
  {
    src: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-10.webp",
    label: "Coastal Terrace",
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

const GALLERY_IMAGES = {
  exterior: [
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-03.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-04.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-05.webp",
  ],
  interior: [
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-01.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-02.webp",
    "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Interior-03.webp",
  ],
};

const FLOOR_PLANS = [
  {
    label: "2 Bedroom",
    type: "TYPE A",
    totalArea: "1,450 – 1,550 sq.ft.",
    bedroom: "2 Bedroom",
    images: [
      "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Even-Floor-Tower-AB_Tower-A-02.webp",
      "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Even-Floor-Tower-AB_Tower-A-06.webp",
    ],
  },
  {
    label: "3 Bedroom",
    type: "TYPE B",
    totalArea: "2,100 – 2,350 sq.ft.",
    bedroom: "3 Bedroom",
    images: [
      "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/10-12-floor-Tower-A-B_Tower-A-04.webp",
      "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/10-12-floor-Tower-A-B_Tower-B-04.webp",
    ],
  },
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
// LIGHTBOX
// ─────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ background: "rgba(5,8,20,0.97)" }}
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-8 z-10 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#A19585] transition-all"
        style={{ borderRadius: 8 }}
        onClick={onClose}
      >
        ×
      </button>

      <button
        className="absolute left-4 md:left-10 z-10 w-12 h-12 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#A19585] hover:border-[#A19585] transition-all text-2xl"
        style={{ borderRadius: 10 }}
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p - 1 + images.length) % images.length); }}
      >
        ‹
      </button>

      <motion.img
        key={current}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        src={images[current]}
        alt=""
        className="max-w-[85vw] max-h-[82vh] object-contain"
        style={{ borderRadius: 16, boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute right-4 md:right-10 z-10 w-12 h-12 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#A19585] hover:border-[#A19585] transition-all text-2xl"
        style={{ borderRadius: 10 }}
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p + 1) % images.length); }}
      >
        ›
      </button>

      <div className="absolute bottom-8 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className="h-[2px] transition-all duration-300"
            style={{ width: i === current ? 40 : 16, background: i === current ? BRAND : "rgba(255,255,255,0.25)", borderRadius: 2 }}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-10 text-white/30 text-xs tracking-[0.3em]">
        {current + 1} / {images.length}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// HUBSPOT MODAL — premium glass card design
// ─────────────────────────────────────────────────────────────
function HubspotModal({
  title,
  containerId,
  formId,
  onClose,
}: {
  title: string;
  containerId: string;
  formId: string;
  onClose: () => void;
}) {
  useHubspotForm(containerId, formId);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
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
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(145deg, rgba(27,41,70,0.95) 0%, rgba(10,15,30,0.98) 100%)",
            boxShadow: `0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px ${BRAND}25, inset 0 1px 0 rgba(255,255,255,0.07)`,
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)` }} />
          {/* Orb glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${BRAND}30, transparent 70%)` }} />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(27,41,70,0.5), transparent 70%)` }} />

          <div className="relative px-8 pt-10 pb-10">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: BRAND }}>Tréppan Serenique</p>
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
            <div className="w-12 h-[1px] my-6" style={{ background: BRAND }} />
            <div id={containerId} className="hubspot-modal-form" />
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
      .fromTo(".hero-price", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-btns", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Serenique-Project.mp4"
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.9) 0%, rgba(5,8,20,0.4) 50%, rgba(5,8,20,0.2) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,8,20,0.65) 0%, transparent 60%)" }} />

      <div className="absolute top-0 left-0 w-full h-[2px] z-20" style={{ background: `linear-gradient(90deg, ${BRAND}, ${BRAND}60, transparent)` }} />

      <div ref={contentRef} className="relative z-10 h-full flex items-end px-8 md:px-16 lg:px-24 pb-24">
        <div className="max-w-2xl">
          <img
            src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-serenique-logo.png"
            alt="Tréppan Serenique"
            className="hero-logo w-60 md:w-72 mb-5 opacity-0"
          />
          <p className="hero-tag text-xs tracking-[0.35em] uppercase opacity-0 mb-4" style={{ color: BRAND }}>
            Experience The UAE's First Longevity Living Community
          </p>
          <div
            className="hero-line w-20 h-[2px] mb-7 origin-left"
            style={{ background: BRAND, transform: "scaleX(0)" }}
          />
          <div className="hero-price opacity-0 mb-8">
            <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-1">Starting from</p>
            <p className="text-white text-4xl md:text-5xl" style={{ fontWeight: 200, letterSpacing: "-0.02em" }}>
              AED <span style={{ color: BRAND }}>2.9M</span>
            </p>
          </div>
          <div className="hero-btns opacity-0 flex flex-wrap gap-4">
            <button
              onClick={onDownload}
              className="group inline-flex items-center gap-4 text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400"
              style={{ background: BRAND, color: DARK }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Download Brochure
              <div className="w-5 h-[1px]" style={{ background: `${DARK}60` }} />
            </button>
            <button
              onClick={onInterest}
              className="group inline-flex items-center gap-4 border text-white text-xs tracking-[0.35em] uppercase px-8 py-4 hover:border-[#A19585] hover:text-[#A19585] transition-all duration-400"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              Express Interest
              <div className="w-5 h-[1px]" style={{ background: "rgba(255,255,255,0.4)" }} />
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
// OVERVIEW — asymmetric full-bleed layout (unique, not copied)
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
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: "#f7f6f4" }}>
      {/* Full-bleed parallax image — LEFT */}
      <div className="ov-image-wrap absolute left-0 top-0 w-full md:w-[52%] h-full" style={{ minHeight: 700 }}>
        <img
          src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Wideup-lady.webp"
          alt="Tréppan Serenique"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to right, transparent 55%, #f7f6f4 100%)" }} />
        <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to bottom, transparent 55%, #f7f6f4 100%)" }} />
      </div>

      {/* Giant SEA watermark */}
      <div className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden">
        <span style={{ fontWeight: 200, color: "rgba(27,41,70,0.035)", letterSpacing: "-0.05em", fontSize: "22vw", lineHeight: 1 }}>
          SEA
        </span>
      </div>

      {/* RIGHT content */}
      <div className="relative z-10 flex items-center justify-end px-6 md:px-16 lg:px-24" style={{ minHeight: 700 }}>
        <div className="ov-text w-full md:w-[54%] lg:w-[48%] py-24">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-5" style={{ color: BRAND }}>Overview</span>
          <h2 className="font-marcellus font-light text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.08] mb-6" style={{ fontWeight: 300, color: NAVY }}>
            A Sanctuary of<br />
            <span style={{ color: BRAND }}>Serenity by the Sea</span>
          </h2>
          <div className="w-14 h-[2px] mb-7" style={{ background: BRAND }} />
          <div className="space-y-4 leading-relaxed mb-10" style={{ color: "rgba(27,41,70,0.6)" }}>
            <p>
              Discover coastal living at Tréppan Serenique — where the ocean breeze meets architectural brilliance.
              An exclusive collection crafted for those who seek the finest in resort-style living.
            </p>
            <p>
              Set against Dubai's breathtaking coastline, each residence has been meticulously designed to blend timeless
              elegance with modern wellness — redefining what luxury truly means.
            </p>
          </div>

          {/* Feature checklist */}
          <ul className="space-y-2.5 mb-10">
            {[
              "Perpetual Island Escape & Resort Indulgence",
              "Cellular Renewal & Vitalising Water",
              "Pure Air & Views That Restore",
              "Intelligent Living, Lower Impact",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(27,41,70,0.65)" }}>
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: `${BRAND}18`, borderRadius: 6 }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
                </div>
                {item}
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 border-t pt-8 mb-10" style={{ borderColor: "rgba(27,41,70,0.08)" }}>
            {[
              { v: "53+", l: "Amenities" },
              { v: "G+22", l: "Floors" },
              { v: "100m", l: "From Beach" },
              { v: "2026", l: "Handover" },
            ].map((s, i) => (
              <div key={i} className="ov-stat text-center">
                <div className="text-2xl md:text-3xl mb-1" style={{ fontWeight: 300, color: BRAND }}>{s.v}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(27,41,70,0.4)" }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onDownload}
              className="text-white text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400"
              style={{ background: NAVY }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; (e.currentTarget as HTMLElement).style.color = DARK; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = NAVY; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            >
              Download Brochure
            </button>
            <button
              onClick={onInterest}
              className="text-xs tracking-[0.35em] uppercase px-8 py-4 transition-all duration-400"
              style={{ border: `1px solid rgba(27,41,70,0.2)`, color: "rgba(27,41,70,0.5)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.color = NAVY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,41,70,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(27,41,70,0.5)"; }}
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
          {/* Ken Burns zoom */}
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

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.88) 0%, rgba(5,8,20,0.1) 55%, transparent 100%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(5,8,20,0.4), transparent 50%)" }} />

      {/* Bottom-left: label + arrows */}
      <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 z-10 flex items-end gap-8">
        <div>
          {/* <p className="text-[10px] tracking-[0.45em] uppercase mb-2" style={{ color: BRAND }}>Amenity</p> */}
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
              className="w-12 h-12 flex items-center justify-center text-xl transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.color = BRAND; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
            >
              ‹
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 flex items-center justify-center text-xl transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.color = BRAND; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-10 right-8 md:right-16 z-10 flex items-center gap-2">
        {AMENITY_GALLERY.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i, i > current ? 1 : -1)}
            className="h-[2px] transition-all duration-500"
            style={{ width: i === current ? 40 : 14, background: i === current ? BRAND : "rgba(255,255,255,0.3)", borderRadius: 2 }}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// EXPLORE GALLERY — 3D card carousel, no thumbnails
// ─────────────────────────────────────────────────────────────
function ExploreGallery() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"exterior" | "interior">("exterior");
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const images = GALLERY_IMAGES[activeTab];
  useEffect(() => { setImgIdx(0); }, [activeTab]);

  useGSAP(() => {
    gsap.fromTo(".expl-hd", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "#fff" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="expl-hd text-center mb-14">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-3" style={{ color: BRAND }}>Gallery</span>
          <h2 className="font-marcellus font-light text-4xl md:text-5xl" style={{ fontWeight: 300, color: NAVY }}>
            Explore Tréppan Serenique
            <span style={{ color: BRAND }}> Residences</span>
          </h2>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center gap-1 mb-12">
          {(["exterior", "interior"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="text-xs tracking-[0.35em] uppercase px-10 py-3 transition-all duration-300 capitalize"
              style={activeTab === tab
                ? { background: BRAND, color: DARK }
                : { border: `1px solid rgba(27,41,70,0.15)`, color: "rgba(27,41,70,0.5)" }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 3D card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative mx-auto"
            style={{ maxWidth: 900, perspective: "1200px" }}
          >
            <div
              className="relative overflow-hidden group cursor-pointer"
              style={{
                borderRadius: 22,
                transform: "rotateX(3deg) rotateY(-1deg)",
                transformStyle: "preserve-3d",
                boxShadow: `0 40px 100px rgba(27,41,70,0.22), 0 10px 40px rgba(27,41,70,0.12), 0 0 0 1px rgba(27,41,70,0.07), inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
              onClick={() => setLightbox({ images, index: imgIdx })}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeTab}-${imgIdx}`}
                  src={images[imgIdx]}
                  alt=""
                  className="w-full block object-cover"
                  style={{ height: 520, display: "block" }}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "rgba(10,15,30,0.4)" }}
              >
                <div className="text-white text-center">
                  <div className="w-16 h-16 border border-white mx-auto flex items-center justify-center mb-3" style={{ borderRadius: 14 }}>
                    <span className="text-2xl">⤢</span>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase opacity-70">Click to Preview</span>
                </div>
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(5,8,20,0.7), transparent)" }} />

              {/* Counter */}
              <div className="absolute bottom-5 right-6 text-white/50 text-xs tracking-[0.3em]">
                {imgIdx + 1} / {images.length}
              </div>
            </div>

            {/* Prev / Next */}
            <button
              className="absolute top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white text-xl transition-all duration-300 z-10"
              style={{ left: -28, background: "rgba(27,41,70,0.92)", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; (e.currentTarget as HTMLElement).style.color = DARK; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(27,41,70,0.92)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onClick={(e) => { e.stopPropagation(); setImgIdx((p) => (p - 1 + images.length) % images.length); }}
            >
              ‹
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white text-xl transition-all duration-300 z-10"
              style={{ right: -28, background: "rgba(27,41,70,0.92)", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; (e.currentTarget as HTMLElement).style.color = DARK; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(27,41,70,0.92)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onClick={(e) => { e.stopPropagation(); setImgIdx((p) => (p + 1) % images.length); }}
            >
              ›
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className="h-[3px] transition-all duration-400"
                  style={{ width: i === imgIdx ? 32 : 12, background: i === imgIdx ? BRAND : "rgba(27,41,70,0.2)", borderRadius: 2 }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA band — gradient using theme palette */}
      <div className="mt-20 mx-6 md:mx-16 lg:mx-24 relative overflow-hidden" style={{ borderRadius: 20 }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d1a36 35%, #1a1640 65%, #0f1929 100%)` }} />
        <div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(ellipse at 70% 50%, ${BRAND}50, transparent 60%)` }} />
        <div className="absolute inset-0 opacity-12" style={{ backgroundImage: `url('${AMENITY_GALLERY[0].src}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${BRAND}80, transparent)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${BRAND}30, transparent)` }} />

        <div className="relative z-10 text-center py-16 px-8">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-4" style={{ color: BRAND }}>Discover More</span>
          <h3 className="font-marcellus font-light text-white text-2xl md:text-4xl mb-4" style={{ fontWeight: 300 }}>
            Ready to Experience Tréppan Serenique?
          </h3>
          <p className="max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Our dedicated team is ready to walk you through every detail — from floor plan options
            to handover timelines and investment potential.
          </p>
          <button
            className="text-xs tracking-[0.35em] uppercase px-10 py-4 transition-all duration-300"
            style={{ background: BRAND, color: DARK }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            Schedule a Visit
          </button>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURES & AMENITIES — card grid with SVG icons
// ─────────────────────────────────────────────────────────────
function FeaturesAmenities() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".am-card", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.03, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=60" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={BG_IMAGE} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(5,8,20,0.91)" }} />
        {/* Subtle top vignette */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,8,20,0.4) 0%, transparent 20%, transparent 80%, rgba(5,8,20,0.4) 100%)" }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-4" style={{ color: BRAND }}>Features &amp; Amenities</span>
          <h2 className="font-marcellus font-light text-4xl md:text-5xl text-white" style={{ fontWeight: 300 }}>
            53+ Resort-Style
            <br /><span className="block mt-0" style={{ color: BRAND }}>Experiences Await</span>
          </h2>
        </div>

        {/* Card grid — 3 columns matching the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AMENITIES.map((item, i) => (
            <div
              key={i}
              className="am-card group flex items-center gap-4 px-5 py-4 opacity-0 transition-all duration-300 cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${BRAND}14`;
                el.style.borderColor = `${BRAND}55`;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = `0 8px 30px ${BRAND}18`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(161,149,133,0.14)", borderRadius: 8 }}
              >
                <img
                  src={SVG_ICONS[i % SVG_ICONS.length]}
                  alt=""
                  className="w-6 h-6 object-contain"
                  style={{ filter: "brightness(0) invert(1) opacity(0.7)" }}
                />
              </div>
              <span className="text-sm leading-snug group-hover:text-white/90 transition-colors duration-200" style={{ color: "rgba(255,255,255,0.65)" }}>
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
// FLOOR PLANS — 3D image card with lightbox
// ─────────────────────────────────────────────────────────────
function FloorPlans() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [floorIdx, setFloorIdx] = useState(0);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const plan = FLOOR_PLANS[activeTab];

  useEffect(() => { setFloorIdx(0); }, [activeTab]);

  useGSAP(() => {
    gsap.fromTo(".fp-hd", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "#f7f6f4" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="fp-hd text-center mb-14">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-4" style={{ color: BRAND }}>Discover</span>
          <h2 className="font-marcellus font-light text-4xl md:text-5xl" style={{ fontWeight: 300, color: NAVY }}>The Floor Plans</h2>
          <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: "rgba(27,41,70,0.45)" }}>
            Thoughtfully crafted residences that maximise space, natural light, and coastal panoramas.
          </p>
        </div>

        <div className="flex justify-center gap-1 mb-12">
          {FLOOR_PLANS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="text-xs tracking-[0.35em] uppercase px-10 py-3 transition-all duration-300"
              style={activeTab === i
                ? { background: BRAND, color: DARK }
                : { border: `1px solid rgba(27,41,70,0.15)`, color: "rgba(27,41,70,0.5)" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          >
            {/* 3D image card */}
            <div className="relative" style={{ perspective: "1000px" }}>
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{
                  borderRadius: 18,
                  transform: "rotateX(3deg) rotateY(-1.5deg)",
                  transformStyle: "preserve-3d",
                  boxShadow: `0 40px 100px rgba(27,41,70,0.2), 0 12px 40px rgba(27,41,70,0.1), 0 0 0 1px rgba(27,41,70,0.06)`,
                }}
                onClick={() => setLightbox({ images: plan.images, index: floorIdx })}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={floorIdx}
                    src={plan.images[floorIdx]}
                    alt=""
                    className="w-full object-cover block"
                    style={{ height: 460 }}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                {/* Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "rgba(10,15,30,0.38)" }}
                >
                  <div className="w-14 h-14 border border-white flex items-center justify-center" style={{ borderRadius: 12 }}>
                    <span className="text-white text-2xl">⤢</span>
                  </div>
                </div>

                {/* Arrows */}
                {plan.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white text-xl transition-all"
                      style={{ background: "rgba(10,15,30,0.55)", borderRadius: 8 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(10,15,30,0.55)"; }}
                      onClick={(e) => { e.stopPropagation(); setFloorIdx((p) => (p - 1 + plan.images.length) % plan.images.length); }}
                    >
                      ‹
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white text-xl transition-all"
                      style={{ background: "rgba(10,15,30,0.55)", borderRadius: 8 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(10,15,30,0.55)"; }}
                      onClick={(e) => { e.stopPropagation(); setFloorIdx((p) => (p + 1) % plan.images.length); }}
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Dots */}
                <div className="absolute bottom-4 flex justify-center gap-2 w-full">
                  {plan.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setFloorIdx(i); }}
                      className="h-[2px] transition-all duration-400"
                      style={{ width: i === floorIdx ? 28 : 10, background: i === floorIdx ? BRAND : "rgba(255,255,255,0.4)", borderRadius: 2 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="pt-4 space-y-6">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: BRAND }}>Type</p>
                <p className="text-3xl" style={{ fontWeight: 300, color: NAVY }}>{plan.type}</p>
              </div>
              <div className="w-full h-[1px]" style={{ background: "rgba(27,41,70,0.08)" }} />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(27,41,70,0.4)" }}>Total Area</p>
                  <p className="text-xl" style={{ fontWeight: 300, color: NAVY }}>{plan.totalArea}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(27,41,70,0.4)" }}>Bedroom</p>
                  <p className="text-xl" style={{ fontWeight: 300, color: NAVY }}>{plan.bedroom}</p>
                </div>
              </div>
              <div className="w-full h-[1px]" style={{ background: "rgba(27,41,70,0.08)" }} />
              <button
                className="group inline-flex items-center gap-4 text-white text-xs tracking-[0.35em] uppercase px-8 py-4 mt-4 transition-all duration-400"
                style={{ background: NAVY }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; (e.currentTarget as HTMLElement).style.color = DARK; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = NAVY; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              >
                Download Full Plan
                <div className="w-5 h-[1px] bg-white/40 group-hover:w-8 transition-all duration-400" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// LOCATION — 3D tab cards with icons
// ─────────────────────────────────────────────────────────────
function Location() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const tab = LOCATION_TABS[activeTab];

  useGSAP(() => {
    gsap.fromTo(".loc-left", { x: -50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1.4, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
    });
    gsap.fromTo(".loc-right", { x: 50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.1,
      scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "#fff" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.45em] uppercase block mb-4" style={{ color: BRAND }}>Location</span>
          <h2 className="font-marcellus font-light text-4xl md:text-5xl" style={{ fontWeight: 300, color: NAVY }}>
            A Rare Harmony of Coastal Calm
            <br /><span className="" style={{ color: BRAND }}>&amp; City Pulse</span>
          </h2>
          <p className="text-base mt-4 max-w-2xl mx-auto" style={{ color: "rgba(27,41,70,0.45)" }}>
            Positioned where Dubai's coast meets the city — Tréppan Serenique offers unmatched
            connectivity without sacrificing your tranquil retreat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div className="loc-left overflow-hidden relative" style={{ height: 460, borderRadius: 18, boxShadow: `0 30px 80px rgba(27,41,70,0.16), 0 0 0 1px rgba(27,41,70,0.06)` }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.1536753698287!2d55.13!3d25.096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6cc69c999921%3A0x0!2sTréppan+Serenique!5e0!3m2!1sen!2sae!4v1"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tréppan Serenique Location"
            />
            <a
              href="https://maps.app.goo.gl/5447LSgHiupmCYU77"
              target="_blank" rel="noopener noreferrer"
              className="absolute bottom-5 left-5 text-white text-xs tracking-[0.25em] uppercase px-5 py-3 transition-all duration-300"
              style={{ background: NAVY, borderRadius: 10 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BRAND; (e.currentTarget as HTMLElement).style.color = DARK; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = NAVY; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            >
              Get Directions
            </a>
          </div>

          {/* Right panel */}
          <div className="loc-right">
            {/* Tab buttons */}
            <div className="flex gap-2 mb-6" style={{ perspective: 800 }}>
              {LOCATION_TABS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase px-4 py-3 flex-1 justify-center transition-all duration-300"
                  style={{
                    borderRadius: 12,
                    background: activeTab === i ? BRAND : "rgba(27,41,70,0.05)",
                    color: activeTab === i ? DARK : "rgba(27,41,70,0.55)",
                    border: `1px solid ${activeTab === i ? BRAND : "rgba(27,41,70,0.1)"}`,
                    boxShadow: activeTab === i ? `0 10px 30px ${BRAND}40, 0 0 0 1px ${BRAND}` : "0 2px 8px rgba(27,41,70,0.06)",
                    transform: activeTab === i ? "translateY(-2px) rotateX(2deg)" : "none",
                    fontWeight: activeTab === i ? 500 : 400,
                  }}
                >
                  <img
                    src={t.icon} alt=""
                    className="w-4 h-4 object-contain flex-shrink-0"
                    style={{ filter: activeTab === i ? "brightness(0)" : "brightness(0) invert(0.4)" }}
                  />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Distance entries */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                {tab.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-center justify-between px-5 py-4 transition-all duration-300 cursor-default"
                    style={{
                      background: "rgba(27,41,70,0.03)",
                      border: "1px solid rgba(27,41,70,0.07)",
                      borderRadius: 14,
                      boxShadow: "0 2px 12px rgba(27,41,70,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = `${BRAND}10`;
                      el.style.borderColor = `${BRAND}45`;
                      el.style.boxShadow = `0 8px 30px ${BRAND}18`;
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(27,41,70,0.03)";
                      el.style.borderColor = "rgba(27,41,70,0.07)";
                      el.style.boxShadow = "0 2px 12px rgba(27,41,70,0.04)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: `${BRAND}16`, borderRadius: 9 }}>
                        <img src={tab.icon} alt="" className="w-4 h-4 object-contain" style={{ filter: "sepia(1) saturate(0.9) brightness(0.8)" }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: NAVY }}>{item.place}</span>
                    </div>
                    <span
                      className="text-sm font-semibold px-3 py-1.5"
                      style={{ background: `${BRAND}18`, color: BRAND, borderRadius: 8 }}
                    >
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// REQUEST CALL BACK — premium 3D glass card
// ─────────────────────────────────────────────────────────────
function RequestCallBack() {
  const ref = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useHubspotForm("inline-hubspot-form-container", "09a128eb-2ba8-4163-b316-9d7e8d6a07cb");

  useGSAP(() => {
    gsap.fromTo(leftRef.current, 
      { x: -80, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top bottom-=100" } }
    );
    gsap.fromTo(rightRef.current, 
      { x: 80, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2, scrollTrigger: { trigger: ref.current, start: "top bottom-=100" } }
    );
    gsap.fromTo(".benefit-item", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".benefits-list", start: "top bottom-=80" } }
    );
  }, { scope: ref });

  const benefits = [
    { icon: "✓", text: "Response within 24 hours" },
    { icon: "✓", text: "Personalized property consultation" },
    { icon: "✓", text: "Exclusive project insights" },
    { icon: "✓", text: "Tailored investment options" },
  ];

  return (
    <section ref={ref} className="relative w-full py-28 overflow-hidden">
      {/* Background with floating elements */}
      <div className="absolute inset-0">
        <img 
          src={BG_IMAGE} 
          alt="" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(5,8,20,0.92) 0%, rgba(10,20,50,0.88) 100%)` }} />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse" style={{ background: BRAND }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse" style={{ background: BRAND, animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10" style={{ background: BRAND }} />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE - Compelling Content */}
          <div ref={leftRef} className="space-y-8">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
              style={{ 
                borderColor: `${BRAND}40`,
                background: `linear-gradient(135deg, ${BRAND}15, transparent)`,
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: BRAND }} />
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: BRAND }}>Priority Access</span>
            </div>

            {/* Main Heading */}
            <h2 className="font-marcellus font-light text-4xl md:text-5xl lg:text-6xl text-white leading-tight" style={{ fontWeight: 300 }}>
              Ready to Begin Your
              <br />
              <span className="relative inline-block mt-2" style={{ color: BRAND }}>
                Serenique Journey?
                <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 200 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 2 L200 2" stroke={BRAND} strokeWidth="2" strokeDasharray="6 6" />
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Let our dedicated property consultants guide you through the most advanced wellness-centric living community in Dubai. 
              Get exclusive access to floor plans, pricing, and investment opportunities.
            </p>

            {/* Benefits List */}
            <div className="benefits-list grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="benefit-item flex items-center gap-3 group cursor-default">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      background: `${BRAND}20`,
                      boxShadow: `0 0 0 1px ${BRAND}40`,
                    }}
                  >
                    <span className="text-sm">{benefit.icon}</span>
                  </div>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            {/* <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden"
                    style={{ background: `rgba(255,255,255,0.1)` }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-[10px]" style={{ color: BRAND }}>
                      ✓
                    </div>
                  </div>
                ))}
              </div>              
            </div> */}
          </div>

          {/* RIGHT SIDE - Enhanced Form Card */}
          <div ref={rightRef}>
            <div
              className="relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                borderRadius: 32,
                border: `1px solid ${BRAND}30`,
                background: "linear-gradient(145deg, rgba(27,41,70,0.85) 0%, rgba(15,25,45,0.95) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${BRAND}20 inset, 0 0 20px ${BRAND}20`,
              }}
            >
              {/* Animated border gradient */}
              <div 
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${BRAND}40, transparent, ${BRAND}40, transparent)`,
                  backgroundSize: "200% 200%",
                  animation: "shimmer 3s ease infinite",
                }}
              />
              
              {/* Header inside card */}
              <div className="relative px-8 pt-8 pb-4 border-b border-white/10">
                <h3 className="text-white text-xl font-light tracking-wide">Schedule a Consultation</h3>
                <p className="text-xs mt-1" style={{ color: `${BRAND}cc` }}>Fill in the details below</p>
                <div className="absolute top-0 right-8 w-16 h-16 rounded-full blur-2xl opacity-30" style={{ background: BRAND }} />
              </div>

              {/* Form Container - Scrollable if needed */}
              <div 
                id="inline-hubspot-form-container" 
                className="hubspot-inline-form px-8 py-6 max-h-[480px] overflow-y-auto"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: `${BRAND}60 transparent`,
                }}
              />

              {/* Footer note */}
              <div className="relative px-8 pb-6 pt-2 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <span>🔒</span>
                  <span>Your information is protected</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>Response within 24h</span>
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-2xl" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-2xl" />
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
    <main className="bg-dark overflow-x-hidden">
      <Navbar />
      <Hero onDownload={openDownload} onInterest={openInterest} />
      <Overview onDownload={openDownload} onInterest={openInterest} />
      <AmenityGallery />
      <ExploreGallery />
      <FeaturesAmenities />
      <FloorPlans />
      <Location />
      <RequestCallBack />
      <Footer />

      <AnimatePresence>
        {modal === "brochure" && (
          <HubspotModal
            title="Download Brochure"
            containerId="hs-brochure"
            formId="1b0b460a-dd56-417f-a0c2-061a6ce3f3bc"
            onClose={closeModal}
          />
        )}
        {modal === "interest" && (
          <HubspotModal
            title="Talk to Our Property Consultant"
            containerId="hs-interest"
            formId="1b0b460a-dd56-417f-a0c2-061a6ce3f3bc"
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* ── Shared HubSpot form styles ── */
        .hubspot-modal-form .hs-form fieldset,
        .hubspot-inline-form .hs-form fieldset {
          max-width: 100% !important;
        }
        .hubspot-modal-form .hs-form .hs-form-field,
        .hubspot-inline-form .hs-form .hs-form-field {
          margin-bottom: 18px !important;
        }
        .hubspot-modal-form .hs-form label,
        .hubspot-inline-form .hs-form label {
          color: rgba(255,255,255,0.4) !important;
          font-size: 10px !important;
          letter-spacing: 0.28em !important;
          text-transform: uppercase !important;
          margin-bottom: 7px !important;
          display: block !important;
        }
        .hubspot-modal-form .hs-form .hs-input,
        .hubspot-inline-form .hs-form .hs-input {
          width: 100% !important;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 12px !important;
          color: #fff !important;
          padding: 13px 16px !important;
          font-size: 14px !important;
          outline: none !important;
          transition: border-color 0.3s, background 0.3s !important;
        }
        .hubspot-modal-form .hs-form .hs-input:focus,
        .hubspot-inline-form .hs-form .hs-input:focus {
          border-color: #A19585 !important;
          background: rgba(161,149,133,0.08) !important;
        }
        .hubspot-modal-form .hs-form .hs-button,
        .hubspot-inline-form .hs-form .hs-button {
          background: #A19585 !important;
          color: #0a0f1e !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 14px 40px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.3em !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          margin-top: 8px !important;
          transition: background 0.3s, transform 0.2s !important;
        }
        .hubspot-modal-form .hs-form .hs-button:hover,
        .hubspot-inline-form .hs-form .hs-button:hover {
          background: #b5a898 !important;
          transform: translateY(-1px) !important;
        }
        .hubspot-modal-form .hs-form select.hs-input,
        .hubspot-inline-form .hs-form select.hs-input {
          appearance: auto !important;
        }
        .hubspot-modal-form .hs-error-msgs,
        .hubspot-inline-form .hs-error-msgs {
          color: #e57373 !important;
          font-size: 11px !important;
          margin-top: 4px !important;
          list-style: none !important;
          padding: 0 !important;
        }
        .hubspot-modal-form .hs-form .hs-form-booleancheckbox label,
        .hubspot-inline-form .hs-form .hs-form-booleancheckbox label {
          font-size: 12px !important;
          text-transform: none !important;
          letter-spacing: 0 !important;
          color: rgba(255,255,255,0.38) !important;
        }
        .hubspot-modal-form .hs-form .inputs-list,
        .hubspot-inline-form .hs-form .inputs-list {
          list-style: none !important;
          padding: 0 !important;
        }
      `}</style>
    </main>
  );
}