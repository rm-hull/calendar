import { CalendarEvents } from "@/types/events";
import { fetchOpenHolidays } from "./open-holidays";
import { openHolidaysToEvents } from "@/types/open-holidays";
import { fetchUkBankHolidays } from "./gov-uk";
import { govUkToEvents } from "@/types/gov-uk";

export async function fetchCalendarEvents(
  from: Date,
  to: Date
): Promise<CalendarEvents> {
  const [languageIsoCode, countryIsoCode] = navigator.language.split("-");
  if (countryIsoCode === undefined) {
    return {};
  }
  if (countryIsoCode === "GB") {
    return govUkToEvents(await fetchUkBankHolidays());
  }

  return openHolidaysToEvents(
    await fetchOpenHolidays(countryIsoCode, languageIsoCode, from, to)
  );
}
