'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wind, Droplets, Cpu, Leaf, ShieldCheck, Coffee } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TreppanStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for number counters
  const counter1Ref = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

      // ══ 1. HERO REVEAL & PARALLAX ══
      gsap.fromTo('.hero-text-elem',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );

      gsap.to('.hero-bg-wrapper', {
        scale: 0.9,
        opacity: 0.3,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // ══ 2. WATER INFOGRAPHIC (Counters & 3D Cards) ══
      ScrollTrigger.create({
        trigger: '.water-stats-section',
        start: 'top 70%',
        onEnter: () => {
          // Reveal Cards
          gsap.fromTo('.stat-card',
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'expo.out' }
          );

          // Animate Counters
          if (counter1Ref.current) {
            gsap.fromTo(counter1Ref.current, { innerHTML: 0 }, { innerHTML: 2580, duration: 2.5, ease: 'power3.out', snap: { innerHTML: 1 } });
          }
          if (counter2Ref.current) {
            gsap.fromTo(counter2Ref.current, { innerHTML: 0 }, { innerHTML: 205, duration: 2.5, ease: 'power3.out', snap: { innerHTML: 1 }, delay: 0.4 });
          }
        }
      });

      // ══ 3. VERTICAL PINNED SCROLLYTELLING ══
      const steps = gsap.utils.toArray('.story-text-block');
      const visuals: any = gsap.utils.toArray('.story-visual-media');

      // Initialize all media to invisible EXCEPT the first one
      gsap.set(visuals, { opacity: 0, scale: 1.05 });
      gsap.set(visuals[0], { opacity: 1, scale: 1 });

      steps.forEach((step: any, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            // Highlight active text, dim others
            gsap.to(step, { opacity: 1, duration: 0.5 });
            gsap.to(steps.filter(s => s !== step), { opacity: 0.2, duration: 0.5 });

            // Crossfade media
            gsap.to(visuals, { opacity: 0, scale: 1.05, duration: 0.8, ease: 'power2.inOut' });
            gsap.to(visuals[i], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.inOut' });
          },
          onEnterBack: () => {
            gsap.to(step, { opacity: 1, duration: 0.5 });
            gsap.to(steps.filter(s => s !== step), { opacity: 0.2, duration: 0.5 });

            gsap.to(visuals, { opacity: 0, scale: 1.05, duration: 0.8, ease: 'power2.inOut' });
            gsap.to(visuals[i], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.inOut' });
          },
        });
      });

      // ══ 4. GREENHOUSE CAFE OUTRO ══
      gsap.fromTo('.greenhouse-reveal',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'expo.out', scrollTrigger: { trigger: '.greenhouse-section', start: 'top 60%' } }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="font-sans bg-[#fffcf8] text-[#191817] selection:bg-[#b69c6b] selection:text-white">

      {/* Premium Texture Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.02] mix-blend-multiply bg-[url('https://api-eih.solvetude.com/uploads/dark_matter_90673ed870.png')]" />

      {/* ══ CHAPTER 1: CINEMATIC HERO ══ */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden bg-[#e0dcd3]">
        <div className="hero-bg-wrapper absolute inset-0 z-0 origin-center will-change-transform">
          <Image
            src="https://cdn-ilehell.nitrocdn.com/SQOQCxUDFIpvXLPQuxQlVxTUoPdlbjEY/assets/images/optimized/rev-212928e/www.fakhruddinproperties.com/wp-content/uploads/2026/03/JA-TL-Cover.webp"
            alt="John Abraham - Treppan Living"
            fill
            priority
            className="object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fffcf8] via-[#fffcf8]/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mt-32">
          <div className="overflow-hidden mb-8 flex justify-center">
            <p className="hero-text-elem text-[#b69c6b] tracking-[0.3em] uppercase text-[10px] md:text-xs font-semibold flex items-center gap-4">
              <span className="w-8 md:w-12 h-[1px] bg-[#b69c6b]/40"></span>
              John Abraham • Global Ambassador
              <span className="w-8 md:w-12 h-[1px] bg-[#b69c6b]/40"></span>
            </p>
          </div>

          <h1 className="hero-text-elem text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-light leading-[1] text-[#191817] tracking-tight mb-2">
            Where Conscious
          </h1>
          <h1 className="hero-text-elem text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-light leading-[1] italic text-[#b69c6b] tracking-tight mb-12">
            Living Finds Home.
          </h1>

          <p className="hero-text-elem text-base md:text-lg text-[#7a6a58] max-w-2xl mx-auto font-light leading-relaxed">
            A place where wellbeing, environmental responsibility, and intelligent technology converge — so everyday life feels lighter, healthier, more meaningful.
          </p>
        </div>
      </section>

      {/* ══ CHAPTER 2: WATER INFOGRAPHIC (Counters & Cards) ══ */}
      <section className="water-stats-section py-32 md:py-48 px-4 sm:px-8 md:px-16 bg-[#fffcf8] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">

          <div className="text-center mb-24 md:mb-32">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-[#191817] tracking-tight">Rethink Your Water.</h2>
            <p className="text-[#7a6a58] text-lg md:text-xl max-w-2xl mx-auto font-light">The hidden costs of hydration, visually compared per year.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 items-center">
            {/* Competitor 1 */}
            <div className="stat-card opacity-0 bg-[#f9f8f6] border border-[#191817]/5 p-10 md:p-12 flex flex-col items-center text-center shadow-sm">
              <p className="text-[#191817]/40 uppercase tracking-[0.2em] text-[10px] mb-8 font-semibold">Single-Use Bottled (1.5L)</p>
              <div className="text-6xl md:text-7xl font-light tracking-tighter text-[#191817] mb-2 flex items-center">
                <span ref={counter1Ref}>0</span>
              </div>
              <p className="text-[#b69c6b] mb-10 font-serif italic text-xl">Bottles Wasted</p>
              <ul className="text-sm text-[#7a6a58] space-y-5 w-full text-left font-light tracking-wide">
                <li className="flex justify-between border-b border-[#191817]/5 pb-3"><span>Cost</span> <span className="text-[#191817] font-medium">≈ AED 4,620</span></li>
                <li className="flex justify-between border-b border-[#191817]/5 pb-3"><span>Nanoplastics</span> <span className="text-[#191817] font-medium">0.93B Particles</span></li>
                <li className="flex justify-between pb-3"><span>Logistics</span> <span className="text-[#191817] font-medium">Weekly Storage</span></li>
              </ul>
            </div>

            {/* Treppan (The Hero) */}
            <div className="stat-card opacity-0 bg-white border border-[#b69c6b]/30 p-12 md:p-16 flex flex-col items-center text-center relative transform shadow-[0_40px_80px_rgba(182,156,107,0.15)] z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#191817] text-[#fffcf8] text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 shadow-xl whitespace-nowrap">The Tréppan Standard</div>
              <p className="text-[#b69c6b] uppercase tracking-[0.2em] text-[10px] mb-8 mt-4 font-semibold">Hydrogenated System</p>
              <div className="text-7xl md:text-[100px] font-light tracking-tighter text-[#191817] leading-none mb-4">
                <span>0</span>
              </div>
              <p className="text-[#b69c6b] mb-10 font-serif italic text-2xl">Plastic. Zero Particles.</p>
              <ul className="text-sm text-[#191817] space-y-5 w-full text-left font-light tracking-wide">
                <li className="flex justify-between border-b border-[#191817]/10 pb-3"><span className="text-[#7a6a58]">Cost</span> <span className="font-semibold text-[#b69c6b]">Included</span></li>
                <li className="flex justify-between border-b border-[#191817]/10 pb-3"><span className="text-[#7a6a58]">Nanoplastics</span> <span className="font-semibold text-[#b69c6b]">0 Particles</span></li>
                <li className="flex justify-between pb-3"><span className="text-[#7a6a58]">Source</span> <span className="font-medium">Direct Tap Supply</span></li>
              </ul>
            </div>

            {/* Competitor 2 */}
            <div className="stat-card opacity-0 bg-[#f9f8f6] border border-[#191817]/5 p-10 md:p-12 flex flex-col items-center text-center shadow-sm">
              <p className="text-[#191817]/40 uppercase tracking-[0.2em] text-[10px] mb-8 font-semibold">5 Gallon Jugs (18.9L)</p>
              <div className="text-6xl md:text-7xl font-light tracking-tighter text-[#191817] mb-2">
                <span ref={counter2Ref}>0</span>
              </div>
              <p className="text-[#b69c6b] mb-10 font-serif italic text-xl">Single-Use Caps</p>
              <ul className="text-sm text-[#7a6a58] space-y-5 w-full text-left font-light tracking-wide">
                <li className="flex justify-between border-b border-[#191817]/5 pb-3"><span>Cost</span> <span className="text-[#191817] font-medium">≈ AED 1,952</span></li>
                <li className="flex justify-between border-b border-[#191817]/5 pb-3"><span>Nanoplastics</span> <span className="text-[#191817] font-medium">0.93B Particles</span></li>
                <li className="flex justify-between pb-3"><span>Logistics</span> <span className="text-[#191817] font-medium">Truck Deliveries</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CHAPTER 3: VERTICAL PINNED SCROLLYTELLING ══ */}
      {/* How it works: 
        The parent wrapper uses flex. 
        The Left div is 'sticky h-screen' (it stays glued to the screen).
        The Right div contains tall blocks of text. As you scroll down the text, the left images change.
      */}
      <section className="relative w-full flex flex-col md:flex-row bg-[#fffcf8]">

        {/* Sticky Visuals (Left side on Desktop, Fixed Background on Mobile) */}
        <div className="w-full md:w-1/2 h-[100svh] sticky top-0 overflow-hidden bg-[#e0dcd3] z-0">

          {/* Air Video/Image */}
          <div className="story-visual-media absolute inset-0 will-change-transform">
            <video src="https://cdn.coverr.co/videos/coverr-ai-generated-aerial-view-of-a-dubai-like-modern-cityscape/720p.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60" />
          </div>

          {/* Water Video/Image */}
          <div className="story-visual-media absolute inset-0 will-change-transform">
            <Image src="https://images.unsplash.com/photo-1544252890-09a2baf4ea94?q=80&w=2070&auto=format&fit=crop" alt="Pure Water" fill className="object-cover opacity-90" />
          </div>

          {/* Tech Video/Image */}
          <div className="story-visual-media absolute inset-0 will-change-transform">
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069&auto=format&fit=crop" alt="Smart Home" fill className="object-cover opacity-90" />
          </div>

          {/* Sustainability Video/Image */}
          <div className="story-visual-media absolute inset-0 will-change-transform">
            <Image src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop" alt="Sustainability" fill className="object-cover opacity-90" />
          </div>

          {/* Gradient to blend smoothly into the text area */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fffcf8] to-transparent z-10" />
          <div className="md:hidden absolute inset-0 bg-[#fffcf8]/90 z-10 backdrop-blur-md" />
        </div>

        {/* Scrolling Text Blocks (Right side) */}
        <div className="w-full md:w-1/2 relative z-10">

          {/* Step 1: Pure Air */}
          <div className="story-text-block min-h-[100svh] flex flex-col justify-center px-8 md:px-24 py-32 opacity-20 transition-opacity duration-700">
            <Wind className="text-[#b69c6b] w-10 h-10 mb-8" />
            <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-[1.05] text-[#191817] tracking-tight">Pure Air,<br /><span className="italic text-[#b69c6b]">Engineered.</span></h2>
            <p className="text-lg md:text-xl text-[#7a6a58] mb-12 font-light leading-relaxed max-w-xl">
              We spend nearly 90% of our lives indoors. At Tréppan Living, indoor air is not left to chance.
            </p>
            <div className="h-[1px] w-full max-w-md bg-[#191817]/10 mb-12" />
            <ul className="space-y-8 font-light tracking-wide text-[#191817] max-w-xl">
              <li className="flex items-start gap-6"><span className="text-[#b69c6b] text-xs mt-1 font-semibold tracking-widest">01</span><span className="leading-relaxed text-sm md:text-base">NASA-based Airocide technology actively eliminates viruses and mold.</span></li>
              <li className="flex items-start gap-6"><span className="text-[#b69c6b] text-xs mt-1 font-semibold tracking-widest">02</span><span className="leading-relaxed text-sm md:text-base">Continuous regulation of CO₂ and volatile organic compounds (VOCs).</span></li>
              <li className="flex items-start gap-6"><span className="text-[#b69c6b] text-xs mt-1 font-semibold tracking-widest">03</span><span className="leading-relaxed text-sm md:text-base">Distributed Demand Controlled Ventilation optimizes humidity.</span></li>
            </ul>
          </div>

          {/* Step 2: Pure Water */}
          <div className="story-text-block min-h-[100svh] flex flex-col justify-center px-8 md:px-24 py-32 opacity-20 transition-opacity duration-700">
            <Droplets className="text-[#b69c6b] w-10 h-10 mb-8" />
            <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-[1.05] text-[#191817] tracking-tight">Water,<br /><span className="italic text-[#b69c6b]">Naturally Pure.</span></h2>
            <p className="text-lg md:text-xl text-[#7a6a58] mb-12 font-light leading-relaxed max-w-xl">
              Hydration shapes health. But the quality of what we drink, and the waste it creates, matter just as much.
            </p>
            <div className="h-[1px] w-full max-w-md bg-[#191817]/10 mb-12" />
            <ul className="space-y-8 font-light tracking-wide text-[#191817] max-w-xl">
              <li className="flex items-start gap-6"><span className="text-[#b69c6b] text-xs mt-1 font-semibold tracking-widest">01</span><span className="leading-relaxed text-sm md:text-base">Mineral-enriched, hydrogenated drinking water direct to your tap.</span></li>
              <li className="flex items-start gap-6"><span className="text-[#b69c6b] text-xs mt-1 font-semibold tracking-widest">02</span><span className="leading-relaxed text-sm md:text-base">Advanced filtration eliminates microplastic exposure.</span></li>
              <li className="flex items-start gap-6"><span className="text-[#b69c6b] text-xs mt-1 font-semibold tracking-widest">03</span><span className="leading-relaxed text-sm md:text-base">Zero dependency on bottled water, ending plastic waste at home.</span></li>
            </ul>
          </div>

          {/* Step 3: Tech */}
          <div className="story-text-block min-h-[100svh] flex flex-col justify-center px-8 md:px-24 py-32 opacity-20 transition-opacity duration-700">
            <Cpu className="text-[#b69c6b] w-10 h-10 mb-8" />
            <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-[1.05] text-[#191817] tracking-tight">Intelligence,<br /><span className="italic text-[#b69c6b]">Simplified.</span></h2>
            <p className="text-lg md:text-xl text-[#7a6a58] mb-12 font-light leading-relaxed max-w-xl">
              Technology should remove friction, not create it. Built on a unified AI ecosystem, Tréppan Home Soul operates quietly in the background.
            </p>
            <div className="h-[1px] w-full max-w-md bg-[#191817]/10 mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              <div className="bg-[#f9f8f6] p-8 border border-[#191817]/5">
                <ShieldCheck className="w-6 h-6 text-[#b69c6b] mb-4" />
                <h4 className="text-[#191817] font-serif text-2xl mb-2">Biometric Access</h4>
                <p className="text-sm text-[#7a6a58] font-light leading-relaxed">Facial recognition for secure, keyless entry throughout the premises.</p>
              </div>
              <div className="bg-[#f9f8f6] p-8 border border-[#191817]/5">
                <Leaf className="w-6 h-6 text-[#b69c6b] mb-4" />
                <h4 className="text-[#191817] font-serif text-2xl mb-2">Climate AI</h4>
                <p className="text-sm text-[#7a6a58] font-light leading-relaxed">Homes that learn and automatically adapt to your lighting and climate preferences.</p>
              </div>
            </div>
          </div>

          {/* Step 4: Sustainability */}
          <div className="story-text-block min-h-[100svh] flex flex-col justify-center px-8 md:px-24 py-32 opacity-20 transition-opacity duration-700">
            <Leaf className="text-[#b69c6b] w-10 h-10 mb-8" />
            <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-[1.05] text-[#191817] tracking-tight">Sustainability,<br /><span className="italic text-[#b69c6b]">Built In.</span></h2>
            <p className="text-lg md:text-xl text-[#7a6a58] mb-12 font-light leading-relaxed max-w-xl">
              Sustainability at Tréppan is not a feature — it is the foundation. Transparent monitoring of every kilowatt and litre.
            </p>
            <div className="h-[1px] w-full max-w-md bg-[#191817]/10 mb-12" />
            <ul className="space-y-8 font-light tracking-wide text-[#191817] max-w-xl">
              <li className="flex items-start gap-6"><span className="text-[#b69c6b] text-xs mt-1 font-semibold tracking-widest">01</span><span className="leading-relaxed text-sm md:text-base">30–40% lower energy use through intelligent insulation.</span></li>
              <li className="flex items-start gap-6"><span className="text-[#b69c6b] text-xs mt-1 font-semibold tracking-widest">02</span><span className="leading-relaxed text-sm md:text-base">Circular waste composting that feeds the building's own greenhouses.</span></li>
            </ul>
          </div>

        </div>
      </section>

      {/* ══ CHAPTER 4: THE GREENHOUSE CAFE ══ */}
      <section className="greenhouse-section relative min-h-screen flex items-center justify-center overflow-hidden py-32 md:py-48 bg-[#f9f8f6]">
        <div className="absolute inset-0 z-0">
          <video src="https://cdn.coverr.co/videos/coverr-walking-through-a-greenhouse-5293/1080p.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f9f8f6] via-[#f9f8f6]/70 to-[#f9f8f6]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Coffee className="greenhouse-reveal w-12 h-12 text-[#b69c6b] mx-auto mb-10" />
          <h2 className="greenhouse-reveal text-6xl md:text-8xl lg:text-[100px] font-serif text-[#191817] tracking-tight mb-6">The Greenhouse Café.</h2>
          <p className="greenhouse-reveal text-2xl md:text-4xl text-[#b69c6b] font-serif max-w-4xl mx-auto mb-24 italic leading-relaxed">
            "A garden on a hill. Where regenerative living meets daily connection."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { title: "Radiant Cooling", desc: "Ensuring perfect comfort with lower energy use, free from the harshness of artificial AC." },
              { title: "On-Site Hydroponics", desc: "Pluck fresh produce directly from our indoor greens, reducing reliance on commercial supermarkets." },
              { title: "The Redemption Hub", desc: "Earn loyalty points for sustainable habits and redeem them here for coffee, snacks, and experiences." }
            ].map((item, i) => (
              <div key={i} className="greenhouse-reveal border-l border-[#b69c6b]/30 pl-8">
                <span className="text-[#b69c6b] text-[10px] uppercase tracking-[0.2em] block mb-4 font-semibold">0{i + 1}</span>
                <h4 className="text-3xl font-serif text-[#191817] mb-4">{item.title}</h4>
                <p className="text-[#7a6a58] text-base md:text-lg font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="greenhouse-reveal mt-24">
            <a href="https://www.fakhruddinproperties.com/projects/" className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#fffcf8] bg-[#191817] px-12 py-5 hover:bg-[#b69c6b] transition-colors duration-300">
              View All Projects
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}