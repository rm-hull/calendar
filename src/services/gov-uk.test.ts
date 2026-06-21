import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUkBankHolidays } from "./gov-uk";

describe("fetchUkBankHolidays", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("should fetch and return UK bank holiday data", async () => {
    const mockData = { "england-and-wales": { events: [] } };
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => { await Promise.resolve(); return mockData; },
    } as Response);

    const result = await fetchUkBankHolidays();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      "https://www.gov.uk/bank-holidays.json",
      expect.objectContaining({
        headers: {
          Accept: "application/json",
          "User-Agent": "Calendar (https://github.com/rm-hull/calendar)",
        },
      })
    );
  });

  it("should throw an error when fetch fails", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      text: async () => { await Promise.resolve(); return "error"; },
    } as Response);

    await expect(fetchUkBankHolidays()).rejects.toThrow("Failed to fetch UK bank holiday data");
  });
});
