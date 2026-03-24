'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  Wind, Cpu, Droplets, Leaf, Coffee, Activity, Car, CheckCircle2
} from 'lucide-react';
import GreenhousePremium from '../_green-house';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TreppanStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counter1Ref = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. HERO ENTRANCE
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTl
        .fromTo('.hero-bg-zoom', { scale: 1.3, filter: 'blur(20px)' }, { scale: 1, filter: 'blur(0px)', duration: 3.5 })
        .fromTo('.hero-text-reveal', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 2, stagger: 0.1 }, "-=2.5")
        .fromTo('.hero-sep', { scaleX: 0 }, { scaleX: 1, duration: 2.5 }, "-=1.5");

      // 2. AMBASSADOR REVEAL
      gsap.from('.ambassador-content', {
        opacity: 0, y: 50, duration: 1.5, scrollTrigger: { trigger: '.ambassador-section', start: 'top 70%' }
      });

      // 3. AUDIT COUNTERS
      const animateCounter = (ref: any, target: number) => {
        gsap.fromTo(ref, { innerHTML: 0 }, {
          innerHTML: target, duration: 3, snap: { innerHTML: 1 },
          scrollTrigger: { trigger: ref, start: 'top 90%' }
        });
      };
      if (counter1Ref.current) animateCounter(counter1Ref.current, 2580);
      if (counter2Ref.current) animateCounter(counter2Ref.current, 205);

      // 4. TAKEOVER PINNING
      const expandTl = gsap.timeline({
        scrollTrigger: { trigger: '.takeover-section', start: 'top top', end: '+=150%', scrub: 1.2, pin: true, anticipatePin: 1 }
      });
      expandTl.to('.takeover-card', { width: '100vw', height: '100vh', borderRadius: '0px', ease: 'none' })
        .to('.takeover-content', { opacity: 1, y: 0, duration: 0.5 }, 0.2);

      // 5. SMART LIVING STACKING CARDS (Features 01-05)
      const smartCards: any = gsap.utils.toArray('.smart-stack-card');

      smartCards.forEach((card: any, i: number) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top+=120',
          endTrigger: '.smart-stack-container',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });

        if (i < smartCards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: smartCards[i + 1],
              start: 'top bottom',
              end: 'top top+=120',
              scrub: true,
            }
          });
        }
      });

      // 6. CINEMATIC VISUAL TOUR PINNING (Living With Purpose 01-03)
      const tourImages: any = gsap.utils.toArray('.tour-image');
      const tourTexts: any = gsap.utils.toArray('.tour-text');

      gsap.set(tourImages, { opacity: 0, scale: 1.1 });
      gsap.set(tourImages[0], { opacity: 1, scale: 1 });
      gsap.set(tourTexts, { opacity: 0, y: 20 });
      gsap.set(tourTexts[0], { opacity: 1, y: 0 });

      ScrollTrigger.create({
        trigger: '.visual-tour-section',
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        animation: gsap.timeline()
          // Slide 1 to 2
          .to(tourImages[0], { opacity: 0, scale: 1.1, duration: 1 })
          .to(tourTexts[0], { opacity: 0, y: -20, duration: 0.5 }, "<")
          .to(tourImages[1], { opacity: 1, scale: 1, duration: 1 }, "<0.5")
          .to(tourTexts[1], { opacity: 1, y: 0, duration: 0.5 }, "<0.5")
          // Slide 2 to 3
          .to(tourImages[1], { opacity: 0, scale: 1.1, duration: 1 })
          .to(tourTexts[1], { opacity: 0, y: -20, duration: 0.5 }, "<")
          .to(tourImages[2], { opacity: 1, scale: 1, duration: 1 }, "<0.5")
          .to(tourTexts[2], { opacity: 1, y: 0, duration: 0.5 }, "<0.5")
      });

      gsap.fromTo('.outro-bg-img',
        { scale: 1.15 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: '.outro-section', start: 'top bottom', end: 'bottom top', scrub: true } }
      );
      gsap.fromTo('.outro-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.outro-section', start: 'top 60%' } }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#fffcf8] text-[#191817] selection:bg-[#b69c6b] overflow-x-hidden">

      {/* ══ CHAPTER 1: HERO (The Philosophy) ══ */}
      <section className="hero-section relative h-screen w-full flex items-center justify-end bg-[#0a0a0a]">
        <div className="hero-bg-zoom absolute inset-0 opacity-100">
          <Image src="https://projects.fakhruddinproperties.com/JA-Treppan-Living-Prive-Desktop.webp" alt="The Philosophy" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-0" />
        <div className="relative z-10 text-center md:text-right max-w-5xl px-6 md:pr-16 mt-20 font-marcellus">
          <span className="hero-text-reveal text-[#b69c6b] text-[10px] uppercase tracking-[0.4em] mb-6 block">The Philosophy</span>
          <h1 className="hero-text-reveal text-5xl md:text-8xl font-light text-white tracking-wider mb-8">
            Where Conscious<br /> <span className="text-[#b69c6b]">Living</span> Finds<br /> Its Home
          </h1>
          <div className="hero-sep w-24 h-[1px] bg-white/20 mx-auto md:ml-auto md:mr-0 mb-10" />
          <p className="hero-text-reveal text-white/80 text-lg md:text-xl font-light tracking-wide max-w-2xl ml-auto leading-relaxed">
            Tréppan Living is not just designed for comfort. It is created for balance. A place where wellbeing, environmental responsibility, and intelligent technology come together so your everyday life feels lighter, healthier, and more meaningful.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#b69c6b] to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 rotate-90 origin-left">Scroll</span>
        </div>
      </section>

      {/* ══ CHAPTER 2: AMBASSADOR ══ */}
      <section className="ambassador-section py-32 md:py-48 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 ambassador-content">
            <span className="text-[#b69c6b] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Global Brand Ambassador</span>
            <h2 className="text-5xl md:text-7xl font-marcellus text-[#191817] leading-tight tracking-tighter mb-8">
              John <span className="font-light text-[#b69c6b]">Abraham</span>
            </h2>
            <div className="h-[1px] w-12 bg-[#b69c6b] mb-8" />
            <div className="space-y-6 text-[#7a6a58] font-light text-xl md:text-3xl leading-relaxed">
              <p>
                "This is living that supports you — not the other way around."
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 relative h-[600px] md:h-[800px] rounded-[40px] overflow-hidden shadow-2xl">
            <Image src="https://cdn-ilehell.nitrocdn.com/SQOQCxUDFIpvXLPQuxQlVxTUoPdlbjEY/assets/images/optimized/rev-212928e/www.fakhruddinproperties.com/wp-content/uploads/2026/03/Community-Wellbeing-Spaces.webp" alt="John Abraham" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ══ CHAPTER 3: THE AUDIT ══ */}
      <section className="bg-[#191817] py-32 md:py-48 px-6 rounded-t-[100px] z-10 relative">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/10 text-[#b69c6b] text-[10px] uppercase tracking-[0.3em] font-marcellus">
                <th className="py-8 font-bold w-1/4">System</th>
                <th className="py-8 font-bold">Cost / year</th>
                <th className="py-8 font-bold">Plastic Discarded / year</th>
                <th className="py-8 font-bold">Nano-plastics Ingested / year</th>
                <th className="py-8 font-bold text-right">Deliveries & Storage</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {/* Tréppan Living Row */}
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <td className="py-12 pr-8">
                  <span className="text-xl font-marcellus text-[#b69c6b] block mb-2">Tréppan Living Water System</span>
                  <span className="text-xs text-white/60 font-light leading-snug block">Hydrogenated & Filtered<br />Built Into the Home</span>
                </td>
                <td className="py-12">
                  <span className="text-lg font-light">None</span>
                </td>
                <td className="py-12">
                  <span className="text-xl text-[#b69c6b] font-light block">0 Bottles</span>
                  <span className="text-sm text-white/40 block">0 Caps</span>
                </td>
                <td className="py-12">
                  <span className="text-xl font-light block">0 Particles</span>
                  <span className="text-xs text-white/40 block mt-1">Advanced Filtration System</span>
                </td>
                <td className="py-12 text-right">
                  <span className="text-sm font-light text-white/80">Direct from home supply</span>
                </td>
              </tr>

              {/* Bottled Water Row */}
              <tr className="border-b border-white/5">
                <td className="py-12 pr-8">
                  <span className="text-xl font-marcellus block mb-2">Bottled Water</span>
                  <span className="text-xs text-white/40 font-light block">Single-use 1.5 L</span>
                </td>
                <td className="py-12">
                  <span className="text-lg font-light">≈ AED 4,620</span>
                </td>
                <td className="py-12">
                  <span className="text-xl font-light block">≈ <span ref={counter1Ref}>0</span> Bottles</span>
                  <span className="text-sm text-white/40 block">≈ 2,580 Caps</span>
                </td>
                <td className="py-12">
                  <span className="text-xl font-light">≈ 0.93B Particles</span>
                </td>
                <td className="py-12 text-right">
                  <span className="text-sm font-light text-white/80 block">Weekly Shopping</span>
                  <span className="text-xs text-white/40 block">(Storage required)</span>
                </td>
              </tr>

              {/* 5 Gallon Jugs Row */}
              <tr className="border-b border-white/5">
                <td className="py-12 pr-8">
                  <span className="text-xl font-marcellus block mb-2">5 Gallon Jugs</span>
                  <span className="text-xs text-white/40 font-light block">18.9 L refillable</span>
                </td>
                <td className="py-12">
                  <span className="text-lg font-light">≈ AED 1,952</span>
                </td>
                <td className="py-12">
                  <span className="text-xl font-light block">≈ <span ref={counter2Ref}>0</span> Single-use Caps</span>
                </td>
                <td className="py-12">
                  <span className="text-xl font-light block">≈ 0.93B Particles</span>
                  <span className="text-xs text-white/40 block mt-1">(unless filtered)</span>
                </td>
                <td className="py-12 text-right">
                  <span className="text-sm font-light text-white/80 block">Truck Deliveries</span>
                  <span className="text-xs text-white/40 block">Jug storage</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ══ CHAPTER 4: THE TAKEOVER (Features Intro) ══ */}
      <section className="takeover-section relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#fffcf8]">
        <div className="takeover-card relative w-[85vw] h-[75vh] rounded-[60px] border border-black/5 overflow-hidden shadow-2xl flex items-center justify-center">

          <div className="absolute inset-0 z-0">
            <Image src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/03/Intelligent-Living-Tech.webp" alt="Tech" fill className="object-cover" />
            {/* LIGHTENED OVERLAY: Changed from solid 80% black to a softer gradient so the image pops */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#191817]/60 via-[#191817]/30 to-[#191817]/80 z-10" />
          </div>

          <div className="takeover-content opacity-0 relative z-20 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center mt-8">
            <span className="text-[#b69c6b] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
              The Standard of Refinement
            </span>

            <div className="mb-6">
              <h3 className="text-5xl md:text-[80px] lg:text-[100px] font-marcellus text-white leading-[0.9] tracking-tighter">
                Tréppan Living
              </h3>
            </div>

            {/* NEW CONTENT: Added a descriptive paragraph */}
            <p className="text-white/90 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-md">
              A unified ecosystem where intelligent technology, environmental responsibility, and resort-level wellness seamlessly integrate into your everyday life.
            </p>

            {/* NEW CONTENT: Added a 3-pillar summary grid to give the section more substance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/20 pt-10 w-full max-w-3xl">
              <div className="flex flex-col items-center">
                <span className="text-white text-xl font-serif mb-1">Intelligent</span>
                <span className="text-[#b69c6b] text-[10px] uppercase tracking-widest">Technology</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white text-xl font-serif mb-1">Sustainable</span>
                <span className="text-[#b69c6b] text-[10px] uppercase tracking-widest">Environment</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white text-xl font-serif mb-1">Holistic</span>
                <span className="text-[#b69c6b] text-[10px] uppercase tracking-widest">Wellbeing</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ CHAPTER 5: SMART LIVING FEATURES (Features 01-05) ══ */}
      <section className="bg-[#191817] py-32 md:py-48 px-4 sm:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="smart-stack-container relative w-full pb-[10vh]">
            {[
              {
                i: Wind,
                t: "Airocide Technology",
                sub: "Pure Air, Engineered for Life",
                d: "We spend 90% of our lives indoors — breathing air up to 5× more polluted than outside. At Tréppan Living, indoor air is scientifically designed and continuously optimized.",
                list: [
                  "NASA-based Airocide eliminates bacteria, viruses & mold spores",
                  "DDCV continuously regulates CO₂ and volatile compounds",
                  "Optimal humidity and temperature maintained year-round"
                ],
                img: "https://projects.fakhruddinproperties.com/treppan-living-prive-images/exterior/GeneralView07.webp"
              },
              {
                i: Droplets,
                t: "Hydration Systems",
                sub: "Pure Water, Responsibly Delivered",
                d: "Hydration shapes health. The quality of what we drink — and the waste it creates — matters just as much. Water at Tréppan is purified, enriched, and centrally delivered.",
                list: [
                  "Mineral-enriched, hydrogenated water at every tap",
                  "Advanced filtration reducing microplastic exposure",
                  "Eliminates bottled water dependency entirely"
                ],
                img: "https://projects.fakhruddinproperties.com/treppan-living-prive-images/interior/PRIVE-Apartment-units-Penthouse-Powder-room-view-01.webp"
              },
              {
                i: Leaf,
                t: "Environmental Practice",
                sub: "Sustainability in Daily Practice",
                d: "Sustainability works best when built into everyday living. Tréppan integrates measurable responsibility across energy, waste, water, and food production.",
                list: [
                  "30–40% energy efficiency through intelligent climate systems",
                  "On-site composting feeding landscape ecosystems",
                  "Hydroponic systems for local food cultivation"
                ],
                img: "https://projects.fakhruddinproperties.com/treppan-living-prive-images/interior/TL-PRIVE-Apartment-units-Penthouse-Living-room-view-03.webp"
              },
              {
                i: Cpu,
                t: "Tréppan Home Soul AI",
                sub: "Intelligent Living, Simplified",
                d: "Technology should remove friction, not create it. The unified AI ecosystem operates quietly — anticipating your needs before you voice them.",
                list: [
                  "Homes that learn your preferences automatically",
                  "Biometric & facial recognition for seamless access",
                  "AI-Powered robot delivery system"
                ],
                img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop"
              },
              {
                i: Coffee,
                t: "The Greenhouse Café",
                sub: "Community Wellbeing Spaces",
                d: "At the heart of Tréppan Living — a social, wellness-driven hub where residents connect, unwind, and engage with regenerative living concepts daily.",
                list: [
                  "Curated community events in shared spaces",
                  "On-site hydroponic greens grown fresh daily",
                  "Redeem loyalty points earned through positive choices"
                ],
                img: "https://projects.fakhruddinproperties.com/treppan-living-prive-images/aminities/TL-RPIVE-INDOOR-GYM.webp" // Reusing an amenity image placeholder
              },
            ].map((feat, i) => (
              <div
                key={i}
                className={`smart-stack-card relative w-full h-[80vh] md:h-[75vh] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.4)] border border-white/10 ${i > 0 ? 'mt-[100vh]' : ''}`}
              >
                <Image src={feat.img} alt={feat.t} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#191817]/80 to-transparent" />
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-[#fffcf8]">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-14 h-14 rounded-full border border-[#b69c6b]/40 backdrop-blur-md flex items-center justify-center bg-black/20">
                      <feat.i className="text-[#b69c6b] w-6 h-6" />
                    </div>
                    <span className="text-[#b69c6b] text-sm font-bold tracking-[0.3em] uppercase">0{i + 1}</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-marcellus tracking-tight mb-2">{feat.t}</h3>
                  <h4 className="text-[#b69c6b] text-xl font-light font-marcellus mb-6">{feat.sub}</h4>

                  <div className="w-full max-w-3xl grid md:grid-cols-2 gap-8 md:gap-16 items-end">
                    <p className="text-white/80 font-light text-lg leading-relaxed">{feat.d}</p>
                    <ul className="space-y-4">
                      {feat.list.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#b69c6b] shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base text-white/70 font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CHAPTER 6: CINEMATIC VISUAL TOUR (Living With Purpose Daily) ══ */}
      <section className="visual-tour-section relative h-screen w-full bg-[#0a0a0a] overflow-hidden">
        {/* Overlay Title that stays pinned on top */}
        <div className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 z-20 text-center w-full px-6 pointer-events-none">
          <span className="text-[#b69c6b] text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">Living With Purpose Daily</span>
          <h2 className="text-3xl md:text-5xl font-marcellus text-white tracking-tight">Conscious Choices, <span className="text-[#b69c6b]">Every Day</span></h2>
        </div>

        {/* Slide 1 */}
        <div className="tour-image absolute inset-0 z-0 will-change-transform">
          <Image src="https://projects.fakhruddinproperties.com/treppan-living-prive-images/exterior/GeneralView05-Bluehour.webp" alt="Urban Farming" fill className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        </div>
        <div className="tour-text absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 md:pb-32 text-center px-6 pointer-events-none">
          <span className="text-[#b69c6b] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">01 Urban Farming</span>
          <h3 className="text-5xl md:text-7xl font-marcellus text-white tracking-tight mb-6">Grow Your Own<br /><span className="text-[#b69c6b]">Indoor Herbs</span></h3>
          <p className="text-white/80 font-light max-w-xl mb-8">Functional greenhouses and hydroponic systems encourage local food cultivation right at home.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-white/60 uppercase tracking-widest max-w-3xl">
            <span>• Fresh produce without supermarkets</span>
            <span>• Community participation encouraged</span>
            <span>• Hydroponic technology integrated</span>
          </div>
          <span className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[#b69c6b] font-serif text-xl md:text-2xl">01 / 03</span>
        </div>

        {/* Slide 2 */}
        <div className="tour-image absolute inset-0 z-0 will-change-transform">
          <Image src="https://projects.fakhruddinproperties.com/treppan-living-prive-images/exterior/BalconyDusk02.webp" alt="Therapies" fill className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        </div>
        <div className="tour-text absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 md:pb-32 text-center px-6 pointer-events-none">
          <span className="text-[#b69c6b] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">02 Therapies</span>
          <h3 className="text-5xl md:text-7xl font-marcellus text-white tracking-tight mb-6">Biohacking<br /><span className="text-[#b69c6b]">Amenities</span></h3>
          <p className="text-white/80 font-light max-w-xl mb-8">Top-notch amenities that shape your health and offer longevity.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-white/60 uppercase tracking-widest max-w-3xl">
            <span>• Hyperbaric Oxygen Therapy</span>
            <span>• Red Light Therapy</span>
            <span>• Floatation Therapy and Cryotherapy</span>
          </div>
          <span className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[#b69c6b] font-serif text-xl md:text-2xl">02 / 03</span>
        </div>

        {/* Slide 3 */}
        <div className="tour-image absolute inset-0 z-0 will-change-transform">
          <Image src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/electricstation.png" alt="Mobility" fill className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        </div>
        <div className="tour-text absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 md:pb-32 text-center px-6 pointer-events-none">
          <span className="text-[#b69c6b] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">03 Mobility</span>
          <h3 className="text-5xl md:text-7xl font-marcellus text-white tracking-tight mb-6">Electric<br /><span className="text-[#b69c6b]">Mobility Hub</span></h3>
          <p className="text-white/80 font-light max-w-xl mb-8">EV charging integrated into community infrastructure — supporting sustainable transport seamlessly.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-white/60 uppercase tracking-widest max-w-3xl">
            <span>• EV charging stations throughout</span>
            <span>• Sustainable transport fully supported</span>
            <span>• Earns wellness loyalty points</span>
          </div>
          <span className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[#b69c6b] font-serif text-xl md:text-2xl">03 / 03</span>
        </div>
      </section>

      {/* ══ CHAPTER 7: OUTRO (Experience Tréppan Living) ══ */}
      <section className="outro-section relative max-w-7 min-h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">

        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="outro-bg-img absolute inset-0 w-full h-full will-change-transform">
            <Image
              src="https://projects.fakhruddinproperties.com/treppan-living-prive-images/exterior/GeneralView07.webp"
              alt="Experience Treppan Living"
              fill
              className="object-cover opacity-50"
            />
          </div>
          {/* Dramatic Gradients for Movie-Poster lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/10 via-[#0a0a0a]/0 to-[#191817]/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] opacity-70" />
        </div>

        {/* Content */}
        <div className="outro-content relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center">
          <span className="text-[#b69c6b] text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-8">
            The Next Chapter
          </span>

          <h2 className="text-5xl md:text-[80px] lg:text-[100px] font-serif text-white tracking-tighter leading-[0.9] mb-12">
            Experience <br />
            <span className="italic text-[#b69c6b]">Tréppan Living</span>
          </h2>

          <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-[#b69c6b] to-transparent mb-10" />

          <p className="text-white/80 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mb-8">
            Step into a lifestyle where wellbeing, thoughtful design, and intelligent living come together effortlessly.
          </p>

          <p className="text-[#b69c6b] text-xl md:text-3xl font-serif italic drop-shadow-lg">
            Discover a new way to live with balance, comfort, and purpose.
          </p>
        </div>
      </section>

      <GreenhousePremium />
    </div>
  );
}