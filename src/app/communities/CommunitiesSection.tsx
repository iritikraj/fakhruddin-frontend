'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Wind, ShieldCheck } from 'lucide-react';
import { communitiesData } from './page';

export default function CommunitiesSection() {
  const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: customEase }}
        >
          <h2 className="text-xs tracking-[0.4em] uppercase text-[#b69c6b] mb-6 font-medium">
            Inspired Living
          </h2>
          <h3 className="text-5xl md:text-7xl font-light tracking-tighter text-[#1A1A1A] font-marcellus">
            Master <br />Communities
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: customEase, delay: 0.2 }}
          className="pb-2"
        >
          <p className="text-[#1A1A1A]/60 font-light leading-relaxed text-lg md:text-xl border-l border-[#1A1A1A]/10 pl-6">
            At Fakhruddin Properties, we carefully select locations within
            master communities with strong long-term potential. Each project
            is uniquely designed to stand apart, while thoughtfully responding
            to the character, needs, and evolving aspirations of the community
            it serves.
          </p>
        </motion.div>
      </div>
      {communitiesData.map((community, index) => (
        <CommunityCard key={community.id} community={community} index={index} />
      ))}
    </section>
  );
}

function CommunityCard({ community, index }: { community: any; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scale from 0.6 (small) to 1 (full screen)
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.7, 1]);
  // Transform border radius from 500px (oval) to 0px (square)
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["400px", "0px"]);
  // Opacity for the text overlay
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.5], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full bg-white">
      {/* Sticky container ensures the card stays in view while it expands */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        <motion.div
          style={{
            scale,
            borderRadius,
            width: "100%",
            height: "100%"
          }}
          className="relative overflow-hidden bg-neutral-200"
        >
          {/* Background Image */}
          <Image
            src={community.imageUrl}
            alt={community.title}
            fill
            priority={index === 0}
            className="object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content Overlay - Only visible when expanded */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 text-white"
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <span className="text-xs tracking-[0.4em] uppercase opacity-70 mb-4 block">
                 Community
                </span>
                <h2 className="text-6xl md:text-8xl font-light tracking-tighter mb-8 font-marcellus">
                  {community.title}
                </h2>

                {/* Community Key Details (Hover-like effect but persistent once visible) */}
                <div className="flex flex-wrap gap-8">
                  <DetailItem icon={<MapPin size={18} />} label="Prime Location" value="Downtown District" />
                  <DetailItem icon={<Wind size={18} />} label="Air Quality" value="A+ Rated" />
                  <DetailItem icon={<ShieldCheck size={18} />} label="Security" value="24/7 Gated" />
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end">
                <p className="text-lg md:text-xl font-light text-white/80 max-w-md lg:text-right mb-10 leading-relaxed">
                  Redefining the standard of sustainable luxury with wellness-integrated
                  architecture and vibrant social spaces.
                </p>
                <button className="group flex items-center gap-4 bg-white/10 text-white px-8 py-4 hover:bg-white/40 transition-colors backdrop-blur-xs">
                  <span className="text-xs uppercase tracking-widest font-bold font-marcellus">Explore Community</span>
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-white/50">
        {icon}
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}