'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HomePage = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <main className="bg-black">
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: luxuryEase }}
            className="fixed top-0 left-0 w-full z-100"
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      <Hero onIntroFinished={() => setShowNavbar(true)} />

      <div className={showNavbar ? "opacity-100" : "opacity-0 invisible"}>
        <BrandReveal />
        <About />
        <PriveReveal />
        <Masterpieces />
        <Awards />
        <CommunitiesSection />
        <Blogs />
        <Footer />
      </div>
    </main>
  );
}

export default HomePage;