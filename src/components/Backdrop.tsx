import { Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Backdrop({ children }: PropsWithChildren) {
  return (
    <Container
      p={8}
      width="100vw"
      minHeight="100vh"
      margin="0 auto"
      background="orange.50"
    >
      {children}
    </Container>
  );
}
