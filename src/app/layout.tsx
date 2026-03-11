
import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

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
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
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