import { Card, Grid, GridItem, Text } from "@chakra-ui/react";
import { type CalendarEvents } from "@/types/events";
import { type StartDay } from "@/types/start-day";
import Cell from "./Cell";

export type MonthCalendarProps = {
  month: number;
  year: number;
  events: CalendarEvents;
  startDay?: StartDay;
};

const locale = navigator.language;

function getDays(startDay: StartDay) {
  const offset = startDay === "sun" ? 0 : 1;
  return [...Array(7).keys()].map((i) => {
    const date = new Date(Date.UTC(2023, 0, 1 + ((i + offset) % 7)));
    return date.toLocaleDateString(locale, { weekday: "short" });
  });
}

function isDate(
  date: Date
): (day: number | null, month: number, year: number) => boolean {
  return (day, month, year) => {
    if (!day) return false;
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };
}

export default function MonthCalendar({
  month,
  year,
  events,
  startDay = "sun",
}: MonthCalendarProps) {
  const isToday = isDate(new Date());
  const date = new Date(year, month - 1);
  const monthName = new Date(date).toLocaleString(locale, { month: "long" });
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  // Shift the weekday headers according to startDay
  const days = getDays(startDay);

  // Calculate the offset for the first day of the month
  // JS getDay(): 0=Sun, 1=Mon, ..., 6=Sat
  const offset =
    startDay === "mon"
      ? firstDayOfMonth === 0
        ? 6
        : firstDayOfMonth - 1
      : firstDayOfMonth;

  const totalDays = 35; // 5 rows * 7 days
  const cells: (number | null)[] = Array(totalDays).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const naturalIndex = offset + (d - 1);
    // If the natural index spills over, wrap it back to the first row.
    const cellIndex = naturalIndex < 35 ? naturalIndex : naturalIndex - 35;
    cells[cellIndex] = d;
  }

  return (
    <Card.Root className="month-view">
      <Card.Header p={2}>
        <Text
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="gray.500"
        >
          {monthName} {year}
        </Text>
      </Card.Header>

      <Card.Body p={2} minWidth={250}>
        <Grid templateColumns="repeat(7, 1fr)" gap={0}>
          {days.map((day) => (
            <GridItem className="cell" key={day} textAlign="right" p={2}>
              <Text textStyle="caps" fontSize="xs" color="gray.500">
                {day}
              </Text>
            </GridItem>
          ))}

          {cells.map((day, index) => {
            return (
              <GridItem
                className="cell"
                key={index}
                textAlign="right"
                p={2}
                height={9}
              >
                {day && (
                  <Cell
                    day={day}
                    month={month}
                    year={year}
                    isToday={isToday(day, month, year)}
                    events={events}
                  />
                )}
              </GridItem>
            );
          })}
        </Grid>
      </Card.Body>
    </Card.Root>
  );
}
