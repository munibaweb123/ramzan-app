"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-amber-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          🌙 Ramzan App
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/prayer-times" className="hover:text-yellow-300">Prayer Times</Link>
          <Link href="/ramzan-calendar" className="hover:text-yellow-300">Ramzan Calendar</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-indigo-800"
          >
            <nav className="flex flex-col space-y-4 p-4">
              <Link href="/" className="block text-white hover:text-yellow-300" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/prayer-times" className="block text-white hover:text-yellow-300" onClick={() => setIsOpen(false)}>Prayer Times</Link>
              <Link href="/ramzan-calendar" className="block text-white hover:text-yellow-300" onClick={() => setIsOpen(false)}>Ramzan Calendar</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
