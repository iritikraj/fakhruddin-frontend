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
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    featured: false,
  },
  {
    tag: "Blog",
    date: "Feb 12, 2026",
    title: "Where Homes Heal: UAE's First Longevity Living Community",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
];

/* ─── 3-D card wrapper ──────────────────────────────────────────────────── */
function Card3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 12;
    const rotX = -((y - cy) / cy) * 9;

    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    el.style.transition = "transform 0.08s linear";

    if (glowRef.current) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(157,126,68,0.15) 0%, transparent 60%)`;
    }

    if (shineRef.current) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      shineRef.current.style.background = `radial-gradient(ellipse at ${pctX}% ${pctY}%, rgba(255,255,255,0.28) 0%, transparent 55%)`;
      shineRef.current.style.opacity = "1";
    }
  }

  function onLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.65s cubic-bezier(0.34,1.56,0.64,1)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* ambient gold glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-20 rounded-xl transition-all duration-100"
      />
      {/* specular shine that follows cursor */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0 z-30 rounded-xl transition-opacity duration-200"
        style={{ opacity: 0 }}
      />
      {/* static diagonal gloss */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}

/* ─── Single Blog Card ───────────────────────────────────────────────────── */
function BlogCard({ blog }: { blog: typeof blogs[0] }) {
  return (
    <div className="blog-card group cursor-pointer flex flex-col h-full">
      <Card3D className="flex flex-col h-full">
        <div
          className="relative flex flex-col h-full rounded-xl overflow-hidden bg-white"
          style={{
            boxShadow:
              "0 25px 50px -10px rgba(0,0,0,0.18), 0 12px 28px -8px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.9) inset",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── Image ── */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EFECE8] flex-shrink-0">
            <img
              src={blog.img}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
            {/* vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.12)] pointer-events-none" />
            {/* tag pill */}
            <div className="absolute top-4 left-4">
              <span className="text-[9px] tracking-[0.35em] uppercase font-semibold bg-white/90 backdrop-blur-sm text-[#9D7E44] px-3 py-1.5 rounded-full shadow-sm">
                {blog.tag}
              </span>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="flex flex-col flex-1 gap-4 p-6 pb-7 bg-white">
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#1A1A1A]/40 font-semibold">
              {blog.date}
            </p>
            <h3 className="text-xl md:text-[1.35rem] leading-[1.25] font-marcellus text-[#1A1A1A] group-hover:text-[#9D7E44] transition-colors duration-500 flex-1">
              {blog.title}
            </h3>
            <div className="pt-3 border-t border-[#1A1A1A]/8">
              <span className="text-[9px] tracking-[0.35em] uppercase font-semibold text-[#1A1A1A]/35 group-hover:text-[#9D7E44] transition-colors duration-500 pb-0.5 border-b border-transparent group-hover:border-[#9D7E44]">
                Read Article
              </span>
            </div>
          </div>

          {/* bottom edge shadow for depth illusion */}
          <div
            className="absolute bottom-0 inset-x-0 h-1 rounded-b-xl pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.06))",
            }}
          />
        </div>
      </Card3D>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function Blogs() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".blog-header-line", {
        y: "120%",
        opacity: 0,
        rotate: 2,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".blog-trigger", start: "top 80%" },
      });

      gsap.from(".blog-card", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".blog-grid-trigger", start: "top 75%" },
      });

      gsap.from(".blog-divider", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".blog-trigger", start: "top 80%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#F9F8F6] text-[#1A1A1A] pb-32 pt-10 overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-20">

        {/* ── Header ── */}
        <div className="blog-trigger mb-20">
          <div className="h-[40vh] flex flex-col justify-end text-center px-10 pb-24">
            <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-4 font-marcellus">
              Blog
            </p>
            <h2 className="text-5xl md:text-6xl font-marcellus uppercase text-gray-900 leading-none">
              News &amp; Insights
            </h2>
          </div>
        </div>

        <div className="blog-divider w-full h-[1px] bg-[#1A1A1A]/10 mb-16 md:mb-24" />

        {/* ── 3-column equal grid ── */}
        <div
          className="blog-grid-trigger grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          style={{ perspective: "1200px" }}
        >
          {blogs.map((blog, i) => (
            <BlogCard key={i} blog={blog} />
          ))}
        </div>

      </div>
    </section>
  );
}