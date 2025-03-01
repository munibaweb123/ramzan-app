export async function getPrayerTimes(city: string, country: string) {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.timings;
}