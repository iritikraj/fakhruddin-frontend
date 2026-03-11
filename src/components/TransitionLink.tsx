"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import gsap from "gsap";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const TransitionLink = ({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  const handleTransition = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault(); // Stop instant navigation

    const curtain = document.getElementById("global-curtain");
    const curtainText = document.getElementById("global-curtain-text");

    if (!curtain || !curtainText) {
      return router.push(href); // Fallback if elements are missing
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Only push the new route AFTER the curtain covers the screen
        router.push(href);
      },
    });

    // Animate Curtain IN
    tl.set(curtain, { transformOrigin: "bottom" }) // Anchor to bottom so it grows upwards
      .to(curtain, {
        scaleY: 1,
        duration: 1,
        ease: "expo.inOut",
      })
      .to(
        curtainText,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4" // Start text fade slightly before the curtain finishes closing
      );
  };

  return (
    <Link
      href={href}
      onClick={handleTransition}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};