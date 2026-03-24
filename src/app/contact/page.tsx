'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const OFFICES = [
  {
    id: 1,
    city: "Dubai",
    region: "United Arab Emirates",
    address: "HC Floor, Lake Central Tower<br/>Al Marasi Drive, Business Bay<br/>P.O. Box. 191327",
    image: "/port-2.webp",
    color: "bg-[#0b1320]"
  },
  {
    id: 2,
    city: "London",
    region: "United Kingdom",
    address: "Premium Office Location<br/>Heart of the City<br/>London, UK",
    image: "/building-xxl.webp",
    color: "bg-[#132035]"
  },
  {
    id: 3,
    city: "Kampala",
    region: "Uganda",
    address: "Forest Mall, Block-B<br/>Ground Floor, Office No GF-05<br/>Kampala, Uganda",
    image: "port-1.webp",
    color: "bg-[#1c2e4a]"
  }
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hero Parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    // Wrap GSAP in a context for easy cleanup
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".office-slide");

      // The main pinning timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${sections.length * 100}%`,
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      sections.forEach((sec: any, i: number) => {
        if (i === 0) return; // First slide is already visible

        const left = sec.querySelector(".left-part");
        const right = sec.querySelector(".right-part");
        const img = sec.querySelector(".bg-img");

        // Set initial clip-path states for the "Scissor Wipe"
        // Left (Image) starts clipped to the bottom
        gsap.set(left, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
        // Right (Text) starts clipped to the top
        gsap.set(right, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });

        // Animate them opening up to full view simultaneously
        tl.to(left, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" }, `slide${i}`)
          .to(right, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" }, `slide${i}`)
          // Add a subtle un-zoom to the image for that premium architectural feel
          .fromTo(img, { scale: 1.2 }, { scale: 1, ease: "none" }, `slide${i}`);
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#f0eae1] min-h-screen selection:bg-[#b69c6b] selection:text-black">

        {/* 1. CINEMATIC HERO SECTION */}
        <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#050505]">

          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 z-10 opacity-10 bg-[url('https://api-eih.solvetude.com/uploads/dark_matter_90673ed870.png')] pointer-events-none" />

          {/* Background Parallax Image */}
          <motion.div style={{ y: heroY }} className="absolute inset-[-10%] w-[120%] h-[120%] opacity-60">
            <Image
              src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/tree-grass-architecture-house-perspective-building-1099275-pxhere.com@2x.jpg" // High quality architectural reference
              alt="Fakhruddin Architecture"
              fill
              className="object-cover"
              priority
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#f0eae1]/10" /> */}
          </motion.div>

          <div className="relative z-20 flex flex-col items-center text-center px-6 mt-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: luxuryEase }}
              className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#b69c6b] font-bold mb-6 font-sans"
            >
              Contact Us
            </motion.span>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: luxuryEase, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-[7rem] text-white font-marcellus leading-none drop-shadow-xl"
              >
                Discover
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: luxuryEase, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-[7rem] text-white font-marcellus leading-none drop-shadow-xl"
              >
                Our World.
              </motion.h1>
            </div>
          </div>
        </section>

        {/* 2. VISION / INTRO DESCRIPTION */}
        <section className="py-24 md:py-40 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: luxuryEase }}
            className="max-w-4xl mx-auto text-2xl md:text-4xl lg:text-[42px] font-marcellus text-[#0d1833] leading-[1.4] md:leading-[1.6]"
          >
            <span className="text-[#b69c6b]">Let’s build something lasting, together.</span>
          </motion.p>
        </section>

        {/* 3. GSAP "SCISSOR WIPE" OFFICE CARDS */}
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
          {OFFICES.map((office, index) => (
            <div
              key={office.id}
              className="office-slide absolute inset-0 w-full h-full flex flex-col md:flex-row"
              style={{ zIndex: index }} // Use inline styles for dynamic z-index
            >
              {/* LEFT PART: IMAGE */}
              <div className="left-part relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden border-r border-black/5">
                <Image
                  src={office.image}
                  alt={office.city}
                  fill
                  className="bg-img object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* RIGHT PART: TEXT */}
              <div className={`right-part w-full md:w-1/2 h-1/2 md:h-full ${office.color} p-8 md:p-20 flex flex-col justify-center`}>
                <div className="max-w-xl mx-auto md:mx-0">
                  <span className="text-[#b69c6b] text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold mb-4 md:mb-6 block font-sans">
                    {office.region}
                  </span>
                  <h2 className="text-5xl md:text-8xl font-marcellus text-white mb-6 md:mb-8 tracking-tighter">
                    {office.city}
                  </h2>
                  <p
                    className="text-white/60 text-base md:text-lg leading-[1.8] mb-10 md:mb-12 font-serif"
                    dangerouslySetInnerHTML={{ __html: office.address }}
                  />
                  <button className="group flex items-center gap-4 text-white tracking-widest text-[10px] md:text-xs uppercase font-sans">
                    <span className="w-8 h-[1px] bg-[#b69c6b] group-hover:w-16 transition-all duration-500 ease-out"></span>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 4. SAY HELLO & CONTACT FORM */}
        <section className="text-black py-32 md:py-48 px-6 md:px-12 relative overflow-hidden">

          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#b69c6b]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 relative z-10">

            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: luxuryEase }}
              className="flex flex-col justify-center"
            >
              <span className="text-[#b69c6b] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold mb-6">
                Say Hello!
              </span>
              <h2 className="text-5xl md:text-7xl font-marcellus mb-8">
                Contact Us.
              </h2>
              <p className="text-black/60 font-serif text-lg md:text-xl leading-relaxed mb-16 max-w-md">
                We’re here to answer any question you may have. Reach out to our headquarters directly.
              </p>

              <div className="space-y-12">
                <div>
                  <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 mb-3 font-bold font-sans">Headquarters</h4>
                  <p className="font-marcellus text-xl md:text-2xl leading-relaxed text-black/90">
                    HC Floor, Lake Central Tower<br />
                    Al Marasi Drive, Business Bay<br />
                    P.O. Box. 191327<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group">
                    <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 mb-3 font-bold font-sans">Phone</h4>
                    <a href="tel:8005253" className="font-marcellus text-2xl hover:text-[#b69c6b] transition-colors duration-300">
                      800 5253
                    </a>
                  </div>
                  <div className="group">
                    <h4 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 mb-3 font-bold font-sans">Email</h4>
                    <a href="mailto:enquiry@fakhruddinproperties.com" className="font-marcellus text-lg md:text-xl hover:text-[#b69c6b] transition-colors duration-300 break-all">
                      enquiry@fakhruddin.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Form Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: luxuryEase, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <form className="w-full flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Custom Input Wrapper with animated underline */}
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="First Name *"
                      className="w-full bg-transparent border-b border-black/20 pb-4 text-xl font-marcellus placeholder:text-black/30 focus:outline-none transition-colors"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b69c6b] transition-all duration-500 ease-out group-focus-within:w-full" />
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Last Name *"
                      className="w-full bg-transparent border-b border-black/20 pb-4 text-xl font-marcellus placeholder:text-black/30 focus:outline-none transition-colors"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b69c6b] transition-all duration-500 ease-out group-focus-within:w-full" />
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="w-full bg-transparent border-b border-black/20 pb-4 text-xl font-marcellus placeholder:text-black/30 focus:outline-none transition-colors"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b69c6b] transition-all duration-500 ease-out group-focus-within:w-full" />
                </div>

                <div className="relative group">
                  <select className="w-full bg-transparent border-b border-black/20 pb-4 text-xl font-marcellus text-black/30 focus:text-black focus:outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected hidden>Topic of Inquiry *</option>
                    <option className="bg-[#0b1320] text-black">Investment Opportunities</option>
                    <option className="bg-[#0b1320] text-black">Schedule a Tour</option>
                    <option className="bg-[#0b1320] text-black">Partnerships</option>
                    <option className="bg-[#0b1320] text-black">Other</option>
                  </select>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b69c6b] transition-all duration-500 ease-out group-focus-within:w-full" />

                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#b69c6b]">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    placeholder="Your Message..."
                    rows={4}
                    className="w-full bg-transparent border-b border-black/20 pb-4 text-xl font-marcellus placeholder:text-black/30 focus:outline-none resize-none"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b69c6b] transition-all duration-500 ease-out group-focus-within:w-full" />
                </div>

                <div className="pt-8">
                  <button className="relative overflow-hidden w-full md:w-auto px-16 py-5 border border-black/30 text-black text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase group transition-colors duration-500 hover:border-[#b69c6b]">
                    <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-500">Send Message</span>
                    <div className="absolute inset-0 bg-[#b69c6b] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
                  </button>
                </div>

              </form>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}