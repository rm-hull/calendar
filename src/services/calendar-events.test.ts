import { describe, it, expect, vi } from "vitest";
import { fetchCalendarEvents } from "./calendar-events";
import * as govUk from "./gov-uk";
import * as openHolidays from "./open-holidays";

vi.mock("./gov-uk", () => ({
  fetchUkBankHolidays: vi.fn(),
}));
vi.mock("./open-holidays", () => ({
  fetchOpenHolidays: vi.fn(),
}));
vi.mock("../types/gov-uk", () => ({
  govUkToEvents: vi.fn(() => ({ "2025-01-01": [] })),
}));
vi.mock("../types/open-holidays", () => ({
  openHolidaysToEvents: vi.fn(() => ({ "2025-01-02": [] })),
}));

describe("fetchCalendarEvents", () => {
  it("should fetch UK bank holidays for GB", async () => {
    const fetchUkBankHolidaysSpy = vi
      .spyOn(govUk, "fetchUkBankHolidays")
      .mockResolvedValue({ "england-and-wales": { events: [] } } as any);

    const events = await fetchCalendarEvents(new Date("2025-01-01"), new Date("2025-12-31"), ["en-GB"]);

    expect(fetchUkBankHolidaysSpy).toHaveBeenCalled();
    expect(events).toEqual({ "2025-01-01": [] });
  });

  it("should fetch open holidays for other countries", async () => {
    const fetchOpenHolidaysSpy = vi.spyOn(openHolidays, "fetchOpenHolidays").mockResolvedValue([]);

    const events = await fetchCalendarEvents(new Date("2025-01-01"), new Date("2025-12-31"), ["en-US"]);

    expect(fetchOpenHolidaysSpy).toHaveBeenCalled();
    expect(events).toEqual({ "2025-01-02": [] });
  });
});
