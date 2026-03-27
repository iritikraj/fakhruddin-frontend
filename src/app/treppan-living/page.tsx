import { Metadata } from 'next';
import Footer from "@/components/Footer";
import TreppanStory from "./_story";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: 'Tréppan Living | Fakhruddin Properties',
  description: '',  
  robots: 'noindex, nofollow',
};

export default function TreppanLiving() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <TreppanStory />
      <Footer />
    </main>
  )
}