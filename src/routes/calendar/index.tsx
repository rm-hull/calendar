import { createFileRoute } from "@tanstack/react-router";
import YearCalendar from "@/components/YearCalendar";
import Backdrop from "@/components/Backdrop";
import { fetchCalendarEvents } from "@/services/calendar-events";
import { isStartDay } from "@/types/start-day";

export const Route = createFileRoute("/calendar/")({
  component: CurrentYear,
  loader: (context) => {
    const languages = new URLSearchParams(context.location.search)
      .get("languages")
      ?.split(",") || [navigator.language];

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear + 1, currentMonth, 0); // "0" gets the last day of the previous month

    return fetchCalendarEvents(startDate, endDate, languages);
  },
  validateSearch: (search: Record<string, unknown>) => ({
    startDay: isStartDay(search.startDay) ? search.startDay : undefined,
  }),
});

function CurrentYear() {
  const events = Route.useLoaderData();
  const { startDay } = Route.useSearch();

  return (
    <Backdrop>
      <YearCalendar events={events} startDay={startDay} />
    </Backdrop>
  );
}
