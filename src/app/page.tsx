"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white p-6">
      {/* Full-Screen Background Image */}
      <Image 
        src="/ramzan-bg.jpg" 
        alt="Ramzan wish" 
        layout="fill"  // Covers full screen
        objectFit="cover" // Ensures it covers the area
        quality={100} // High-quality rendering
        className="absolute inset-0 -z-10" // Puts it behind content
      />

      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-center drop-shadow-lg"
      >
        🌙 Ramzan Mubarak! 🌙
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl text-center mt-4 drop-shadow-md"
      >
        May this holy month bring you peace, blessings, and happiness.
      </motion.p>

      {/* Call to Action Button */}
      <motion.a
        href="/prayer-times"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8 px-6 py-3 bg-yellow-500 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition"
      >
        Check Prayer Times 🕌
      </motion.a>
    </div>
  );
}
