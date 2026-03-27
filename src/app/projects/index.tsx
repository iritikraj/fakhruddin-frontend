"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Hero slider images
const heroImages = [
  {
    url: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Treppan-Living-Prive-Cover.webp",
    title: "Tréppan Living Privé"
  },
  {
    url: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Serenique-Balcony-Podium-Overview.webp",
    title: "Tréppan Serenique"
  },
  {
    url: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Tower-Copy-of-Elevation01.webp",
    title: "Tréppan Tower"
  },
  {
    url: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-Render-1_4_11.webp",
    title: "Hatimi Residences"
  },
  {
    url: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Maimoon-Banner.webp",
    title: "Maimoon Gardens"
  }
];

// ─────────────────────────────────────────────────────────────
// HERO SECTION - Cinematic with Moving Images
// ─────────────────────────────────────────────────────────────
function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Parallax effect on section
    gsap.to(sectionRef.current, {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Initial text animations
    const tl = gsap.timeline();
    tl.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(descRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(lineRef.current,
        { width: 0, opacity: 0 },
        { width: "30%", opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
  }, { scope: sectionRef });

  // Animate current image - NO BLUR
  useEffect(() => {
    // Reset and animate the new current image
    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.killTweensOf(ref);

        if (index === currentIndex) {
          // Current image - gentle zoom only, NO BLUR
          gsap.fromTo(ref,
            { scale: 1 },
            {
              scale: 1.1,
              duration: 8,
              ease: "none",
              repeat: -1,
              yoyo: true
            }
          );
        } else {
          // Previous image - reset scale
          gsap.to(ref, {
            scale: 1,
            duration: 1,
            ease: "power2.out"
          });
        }
      }
    });
  }, [currentIndex]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Background Images with Movement - NO BLUR */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          ref={el => { imageRefs.current[index] = el; }}
          className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={img.url}
            alt={img.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

          {/* Image Label */}
          <div className={`absolute bottom-24 right-12 text-white/30 text-sm tracking-[0.3em] transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}>
            {img.title}
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 z-20 w-full h-1 bg-white/10">
        <div
          className="h-full bg-[#A19585] transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / heroImages.length) * 100}%` }}
        />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-500 ${index === currentIndex
                ? "w-12 bg-[#A19585]"
                : "w-8 bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          <p ref={subtitleRef} className="text-[#A19585] text-sm tracking-[0.3em] mb-4">
            FAKHRUDDIN PROPERTIES
          </p>
          <h1 ref={titleRef} className="font-marcellus font-light text-6xl md:text-7xl lg:text-8xl text-white leading-tight">
            Defining<br />Modern Living
          </h1>
          <div ref={lineRef} className="h-[2px] bg-[#A19585] my-8" style={{ width: "30%" }} />

          <p ref={descRef} className="text-white/90 text-base md:text-lg max-w-2xl">
            Where visionary architecture meets human-centric design, creating spaces that inspire, nurture, and endure.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs tracking-[0.3em]">SCROLL</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-[#A19585] to-transparent animate-scroll" />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT CARD COMPONENT - Full Content Visible
// ─────────────────────────────────────────────────────────────
interface ProjectCardProps {
  id: string;
  logo: string;
  title: string;
  location: string;
  description: string;
  image: string;
  specs: {
    bedrooms: string;
    price?: string;
    amenities: string;
    completion?: string;
  };
  isNew?: boolean;
  index: number;
  align?: 'left' | 'right';
}

function ProjectCard({ id, logo, title, location, description, image, specs, isNew, index, align = 'left' }: ProjectCardProps) {
  const cardRef: any = useRef<HTMLDivElement>(null);
  const imageRef: any = useRef<HTMLDivElement>(null);
  const contentRef: any = useRef<HTMLDivElement>(null);
  const buttonsRef: any = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Card reveal animation
    gsap.fromTo(cardRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        }
      }
    );

    // Image parallax on scroll
    gsap.to(imageRef.current, {
      y: "20%",
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Content stagger - simpler animation
    gsap.fromTo(contentRef.current?.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        }
      }
    );

    // Buttons slide from left - appear when card enters viewport
    gsap.fromTo(buttonsRef.current?.children,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=50",
          end: "top center",
          scrub: 1,
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="relative w-full bg-white rounded-3xl overflow-hidden shadow-2xl mb-16 last:mb-0"
    >
      <div className={`flex flex-col lg:flex-row ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        {/* Image Side */}
        <div ref={imageRef} className="lg:w-1/2 h-[400px] lg:h-[600px] relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* New Badge */}
          {isNew && (
            <div className="absolute top-6 left-6 bg-[#A19585] text-white text-xs px-4 py-2 rounded-full tracking-wider">
              NEW LAUNCH
            </div>
          )}
        </div>

        {/* Content Side - Full Visibility */}
        <div ref={contentRef} className="lg:w-1/2 p-8 lg:p-12 flex items-center">
          <div className="w-full space-y-6">
            {/* Title Section */}
            <div className="space-y-2">
              <img
                src={logo}
                alt={title}
                className={`w-80 h-full m-auto object-contain brightness-0 mt-10 md:mt-0`}
              />
              {/* <h2 className="font-marcellus font-light text-4xl lg:text-5xl text-black">
                {title}
              </h2> */}
            </div>

            {/* Description */}
            <p className="text-black/50 text-base leading-relaxed">
              {description}
            </p>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-[#A19585]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="h-4 w-px bg-[#A19585]/30"></div>
              <p className="text-[#A19585] text-xs tracking-[0.3em]">
                {location}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
              <div className="text-center p-4 bg-[#A19585]/20 rounded-xl">
                <div className="text-xl text-[#A19585]">{specs.bedrooms}</div>
                <div className="text-black/40 text-xs">Bedrooms</div>
              </div>
              {specs.price && (
                <div className="text-center p-4 bg-[#A19585]/20 rounded-xl">
                  <div className="text-xl text-[#A19585]">{specs.price}</div>
                  <div className="text-black/40 text-xs">Starting</div>
                </div>
              )}
              <div className="text-center p-4 bg-[#A19585]/20 rounded-xl">
                <div className="text-xl text-[#A19585]">{specs.amenities}</div>
                <div className="text-black/40 text-xs">Amenities</div>
              </div>
              {specs.completion && (
                <div className="text-center p-4 bg-[#A19585]/20 rounded-xl">
                  <div className="text-xl text-[#A19585]">{specs.completion}</div>
                  <div className="text-black/40 text-xs">Completion</div>
                </div>
              )}
            </div>

            {/* Action Buttons - Slide from left when card enters */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-4">
              <Link
                href={`/projects/${id}`}
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-black text-white rounded-full hover:bg-[#A19585] transition-all duration-500"
              >
                <span className="text-sm font-medium tracking-wide">VIEW DETAILS</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <button
                onClick={() => window.open('/contact', '_blank')}
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-transparent border-2 border-black/10 text-black rounded-full hover:bg-[#A19585] hover:text-white hover:border-[#A19585] transition-all duration-500"
              >
                <span className="text-sm font-medium tracking-wide">EXPRESS INTEREST</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m0 0l-4-4m4 4l-4 4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT SHOWCASE - All Properties with Full Content
// ─────────────────────────────────────────────────────────────
function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=50",
          end: "top center",
          scrub: 1,
        }
      }
    );
  }, { scope: sectionRef });

  const projects = [
    {
      id: "treppan-living-prive",
      logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/TREPPEN-PRIVE-LOGO.svg",
      title: "Tréppan Living Privé",
      location: "Dubai Islands",
      description: "Step into a world where thoughtful design meets future-ready living. Experience a tranquil, wellness-led sanctuary with calm at its core. From AI-enabled smart homes to 46+ curated amenities, Tréppan Living Privé transforms everyday life into a rhythm of balance and ease. Each residence is meticulously crafted with premium finishes, smart home automation, and private outdoor spaces that blur the line between indoor and outdoor living.",
      image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Treppan-Living-Prive-Cover.webp",
      specs: {
        bedrooms: "2-4",
        price: "AED 3.2M",
        amenities: "46+",
        completion: "Q4 2028"
      },
      isNew: true,
      align: 'left' as const
    },
    {
      id: "treppan-serenique",
      logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-serenique-logo.png",
      title: "Tréppan Serenique",
      location: "Dubai Islands",
      description: "Designed for those who seek more than luxury, Serenique was envisioned as a place where life unfolds with intention and ease. Every element nurtures physical vitality, mental clarity, and emotional harmony. The architecture embraces biophilic principles, bringing natural light and greenery into every corner. With dedicated wellness amenities including a spa, meditation gardens, and fitness pavilions, Serenique offers a lifestyle that feels restorative yet effortlessly refined.",
      image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Serenique-Balcony-Podium-Overview.webp",
      specs: {
        bedrooms: "2-3",
        price: "AED 2.9M",
        amenities: "53+",
        completion: "Q2 2028"
      },
      isNew: true,
      align: 'right' as const
    },
    {
      id: "treppan-tower",
      logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/treppan-tower-logo.png",
      title: "Tréppan Tower",
      location: "Jumeirah Village Triangle",
      description: "Tréppan Tower is a serene sanctuary, located in Jumeirah Village Triangle. It creates a home where families and communities can truly flourish. The tower features thoughtfully designed residences with panoramic city views, state-of-the-art fitness facilities, swimming pools, children's play areas, and landscaped gardens. Each apartment is finished to the highest standards with smart home technology and energy-efficient systems.",
      image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Treppan-Tower-Copy-of-Elevation01.webp",
      specs: {
        bedrooms: "1-3",
        price: "AED 1.15M",
        amenities: "14+",
        completion: "Q1 2027"
      },
      align: 'left' as const
    },
    {
      id: "hatimi-residences",
      logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/hatimi-logo.png",
      title: "Hatimi Residences",
      location: "Dubai Islands",
      description: "On Dubai Islands, Hatimi Residences grace the waterfront with timeless purpose. Uninterrupted seaviews unfold endlessly, embracing the blue horizon of the Gulf. These exclusive residences offer direct beach access, private marina berths, and waterfront dining. The architecture draws inspiration from the ocean's rhythms, with flowing curves and expansive glass walls that frame the water views from every room.",
      image: "https://www.fakhruddinproperties.com/wp-content/uploads/2025/12/Exterior-Render-1_4_11.webp",
      specs: {
        bedrooms: "1-4",
        price: "AED 7.02M",
        amenities: "12+",
        completion: "Q3 2027"
      },
      align: 'right' as const
    },
    {
      id: "maimoon-gardens",
      logo: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/maimoon-gardens-logo.png",
      title: "Maimoon Gardens",
      location: "Jumeirah Village Circle",
      description: "Maimoon Gardens stands as a purposefully crafted address for sustainable living. Its design balances nature, innovation, and comfort within an enduring community vision. The development features lush green spaces, community gardens, solar-powered amenities, and water-efficient landscaping. Residences are designed to maximize natural light and ventilation, reducing energy consumption while enhancing wellbeing.",
      image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Maimoon-Banner.webp",
      specs: {
        bedrooms: "Studio-3",
        price: "AED 1.4M",
        amenities: "17+",
        completion: "Q4 2026"
      },
      align: 'left' as const
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="text-[#A19585] text-xs sm:text-sm tracking-[0.3em]">OUR PORTFOLIO</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black mt-4">
            Defining Modern Living
          </h2>
          <p className="text-black/50 text-sm sm:text-base max-w-2xl mx-auto mt-4">
            Each development is thoughtfully crafted to enhance wellbeing, embrace sustainability, and create lasting communities.
          </p>
        </div>

        {/* Projects List - Full Content Always Visible */}
        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOUNDATION SECTION - With Hover Effects
// ─────────────────────────────────────────────────────────────
function FoundationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.fromTo(cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        }
      }
    );
  }, { scope: sectionRef });

  const foundations = [
    {
      number: "01",
      title: "Designing for What's Next",
      description: "As cities evolve, our developments anticipate what tomorrow's residents truly need: wellness, sustainability, and intelligent infrastructure. From water-positive designs to integrated work-life wellness zones, every Fakhruddin project is engineered as a blueprint for future-ready urban living.",
      color: "from-amber-900/20"
    },
    {
      number: "02",
      title: "Architecture With a Pulse",
      description: "No two projects are ever alike — because no two communities are. Our residences reflect architectural personality: bold silhouettes, functional interiors, and emotional resonance. We design with the belief that buildings should not only serve lives — but inspire them.",
      color: "from-stone-900/20"
    },
    {
      number: "03",
      title: "Recognised. Respected. Rewarded.",
      description: "Recognised with 20+ industry awards, Fakhruddin Properties is known for advancing sustainability, innovation, and wellness-led development. Forbes Middle East has honoured our leadership among the region's most influential real estate leaders for two consecutive years, reflecting lasting purpose and impact.",
      color: "from-amber-800/20"
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-[#f9f8f6] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#b69c6b] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#191817] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[#b69c6b] text-xs tracking-[0.3em]">THE FOUNDATION</span>
          <h2 className="font-marcellus font-light text-4xl md:text-5xl text-[#191817] mt-4">
            Every project is shaped by balance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foundations.map((item, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-4"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#b69c6b]/10 rounded-bl-3xl transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />

              <div className="relative p-10">
                {/* Number */}
                <div className="text-[#b69c6b] text-3xl mb-4 group-hover:text-[#191817] transition-colors duration-500">
                  {item.number}
                </div>

                {/* Title */}
                <h3 className="font-marcellus font-light text-2xl text-[#191817] mb-4 group-hover:text-[#b69c6b] transition-colors duration-500">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#7a6a58] text-base leading-relaxed group-hover:text-[#191817] transition-colors duration-500">
                  {item.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#b69c6b] to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-16 text-center">
          {[
            { value: "63+", label: "Years of Building Legacy" },
            { value: "40+", label: "Projects in the UAE" },
            { value: "21+", label: "Projects across Africa" },
            { value: "7+", label: "Projects in the UK" },
            { value: "20+", label: "Awards for Excellence" }
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-4xl text-[#b69c6b] group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-[#191817] tracking-wide mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  useEffect(() => {
    ScrollTrigger.refresh();

    // Smooth scroll
    const handleWheel = (e: WheelEvent) => {
      window.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

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
    <main className="font-sans bg-black overflow-x-hidden">
      <Navbar />
      <HeroSlider />
      <ProjectShowcase />
      <FoundationSection />
      <Footer />
    </main>
  );
}