import { Container } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import YearCalendar from "./components/YearCalendar";

export default function App() {
  return (
    <Provider>
      <Container p={8} width="100vw" margin="0 auto" background="gray.50">
        <YearCalendar />
      </Container>
    </Provider>
  );
}
