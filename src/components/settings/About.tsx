import { Code, Link, Text, VStack } from "@chakra-ui/react";

export function About() {
  const currentYear = new Date().getFullYear();
  return (
    <VStack gap={4} align="left">
      <Text>
        The calendar is locale-aware and will display months and days in the users preferred locale. Public holidays are
        also highlighted for the locale. The yearly calendar can be printed, and should format nicely on A4 in portrait
        or landscape mode.
      </Text>
      <Text>
        By default the home page will just show the next 12 months. Whereas if the year is appended (e.g.
        <Link href={`https://www.destructuring-bind.org/calendar/${currentYear}`}>
          https://www.destructuring-bind.org/calendar/{currentYear}
        </Link>
        ), it will show the given year starting from January.
      </Text>

      <Text>
        Build info: <Code>{import.meta.env.VITE_GIT_COMMIT_HASH}</Code>, {import.meta.env.VITE_GIT_COMMIT_DATE}
      </Text>

      <Text>
        Source:{" "}
        <Link target="_blank" rel="noopener noreferrer" href="https://github.com/rm-hull/calendar">
          https://github.com/rm-hull/calendar
        </Link>
      </Text>
    </VStack>
  );
}
