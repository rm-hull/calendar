import { useGeneralSettings } from "@/hooks/useGeneralSettings";
import { isStartDay } from "@/types/start-day";
import { Field, HStack, RadioGroup, Switch, VStack } from "@chakra-ui/react";

export function SettingsForm() {
  const [settings, updateSettings] = useGeneralSettings();

  const handleUpdateStartDay = (day: string | null) => {
    if (isStartDay(day)) {
      updateSettings({ ...settings, startDay: day });
    }
  };

  const handleUpdateTipsOnStartup = () => {
    updateSettings({
      ...settings,
      showTipsOnStartup: !(settings?.showTipsOnStartup ?? true),
    });
  };

  return (
    <VStack gap={6}>
      <Field.Root>
        <HStack>
          <Field.Label width={75}>Start Day:</Field.Label>
          <RadioGroup.Root
            onValueChange={(e) => handleUpdateStartDay(e.value)}
            value={settings?.startDay ?? "mon"}
          >
            <HStack align="left">
              <RadioGroup.Item value="mon">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Monday</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="sun">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Sunday</RadioGroup.ItemText>
              </RadioGroup.Item>
            </HStack>
          </RadioGroup.Root>
        </HStack>
      </Field.Root>

      <Field.Root>
        <Switch.Root
          checked={settings?.showTipsOnStartup ?? true}
          onChange={handleUpdateTipsOnStartup}
        >
          <Switch.Label>Show tips on start-up?</Switch.Label>
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
      </Field.Root>
    </VStack>
  );
}
