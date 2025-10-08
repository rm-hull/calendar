import { StartDay } from "@/types/start-day";
import { useLocalStorage } from "@rm-hull/use-local-storage";

export interface GeneralSettings {
  startDay?: StartDay;
  showTipsOnStartup?: boolean;
  showBackgroundColorForWeekend?: boolean;
}

type UseGeneralSettingsReturnType = {
  settings: GeneralSettings | undefined;
  updateSettings: (value: GeneralSettings | undefined) => void;
  isLoading: boolean;
};

export function useGeneralSettings(): UseGeneralSettingsReturnType {
  const { value, setValue, isLoading } = useLocalStorage<GeneralSettings>(
    "calendar.general-settings"
  );
  return {
    settings: value,
    updateSettings: setValue,
    isLoading,
  };
}
