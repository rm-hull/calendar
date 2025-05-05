import YearCalendar from "@/components/YearCalendar";
import { Container } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/$year")({
  component: SpecificYear,
});

function SpecificYear() {
  const { year } = Route.useParams();
  return (
    <Container p={8} width="100vw" margin="0 auto" background="gray.50">
      <YearCalendar month={1} year={parseInt(year)} />
    </Container>
  );
}
