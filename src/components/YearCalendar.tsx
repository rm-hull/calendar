import { Box } from "@chakra-ui/react";
import MonthCalendar from "@/components/MonthCalendar";

type CalendarMonth = {
  year: number;
  month: number;
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

type YearCalendarProps = Partial<CalendarMonth>;

export default function YearCalendar({ month, year }: YearCalendarProps) {
  const gen = yearGenerator(year, month);
  const first12 = Array.from({ length: 12 }, () => gen.next().value);

  return (
    <Box display="flex" flexWrap="wrap" gap={6} justifyContent="center">
      {first12.map((props, index) => (
        <MonthCalendar key={index} {...props} />
      ))}
    </Box>
  );
}
