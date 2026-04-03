"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Navigation Data
const navLinks = [
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
        name: "Tréppan Serenique",
        href: "/projects/treppan-serenique"
      },
      {
        name: "Tréppan Tower",
        href: "/projects/treppan-tower"
      },
      {
        name: "Fakhruddin International",
        href: "/fakhruddin-international"
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
    name: "Channel Partner",
    href: "/partner-as-agent"
  },
  {
    name: "Blog",
    href: "/blog"
  },
  {
    name: "Contact",
    href: "/contact"
  },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/fakhruddin.properties" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/fakhruddinproperties" },
  { name: "Youtube", href: "https://www.youtube.com/channel/UCyCQdlRdu-s3RQRkfnW0NJg" },
];

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

    let timeoutId: NodeJS.Timeout;
    if (!isOpen) {
      timeoutId = setTimeout(() => setOpenSubMenu(null), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  // Logo is light when menu is closed, dark when menu is open (because overlay is light/white)
  const isLightText = !isOpen;

  // Split navLinks into two columns
  const midpoint = Math.ceil(navLinks.length / 2);
  const leftColumnLinks = navLinks.slice(0, midpoint);
  const rightColumnLinks = navLinks.slice(midpoint);

  return (
    <>
      {/* Header - Logo and Hamburger button ALWAYS visible */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: luxuryEase }}
        className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 md:px-16 transition-all duration-700 ${
          scrolled && !isOpen
            ? "bg-[#06191A]/20 backdrop-blur-xl py-4 md:py-4 border-b border-[#FFFFFF]/5"
            : "bg-transparent py-6 md:py-10"
        }`}
      >
        <Link href="/" onClick={() => setIsOpen(false)}>
          <img
            src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/FP-Logo-Light.png"
            className={`h-8 transition-all duration-500 ${
              isLightText ? "brightness-100" : "brightness-0"
            }`}
            alt="Fakhruddin Properties"
          />
        </Link>

        {/* Hamburger Button - Always visible, toggles menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-6 group z-[110] cursor-pointer outline-none"
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5 w-8 items-end">
            <span
              className={`h-[1.5px] transition-all duration-500 ${
                isLightText ? "bg-[#FFFFFF]" : "bg-[#06191A]"
              } ${
                isOpen ? "-rotate-45 translate-y-[6px] w-8" : "w-8"
              }`}
            />
            <span
              className={`h-[1.5px] transition-all duration-500 ${
                isLightText ? "bg-[#FFFFFF]" : "bg-[#06191A]"
              } ${
                isOpen ? "rotate-45 -translate-y-[1.5px] w-8" : "w-8"
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
            className="fixed inset-0 z-[90] bg-[#FFFFFF] flex flex-col md:flex-row overflow-hidden px-6 md:px-20 pt-32 pb-12 overflow-y-auto md:overflow-hidden"
          >
            {/* Left Navigation Links - TWO COLUMNS */}
            <div className="flex flex-col md:flex-row gap-x-12 w-full md:w-2/3 h-full py-0 md:py-20 px-0 md:px-12">
              {/* Column 1 */}
              <div className="flex flex-col w-full md:w-1/2">
                {leftColumnLinks.map((link, i) => {
                  const hasSubLinks = !!link.subLinks;
                  const isSubMenuOpen = openSubMenu === link.name;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.8, ease: luxuryEase }}
                      className="w-full border-b border-[#A1997F]/10"
                    >
                      {hasSubLinks ? (
                        <button
                          onClick={() => setOpenSubMenu(isSubMenuOpen ? null : link.name)}
                          className="w-full flex items-center justify-between py-4 md:py-5 group text-left outline-none"
                        >
                          <h2 className={`text-2xl md:text-3xl transition-all duration-500 ${
                            isSubMenuOpen ? "text-[#A1997F] translate-x-2" : "text-[#06191A]/80 group-hover:text-[#06191A]"
                          }`}>
                            {link.name}
                          </h2>
                          <motion.svg
                            animate={{ rotate: isSubMenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.5, ease: luxuryEase }}
                            className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-500 ${
                              isSubMenuOpen ? "text-[#A1997F]" : "text-[#06191A]/30 group-hover:text-[#06191A]"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.2}
                              d="M12 5v14"
                              className="origin-center"
                            />
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
                          className="w-full flex items-center justify-between py-4 md:py-5 group text-left outline-none"
                        >
                          <h2 className="text-2xl md:text-3xl text-[#06191A]/80 group-hover:text-[#06191A] transition-all duration-500">
                            {link.name}
                          </h2>
                        </Link>
                      )}

                      <AnimatePresence>
                        {isSubMenuOpen && hasSubLinks && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: luxuryEase }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 pb-6 pl-4 border-l border-[#A1997F]/30 ml-2 mt-1">
                              {link.subLinks?.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="font-seitu text-sm md:text-base text-[#06191A]/70 hover:text-[#408174] transition-colors duration-300 flex items-center gap-3 group/sub"
                                >
                                  <span className="w-0 h-[1px] bg-[#A1997F] transition-all duration-300 group-hover/sub:w-4" />
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

              {/* Column 2 */}
              <div className="flex flex-col w-full md:w-1/2">
                {rightColumnLinks.map((link, i) => {
                  const hasSubLinks = !!link.subLinks;
                  const isSubMenuOpen = openSubMenu === link.name;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + (leftColumnLinks.length + i) * 0.05, duration: 0.8, ease: luxuryEase }}
                      className="w-full border-b border-[#A1997F]/10"
                    >
                      {hasSubLinks ? (
                        <button
                          onClick={() => setOpenSubMenu(isSubMenuOpen ? null : link.name)}
                          className="w-full flex items-center justify-between py-4 md:py-5 group text-left outline-none"
                        >
                          <h2 className={`text-2xl md:text-3xl transition-all duration-500 ${
                            isSubMenuOpen ? "text-[#A1997F] translate-x-2" : "text-[#06191A]/80 group-hover:text-[#06191A]"
                          }`}>
                            {link.name}
                          </h2>
                          <motion.svg
                            animate={{ rotate: isSubMenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.5, ease: luxuryEase }}
                            className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-500 ${
                              isSubMenuOpen ? "text-[#A1997F]" : "text-[#06191A]/30 group-hover:text-[#06191A]"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.2}
                              d="M12 5v14"
                              className="origin-center"
                            />
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
                          className="w-full flex items-center justify-between py-4 md:py-5 group text-left outline-none"
                        >
                          <h2 className="text-2xl md:text-3xl text-[#06191A]/80 group-hover:text-[#06191A] transition-all duration-500">
                            {link.name}
                          </h2>
                        </Link>
                      )}

                      <AnimatePresence>
                        {isSubMenuOpen && hasSubLinks && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: luxuryEase }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 pb-6 pl-4 border-l border-[#A1997F]/30 ml-2 mt-1">
                              {link.subLinks?.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="font-seitu text-sm md:text-base text-[#06191A]/70 hover:text-[#408174] transition-colors duration-300 flex items-center gap-3 group/sub"
                                >
                                  <span className="w-0 h-[1px] bg-[#A1997F] transition-all duration-300 group-hover/sub:w-4" />
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
            </div>

            {/* Right Contact/Info Area */}
            <div className="flex flex-col justify-between w-full md:w-1/3 mt-16 md:mt-0 md:pl-12 lg:border-l border-[#A1997F]/20 h-full py-8 md:py-20">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: luxuryEase }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <p className="font-seitu text-[10px] tracking-[0.4em] uppercase text-[#A1997F] font-bold">
                    Get in touch
                  </p>
                  <p className="font-seitu text-lg md:text-xl text-[#06191A]/70 leading-relaxed">
                    If in doubt. <br />
                    <span className="text-2xl md:text-3xl text-[#06191A] block mt-2">Reach out.</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <a href="tel:8005253" className="block text-sm font-seitu tracking-widest text-[#06191A]/70 hover:text-[#A1997F] transition-colors">
                    +971 800 5253
                  </a>
                  <a href="mailto:enquiry@fakhruddinproperties.com" className="block text-sm font-seitu tracking-widest text-[#06191A]/70 hover:text-[#A1997F] transition-colors break-all">
                    enquiry@fakhruddinproperties.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex flex-wrap gap-8 mt-16 md:mt-0"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.3em] uppercase text-[#06191A]/50 hover:text-[#408174] transition-all duration-300 relative group font-seitu font-bold"
                  >
                    {social.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#A1997F] transition-all duration-500 group-hover:w-full" />
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