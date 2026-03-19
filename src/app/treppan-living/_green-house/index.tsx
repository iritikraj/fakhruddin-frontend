'use client';

import { useState } from 'react';
import { Coffee, Sprout, Wind, Zap, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const FEATURES = [
  {
    id: '01',
    title: 'Hydro-Harvesting',
    desc: 'Automated vertical farms producing organic greens.',
    detail: 'Residents can harvest fresh produce daily using their integrated Home Soul AI profile.',
    icon: Sprout
  },
  {
    id: '02',
    title: 'Regenerative Economy',
    desc: 'A social point system rewarding conscious choices.',
    detail: 'Earn credits for waste recycling and energy conservation to spend at the cafe.',
    icon: Zap
  },
  {
    id: '03',
    title: 'NASA-Grade Air',
    desc: 'Medical-grade purification for a pristine sanctuary.',
    detail: 'Airocide technology removes 99.9% of pathogens and VOCs from the social space.',
    icon: Wind
  }
];

export default function GreenhousePremium() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-40 md:py-64 px-6 bg-[#fffcf8] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <Coffee className="text-[#b69c6b] w-12 h-12 mb-10" />
            <h2 className="text-7xl md:text-[140px] font-serif tracking-tighter leading-[0.85] mb-8">
              The Living <br /> <span className="italic text-[#b69c6b]">Sanctuary.</span>
            </h2>
          </div>
          <p className="text-[#7a6a58] text-xl font-light leading-relaxed max-w-sm pb-4">
            A social heart engineered for restoration, where the building’s circularity becomes a tangible experience.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Feature List */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-0">
            {FEATURES.map((feature, idx) => (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveFeature(idx)}
                className={`group relative py-12 border-t border-[#191817]/10 cursor-pointer transition-all duration-700 ${idx === FEATURES.length - 1 ? 'border-b' : ''}`}
              >
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 h-[2px] bg-[#b69c6b] transition-all duration-700 ease-expo ${activeFeature === idx ? 'w-full' : 'w-0'}`} />

                <div className="flex items-start justify-between pr-8">
                  <div className="flex gap-8">
                    <span className={`text-[10px] font-bold tracking-widest mt-1 transition-colors duration-500 ${activeFeature === idx ? 'text-[#b69c6b]' : 'text-[#191817]/30'}`}>
                      {feature.id}
                    </span>
                    <div>
                      <h4 className={`text-3xl font-serif mb-4 transition-all duration-500 ${activeFeature === idx ? 'translate-x-4 italic' : ''}`}>
                        {feature.title}
                      </h4>
                      <p className={`text-sm text-[#7a6a58] font-light max-w-xs transition-opacity duration-700 ${activeFeature === idx ? 'opacity-100' : 'opacity-40'}`}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                  <feature.icon className={`w-6 h-6 transition-all duration-700 ${activeFeature === idx ? 'text-[#b69c6b] rotate-12 scale-125' : 'text-[#191817]/20'}`} />
                </div>

                {/* Expanded Detail */}
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activeFeature === idx ? 'max-h-40 mt-8' : 'max-h-0'}`}>
                  <p className="pl-16 text-sm text-[#191817] leading-relaxed italic border-l-2 border-[#b69c6b]/30 ml-10">
                    {feature.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Immersive Image Layer */}
          <div className="lg:col-span-7 relative h-[600px] md:h-[800px] rounded-[40px] overflow-hidden group">
            <div className="absolute inset-0 transition-transform duration-[2s] ease-out scale-105 group-hover:scale-100">
              <Image
                src="https://www.fakhruddinproperties.com/wp-content/uploads/2025/04/electricstation.png"
                alt="Greenhouse Detail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#191817]/80 via-transparent to-transparent" />
            </div>

            {/* Floating UI Elements over image */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-white">
              <div>
                <span className="text-[#b69c6b] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Current Harvest</span>
                <span className="text-3xl font-serif italic">Wild Arugula & Basil</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#b69c6b] transition-all duration-500 cursor-pointer">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}