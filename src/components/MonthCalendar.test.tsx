import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import MonthCalendar from "./MonthCalendar";
import { useGeneralSettings } from "../hooks/useGeneralSettings";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
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

    // Render January 2025 (Jan 18 is Sat)
    render(
      <ChakraProvider value={defaultSystem}>
        <MonthCalendar month={1} year={2025} events={{}} />
      </ChakraProvider>
    );

    // Look for the cell containing day 18 (Saturday)
    const day18 = screen.getByText("18");
    const cell = day18.parentElement; // The GridItem container
    expect(cell).toHaveStyle("background: var(--chakra-colors-gray-100)");
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

    const day18 = screen.getByText("18");
    const cell = day18.parentElement;
    expect(cell).not.toHaveStyle("background: var(--chakra-colors-gray-100)");
  });
});
