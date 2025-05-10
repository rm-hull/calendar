import Backdrop from "@/components/Backdrop";
import YearCalendar from "@/components/YearCalendar";
import { fetchUkBankHolidays } from "@/services/uk-bank-holidays";
import { govUkToEvents } from "@/types/gov_uk";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/$year")({
  component: SpecificYear,
  loader: () => fetchUkBankHolidays(),
});

function SpecificYear() {
  const { year } = Route.useParams();
  const events = govUkToEvents(Route.useLoaderData());

  return (
    <Backdrop>
      <YearCalendar month={1} year={parseInt(year)} events={events} />
    </Backdrop>
  );
}
