"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const JOURNEY_DATA = [
  {
    year: "1963",
    title: "The Foundation",
    description: "Fakhruddin Holdings is established, laying the cornerstone of a legacy built on entrepreneurship, integrity, and community values.",
    image: "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "1975",
    title: "Expanding Horizons",
    description: "First international expansion, establishing presence beyond the UAE and beginning a journey of cross-border excellence.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "1983",
    title: "Architectural Innovation",
    description: "Pioneering new architectural approaches that blend modern design with timeless elegance and functionality.",
    image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2001",
    title: "A New Millennium",
    description: "Embracing sustainability as a core principle, introducing green building practices before they became industry standard.",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2015",
    title: "Wellness Revolution",
    description: "Launch of wellness-focused developments, prioritizing human-centric design and holistic living experiences.",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2026",
    title: "The Future Unfolds",
    description: "Leading the next generation of sustainable, AI-integrated communities that redefine urban living.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop"
  }
];

// ==========================================
// 1. THE 3D STACK SCENE (FIXED RESPONSIVENESS)
// ==========================================
function JourneyStackScene({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5;

  // Sizing
  const cardWidth = isMobile ? viewport.width * 0.7 : Math.min(viewport.width * 0.35, 3.5);
  const cardHeight = cardWidth * 1.4;

  // Base positions to keep things aligned without cutting off
  const baseOffsetX = isMobile ? 0 : -viewport.width * 0.22; // Shifts cards to the left on desktop
  const baseOffsetY = isMobile ? 0.4 : 0; // Modest shift up on mobile to avoid navbar, perfectly centered on desktop

  useFrame((state, delta) => {
    // Subtle mouse float
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 30, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.mouse.y * Math.PI) / 30, 0.05);
    }

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const isActive = i === activeIndex;
      const isPast = i < activeIndex;

      let targetZ, targetX, targetY, targetRotZ, targetOpacity, targetGrayscale;

      if (isActive) {
        targetZ = 2;
        targetX = baseOffsetX;
        targetY = baseOffsetY;
        targetRotZ = 0;
        targetOpacity = 1;
        targetGrayscale = 0;
      } else if (isPast) {
        // Flies behind camera
        targetZ = 8;
        targetX = baseOffsetX - 2;
        targetY = baseOffsetY + 2;
        targetRotZ = -0.5;
        targetOpacity = 0;
        targetGrayscale = 0;
      } else {
        // Stacked background
        const offset = i - activeIndex;
        targetZ = -offset * 1.5;
        targetX = baseOffsetX + offset * (isMobile ? 0.15 : 0.5);
        targetY = baseOffsetY - (offset * 0.15);
        targetRotZ = -0.05 * offset;
        targetOpacity = Math.max(0.1, 1 - (offset * 0.25));
        targetGrayscale = 0.8;
      }

      const lerpSpeed = 4;
      card.position.x = THREE.MathUtils.lerp(card.position.x, targetX, lerpSpeed * delta);
      card.position.y = THREE.MathUtils.lerp(card.position.y, targetY, lerpSpeed * delta);
      card.position.z = THREE.MathUtils.lerp(card.position.z, targetZ, lerpSpeed * delta);
      card.rotation.z = THREE.MathUtils.lerp(card.rotation.z, targetRotZ, lerpSpeed * delta);

      const material = card.material as any;
      if (material) {
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, lerpSpeed * delta);
        material.grayscale = THREE.MathUtils.lerp(material.grayscale, targetGrayscale, lerpSpeed * delta);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {JOURNEY_DATA.map((award, i) => (
        <Image
          key={i}
          ref={(el) => { cardRefs.current[i] = el as THREE.Mesh; }}
          url={award.image}
          transparent
          scale={[cardWidth, cardHeight]}
          position={[baseOffsetX + i * 0.5, baseOffsetY, -i * 2]}
        />
      ))}
    </group>
  );
}

// ==========================================
// 2. THE MAIN COMPONENT
// ==========================================
export default function Journey() {
  const containerRef = useRef(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(index);
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#F9F8F6] text-[#1A1A1A] relative w-full">

      {/* 1. FIXED FULL-WIDTH BACKGROUND (Prevents cutting in half) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 w-full h-screen">

          <Canvas camera={{ position: [0, 0, 7], fov: 40 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={1} />
            <JourneyStackScene activeIndex={activeIndex} />
          </Canvas>

          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* GRADIENTS: These replace the solid background, ensuring text is readable while letting the 3D fan out smoothly */}
          {/* Mobile: Fades up from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/80 to-transparent lg:hidden pointer-events-none" />
          {/* Desktop: Fades right to cover behind the text */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F9F8F6]/80 to-[#F9F8F6] hidden lg:block pointer-events-none" />

        </div>
      </div>

      {/* 2. SCROLLING CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-20 flex justify-end">

        {/* Adjusted padding: Desktop uses w-5/12 for perfect right-alignment */}
        <div className="w-full lg:w-6/12 xl:w-5/12 pt-[55vh] lg:pt-40 pb-[20vh] lg:pb-[40vh]">

          <header className="space-y-4 md:space-y-6 mb-20 md:mb-32">
            <span className="text-[#A19585] text-xs tracking-[0.4em] uppercase block mb-4">Through the Decades</span>
            <h2 className="font-marcellus font-light text-4xl md:text-5xl lg:text-6xl text-[#1b2946] leading-tight mb-8" style={{ fontWeight: 300 }}>
            Our Journey of<br />
            <span className="text-[#A19585]">Enduring Excellence</span>
            </h2>
          </header>

          <div className="border-t border-[#1A1A1A]/10">
            {JOURNEY_DATA.map((row, index) => (
              <div
                key={index}
                ref={(el) => { rowRefs.current[index] = el; }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group relative border-b border-[#1A1A1A]/10 py-12 md:py-20 flex flex-col justify-between gap-4 md:gap-8 cursor-pointer transition-all duration-700 ${activeIndex === index ? "opacity-100 pl-6 md:pl-8" : "opacity-40 hover:opacity-100"
                  }`}
              >
                {/* Active Row Indicator */}
                <div className={`absolute left-0 top-0 h-full w-[2px] md:w-1 bg-[#9D7E44] transition-transform duration-700 origin-top ${activeIndex === index ? "scale-y-100" : "scale-y-0"
                  }`} />

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <span className={`italic text-xl md:text-3xl transition-colors duration-500 ${activeIndex === index ? "text-[#9D7E44]" : "text-[#1A1A1A]/40"
                    }`}>
                    {row.year}
                  </span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl tracking-tight text-[#1A1A1A] leading-tight">
                    {row.title}
                  </h3>
                </div>

                <div>
                  <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]/50 font-medium md:pl-[4.5rem]">
                    {row.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}