"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom hook for responsive design
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// ─────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Create a timeline for the hero section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
      }
    });

    // Animate the image to zoom and fade
    tl.to(imageRef.current, {
      scale: 1.5,
      opacity: 0,
      ease: "power2.inOut"
    })
    // Animate content to fade out
    .to(contentRef.current, {
      opacity: 0,
      y: -100,
      ease: "power2.inOut"
    }, 0);

    // Initial animations
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(descRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.2, ease: "power3.out" }
    );
    
    gsap.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: "power3.out" }
    );
    
    gsap.fromTo(lineRef.current,
      { width: 0, opacity: 0 },
      { width: 96, opacity: 1, duration: 1.5, delay: 0.6, ease: "power3.out" }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* Image with overlay */}
      <img 
        ref={imageRef}
        src="images/Intelligent-Living-Tech.webp"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <p ref={subtitleRef} className="text-[#A19585] text-xs sm:text-sm tracking-[0.3em] mb-4 sm:mb-6 opacity-0">
            THE SCIENCE OF LIVING WELL
          </p>
          <h1 ref={titleRef} className="font-marcellus font-light text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] opacity-0">
            WellTech
          </h1>
          <div ref={lineRef} className="w-24 h-[2px] bg-[#A19585] mx-auto my-6 sm:my-8 opacity-0" />
          <p  ref={descRef} className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto px-4">
            Where sustainability meets intelligence, and wellness becomes instinctive.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — SUSTAINABILITY
// ─────────────────────────────────────────────────────────────
function Sustainability() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  useGSAP(() => {
    // Parallax effect on image
    gsap.to(imageRef.current, {
      y: "30%",
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Content reveal animation
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        }
      }
    );

    // Stats animation with stagger
    gsap.fromTo(statRefs.current,
      { scale: 0.8, opacity: 0, y: 50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        }
      }
    );
  }, { scope: ref });
  
  return (
    <section ref={ref} className="relative w-full min-h-screen bg-[#F9F8F6] overflow-hidden py-20">
      {/* Image Container with Parallax */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%]">
        <img 
          src="images/Pure-Water.webp"
          alt="Sustainability"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F8F6] via-[#F9F8F6]/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-16'} items-center w-full`}>
          <div className="space-y-6 sm:space-y-8">
            <span className="text-[#A19585] text-xs sm:text-sm tracking-[0.3em]">SUSTAINABILITY</span>
            <h2 className="font-marcellus font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black leading-tight">
              Built for <span className="text-[#A19585] relative">
                tomorrow
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#A19585]/30" />
              </span>,<br/>crafted for today.
            </h2>
            <p className="text-black/60 text-base sm:text-lg md:text-xl leading-relaxed">
              Energy-positive infrastructure that gives back more than it takes. Smart water and air purification systems that learn from usage patterns. Regenerative materials that age beautifully while reducing environmental impact.
            </p>
          </div>
          
          {/* Empty column for layout */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — WELLNESS
// ─────────────────────────────────────────────────────────────
function Wellness() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  useGSAP(() => {
    // Parallax effect on image
    gsap.to(imageRef.current, {
      y: "-30%",
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Content reveal from right
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        }
      }
    );

    // Feature items animation
    gsap.fromTo(featureRefs.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        }
      }
    );
  }, { scope: ref });

  const features = [
    { 
      name: "Cryotherapy Zones", 
      desc: "Advanced recovery at -140°C",
      fullDesc: "State-of-the-art cryotherapy chambers that stimulate cellular repair, reduce inflammation, and accelerate muscle recovery after intense physical activity."
    },
    { 
      name: "Hyperbaric Therapy", 
      desc: "Cellular regeneration and healing",
      fullDesc: "Pressurized oxygen chambers that enhance oxygen absorption, promote tissue repair, and accelerate healing at the cellular level."
    },
    { 
      name: "Infrared Integration", 
      desc: "Deep tissue recovery",
      fullDesc: "Full-spectrum infrared technology that penetrates deep into muscles, promoting detoxification, improved circulation, and accelerated recovery."
    },
    { 
      name: "Floatation Spaces", 
      desc: "Neural reset and meditation",
      fullDesc: "Sensory deprivation tanks designed to eliminate external stimuli, allowing deep meditation, stress reduction, and neural pathway reset."
    }
  ];

  return (
    <section ref={ref} className="relative w-full min-h-screen bg-[#0D1120] overflow-hidden py-10">
      {/* Image with overlay */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%]">
        <img 
          src="images/Advanced-Wellness-Integration.webp"
          alt="Wellness"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0D1120] via-[#0D1120]/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-16'} items-center w-full`}>
          {/* Empty column for layout */}
          <div className="hidden md:block" />
          
          <div className="space-y-6 sm:space-y-8">
            <span className="text-[#A19585] text-xs sm:text-sm tracking-[0.3em]">WELLNESS</span>
            <h2 className="font-marcellus font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              Health, <span className="text-[#A19585]">reimagined</span> daily.
            </h2>
            <p className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed">
              Advanced recovery environments including cryotherapy zones and hyperbaric oxygen therapy become as accessible as your living room.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  ref={el => { featureRefs.current[i] = el; }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#A19585]/30 transition-all duration-500 overflow-hidden cursor-pointer"
                  style={{ minHeight: '160px' }}
                >
                  {/* Front Content */}
                  <div className="relative z-10 transition-all duration-500 group-hover:opacity-0">
                    {/* SVG Icon */}
                    <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {i === 0 && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L12 7M12 2L9 5M12 2L15 5" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 22V17M12 22L9 19M12 22L15 19" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12H7M2 12L5 9M2 12L5 15" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 12H17M22 12L19 9M22 12L19 15" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="#A19585" strokeWidth="1.5"/>
                        </svg>
                      )}
                      {i === 1 && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="3" stroke="#A19585" strokeWidth="1.5"/>
                          <path d="M16.5 7.5L19 5" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M7.5 16.5L5 19" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M12 6L12 3" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )}
                      {i === 2 && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="8" stroke="#A19585" strokeWidth="1.5"/>
                          <path d="M12 4V2M12 22V20M4 12H2M22 12H20" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M12 8C9.79 8 8 9.79 8 12" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="2" fill="#A19585"/>
                        </svg>
                      )}
                      {i === 3 && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 12L12 3L21 12L12 21L3 12Z" stroke="#A19585" strokeWidth="1.5"/>
                          <path d="M12 8V16M8 12H16" stroke="#A19585" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="2" fill="#A19585"/>
                        </svg>
                      )}
                    </div>
                    <h3 className="text-white text-base sm:text-lg mb-2">{feature.name}</h3>
                    <p className="text-white/40 text-xs sm:text-sm">{feature.desc}</p>
                  </div>
                  
                  {/* Back Content - Shows on Hover */}
                  <div className="absolute inset-0 z-20 p-4 sm:p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-[#0D1120] to-[#1A1F2E] rounded-2xl">
                    <p className="text-white/80 text-xs sm:text-sm text-center leading-relaxed">
                      {feature.fullDesc}
                    </p>
                  </div>
                  
                  {/* Animated border on hover */}
                  <div className="absolute inset-0 border-2 border-[#A19585]/0 rounded-2xl group-hover:border-[#A19585]/30 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — INTELLIGENCE
