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
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── LUXURY EASING ─────────────────────────────────────────
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const slowEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

// ─── MOCK DATA ──────────────────────────────────────────────
const stats = [
  { value: '05', suffix: '', label: 'Distinct Islands' },
  { value: '21', suffix: 'km', label: 'Planned Beaches' },
  { value: '09', suffix: '', label: 'Premium Marinas' },
];

const stickySections = [
  {
    id: 'live',
    tab: 'Live',
    title: 'Crafting a Lifestyle of Your Dreams',
    subtitle: 'LIVE',
    desc: 'Experience luxury living in expansive waterfront villas and apartments nestled along the pristine beaches of Dubai Islands.',
    image: 'https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/TL-PRIVE-GeneralView03.webp',
    buttons: ['Apartments', 'Villas']
  },
  {
    id: 'learn',
    tab: 'Learn',
    title: 'Cultivating a Future-Ready Generation',
    subtitle: 'LEARN',
    desc: 'Nurture young minds with state-of-the-art educational facilities planned right within the community boundaries.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000',
    buttons: []
  }
];

// ─── UTILITY COMPONENTS ─────────────────────────────────────

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

// ─── PAGE SECTIONS (Isolated to prevent hydration errors) ───

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  // Safely scoped useScroll specific to this div
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <motion.div style={{ y: videoY }} className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105">
          <source src="https://videos.pexels.com/video-files/3209300/3209300-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pb-24 z-10 max-w-[1600px] mx-auto w-full">
        <div className="overflow-hidden mb-4">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: customEase }}
            className="block text-[#B2904C] tracking-[0.4em] uppercase text-xs font-bold"
          >
            Nakheel Masterplan
          </motion.span>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: customEase }}
            className="text-white text-6xl md:text-8xl lg:text-[9rem] font-serif italic font-light tracking-tight leading-[0.9]"
          >
            Dubai Islands.
          </motion.h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-[1px] bg-white/20 overflow-hidden hidden md:block"
      >
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-full h-1/2 bg-white"
        />
      </motion.div>
    </section>
  );
}

