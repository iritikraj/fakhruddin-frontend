"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";

export default function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const curtain = document.getElementById("global-curtain");
    const curtainText = document.getElementById("global-curtain-text");

    if (!curtain || !curtainText) return;

    // When the pathname changes (meaning the new page has loaded), animate the curtain OUT
    const tl = gsap.timeline();

    tl.to(curtainText, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
    })
      .set(curtain, { transformOrigin: "top" }) // Anchor to the top so it slides up and away
      .to(curtain, {
        scaleY: 0,
        duration: 1,
        ease: "expo.inOut",
      });
  }, [pathname]); // Re-runs every time the route changes

  return (
    <div
      id="global-curtain"
      className="fixed inset-0 z-[99999] bg-[#1A1A1A] flex items-center justify-center pointer-events-none"
      style={{ transform: "scaleY(0)", transformOrigin: "bottom" }}
    >
      <span
        id="global-curtain-text"
        className="text-[#F9F9F8] text-xs md:text-sm tracking-[0.4em] uppercase font-medium opacity-0 translate-y-4"
      >
        Fakhruddin Properties
      </span>
    </div>
  );
}