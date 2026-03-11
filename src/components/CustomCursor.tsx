"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // gsap.quickTo is optimized for values that update constantly (like mouse tracking)
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Look for the closest element with a data-cursor attribute
      const cursorElement = target.closest('[data-cursor]');

      if (cursorElement) {
        setIsHovering(true);
        setCursorText(cursorElement.getAttribute("data-cursor") || "Explore");
      } else if (target.closest('a') || target.closest('button')) {
        // Default hover state for standard links/buttons without specific text
        setIsHovering(true);
        setCursorText("");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Animate the cursor size, text appearance, and image swap when hover state changes
  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    if (isHovering) {
      // HOVER STATE (Expanded Circle with Text/Action)
      gsap.to(cursor, {
        width: cursorText ? 80 : 40,
        height: cursorText ? 80 : 40,
        backgroundColor: cursorText ? "rgba(255, 255, 255, 0.9)" : "rgba(26, 26, 26, 0.1)",
        backgroundImage: "none", // Remove the icon when expanded
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255,255,255,0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(text, { opacity: 1, scale: 1, duration: 0.2, delay: 0.1 });
    } else {
      // NORMAL STATE (The Custom PNG Icon)
      gsap.to(cursor, {
        width: 32, // Adjusted size so the icon is visible (change if needed)
        height: 32,
        backgroundColor: "transparent",
        backgroundImage: "url('/cursor-icon.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backdropFilter: "none",
        border: "none",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.2 });
    }
  }, [isHovering, cursorText]);

  // Hide on mobile/touch devices entirely
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      // Note: If you want the icon to show its TRUE colors, remove "mix-blend-difference" from the class below. 
      // If left on, it will invert the colors of your PNG depending on the background.
      className="fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full pointer-events-none mix-blend-difference"
      style={{
        width: "32px",
        height: "32px",
        backgroundColor: "transparent",
        backgroundImage: "url('/cursor-icon.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <span
        ref={textRef}
        className="text-[10px] uppercase tracking-widest font-medium text-[#1A1A1A] opacity-0 scale-50 pointer-events-none"
      >
        {cursorText}
      </span>
    </div>
  );
}