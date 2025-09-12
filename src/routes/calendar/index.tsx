import { createFileRoute } from "@tanstack/react-router";
import YearCalendar from "@/components/YearCalendar";
import Backdrop from "@/components/Backdrop";
import { fetchCalendarEvents } from "@/services/calendar-events";

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
});

function CurrentYear() {
  const events = Route.useLoaderData();

  return (
    <Backdrop>
      <YearCalendar events={events} />
    </Backdrop>
  );
}