function EditorialSection() {
  const { scrollYProgress } = useScroll(); // Global scroll has no target, naturally hydration safe
  const rotateStamp = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section className="relative max-w-[1400px] mx-auto px-6 py-32 md:py-48 flex flex-col md:flex-row gap-16 md:gap-32">
      <div className="hidden lg:block w-1/4 relative">
        <div className="sticky top-40 flex justify-center">
          <motion.div style={{ rotate: rotateStamp }} className="relative w-40 h-40 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#B2904C] animate-spin-slow">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[10px] uppercase tracking-widest fill-current font-bold">
                <textPath href="#circlePath">
                  Fakhruddin Properties • Master Developer •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl italic">FP</div>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-3/4">
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "100%", rotate: 2 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: customEase }}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-[#1C1C1C] font-serif"
          >
            Experience inspired living in an expansive waterfront community.
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-12 mt-16 pt-16 border-t border-[#1C1C1C]/10"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex-1 flex flex-col gap-2">
              <span className="text-5xl md:text-6xl font-light text-[#1C1C1C] tracking-tight font-serif">
                <AnimatedCounter value={stat.value} />
                {stat.suffix && <span className="text-2xl font-normal ml-1 text-gray-400">{stat.suffix}</span>}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null);
  // Safely scoped horizontal tracker
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  const horizontalX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-[#111] text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-16 mb-12 flex justify-between items-end w-full max-w-[1600px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif italic font-light">The Masterplan</h2>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 hidden md:block">Scroll to explore</span>
        </div>

        <motion.div style={{ x: horizontalX }} className="flex gap-8 md:gap-16 px-6 md:px-16 w-max">
          <div className="w-[300px] md:w-[450px] h-[50vh] md:h-[60vh] relative overflow-hidden rounded-[20px]">
            <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000" fill alt="View 1" className="object-cover" />
          </div>
          <div className="w-[400px] md:w-[600px] h-[40vh] md:h-[50vh] relative overflow-hidden rounded-[20px] mt-12 md:mt-20">
            <Image src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000" fill alt="View 2" className="object-cover" />
          </div>
          <div className="w-[300px] md:w-[450px] h-[50vh] md:h-[60vh] relative overflow-hidden rounded-[20px] -mt-10">
            <Image src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1000" fill alt="View 3" className="object-cover" />
          </div>
          <div className="w-[400px] md:w-[600px] h-[40vh] md:h-[50vh] relative overflow-hidden rounded-[20px] mt-12 md:mt-20">
            <Image src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000" fill alt="View 2" className="object-cover" />
          </div>
          <div className="w-[300px] md:w-[450px] h-[50vh] md:h-[60vh] relative overflow-hidden rounded-[20px]">
            <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000" fill alt="View 1" className="object-cover" />
          </div>
          <div className="w-[400px] md:w-[600px] h-[40vh] md:h-[50vh] relative overflow-hidden rounded-[20px] mt-12 md:mt-20">
            <Image src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000" fill alt="View 2" className="object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VisionaryQuote() {
  return (
    <section className="py-32 md:py-48 bg-[#F9F9F8]">
      <div className="max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center">
        <span className="text-[#B2904C] text-5xl mb-6 font-serif">"</span>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: customEase }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-[#1C1C1C] leading-tight mb-12"
        >
          Not just a residence, but a living, breathing legacy built on the pristine waters of Dubai.
        </motion.h3>
        <div className="flex items-center gap-6">
          <div className="w-16 h-[1px] bg-[#1C1C1C]/20" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1C1C1C]/60">Fakhruddin Vision</span>
          <div className="w-16 h-[1px] bg-[#1C1C1C]/20" />
        </div>
      </div>
    </section>
  );
}

function StickyStorytelling() {
  const [activeStickySection, setActiveStickySection] = useState(stickySections[0].id);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-24 relative flex flex-col md:flex-row items-start gap-12 lg:gap-32">
      <div className="hidden md:block w-1/5 sticky top-1/3 shrink-0 h-fit">
        <div className="relative pl-8 border-l border-[#1C1C1C]/10 flex flex-col gap-12">
          <motion.div
            className="absolute left-[-1.5px] w-[3px] bg-[#B2904C]"
            animate={{ top: stickySections.findIndex(s => s.id === activeStickySection) * 76, height: 24 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
          {stickySections.map((sec, idx) => {
            const isActive = activeStickySection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className="flex flex-col items-start text-left group"
              >
                <span className={`text-[10px] tracking-[0.3em] uppercase mb-2 transition-colors duration-500 font-bold ${isActive ? 'text-[#B2904C]' : 'text-[#1C1C1C]/30 group-hover:text-[#1C1C1C]/60'}`}>
                  0{idx + 1}
                </span>
                <span className={`text-xl font-serif transition-all duration-500 ${isActive ? 'text-[#1C1C1C] italic' : 'text-[#1C1C1C]/40 hover:text-[#1C1C1C]'}`}>
                  {sec.tab}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full md:w-4/5 flex flex-col gap-40 pb-40">
        {stickySections.map((sec, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              id={sec.id}
              key={sec.id}
              onViewportEnter={() => setActiveStickySection(sec.id)}
              viewport={{ amount: 0.6 }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              <div className="w-full md:w-[55%] aspect-[4/5] md:aspect-[3/4] relative group overflow-hidden rounded-[20px]">
                <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} transition={{ duration: 1.5, ease: slowEase }} className="w-full h-full">
                  <Image src={sec.image} alt={sec.title} fill className="object-cover transition-transform duration-[4s] group-hover:scale-105" />
                </motion.div>
              </div>

              <div className="w-full md:w-[45%] flex flex-col">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: customEase }}>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#B2904C] font-bold mb-6 block">
                    {sec.subtitle}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif text-[#1C1C1C] mb-8 leading-[1.1]">
                    {sec.title}
                  </h3>
                  <p className="text-[#1C1C1C]/60 font-light leading-relaxed mb-10 text-lg">
                    {sec.desc}
                  </p>
                  {sec.buttons.length > 0 && (
                    <div className="flex gap-6 border-t border-[#1C1C1C]/10 pt-6">
                      {sec.buttons.map((btn, i) => (
                        <button key={i} className="group relative text-[10px] tracking-[0.3em] uppercase font-bold text-[#1C1C1C] py-2 overflow-hidden">
                          <span className="relative z-10">{btn}</span>
                          <motion.div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B2904C] origin-right group-hover:origin-left transition-transform scale-x-0 group-hover:scale-x-100 duration-500" />
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
  );
}

function ContactForm() {
  return (
    <section className="bg-[#1C1C1C] text-[#F9F9F8] py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="w-full lg:w-1/3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B2904C] font-bold block mb-6">Inquiries</span>
          <h2 className="text-5xl md:text-7xl font-serif italic font-light leading-[1.1]">Begin your <br />journey.</h2>
        </div>

        <div className="w-full lg:w-2/3">
          <motion.form
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative group">
                <input type="text" placeholder="First Name *" className="w-full bg-transparent border-b border-[#F9F9F8]/20 pb-4 outline-none text-[#F9F9F8] peer text-lg font-light placeholder:text-[#F9F9F8]/40" />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B2904C] peer-focus:w-full transition-all duration-500" />
              </div>
              <div className="relative group">
                <input type="text" placeholder="Last Name *" className="w-full bg-transparent border-b border-[#F9F9F8]/20 pb-4 outline-none text-[#F9F9F8] peer text-lg font-light placeholder:text-[#F9F9F8]/40" />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B2904C] peer-focus:w-full transition-all duration-500" />
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="relative">
              <input type="email" placeholder="Email Address *" className="w-full bg-transparent border-b border-[#F9F9F8]/20 pb-4 outline-none text-[#F9F9F8] peer text-lg font-light placeholder:text-[#F9F9F8]/40" />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B2904C] peer-focus:w-full transition-all duration-500" />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="pt-8">
              <Magnetic>
                <button type="button" className="bg-[#B2904C] text-[#1C1C1C] px-12 py-5 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#F9F9F8] transition-colors duration-500 flex items-center gap-4 w-fit">
                  Submit Inquiry
                  <ArrowUpRight size={14} />
                </button>
              </Magnetic>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F9F9F8] text-[#1C1C1C] min-h-screen font-sans selection:bg-[#B2904C] selection:text-white">
        <HeroSection />
        <EditorialSection />
        <HorizontalGallery />
        <VisionaryQuote />
        <StickyStorytelling />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}