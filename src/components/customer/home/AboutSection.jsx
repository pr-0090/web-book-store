import React from "react";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <motion.section
      className="max-w-3xl mx-auto my-12 sm:my-20 px-4 sm:px-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight text-black"
        initial={{ letterSpacing: "-.08em" }}
        whileInView={{ letterSpacing: ".01em" }}
        transition={{ duration: 0.8, type: "tween" }}
      >
        Power Your Curiosity <span className="text-[#00754A]">with Books</span>
      </motion.h2>
      <motion.div
        className="flex flex-col gap-6 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.17 }
          }
        }}
      >
        <motion.p
          className="text-black text-lg sm:text-xl font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
          }}
        >
          <span className="font-bold text-[#00754A]">Books</span> is your one-stop destination for every reader fusing the best of e-commerce with a vibrant book-loving community.<br className="hidden sm:block" />
          Discover novels, textbooks, and hidden gems all at great prices, with our quality guarantee.<br className="hidden sm:block" />
          Share your reviews, connect with fellow readers, and track your reading journey all in one place.
        </motion.p>
        <motion.p
          className="text-black text-lg sm:text-xl font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          Whether you’re a lifelong bookworm or just starting your reading adventure,<br className="hidden sm:block" />
          <span className="font-bold text-[#00754A]">Books</span> empowers you to explore, learn, and connect.<br className="hidden sm:block" />
          <span className="font-semibold">Shop now</span> and join a thriving community that celebrates stories!
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

export default AboutSection;
