import { GeneralSettings } from "@/types/settings";
import { useLocalStorage } from "@rm-hull/use-local-storage";

type UseGeneralSettingsReturnType = {
  settings: GeneralSettings | undefined;
  updateSettings: (value: GeneralSettings | undefined) => void;
  isLoading: boolean;
};

export function useGeneralSettings(): UseGeneralSettingsReturnType {
  const { value, setValue, isLoading } = useLocalStorage<GeneralSettings>("calendar.general-settings");
  return {
    settings: value,
    updateSettings: (value: GeneralSettings | undefined) => void setValue(value),
    isLoading,
  };
}
