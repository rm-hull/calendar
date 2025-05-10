import { CalendarEvents } from "@/types/events";
import { Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { useColorModeValue } from "./ui/color-mode";
import { Route as wikimediaRoute } from "@/routes/calendar/on-this-day.$month.$day";
import { pad } from "@/utils";
import EventsTooltip from "./EventsTooltip";

type CellProps = {
  day: number | null;
  month: number;
  year: number;
  isToday: boolean;
  events: CalendarEvents;
};

export default function Cell({ day, month, year, isToday, events }: CellProps) {
  const todayBackground = useColorModeValue("orange.100", "gray.700");
  const todayBorderColor = useColorModeValue("orange.200", "gray.600");
  const eventColor = useColorModeValue("orange.400", "gray.500");

  const todayProps = isToday && {
    background: todayBackground,
    borderColor: todayBorderColor,
    borderRadius: 6,
    borderWidth: 1,
  };

  const dt = `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`;

  const ev = events[dt];
  const eventProps = ev && {
    fontWeight: "bold",
    color: eventColor,
  };

  return (
    <Link asChild>
      <RouterLink
        to={wikimediaRoute.to}
        params={{
          day: dt.slice(8, 10),
          month: dt.slice(5, 7),
        }}
      >
        <EventsTooltip events={ev}>
          <Text pr={1} w={7} {...todayProps} {...eventProps}>
            {day}
          </Text>
        </EventsTooltip>
      </RouterLink>
    </Link>
  );
}
