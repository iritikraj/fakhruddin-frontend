'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 4500);

    const heroTimer = setTimeout(() => {
      setShowHero(true);
    }, 4500 + 1000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(heroTimer);
    };
  }, []);

  // Professional Cinematographic Easings
  const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const maskEase: [number, number, number, number] = [0.4, 0, 0.2, 1]; // Controlled, steady reveal

  const letterReveal = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 1.2, ease: luxuryEase }
    }
  };

  return (
    <section className="relative h-svh w-full overflow-hidden bg-black font-marcellus">

      {/* 1. BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/fpd-intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 2. CINEMATIC INTRO */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-splash"
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(15px)",
              transition: { duration: 1.5, ease: luxuryEase }
            }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center">

              {/* LOGO REVEAL: Gradient Mask Strategy */}
              <motion.div
                initial={{
                  WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 0%)',
                  opacity: 1,
                  filter: "blur(0px)"
                }}
                animate={{
                  WebkitMaskImage: 'linear-gradient(to right, black 100%, transparent 110%)',
                  opacity: 1,
                  filter: "blur(0px)"
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(20px)",
                  scale: 1.08,
                  transition: { duration: 1.6, ease: luxuryEase }
                }}
                transition={{ duration: 2.8, ease: maskEase, delay: 0.5 }}
                className="relative"
              >
                <img
                  src="/fp-logo.svg"
                  alt="Fakhruddin"
                  className="w-70 md:w-112.5 brightness-0 invert"
                />
              </motion.div>

              {/* PROPERTIES SUBTITLE: Focus Stagger */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  show: { transition: { staggerChildren: 0.08, delayChildren: 1.8 } }
                }}
                className="flex mt-6 ml-2"
              >
                {"PROPERTIES".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterReveal}
                    className="text-base md:text-xl tracking-[0.5em] uppercase text-white/90 font-light"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              {/* DECORATIVE LINE */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: luxuryEase, delay: 2.5 }}
                className="mt-6 h-px w-32 md:w-48 bg-linear-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN HERO CONTENT */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={showHero ? { y: 0 } : {}}
            transition={{ duration: 1.5, ease: luxuryEase, delay: 0.2 }}
            className="text-5xl md:text-6xl text-white uppercase font-marcellus drop-shadow-lg"
          >
            Creating Living
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ y: "100%" }}
            animate={showHero ? { y: 0 } : {}}
            transition={{ duration: 1.5, ease: luxuryEase, delay: 0.4 }}
            className="text-5xl md:text-6xl text-white uppercase font-marcellus drop-shadow-lg"
          >
            Works Of Art
          </motion.h1>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={showHero ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: luxuryEase, delay: 0.8 }}
          className="border border-white/20 text-white px-10 py-4 text-[10px] md:text-xs tracking-[0.24em] uppercase hover:bg-white hover:text-black transition-all duration-700 backdrop-blur-xs"
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