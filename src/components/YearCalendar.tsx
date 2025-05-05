import { SimpleGrid } from "@chakra-ui/react";
import Calendar from "@/components/MonthCalendar";

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
    <SimpleGrid gap={4} alignItems="start" columns={{ base: 2, md: 3, lg: 4 }}>
      {first12.map((props, index) => (
        <Calendar key={index} {...props} />
      ))}
    </SimpleGrid>
  );
}
