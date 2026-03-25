"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Navigation Data
const navLinks = [
  {
    name: "Home Page",
    href: "/"
  },
  {
    name: "About Us",
    href: "/about-us"
  },
  {
    name: "Treppan Living",
    href: "/treppan-living"
  },
  {
    name: "WellTech",
    href: "/welltech"
  },
  {
    name: "Projects",
    subLinks: [
      {
        name: "Main",
        href: "/projects"
      },
      {
        name: "Treppan Serenique",
        href: "/projects/treppan-serenique"
      },
    ]
  },
  {
    name: "Communities",
    subLinks: [
      {
        name: "Main",
        href: "/communities"
      },
      { name: "Dubai Islands", href: "/communities/dubai-islands" },
    ]
  },
  {
    name: "Contact",
    href: "/contact"
  },
];

const socials = ["Youtube", "LinkedIn", "Instagram"];

// Premium easing curve
const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    // Cleanup timeout to prevent memory leaks
    let timeoutId: NodeJS.Timeout;
    if (!isOpen) {
      timeoutId = setTimeout(() => setOpenSubMenu(null), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  // THE FIX: The text/logo is ALWAYS white, unless the light menu overlay is open!
  const isLightText = !isOpen;

  return (
    <>
      {/* Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: luxuryEase }}
        className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 md:px-16 transition-all duration-700 ${scrolled && !isOpen
          ? "bg-black/20 backdrop-blur-xl py-4 md:py-4 border-b border-white/5"
          : "bg-transparent py-6 md:py-10"
          }`}
      >
        <Link href="/" onClick={() => setIsOpen(false)}>
          <img
            src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/FP-Logo-Light.png"
            className={`h-8 transition-all duration-500 ${isLightText ? "brightness-100" : "brightness-0"
              }`}
            alt="Fakhruddin Properties"
          />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-6 group z-[110] cursor-pointer outline-none"
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5 w-8 items-end">
            <span
              className={`h-[1.5px] transition-all duration-500 ${isLightText ? "bg-white" : "bg-[#0d1833]"
                } ${isOpen ? "-rotate-45 translate-y-[6px] w-8" : "w-8"
                }`}
            />
            <span
              className={`h-[1.5px] transition-all duration-500 ${isLightText ? "bg-white" : "bg-[#0d1833]"
                } ${isOpen ? "rotate-45 -translate-y-[1.5px] w-8" : "w-8"
                }`}
            />
          </div>
        </button>
      </motion.nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="fixed inset-0 z-[90] bg-[#fcfbfa] flex flex-col md:flex-row overflow-hidden px-6 md:px-20 pt-32 pb-12 overflow-y-auto md:overflow-hidden"
          >
            {/* Left Navigation Links */}
            <div className="flex flex-col justify-start md:justify-center w-full md:w-2/3 h-full">
              {navLinks.map((link, i) => {
                const hasSubLinks = !!link.subLinks;
                const isSubMenuOpen = openSubMenu === link.name;

                return (
                  <motion.div
                    key={link.name}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.8, ease: luxuryEase }}
                    className="w-full max-w-xl border-b border-[#0d1833]/10"
                  >
                    {/* Render either a button (for dropdowns) or a Link (for routing) */}
                    {hasSubLinks ? (
                      <button
                        onClick={() => setOpenSubMenu(isSubMenuOpen ? null : link.name)}
                        className="w-full flex items-center justify-between py-4 md:py-6 group text-left outline-none"
                      >
                        <h2 className={`font-marcellus text-3xl md:text-4xl transition-all duration-500 ${isSubMenuOpen ? "text-[#b69c6b] translate-x-2" : "text-[#0d1833]/80 group-hover:text-[#0d1833]"
                          }`}>
                          {link.name}
                        </h2>
                        <motion.svg
                          animate={{ rotate: isSubMenuOpen ? 90 : 0 }}
                          transition={{ duration: 0.5, ease: luxuryEase }}
                          className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-500 ${isSubMenuOpen ? "text-[#b69c6b]" : "text-[#0d1833]/30 group-hover:text-[#0d1833]"
                            }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {/* Horizontal Line */}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.2}
                            d="M12 5v14"
                            className="origin-center"
                          />
                          {/* Vertical Line - We animate this to hide or rotate */}
                          <motion.path
                            animate={{ opacity: isSubMenuOpen ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.2}
                            d="M5 12h14"
                          />
                        </motion.svg>
                      </button>
                    ) : (
                      <Link
                        href={link.href!}
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center justify-between py-2 md:py-4 group text-left outline-none"
                      >
                        <h2 className="font-marcellus text-3xl md:text-4xl text-[#0d1833]/80 group-hover:text-[#0d1833] transition-all duration-500">
                          {link.name}
                        </h2>
                      </Link>
                    )}

                    {/* Smooth Submenu Accordion */}
                    <AnimatePresence>
                      {isSubMenuOpen && hasSubLinks && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: luxuryEase }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pb-6 pl-4 md:pl-8 border-l border-[#b69c6b]/30 ml-2 md:ml-4 mt-2">
                            {link.subLinks?.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="font-sans text-sm md:text-lg text-[#0d1833]/80 hover:text-[#0d1833] transition-colors duration-300 flex items-center gap-3 group/sub"
                              >
                                <span className="w-0 h-[1px] bg-[#b69c6b] transition-all duration-300 group-hover/sub:w-4" />
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Contact/Info Area */}
            <div className="flex flex-col justify-between w-full md:w-1/3 mt-16 md:mt-0 md:pl-20 lg:border-l border-[#0d1833]/10 h-full py-8 md:py-28">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: luxuryEase }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[#b69c6b] font-bold font-sans">
                    Get in touch
                  </p>
                  <p className="text-lg md:text-xl text-[#0d1833]/70 font-serif leading-relaxed">
                    If in doubt. <br />
                    <span className="font-marcellus text-2xl md:text-3xl text-[#0d1833] block mt-2">Reach out.</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <a href="tel:8005253" className="block text-sm font-sans tracking-widest text-[#0d1833]/80 hover:text-[#b69c6b] transition-colors">
                    +971 800 5253
                  </a>
                  <a href="mailto:enquiry@fakhruddin.com" className="block text-sm font-sans tracking-widest text-[#0d1833]/80 hover:text-[#b69c6b] transition-colors break-all">
                    enquiry@fakhruddin.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex flex-wrap gap-8 mt-20 md:mt-0"
              >
                {socials.map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[10px] tracking-[0.3em] uppercase text-[#0d1833]/50 hover:text-[#0d1833] transition-all duration-300 relative group font-sans font-bold"
                  >
                    {social}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#b69c6b] transition-all duration-500 group-hover:w-full" />
                  </a>
                ))}
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}