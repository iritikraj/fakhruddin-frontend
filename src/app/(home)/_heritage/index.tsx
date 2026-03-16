"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const stats = [
  { value: 60, label: "Years of Building Legacy", suffix: "+" },
  { value: 10, label: "Projects in the UAE", suffix: "+" },
  { value: 10, label: "Projects across Africa", suffix: "+" },
  { value: 20, label: "Awards for Excellence", suffix: "+" },
];

export default function HeritageSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    // 1. Text Reveal Animation
    gsap.fromTo(
      textRefs.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Triggers when the top of the section hits 75% down the viewport
        },
      }
    );

    // 2. Number Counter Animation
    counterRefs.current.forEach((counter, index) => {
      if (!counter) return;

      const targetValue = stats[index].value;

      gsap.fromTo(
        counter,
        { innerHTML: "0" },
        {
          innerHTML: targetValue,
          duration: 2.5,
          ease: "power4.out",
          // Snap rounds the number so we don't see decimals while it counts
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
          onUpdate: function () {
            // Force the element to update its text content to the snapped value
            counter.innerHTML = Math.ceil(Number(this.targets()[0].innerHTML)).toString();
          },
        }
      );
    });

    // 3. Line separator animation
    gsap.fromTo(".stat-divider",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%"
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#F9F9F8] py-24 md:py-40 px-6 md:px-12 lg:px-24 flex flex-col gap-24"
    >
      {/* TOP: The Narrative */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between max-w-screen-2xl mx-auto w-full">
        {/* Left Side: Section Title */}
        <div className="w-full lg:w-1/3">
          <div className="overflow-hidden">
            <h2
              ref={(el) => { textRefs.current[0] = el; }}
              className="text-3xl md:text-5xl font-light text-[#1A1A1A] tracking-tight uppercase"
            >
              About <br /> Fakhruddin
            </h2>
          </div>
        </div>

        {/* Right Side: The Story */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <p
            ref={(el) => { textRefs.current[1] = el; }}
            className="text-xl md:text-3xl font-light text-[#1A1A1A] leading-relaxed"
          >
            Born from the enduring legacy of Fakhruddin Holdings, founded in 1963, Fakhruddin Properties carries forward a tradition rooted in entrepreneurship, integrity, and a deep sense of community.
          </p>

          <div className="flex flex-col md:flex-row gap-8 text-gray-500 text-sm md:text-base leading-relaxed">
            <p ref={(el) => { textRefs.current[2] = el; }} className="flex-1">
              What started as structures soon became stories of trust, of purpose, of homes that nurture as much as they impress. Every space we build is shaped by a belief that architecture should do more than occupy land; it should enhance life, foster connection, and leave the world a little better than it was found.
            </p>
            <p ref={(el) => { textRefs.current[3] = el; }} className="flex-1">
              Today, with a presence spanning the UAE, the UK, and Uganda, Fakhruddin Properties continues to evolve - guided by the same principles that began it all: innovation grounded in responsibility, sustainability shaped by soul, and design that places people at its heart.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM: The Stats Grid */}
      <div className="stats-grid max-w-screen-2xl mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-12">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <div className="stat-divider w-full h-[1px] bg-gray-300 origin-left mb-6" />
            <div className="flex items-end mb-4">
              <span
                ref={(el) => { counterRefs.current[index] = el; }}
                className="text-6xl md:text-8xl font-light text-[#1A1A1A] leading-none"
              >
                0
              </span>
              <span className="text-4xl md:text-5xl font-light text-[#1A1A1A] leading-none mb-1 md:mb-2 ml-1">
                {stat.suffix}
              </span>
            </div>
            <span className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}