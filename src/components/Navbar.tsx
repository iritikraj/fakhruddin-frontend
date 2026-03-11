"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home Page", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Treppan-Living-PRIVE-GeneralView.webp" },
  { name: "About Us", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Podium-Aerial-Shot-Evening-Shot_10.webp" },
  { name: "Treppan Living", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Copy-of-3BHK-Living-Area.webp" },
  { name: "Projects", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Treppan-Living-PRIVE-GeneralView.webp" },
  { name: "Communities", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Podium-Aerial-Shot-Evening-Shot_10.webp" },
  { name: "Partner", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Copy-of-3BHK-Living-Area.webp" },
  { name: "Media Center", img: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Podium-Aerial-Shot-Evening-Shot_10.webp" },
];

const socials = ["Youtube", "LinkedIn", "Instagram"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState(navLinks[0].img);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 md:px-12 py-6 transition-all duration-700 ${scrolled && !isOpen ? "bg-black/20 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent"
          }`}
      >
        <img
          src={`https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/FP-Logo-Light.png`}
          className={`h-8 brightness-0 ${scrolled ? "brightness-100 mix-blend-difference" : "mix-blend-normal"}`}
          alt="Logo"
        />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-6 group z-[110] text-white mix-blend-difference cursor-pointer"
        >
          <div className="flex flex-col gap-[6px] w-8 items-end">
            <span className={`h-[1px] ${scrolled ? "bg-white" : "bg-black"} transition-all duration-500 ${isOpen ? "-rotate-45 translate-y-2 w-8" : "w-8"}`} />
            <span className={`h-[1px] ${scrolled ? "bg-white" : "bg-black"} transition-all duration-500 ${isOpen ? "rotate-45 -translate-y-[1px] w-8" : "w-5 group-hover:w-8"}`} />
          </div>
        </button>
      </motion.nav>

      {/* CRITICAL FIX: Wrapping AnimatePresence in a stable DOM element. 
        This prevents the 'insertBefore' crash when Next.js tries to mount/unmount 
        the overlay from inside a React Fragment.
      */}
      <div className="relative z-[90]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu-overlay"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(100% 0 0 0)" }}
              transition={{ duration: 1.2, ease: "easeIn" }}
              className="fixed inset-0 bg-[#080808] flex flex-col md:flex-row overflow-hidden"
            >
              {/* Background Image Morphing */}
              <div className="absolute inset-0 z-0 opacity-20 transition-all duration-1000 ease-out">
                {/* Removed mode="wait" to allow smooth crossfading without DOM queuing errors */}
                <AnimatePresence>
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.5]"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/20 to-transparent z-10" />
              </div>

              <div className="relative z-20 flex flex-col md:flex-row w-full h-full px-8 md:px-20 py-32">
                {/* Left: Navigation */}
                <div className="flex flex-col justify-center w-full md:w-2/3">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={`nav-link-${i}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.8 }}
                      onMouseEnter={() => setActiveImage(link.img)}
                      className="group py-2 md:py-3 cursor-pointer w-max"
                    >
                      <a href="#" className="flex items-center gap-6">
                        <span className="text-[10px] font-light text-white/20 group-hover:text-yellow-600 transition-colors duration-500">
                          0{i + 1}
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/90 group-hover:text-white group-hover:italic group-hover:translate-x-4 transition-all duration-700">
                          {link.name}
                        </h2>
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Right: Editorial Content */}
                <div className="flex flex-col justify-between w-full md:w-1/3 mt-16 md:mt-0 md:pl-20 md:border-l border-white/5">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <p className="text-[8px] tracking-[0.6em] uppercase text-yellow-600/60 font-medium">Inquiry</p>
                      <p className="text-sm md:text-md text-white/80 font-light tracking-wide leading-relaxed">
                        If in doubt. <br />
                        <span className="font-serif text-2xl text-white">reach out.</span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[11px] text-white/60 font-light">+91 1234567890</p>
                      <p className="text-[11px] text-white/60 font-light break-all">contact@fakhruddinproperties.com</p>
                    </div>
                  </motion.div>

                  {/* Socials */}
                  <div className="flex gap-8 mt-12 md:mt-0">
                    {socials.map((social, i) => (
                      <a
                        key={`social-${i}`}
                        href="#"
                        className="text-[9px] tracking-[0.4em] uppercase text-white/30 hover:text-yellow-600 transition-all duration-300 relative group"
                      >
                        {social}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-yellow-600 transition-all duration-500 group-hover:w-full" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}