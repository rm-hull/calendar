import { OnThisDayAllResponse } from "@/types/wikimedia";

export async function fetchOnThisDay(
  month: string,
  day: string
): Promise<OnThisDayAllResponse> {
  const locale = navigator.language.split("-")[0];
  const response = await fetch(
    `https://api.wikimedia.org/feed/v1/wikipedia/${locale}/onthisday/all/${month}/${day}`,
    {
      headers: {
        Accept: "application/json",
        "API-User-Agent": "Calendar (https://github.com/rm-hull/calendar)",
      },
    }
  );
  if (!response.ok) {
    console.error(response.text);
    throw new Error(`Failed to fetch data for ${month}/${day}`);
  }
  return response.json();
}
