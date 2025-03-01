"use client";
import { useEffect, useState } from "react";

// Define types for prayer timings
interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

// Function to fetch prayer times
const getPrayerTimings = async (): Promise<PrayerTimings> => {
  const response = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=Karachi&country=Pakistan&method=1`
  );
  const data = await response.json();
  return data.data.timings;
};

// List of Arabic Hadiths with English translation
const hadithList = [
  {
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Actions are judged by intentions. (Bukhari & Muslim)"
  },
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translation: "The best among you are those who learn the Quran and teach it. (Bukhari)"
  },
  {
    arabic: "الدُّعَاءُ مُخُّ الْعِبَادَةِ",
    translation: "Supplication is the essence of worship. (Tirmidhi)"
  },
  {
    arabic: "إِنَّ اللهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ",
    translation: "Indeed, Allah loves those who repent and those who purify themselves. (Quran 2:222)"
  },
  {
    arabic: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ",
    translation: "Whoever fasts in Ramadan with faith and seeks reward, his past sins will be forgiven. (Bukhari)"
  }
];

// Select a random Hadith each day
const getRandomHadith = () => hadithList[Math.floor(Math.random() * hadithList.length)];

// Convert 24-hour time to 12-hour format
const convertTo12Hour = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Function to subtract minutes from a time string
const subtractMinutes = (time: string, minutesToSubtract: number) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes - minutesToSubtract;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
};

const PrayerTimes = () => {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [hadith, setHadith] = useState<{ arabic: string; translation: string } | null>(null);

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const data = await getPrayerTimings();
        setTimings(data);
        setHadith(getRandomHadith());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimings();

    // Auto-update at midnight
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // Set to next midnight
    const timeUntilMidnight = midnight.getTime() + 86400000 - now.getTime();

    const midnightTimer = setTimeout(fetchTimings, timeUntilMidnight);
    return () => clearTimeout(midnightTimer);
  }, []);

  if (loading) return <p className="text-center mt-10">Loading prayer times...</p>;

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Karachi Prayer Times</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg bg-gray-100 p-4 rounded-lg shadow-lg">
        <div className="bg-white p-3 rounded-md shadow">🌙 <strong>Sehri:</strong> {timings ? convertTo12Hour(subtractMinutes(timings.Fajr, 10)) : 'Loading...'}</div>
        <div className="bg-white p-3 rounded-md shadow">🌅 <strong>Fajr:</strong> {timings ? convertTo12Hour(timings.Fajr) : 'Loading...'}</div>
        <div className="bg-white p-3 rounded-md shadow">🌞 <strong>Dhuhr:</strong> {timings ? convertTo12Hour(timings.Dhuhr) : 'Loading...'}</div>
        <div className="bg-white p-3 rounded-md shadow">🌆 <strong>Asr:</strong> {timings ? convertTo12Hour(timings.Asr) : 'Loading...'}</div>
        <div className="bg-white p-3 rounded-md shadow">🌇 <strong>Maghrib (Iftar):</strong> {timings ? convertTo12Hour(timings.Maghrib) : 'Loading...'}</div>
        <div className="bg-white p-3 rounded-md shadow">🌙 <strong>Isha:</strong> {timings ? convertTo12Hour(timings.Isha) : 'Loading...'}</div>
      </div>

      {hadith && (
        <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow space-y-4">
          <p className="text-lg font-semibold">📖 Hadith of the Day:</p>
          <p className="text-xl text-center font-semibold mb-2" dir="rtl">{hadith.arabic}</p>
          <p className="italic text-center">{hadith.translation}</p>
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;
