import React from 'react';
import aboutUsImage from '../../../assets/aboutus-images/about_us.webp';
import { motion } from "framer-motion";

function AboutUsComponent() {
  return (
    <motion.div
      className="min-h-[80vh] flex flex-col items-center justify-center px-2 sm:px-4 py-12 bg-gradient-to-br from-[#f8fff7] to-[#ecfdfa]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, type: "spring", bounce: 0.13 }}
    >
      <motion.section
        className="max-w-6xl mx-auto my-8 px-2 sm:px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, type: "spring", bounce: 0.16 }}
      >
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20 bg-white/90 rounded-3xl shadow-2xl p-6 md:p-12 border border-[#e3f5ed] backdrop-blur-[6px]">
          {/* Text Column */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.7, type: "spring" }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-7 tracking-tight text-black">
              <span className="text-[#00754A]">Books</span>: Your Gateway to Imagination & Knowledge
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-5 text-black/90 font-medium">
              <span className="text-[#00754A] font-semibold">Books</span> is a modern online bookstore designed for readers of all ages and interests.
              Our goal is simple: to make finding and enjoying your next favorite book <span className="font-semibold text-[#00754A]">easy, affordable, and inspiring</span>.
              Browse fiction, non-fiction, science, fantasy, history, romance, and so much more – all carefully curated and delivered to your door.
            </p>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-5 text-black font-medium">
              Whether you’re a lifelong reader, a student searching for study material, or someone just discovering the joy of books,
              <span className="text-[#00754A] font-semibold"> Books </span>
              is your trusted companion for every chapter of life. We believe in the power of stories and knowledge to change lives.
            </p>
            <motion.p
              className="text-lg sm:text-xl font-extrabold text-center mt-8 text-black"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.38, duration: 0.8 }}
            >
              Join the <span className="text-[#00754A]">Books Family</span> <span className="inline-block animate-pulse">📚</span><br />
              <span className="font-semibold">Discover, learn, and explore – one page at a time!</span>
            </motion.p>
          </motion.div>

          {/* Image Column */}
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, x: 64, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.26, duration: 0.7, type: "spring" }}
          >
            <motion.div
              className="relative w-full max-w-[370px] mx-auto"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 48px 0 #00754A33" }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              <img
                src={aboutUsImage}
                alt="Bookstore"
                className="w-full h-auto rounded-3xl shadow-2xl border-4 border-[#e3f5ed] object-cover"
                style={{ filter: "brightness(1.02) saturate(1.13)" }}
              />
              <span
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[#00754A] font-extrabold text-xl bg-white/80 px-6 py-2 rounded-full shadow-md backdrop-blur-lg border-2 border-[#e3f5ed] animate-bounce select-none"
                style={{ pointerEvents: "none" }}
              >
                #ForTheLoveOfBooks
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default AboutUsComponent;
