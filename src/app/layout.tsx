
import type { Metadata } from "next";
import { Marcellus } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
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
    <html lang="en" className={marcellus.variable}>
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