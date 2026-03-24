import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SettingsForm } from "./SettingsForm";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "@testing-library/jest-dom/vitest";

vi.mock("../../hooks/useGeneralSettings", () => ({
  useGeneralSettings: vi.fn(),
}));

describe("SettingsForm", () => {
  it("should render the settings form", () => {
    (useGeneralSettings as any).mockReturnValue({
      settings: { startDay: "mon", showTipsOnStartup: true, showBackgroundColorForWeekend: false },
      updateSettings: vi.fn(),
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
