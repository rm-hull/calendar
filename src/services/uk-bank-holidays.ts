import { UkBankHolidays } from "@/types/gov_uk";

export async function fetchUkBankHolidays(): Promise<UkBankHolidays> {
  const response = await fetch(`https://www.gov.uk/bank-holidays.json`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Calendar (https://github.com/rm-hull/calendar)",
    },
  });
  if (!response.ok) {
    console.error(response.text);
    throw new Error(`Failed to fetch UK bank holiday data`);
  }
  return response.json();
}
