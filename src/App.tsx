import { Container, SimpleGrid } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import Calendar from "@/components/Calendar";

type CalendarMonth = {
  year: number;
  month: number;
};

function* yearGenerator(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1
): Generator<CalendarMonth, CalendarMonth, unknown> {
  while (true) {
    yield { year, month };
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }
}

function App() {
  const yg = yearGenerator();
  const first12 = Array.from({ length: 12 }, () => yg.next().value);

  return (
    <Provider>
      <Container p={8} width="100vw" margin="0 auto" background="gray.50">
        <SimpleGrid
          gap={4}
          alignItems="start"
          columns={{ base: 2, md: 3, lg: 4 }}
          // minChildWidth={250}
        >
          {first12.map((props, index) => (
            <Calendar key={index} {...props} />
          ))}
        </SimpleGrid>
      </Container>
    </Provider>
  );
}

export default App;
