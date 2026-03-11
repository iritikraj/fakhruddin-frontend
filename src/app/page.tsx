import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Awards from "@/components/Awards";
import FeaturedProjects from "@/components/FeaturedProjects";
import Blogs from "@/components/Blogs";
import LuxuryRevealAbout from "@/components/AboutMore";
import UltraHero from "@/components/Hero";
import AboutBanner from "@/components/About";
import Masterpieces from "@/components/Cards";
import HeritageSection from "@/components/Heritage";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <UltraHero />
      <div className="relative z-50 bg-white">
        <LuxuryRevealAbout />
        <AboutBanner />
        <HeritageSection />
        <Masterpieces />
        <Awards />
        <FeaturedProjects />
        <Blogs />
      </div>
      <Footer />
    </main>
  );
}