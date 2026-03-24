'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onIntroFinished: () => void;
}

export default function HeroSection({ onIntroFinished }: HeroProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    // 1. Start the exit of the brand elements
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 4500);

    // 2. Signal the HomePage to show the Navbar exactly when the line finishes
    const navbarTimer = setTimeout(() => {
      onIntroFinished();
      setShowHero(true);
    }, 5200);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(navbarTimer);
    };
  }, [onIntroFinished]);

  const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const maskEase: [number, number, number, number] = [0.4, 0, 0.2, 1];

  return (
    <section className="relative h-svh w-full overflow-hidden bg-black font-marcellus">

      {/* BACKGROUND VIDEO - Plays immediately */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay loop muted playsInline preload="auto"
          className="w-full h-full object-cover scale-105"
        >
          <source src="/fpd-intro.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark overlay so white text is readable against video */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* 1. CINEMATIC OVERLAY INTRO (Transparent Background) */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-splash"
            exit={{
              opacity: 0,
              filter: "blur(15px)",
              transition: { duration: 1.2, ease: luxuryEase }
            }}
            // REMOVED bg-black here so video shows behind
            className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center">
              {/* LOGO REVEAL */}
              <motion.div
                initial={{ WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 0%)', opacity: 1 } as any}
                animate={{ WebkitMaskImage: 'linear-gradient(to right, black 100%, transparent 110%)', opacity: 1 } as any}
                transition={{ duration: 2.5, ease: maskEase, delay: 0.5 }}
              >
                <img src="/fp-logo.svg" alt="Fakhruddin" className="w-64 md:w-96 brightness-0 invert" />
              </motion.div>

              {/* PROPERTIES TEXT */}
              <motion.div
                initial="hidden" animate="show"
                variants={{
                  show: { transition: { staggerChildren: 0.08, delayChildren: 1.8 } }
                }}
                className="flex mt-4"
              >
                {"PROPERTIES".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1 } }
                    }}
                    className="text-sm md:text-lg tracking-[0.6em] text-white font-light uppercase"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              {/* DECORATIVE LINE */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: luxuryEase, delay: 2.8 }}
                className="mt-8 h-px w-32 md:w-48 bg-linear-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN HERO CONTENT (Post-Intro) */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "110%" }}
            animate={showHero ? { y: 0 } : {}}
            transition={{ duration: 1.8, ease: luxuryEase }}
            className="text-5xl md:text-7xl text-white uppercase font-marcellus tracking-tight"
          >
            Creating Living
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ y: "110%" }}
            animate={showHero ? { y: 0 } : {}}
            transition={{ duration: 1.8, ease: luxuryEase, delay: 0.2 }}
            className="text-5xl md:text-7xl text-white uppercase font-marcellus tracking-tight"
          >
            Works Of Art
          </motion.h1>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={showHero ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="border border-white/20 text-white px-12 py-5 text-[10px] tracking-[0.4em] uppercase hover:bg-white/40 hover:text-black transition-all duration-700 backdrop-blur-xs"
        >
          Discover More
        </motion.button>
      </div>

      {/* 5. ANIMATED SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1.2, ease: luxuryEase, delay: showIntro ? 0 : 1.2 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/70 font-medium font-marcellus">Scroll</span>
        <div className="w-px h-8 bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-full bg-white/60"
          />
        </div>
      </motion.div>

    </section>
  );
}