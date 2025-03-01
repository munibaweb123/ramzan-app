"use client";

import { useEffect, useState } from "react";
import { getPrayerTimes } from "../utils/fetchPrayerTimes";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type PrayerTimings = {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    [key: string]: string; // Allow additional keys (optional)
  };
  
  export default function PrayerTimes() {
    const [timings, setTimings] = useState<PrayerTimings | null>(null);

  useEffect(() => {
    getPrayerTimes("Karachi", "Pakistan").then(setTimings);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-teal-800 text-white p-6">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6"
      >
        🕌 Prayer Times 🕌
      </motion.h1>

      {timings ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {Object.entries(timings).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-white text-gray-800 shadow-lg rounded-xl flex flex-col items-center">
                <h2 className="text-xl font-semibold text-green-700">{key}</h2>
                <CardContent className="text-lg font-medium mt-2">
                  {typeof value === "string" ? value : JSON.stringify(value)}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-lg">Loading prayer times...</p>
      )}
    </div>
  );
}
