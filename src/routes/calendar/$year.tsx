import Backdrop from "@/components/Backdrop";
import YearCalendar from "@/components/YearCalendar";
import { fetchCalendarEvents } from "@/services/calendar-events";
import { isStartDay } from "@/types/start-day";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/$year")({
  component: SpecificYear,
  loader: (context) => {
    const searchParams = new URLSearchParams(context.location.search);
    const languages = searchParams.get("languages")?.split(",") || [
      navigator.language,
    ];

    const startDate = new Date(parseInt(context.params.year), 0, 1);
    const endDate = new Date(parseInt(context.params.year), 11, 31);
    return fetchCalendarEvents(startDate, endDate, languages);
  },
  validateSearch: (search: Record<string, unknown>) => ({
    startDay: isStartDay(search.startDay) ? search.startDay : undefined,
  }),
});

function SpecificYear() {
  const events = Route.useLoaderData();
  const { year } = Route.useParams();
  const { startDay } = Route.useSearch();

  return (
    <Backdrop>
      <YearCalendar
        month={1}
        year={parseInt(year)}
        events={events}
        startDay={startDay}
      />
    </Backdrop>
  );
}
