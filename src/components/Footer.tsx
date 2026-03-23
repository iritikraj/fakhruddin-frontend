"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const footerLinks = [
  { category: "Portfolio", items: ["Treppan Living Prive", "Treppan Serenique", "Treppan Tower", "Mamoon Gardens"] },
  { category: "Company", items: ["Our Vision", "Communities", "Insights", "Contact"] },
  { category: "Legal", items: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
];

export default function Footer() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  // Parallax effect for the massive brand text
  const y = useTransform(scrollYProgress, [0.7, 1], [100, 0]); // Only starts moving at the end of scroll
  const opacity = useTransform(scrollYProgress, [0.7, 1], [0, 0.07]); // Increased max opacity slightly

  return (
    <footer
      ref={container}
      className="relative bg-[#050505]/10 text-[#e5e5e5] pt-40 pb-12 px-6 md:px-20 overflow-hidden"
    >
      {/* 1. The Call to Experience (Editorial CTA) */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-end border-b border-white/5 pb-32">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-[10px] tracking-[0.6em] uppercase text-yellow-600/60 mb-8 font-medium font-marcellus">
              Experience the Extraordinary
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight font-marcellus">
              Your legacy begins <br />
              <span className="text-white not-italic opacity-90">in Dubai</span>
            </h2>
          </motion.div>

          <div className="flex gap-12 pt-4">
            <button className="group relative text-[11px] tracking-[0.4em] uppercase py-4 px-10 border border-white/10 hover:border-yellow-600/50 transition-all duration-700 overflow-hidden">
              <span className="relative z-10 font-marcellus">Request Brochure</span>
              <div className="absolute inset-0 bg-yellow-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </button>
          </div>
        </div>

        {/* 2. Kinetic Contact Section */}
        <div className="flex flex-col items-start lg:items-end gap-16">
          <div className="text-left lg:text-right space-y-4">
            <p className="text-[9px] tracking-[0.6em] uppercase text-white/60">The Concierge</p>
            <a href="tel:8003253" className="block text-5xl md:text-6xl tracking-widest hover:text-yellow-600 transition-all duration-700 font-marcellus">
              800 3253
            </a>
            <p className="text-xs tracking-[0.2em] text-white/40 font-light">
              Available 24/7 for private consultations.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Boutique Link Grid */}
      <div className="max-w-[1400px] mx-auto py-24 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2 space-y-8">
          <div className="relative w-[160px] h-[40px]">
            <Image
              src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/FP-Logo-Dark.png"
              alt="Fakhruddin Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[11px] leading-[2] text-white/30 max-w-[280px] font-light tracking-wide">
            Crafting sanctuary since 2003. A philosophy of quiet luxury and architectural permanence.
          </p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.category} className="space-y-8">
            <h5 className="text-[9px] tracking-[0.5em] uppercase text-white/20 font-bold">{section.category}</h5>
            <ul className="space-y-4">
              {section.items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-[12px] text-white/50 hover:text-yellow-600 transition-all duration-500 block font-light tracking-tight hover:italic hover:translate-x-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 4. The Monumental Branding (Parallax) */}
      <div className="relative h-[25vh] md:h-[40vh] flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          // style={{ y, opacity }}
          className="relative w-[70vw] max-w-[900px] h-[120px] md:h-[180px] lg:h-[220px]"
        >
          <Image
            src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/FP-Logo-Dark.png"
            alt="Fakhruddin Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Optional: Add a subtle glow behind the text to make it "pop" from the black */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 0.15]) }}
          className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 to-transparent blur-3xl"
        />
      </div>

      {/* 5. Minimalist Sub-Footer */}
      <div className="max-w-[1400px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-12 text-[8px] tracking-[0.5em] uppercase text-white/20">
          <p>© 2026</p>
          <p>Dubai, United Arab Emirates</p>
        </div>

        <div className="flex gap-12">
          {["Instagram", "LinkedIn", "Youtube"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[9px] tracking-[0.5em] uppercase text-white/30 hover:text-yellow-600 transition-all duration-500 relative group"
            >
              {social}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-yellow-600 transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}