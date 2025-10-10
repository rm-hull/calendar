import { CalendarEvents } from "@/types/events";
import { fetchOpenHolidays } from "./open-holidays";
import { openHolidaysToEvents } from "@/types/open-holidays";
import { fetchUkBankHolidays } from "./gov-uk";
import { govUkToEvents } from "@/types/gov-uk";

export async function fetchCalendarEvents(
  from: Date,
  to: Date,
  languages = [navigator.language]
): Promise<CalendarEvents> {
  const processPublicHolidays = async (lang: string): Promise<CalendarEvents> => {
    try {
      const [languageIsoCode, countryIsoCode] = lang.split("-");
      if (!countryIsoCode) {
        return {};
      }

      if (countryIsoCode === "GB") {
        return govUkToEvents(await fetchUkBankHolidays());
      }

      return openHolidaysToEvents(await fetchOpenHolidays(countryIsoCode, languageIsoCode, from, to), lang);
    } catch (err) {
      console.log({ lang, err });
      return {};
    }
  };

  const results = await Promise.all(languages.map(processPublicHolidays));
  return results.reduce((acc, events) => {
    Object.entries(events).forEach(([key, value]) => {
      if (acc[key]) {
        acc[key] = [...acc[key], ...value];
      } else {
        acc[key] = value;
      }
    });
    return acc;
  }, {} as CalendarEvents);
}
