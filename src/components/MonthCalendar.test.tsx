import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useGeneralSettings } from "@/hooks/useGeneralSettings";
import MonthCalendar from "./MonthCalendar";
import "@testing-library/jest-dom/vitest";

vi.mock("../hooks/useGeneralSettings");

vi.mock("./Cell", () => ({
  default: ({ day }: { day: number }) => <div>{day}</div>,
}));

afterEach(cleanup);

describe("MonthCalendar", () => {
  it("should render the month and year", () => {
    vi.mocked(useGeneralSettings).mockReturnValue({
      settings: { showBackgroundColorForWeekend: false },
      updateSettings: vi.fn(),
      isLoading: false,
    });

    render(
      <ChakraProvider value={defaultSystem}>
        <MonthCalendar month={1} year={2025} events={{}} />
      </ChakraProvider>
    );

    expect(screen.getByText(/January 2025/i)).toBeInTheDocument();
  });

  it("should render the days of the week", () => {
    vi.mocked(useGeneralSettings).mockReturnValue({
      settings: { showBackgroundColorForWeekend: false },
      updateSettings: vi.fn(),
      isLoading: false,
    });

    render(
      <ChakraProvider value={defaultSystem}>
        <MonthCalendar month={1} year={2025} events={{}} />
      </ChakraProvider>
    );

    expect(screen.getAllByText("Sun").length).toBeGreaterThan(0);
    expect(screen.getByText("Mon")).toBeInTheDocument();
  });

  it("should apply background color to weekends when enabled", () => {
    vi.mocked(useGeneralSettings).mockReturnValue({
      settings: { showBackgroundColorForWeekend: true },
      updateSettings: vi.fn(),
      isLoading: false,
    });

    // Render January 2025 (Jan 17 is Fri, Jan 18 is Sat)
    render(
      <ChakraProvider value={defaultSystem}>
        <MonthCalendar month={1} year={2025} events={{}} />
      </ChakraProvider>
    );

    // The weekend cell (day 18, Saturday) should have a different CSS class
    // than the weekday cell (day 17, Friday) because of the background prop.
    const day17 = screen.getByText("17");
    const day18 = screen.getByText("18");
    const weekdayCell = day17.parentElement;
    const weekendCell = day18.parentElement;
    expect(weekendCell?.className).not.toBe(weekdayCell?.className);
  });

  it("should not apply background color to weekends when disabled", () => {
    vi.mocked(useGeneralSettings).mockReturnValue({
      settings: { showBackgroundColorForWeekend: false },
      updateSettings: vi.fn(),
      isLoading: false,
    });

    render(
      <ChakraProvider value={defaultSystem}>
        <MonthCalendar month={1} year={2025} events={{}} />
      </ChakraProvider>
    );

    // When disabled, weekend and weekday cells should have the same classes
    const day17 = screen.getByText("17");
    const day18 = screen.getByText("18");
    const weekdayCell = day17.parentElement;
    const weekendCell = day18.parentElement;
    expect(weekendCell?.className).toBe(weekdayCell?.className);
  });
});
