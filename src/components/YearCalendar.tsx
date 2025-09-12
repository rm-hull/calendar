import { Flex } from "@chakra-ui/react";
import MonthCalendar from "@/components/MonthCalendar";
import { type CalendarEvents } from "@/types/events";
import { type StartDay } from "@/types/start-day";
import { SettingsDialog } from "./settings/SettingsDialog";
import { useGeneralSettings } from "@/hooks/useGeneralSettings";

type CalendarMonth = {
  year: number;
  month: number;
  startDay?: StartDay;
};

function* yearGenerator(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1
): Generator<CalendarMonth, CalendarMonth, unknown> {
  if (isNaN(year)) {
    throw new Error("Invalid year");
  }

  if (month < 1 || month > 12) {
    throw new Error("Invalid month");
  }

  while (true) {
    yield { year, month };
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }
}

interface YearCalendarProps extends Partial<CalendarMonth> {
  events: CalendarEvents;
}

export default function YearCalendar({
  month,
  year,
  events,
}: YearCalendarProps) {
  const [settings] = useGeneralSettings();
  const gen = yearGenerator(year, month);
  const first12 = Array.from({ length: 12 }, () => gen.next().value);

  return (
    <Flex className="year-view" flexWrap="wrap" gap={6} justifyContent="center">
      <SettingsDialog />
      {first12.map((props, index) => (
        <MonthCalendar
          key={index}
          events={events}
          startDay={settings?.startDay ?? "mon"}
          {...props}
        />
      ))}
    </Flex>
  );
}
