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

  const handleUpdateBackgroundColorForWeekend = () => {
    updateSettings({
      ...settings,
      showBackgroundColorForWeekend: !settings?.showBackgroundColorForWeekend,
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
        <HStack alignItems="start">
          <Field.Label width={170}>
            Show background colour for weekend?
          </Field.Label>
          <Switch.Root
            checked={settings?.showBackgroundColorForWeekend}
            onChange={handleUpdateBackgroundColorForWeekend}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>
        </HStack>
      </Field.Root>

      <Field.Root>
        <HStack alignItems="top">
          <Field.Label width={170}>Show tips on start-up?</Field.Label>
          <Switch.Root
            checked={settings?.showTipsOnStartup ?? true}
            onChange={handleUpdateTipsOnStartup}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>
        </HStack>
      </Field.Root>
    </VStack>
  );
}
