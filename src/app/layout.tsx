
import type { Metadata } from "next";
//import { Marcellus } from "next/font/google";
import { Faculty_Glyphic } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

/*const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
});*/

// Google Font - Faculty Glyphic
const facultyGlyphic = Faculty_Glyphic({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-faculty',
  display: 'swap',
});

// Local Font - Seitu Regular (from your .otf file)
const seituRegular = localFont({
  src: '../../public/fonts/Seitu-Regular.otf',
  variable: '--font-seitu',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Fakhruddin Properties | Luxury Redefined",
  description: "Award-winning ecosystem and wellness-focused projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${facultyGlyphic.variable} ${seituRegular.variable}`}>
      {/* className={marcellus.variable} */}
      <head>
        <link
          rel="preload"
          as="video"
          href="/fpd-intro.mp4"
          type="video/mp4"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-black text-white selection:bg-luxury-gold selection:text-black">
        <CustomCursor />
        <PageTransition />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}