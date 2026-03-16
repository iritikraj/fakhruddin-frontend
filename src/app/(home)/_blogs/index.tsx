"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const blogs = [
  {
    tag: "Insight",
    date: "Mar 02, 2026",
    title: "Longevity Real Estate: The Next Big Asset Class Arrives in the UAE",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    featured: true,
  },
  {
    tag: "Blog",
    date: "Feb 24, 2026",
    title: "Inside a Home That Elevates How You Live, Breathe, Sleep, and Recover",
    img: "https://images.unsplash.com/photo-1613490908653-54cdb25d4af5?q=80&w=1974&auto=format&fit=crop",
    featured: false,
  },
  {
    tag: "Blog",
    date: "Feb 12, 2026",
    title: "Where Homes Heal: UAE’s First Longevity Living Community",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
];

export default function Blogs() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Header Reveal
    gsap.from(".blog-header-line", {
      y: "120%",
      opacity: 0,
      rotate: 2,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".blog-trigger",
        start: "top 80%",
      },
    });

    // 2. Asymmetrical Cards Reveal
    gsap.from(".blog-card", {
      y: 80,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".blog-grid-trigger",
        start: "top 75%",
      },
    });

    // 3. Divider Line Draw
    gsap.from(".blog-divider", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".blog-trigger",
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#F9F8F6] text-[#1A1A1A] py-32 md:py-48 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-8 md:px-20">

        {/* --- Header Section --- */}
        <div className="blog-trigger flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">

          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-12 h-[1px] bg-[#9D7E44]"></div>
              <p className="text-[9px] tracking-[0.5em] uppercase text-[#9D7E44] font-bold">
                The Journal
              </p>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl tracking-tighter leading-[1.1]">
              <div className="overflow-hidden pb-2">
                <div className="blog-header-line">Blogs &</div>
              </div>
              <div className="overflow-hidden pb-2">
                <div className="blog-header-line italic text-[#9D7E44]">Insights.</div>
              </div>
            </h2>
          </div>

          {/* View All Button */}
          <div className="overflow-hidden pb-4">
            <button className="blog-header-line group relative inline-flex items-center gap-6 text-[10px] tracking-[0.4em] uppercase text-[#1A1A1A] font-medium">
              <span className="relative z-10 group-hover:text-[#9D7E44] transition-colors duration-500">
                View All Articles
              </span>
              <div className="relative w-16 h-[1px] bg-[#1A1A1A]/20 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-full bg-[#9D7E44] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              </div>
            </button>
          </div>

        </div>

        <div className="blog-divider w-full h-[1px] bg-[#1A1A1A]/10 mb-16 md:mb-24" />

        {/* --- Asymmetrical Editorial Grid --- */}
        <div className="blog-grid-trigger grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* FEATURED POST (Takes up 7 columns) */}
          <div className="blog-card lg:col-span-7 group cursor-pointer flex flex-col gap-8">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-[#EFECE8]">
              <img
                src={blogs[0].img}
                alt={blogs[0].title}
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] pointer-events-none" />
            </div>

            <div className="flex flex-col gap-6 pr-8">
              <div className="flex gap-6 text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]/50 font-semibold">
                <span className="text-[#9D7E44]">{blogs[0].tag}</span>
                <span>{blogs[0].date}</span>
              </div>
              <h3 className="font-serif text-3xl md:text-5xl leading-[1.15] text-[#1A1A1A] group-hover:text-[#9D7E44] transition-colors duration-500">
                {blogs[0].title}
              </h3>
            </div>
          </div>

          {/* SECONDARY POSTS (Stacked in 5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-16 md:gap-20 lg:pt-24">

            {blogs.slice(1).map((blog, i) => (
              <div key={i} className="blog-card group cursor-pointer flex flex-col gap-6">

                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-[#EFECE8]">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-6 text-[9px] tracking-[0.3em] uppercase text-[#1A1A1A]/50 font-semibold">
                    <span className="text-[#9D7E44]">{blog.tag}</span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl leading-[1.2] text-[#1A1A1A] group-hover:text-[#9D7E44] transition-colors duration-500">
                    {blog.title}
                  </h3>
                </div>

                <div className="mt-2">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#1A1A1A]/40 group-hover:text-[#1A1A1A] transition-colors duration-500 border-b border-[#1A1A1A]/20 pb-1 group-hover:border-[#9D7E44]">
                    Read Article
                  </span>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}