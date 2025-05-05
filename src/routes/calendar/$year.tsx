import Backdrop from "@/components/Backdrop";
import YearCalendar from "@/components/YearCalendar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/$year")({
  component: SpecificYear,
});

function SpecificYear() {
  const { year } = Route.useParams();
  return (
    <Backdrop>
      <YearCalendar month={1} year={parseInt(year)} />
    </Backdrop>
  );
}
