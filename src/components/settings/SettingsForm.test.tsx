import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import { SettingsForm } from "./SettingsForm";
import "@testing-library/jest-dom/vitest";

vi.mock("../../hooks/useGeneralSettings", () => ({
  useGeneralSettings: vi.fn(),
}));

describe("SettingsForm", () => {
  it("should render the settings form", () => {
    vi.mocked(useGeneralSettings).mockReturnValue({
      settings: { startDay: "mon", showTipsOnStartup: true, showBackgroundColorForWeekend: false },
      updateSettings: vi.fn(),
      isLoading: false,
    });

    render(
      <ChakraProvider value={defaultSystem}>
        <SettingsForm />
      </ChakraProvider>
    );

    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Sunday")).toBeInTheDocument();
  });
});
