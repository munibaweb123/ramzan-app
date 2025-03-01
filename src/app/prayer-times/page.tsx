"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type PrayerTimings = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

type HijriDate = {
  day: string;
  month: { number: number; en: string };
  year: string;
};

type GregorianDate = {
  date: string;
};

type ApiResponse = {
  date: {
    hijri: HijriDate;
    gregorian: GregorianDate;
  };
  timings: PrayerTimings;
};

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<ApiResponse[]>([]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const year = 2025;
      const month = 3; // March (Ramzan starts from March 2, 2025)
      const response = await fetch(
        `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Karachi&country=Pakistan&method=2`
      );
      const data = await response.json();

      if (data.data) {
        const timingsArray: ApiResponse[] = data.data.filter(
          (day: ApiResponse) => day.date.hijri.month.number === 9
        );
        setPrayerTimes(timingsArray);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6"
      >
        🕌 Ramzan 2025 Prayer Times - Karachi 🕌
      </motion.h1>

      {prayerTimes.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {prayerTimes.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 bg-white text-gray-800 shadow-lg rounded-xl border border-gray-300">
                <h2 className="text-lg font-semibold text-gray-900 text-center">
                  {day.date.gregorian.date}{" "}
                  <span className="text-blue-600">
                    ({day.date.hijri.day} Ramadan {day.date.hijri.year})
                  </span>
                </h2>
                <CardContent className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Fajr:</span>
                    <span className="text-blue-600 font-semibold">{day.timings.Fajr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Dhuhr:</span>
                    <span className="text-blue-600 font-semibold">{day.timings.Dhuhr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Asr:</span>
                    <span className="text-blue-600 font-semibold">{day.timings.Asr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Maghrib (Iftar):</span>
                    <span className="text-green-600 font-semibold">{day.timings.Maghrib}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Isha:</span>
                    <span className="text-blue-600 font-semibold">{day.timings.Isha}</span>
                  </div>
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
