import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@chakra-ui/react";
import YearCalendar from "@/components/YearCalendar";

export const Route = createFileRoute("/calendar/")({
  component: CurrentYear,
});

function CurrentYear() {
  return (
    <Container p={8} width="100vw" margin="0 auto" background="gray.50">
      <YearCalendar />
    </Container>
  );
}
