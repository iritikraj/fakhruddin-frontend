// app/communities/[slug]/page.tsx
'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring
} from 'framer-motion';
import { Plus, Minus, MapPin, Play, Pause, ArrowUpRight, Phone, Video, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── LUXURY EASING ─────────────────────────────────────────
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const slowEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

// ─── MAGNETIC COMPONENT (For Premium Button Hover) ───────
function Magnetic({ children, className }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} style={{ x: springX, y: springY }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── MOCK DATA ─────────────────────────────────────────────
const stats = [
  { value: '05', suffix: '', label: 'Distinct Islands', icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9' },
  { value: '21', suffix: 'km', label: 'Planned Beaches', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  { value: '09', suffix: '', label: 'Premium Marinas', icon: 'M13 10V3L4 14h7v8l9-11h-7z' },
];

const stickySections = [
  {
    id: 'live',
    tab: 'Live',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    title: 'Crafting a Lifestyle of Your Dreams',
    subtitle: 'LIVE',
    desc: 'Experience luxury living in expansive waterfront villas and apartments nestled along the pristine beaches of Dubai Islands.',
    image: 'https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/TL-PRIVE-GeneralView03.webp',
    buttons: ['Apartments', 'Villas']
  },
  {
    id: 'learn',
    tab: 'Learn',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    title: 'Cultivating a Future-Ready Generation',
    subtitle: 'LEARN',
    desc: 'Nurture young minds with state-of-the-art educational facilities planned right within the community boundaries.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000',
    buttons: []
  },
  {
    id: 'entertainment',
    tab: 'Entertainment',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Leisure that Refreshes Your Soul',
    subtitle: 'ENTERTAINMENT',
    desc: 'Indulge in a wealth of amenities including 9 and 18-hole golf courses, designed for endless fun and relaxation.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1000',
    buttons: []
  },
  {
    id: 'dine',
    tab: 'Dine',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>,
    title: 'Feast on Luxurious Delicacies',
    subtitle: 'DINE',
    desc: 'Savour exquisite dining experiences at waterfront restaurants and premium marinas spanning across the islands.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000',
    buttons: []
  }
];

const faqs = [
  { question: 'Is Dubai Islands a good place to live?', answer: 'Yes, it offers an unparalleled waterfront lifestyle with beaches, golf courses, and luxury amenities.' },
  { question: 'What are the key features in Dubai Islands?', answer: 'Key features include 5 distinct islands, 21km of beaches, 9 marinas, and two golf courses.' },
  { question: 'Is Dubai Islands a good investment?', answer: 'As a prime Nakheel master development on the coastline, it represents a highly lucrative long-term investment.' },
];

const locations = [
  { label: 'Downtown Dubai', time: '20 mins' },
  { label: 'Dubai Int. Airport', time: '15 mins' },
  { label: 'Cruise Terminal', time: '10 mins' },
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

function SophisticationSection() {
  const containerRef = useRef(null);

  // Track scroll progress specifically for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Card 1: Subtle scale and slight upward drift
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);

  // Card 2: Aggressive upward move to create the "Overlap"
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -250]);

  // Floating Text Parallax
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="bg-white relative px-6 py-40 md:py-64 overflow-hidden"
    >
      {/* ─── BACKGROUND SECTION TITLE ─── */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-x-0 top-20 z-0 opacity-[0.05] pointer-events-none select-none flex justify-center"
      >
        <h2 className="text-[10vw] text-[#000000] font-marcellus leading-none uppercase text-center">
          Sophisticated
        </h2>
      </motion.div>

      <div className="max-w-[1400px] mx-auto relative grid grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: THE ANCHOR CARD */}
        <div className="col-span-12 md:col-span-7 relative z-10">
          <div className="overflow-hidden mb-12 text-left">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: customEase }}
              className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 leading-[1.1]"
            >
              Step into <br />
              <span className="font-marcellus">A World Of Sophistication</span>
            </motion.h2>
          </div>

          <motion.div
            style={{ y: y1, scale: scale1 }}
            className="relative aspect-[16/10] md:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000"
              fill
              alt="Luxury Interior"
              className="object-cover"
            />
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: THE OVERLAPPING CARD */}
        <div className="col-span-12 md:col-span-5 relative mt-[-10%] md:mt-0">
          <motion.div
            style={{ y: y2 }}
            className="relative aspect-square md:aspect-[3/4] w-full md:w-[120%] md:ml-[-20%] rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] z-20 border-[12px] border-white"
          >
            <Image
              src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1000"
              fill
              alt="Island View"
              className="object-cover"
            />

            {/* Floating Detail Label */}
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-2">Exclusively</p>
              <h4 className="text-2xl font-marcellus">Dubai Islands</h4>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-[#CBA153]/30"
          />
        </div>
      </div>

      {/* ─── CAPTION ─── */}
      <div className="mt-32 flex justify-end">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="max-w-xs text-sm text-gray-400 font-light leading-relaxed text-right border-r-2 border-[#CBA153] pr-6"
        >
          Every corner is a testament to architectural brilliance, blending the turquoise waters with modern geometric precision.
        </motion.p>
      </div>
    </section>
  );
}

