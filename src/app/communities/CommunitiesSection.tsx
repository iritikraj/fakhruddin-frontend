// components/CommunitiesSection.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { communitiesData } from './page'

export default function CommunitiesSection() {
  // We duplicate the data to create a seamless infinite loop.
  // Animating to -50% width means it scrolls exactly half the duplicated items, perfectly resetting.
  const infiniteCards = [...communitiesData, ...communitiesData, ...communitiesData, ...communitiesData];

  // State to pause the auto-scroll on hover
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-white text-neutral-900 py-32 min-h-screen overflow-hidden">
      <div className="max-w-[100vw]">

        {/* Header Section (Unchanged) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="text-xs tracking-[0.4em] uppercase text-[#111] mb-6 font-medium">
              Inspired Living
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-neutral-900">
              Communities
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="pb-2"
          >
            <motion.p
              className="text-neutral-500 font-light leading-relaxed text-lg md:text-xl"
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              At Fakhruddin Properties, we carefully select locations within
              master communities with strong long-term potential. Each project
              is uniquely designed to stand apart, while thoughtfully responding
              to the character, needs, and evolving aspirations of the community
              it serves.
            </motion.p>
            <div className="mt-10">
              <Link
                href="/communities"
                className="inline-flex items-center gap-3 border-b border-neutral-300 pb-2 hover:text-neutral-500 hover:border-neutral-500 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-medium"
              >
                All Communities
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Infinite Auto-Scroll Slider Area */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="w-full relative py-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* The moving track. 
            When hovered, duration increases massively to effectively "pause" smoothly.
          */}
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isHovered ? 200 : 35, // Slows down dramatically on hover
                ease: "linear",
              },
            }}
            className="flex gap-6 md:gap-8 w-max px-4">
            {infiniteCards.map((community, index) => {
              // Get original index for the numbering (e.g., 01, 02, 03)
              const originalIndex = index % communitiesData.length;
              const displayNum = `0${originalIndex + 1}`;

              return (
                <div
                  key={`${community.id}-${index}`}
                  className="w-[320px] md:w-[400px] flex-shrink-0"
                >
                  {/* Premium Editorial Card */}
                  <Link href={community.slug} className="group block relative aspect-[3/4] overflow-hidden bg-neutral-100">

                    {/* The Image */}
                    <Image
                      src={community.imageUrl}
                      alt={community.title}
                      fill
                      sizes="(max-width: 768px) 320px, 400px"
                      className="object-cover transition-transform duration-[2s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                    />

                    {/* Sophisticated Gradient (Darkens slightly on hover to make text pop) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 opacity-60 transition-opacity duration-700 group-hover:opacity-90" />

                    {/* Top Editorial Numbering */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-white/90 overflow-hidden mix-blend-overlay">
                      <span className="text-xs tracking-widest font-medium translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]">
                        Index
                      </span>
                      <span className="text-sm tracking-widest font-light translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] delay-75">
                        {displayNum}
                      </span>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">

                      {/* Subtitle / Location */}
                      <div className="overflow-hidden mb-2">
                        <span className="block text-white/70 text-xs tracking-[0.2em] uppercase translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]">
                          Dubai, UAE
                        </span>
                      </div>

                      {/* Title & Icon */}
                      <div className="flex justify-between items-end border-b border-white/20 pb-4 group-hover:border-white/50 transition-colors duration-700">
                        <h4 className="text-white text-2xl md:text-3xl font-light tracking-wide">
                          {community.title}
                        </h4>

                        {/* Elegant Arrow that shoots up and right on hover */}
                        <div className="relative w-6 h-6 overflow-hidden text-white mb-1">
                          <ArrowUpRight
                            strokeWidth={1.5}
                            className="absolute inset-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-x-full group-hover:-translate-y-full"
                          />
                          <ArrowUpRight
                            strokeWidth={1.5}
                            className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-x-0 group-hover:translate-y-0"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Global Explore Button */}
      <div className="mt-16 flex justify-center">
        <Link
          href="/communities"
          className="group inline-flex items-center gap-4 text-neutral-900 uppercase tracking-[0.2em] text-xs font-medium"
        >
          <span className="border-b border-neutral-300 pb-1 group-hover:border-neutral-900 transition-colors duration-300">
            View All Locations
          </span>
          <span className="w-8 h-[1px] bg-neutral-300 group-hover:w-12 group-hover:bg-neutral-900 transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
}