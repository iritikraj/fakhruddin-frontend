import Navbar from "@/components/Navbar";
import Hero from "./_hero";
import BrandReveal from "./_intro";
import AboutBanner from "./_about";
import HeritageSection from "./_heritage";
import Masterpieces from "./_masterpieces";
import Awards from "./_awards";
import FeaturedProjects from "./_featured-projects";
import Blogs from "./_blogs";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <div className="relative z-50 bg-white">
        <BrandReveal />
        <AboutBanner />
        <HeritageSection />
        <Masterpieces />
        <Awards />
        <FeaturedProjects />
        <Blogs />
      </div>
      <Footer />
    </main>
  )
}

export default HomePage;