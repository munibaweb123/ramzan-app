"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ramzanDays = Array.from({ length: 30 }, (_, i) => i + 1);

export default function RamzanCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-600 to-orange-800 text-white p-6">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6"
      >
        🕌 Ramzan Calendar 🕌
      </motion.h1>

      {/* Grid View for Ramzan Days */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto text-center font-bold"
      >
        {ramzanDays.map((day, index) => {
          const gregorianDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - (currentDate.getDate() % 30) + day
          ).toDateString(); // Adjust for real mapping

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white text-gray-900 shadow-lg rounded-xl p-4 flex flex-col items-center"
            >
              <h2 className="text-2xl font-bold text-yellow-700">Day {day}</h2>
              <p className="text-gray-600">{gregorianDate}</p>
              <p className="text-gray-700">Sehri: 4:30 AM</p>
              <p className="text-gray-700">Iftar: 6:45 PM</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
