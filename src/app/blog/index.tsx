// app/blog/index.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS & COLORS
// ─────────────────────────────────────────────────────────────
const PRIMARY = "#A1997F";
const PALE_SILVER = "#C4C7B5";
const MSU_GREEN = "#154741";
const CHINESE_BLACK = "#06191A";
const DEEP_AQUAMARINE = "#408174";
const WHITE = "#FFFFFF";

// ─────────────────────────────────────────────────────────────
// BLOG DATA
// ─────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 1,
    slug: "future-of-luxury-real-estate-dubai",
    title: "The Future of Luxury Real Estate in Dubai",
    excerpt: "Explore how technology, sustainability, and wellness are reshaping Dubai's luxury property market.",
    content: `
      <p>Dubai's luxury real estate market is undergoing a remarkable transformation, driven by evolving buyer preferences and technological advancements. The days of simply offering opulent finishes and prime locations are behind us. Today's discerning buyers seek properties that integrate seamlessly with their lifestyle, prioritize wellness, and embrace sustainable technologies.</p>
      
      <h2>The Rise of Wellness-Centric Living</h2>
      <p>Wellness has become a cornerstone of luxury real estate. Developments like Tréppan Serenique are leading this charge with comprehensive wellness amenities including hyperbaric oxygen therapy, flotation therapy, and dedicated meditation zones. Buyers are no longer just purchasing a home; they're investing in a holistic lifestyle that supports their physical and mental wellbeing.</p>
      
      <h2>Smart Technology Integration</h2>
      <p>AI-enabled infrastructure is no longer a novelty but a necessity. From smart robot delivery systems to intelligent climate control, technology is creating seamless living experiences. Properties that embrace these innovations are seeing stronger demand from tech-savvy buyers who value convenience and efficiency.</p>
      
      <h2>Sustainability as Standard</h2>
      <p>Environmental consciousness has moved from a niche consideration to a mainstream requirement. Luxury developers are incorporating sustainable materials, energy-efficient systems, and green spaces into their projects. This shift reflects a broader understanding that true luxury must be responsible and forward-thinking.</p>
      
      <h2>Location Reimagined</h2>
      <p>While prime locations like Dubai Marina and Downtown remain highly desirable, we're seeing increased interest in areas that offer a balance of connectivity and tranquility. Projects positioned near the coast with easy access to city amenities are particularly attractive to buyers seeking the best of both worlds.</p>
      
      <p>The future of Dubai's luxury real estate lies in properties that can deliver on multiple fronts: wellness, technology, sustainability, and location. As developers continue to innovate, buyers can expect even more sophisticated offerings that cater to their evolving needs and aspirations.</p>
    `,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/03/How-Innovation-and-Compliance-Shape-Our-Community-Future.webp",
    date: "2024-03-15",
  },
  {
    id: 2,
    slug: "wellness-amenities-transforming-property-value",
    title: "How Wellness Amenities Are Transforming Property Value",
    excerpt: "Discover why wellness-focused developments are commanding premium prices and attracting discerning buyers.",
    content: `
      <p>The real estate landscape is witnessing a paradigm shift where wellness amenities are no longer considered nice-to-have additions but essential value drivers. Properties that prioritize health and wellbeing are consistently outperforming traditional developments in both value appreciation and buyer demand.</p>
      
      <h2>The Wellness Premium</h2>
      <p>Research indicates that properties with comprehensive wellness amenities command premiums of 10-15% compared to similar properties without these features. This wellness premium reflects the growing recognition that health-focused living environments contribute significantly to quality of life.</p>
      
      <h2>Beyond Traditional Amenities</h2>
      <p>Today's wellness offerings go far beyond a standard gym or swimming pool. Forward-thinking developments are incorporating cryotherapy chambers, red light therapy rooms, salt brick saunas, and dedicated meditation spaces. These specialized amenities create unique value propositions that differentiate properties in competitive markets.</p>
      
      <h2>Long-Term Value Creation</h2>
      <p>Wellness amenities contribute to sustained property value through multiple channels. They reduce the need for external wellness services, create community engagement opportunities, and position properties as holistic living solutions rather than just physical spaces. This comprehensive approach resonates strongly with buyers who view their homes as sanctuaries.</p>
      
      <h2>Investment Implications</h2>
      <p>For investors, properties with strong wellness offerings represent compelling opportunities. The combination of premium pricing, strong rental demand, and appreciation potential makes these properties attractive additions to any portfolio. As awareness of wellness benefits continues to grow, this trend is likely to strengthen further.</p>
      
      <p>As the market continues to evolve, wellness amenities will increasingly become standard expectations rather than differentiators. Developers who embrace this shift early are positioning themselves for success in the new era of luxury real estate.</p>
    `,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Investor-Awareness-Stage-706x510.webp",
    date: "2024-03-10",
  },
  {
    id: 3,
    slug: "dubai-real-estate-investment-2025",
    title: "Dubai Real Estate Investment Outlook 2025",
    excerpt: "Key trends and opportunities shaping Dubai's property market in the coming year.",
    content: `
      <p>As we look toward 2025, Dubai's real estate market presents compelling opportunities for investors and homeowners alike. The emirate's continued evolution as a global hub for business, tourism, and innovation creates a strong foundation for sustained property market growth.</p>
      
      <h2>Emerging Investment Hotspots</h2>
      <p>While traditional areas maintain their appeal, new developments along Dubai's coastline are capturing significant attention. Areas offering beachfront living combined with innovative amenities are seeing particularly strong interest from international buyers seeking unique lifestyle propositions.</p>
      
      <h2>Market Drivers</h2>
      <p>Several factors are fueling Dubai's property market momentum. The city's successful handling of global challenges has enhanced its reputation for stability and safety. Continued economic diversification, progressive visa policies, and world-class infrastructure development create an environment conducive to long-term property investment.</p>
      
      <h2>Sector-Specific Opportunities</h2>
      <p>Luxury residential continues to perform strongly, with demand outstripping supply in key segments. The wellness-focused living sector represents a particularly dynamic opportunity, as buyers increasingly prioritize properties that support their health and wellbeing goals.</p>
      
      <h2>Looking Forward</h2>
      <p>Dubai's real estate market is well-positioned for continued growth. The combination of strong fundamentals, innovative development approaches, and increasing global interest creates an optimistic outlook for the coming years. Investors who identify emerging trends early will be best positioned to capitalize on market opportunities.</p>
      
      <p>The key to success in Dubai's evolving market lies in understanding the shifting preferences of modern buyers and aligning investments with these trends. Wellness, technology integration, and sustainability will continue to shape the future of luxury living in the emirate.</p>
    `,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/End-User-Interest-720x510.webp",
    date: "2024-03-05",
  },
  {
    id: 4,
    slug: "sustainable-living-dubai-developments",
    title: "Sustainable Living: Dubai's Green Development Revolution",
    excerpt: "How eco-friendly practices are becoming central to Dubai's luxury real estate.",
    content: `
      <p>Sustainability has emerged as a defining feature of Dubai's next generation of luxury developments. The integration of eco-friendly practices and green technologies is no longer an afterthought but a fundamental design principle shaping how properties are conceived and constructed.</p>
      
      <h2>Beyond Green Building Certifications</h2>
      <p>While certifications remain important, the focus has shifted to holistic sustainability approaches that consider environmental impact, resource efficiency, and long-term operational performance. Developers are incorporating everything from solar energy systems to water recycling technologies.</p>
      
      <h2>Biophilic Design Elements</h2>
      <p>Connecting residents with nature has become a priority in luxury development. Features like green walkways, bamboo oxygen parks, and hydroponic gardens bring natural elements into daily life while supporting environmental goals. These features also contribute significantly to resident wellbeing.</p>
      
      <h2>Energy Efficiency Innovations</h2>
      <p>Smart building systems that optimize energy use without compromising comfort are becoming standard in premium developments. AI-enabled infrastructure can reduce energy consumption by 20-30% while maintaining optimal living conditions, delivering both environmental and financial benefits.</p>
      
      <h2>The Economic Case for Sustainability</h2>
      <p>Beyond environmental considerations, sustainable properties make strong economic sense. Lower utility costs, reduced maintenance requirements, and growing buyer preference for green homes all contribute to strong investment performance. As awareness grows, the sustainability premium is likely to increase.</p>
      
      <p>Dubai's commitment to sustainability positions its real estate market for long-term success. Developers who embrace these principles are creating properties that will retain their appeal and value as environmental considerations become increasingly central to buyer decisions.</p>
    `,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/End-User-Awareness.webp",
    date: "2024-02-28",
  },
  {
    id: 5,
    slug: "ai-smart-homes-real-estate",
    title: "AI and Smart Homes: The Next Frontier in Real Estate",
    excerpt: "How artificial intelligence is revolutionizing the way we live and interact with our homes.",
    content: `
      <p>Artificial intelligence is transforming the residential experience, moving beyond simple automation to create genuinely intelligent living environments. Smart homes are evolving into responsive spaces that anticipate resident needs and optimize living conditions automatically.</p>
      
      <h2>The Rise of Predictive Systems</h2>
      <p>Modern AI systems learn from resident behaviors to predict preferences and automate routine tasks. From lighting and temperature adjustments to security protocols and maintenance alerts, these systems create seamless living experiences that enhance comfort and convenience.</p>
      
      <h2>Smart Robot Delivery Systems</h2>
      <p>Innovative properties are incorporating robotic delivery systems that handle everything from package reception to food delivery. These systems represent the convergence of convenience and technology, adding tangible value to residents' daily lives.</p>
      
      <h2>Enhanced Security and Safety</h2>
      <p>AI-powered security systems offer unprecedented levels of protection. Advanced facial recognition, anomaly detection, and integrated emergency response systems provide residents with peace of mind while maintaining privacy and convenience.</p>
      
      <h2>Future Possibilities</h2>
      <p>As AI technology continues to evolve, the possibilities for smart homes expand. Predictive maintenance that prevents issues before they occur, energy optimization that reduces costs while maintaining comfort, and personalized environmental controls are just the beginning of what's possible.</p>
      
      <p>Properties that embrace AI and smart technology are positioning themselves at the forefront of residential innovation. For buyers seeking cutting-edge living experiences, these properties represent the future of luxury living today.</p>
    `,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/Broker-Awareness-Serenique.webp",
    date: "2024-02-20",
  },
  {
    id: 6,
    slug: "coastal-living-dubai-beachfront-properties",
    title: "Coastal Living: The Allure of Dubai's Beachfront Properties",
    excerpt: "Why Dubai's coastline continues to attract discerning buyers from around the world.",
    content: `
      <p>Dubai's coastline represents one of the world's most desirable residential locations, combining natural beauty with unparalleled urban amenities. Beachfront properties in the emirate continue to attract strong interest from international buyers seeking the ultimate in luxury living.</p>
      
      <h2>The Enduring Appeal of Waterfront Living</h2>
      <p>Properties with direct sea views and beach access consistently command premium valuations. The combination of scenic beauty, recreational opportunities, and the tranquility of coastal environments creates compelling living experiences that resonate with discerning buyers.</p>
      
      <h2>Integrated Community Concepts</h2>
      <p>Modern coastal developments like Tréppan Serenique offer more than just waterfront residences. These integrated communities combine residential spaces with comprehensive amenities, creating self-contained environments where residents can live, work, and play without leaving the community.</p>
      
      <h2>Investment Performance</h2>
      <p>Beachfront properties in prime Dubai locations have demonstrated strong appreciation over time. The limited supply of coastal land combined with consistent international demand creates favorable conditions for long-term value growth.</p>
      
      <h2>The Wellness Connection</h2>
      <p>Coastal living supports the wellness focus that characterizes modern luxury real estate. Access to beaches, coastal walks, and sea views contributes to resident wellbeing, adding another dimension to the value proposition of these properties.</p>
      
      <p>As Dubai continues to develop its coastline, opportunities for beachfront living will remain among the most sought-after in the global luxury market. For buyers seeking the ultimate in residential experiences, these properties represent the pinnacle of what the city has to offer.</p>
    `,
    image: "https://www.fakhruddinproperties.com/wp-content/uploads/2026/01/imgedm-01.webp",
    date: "2024-02-15",
  },
];

