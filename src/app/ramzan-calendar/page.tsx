"use client";


import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const karachiRamzanTimings = [
  { day: 1, hijri: "1 Ramadan", date: "02-03-2025", fajr: "05:38 AM", maghrib: "06:35 PM" },
  { day: 2, hijri: "2 Ramadan", date: "03-03-2025", fajr: "05:37 AM", maghrib: "06:35 PM" },
  { day: 3, hijri: "3 Ramadan", date: "04-03-2025", fajr: "05:36 AM", maghrib: "06:36 PM" },
  { day: 4, hijri: "4 Ramadan", date: "05-03-2025", fajr: "05:35 AM", maghrib: "06:36 PM" },
  { day: 5, hijri: "5 Ramadan", date: "06-03-2025", fajr: "05:34 AM", maghrib: "06:37 PM" },
  { day: 6, hijri: "6 Ramadan", date: "07-03-2025", fajr: "05:33 AM", maghrib: "06:37 PM" },
  { day: 7, hijri: "7 Ramadan", date: "08-03-2025", fajr: "05:32 AM", maghrib: "06:38 PM" },
  { day: 8, hijri: "8 Ramadan", date: "09-03-2025", fajr: "05:31 AM", maghrib: "06:38 PM" },
  { day: 9, hijri: "9 Ramadan", date: "10-03-2025", fajr: "05:30 AM", maghrib: "06:39 PM" },
  { day: 10, hijri: "10 Ramadan", date: "11-03-2025", fajr: "05:29 AM", maghrib: "06:39 PM" },
  { day: 11, hijri: "11 Ramadan", date: "12-03-2025", fajr: "05:28 AM", maghrib: "06:40 PM" },
  { day: 12, hijri: "12 Ramadan", date: "13-03-2025", fajr: "05:27 AM", maghrib: "06:40 PM" },
  { day: 13, hijri: "13 Ramadan", date: "14-03-2025", fajr: "05:26 AM", maghrib: "06:41 PM" },
  { day: 14, hijri: "14 Ramadan", date: "15-03-2025", fajr: "05:25 AM", maghrib: "06:41 PM" },
  { day: 15, hijri: "15 Ramadan", date: "16-03-2025", fajr: "05:24 AM", maghrib: "06:42 PM" },
  { day: 16, hijri: "16 Ramadan", date: "17-03-2025", fajr: "05:23 AM", maghrib: "06:42 PM" },
  { day: 17, hijri: "17 Ramadan", date: "18-03-2025", fajr: "05:22 AM", maghrib: "06:43 PM" },
  { day: 18, hijri: "18 Ramadan", date: "19-03-2025", fajr: "05:21 AM", maghrib: "06:43 PM" },
  { day: 19, hijri: "19 Ramadan", date: "20-03-2025", fajr: "05:20 AM", maghrib: "06:44 PM" },
  { day: 20, hijri: "20 Ramadan", date: "21-03-2025", fajr: "05:19 AM", maghrib: "06:44 PM" },
  { day: 21, hijri: "21 Ramadan", date: "22-03-2025", fajr: "05:18 AM", maghrib: "06:45 PM" },
  { day: 22, hijri: "22 Ramadan", date: "23-03-2025", fajr: "05:17 AM", maghrib: "06:45 PM" },
  { day: 23, hijri: "23 Ramadan", date: "24-03-2025", fajr: "05:16 AM", maghrib: "06:46 PM" },
  { day: 24, hijri: "24 Ramadan", date: "25-03-2025", fajr: "05:15 AM", maghrib: "06:46 PM" },
  { day: 25, hijri: "25 Ramadan", date: "26-03-2025", fajr: "05:14 AM", maghrib: "06:47 PM" },
  { day: 26, hijri: "26 Ramadan", date: "27-03-2025", fajr: "05:13 AM", maghrib: "06:47 PM" },
  { day: 27, hijri: "27 Ramadan", date: "28-03-2025", fajr: "05:12 AM", maghrib: "06:48 PM" },
  { day: 28, hijri: "28 Ramadan", date: "29-03-2025", fajr: "05:11 AM", maghrib: "06:48 PM" },
  { day: 29, hijri: "29 Ramadan", date: "30-03-2025", fajr: "05:10 AM", maghrib: "06:49 PM" },
  { day: 30, hijri: "30 Ramadan", date: "31-03-2025", fajr: "05:09 AM", maghrib: "06:49 PM" },
];

export default function RamzanCalendar() {
  const today = dayjs().tz("Asia/Karachi").format("DD-MM-YYYY");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          🌙 Ramadan Calendar 2025 - Karachi 🌙 
        </h1>
        <p className="text-center text-lg font-semibold text-red-600">
          📅 Today: {dayjs().tz("Asia/Karachi").format("dddd, DD MMMM YYYY")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {karachiRamzanTimings.map((day) => {
            const isToday = day.date === today;
            return (
              <div
                key={day.day}
                className={`border shadow-md rounded-2xl p-6 text-center transition-all transform hover:scale-105 hover:shadow-lg ${
                  isToday ? "bg-yellow-200 border-yellow-500" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-bold text-gray-700">
                  Day {day.day} ({day.hijri})
                </h2>
                <p className="text-gray-500 text-sm">📆 {day.date}</p>
                <p className="text-lg text-blue-700 mt-2">🕌 Sehri: {day.fajr}</p>
                <p className="text-lg text-green-700">🌇 Iftar: {day.maghrib}</p>
                {isToday && (
                  <p className="mt-2 text-red-600 font-semibold">✨ Today’s Fast</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
