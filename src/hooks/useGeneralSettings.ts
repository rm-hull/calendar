import { StartDay } from "@/types/start-day";
import { useLocalStorage } from "./useLocalStorage";

export interface GeneralSettings {
  startDay?: StartDay;
  showTipsOnStartup?: boolean;
  showBackgroundColorForWeekend?: boolean;
}

type UseGeneralSettingsReturnType = [
  GeneralSettings | undefined,
  (value: GeneralSettings | undefined) => void
];

export function useGeneralSettings(): UseGeneralSettingsReturnType {
  return useLocalStorage<GeneralSettings>("calendar.general-settings");
}
