import Navbar from "@/components/Navbar";
import Hero from "./_hero";
import BrandReveal from "./_intro";
import PriveReveal from "./_prive-reveal";
import About from "./_about";
import Masterpieces from "./_masterpieces";
import Awards from "./_awards";
import Blogs from "./_blogs";
import Footer from "@/components/Footer";
import CommunitiesSection from "./_communities";

const HomePage = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <BrandReveal />
      <About />
      <PriveReveal />
      <Masterpieces />
      <Awards />
      <CommunitiesSection />
      <Blogs />
      <Footer />
    </main>
  )
}

export default HomePage;