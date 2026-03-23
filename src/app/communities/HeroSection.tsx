// components/HeroSection.tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

  // Optional: Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Moves the image down slightly as you scroll down
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full bg-[#050505] overflow-hidden">

      {/* 1. The Expanding Clip-Path Image Container */}
      <motion.div
        initial={{ clipPath: "inset(15% 5% 15% 5% round 12px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        transition={{ duration: 1.8, ease: customEase }}
        className="absolute inset-0 w-full h-full origin-center"
      >
        <motion.div
          style={{ y }}
          className="relative w-full h-full"
        >
          {/* Subtle Ken Burns continuous slow zoom */}
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Copy-of-podium-05_1_11.webp"
              alt="Fakhruddin Properties Luxury Podium"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>

        {/* 2. Premium Film Grain Overlay (Tactile Texture) */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />

        {/* Complex Gradient: Darkens edges to frame the center */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-black/10 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30" />
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-black/20" */}
      </motion.div>

      {/* 3. Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 pb-12 md:p-12 lg:p-16">

        {/* Top Header Area (Can integrate your logo/nav here) */}
        <div className="w-full flex justify-between items-start overflow-hidden pt-4">

        </div>

        {/* Bottom Content Area */}
        <div className="max-w-[90rem] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-12">

          {/* Main Headline */}
          <div className="flex flex-col gap-6 relative">
            {/* Elegant decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: customEase, delay: 0.4 }}
              className="w-12 h-[1px] bg-white/40 origin-left"
            />

            <div className="flex flex-col gap-3">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: customEase, delay: 0.2 }}
                  className="text-white/70 uppercase tracking-[0.4em] text-xs font-medium"
                >
                  Fakhruddin Properties
                </motion.p>
              </div>

              <h1 className="text-white text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tight leading-[1.25] overflow-hidden">
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: customEase, delay: 0.3 }}
                    className="block"
                  >
                    Elevating Your
                  </motion.span>
                </div>
                <div className="mb-2 text-white/90 overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: customEase, delay: 0.4 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60"
                  >
                    Standard of Living
                  </motion.span>
                </div>
              </h1>
            </div>
          </div>

          {/* Right Side: Badges & Scroll */}
          <div className="flex flex-col items-start md:items-end gap-10">
            {/* Refined Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center gap-4 hidden md:flex"
            >
              <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
                Scroll to explore
              </span>
              <div className="w-[1px] h-20 bg-white/10 overflow-hidden relative">
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 w-full h-1/2 bg-white/80"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}