// "use client";

// import React, { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger, useGSAP);
// }

// export default function PremiumHero() {
//   const containerRef = useRef(null);
//   const textRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const flowerRef = useRef(null);
//   const archRef = useRef(null);
//   const buildingRef = useRef(null);
//   const scrollHintRef = useRef(null);

//   useGSAP(() => {
//     // --- 1. INITIAL LOAD REVEAL (The Cinematic Intro) ---
//     const introTl = gsap.timeline({ defaults: { ease: "expo.out" } });

//     // 1. Fade in the video with a subtle scale down (Ken Burns effect)
//     introTl.fromTo(
//       flowerRef.current,
//       { opacity: 0, scale: 1.1 },
//       { opacity: 1, scale: 1, duration: 3 }
//     )
//       // 2. Bring up the arch with a heavy, smooth ease
//       .fromTo(
//         archRef.current,
//         { y: "100%" },
//         { y: "0%", duration: 2.5, ease: "power4.out" },
//         "-=2.5"
//       )
//       // 3. Subtle scale effect on the building image as the arch rises
//       .fromTo(
//         buildingRef.current,
//         { scale: 1.15 },
//         { scale: 1, duration: 2.5, ease: "power3.out" },
//         "-=2.5"
//       )
//       // 4. Reveal Subtitle (Masked slide up)
//       .fromTo(
//         subtitleRef.current,
//         { y: 20, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
//         "-=1.5"
//       )
//       // 5. Reveal Main Text (Masked slide up)
//       .fromTo(
//         textRef.current,
//         { y: 50, opacity: 0, filter: "blur(4px)" },
//         { y: 0, opacity: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" },
//         "-=1.3"
//       )
//       // 6. Fade in scroll indicator
//       .fromTo(
//         scrollHintRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 1 },
//         "-=1"
//       );

//     // --- 2. SCROLL SEQUENCE ---
//     const scrollTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top top",
//         end: "+=350%",
//         scrub: 1.5, // Increased scrub slightly for smoother, "heavier" friction
//         pin: true,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
//       }
//     });

//     // Phase 1: Expand the arch, scale the building slightly to counter the expansion
//     scrollTl
//       .to(archRef.current, {
//         width: "100vw",
//         height: "100vh",
//         borderRadius: "0px",
//         ease: "power2.inOut",
//         duration: 1.5 // Lengthened slightly for drama
//       }, 0)
//       .to(buildingRef.current, {
//         scale: 1.05, // Slight zoom as the arch opens
//         ease: "power2.inOut",
//         duration: 1.5
//       }, 0)
//       // Fade out Text & Scroll Hint as soon as scrolling starts
//       .to([textRef.current, subtitleRef.current, scrollHintRef.current], {
//         opacity: 0,
//         y: -30, // Drift upwards as they fade
//         duration: 0.5,
//         ease: "power2.in"
//       }, 0)
//       // Fade out flower video
//       .to(flowerRef.current, {
//         opacity: 0,
//         duration: 0.3,
//       }, 1)

//       // Phase 2: The Vertical Pan (Image scrolls up)
//       .to(buildingRef.current, {
//         y: () => {
//           const img: any = buildingRef.current;
//           if (!img || !img.naturalWidth) return "-65%";
//           const expandedHeight = (img.naturalHeight / img.naturalWidth) * window.innerWidth;
//           return window.innerHeight - expandedHeight;
//         },
//         ease: "none",
//         duration: 2.5
//       }, 1.5);

//   }, { scope: containerRef });

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full h-screen overflow-hidden bg-[#F9F9F8] flex items-center justify-center"
//     >
//       {/* Subtle vignette/gradient overlay to make text pop and add mood */}
//       <div className="absolute inset-0 z-15 bg-gradient-to-b from-black/5 via-transparent to-white/20 pointer-events-none" />

//       {/* Z-INDEX 10: Background Flower Video */}
//       <div ref={flowerRef} className="absolute z-10 w-[80vw] md:w-[60vw]">
//         <video
//           src="/background.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-full h-auto object-cover opacity-80 mix-blend-multiply"
//         />
//       </div>

//       {/* Z-INDEX 20: Foreground Typography */}
//       <div className="absolute z-20 w-full flex flex-col items-center justify-center pointer-events-none top-[15%] md:top-[20%]">
//         <div className="overflow-hidden mb-4">
//           <p
//             ref={subtitleRef}
//             className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 font-medium"
//           >
//             A Legacy of Excellence
//           </p>
//         </div>
//         <div className="overflow-hidden py-2">
//           <h1
//             ref={textRef}
//             className="text-5xl md:text-8xl lg:text-[8vw] font-light tracking-[0.1em] text-[#1A1A1A] leading-none uppercase"
//           >
//             FAKHRUDDIN
//           </h1>
//         </div>
//       </div>

//       {/* Z-INDEX 25: Scroll Hint Indicator */}
//       <div
//         ref={scrollHintRef}
//         className="absolute z-25 bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
//       >
//         <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium">Scroll to explore</span>
//         <div className="w-[1px] h-12 bg-gray-300 relative overflow-hidden">
//           {/* Animated line moving down */}
//           <div className="absolute top-0 left-0 w-full h-full bg-[#1A1A1A] origin-top animate-[scrollLine_2s_ease-in-out_infinite]" />
//         </div>
//       </div>

//       {/* Z-INDEX 30: The Mask and Building */}
//       <div
//         ref={archRef}
//         data-cursor="Discover"
//         className="absolute z-30 bottom-0 overflow-hidden flex justify-center items-start shadow-2xl"
//         style={{
//           width: "35vw",
//           minWidth: "320px",
//           height: "65vh",
//           borderRadius: "500px 500px 0 0",
//           willChange: "width, height, border-radius, transform"
//         }}
//       >
//         <img
//           ref={buildingRef}
//           src="/building-xxl.webp"
//           alt="Fakhruddin Building"
//           className="absolute top-0 w-full h-auto object-cover origin-top"
//         />
//       </div>

//       {/* Inline CSS for the scroll indicator animation */}
//       <style>{`
//         @keyframes scrollLine {
//           0% { transform: scaleY(0); transform-origin: top; }
//           50% { transform: scaleY(1); transform-origin: top; }
//           50.1% { transform: scaleY(1); transform-origin: bottom; }
//           100% { transform: scaleY(0); transform-origin: bottom; }
//         }
//       `}</style>
//     </section>
//   );
// }
export default function Residences() {
  return <>Hi! I'm still under development</>
}