// ─── INVISIBLE AUDIO PLAYER HOOK ─────────────────────────────
function useBackgroundAudio(audioSrc: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element only on client side
    if (typeof window !== 'undefined') {
      const audio = new Audio(audioSrc);
      audio.loop = true; // Loop the beach sound for continuous ambiance
      audio.preload = 'auto';
      
      // Handle audio end to reset playing state if not looping (though loop is true)
      audio.addEventListener('ended', () => setIsPlaying(false));
      
      audioRef.current = audio;
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
          audioRef.current = null;
        }
      };
    }
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play with a promise to handle autoplay restrictions gracefully
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn('Audio playback failed:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  // Optional: Pause audio when component unmounts or page navigates
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return { isPlaying, togglePlay };
}

// ─── MAIN PAGE COMPONENT ────────────────────────────────────
export default function CommunityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStickySection, setActiveStickySection] = useState(stickySections[0].id);
  
  // Audio playback hook - using the beach sound file
  const { isPlaying, togglePlay } = useBackgroundAudio('/sound/beach-sound.mp3');

  // Parallax Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);

  const luxuryBreakRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: luxuryProgress } = useScroll({ target: luxuryBreakRef, offset: ["start end", "end start"] });
  const luxuryY = useTransform(luxuryProgress, [0, 1], ["-10%", "10%"]);
  const luxuryScale = useTransform(luxuryProgress, [0, 1], [1.1, 1]);

  return (
    <>
      <Navbar /> 

      {/* CURTAIN REVEAL */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.4, ease: customEase, delay: 0.2 }}
        className="fixed inset-0 z-50 bg-white pointer-events-none flex items-center justify-center"
      >
        {/* Subtle logo pulse during load */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center"
        >
          <span className="text-gray-400 text-xs tracking-widest">FP</span>
        </motion.div>
      </motion.div>

      <main className="bg-black">

        {/* ══════════════════════════════════════════
            1. HERO VIDEO
        ══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative h-[80svh] md:h-[90svh] w-full overflow-hidden bg-[#050505]">
          <motion.div style={{ y: videoY }} className="absolute inset-0 w-full h-full">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105">
              <source src="https://videos.pexels.com/video-files/3209300/3209300-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          {/* Magnetic Audio Play/Pause Button */}
          <div className="absolute bottom-12 right-12 z-20 hidden md:block">
            <Magnetic>
              <button 
                onClick={togglePlay}
                className="w-24 h-24 rounded-full border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-500 group"
                aria-label={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
              >
                {isPlaying ? (
                  <Pause size={20} className="mb-1" />
                ) : (
                  <Play size={20} fill="currentColor" className="mb-1 ml-1" />
                )}
                <span className="text-[9px] uppercase tracking-widest font-medium">
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </button>
            </Magnetic>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. STATS STRIP
        ══════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-200 relative z-10">
          <div className="max-w-[1400px] mx-auto px-6 py-8 md:py-12 flex flex-col xl:flex-row items-center xl:items-start justify-between gap-10">

            {/* Logo Reveal */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: customEase }}
              className="flex flex-col items-center xl:items-start xl:w-1/4 shrink-0"
            >              
              <h2 className="text-xl md:text-2xl font-marcellus tracking-wide text-center xl:text-left text-gray-900">DUBAI ISLANDS</h2>
            </motion.div>

            <div className="xl:w-3/4 flex flex-col w-full">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xs md:text-sm uppercase tracking-widest text-gray-400 mb-8 text-center xl:text-left"
              >
                Live the good life: <span className="font-medium text-gray-900">Dubai Islands - Luxury Properties in Dubai</span>
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + (idx * 0.1), ease: customEase }}
                    className="flex items-center gap-5 pt-6 md:pt-0 px-4 xl:px-8 justify-center xl:justify-start group"
                  >
                    <div className="w-12 h-12 shrink-0 text-[#CBA153]/50 group-hover:text-[#CBA153] transition-colors duration-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight font-serif">
                        <AnimatedCounter value={stat.value} />
                        {stat.suffix && <span className="text-xl font-normal ml-1 text-gray-400">{stat.suffix}</span>}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. INTRO (Text Left, Image Right)
        ══════════════════════════════════════════ */}
        <section className="bg-white px-6 py-24 md:py-40">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">

            <div className="w-full md:w-1/2">
              {/* Staggered Line Reveal */}
              <div className="overflow-hidden mb-2">
                <motion.h2
                  initial={{ y: "100%", rotate: 2 }}
                  whileInView={{ y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: customEase }}
                  className="text-3xl md:text-5xl font-light leading-[1.3] text-gray-800"
                >
                  Experience inspired living
                </motion.h2>
              </div>
              <div className="overflow-hidden mb-2">
                <motion.h2
                  initial={{ y: "100%", rotate: 2 }}
                  whileInView={{ y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: customEase, delay: 0.1 }}
                  className="text-3xl md:text-5xl font-light leading-[1.3] text-gray-800"
                >
                  in an expansive waterfront
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%", rotate: 2 }}
                  whileInView={{ y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: customEase, delay: 0.2 }}
                  className="text-3xl md:text-5xl font-light leading-[1.3] text-gray-800"
                >
                  community in <span className="font-marcellus">Dubai Islands.</span>
                </motion.h2>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              {/* Cinematic Clip-Path Unmasking */}
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: slowEase }}
                className="relative aspect-[4/3] rounded-[40px] overflow-hidden group"
              >
                <motion.div
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: slowEase }}
                  className="w-full h-full"
                >
                  <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000" alt="Family lifestyle" fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. PARALLAX BREAK "In the heart of Luxury"
        ══════════════════════════════════════════ */}
        <section ref={luxuryBreakRef} className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
          <motion.div style={{ y: luxuryY, scale: luxuryScale }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image src="/port-2.webp" alt="Luxury Living" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: customEase }}
                className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/80 font-medium block mb-4 font-marcellus"
              >
                In the heart of
              </motion.span>
              <div className="overflow-hidden p-4">
                <motion.h2
                  initial={{ y: "100%", skewY: 5 }}
                  whileInView={{ y: 0, skewY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: customEase, delay: 0.1 }}
                  className="text-7xl md:text-[10rem] font-marcellus text-white drop-shadow-2xl leading-none"
                >
                  Dubai
                </motion.h2>
              </div>
            </div>
          </div>
        </section>


        <SophisticationSection />


        <section className="bg-white px-6 py-40 relative flex flex-col md:flex-row items-start gap-12 lg:gap-32">

          {/* Left Sidebar: Minimalist "Instrument Cluster" */}
          <div className="hidden md:block w-1/5 sticky top-1/4 shrink-0 h-fit">
            <div className="max-w-[1400px] mx-auto relative pl-8 border-l border-gray-100 flex flex-col gap-10">

              {/* Moving Indicator Dot */}
              <motion.div
                className="absolute left-[-1.5px] w-[3px] bg-[#CBA153] shadow-[0_0_10px_rgba(203,161,83,0.5)]"
                animate={{
                  top: stickySections.findIndex(s => s.id === activeStickySection) * 68,
                  height: 24
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />

              {stickySections.map((sec, idx) => {
                const isActive = activeStickySection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className="flex flex-col items-start text-left group transition-all duration-500"
                  >
                    <span className={`text-[10px] tracking-[0.4em] uppercase mb-1 transition-colors duration-500 ${isActive ? 'text-[#CBA153] opacity-100' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`}>
                      0{idx + 1}
                    </span>
                    <span className={`text-xl font-marcellus transition-all duration-500 ${isActive ? 'text-black translate-x-2' : 'text-gray-400 font-light hover:text-gray-600'}`}>
                      {sec.tab}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content: Cinematic Storytelling */}
          <div className="w-full md:w-4/5 flex flex-col gap-64 pb-64">
            {stickySections.map((sec, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  id={sec.id}
                  key={sec.id}
                  onViewportEnter={() => setActiveStickySection(sec.id)}
                  viewport={{ amount: 0.6 }}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 lg:gap-24`}
                >
                  {/* Image Component with "Parallax Mask" */}
                  <div className="w-full md:w-3/5 aspect-[16/10] relative group overflow-hidden rounded-[2px]">
                    <motion.div
                      initial={{ scale: 1.3, filter: 'blur(10px)' }}
                      whileInView={{ scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                      className="w-full h-full"
                    >
                      <Image
                        src={sec.image}
                        alt={sec.title}
                        fill
                        className="object-cover transition-transform duration-[5s] group-hover:scale-110"
                      />
                    </motion.div>

                    {/* Subtle Decorative Border */}
                    <div className="absolute inset-4 border border-white/20 pointer-events-none" />
                  </div>

                  {/* Text Content: Refined Typography */}
                  <div className="w-full md:w-2/5 flex flex-col">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-[#CBA153]/40" />
                        <span className="text-[11px] tracking-[0.5em] uppercase text-[#CBA153] font-bold">
                          {sec.subtitle}
                        </span>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-marcellus text-gray-900 mb-8 leading-[1.1] font-light">
                        {sec.title}
                      </h3>

                      <p className="text-gray-400 font-light leading-relaxed mb-12 text-lg border-l-2 border-gray-50 pl-6">
                        {sec.desc}
                      </p>

                      {sec.buttons.length > 0 && (
                        <div className="flex gap-6">
                          {sec.buttons.map((btn, i) => (
                            <button
                              key={i}
                              className="group relative text-[10px] tracking-[0.3em] uppercase font-bold text-gray-900 py-2 overflow-hidden"
                            >
                              <span className="relative z-10">{btn}</span>
                              <motion.div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#CBA153] origin-right group-hover:origin-left transition-transform scale-x-100 group-hover:scale-x-110" />
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. LOCATION OVERLAY (Map Pin Drops)
        ══════════════════════════════════════════ */}
        <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full">
            <Image src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000" alt="Dubai Aerial" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center md:items-end justify-between h-full pb-24">
            <div className="text-center md:text-left text-white mb-10 md:mb-0 overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: customEase }}
                className="text-sm tracking-[0.3em] uppercase mb-4 block text-[#CBA153] font-marcellus"
              >
                Right in the
              </motion.span>
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: customEase, delay: 0.1 }}
                className="text-5xl md:text-[5.5rem] font-marcellus leading-none"
              >
                Centre of Dubai
              </motion.h2>
            </div>

            <div className="flex flex-col gap-6 w-full md:w-auto">
              {locations.map((loc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.15 }}
                  className="flex items-center justify-end gap-6 text-white group cursor-default"
                >
                  <div className="text-right">
                    <h4 className="text-xl font-marcellus tracking-wide">{loc.label}</h4>
                    <span className="text-xs tracking-[0.2em] uppercase text-white/50">{loc.time}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#CBA153] group-hover:border-[#CBA153] transition-colors duration-500">
                    <MapPin size={18} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. FAQs (Animated Border & Collapse)
        ══════════════════════════════════════════ */}        
        <section className="relative py-24 md:py-40 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image 
              src="/images/sand-background.webp" 
              alt="Sand background" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-white/80" /> {/* Overlay for readability */}
          </div>
          
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              <div className="w-full md:w-1/3 overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: customEase }}
                  className="text-5xl md:text-7xl font-marcellus text-gray-900 tracking-tight"
                >
                  FAQs
                </motion.h2>
              </div>

              <div className="w-full md:w-2/3">
                {/* Draw top line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: customEase }}
                  className="w-full h-[1px] bg-gray-200 origin-left"
                />

                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex justify-between items-center py-8 text-left group"
                    >
                      <span className="text-lg md:text-2xl font-light text-gray-800 pr-8 transition-colors group-hover:text-[#CBA153]">
                        <span className="text-[#CBA153] mr-6 text-sm font-bold font-sans">Q{idx + 1}</span>
                        {faq.question}
                      </span>
                      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-[#CBA153] group-hover:text-[#CBA153] transition-all duration-500 shrink-0">
                        {openFaq === idx ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: customEase }}
                          className="overflow-hidden"
                        >
                          <p className="pb-8 text-gray-500 font-light leading-relaxed pl-12 text-lg max-w-2xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            9. CONTACT FORM (Input Focus Animations)
        ══════════════════════════════════════════ */}
        <section className="relative bg-[#F9F9F7] py-32 md:py-56 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">

              {/* LEFT SIDE: THE HOOK */}
              <div className="w-full lg:w-2/5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: customEase }}
                >
                  <span className="text-[10px] tracking-[0.5em] uppercase text-[#CBA153] font-bold block mb-8">
                    Personalized Service
                  </span>
                  <h2 className="text-6xl md:text-8xl font-marcellus text-gray-900 leading-[0.9] mb-12">
                    Hear <br /> <span className=" font-light">From You</span>
                  </h2>

                  <p className="text-gray-500 font-light text-lg leading-relaxed max-w-sm mb-12 border-l border-[#CBA153]/30 pl-8">
                    Our luxury consultants are ready to curate your Dubai Islands experience. Reach out to begin your journey.
                  </p>

                  {/* Quick Contact Icons */}
                  <div className="flex gap-8 items-center text-gray-400">
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#CBA153] group-hover:border-[#CBA153] transition-all duration-500 group-hover:text-white">
                        <Phone size={18} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest group-hover:text-gray-900 transition-colors">Call</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#CBA153] group-hover:border-[#CBA153] transition-all duration-500 group-hover:text-white">
                        <Video size={18} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest group-hover:text-gray-900 transition-colors">Video</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#CBA153] group-hover:border-[#CBA153] transition-all duration-500 group-hover:text-white">
                        <MessageSquare size={18} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest group-hover:text-gray-900 transition-colors">WhatsApp</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT SIDE: THE MINIMAL FORM */}
              <div className="w-full lg:w-3/5 bg-white/50 backdrop-blur-sm p-8 md:p-16 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-white">
                <div className="flex flex-wrap gap-10 border-b border-gray-100 mb-16 pb-0">
                  {['Buy Property'].map((tab, i) => (
                    <button
                      key={tab}
                      className={`text-[10px] tracking-[0.3em] uppercase pb-6 transition-all relative ${i === 0 ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}`}
                    >
                      {tab}
                      {i === 0 && <motion.div layoutId="contactUnderline" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CBA153]" />}
                    </button>
                  ))}
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">

                  {/* Custom Animated Input Wrapper */}
                  <InputWrapper label="First Name" />
                  <InputWrapper label="Last Name" />

                  <div className="col-span-full grid grid-cols-12 gap-4">
                    <div className="col-span-3 border-b border-gray-200 pb-3">
                      <select className="bg-transparent w-full text-sm outline-none appearance-none cursor-pointer font-medium">
                        <option>UAE (+971)</option>
                        <option>IND (+91)</option>
                        <option>UK (+44)</option>
                      </select>
                    </div>
                    <div className="col-span-9">
                      <InputWrapper label="Phone Number" />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <InputWrapper label="Email Address" />
                  </div>

                  <div className="col-span-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full md:w-auto bg-[#111] text-white px-16 py-6 rounded-full text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#CBA153] transition-all duration-700 flex items-center justify-center gap-4"
                    >
                      Request a consultation
                      <ArrowUpRight size={16} />
                    </motion.button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function InputWrapper({ label }: { label: string }) {
  return (
    <div className="relative group">
      <input
        type="text"
        placeholder=" " // Required for the peer-placeholder-shown logic
        className="peer w-full bg-transparent border-b border-gray-200 py-3 outline-none text-gray-900 focus:border-[#CBA153] transition-all duration-500"
      />
      <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all duration-500 pointer-events-none 
        peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#CBA153] 
        peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
        {label}
      </label>
      <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#CBA153] group-hover:w-full transition-all duration-700" />
    </div>
  );
}