// ─────────────────────────────────────────────────────────────
function Intelligence() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  useGSAP(() => {
    // Zoom effect on image
    gsap.to(imageRef.current, {
      scale: 1.3,
      rotation: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Content fade in
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        }
      }
    );

    // Cards animation with 3D effect
    gsap.fromTo(cardRefs.current,
      { rotationY: 30, opacity: 0, y: 50 },
      {
        rotationY: 0,
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        }
      }
    );
  }, { scope: ref });

  const capabilities = [
    { icon: "01", title: "AI Predictive", desc: "Anticipates needs before expression", color: "from-purple-500/20" },
    { icon: "02", title: "Smart Maintenance", desc: "Prevents issues proactively", color: "from-blue-500/20" },
    { icon: "03", title: "Wellness Insights", desc: "Real-time optimization", color: "from-green-500/20" },
    { icon: "04", title: "Community Connect", desc: "Fosters genuine connection", color: "from-orange-500/20" }
  ];

  return (
    <section ref={ref} className="relative w-full min-h-screen bg-[#F9F8F6] overflow-hidden">
      {/* Image with artistic overlay */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <img 
          src="images/Airocide.webp"
          alt="Intelligence"
          className="w-full h-full object-cover opacity-30"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#F9F8F6] via-[#F9F8F6]/40 to-transparent" /> */}
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[#A19585] text-xs sm:text-sm tracking-[0.3em]">INTELLIGENCE</span>
            <h2 className="font-marcellus font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mt-4 sm:mt-6">
              Invisible <span className="text-[#A19585] relative">
                technology
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#A19585]/30" />
              </span>,<br/>visible results.
            </h2>
            <p className="text-black/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-6">
              AI-enabled environments that anticipate needs before they're expressed. Predictive maintenance that prevents issues before they occur.
            </p>
          </div>
          
          {/* 3D Cards Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-4 gap-6 sm:gap-8'}`}>
            {capabilities.map((cap, i) => (
              <div 
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                className="group relative perspective-1000"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/60 hover:border-[#A19585]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cap.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 text-[#A19585]/50">
                      {cap.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl text-black mb-2">{cap.title}</h3>
                    <p className="text-black/50 text-xs sm:text-sm">{cap.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — INDOOR ENVIRONMENTS
// ─────────────────────────────────────────────────────────────
function IndoorEnvironments() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;
  
  useGSAP(() => {
    gsap.fromTo(ref.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        }
      }
    );

    // Parallax effect on the hero image
    gsap.to(imageRef.current, {
      y: "20%",
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    gsap.fromTo(".env-feature",
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: isMobile ? 0.1 : 0.15,
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".env-grid",
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        }
      }
    );
  }, { scope: ref, dependencies: [isMobile] });

  const environments = [
    {
      title: "Air Quality Systems",
      description: "Enhanced air purification that outperforms nature itself, with real-time monitoring and adaptive filtration.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Water Mineralization",
      description: "Mineralized water solutions that nourish at the molecular level, with smart temperature and flow control.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Climate Optimization",
      description: "Climate-optimized interiors that respond to your biology, creating microclimates throughout your home.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50"
    },
    {
      title: "Natural Light",
      description: "Natural light optimization that works with your circadian rhythm, with automated shading and spectrum control.",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-32 bg-gradient-to-b from-[#0D1120] to-black overflow-hidden">
      {/* Hero Image Background with Parallax */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] opacity-20">
        <img 
          src="images/indoor_herbs.webp"          
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1120] via-transparent to-black" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#A19585] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">
        <div className="text-center mb-16 sm:mb-24">
          <span className="text-[#A19585] text-xs sm:text-sm tracking-[0.3em]">INDOOR ENVIRONMENTS</span>
          <h2 className="font-marcellus font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mt-4 sm:mt-6">
            Where you live, <span className="text-[#A19585] relative">
              redefined
              <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                <line x1="0" y1="2" x2="100" y2="2" stroke="#A19585" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </span>.
          </h2>
        </div>

        <div className="env-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {environments.map((env, i) => (
            <div
              key={i}
              className="env-feature group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#A19585]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#A19585]/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${env.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative p-6 sm:p-8 lg:p-10">
                {/* <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-full ${env.bgColor} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                    <span className="text-black text-xl">→</span>
                  </div>
                </div> */}
                
                <h3 className="text-white text-2xl sm:text-3xl mb-3 group-hover:text-[#A19585] transition-colors duration-300">
                  {env.title}
                </h3>
                
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {env.description}
                </p>
                
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#A19585] to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────
// SECTION 6 — PHILOSOPHY
// ─────────────────────────────────────────────────────────────
function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  useGSAP(() => {
    // Subtle image animation
    gsap.to(imageRef.current, {
      scale: 1.1,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Content reveal
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        }
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full min-h-screen bg-[#090C14] overflow-hidden">
      
      {/* Animated rings */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px]">
          <div className="absolute inset-0 border-2 border-[#A19585]/10 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-[15%] border-2 border-[#A19585]/20 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-[30%] border-2 border-[#A19585]/30 rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-8">
        <div className="max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-8 sm:w-12 h-[2px] bg-[#A19585]" />
            <span className="text-[#A19585] text-xs sm:text-sm tracking-[0.3em]">THE PHILOSOPHY</span>
            <div className="w-8 sm:w-12 h-[2px] bg-[#A19585]" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 sm:mb-8 leading-tight">
            WellTech isn't a feature.<br/>It's the <span className="relative">
              <span className="text-[#A19585]">foundation</span>
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#A19585]/50" />
            </span>.
          </h2>
          
          <p className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Modern living demands more than luxury. It requires balance—between comfort, sustainability, health, and technology. WellTech brings these elements together into one cohesive living philosophy.
          </p>
          
          {/* Decorative dots */}
          <div className="flex justify-center gap-3 mt-8 sm:mt-12">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 rounded-full bg-[#A19585]/30 animate-pulse" 
                style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────
export default function WellTechPage() {
  useEffect(() => {
    ScrollTrigger.refresh();
    
    // Smooth scroll with better performance
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.min(Math.max(e.deltaY, -100), 100);
      window.scrollBy({
        top: delta,
        behavior: 'smooth'
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="bg-black overflow-x-hidden">
      <Navbar />
      
      <div className="relative">
        <Hero />
        <Sustainability />
        <Wellness />
        <Intelligence />
        <IndoorEnvironments />
        <Philosophy />
      </div>
      
      <Footer />
    </main>
  );
}