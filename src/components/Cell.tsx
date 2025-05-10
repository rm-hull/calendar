import { Event } from "@/types/events";
import { Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { useColorModeValue } from "./ui/color-mode";
import { Route as wikimediaRoute } from "@/routes/calendar/on-this-day.$month.$day";

type CellProps = {
  day: number | null;
  month: number;
  isToday: boolean;
  events?: Event[];
};

function pad(num: number | null): string {
  return String(num).padStart(2, "0");
}

export default function Cell({ day, month, isToday }: CellProps) {
  
  const todayBackground = useColorModeValue("orange.100", "gray.700");
  const todayBorderColor = useColorModeValue("orange.200", "gray.600");

  const todayProps = isToday && {
    background: todayBackground,
    borderColor: todayBorderColor,
    borderRadius: 6,
    borderWidth: 1,
  };

  return (
    <Link asChild>
      <RouterLink
        to={wikimediaRoute.to}
        params={{
          day: pad(day),
          month: pad(month),
        }}
      >
        <Text p={1} pt={0} pb={0} {...todayProps}>
          {day}
        </Text>
      </RouterLink>
    </Link>
  );
}
