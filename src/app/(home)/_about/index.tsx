'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  // Parallax setup for the two overlapping images
  const { scrollYProgress } = useScroll();

  // The first image moves slower, the second (overlapping) moves faster
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <section className="relative min-h-screen bg-white pt-52 pb-20 px-6 md:px-20 overflow-hidden font-marcellus">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE: THE OVERLAPPING IMAGES (Sobha Style) */}
        <div className="relative h-[500px] md:h-[700px]">
          {/* Main Background Image Card */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 w-[80%] h-[400px] md:h-[550px] rounded-sm overflow-hidden shadow-2xl z-10"
          >
            <img
              src="/port-1.webp"
              alt="Legacy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlapping Floating Image Card */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute bottom-10 right-0 w-[60%] h-[250px] md:h-[350px] p-2 shadow-2xl z-20"
          >
            <div className="w-full h-full overflow-hidden relative group">
              <img
                src="/port-2.webp"
                alt="Creating Futures"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 text-white uppercase text-[10px] tracking-[0.3em] font-medium">
                Building Legacies
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-4xl md:text-6xl text-gray-900 leading-tight font-marcellus">
            About <br /> Fakhruddin Properties
          </h2>

          <div className="flex flex-col gap-6 text-gray-600 font-sans text-sm md:text-base leading-relaxed max-w-lg">
            <span className="text-gray-900 font-semibold tracking-widest uppercase text-xs">
              Heritage. Innovation. Community.
            </span>
            <p>
              Born from the enduring legacy of Fakhruddin Holdings, founded in 1963,
              Fakhruddin Properties carries forward a tradition rooted in entrepreneurship,
              integrity, and a deep sense of community.
            </p>
            <p>
              What started as structures soon became stories of trust, of purpose, of
              homes that nurture as much as they impress. Every space we build is shaped
              by a belief that architecture should do more than occupy land.
            </p>
          </div>

          <motion.div
            className="flex items-center gap-4 text-xs tracking-[0.4em] uppercase text-gray-400 mt-4 cursor-pointer group"
            whileHover={{ x: 10 }}
          >
            <div className="w-8 h-[1px] bg-gray-300 group-hover:bg-gray-900 transition-colors" />
            <span className="group-hover:text-gray-900 transition-colors">Work in motion</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}