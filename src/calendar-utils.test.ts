import { describe, it, expect } from "vitest";
import { getDays, isDate, isWeekend } from "./calendar-utils";

describe("calendar-utils", () => {
  describe("getDays", () => {
    it("should return days starting with Sun", () => {
      const days = getDays("sun");
      expect(days[0]).toBe("Sun");
    });

    it("should return days starting with Mon", () => {
      const days = getDays("mon");
      expect(days[0]).toBe("Mon");
    });
  });

  describe("isWeekend", () => {
    it("should return true for Saturday", () => {
      expect(isWeekend(18, 1, 2025)).toBe(true); // Jan 18 2025 is Sat
    });

    it("should return true for Sunday", () => {
      expect(isWeekend(19, 1, 2025)).toBe(true); // Jan 19 2025 is Sun
    });

    it("should return false for Monday", () => {
      expect(isWeekend(20, 1, 2025)).toBe(false); // Jan 20 2025 is Mon
    });
  });

  describe("isDate", () => {
    it("should return true for the given date", () => {
      const checkDate = isDate(new Date(2025, 0, 1));
      expect(checkDate(1, 1, 2025)).toBe(true);
    });

    it("should return false for a different date", () => {
      const checkDate = isDate(new Date(2025, 0, 1));
      expect(checkDate(2, 1, 2025)).toBe(false);
    });
  });
});
