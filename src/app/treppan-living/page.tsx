import Footer from "@/components/Footer";
import TreppanStory from "./_story";
import Navbar from "@/components/Navbar";

export default function TreppanLiving() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <TreppanStory />
      <Footer />
    </main>
  )
}