import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useGeneralSettings } from "./useGeneralSettings";

vi.mock("@rm-hull/use-local-storage", () => ({
  useLocalStorage: vi.fn(() => ({
    value: { startDay: "Sunday" },
    setValue: vi.fn(),
    isLoading: false,
  })),
}));

describe("useGeneralSettings", () => {
  it("should return settings", () => {
    const { result } = renderHook(() => useGeneralSettings());
    expect(result.current.settings).toEqual({ startDay: "Sunday" });
    expect(result.current.isLoading).toBe(false);
  });
});
