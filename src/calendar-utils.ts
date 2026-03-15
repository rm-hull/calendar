import { type StartDay } from "./types/start-day";

export const locale = navigator.language;

export function getDays(startDay: StartDay) {
  const offset = startDay === "sun" ? 0 : 1;
  return [...Array(7).keys()].map((i) => {
    const date = new Date(Date.UTC(2023, 0, 1 + ((i + offset) % 7)));
    return date.toLocaleDateString(locale, { weekday: "short" });
  });
}

export function isDate(date: Date): (day: number | null, month: number, year: number) => boolean {
  return (day, month, year) => {
    if (!day) return false;
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
  };
}

export function isWeekend(day: number | null, month: number, year: number): boolean {
  if (!day) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = date.getUTCDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
}
