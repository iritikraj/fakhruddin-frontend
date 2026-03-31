'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const COMMUNITIES = [
  {
    id: 1,
    title: "Dubai Islands",
    tag: "COMMUNITY . RESIDENTIAL",
    leftImg: "/port-1.webp",
    rightImg: "/port-2.webp",
  },
  {
    id: 2,
    title: "Jumeirah <br/> Village <br/> Triangle",
    tag: "COMMUNITY . RESIDENTIAL",
    leftImg: "/port-3.webp",
    rightImg: "/port-4.webp",
  }
];

function CommunityBlock({ data }: { data: typeof COMMUNITIES[0] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20
  });

  // ─── DESKTOP ANIMATIONS (The Wipe Open) ───
  // Cards start at 0 (center) and move to their respective sides
  const leftX = useTransform(smoothProgress, [0.2, 1], ["0%", "-32vw"]);
  const rightX = useTransform(smoothProgress, [0.2, 1], ["0%", "32vw"]);

  // Cards start flat (0) and tilt as they move out
  const leftRotate = useTransform(smoothProgress, [0.4, 1], [0, -4]);
  const rightRotate = useTransform(smoothProgress, [0.4, 1], [0, 4]);

  // Text Reveal: Stays hidden until cards have moved significantly
  const textOpacity = useTransform(smoothProgress, [0.5, 1], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.6, 1], [0.9, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${isMobile ? "h-screen sticky top-0" : "h-[120vh] flex items-center justify-center"
        }`}
    >
      {/* 1. CENTER TEXT LAYER */}
      <motion.div
        style={!isMobile ? { opacity: textOpacity, scale: textScale } : {}}
        className="relative z-0 text-center flex flex-col items-center px-4"
      >
        <span className="font-marcellus text-[10px] tracking-[0.4em] uppercase text-white/50 mb-6">
          {data.tag}
        </span>
        <h2
          className="text-5xl md:text-6xl font-marcellus text-white leading-[1.1] mb-12 drop-shadow-2xl"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
        <div className="w-64 h-5 bg-[linear-gradient(90deg,rgba(76,73,104,0.7)_0%,rgba(115,3,192,0.7)_33.33%,rgba(236,56,188,0.7)_66.67%,rgba(253,239,249,0.7)_100%)] rounded-full" />
      </motion.div>

      {/* 2. IMAGE CARDS (Mobile: Hidden or simple / Desktop: The Reveal) */}
      {!isMobile && (
        <>
          {/* Left Image */}
          <motion.div
            style={{ x: leftX, rotate: leftRotate }}
            className="absolute w-[30vw] h-[70vh] rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/10"
          >
            <img src={data.leftImg} className="w-full h-full object-cover" alt="community" />
          </motion.div>

          {/* Right Image */}
          <motion.div
            style={{ x: rightX, rotate: rightRotate }}
            className="absolute w-[30vw] h-[70vh] rounded-2xl overflow-hidden shadow-2xl z-20 border border-white/10"
          >
            <img src={data.rightImg} className="w-full h-full object-cover" alt="community" />
          </motion.div>
        </>
      )}

      {/* 3. MOBILE ONLY IMAGE (Simple Full-Screen Card) */}
      {isMobile && (
        <div className="absolute inset-0 z-[-1]">
          <img src={data.leftImg} className="w-full h-full object-cover brightness-[0.4]" alt="mobile-bg" />
        </div>
      )}
    </div>
  );
}

export default function CommunitiesSection() {
  return (
    <section className="bg-[#0b0b0b]">
      {/* Massive Header */}
      <div className="h-[40vh] flex items-center justify-center pt-40">
        <h1 className="text-5xl md:text-6xl font-marcellus text-white text-center uppercase tracking-tighter leading-normal">
          Residential <br />
          <span className="">Communities</span>
        </h1>
      </div>

      <div className="relative flex flex-col">
        {COMMUNITIES.map((community) => (
          <CommunityBlock key={community.id} data={community} />
        ))}
      </div>

      <div className="h-[20vh]" />
    </section>
  );
}