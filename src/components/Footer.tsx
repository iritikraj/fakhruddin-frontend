"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Color constants
const COLORS = {
  PRIMARY_GRULLO: "#A1997F",
  PALE_SILVER: "#C4C7B5",
  MSU_GREEN: "#154741",
  CHINESE_BLACK: "#06191A",
  DEEP_AQUAMARINE: "#408174",
  WHITE: "#FFFFFF",
};

// Updated footer links with proper routes
const footerLinks = [
  {
    category: "Portfolio",
    items: [
      { name: "Tréppan Living Prive", href: "/projects/treppan-living-prive" },
      { name: "Tréppan Serenique", href: "/projects/treppan-serenique" },
      { name: "Tréppan Tower", href: "/projects/treppan-tower" },
      { name: "Hatimi Residences", href: "/projects/hatimi-residences" },
      { name: "Maimoon Gardens", href: "/projects/maimoon-gardens" },
      { name: "Fakhruddin International", href: "/fakhruddin-international" },
      { name: "UAE Project", href: "/uae-project" },
    ],
  },
  {
    category: "Company",
    items: [
      { name: "About Us", href: "/about-us" },
      { name: "Tréppan Living", href: "/treppan-living" },
      { name: "Channel Partner", href: "/partner-as-agent" },
      { name: "Blogs and Insights", href: "/blog" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    category: "Communities",
    items: [
      { name: "Dubai Islands", href: "/communities/dubai-islands" },
      { name: "Jumeirah Village Circle", href: "/communities/jumeirah-village-circle" },
      { name: "Jumeirah Village Triangle", href: "/communities/jumeirah-village-triangle" },
    ],
  },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/fakhruddin.properties" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/fakhruddinproperties" },
  { name: "Youtube", href: "https://www.youtube.com/channel/UCyCQdlRdu-s3RQRkfnW0NJg" },
];

// Sticky CTA Icons as SVG components - unified styling
const WhatsAppIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <path
      d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2 6.798 2 2.547 6.25 2.544 11.457c0 1.664.434 3.293 1.262 4.73L2 22l5.885-1.772c1.381.752 2.94 1.149 4.53 1.149h.004c5.206 0 9.458-4.251 9.461-9.458.001-2.525-.982-4.9-2.803-6.691zM12.008 19.864h-.004c-1.408 0-2.79-.38-3.99-1.096l-.286-.17-3.494 1.052.935-3.403-.186-.296a8.348 8.348 0 01-1.287-4.458c.003-4.603 3.749-8.348 8.354-8.348 2.23 0 4.325.87 5.903 2.448a8.307 8.307 0 012.445 5.892c-.003 4.605-3.75 8.353-8.355 8.353zm4.579-6.255c-.251-.126-1.485-.733-1.715-.817-.23-.084-.397-.126-.564.126-.167.251-.647.817-.793.985-.146.168-.293.189-.544.063-.251-.126-1.06-.39-2.018-1.245-.746-.666-1.25-1.489-1.396-1.74-.146-.252-.016-.388.11-.513.113-.112.251-.293.376-.44.126-.146.167-.251.251-.418.084-.168.042-.315-.021-.44-.063-.126-.564-1.358-.773-1.86-.203-.49-.41-.423-.564-.43-.146-.007-.313-.008-.48-.008-.167 0-.44.063-.67.314-.23.251-.877.857-.877 2.09 0 1.233.898 2.425 1.023 2.593.126.168 1.766 2.696 4.278 3.78.597.258 1.064.412 1.428.528.6.191 1.146.164 1.578.099.482-.073 1.485-.607 1.694-1.193.209-.586.209-1.088.146-1.193-.063-.105-.23-.168-.48-.294z"
      fill={COLORS.PRIMARY_GRULLO}
    />
  </svg>
);

const CallIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <path
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      fill={COLORS.PRIMARY_GRULLO}
    />
  </svg>
);

const MessageIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <path
      d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h10v2H7zm0 4h7v2H7z"
      fill={COLORS.PRIMARY_GRULLO}
    />
    <path d="M7 7h10v2H7z" fill={COLORS.PRIMARY_GRULLO} />
  </svg>
);

export default function Footer() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  // Parallax effect for the massive brand text
  const y = useTransform(scrollYProgress, [0.7, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [0, 0.07]);

  // Dynamic copyright year
  const currentYear = new Date().getFullYear();

  // CTA items
  const ctaItems = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      href: "https://wa.me/9718005253?text=Hello%20Fakhruddin%20Properties%20%20team,%20I%20would%20like%20to%20have%20a%20consultation%20session.%20Please%20assist%20me!%20Thanks",
    },
    {
      name: "Call",
      icon: <CallIcon />,
      href: "tel:+9718005253",
    },
    {
      name: "Message",
      icon: <MessageIcon />,
      href: "/contact",
    },
  ];

  return (
    <footer
      ref={container}
      className="relative pt-10 pb-12 px-6 md:px-20 overflow-hidden"
      style={{ backgroundColor: COLORS.CHINESE_BLACK, color: COLORS.WHITE }}
    >
      {/* Sticky CTA Menus */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {ctaItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target={item.name === "Message" ? "_self" : "_blank"}
            rel={item.name !== "Message" ? "noopener noreferrer" : ""}
            className="group flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{
              backgroundColor: `${COLORS.CHINESE_BLACK}cc`,
              border: `1px solid ${COLORS.PRIMARY_GRULLO}40`,
            }}
            aria-label={item.name}
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* The Boutique Link Grid */}
      <div className="max-w-[1400px] mx-auto py-24 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2 space-y-8">
          <div className="relative w-[160px] h-[40px]">
            <Image
              src="https://www.fakhruddinproperties.com/wp-content/uploads/2026/02/FP-Logo-Dark.png"
              alt="Fakhruddin Logo"
              fill
              className="object-contain"
            />
          </div>
          <p
            className="text-base leading-[2] max-w-[280px] font-light tracking-wide"
            style={{ color: `${COLORS.WHITE}4d` }}
          >
            Crafting sanctuary since 2003 - a quiet pursuit to reimagine what
            real estate could mean for the people who live within it.
          </p>

          <div>
            <a
              href="tel:+9718005253"
              className="text-2xl font-bold transition-all duration-500"
              style={{ color: COLORS.WHITE }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.PRIMARY_GRULLO;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = COLORS.WHITE;
              }}
            >
              Toll Free 800 5253
            </a>
          </div>
        </div>

        {footerLinks.map((section) => (
          <div key={section.category} className="space-y-8">
            <h5
              className="text-base tracking-[0.5em] uppercase font-bold"
              style={{ color: `${COLORS.WHITE}33` }}
            >
              {section.category}
            </h5>
            <ul className="space-y-4">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base block font-light tracking-tight transition-all duration-300"
                    style={{ color: `${COLORS.WHITE}80` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.PRIMARY_GRULLO;
                      e.currentTarget.style.fontStyle = "italic";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = `${COLORS.WHITE}80`;
                      e.currentTarget.style.fontStyle = "normal";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Minimalist Sub-Footer */}
      <div className="max-w-[1400px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div
          className="flex gap-12 text-[8px] tracking-[0.5em] uppercase"
          style={{ color: `${COLORS.WHITE}33` }}
        >
          <p>© {currentYear}</p>
          <p>Dubai, United Arab Emirates</p>
        </div>

        <div className="flex gap-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.5em] uppercase transition-all duration-500 relative group"
              style={{ color: `${COLORS.WHITE}4d` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.PRIMARY_GRULLO;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `${COLORS.WHITE}4d`;
              }}
            >
              {social.name}
              <span
                className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: COLORS.PRIMARY_GRULLO }}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}