import { HolidayResponse } from "@/types/open-holidays";

export async function fetchOpenHolidays(
  countryIsoCode: string,
  languageIsoCode: string,
  from: Date,
  to: Date
): Promise<HolidayResponse[]> {
  const url = new URL("https://openholidaysapi.org/PublicHolidays");
  url.searchParams.append("countryIsoCode", countryIsoCode.toUpperCase());
  url.searchParams.append("languageIsoCode", languageIsoCode.toUpperCase());
  url.searchParams.append("validFrom", from.toISOString().split("T")[0]);
  url.searchParams.append("validTo", to.toISOString().split("T")[0]);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Calendar (https://github.com/rm-hull/calendar)",
    },
  });

  if (!response.ok) {
    console.error(response.text);
    throw new Error(`Failed to fetch openholidaysapi data for from ${from} to ${to} for ${countryIsoCode}`);
  }
  return response.json();
}
