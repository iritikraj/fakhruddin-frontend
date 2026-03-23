'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    title: "Treppan Living Privé",
    category: "Residential",
    image: "/port-1.webp",
  },
  {
    id: 2,
    title: "Treppan Serenique Residences",
    category: "Luxury Living",
    image: "/port-2.webp",
  },
  {
    id: 3,
    title: "Treppan Tower",
    category: "Commercial",
    image: "/port-3.webp",
  },
  {
    id: 4,
    title: "Hatimi Residences",
    category: "Architecture",
    image: "/port-4.webp",
  }
];

// Animation variants for the title container and individual words
const titleContainer: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.5,
    },
  },
};

const wordReveal: any = {
  hidden: {
    y: 80,
    z: -200,
    rotateX: 12,
    opacity: 0,
    scale: 0.9,
    filter: "blur(4px)",
  },
  show: {
    y: 0,
    z: 0,
    rotateX: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
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
          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/40 to-black/10" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/70 pb-2 pl-3 pr-2 border-b border-white/30"
          >
            {project.category}
          </motion.span>

          <motion.h3
            variants={titleContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            className="text-5xl md:text-6xl text-white font-marcellus leading-tight flex flex-wrap justify-center gap-x-4 md:gap-x-6 [perspective:1000px]"
          >
            {project.title.split(" ").map((word: string, i: number) => (
              <span key={i} className="relative overflow-hidden inline-block pb-2">
                <motion.span variants={wordReveal} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h3>
        </div>

        {/* Bottom Left: Project Numbering */}
        <div className="absolute top-20 right-12 hidden md:block">
          <p className="text-white/40 font-marcellus text-2xl">
            0{index + 1} <span className="text-xs tracking-widest ml-2 opacity-50">/ 04</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}