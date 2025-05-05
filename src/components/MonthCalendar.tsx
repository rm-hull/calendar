import { Card, Grid, GridItem, Text } from "@chakra-ui/react";

export type CalendarProps = {
  month: number;
  year: number;
};

const locale = navigator.language;
const days = [...Array(7).keys()].map((day) => {
  const date = new Date(Date.UTC(2023, 0, 1 + day));
  return date.toLocaleDateString(locale, { weekday: "short" });
});

function isToday(day: number | null, month: number, year: number): boolean {
  if (!day) return false;
  const today = new Date();
  return (
    today.getDate() === day &&
    today.getMonth() + 1 === month &&
    today.getFullYear() === year
  );
}

export default function MonthCalendar({ month, year }: CalendarProps) {
  const date = new Date(year, month - 1);
  const monthName = new Date(date).toLocaleString(locale, { month: "long" });
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const totalDays = 35; // 5 rows * 7 days
  const cells: (number | null)[] = Array(totalDays).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const naturalIndex = firstDayOfMonth + (d - 1);
    // If the natural index spills over, wrap it back to the first row.
    const cellIndex = naturalIndex < 35 ? naturalIndex : naturalIndex - 35;
    cells[cellIndex] = d;
  }

  return (
    <Card.Root>
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
            <GridItem key={day} textAlign="right" p={2}>
              <Text textStyle="caps" fontSize="xs" color="gray.500">
                {day}
              </Text>
            </GridItem>
          ))}

          {cells.map((day, index) => {
            const todayProps = isToday(day, month, year)
              ? {
                  background: "orange.100",
                  borderColor: "orange.200",
                  borderRadius: 6,
                  borderWidth: 1,
                }
              : undefined;

            return (
              <GridItem key={index} textAlign="right" p={2} height={9}>
                <Text p={1} pt={0} pb={0} {...todayProps}>
                  {day}
                </Text>
              </GridItem>
            );
          })}
        </Grid>
      </Card.Body>
    </Card.Root>
  );
}
