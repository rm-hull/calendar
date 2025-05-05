import { createFileRoute } from "@tanstack/react-router";
import YearCalendar from "@/components/YearCalendar";
import Backdrop from "@/components/Backdrop";

export const Route = createFileRoute("/calendar/")({
  component: CurrentYear,
});

function CurrentYear() {
  return (
    <Backdrop>
      <YearCalendar />
    </Backdrop>
  );
}
