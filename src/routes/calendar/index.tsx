import { createFileRoute } from "@tanstack/react-router";
import YearCalendar from "@/components/YearCalendar";
import Backdrop from "@/components/Backdrop";
import { govUkToEvents } from "@/types/gov_uk";
import { fetchUkBankHolidays } from "@/services/uk-bank-holidays";

export const Route = createFileRoute("/calendar/")({
  component: CurrentYear,
  loader: () => fetchUkBankHolidays(),
});

function CurrentYear() {
  const events = govUkToEvents(Route.useLoaderData());

  return (
    <Backdrop>
      <YearCalendar events={events} />
    </Backdrop>
  );
}
