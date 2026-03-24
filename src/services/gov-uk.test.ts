import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUkBankHolidays } from "./gov-uk";

describe("fetchUkBankHolidays", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("should fetch and return UK bank holiday data", async () => {
    const mockData = { "england-and-wales": { events: [] } };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

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
    (fetch as any).mockResolvedValue({
      ok: false,
      text: async () => "error",
    });

    await expect(fetchUkBankHolidays()).rejects.toThrow("Failed to fetch UK bank holiday data");
  });
});
