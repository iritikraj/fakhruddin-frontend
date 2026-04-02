// app/privacy-policy/page.tsx
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
// SVG ICONS
// ─────────────────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
// PRIVACY POLICY CONTENT (Dynamic HTML)
// ─────────────────────────────────────────────────────────────
const PRIVACY_POLICY_CONTENT = `
  <p class="lead">At Fakhruddin Properties, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
  <br>
  <h2>1. Information We Collect</h2>
  <p>We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on our website, or otherwise contact us. The personal information we collect may include:</p>
  <ul>
    <li><strong>Personal Identifiers:</strong> Name, email address, phone number, mailing address, and similar contact information.</li>
    <li><strong>Property Preferences:</strong> Information about your real estate interests, budget, preferred locations, and property requirements.</li>
    <li><strong>Transaction Information:</strong> Details about properties you have inquired about or transactions you have engaged in.</li>
    <li><strong>Technical Data:</strong> IP address, browser type, operating system, device information, and browsing behavior on our website.</li>
  </ul>
  <br>
  <h2>2. How We Use Your Information</h2>
  <p>Fakhruddin Properties uses the information we collect for various business purposes, including:</p>
  <ul>
    <li>To provide, operate, and maintain our real estate services</li>
    <li>To respond to your inquiries, requests, and provide customer support</li>
    <li>To send you property listings, market updates, and promotional communications</li>
    <li>To personalize your experience and deliver relevant content</li>
    <li>To improve our website, services, and marketing efforts</li>
    <li>To comply with legal obligations and protect our legal rights</li>
  </ul>
  <br>

  <h2>3. Sharing Your Information</h2>
  <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:</p>
  <br>
  <ul>
    <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website, conducting our business, or servicing you, under strict confidentiality agreements.</li>
    <li><strong>Business Partners:</strong> With property developers, financial institutions, and other partners involved in real estate transactions, only with your consent.</li>
    <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation, or to protect the rights, property, or safety of Fakhruddin Properties, our clients, or others.</li>
  </ul>
  <br>
  <h2>4. Cookies and Tracking Technologies</h2>
  <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user behavior. You can control cookies through your browser settings, but disabling cookies may limit certain features of our website. We use:</p>
  <ul>
    <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
    <li><strong>Analytics Cookies:</strong> To understand how visitors interact with our website</li>
    <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
  </ul>
  <br>

  <h2>5. Data Security</h2>
  <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
  <br>
  <h2>6. Your Data Protection Rights</h2>
  <p>Depending on your location, you may have the following rights regarding your personal information:</p>
  <br>
  <ul>
    <li><strong>Right to Access:</strong> Request a copy of the personal information we hold about you</li>
    <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete information</li>
    <li><strong>Right to Erasure:</strong> Request deletion of your personal information under certain conditions</li>
    <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your information</li>
    <li><strong>Right to Data Portability:</strong> Request transfer of your data to another organization</li>
    <li><strong>Right to Object:</strong> Object to certain processing activities, including direct marketing</li>
  </ul>
  <br>
  <p>To exercise any of these rights, please contact us using the information provided in Section 9.</p>
  <br>
  <h2>7. Third-Party Links</h2>
  <p>Our website may contain links to third-party websites, plugins, or applications. Clicking those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy practices. We encourage you to read the privacy policy of every website you visit.</p>
  <br>
  <h2>8. Children's Privacy</h2>
  <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately, and we will take steps to delete such information.</p>
  <br>
  <h2>9. Contact Us</h2>
  <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
  <p>
    <strong>Fakhruddin Properties</strong><br />
    Email: enquiry@fakhruddinproperties.com<br />
    Phone: +971 800 5253<br />
    Address: HC Floor, Lake Central Tower<br/>Al Marasi Drive, Business Bay<br/>P.O. Box. 191327
  </p>
  <br>
  <h2>10. Updates to This Privacy Policy</h2>
  <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. The updated version will be indicated by an updated "Last Revised" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>
  <br>
  <p class="last-updated"><strong>Last Revised:</strong> January 15, 2026</p>
`;

// ─────────────────────────────────────────────────────────────
// PRIVACY POLICY HERO SECTION
// ─────────────────────────────────────────────────────────────
function PrivacyHero() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".privacy-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".privacy-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .fromTo(".privacy-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");

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
    <section ref={ref} className="relative w-full h-[10vh] min-h-[100px] overflow-hidden">
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
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PRIVACY POLICY CONTENT SECTION
// ─────────────────────────────────────────────────────────────
function PrivacyContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".privacy-content", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 });
  }, { scope: contentRef });

  return (
    <div ref={contentRef} className="mx-auto">
      <div 
        className="privacy-content prose prose-lg max-w-none Z-policy-content"
        style={{
          color: CHINESE_BLACK,
          lineHeight: 1.8,
        }}
        dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY_CONTENT }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PRIVACY POLICY PAGE
// ─────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  
  return (
    <main style={{ background: CHINESE_BLACK }}>
      <Navbar />
      <PrivacyHero />
      
      <section className="relative w-full py-12 md:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Title Section */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-faculty text-4xl md:text-5xl lg:text-6xl mb-5"
              style={{ color: PRIMARY }}
            >
              Privacy Policy
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-20 h-[2px] mx-auto origin-center"
              style={{ background: PRIMARY }}
            />
          </div>
          
          <PrivacyContent />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}