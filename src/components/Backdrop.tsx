import { Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useColorModeValue } from "./ui/color-mode";

export default function Backdrop({ children }: PropsWithChildren) {
  return (
    <Container fluid background={useColorModeValue("orange.50", "gray.900")}>
      <Container p={8} width="100vw" minHeight="100vh" margin="0 auto">
        {children}
      </Container>
    </Container>
  );
}
