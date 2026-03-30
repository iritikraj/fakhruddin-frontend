'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    title: "Tréppan Serenique Residences",
    category: "Luxury Living",
    image: "/port-3.webp",
    logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-serenique-logo.png"
  },
  {
    id: 2,
    title: "Hatimi Residences",
    category: "Architecture",
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Podium-Day_7_11.webp",
    logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/hatimi-logo.png"
  },
  {
    id: 3,
    title: "Tréppan Tower",
    category: "Commercial",
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Tower-Copy-of-TwilightUpdate.webp",
    logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-tower-logo.png"
  },
  {
    id: 4,
    title: "Maimoon Gardens",
    category: "Residential",
    image: "/port-1.webp",
    logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/maimoon-gardens-logo.png"
  }
];

// Single, grand cinematic reveal for the logo images
const logoReveal: any = {
  hidden: {
    y: 80,
    z: -150,
    rotateX: 15,
    opacity: 0,
    scale: 0.85,
    filter: "blur(10px)",
  },
  show: {
    y: 0,
    z: 0,
    rotateX: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1], // Luxury ease curve
    },
  },
};

export default function FeaturedProjects() {
  return (
    <section className="relative bg-black [transform-style:preserve-3d]">
      <div className="h-[40vh] flex flex-col justify-end text-center px-10 pb-32 bg-white">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-4 font-marcellus">Portfolio</p>
        <h2 className="text-5xl md:text-6xl font-marcellus uppercase text-gray-900 leading-none">
          Featured Projects
        </h2>
      </div>

      <div className="relative">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="h-[20vh] bg-white" />
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div
      ref={container}
      className="h-screen w-full sticky top-0 overflow-hidden"
    >
      <motion.div
        style={{ scale }}
        className="relative h-full w-full origin-top"
      >
        {/* Background Image - Full Cover */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {/* Subtle Vignette for text/logo readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 [perspective:1200px]">

          {/* The 3D Animated Logo */}
          <motion.div
            variants={logoReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[550px] h-[120px] md:h-[200px] flex items-center justify-center"
          >
            <img
              src={project.logo}
              alt={project.title}
              className={`w-96 h-full object-contain ${project.logo.endsWith(".svg") ? "invert" : ""} ${project.image.endsWith("/port-3.webp") ? "w-210" : ""}`}
            />
          </motion.div>

        </div>

        {/* Top Right: Project Numbering */}
        {/* <div className="absolute top-10 md:top-20 right-6 md:right-12">
          <p className="text-white/60 font-marcellus text-xl md:text-2xl drop-shadow-md">
            0{index + 1} <span className="text-[10px] md:text-xs tracking-widest ml-1 md:ml-2 opacity-50">/ 04</span>
          </p>
        </div> */}
      </motion.div>
    </div>
  );
}