// ─────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────
function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 2V6M16 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 11H6C6 8.5 7.5 6 10 6V11ZM10 11V18H4V12H10ZM18 11H14C14 8.5 15.5 6 18 6V11ZM18 11V18H12V12H18Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// CREATIVE HERO SECTION WITH ANIMATED BACKGROUND
// ─────────────────────────────────────────────────────────────
function BlogHero() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".blog-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".blog-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .fromTo(".blog-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");

    gsap.to(contentRef.current, {
      y: -40, opacity: 0, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.2 },
    });
  }, { scope: ref });

  // Animated particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(161, 153, 127, ${p.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={ref} className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${MSU_GREEN} 0%, ${DEEP_AQUAMARINE} 100%)` }} />
      
      {/* Animated particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Floating circles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              background: `radial-gradient(circle, ${PRIMARY}20, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 flex justify-center"
          >
            <QuoteIcon />
          </motion.div>
          
          <h1 className="blog-title font-faculty text-5xl md:text-6xl lg:text-7xl text-white mb-5 opacity-0">
            Insights & Stories
          </h1>
          <div className="blog-line w-20 h-[2px] mx-auto mb-6 origin-center" style={{ background: PRIMARY, transform: "scaleX(0)" }} />
          <p className="blog-sub text-white/80 text-lg md:text-xl max-w-2xl mx-auto opacity-0">
            Discover the latest insights, trends, and stories from the world of luxury real estate
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12" style={{ background: `linear-gradient(to bottom, ${PRIMARY}, transparent)` }} />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 3D BLOG CARD COMPONENT
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// 3D BLOG CARD COMPONENT - WITH EQUAL HEIGHTS
// ─────────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: typeof BLOG_POSTS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full" // Add h-full to the motion div
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer transition-all duration-300 h-full" // Add h-full here too
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out',
        }}
      >
        <Link href={`/blog/${post.slug}`} className="block h-full"> {/* Add block and h-full to Link */}
          <div
            className="relative overflow-hidden rounded-2xl bg-white flex flex-col h-full" // Add flex flex-col h-full
            style={{
              boxShadow: '0 20px 35px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02)',
              transform: 'translateZ(20px)',
            }}
          >
            {/* Image Container with fixed height */}
            <div className="relative overflow-hidden h-64 flex-shrink-0"> {/* Add flex-shrink-0 */}
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Date Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-xs shadow-lg" style={{ color: MSU_GREEN }}>
                <CalendarIcon />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            
            {/* Content - will grow to fill remaining space */}
            <div className="p-6 flex flex-col flex-grow"> {/* Add flex flex-col flex-grow */}
              <h3 className="font-faculty text-xl md:text-2xl mb-3 transition-colors duration-300 group-hover" 
                  style={{ color: MSU_GREEN }}>
                {post.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-grow"> {/* Add flex-grow */}
                {post.excerpt}
              </p>
              
              <div className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3 group-hover:translate-x-1 mt-auto" // Add mt-auto to push to bottom
                   style={{ color: PRIMARY }}>
                Read More
                <ArrowRightIcon />
              </div>
            </div>
            
            {/* 3D Shadow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{
                   boxShadow: `0 30px 50px -20px ${PRIMARY}40, 0 0 0 2px ${PRIMARY}20 inset`,
                 }} 
            />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN BLOG LISTING PAGE
// ─────────────────────────────────────────────────────────────
export default function BlogListingPage() {
  return (
    <main style={{ background: CHINESE_BLACK }}>
      <Navbar />
      <BlogHero />
      
      <section className="relative w-full py-24 md:py-32" style={{ background: WHITE }}>
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {BLOG_POSTS.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}